export { };

declare global {
  export interface CardCreateDTO {
    userId?: string;
    name: string;
    number: string;
    expMonth: number;
    expYear: number;
    zip: string;
  }
}
