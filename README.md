# 💰 Finance Tracker

A full-stack MERN Finance Tracker application that helps users securely log in, manage their income and expenses, and visualize financial data through interactive charts. Users can track transactions, view summaries, and download reports.

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, plain CSS, Vite
- **Backend**: Node.js, Express.js, MongoDB
- **Other**: REST API, Emoji Picker, File Upload (Profile Pic), XLSX file download

---

## 🚀 Features

- 🔐 User Authentication (Login / Signup)
- 📊 Dashboard with Line, Bar, and Pie Charts
- 💵 Add, delete and view Income & Expense  records
- 📁 Download income/expense reports as Excel files
- 🧾 View latest transactions
- 👤 Add profile picture
- 😄 Emoji picker support in entries

---

## 📁 Project Structure

```
finance-tracker/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── servers/
│   ├── .env
│   ├── endpoints.txt
│   ├── env.txt
│   ├── users.txt
│   ├── LEARNING NOTES.md
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   └── finance-tracker/
│       ├── public/
│       ├── src/
│       ├── .gitignore
│       ├── eslint.config.js
│       ├── index.html
│       ├── vite.config.js
│       ├── LEARNING NOTES.md
│       ├── gitattributes
│       ├── README.md
│       ├── package.json
│       └── package-lock.json
```

---

## ⚙️ Installation Instructions

### 🔹 Frontend Setup
```bash
cd frontend/finance-tracker
npm install
npm run dev
```

### 🔹 Backend Setup
```bash
cd backend
npm install
npm start
```

📌 Make sure to create a `.env` file inside the `backend/` directory with these keys:
```
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

---

## 📌 Usage Instructions

1. Sign up or log in with your credentials.
2. Access the dashboard to get an overview of your financial data.
3. Use the **Income** and **Expense** pages to add, edit, or delete entries.
4. View your financial trends using interactive **Line**, **Bar**, and **Pie** charts.
5. Check **Latest Transactions** at a glance.
6. Use the **Download** button to export data as Excel sheets.
7. Upload a **Profile Picture** and use **Emoji Picker** for fun & clarity.

---

## 📡 API Overview

The app uses RESTful API endpoints. Main routes include:

- `POST /api/v1/auth/register` – User registration  
- `POST /api/v1/auth/login` – User login
- `POST /api/v1/auth/upload-image` – Upload profile picture  
- `POST /api/v1/income/add` – Add income  
- `GET /api/v1/income/get` – Fetch income  
- `DELETE /api/v1/income/id` – Delete income  
- `POST /api/v1/expense/add` – Add expense  


📄 For full documentation, see: 
    - `backend/endpoints.txt`
    - `https://web.postman.co/workspace/My-Workspace~edf7bfa5-e98f-4769-801a-a58548645366/collection/41097956-9e39d0f4-84ec-46e0-be71-82d259cd9f96?action=share&source=copy-link&creator=41097956`

---

## 📚 Developer Notes

You can read more about the internal code flow and learning reflections in:

- [`backend/LEARNING_NOTES.md`](./backend/LEARNING_NOTES.md)
- [`frontend/LEARNING_NOTES.md`](./frontend/LEARNING_NOTES.md)


---

