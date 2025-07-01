# 🌐 Sago – Modern Authentication Web App

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Click%20Here-blue?style=flat-square)](https://sago-xi.vercel.app/)
[![Built With](https://img.shields.io/badge/Built%20With-Next.js%2C%20Tailwind%20CSS%2C%20NextAuth-informational?style=flat-square)](#tech-stack)

Sago is a modern authentication web application built with the latest web technologies. It provides seamless user login using Google (OAuth), protected routing, and session handling. Designed for performance, security, and simplicity, Sago is ideal for developers looking to integrate secure login flows in Next.js applications.

## 🚀 Features

- 🔐 Google Sign-in with **NextAuth.js**
- 🧾 JWT-based session management
- 🌈 Responsive UI with **Tailwind CSS** & **Aceternity UI**
- 🗂️ MongoDB user database
- 🔒 Protected client-side routes
- 📦 Optimized for Vercel deployment

## 🖥️ Live Demo

🔗 **Production URL**: [https://sago-xi.vercel.app/](https://sago-xi.vercel.app/)

## 🛠 Tech Stack

| Category           | Technology                         |
|--------------------|-------------------------------------|
| Framework          | [Next.js](https://nextjs.org/)     |
| Styling            | [Tailwind CSS](https://tailwindcss.com/), [Aceternity UI](https://ui.aceternity.com/) |
| Authentication     | [NextAuth.js](https://next-auth.js.org/) |
| Database           | [MongoDB](https://www.mongodb.com/) |
| Deployment         | [Vercel](https://vercel.com/)      |

## 🧰 Getting Started Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/sago.git
cd sago
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env.local` file in the root directory and add the following:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=anyrandomstring
NEXTAUTH_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

## 📁 Folder Structure (Simplified)

```
sago/
├── pages/
│   ├── index.tsx
│   ├── dashboard.tsx
│   └── api/
│       └── auth/[…nextauth].ts
├── components/
│   └── AuthButton.tsx
├── lib/
│   ├── mongodb.ts
│   └── authOptions.ts
├── models/
│   └── user.model.ts
├── public/
├── styles/
├── .env.local
└── README.md
```

## 👤 Author

**Rahul**  
🔗 [LinkedIn](#)  
🐙 [GitHub](#)