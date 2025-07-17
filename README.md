# 🎬 Cinema Microservices Architecture

A practical **microservices-based cinema system** built with **Node.js**, **Express**, and an **API Gateway**.

This project demonstrates how to structure multiple Node.js microservices that communicate through a gateway — providing a real-world example of distributed systems and microservices orchestration.

---

## 📂 Services Overview

This project includes **three main services**:

- **API Gateway:** Routes incoming requests to the correct microservice.
- **Movies Service:** Provides movie data.
- **Cinema Catalog Service:** Provides cinema listings and available sessions.

Each service runs independently on its own port.

---

## 🧩 Tech Stack

- **Node.js**, **Express**
- **RESTful APIs**
- **Microservices Architecture**
- **API Gateway Pattern**
- **MongoDB**

---

## 🚀 How to Run

### 1️⃣ Clone the Repository

-  git clone https://github.com/abnobrega/cinema-microservices-architecture.git

-  cd cinema-microservices-architecture

---

### 2️⃣ Install Dependencies for each service:

# API Gateway
- cd api-gateway
- npm install

# Movies Service
- cd ../movies-service
- npm install

# Cinema Catalog Service
- cd ../cinema-catalog-service
- npm install

---

### 3️⃣ Start the Services
# Open three terminals, one for each service:

# Terminal 1
- cd api-gateway
- npm start

# Terminal 2
- cd movies-service
- npm start

# Terminal 3
- cd cinema-catalog-service
- npm start

---

### 🌐 Default Endpoints
### Service	            Port	Example URL
●  API Gateway	            3000	http://localhost:3000/

●  Movies Service	        3001	http://localhost:3001/movies

●  Cinema Catalog Service	3002	http://localhost:3002/cinemas

---

### ⚙️ Architecture Diagram
[ Client ]
   |
   V
[ API Gateway ]
   |             |
   V             V
[Movies Service] [Cinema Catalog Service]

✅ The API Gateway handles all client requests, routing them to the right microservice.

✅ Each microservice handles its own logic and could use its own database.

---

### 📝 Features 
✅ Modular architecture

✅ Clear REST API structure

✅ Demonstrates real-world microservices orchestration

✅ Easy to extend with new services

✅ Ready for containerization (Docker)

---

### 👨‍💻 Author
-  Developed by Alexandre Bonturi Nóbrega
-  Independent Backend & Web3 Software Engineer
-  LinkedIn: https://www.linkedin.com/in/alexandrebonturinobrega/


