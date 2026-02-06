# E-commerce Backend Project

## Project Description
This e-commerce backend project serves as the server-side application for managing product catalogs, user authentication, and order processing for an online store.

## Features
- User authentication and authorization
- Product management (CRUD operations)
- Shopping cart functionality
- Order processing and tracking
- API for mobile and web clients

## Tech Stack
- **Node.js** for the server
- **Express.js** as the web framework
- **MongoDB** for the database
- **Mongoose** for object modeling
- **JWT** for authentication
- **Docker** for containerization

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Ayush-y01/ecom.git
   cd ecom
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file based on the `.env.example` provided.
4. Start the server:
   ```bash
   npm start
   ```

## Usage
- The server runs on `http://localhost:3000` by default.
- You can test the API using tools like Postman or Insomnia.

## Project Structure
```
├── src
│   ├── config       # Configuration files
│   ├── controllers   # Business logic
│   ├── models        # Mongoose Models
│   ├── routes        # API routes
│   ├── middleware     # Authentication and error handling
│   └── utils        # Utility functions
├── .env.example      # Example env file
├── Dockerfile        # Docker configuration
├── docker-compose.yml# Docker Compose configuration
└── package.json      # Project metadata and dependencies
```

## API Endpoints
| Method | Endpoint             | Description                                |
|--------|----------------------|--------------------------------------------|
| POST   | /api/auth/signup     | Register a new user                       |
| POST   | /api/auth/login      | Login an existing user                    |
| GET    | /api/products        | Retrieve all products                     |
| POST   | /api/products        | Create a new product                      |
| GET    | /api/products/:id    | Retrieve a product by ID                  |
| PUT    | /api/products/:id    | Update a product by ID                    |
| DELETE | /api/products/:id    | Delete a product by ID                    |
| POST   | /api/orders          | Create a new order                        |
| GET    | /api/orders/:id      | Retrieve order details by ID              |

## Environment Variables
- `PORT` - Server port (default 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing

## Docker Setup
1. Ensure Docker is installed on your machine.
2. Build the Docker image:
   ```bash
   docker build -t ecom-backend .
   ```
3. Run the Docker container:
   ```bash
   docker run -p 3000:3000 ecom-backend
   ```

## Contributing Guidelines
- Fork the repository and create a new branch for your feature or bugfix.
- Ensure that your code adheres to the existing style and conventions.
- Open a pull request with a clear description of your changes.
- Before submitting a pull request, ensure all tests are passing and include new tests if applicable.

---