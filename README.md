
# API Sentinel

API Sentinel is a full-stack application designed to monitor API availability, response times, and health status in real time.

The project aims to simulate a production-grade monitoring platform, allowing users to register APIs, track uptime history, visualize performance metrics, and receive alerts when services become unavailable.

## Objectives

* Monitor REST API endpoints automatically
* Track response times and availability
* Store monitoring history
* Provide dashboards and metrics
* Implement authentication and authorization
* Demonstrate modern backend and frontend development practices

---

## Tech Stack

### Backend

* NestJS
* TypeScript
* Prisma ORM
* PostgreSQL
* Redis
* JWT Authentication
* Swagger/OpenAPI

### Infrastructure

* Docker
* Docker Compose

### Planned Frontend

* React
* TypeScript
* Tailwind CSS
* Recharts

---

## Current Features

### Infrastructure Setup

* Dockerized PostgreSQL
* Dockerized Redis
* NestJS backend initialization
* Environment configuration
* Swagger documentation

### Database Layer

* Prisma ORM configuration
* Database migrations
* PostgreSQL integration
* Prisma Service and Module

### Authentication

* User registration
* User login
* Password hashing with bcrypt
* JWT token generation
* Request validation using DTOs

### Health Check

* Application health endpoint
* Database connectivity validation

---

## Project Structure

src/

├── auth/

├── common/

├── monitor-checks/

├── monitors/

├── prisma/

├── users/

├── app.module.ts

└── main.ts

---

## Roadmap

### Authentication & Authorization

* JWT Strategy
* Route Guards
* Current User endpoint

### Monitoring

* Create monitor endpoints
* Update monitor configuration
* Delete monitors
* User ownership validation

### Automated Monitoring

* Redis queues
* BullMQ workers
* Scheduled API checks

### Metrics

* Response time tracking
* Availability history
* Uptime calculations

### Dashboard

* React frontend
* Monitor management
* Historical charts
* Status visualization

### Notifications

* Email alerts
* Webhook alerts
* Incident tracking

---

## Running Locally

### Install dependencies

npm install

### Start infrastructure

docker compose up -d

### Run migrations

npx prisma migrate dev

### Start application

npm run start:dev

### Swagger

http://localhost:3000/docs

---

## Status

Project under active development.

Current stage: Authentication completed and database integration established.
