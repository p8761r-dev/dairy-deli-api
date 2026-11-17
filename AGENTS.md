# Project Conventions & Architecture (Dairy Restaurant REST API)

## Tech Stack

* **Runtime & Framework:** Node.js, Express 5
* **Database:** MongoDB with Mongoose
* **Validation:** Joi

## Folder Structure (MVC)

* `models/`: Mongoose schemas and data models.
* `controllers/`: Business logic and database operations only.
* `routes/`: Express routers mapping endpoints to middlewares and controllers.
* `validations/`: Joi validation schemas.
* `middlewares/`: Custom middlewares (validation wrapper, central error handler).
* `utils/`: Custom error classes (e.g., `AppError`) and helper functions.

## Coding Rules

* **Error Handling (Express 5):** Throw custom `AppError` instances (extending `Error` with `statusCode`) directly in controllers and middlewares. Let Express 5 forward errors automatically to the central error-handling middleware registered last in `app.js`/`server.js`.
* **Validation:** Validate incoming `req.body` at the router level using Joi schemas before reaching the controller.
* **Database Relationships:**
* Use `ref` for referencing documents across collections.
* Use `embedded` subdocuments for snapshot data (e.g., product details inside an order). Keep embedded copies synced across collections if updated.
* Use `.populate()` selectively only when full referenced data is required.


* **Git Workflow:** Never commit directly to `main`. Create a feature/fix branch per task and merge via Pull Request.