# 🧠 Coding Quiz App

An interactive fullstack quiz application built with TypeScript, React, Express, and MongoDB. This app features a clean UI, dynamic scoring, and full deployment pipelines using GitHub Actions and Render.

---

## Live Demo

🌐 [View Live Application](https://gitaction.onrender.com)  
📦 [GitHub Repo](https://github.com/C-Hunter77/GitAction)

---

##  Technologies Used

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Cypress](https://www.cypress.io/) for component and end-to-end testing

### Backend
- [Express.js](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Mongoose](https://mongoosejs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv) for environment variable support

### DevOps
- [GitHub Actions](https://github.com/features/actions) for CI/CD
- [Render](https://render.com/) for live deployment
- [Concurrently](https://www.npmjs.com/package/concurrently) for local dev scripting

---

## 📂 Project Structure
```plaintext
/
├── client/             # React frontend
│   └── src/
├── server/             # Express backend
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   └── config/
│   └── dist/           # Compiled server output
├── .github/workflows/  # CI/CD pipeline config
├── package.json        # Root build & deploy scripts
