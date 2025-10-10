# Food-view 🍔🎥

![GitHub repo size](https://img.shields.io/github/repo-size/SantuxD/Food-view)
![GitHub contributors](https://img.shields.io/github/contributors/SantuxD/Food-view)
![GitHub license](https://img.shields.io/github/license/SantuxD/Food-view)
![GitHub stars](https://img.shields.io/github/stars/SantuxD/Food-view?style=social)

> A full-stack food reel application where users browse food videos, explore partner profiles, and order meals. Built with React, Node.js, MongoDB, JWT, and Framer Motion for smooth animations.


## 🚀 Table of Contents

- [Overview](#overview)  
- [Tech Stack](#tech-stack)  
- [Features](#features)  
- [Folder Structure](#folder-structure)  
- [Getting Started](#getting-started)  
- [Environment Variables](#environment-variables)  
- [Running Locally](#running-locally)  
- [Future Enhancements](#future-enhancements)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)

---

## 📝 Overview

Food-view allows users to:  
- Log in and browse **food reels** uploaded by food partners.  
- Explore partner profiles to see uploaded videos and meals served.  
- Order food directly from videos.  

Backend handles authentication, video management, and partner/user data using MongoDB.

---

## 🛠 Tech Stack

- **Frontend:** React.js + Tailwind Css + Framer Motion  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Token)  
- **Others:** Axios for API calls, ImageKit for store Video/File upload support

---

## ✨ Features

- User Authentication (Login / Signup)  
- Food Reels Feed (scrollable video feed)  
- Partner Profiles (video count, meals served)  
- Basic Order functionality  
- Smooth UI animations with Framer Motion  
- Responsive design (mobile-first)

---

## 📂 Folder Structure
Food-view/
├── backend/
│ ├── controllers/ # API logic
│ ├── models/ # MongoDB schemas
│ ├── routes/ # API endpoints
│ ├── middlewares/ # JWT auth, error handling
│ └── server.js # Entry point
└── frontend/
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Home, Login, Profile, etc.
│ ├── services/ # API calls
│ ├── assets/ # Images, videos, screenshots
│ └── App.jsx / index.js
└── public/

---

## ⚡ Getting Started

### Prerequisites

- Node.js (v14+)  
- npm or yarn  
- MongoDB (local or Atlas)

---

### Environment Variables

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret

```
---
### 🔮 Future Enhancements

- Full order & cart system (like Swiggy / Zomato)
- Payment integration (Stripe / PayPal)
- Real-time order tracking & notifications
- Ratings & reviews for food items and partners
- Admin dashboard for managing partners and content

---
### 🤝 Contributing

  - Fork the repo
  - Create a branch: git checkout -b feature/my-feature
  - Make your changes
  - Commit: git commit -m "Add feature"
  - Push: git push origin feature/my-feature
  - Open a Pull Request

---
### 📄 License

---
### 📫 Contact

- GitHub: https://github.com/SantuxD
- Email: mondalsantu104@gmail.com

