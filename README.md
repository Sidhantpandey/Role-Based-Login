# Sequelize Setup with Migrations

This guide walks you through setting up Sequelize ORM in a Node.js project with database migrations support.

## Requirements

- Node.js
- NPM/Yarn
- MySQL or PostgreSQL

---

##  Setup Instructions

```bash
npm init -y

npm install sequelize mysql2

npm install --save-dev sequelize-cli

npx sequelize-cli init

npx sequelize-cli db:create

npx sequelize-cli model:generate --name User --attributes name:string,email:string

npx sequelize-cli db:migrate


