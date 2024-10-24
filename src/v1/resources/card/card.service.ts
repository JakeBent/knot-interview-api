import { Service } from '@base';
import { IncorrectAuthError } from '@common/errors';

export default class CardService extends Service {
  public create = async ({
    userId,
    name,
    network,
    number,
    expMonth,
    expYear,
    cvv,
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
        network,
        number,
        expMonth,
        expYear,
        cvv,
        lastFour: number.slice(-4),
        zip,
      },
    });

    return creds;
  };

  public read = ({ userId }: Record<string, string>) => (
    this.db.card.findMany({ where: { userId } })
  );
}
