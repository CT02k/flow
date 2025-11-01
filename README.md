<img src="https://github.com/user-attachments/assets/f32492f7-9bf7-405e-870c-5fe611613971" height="256" width="256"/>

[![Vercel Deploy](https://img.shields.io/github/deployments/ct02k/flow/Production?label=vercel\&logo=vercel)](https://flow-omega-one.vercel.app)
[![GitHub last commit](https://img.shields.io/github/last-commit/ct02k/flow)](https://github.com/ct02k/flow/commits/main)

---

[https://github.com/user-attachments/assets/076a3920-ff2f-4040-a32a-164fe2884d4b](https://github.com/user-attachments/assets/076a3920-ff2f-4040-a32a-164fe2884d4b)

---

## What’s Flow?

**Flow** is a personal finance app, still early in development, and I’m refining things as the project evolves.

---

## Running Locally

```bash
git clone https://github.com/ct02k/flow

cd flow

npm i

cp .env.example .env
# Add your NextAuth keys and database connection string

npx prisma migrate dev

npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

---

## Roadmap

What’s done and what’s coming next:

* [x] Initial setup
* [x] NextAuth integration
* [x] Base dashboard layout
* [x] Full CRUD for transactions
* [x] Filter by type (income/expense)
* [x] Multiple accounts support
* [ ] Categories system
* [ ] Charts & analytics
* [ ] Light/dark mode
* [ ] Profile page
* [ ] Mobile responsiveness
* [ ] Monitoring & performance tweaks
