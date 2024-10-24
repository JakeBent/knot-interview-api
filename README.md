# Knot API Interview

## Prerequesites

* node >=18
* yarn
* postgres

## Installation

1. clone repo
2. install dependencies `yarn install`
3. copy environment file example `cp .env.example .env`
4. make sure postgres is running and reachable, update `.env` with connection string
4. prepare the database `npx prisma db push`
5. start app `yarn start`

## Assumptions

* There is an existing FE with input validation

## Decisions due to time constraints

* Faked vendor API
* All encrypted DB fields are Strings because of library limitations
* Cards would instead be stored in a separate PCI compliant server and referenced via tokenization

## Overview

* Auth is basic JWT. See `src/common/middleware/auth.ts`
* All responses are executed via a central handler to simplify error handling, logging, and analytics. See `/src/common/middleware/exec.ts`. It expects a controller to define an operation (the method on the relevant service), arguments for that method, a success message, a success code. The auth middleware will attach a new token if the request is authenticated. It then executes the operation with the provided args and either formats & sends back the result of the operation, or sends the relevant error code.
* Resource -- defined as `index.ts` inside a resource folder. The resource index is responsible for defining its url prefix (e.g. `/users` for the user resource), creating and referencing its relevant controller, and defining route handlers and hooking up authentication or other per-route middleware.
* Controllers -- a class that extends `src/v1/resources/base/base.controller.ts`. Controllers are responsible for extracting parameters, queries, and bodies from requests and defining the service method, arguments, success code, and success message on the request and then evoking `res.exec()`. Its also responsible for creating and referencing it's relevant service.
* Services -- a class that extends `src/v1/resources/base.service.ts`. Services are responsible for actual business logic and interacting with the database. The base service should include any database connections for easy access.

## Contribution (creating new resources)

1. create a new folder in `src/v1/resources`
2. Define the model in the `schema.prisma` and migrate the database
3. create files for the resource (`<new_resource>/index.ts`), service, and controller
4. Instantiate the resource in the `resources` array in `src/v1/index.ts`
