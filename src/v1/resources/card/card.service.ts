import { Service } from '@base';
import { IncorrectAuthError } from '@common/errors';

export default class CardService extends Service {
  public create = async ({
    userId,
    name,
    number,
    expMonth,
    expYear,
    zip,
  }: CardCreateDTO) => {
    const user = await this.db.user.findFirst({ where: { id: userId } });

    if (!user) {
      throw new IncorrectAuthError();
    }

    const creds = await this.db.card.create({
      data: {
        userId: user.id,
        name,
        number,
        expMonth,
        expYear,
        zip,
      },
    });

    return creds;
  };

  public read = ({ userId }: Record<string, string>) => (
    this.db.card.findMany({ where: { userId } })
  );
}
