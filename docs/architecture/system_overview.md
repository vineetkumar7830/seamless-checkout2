# Project Architecture

## Technology Stack
- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **Database**: MongoDB (via Mongoose)
- **API Documentation**: Swagger (@nestjs/swagger)
- **Security**: JWT (Passport.js), Bcrypt, Class-Validator
- **Email**: Nodemailer

## Core Modules & Design Patterns

### 1. Module-Based Architecture
The project follows the standard NestJS modular pattern. Each feature (e.g., `auth`, `company`, `user`) is encapsulated in its own module with its own:
- **Controller**: Handles incoming requests and routing.
- **Service**: Contains business logic.
- **Entity/Schema**: Defines the data structure (Mongoose schemas).
- **DTOs**: Data Transfer Objects for request validation.

### 2. Guard System
System-wide security is handled via Guards:
- `JwtAuthGuard`: Validates the JWT token in the Authorization header.
- `RolesGuard`: Restricts access based on the user's role (defined in `UserRole` enum).

### 3. Error Handling
- **CustomError**: A centralized error class located in `src/provider/customer-error.service`.
- **CustomResponse**: A consistent response wrapper in `src/provider/custom-response.service`.
- **throwException**: A utility function in `src/util/util/errorhandling.ts` to transform errors into NestJS-compatible exceptions.

### 4. Tenancy & Company Context
Most entities are linked to a `companyId`. The system uses decorators (like `@GetUser('companyId')`) to extract the current active company from the JWT payload and filter data accordingly.
