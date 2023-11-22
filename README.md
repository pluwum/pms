API for the Parking management Application

# Getting Started

## Tech stack

- Typescript
- Express
- TypeOrm
- Sqlite

### Prerequisites

- node - v20
- npm

Clone the repository / unpack git bundle

```bash
git clone git@github.com:pluwum/pms.git
```

## Set up the API

```bash
npm install
```

Prepare environment variables

```bash
mv env.example .env
```

(optional) You can run test with

```bash
npm run test
```

Then finally start the api with

```bash
npm run start

```

## How to use.

Once the application is started, you will need to create the following to test out functionalities

- 1. Create two users one admin and one standard, check [api documentation](src/docs/api.yaml) for the appropriate routes and payload.
- 2. Create parking slots (as many as you like). Mark the `id` fields return for later use.
- 3. You can now proceed to create bookings

# [Project Documentation ](src/docs/NOTES.md)

When the application is running locally, API documentation can be found by navigating to http://localhost:8000/api-docs in your browser.

You can find more notes on the project [here](src/docs/NOTES.md). It covers

- The functionality that was built
- The things didn't do but know I should
- Notes about the tech stack
-
