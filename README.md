# API Sentinel

API Sentinel is a full-stack platform for monitoring API availability, response times, and uptime metrics.

The goal of this project is to simulate a production-ready monitoring solution where users can register APIs, track their health status, visualize performance data, and receive alerts when services become unavailable.

---

## Features

### Implemented

* NestJS backend setup
* PostgreSQL integration
* Prisma ORM
* Dockerized infrastructure
* Redis setup
* Swagger/OpenAPI documentation
* User registration
* User authentication
* Password hashing with bcrypt
* JWT token generation
* DTO validation
* Database migrations
* Health check endpoint

### In Progress

* JWT authorization guards
* Current user endpoint
* Monitor CRUD

### Planned

* API monitoring workers
* BullMQ queues
* Automated health checks
* Historical monitoring data
* Uptime calculations
* React dashboard
* Charts and metrics
* Email notifications
* Webhook notifications

---

## Tech Stack

### Backend

* NestJS
* TypeScript
* Prisma ORM
* PostgreSQL
* Redis
* JWT
* Swagger

### Infrastructure

* Docker
* Docker Compose

### Frontend (Planned)

* React
* TypeScript
* Tailwind CSS
* Recharts

---

## Project Structure

```text
src/
│
├── auth/
├── users/
├── monitors/
├── monitor-checks/
├── prisma/
│
├── app.module.ts
├── app.controller.ts
└── main.ts
```

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Start infrastructure

```bash
docker compose up -d
```

### Run database migrations

```bash
npx prisma migrate dev
```

### Start the application

```bash
npm run start:dev
```

### Swagger Documentation

```text
http://localhost:3000/docs
```

---

## Roadmap

* [x] NestJS setup
* [x] PostgreSQL integration
* [x] Prisma ORM
* [x] JWT authentication
* [x] User registration and login
* [ ] JWT guards
* [ ] Current user endpoint
* [ ] Monitor CRUD
* [ ] Queue processing with Redis
* [ ] Automated API checks
* [ ] Historical metrics
* [ ] React dashboard
* [ ] Alerts and notifications

---

## Status

Currently under active development.

The project already supports authentication, database integration, and API documentation. The next milestone is implementing authorization and API monitoring management.
