# Backend API Documentation

## Endpoints

### POST /users/register

#### Description
This endpoint is used to register a new user.

#### Request Body
The request body should be a JSON object with the following fields:
- `fullname`: An object containing:
  - `firstname`: A string with a minimum length of 3 characters (required).
  - `lastname`: A string with a minimum length of 3 characters (optional).
- `email`: A string representing a valid email address (required).
- `password`: A string with a minimum length of 6 characters (required).

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses
- `201 Created`

Description: User successfully registered.
Body: A JSON object containing the authentication token and user details.

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```
- `400 Bad Request`

Description: Validation errors or missing required fields.
Body: A JSON object containing the validation errors.
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "firstname must be atleast 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be atleast 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```


### POST /users/login

#### Description
This endpoint is used to log in an existing user.

#### Request Body
The request body should be a JSON object with the following fields:
- `email`: A string representing a valid email address (required).
- `password`: A string with a minimum length of 6 characters (required).

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```
#### Responses
- `200 OK`

Description: User successfully logged in.
Body: A JSON object containing the authentication token and user details.
Example:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

- `400 Bad Request`

Description: Validation errors or missing required fields.
Body: A JSON object containing the validation errors.
Example:
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be atleast 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```
- `401 Unauthorized`

Description: Invalid email or password.
Body: A JSON object containing the error message.
Example:
```json
{
  "message": "invalid email or password"
}
```


### GET /users/profile
#### Description
This endpoint is used to get the profile of the logged-in user.

### Request Headers
The request should include the Authorization header with the JWT token.

Example:
```json
Authorization: Bearer <token>
```
### Responses
- `200 OK`

Description: User profile successfully retrieved.
Body: A JSON object containing the user details.
Example
```json
{
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

- `401 Unauthorized`

Description: Missing or invalid token.
Body: A JSON object containing the error message.
Example:
```json
{
  "message": "Unauthorized"
}
```

### GET /users/logout
#### Description
This endpoint is used to log out the user.

#### Request Headers
The request should include the Authorization header with the JWT token or the token should be present in cookies.

Example:
```
Authorization: Bearer <token>
```
### Responses
- `200 OK`

Description: User successfully logged out.
Body: A JSON object containing the success message.
Example:
```json
{
  "message": "Logged Out"
}
```
- `401 Unauthorized`

Description: Missing or invalid token.
Body: A JSON object containing the error message.
Example
```json
{
  "message": "Unauthorized"
}
```


### POST /captains/register

#### Description
This endpoint is used to register a new captain.

#### Request Body
The request body should be a JSON object with the following fields:
- `fullname`: An object containing:
  - `firstname`: A string with a minimum length of 3 characters (required).
  - `lastname`: A string with a minimum length of 3 characters (optional).
- `email`: A string representing a valid email address (required).
- `password`: A string with a minimum length of 6 characters (required).
- `vehicle`: An object containing:
  - `color`: A string with a minimum length of 3 characters (required).
  - `plate`: A string matching the pattern `\d{3}-\d{3}-\d{3}` (required).
  - `capacity`: An integer with a minimum value of 1 (required).
  - `vehicleType`: A string that must be one of `car`, `bike`, or `auto` (required).

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "123-456-789",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Responses
- `201 Created`

Description: Captain successfully registered.
Body: A JSON object containing the authentication token and captain details.
Example
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "123-456-789",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

- `400 Bad Request`

Description: Validation errors or missing required fields.
Body: A JSON object containing the validation errors.
Example:
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "firstname must be atleast 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be atleast 6 characters long",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "Color must be atleast 3 characters long",
      "param": "vehicle.color",
      "location": "body"
    },
    {
      "msg": "Please enter a valid plate number",
      "param": "vehicle.plate",
      "location": "body"
    },
    {
      "msg": "Capacity must be a number",
      "param": "vehicle.capacity",
      "location": "body"
    },
    {
      "msg": "Invalid Vehicle Type",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```


### POST /captains/login
#### Description
This endpoint is used to log in an existing captain.

### Request Body
The request body should be a JSON object with the following fields:

- `email`: A string representing a valid email address (required).
- `password`: A string with a minimum length of 6 characters (required).
Example:
```json 
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses
- `200 OK`

Description: Captain successfully logged in.
Body: A JSON object containing the authentication token and captain details.
Example
```json 
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "123-456-789",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

-`400 Bad Request`

Description: Validation errors or missing required fields.
Body: A JSON object containing the validation errors.
Example:
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be atleast 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

- `401 Unauthorized`

Description: Invalid email or password.
Body: A JSON object containing the error message.
Example:
```json
{
  "message": "invalid email or password"
}
```

### GET /captains/profile
#### Description
This endpoint is used to get the profile of the logged-in captain.

### Request Headers
The request should include the Authorization header with the JWT token.

Example:
```json
Authorization: Bearer <token>
```

#### Responses
- `200 OK`

Description: Captain profile successfully retrieved.
Body: A JSON object containing the captain details.
Example:
```json
{
  "captain": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "123-456-789",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

- `401 Unauthorized`

Description: Missing or invalid token.
Body: A JSON object containing the error message.
Example:
```json
{
  "message": "Unauthorized"
}
```

### GET /captains/logout
#### Description
This endpoint is used to log out the captain.

#### Request Headers
The request should include the Authorization header with the JWT token or the token should be present in cookies.

Example:
```json
Authorization: Bearer <token>
```

### Responses
- `200 OK`

Description: Captain successfully logged out.
Body: A JSON object containing the success message.
Example:
```json
{
  "message": "Logged out successfully"
}
```

- `401 Unauthorized`

Description: Missing or invalid token.
Body: A JSON object containing the error message.
Example:
```json
{
  "message": "Unauthorized"
}
```