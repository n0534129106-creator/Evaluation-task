

A robust, containerized Node.js backend service for managing game participants, built with **Prisma ORM** and **PostgreSQL**.

## 🚀 Overview

This project implements a game join logic, ensuring data integrity through Prisma modeling and providing a seamless "Plug & Play" experience using Docker. 

### Key Features:
- **Data Modeling**: Robust schema with `User`, `Game`, and `GameParticipant` (Many-to-Many).
- **Business Logic**: Validation-heavy `joinGame` service to prevent duplicate registrations or joining active/started games.
- **Automation**: Automatic database migrations and client generation during container startup.
- **Environment Isolation**: Fully containerized environment using Docker Compose.

---

## 🛠 Tech Stack

- **Runtime**: Node.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose

---

## 📋 Database Schema

The system uses three core models:
- **User**: System users.
- **Game**: Game entities with status tracking (`WAITING`, `LIVE`, `FINISHED`).
- **GameParticipant**: Relation table managing roles (`PLAYER`, `ADMIN`) and scores.

---

## ⚙️ Getting Started

The project is designed to run with a single command. No local database installation is required.

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

