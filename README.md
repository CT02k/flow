# 💸 Flow — Personal Finance Management App

**Flow** is a personal finance management application built with **Next.js**, designed to help users track income, expenses, and account balances through a clean and modern interface.

The project is currently in an early stage — authentication via **NextAuth** is functional, and the base dashboard design is implemented.

---

## 🚀 Tech Stack

- **Next.js 14+ (App Router)**
- **TypeScript**
- **NextAuth** — authentication
- **Prisma** — database ORM
- **TailwindCSS** — styling
- **Shadcn**
- **Lucide Icons**

---

## 🧠 Current Features

- [x] NextAuth authentication (Google, GitHub, etc.)
- [x] Dashboard UI with balance, income, and expense cards
- [x] Basic transactions endpoint
- [ ] Monthly analytics and charts
- [ ] Full CRUD for transactions
- [ ] Categories system
- [ ] Light / Dark theme
- [ ] Notifications ?

---

## ⚙️ Setup & Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/ct02k/flow

# 2. Enter the project folder
cd flow

# 3. Install dependencies
npm i

# 4. Create and configure the .env file
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

- [x] Initialize project
- [x] Setup NextAuth and providers
- [x] Build base dashboard layout
- [x] Integrate transactions endpoint
- [x] Add i18n
- [ ] Add loading states and better animations
- [ ] Create seed data for testing
- [ ] Refine typings
- [x] Add transaction create/edit forms
- [x] Display transaction list in dashboard
- [ ] Filter by type (income, expense)
- [ ] Connect multiple account (manual and maybe automatic later) sources (bank, PayPal, etc.)
- [ ] Add charts (because charts is cool)
- [ ] Implement dark/light mode
- [ ] Create profile page (account settings/preferences)
- [ ] Improve mobile responsiveness
- [ ] Add monitoring
- [ ] Optimize (yes)

---

maybe i forgot some things here
