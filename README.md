# 🚀 Role-Based Authentication System (MERN + TypeScript)

A **secure, scalable, and type-safe** Role-Based Authentication backend built using **Express.js**, **MongoDB**, and **TypeScript**.
Implements JWT authentication and **role-based route protection** for **Client**, **HR**, and **Super Admin** users.

---

## 🧱 Tech Stack

| Layer                       | Technology                                   |
| --------------------------- | -------------------------------------------- |
| **Frontend**                | Next.js (TypeScript, SSR ready)              |
| **Backend**                 | Node.js + Express + TypeScript               |
| **Database**                | MongoDB (Mongoose ODM)                       |
| **Authentication**          | JWT (JSON Web Token)                         |
| **UI Framework (optional)** | ShadCN / TailwindCSS                         |
| **Hosting**                 | Vercel (frontend) + Render/Railway (backend) |

---

## 🧩 Features

✅ Separate **Login & Signup** flows for all roles
✅ **JWT authentication** (httpOnly cookie or Bearer Token)
✅ **Middleware-based role protection** (`authMiddleware` + `restrictTo`)
✅ **Role-specific dashboards & data visibility:**

* **Client:** View all HRs, contact them
* **HR:** View only clients who contacted them
* **Super Admin:** Access all users and interactions
  ✅ Modular, scalable folder structure
  ✅ Fully written in **TypeScript**
  ✅ Ready for deployment

---

## ⚙️ Project Structure

```
backend/
├── src/
│   ├── config/           # Database connection
│   ├── controllers/      # Business logic (auth, roles)
│   ├── middleware/       # Auth & role guards
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API route definitions
│   ├── types/            # TypeScript declarations
│   ├── utils/            # JWT & helpers
│   ├── app.ts            # Express app setup
│   └── server.ts         # Entry point
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## 🧠 Role Overview

| Role            | Access                                 | Permissions                                 |
| --------------- | -------------------------------------- | ------------------------------------------- |
| **Client**      | `/api/roles/hrs`, `/api/roles/contact` | View HRs, contact HR                        |
| **HR**          | `/api/roles/my-clients`                | View only clients who contacted them        |
| **Super Admin** | `/api/roles/all-users`                 | View all users, interactions, manage system |

---

## 🔐 Authentication Flow

1. **User signs up or logs in**
2. **Server generates JWT token** with `{ id, role }`
3. Token stored in **httpOnly cookie** or sent as **Bearer token**
4. Middleware:

   * `authMiddleware`: verifies token
   * `restrictTo('role')`: restricts routes based on user role

---

## 📦 API Endpoints

### 🔸 Auth Routes

| Method | Endpoint            | Description                | Auth Required |
| ------ | ------------------- | -------------------------- | ------------- |
| `POST` | `/api/auth/register`| Register new user          | ❌            |
| `POST` | `/api/auth/login`   | Login and get token        | ❌            |

---

### 🔸 Role Routes

| Method | Endpoint                | Description                   | Allowed Roles |
| ------ | ----------------------- | ----------------------------- | ------------- |
| `GET`  | `/api/roles/hrs`        | List all HRs                  | Client, Admin |
| `POST` | `/api/roles/contact`    | Client contacts an HR         | Client        |
| `GET`  | `/api/roles/my-clients` | List clients who contacted HR | HR, Admin     |
| `GET`  | `/api/roles/all-users`  | List all users & contacts     | Admin         |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/<your-username>/role-auth-backend.git
cd role-auth-backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment

Create a `.env` file in root directory:

```env
PORT=7000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/role-auth
JWT_SECRET=your_secret_key

```

### 4️⃣ Run Development Server

```bash
npm run dev
```

> Server starts on: [http://localhost:7000](http://localhost:7000)

---

## 🌐 Live Demo URLs

| Service                | URL                                                                                          |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| **Frontend (Next.js)** | [https://nextjs-role-auth-system.vercel.app](https://nextjs-role-auth-system.vercel.app)     |
| **Backend (Express)**  | [https://nextjs-role-auth-system.onrender.com](https://nextjs-role-auth-system.onrender.com) |

---

## 🧰 Available Scripts

| Command         | Description                    |
| --------------- | ------------------------------ |
| `npm run dev`   | Run dev server with hot reload |
| `npm run build` | Compile TypeScript to JS       |
| `npm start`     | Run production build           |
| `npm run seed`  | Seed demo users into database  |

---

## 🧩 Example Login Request

**POST** `/api/auth/login`

```json
{
  "email": "client1@example.com",
  "password": "ClientPass123"
}
```

**Response:**

```json
{
  "message": "Logged in",
  "role": "client",
  "name": "Client One",
  "token": "<jwt_token>"
}
```

---

## 🧠 Middleware Summary

| Middleware             | Description                             |
| ---------------------- | --------------------------------------- |
| `authMiddleware`       | Verifies JWT token from headers/cookies |
| `restrictTo(...roles)` | Grants access only to allowed roles     |

---

## 🧾 Evaluation Checklist

✅ Role-based route protection
✅ Secure JWT authentication
✅ Clean and modular TypeScript code
✅ Proper folder structure
✅ Functional endpoints for all roles
✅ Seed script with demo users
✅ Working demo + deployment URLs

---

## 📜 License

This project is released under the **MIT License** — feel free to use and modify it.

---

## 👨‍💻 Author

**Navneet Shahi**
📧 [navneet.shahi2004@gmail.com](mailto:navneet.shahi2004@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/navneet-shahi-a8762824b) | [GitHub](https://github.com/navneetshahi14)

---