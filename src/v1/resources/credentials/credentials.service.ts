import { Service } from '@base';
import { IncorrectAuthError } from '@common/errors';

export default class CredentialsService extends Service {
  public create = async ({
    userId,
    website,
    username,
    password,
  }: CredentialsCreateDTO) => {
    const user = await this.db.user.findFirst({ where: { id: userId } });

    if (!user) {
      throw new IncorrectAuthError();
    }

    const creds = await this.db.credentials.create({
      data: {
        userId: user.id,
        website,
        username,
        password,
      },
    });

    return creds;
  };

  public read = ({ userId }: Record<string, string>) => (
    this.db.credentials.findMany({ where: { userId } })
  );
}
