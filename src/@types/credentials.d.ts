export { };

declare global {
  export interface CredentialsCreateDTO {
    userId?: string;
    website: string;
    username: string;
    password: string;
  }
}
