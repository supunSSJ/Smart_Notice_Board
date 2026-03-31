# 🚀 Smart Notice Board

![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-Next.js_|_React-black?style=for-the-badge&logo=next.js)
![Backend](https://img.shields.io/badge/Backend-Node.js_|_Express-brightgreen?style=for-the-badge&logo=node.js)
![Database](https://img.shields.io/badge/Database-MongoDB-green?style=for-the-badge&logo=mongodb)

A modern, full-stack digital signage web application built to replace traditional, cluttered physical corkboards. **Smart Notice Board** allows educational institutions, corporate offices, and community centers to display live, automated announcements, alerts, and advertisements on large screens while giving users physical-to-digital access via dynamically generated QR codes.

---

## ✨ Key Features

### 📺 1. Live Public Dashboard (Digital Signage)
- **Auto-Refreshing Feed:** Continuously fetches the latest notices and announcements without page reloading.
- **Visual Prioritization:** Automatically highlights important updates using color-coding (e.g., Red for High Priority/Alerts, Blue for General, Yellow/Glow for Pinned).
- **Featured Spotlights:** An automated, timed image carousel designed to showcase sponsored advertisements, major events, or promotional banners.
- **Clock & Date Widget:** Built-in dynamic local time and date display for public screens.

### 🔐 2. Secure Admin Management System
- **Comprehensive Dashboard:** View complete system statistics including active notices, pinned items, live ads, and general scan activity.
- **Create & Manage Content:** Secure forms to easily draft, categorize, and prioritize new notices or upload advertisement banners.
- **Media Uploads:** Integrated with **Cloudinary** for seamless, secure, and optimized image uploading and hosting.

### 📱 3. Physical-to-Mobile Bridge (QR Code Share)
- **Dynamic QR Generation:** The admin panel natively generates a QR code based on the live domain URL using `react-qr-code`.
- **Downloadable Assets:** Administrators can instantly download the QR code as a `.png` to print on posters, flyers, or physical boards.
- **Instant Access:** Onlookers viewing the huge digital screen can simply scan the code with their smartphone to view the entire live dashboard in the palms of their hands.

---

## 🛠️ Tech Stack

### Frontend (Client-Side)
- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Glassmorphism & modern UI patterns)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management & Data Fetching:** React Hooks, `axios`
- **Utilities:** `react-qr-code`

### Backend (Server-Side)
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) & Mongoose ORM
- **Authentication:** JSON Web Tokens (JWT) & bcrypt
- **Media Storage:** [Cloudinary](https://cloudinary.com/) API & Multer

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Node.js installed on your local machine.
- A MongoDB URI (Local or MongoDB Atlas).
- Cloudinary Account credentials (for image uploads).

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/smart-notice-board.git
cd smart-notice-board
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory and add your environment variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev
```

### 4. Admin Access
You can create a script to seed an initial admin user directly into your MongoDB database, or sign up via the API to gain access to the `/admin` dashboard routes.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License
This project is licensed under the [MIT License](LICENSE).
