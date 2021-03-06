# Adonis fullstack application

This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

----

**I have checked out:**

- Adonis Structure and Architecture
- Requests
- Views and Edge template engine
- Forms
- Models
- Migrations
- Input Validation
- Flash Messages
- CRUD Operations
- Routing/Redirecting
- Middleware
- Exception Handlers
- Authentication
- Access Control and Conditional Rendering based on auth
- Override the auto-incrementing id of posts to use uuid/v4
- Model relationships (User has many Posts)
- Access Control and Conditional Rendering based on post relationship to user