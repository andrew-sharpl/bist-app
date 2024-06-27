# Development Guide

This is the backend server for the BIST app, developed using Node.js, Express.js, and MongoDB. This README will guide you through the process of setting up, configuring, and using the server for future development.

## 1. Running the Server

### Requirements

- [Node.js](https://nodejs.org/en/download)
- [npm](https://docs.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/csc301-2023-winter/project-11-bist-t.git
```

2. Change the current directory to the project backend folder:

```bash
cd project-11-bist-t/src/server/
```

3. Install the required dependencies:

```bash
npm install
```

### Configuration

At the time this README is created, we are using [MongoDB Atlas](https://www.mongodb.com/atlas/database) cloud database. For first-time server setup, we recommend that you establish your own database first.

The configuration file for database is at:

```
.../server/config/default.json
```

We highly recommend using [MongoDB Atlas](https://www.mongodb.com/atlas/database). Follow the [instruction](https://www.mongodb.com/docs/atlas/driver-connection/) and replace the `"mongoURI"` field with yours.

### Running the Server

To start the server in dev mode, run the following command in the project folder:

```bash
npm run server
```

### API Endpoints

The documentation for API is at [API_documentation.md](https://github.com/csc301-2023-winter/project-11-bist-t/blob/dev/src/server/documentation/API_documentation.md).

## 2. Project Structure & Technical Details

This part explains how the project is structured and what each file does.

### Folder Tree

```bash
.
├── README.md
├── config                              # Config folder
│   ├── db.js                           # Code for connecting MongoDB
│   └── default.json                    # Other config info
├── documentation                       # Documentation Folder
│   ├── API_documentation.md
├── middleware                          # Middleware folder
│   └── auth.js                         # Authentication middleware with JWT
├── models                              # Models Folder
│   ├── Admin.js                        # Admin model
│   ├── Appointment.js                  # Appointment model
│   ├── Event.js                        # Event model
│   ├── Profile.js                      # Profile model
│   └── User.js                         # User model
├── package-lock.json
├── package.json
├── routes                              # API routes folder
│   └── api
│       ├── __tests__                   # Test folder
│       │   └── admin.test.js
│       ├── admin.js                    # Admin routes
│       ├── appointment.js              # Appointment routes
│       ├── event.js                    # Event routes
│       ├── profile.js                  # Profile routes
│       └── user.js                     # User routes
└── server.js                           # Main entry file
```

### Preliminary

> This backend is created using [Express.js](https://expressjs.com/), so you need to have some basic understanding of JavaScript and Node.js.

> [Here](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) is a good tutorial to get you started.

### Database Models & Queries

> In this project, we use MongoDB as our database along with [Mongoose](https://mongoosejs.com/) as the Object Document Mapper (ODM).

> If you are not yet familiar with these technologies, we recommend taking a look at [this](https://mongoosejs.com/docs/guide.html) to understand how models and schemas work.

> Additionally, [this](https://mongoosejs.com/docs/queries.html) will help you gain a better understanding of how data queries are performed.

### Athentication & Authorization

> We have implemented an [authentication middleware](https://github.com/csc301-2023-winter/project-11-bist-t/blob/dev/src/server/middleware/auth.js) using [JSON Web Tokens](https://jwt.io/introduction) (JWT) to secure the API endpoints.

> Upon a successful login by a user or an admin, the server constructs a payload containing the user's ID and encrypts it into a JWT token.

> To access a protected endpoint, the user must include the JWT in the request header under the field `'x-auth-token'`.

> The authentication middleware intercepts incoming requests and checks for the presence of a JWT token.

> If a valid token is found, the middleware decodes it, extracts the user information, and attaches it to the request object.

> This information can then be used by subsequent route handlers to authorize actions based on the user's roles or permissions.
