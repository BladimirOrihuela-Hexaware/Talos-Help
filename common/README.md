# Commons Module
The purpose of this module is to share code between services

# Middlewares

[`current-user`](https://github.com/BladimirOrihuela-Hexaware/Talos-Help/blob/master/common/src/middlewares/current-user.ts)

### Requirement
[cookie-session](https://www.npmjs.com/package/cookie-session) middleware must be used in your Express application

```typescript
import cookieSession from "cookie-session";
import express from "express";
const app = express();
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test", //set cookies when request commes from https
  })
);
```

This is required since [`current-user`](https://github.com/BladimirOrihuela-Hexaware/Talos-Help/blob/master/common/src/middlewares/current-user.ts) middleware will validate the request contains a `session` property, that was included by the `cookieSession` middleware.

### Usage
[`current-user`](https://github.com/BladimirOrihuela-Hexaware/Talos-Help/blob/master/common/src/middlewares/current-user.ts) will validate the `jwt` inside `session` property. If the validation succeed, the request object will receive a `currentUser` property with the user data
```typescript
interface UserPayload {
  id: string;
  name: string;
  email: string;
}
```
Then the request will continue its way until it hits your route.

Use it in your express application by applying it as middleware
```typescript
import { currentUser } from "@atptalos/common";

app.use(noRequireAuth)
app.use(currentUser) // Routes applied below currentUser will require the user to be authenticated
app.use(routerRequireAuth)
```

---

[`validateAuthorization`](https://github.com/BladimirOrihuela-Hexaware/Talos-Help/blob/master/common/src/middlewares/validate-authorization.ts)

Validate if user data exist in the request object. If it doesn't exist. We immediately return [`NotAuthorizedError`](https://github.com/BladimirOrihuela-Hexaware/Talos-Help/blob/master/common/src/errors/not-authorized-error.ts)

### Requirement

[`current-user`](https://github.com/BladimirOrihuela-Hexaware/Talos-Help/blob/master/common/src/middlewares/current-user.ts)  middleware in your app


### Example
```typescript
import { validateAuthorization } from "@atptalos/common";

const router = express.Router();
router.get("/api/your/endpoint", validateAuthorization, async (req, res) => { 
    // your route logic here
    // you can access safely req.currentUser
 })
```

---
[`validateRequest`](https://github.com/BladimirOrihuela-Hexaware/Talos-Help/blob/master/common/src/middlewares/validate-request.ts)

Validate if express validator thrown any error while validating body parameters

### Requirement
[`express-validator`](https://www.npmjs.com/package/express-validator) middleware must be implemented on your routes.

```typescript
import { validateRequest } from "@atptalos/common";
import { body } from "express-validator";

const router = express.Router();
router.post(
    "/api/your/endpoint", 
    [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Email must be valid"),
    ],
    validateRequest, async (req, res) => { 
    // your route logic here

 })
```
 you can access safely to req.body properties since express-validator applied some validations and validateRequest middleware ensures no error was found. If any error was found during the validation, validateRequest will throw [`RequestValidationError`](https://github.com/BladimirOrihuela-Hexaware/Talos-Help/blob/master/common/src/errors/request-validation-error.ts)



## 🚀 Deployment
Automated deployments in [`@atptalos/common`](https://www.npmjs.com/package/@atptalos/common) 

Everytime your changes in this module get merged in master, `deploy-common.yaml` workflow will publish a new version in the **public**  [`@atptalos`](https://www.npmjs.com/settings/atptalos/packages) organizacion 

