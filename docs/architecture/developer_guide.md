# Developer Guide: Adding New Features

To maintain consistency in the Seamless Checkout API, follow these steps when adding a new module:

## 1. Scaffold the Module
Use the Nest CLI to generate a new module:
```bash
nest generate module my-feature
nest generate controller my-feature
nest generate service my-feature
```

## 2. Define the Schema (Mongoose)
Create an entity file in `src/my-feature/entities/my-feature.entity.ts`:
- Use `@Schema({ timestamps: true })`.
- Remember to include `companyId` if the feature is tenant-specific.

## 3. Create DTOs with Swagger
Define your inputs in `src/my-feature/dto/`:
- **Crucial**: Add `@ApiProperty()` to every field. If you don't, the Swagger UI will show an empty request body.

## 4. Secure the Controller
- Apply `@ApiTags('My Feature Name')`.
- Add `@UseGuards(JwtAuthGuard)` to the class or specific methods.
- Use `@ApiBearerAuth('access-token')`.
- Use `@ApiOperation({ summary: '...' })` for each endpoint.

## 5. Error Handling & Responses
Always return data using the custom response wrapper:
```typescript
return new CustomResponse(200, 'Success message', data);
```
And handle errors using `CustomError`:
```typescript
throw new CustomError(400, 'Specific error message');
```
