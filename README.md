# Random Journal App

A Node.js application for sharing daily journal entries with random users in a secure and anonymous manner.

## Features

- User Auth: Secure user sign-in with email addresses and OTP.

- Daily Journaling: Simple text-based journal entry creation.

- Randomized Exchange: Automated system to send each day's journal entries to a randomly selected user who also submitted an entry that day.

- Secure Email Delivery: Email sending for journal exchange using Gmail

## Technologies

- Node.js: Runtime environment.

- TypeScript: For type safety and code maintainability.

- Sequelize: Object-Relational Mapping (ORM) for database interactions.

- PostgreSQL: Relational database for storing users and journal entries.

- BullMQ: Redis-based queuing system for managing email sending.

- Docker: Containerization for development and deployment.

## Getting Started

### Prerequisites

- Node.js and npm (or yarn)
- PostgreSQL database instance
- Redis server
- An account with an email service provider(gmail)

### Setup

Clone the repository:

```bash
git clone https://github.com/bryanbill/random.git
```

Install dependencies:

```bash
cd random-journal-app
npm install
```

Configure environment variables (create a .env file):

```
cp .env.example .env
```

Start the docker containers:

```bash
docker-compose up -d
```

Run the application:

```bash
npm run dev
```
