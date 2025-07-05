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

### 4. Create table users
```bash
docker exec -i container_mysql mysql -u'root' -p'password' testdb -e "
CREATE TABLE testdb.users (
  user_id INT NOT NULL AUTO_INCREMENT ,
  username VARCHAR(50) NOT NULL ,
  email VARCHAR(100) NOT NULL ,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (user_id)
) ENGINE = InnoDB;
"
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

### Create user
- **URL:** http://localhost:3000/users
- **Method:** POST
- **Request**
```json
{
  "username":"optest",
  "email":"auttakorn.w@clicknext.com"
}
```
- **Response:**
```json
{
  "message":"User created successfully",
  "user_id":1
}
```

### Get user
- **URL:** http://localhost:3000/users/1
- **Method:** GET
- **Response:**
```json
{
  "user_id":1,
  "username":"optest",
  "email":"auttakorn.w@clicknext.com"
}
```


## Stop the Application

### Delete table users
```bash
docker exec -i container_mysql mysql -u'root' -p'password' testdb -e "
DELETE FROM testdb.users;
"
```

### Stop the Application
```bash
docker compose down
```