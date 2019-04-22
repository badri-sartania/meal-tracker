# Meal Tracker

## Project Structure

The top-level directly layout looks as follows:

```bash
.
├── mealtracker.api/            # Meal Tracker Rest API
├── mealtracker.web/            # Meal Tracker Front-end
└── package.json                # List of project dependencies
```

## Tech Stack

- [MERN] for building REST apis and component-based UIs
- [Create React App] for frontend development infrastructure

## Getting Started

```bash
$ yarn install                   # Install Node.js dependencies for all projects (services)
```

## Starting mealtracker.api/

**Step 1:** Start the DataBase.

```bash
$ mongod --dbpath [database path]
```

**Step 2:** Initialize DB.

```bash
$ cd mealtracker.api/
$ yarn init-db
```

**Step 3:** Start the service.

```bash
$ cd mealtracker.api/
$ yarn start
```

If the command is successful you should see server running on port 4000 of localhost.

## Starting mealtracker.web/

Once you have the API Server running, you can go ahead by starting the web project.

```bash
$ cd mealtracker.web/
$ yarn start
```

If the command is successful, you should be able to see the Meal Tracker web-ui being served on port 3000.
