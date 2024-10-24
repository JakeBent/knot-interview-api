export { };

declare global {
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
