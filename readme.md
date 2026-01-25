# Rest API with Node.js

Rest API with Node.js

## Folder structure

```bash

API/
├── node_modules/ # Project dependencies (auto-generated, not in version control)
├── src/ # Source code directory
│ ├── controllers/ # Business logic and request handlers
│ │ └── authController.js # Handles authentication logic
│ │
│ ├── middleware/ # Custom middleware functions
│ │ └── auth.js # JWT verification middleware
│ │ └── validate.js # Input validation middleware
│ │ └── errorHandler.js # Global error handling
│ │
│ ├── models/ # Data models and schemas
│ │ └── Student.js # Student data structure/schema
│ │ └── User.js # User authentication model
│ │
│ ├── routes/ # API route definitions
│ │ └── studentRoutes.js # Student-related endpoints
│ │ └── authRoutes.js # Authentication endpoints
│ │
│ ├── services/ # Business logic and database operations
│ │ └── studentService.js # Student-related business logic
│ │ └── authService.js # Authentication services
│ │
│ └── index.js # Main application entry point
│
├── .env # Environment variables (NOT in version control)
├── .gitignore # Specifies files to ignore in version control
├── package-lock.json # Locked versions of dependencies
├── package.json # Project metadata and dependencies
└── README.md # Project documentation
```
