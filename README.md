# Backend Queue System

## Overview

The Backend Queue System is a Node.js application designed to manage requests from multiple users using a queue structure. It incorporates user authentication, request queueing, request processing, and logging. This system uses MongoDB for data storage, Redis for queue management, and includes basic error handling and scalability considerations.

## Features

- User authentication (registration and login)
- Request queueing for each user
- Sequential request processing
- Concurrency management
- Logging and error handling
- Scalable architecture

## Project Structure

```
backend-queue-system
├── models
│   └── User.js
├── routes
│   ├── authRoutes.js
│   └── queueRoutes.js
├── queues
│   ├── queueManager.js
│   └── taskProcessor.js
├── test
│   └── auth.test.js
├── .env
├── Dockerfile
├── docker-compose.yml
├── server.js
├── package.json
└── README.md
```

### Models

- **`models/User.js`**: Defines the schema and model for user data.

### Routes

- **`routes/authRoutes.js`**: Contains endpoints for user authentication (registration and login).
- **`routes/queueRoutes.js`**: Manages request queues for each user.

### Queues

- **`queues/queueManager.js`**: Manages the creation, management, and deletion of queues for each user.
- **`queues/taskProcessor.js`**: Processes tasks from the queues sequentially.

### Tests

- **`test/auth.test.js`**: Contains unit tests for authentication routes.

### Configuration Files

- **`.env`**: Contains environment variables such as MongoDB URI and JWT secret.
- **`Dockerfile`**: Defines the Docker image for the application.
- **`docker-compose.yml`**: Sets up Docker containers for the application and its dependencies.

## Setup Instructions

### Prerequisites

- Node.js (v18.x or later)
- Docker (optional, for containerization)
- MongoDB instance
- Redis instance

### Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd backend-queue-system
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Setup Environment Variables**

   Create a `.env` file in the root directory with the following content:

   ```env
   MONGO_URI=mongodb://localhost:27017/backend-queue-system
   JWT_SECRET=your_jwt_secret
   REDIS_URL=redis://localhost:6379
   ```

4. **Start the Server**

   ```bash
   npm start
   ```

   This will start the server on `http://localhost:3000` (or the port specified in your `.env` file).

### Docker Setup (Optional)

1. **Build Docker Image**

   ```bash
   docker build -t backend-queue-system .
   ```

2. **Run Docker Containers**

   ```bash
   docker-compose up
   ```

   This will start the application along with MongoDB and Redis containers.

## Usage

### API Endpoints

- **POST `/api/auth/register`**: Register a new user.
  - **Body**: `{ "username": "string", "password": "string" }`
  - **Response**: `201 Created` on success.

- **POST `/api/auth/login`**: Log in an existing user.
  - **Body**: `{ "username": "string", "password": "string" }`
  - **Response**: `{ "token": "jwt-token" }` on success.

- **POST `/api/queue/enqueue`**: Add a request to the user's queue.
  - **Headers**: `Authorization: Bearer <jwt-token>`
  - **Body**: `{ "requestData": "string" }`
  - **Response**: `200 OK` on success.

- **GET `/api/queue/dequeue`**: Process the next request in the user's queue.
  - **Headers**: `Authorization: Bearer <jwt-token>`
  - **Response**: `{ "processedData": "string" }` on success.

## Testing

To run tests, use:

```bash
npm test
```

Make sure to have MongoDB and Redis running before executing tests.

## Logging and Monitoring

- **Logging**: Logs are printed to the console. For production, consider using a logging library (e.g., Winston).
- **Monitoring**: For monitoring, integrate tools like Prometheus and Grafana.

## Contributing

Feel free to fork the repository and submit pull requests. For significant changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---
