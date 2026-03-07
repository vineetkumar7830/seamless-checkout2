# Company Management & Request Workflow

## Requesting a Company
Users can request the creation of a company that is linked to an employer's email.

### The Request Flow
1. **Initiation**: `POST /request-company`
   - User provides employer name, nickname, and email.
   - The system generates an OTP and sends it to the **Employer's Email**.
2. **Verification**: `POST /request-company/verify-otp`
   - User enters the OTP.
   - Once verified, the request is marked as approved, allowing for the actual company creation.

## Managing Companies
Managed via the `/company` module.

- **Create**: Requires a multipart/form-data upload for `logo` and `signature` files.
- **Switch Context**: Users can belong to multiple companies. The `PUT /company/switch/:id` endpoint allows a user to switch their "active" company, which updates the `companyId` in their future JWT tokens.
- **Tenancy Enforcement**: All standard CRUD operations (Find, Update, Delete) are filtered by the current user's `userId` and/or `companyId` to prevent cross-tenant data access.
