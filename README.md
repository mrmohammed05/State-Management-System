<img width="946" height="580" alt="image" src="https://github.com/user-attachments/assets/3e03fdb0-4fa3-44b6-bd8a-6a73e07cfd57" />🏙️ STATE MANAGEMENT SYSTEM

A full-stack web application for managing **States, Cities, and Areas** built using **React, Spring Boot, MySQL**, 
and containerized using **Docker** and **Docker Compose**.
                                  --------------------------------
🚀 Tech Stack

### Frontend
- React.js
- Bootstrap
- Axios

### Backend
- Spring Boot
- Spring Data JPA
- REST APIs

### Database
- MySQL 8.0

### DevOps
- Docker
- Docker Compose
- Nginx
- Multi-stage Docker Builds

## 📁 Project Structure

State-Management-System/
│
├── SteCtyAreaFE/
│   └── myapp/
│       ├── Dockerfile
│       ├── package.json
│       └── src/
│
├── SteCtyAreaBE/
│   └── new/
│       ├── Dockerfile
│       ├── pom.xml
│       └── src/
│
└── docker-compose.yml

✨ Features

- Add State
- Update State
- Delete State
- View States

- Add City
- Update City
- Delete City
- View Cities

- Add Area
- Update Area
- Delete Area 
- View Areas


- REST API Integration
- MySQL Database Connectivity
- Dockerized Full Stack Application

## 🐳 Docker Architecture

                Docker Compose

        +-------------------------+

        React Frontend (Nginx)
               Port 3000
                    │
                    ▼

       Spring Boot Backend
              Port 8081
                    │
                    ▼

           MySQL Database
              Port 3306
              (3307 Host)

        +-------------------------+

## ⚙️ Prerequisites

- Docker Desktop
- Docker Compose
- Git

---

## ▶️ Run the Project

1.Clone the repository
git clone https://github.com/mrmohammed05/State-Management-System.git

2.Go to the project directory
cd State-Management-System

3.Build and start all containers
docker compose up --build -d

## 🌐 Application URLs to check in Browser

Frontend
http://localhost:3000

Backend
http://localhost:8081

MySQL 
Execute Commands Inside a Running Container
Terminal docker exec -it mysql-db mysql -u root -p                                            
        password :- root

## 📦 Docker Command
docker images
docker ps
docker ps -a
docker logs <container-name>
docker compose up --build -d
docker compose down
docker compose restart











---

## 👨‍💻 Author

**Mohammed**

GitHub: https://github.com/mrmohammed05

LinkedIn: https://www.linkedin.com/in/mr-mohammed05/

---

## 📄 License

This project is created for learning and educational purposes.
