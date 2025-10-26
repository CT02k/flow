# 💸 Flow — Personal Finance Management App

[![Vercel Deploy](https://img.shields.io/github/deployments/ct02k/flow/Production?label=vercel&logo=vercel)](https://flow-omega-one.vercel.app)
[![GitHub last commit](https://img.shields.io/github/last-commit/ct02k/flow)](https://github.com/ct02k/flow/commits/main)

## 📂 Overview

**Flow** is a **personal finance management** app built with **Next.js**, designed to help users manage income, expenses, and account balances through a clean and modern UI.

> 🧪 _Currently in early development: authentication and dashboard desin are already working._

| Section                              | Description                   |
| ------------------------------------ | ----------------------------- |
| [🚀 Tech Stack](#-tech-stack)        | Core technologies used        |
| [🧠 Features](#-current-features)    | What’s done and what’s coming |
| [⚙️ Setup](#-setup--running-locally) | How to run locally            |
| [🧭 Roadmap](#-roadmap--to-do-list)  | Next development goals        |

---

## 🚀 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **NextAuth** — authentication
- **Prisma** — database ORM
- **TailwindCSS + Shadcn**
- **Lucide Icons**

---

## 🧠 Current Features

✅ **Implemented**

- NextAuth authentication (Google, GitHub, etc.)
- Dashboard UI (balance, income, expense cards)
- Basic transactions endpoint
- Transaction create/edit forms
- Transaction list display in dashboard
- Full CRUD for transactions
- Filter by type (income, expense)

---

## ⚙️ Setup & Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/ct02k/flow

# 2. Enter the project folder
cd flow

# 3. Install dependencies
npm i

# 4. Create and configure environment variables
cp .env.example .env
# Add your NextAuth keys and database connection string

# 5. Run migrations
npx prisma migrate dev

# 6. Start the development server
npm run dev
```

Then open 👉 [http://localhost:3000](http://localhost:3000)

---

## 🧭 Roadmap / To-Do List

| Status | Task                                  |
| :----: | :------------------------------------ |
|   ✅   | Initialize project                    |
|   ✅   | Setup NextAuth and providers          |
|   ✅   | Build base dashboard layout           |
|   ✅   | Integrate transactions endpoint       |
|   ✅   | Add i18n                              |
|   ✅   | Add transaction create/edit forms     |
|   ✅   | Display transaction list in dashboard |
|   ✅   | Full CRUD for transactions            |
|   🕐   | Categories system                     |
|   ✅   | Filter by type (income, expense)      |
|   ✅   | Add multiple accou                    |
|   🕐   | Charts & analytics                    |
|   🕐   | Dark/light mode                       |
|   🕐   | Profile page                          |
|   🕐   | Mobile responsiveness                 |
|   🕐   | Monitoring & optimizations            |
