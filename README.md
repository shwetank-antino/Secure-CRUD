# Secure CRUD

A secure task management application with PostgreSQL database, Node.js backend, and containerized deployment using Docker.

## Features

- ✅ Create, Read, Update, Delete (CRUD) tasks
- ✅ Task completion tracking
- ✅ PostgreSQL persistent storage
- ✅ Docker & Docker Compose orchestration
- ✅ Nginx reverse proxy
- ✅ Non-root user in container (security)
- ✅ Health checks for service reliability

## Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local development)
- PostgreSQL 15 (or use Docker)

## Quick Start

### Using Docker Compose (Recommended)

```bash
# Deploy the entire stack
bash deploy.sh
```

Or manually:

```bash
docker-compose up --build -d
```

Access the application at `http://localhost`

### Local Development

```bash
npm install
PORT=3000 npm start
```

## Environment Variables

Create a `.env` file in the root directory:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres
PORT=3000
```

| Variable | Description |
|----------|-------------|
| **POSTGRES_USER** | PostgreSQL username |
| **POSTGRES_PASSWORD** | PostgreSQL password |
| **POSTGRES_DB** | Database name |
| **DATABASE_URL** | PostgreSQL connection string |
| **PORT** | Application port (default: 3000) |

## Project Structure

```
.
├── server.js                 # Entry point
├── src/
│   └── app.js               # Express application
├── db/
│   └── init.sql             # Database initialization
├── nginx/
│   └── nginx.conf           # Nginx configuration
├── index.html               # Frontend UI
├── Dockerfile               # Container image
├── docker-compose.yml       # Service orchestration
├── deploy.sh                # Deployment script
└── .env                     # Environment configuration
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Fetch all tasks |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

## Architecture

- **nginx** (port 80): Reverse proxy & static file serving
- **app** (port 3000): Node.js Express backend
- **db** (port 5432): PostgreSQL database

## Security Features

- Non-root user in Docker containers
- Environment variable management
- Input validation
- Health checks for service availability
- Nginx reverse proxy

## Deployment

Run the automated deployment script:

```bash
bash deploy.sh
```

This will:
1. Check for Docker prerequisites
2. Clean previous containers
3. Build and start services
4. Wait for all services to be healthy

## Stopping Services

```bash
docker-compose down
```

To remove all data:

```bash
docker-compose down -v
```

## Troubleshooting

**Containers won't start:**
```bash
docker-compose logs -f
```

**Database connection failed:**
- Ensure `.env` is configured correctly
- Check database health: `docker-compose ps`

**Port already in use:**
- Change ports in `docker-compose.yml` or `.env`

