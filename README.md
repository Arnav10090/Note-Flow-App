<div align="center">

# 📝 NoteFlow

### *Your Personal Note-Taking Companion*

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/Django-REST-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

**A modern, secure, and intuitive full-stack notes application built with React and Django REST Framework**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [API Documentation](#-api-documentation)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔐 **Secure Authentication**
- JWT-based authentication system
- Protected routes and API endpoints
- Secure token refresh mechanism
- User registration and login

</td>
<td width="50%">

### 📱 **Modern UI/UX**
- Clean and intuitive interface
- Responsive design for all devices
- Modal-based note creation
- Real-time note management

</td>
</tr>
<tr>
<td width="50%">

### 📝 **Note Management**
- Create, read, and delete notes
- Title and content fields
- Timestamp tracking
- User-specific notes

</td>
<td width="50%">

### ⚡ **Performance**
- Fast Vite build system
- Optimized API calls with Axios
- Smooth animations and transitions
- Efficient state management

</td>
</tr>
</table>

---

## 🎯 Demo

### Main Features Preview

```
🏠 Home Page
   ├── View all your notes in a grid layout
   ├── Create new notes with modal interface
   ├── Delete notes with confirmation
   └── View full note content

🔒 Authentication
   ├── User registration with validation
   ├── Secure login system
   ├── JWT token management
   └── Protected routes
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **pip** (Python package manager)
- **PostgreSQL** (optional, SQLite is default)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Notes-app-React+Django
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Create and activate virtual environment**
   ```bash
   # Windows
   python -m venv env
   env\Scripts\activate

   # macOS/Linux
   python3 -m venv env
   source env/bin/activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure environment variables**
   
   Create a `.env` file in the backend directory:
   ```env
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   DATABASE_URL=your-database-url (optional)
   ```

6. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

7. **Create superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

8. **Start the development server**
   ```bash
   python manage.py runserver
   ```
   
   Backend will run on `http://localhost:8000`

### Frontend Setup

1. **Open a new terminal and navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:5173`

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=white) | UI Library |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Build Tool |
| ![React Router](https://img.shields.io/badge/-React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) | Routing |
| ![Axios](https://img.shields.io/badge/-Axios-5A29E4?style=flat-square&logo=axios&logoColor=white) | HTTP Client |
| ![JWT Decode](https://img.shields.io/badge/-JWT_Decode-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) | Token Handling |

### Backend
| Technology | Purpose |
|------------|---------|
| ![Django](https://img.shields.io/badge/-Django-092E20?style=flat-square&logo=django&logoColor=white) | Web Framework |
| ![DRF](https://img.shields.io/badge/-Django_REST-ff1709?style=flat-square&logo=django&logoColor=white) | REST API |
| ![JWT](https://img.shields.io/badge/-Simple_JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) | Authentication |
| ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white) | Database (Optional) |
| ![SQLite](https://img.shields.io/badge/-SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white) | Database (Default) |

---

## 📂 Project Structure

```
Notes-app-React+Django/
├── 📁 backend/
│   ├── 📁 api/                    # Main API app
│   │   ├── models.py              # Note model
│   │   ├── serializers.py         # DRF serializers
│   │   ├── views.py               # API views
│   │   └── urls.py                # API routes
│   ├── 📁 backend/                # Project settings
│   │   ├── settings.py            # Django settings
│   │   └── urls.py                # Main URL config
│   ├── manage.py                  # Django management
│   └── requirements.txt           # Python dependencies
│
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/         # React components
│   │   │   ├── Form.jsx           # Reusable form
│   │   │   ├── Note.jsx           # Note card component
│   │   │   ├── LoadingIndicator.jsx
│   │   │   └── ProtectedRoutes.jsx
│   │   ├── 📁 pages/              # Page components
│   │   │   ├── Home.jsx           # Main notes page
│   │   │   ├── Login.jsx          # Login page
│   │   │   ├── Register.jsx       # Registration page
│   │   │   └── NotFound.jsx       # 404 page
│   │   ├── 📁 styles/             # CSS files
│   │   ├── api.js                 # Axios configuration
│   │   ├── App.jsx                # Main app component
│   │   └── main.jsx               # Entry point
│   ├── package.json               # Node dependencies
│   └── vite.config.js             # Vite configuration
│
└── README.md                      # You are here! 📍
```
## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Token refresh mechanism
- ✅ Protected API endpoints
- ✅ CORS configuration
- ✅ User-specific data isolation
- ✅ Secure password hashing

## 👨‍💻 Author

**Your Name**

- GitHub: [@Arnav10090](https://github.com/Arnav10090)
- Project: [Note-Flow-App](https://github.com/Arnav10090/Note-Flow-App)

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with ❤️ and ☕**

</div>
