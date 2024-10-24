import { Router } from 'express';

export default abstract class Resource {
  public router: Router;
  public abstract prefix: string;

  constructor() {
    this.router = Router();
  }

  public abstract setupRoutes(): void;

  public routes(): Router {
    this.setupRoutes();
    return this.router;
  }
}
