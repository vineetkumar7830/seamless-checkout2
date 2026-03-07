# Authentication Documentation

## Overview
The system implements a secure JWT-based authentication flow with a mandatory Email OTP Two-Factor Authentication (2FA) step.

## Registration
- **Endpoint**: `POST /auth/register`
- **Fields**: `name`, `email`, `password`, `confirmPassword`, `role`.
- **Logic**: Hashes the password using Bcrypt and saves the user as `inactive` until verified.

## Login Flow (The 2FA Process)

### Step 1: Initial Login
- **Endpoint**: `POST /auth/login`
- **Action**: User submits credentials.
- **Backend**: 
  1. Verifies password.
  2. Generates a 6-digit random OTP.
  3. Saves OTP and `otpExpires` (10 mins) to the User record.
  4. Sends the OTP to the user's registered email via SMTP.
- **Response**: `200 OK - OTP sent to your email`.

### Step 2: OTP Verification
- **Endpoint**: `POST /auth/verify-otp`
- **Action**: User submits the OTP received in email.
- **Backend**:
  1. Compares OTP and checks expiration.
  2. If valid, clears the OTP fields.
  3. Generates an `accessToken` (Short-lived) and a `refreshToken` (Long-lived).
- **Response**: Returns the JWT tokens and user metadata.

## Password Management
- **Forgot Password**: `POST /auth/forgot-password` generates a temporary hex token for reset.
- **Reset Password**: `POST /auth/reset-password` requires the token and new password.

## Security Features
- **OTP Hiding**: OTP is excluded from the response in production settings.
- **JWT Secrets**: Uses two separate secrets for Access and Refresh tokens (`JWT_SECRET`, `JWT_REFRESH_SECRET`).
