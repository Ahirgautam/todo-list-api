# Todo List API

A Node.js and Express REST API for managing user authentication and todo items. The project uses MySQL with Sequelize, JWT-based authentication, validation with Zod, and includes rate limiting for API protection.[project link](https://roadmap.sh/projects/todo-list-api)


## Features

- User registration and login
- JWT access token authentication
- Refresh token support via HttpOnly cookie
- Todo CRUD operations
- Todo filtering, sorting, and pagination support
- Input validation with Zod
- MySQL database integration via Sequelize
- Request throttling and slow-down protection
- Test coverage with Node's built-in test runner and Supertest

## Tech Stack

- Node.js
- Express
- Sequelize ORM
- MySQL
- JWT
- Zod
- bcrypt
- Cookie Parser
- express-rate-limit
- express-slow-down

## Project Structure

```text
.todo_list_api/
├── app.js
├── server.js
├── package.json
├── README.md
├── config/
│   └── database.js
├── controllers/
│   ├── auth.controller.js
│   └── todo.controller.js
├── middlewares/
│   ├── authenticate.js
│   └── validate.js
├── models/
│   ├── Todo.js
│   └── Users.js
├── routes/
│   ├── auth.route.js
│   └── todo.route.js
├── services/
│   ├── auth.service.js
│   └── todo.service.js
├── tests/
│   └── todos.test.js
├── utils/
│   └── jwt.util.js
├── validators/
│   ├── auth.validator.js
│   └── todo.validator.js
└── .env
```

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- MySQL server running
- A database created in MySQL
- npm or yarn installed

## Installation

1. Clone the repository
2. Open the project folder
3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the project root with the following values:

```env
DB_NAME=todo_db
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
APP_PORT=3000
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
NODE_ENV=development
```

## Running the Application

Start the development server:

```bash
npm run dev
```

The server runs on:

```text
http://localhost:3000
```

## API Endpoints

### Authentication

#### Register user

```http
POST /api/auth/register
```

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

Example response:

```json
{
  "success": true,
  "message": "User Registered",
  "token": "<jwt_access_token>"
}
```

#### Login user

```http
POST /api/auth/login
```

Request body:

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

Example response:

```json
{
  "success": true,
  "message": "login successful",
  "access_token": "<jwt_access_token>"
}
```

#### Refresh token

```http
POST /api/auth/refresh
```

Uses the refresh token cookie and returns a new access token.

#### Logout

```http
POST /api/auth/logout
```

Requires authentication and clears the refresh token cookie.

### Todos

All todo routes require authentication using a bearer token:

```http
Authorization: Bearer <access_token>
```

#### Create todo

```http
POST /api/todos
```

Request body:

```json
{
  "title": "Learn Express",
  "description": "Build a small API project",
  "status": "pending"
}
```

#### Get all todos

```http
GET /api/todos?page=1&limit=10&status=pending&sort=ASC
```

Query parameters:

- `page`: page number
- `limit`: number of items per page
- `status`: filter by status
- `sort`: sort order (`ASC` or `DESC`)

#### Get single todo

```http
GET /api/todos/:id
```

#### Update todo

```http
PUT /api/todos/:id
```

Request body:

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed"
}
```

#### Delete todo

```http
DELETE /api/todos/:id
```

## Todo Status Values

The todo model supports these values:

- `pending`
- `working`
- `completed`

## Validation

The API uses Zod schemas for request validation:

- `registerSchema`
- `loginSchema`
- `todoSchema`

Validation errors are returned as JSON responses with a 400-style failure by the validation middleware.

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Refresh token stored in an HttpOnly cookie
- API rate limiting
- Slow-down middleware to prevent abuse

## Testing

Run the test suite:

```bash
npm test
```

The project currently includes basic endpoint tests for authentication and todo creation.

## Notes

- Sequelize automatically syncs models when the app starts.
- The app uses MySQL, so the database must be configured before starting the server.
- The project is structured for learning and backend API practice, and can be extended with features such as pagination metadata, user-specific todo ownership, and more advanced filtering.

## License

This project is licensed under the ISC License.
