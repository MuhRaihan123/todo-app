# 📝 Todo App

Full-stack Todo application dengan Node.js backend dan modern frontend.

## 🎯 Features

- ✅ User Authentication (Register & Login)
- ✅ CRUD Operations untuk Todos
- ✅ Dashboard dengan Statistics
- ✅ Priority Levels (Low, Medium, High)
- ✅ Due Date Tracking
- ✅ Mark Todo sebagai Complete/Incomplete
- ✅ JWT Authentication
- ✅ Secure Password Hashing

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM untuk database
- **PostgreSQL** - Database (Supabase)
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Frontend
- [Framework frontend Anda - tambahkan sesuai yang digunakan]

## 📦 Installation

### Prerequisites
- Node.js (v14 atau lebih tinggi)
- npm atau yarn
- PostgreSQL database (Supabase account)

### Backend Setup

1. Clone repository
```bash
git clone https://github.com/MuhRaihan123/todo-app.git
cd todo-app/backend
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
# Buat file .env di folder backend
cp .env.example .env
```

4. Configure `.env` file
```env
DB_HOST=your_supabase_host
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=30d
PORT=5000
```

5. Run development server
```bash
npm run dev
```

Backend akan berjalan di `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🔐 Environment Variables

Buat file `.env` di folder backend dengan konfigurasi berikut:

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | Database host dari Supabase | `db.xxxxx.supabase.co` |
| `DB_PORT` | Database port | `5432` |
| `DB_NAME` | Database name | `postgres` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `your_secure_password` |
| `JWT_SECRET` | Secret key untuk JWT | `your_random_secret_key` |
| `JWT_EXPIRES_IN` | Token expiration time | `30d`, `7d`, `24h` |
| `PORT` | Server port | `5000` |

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user

### Todos
- `GET /api/todos` - Get semua todos
- `GET /api/todos/:id` - Get todo by ID
- `POST /api/todos` - Create todo baru
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## 🧪 Testing API dengan Insomnia/Postman

### 1. Register User
```json
POST http://localhost:5000/api/auth/register
Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 2. Login
```json
POST http://localhost:5000/api/auth/login
Body:
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response akan mengandung `token` - copy token ini!

### 3. Create Todo (Butuh Authorization)
```json
POST http://localhost:5000/api/todos
Headers:
Authorization: Bearer YOUR_TOKEN_HERE

Body:
{
  "title": "Belajar Node.js",
  "description": "Menyelesaikan tutorial backend",
  "priority": "high",
  "dueDate": "2025-02-20"
}
```

## 📁 Project Structure
```
todo-app/
├── backend/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── index.js             # Model initialization
│   │   ├── User.js              # User model
│   │   └── Todo.js              # Todo model
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   ├── todos.js             # Todo routes
│   │   └── dashboard.js         # Dashboard routes
│   ├── .env                     # Environment variables (not tracked)
│   ├── .env.example             # Example env file
│   ├── server.js                # Entry point
│   └── package.json
├── frontend/
│   └── ...
├── .gitignore
└── README.md
```

## 🔒 Security Notes

⚠️ **JANGAN** commit file `.env` ke Git!
⚠️ Selalu gunakan environment variables untuk data sensitif
⚠️ Ganti JWT_SECRET dengan key yang kuat di production
⚠️ Ganti semua default passwords

## 🚀 Deployment

### Backend Deployment (Railway/Render/Heroku)

1. Push code ke GitHub
2. Connect repository ke platform hosting
3. Set environment variables di dashboard hosting
4. Deploy!

### Database (Supabase)

1. Buat project di [Supabase](https://supabase.com)
2. Copy connection string dari Settings → Database
3. Update `.env` dengan credentials dari Supabase

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Muhammad Raihan**
- GitHub: [@MuhRaihan123](https://github.com/MuhRaihan123)
- Email: kitaraihan123@gmail.com

## 🙏 Acknowledgments

- Node.js community
- Supabase for awesome database service
- Express.js team

---

⭐ Jangan lupa kasih star jika project ini membantu! ⭐
