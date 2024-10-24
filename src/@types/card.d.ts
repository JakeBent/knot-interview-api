export { };

declare global {

  export interface Card {
    name: string;
    network: string;
    number: string;
    expMonth: string;
    expYear: string;
    cvv: string;
    lastFour: string;
    zip: string;
  }

  export interface CardCreateDTO {
    userId?: string;
    name: string;
    network: string;
    number: string;
    expMonth: string;
    expYear: string;
    cvv: string;
    zip: string;
  }
}
