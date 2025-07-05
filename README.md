# Node.js API with MySQL

A simple Node.js API application using Express and MySQL, containerized with Docker.

## Technology Stack

**Node.js Container:**
- Node.js: 24.3.0
- Express: 4.21.2
- MySQL2: 3.14.1
- Alpine Linux: 3.22.0

**MySQL Container:**
- MySQL: 8.4.5

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/opsnoopop/api_nodejs.git
```

### 2. Navigate to Project Directory
```bash
cd api_nodejs
```

### 3. Start the Application
```bash
docker compose up -d --build
```

### 4. Stop the Application
```bash
docker compose down
```

## API Endpoints

### Health Check
- **URL:** http://localhost:3000/
- **Method:** GET
- **Response:**
```json
{
  "message": "Hello World from Node"
}
```

## Development

The application runs on port 3000 and connects to a MySQL database. Both services are orchestrated using Docker Compose for easy development and deployment.