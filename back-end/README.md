# Projetc.t back-end

Back-end for Projec.t, an projects management solution.

# How to run for development

1. Clone this repository

2. Install all dependencies:
```bash
npm i
```

3. Create a PostgreSQL database with whatever name you want

4. Configure the `.env` file using the `.env.example` file (see "Running application locally or inside docker section" for details)

5. Run all migrations:
```bash
npm run prisma:migrate:deploy
```

6. Run the back-end in a development environment:
```bash
npm run dev
```

# (docker)  ~In Progress~