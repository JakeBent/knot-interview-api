export { };

declare global {
  export interface Creds {
    website: string;
    username: string;
    password: string;
  }

  export interface CredentialsCreateDTO {
    userId?: string;
    website: string;
    username: string;
    password: string;
  }
}
