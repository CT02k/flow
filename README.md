<img src="https://github.com/user-attachments/assets/f32492f7-9bf7-405e-870c-5fe611613971" height="256" width="256"/>

[![Vercel Deploy](https://img.shields.io/github/deployments/ct02k/flow/Production?label=vercel&logo=vercel)](https://flow-omega-one.vercel.app)
[![GitHub last commit](https://img.shields.io/github/last-commit/ct02k/flow)](https://github.com/ct02k/flow/commits/main)



https://github.com/user-attachments/assets/076a3920-ff2f-4040-a32a-164fe2884d4b



## Overview
Flow is a personal finance management tool.
> _Currently in early development_

| Section                              | Description                   |
| ------------------------------------ | ----------------------------- |
| [Tech Stack](#-tech-stack)        | Core technologies used        |
| [Setup](#-setup--running-locally) | How to run locally            |
| [Roadmap](#-roadmap--to-do-list)  | Next development goals        |

---

## Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **NextAuth** — authentication
- **Prisma** — database ORM
- **TailwindCSS + Shadcn**
- **Lucide Icons**

---

## Setup & Running Locally

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

Then open -> [http://localhost:3000](http://localhost:3000)

---

## Roadmap / To-Do List

- [x] Initialize project  
- [x] Setup NextAuth and providers  
- [x] Build base dashboard layout  
- [x] Integrate transactions endpoint  
- [x] Add transaction create/edit forms  
- [x] Display transaction list in dashboard  
- [x] Full CRUD for transactions  
- [ ] Categories system 
- [x] Filter by type (income, expense)  
- [x] Add multiple accounts  
- [ ] Charts & analytics 
- [ ] Dark/light mode  
- [ ] Profile page  
- [ ] Mobile responsiveness 
- [ ] Monitoring & optimizations 
