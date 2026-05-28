# Employee Salary API

## Tech Stack

* Node.js + TypeScript
* Express
* Prisma ORM
* SQLite
* Jest (TDD)

---

## Features

* Employee CRUD
* Salary calculation (country-based deduction)
* Salary metrics (country + job title)

---

## API Endpoints

### Employee

* `POST /employees`
* `GET /employees`
* `GET /employees/:id`
* `PUT /employees/:id`
* `DELETE /employees/:id`

### Salary

* `GET /employees/:id/salary`

### Metrics

* `GET /metrics/country/:country`
* `GET /metrics/job/:jobTitle`

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/employee-api.git
cd employee-api
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create a `.env` file in the root:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
```

---

### 4. Setup Database (Prisma + SQLite)

```bash
npx prisma generate
npx prisma migrate dev --name init
```

👉 This will:

* Create SQLite database (`dev.db`)
* Generate Prisma client

---

### 5. Run the application

```bash
npm run dev
```

👉 Server will start at:

```
http://localhost:3000
```

---

## 🧪 Running Tests (TDD)

```bash
npm run test
```

Optional (coverage):

```bash
npm run test:cov
```


## 🧠 TDD Approach

All features were built using:

1. Failing tests (RED)
2. Minimal implementation (GREEN)
3. Refactoring (REFACTOR)

Commit history reflects this workflow.

---

## 🤖 AI Usage

AI was used to:

* Scaffold boilerplate
* Generate initial test cases
* Validate edge cases


All generated code was carefully reviewed, refactored, and aligned with:

* SOLID principles
* DRY practices
* Production-ready standards

---

## 🚀 Notes

* Prisma ensures type-safe DB queries
* SQLite used for simplicity and portability
* Designed with scalability and maintainability in mind

---
