# CivicEye Web Admin Dashboard

CivicEye is a full-stack infrastructure monitoring platform built to streamline civic issue reporting and resolution across Egypt. This repository contains the source code for the web-based admin dashboard that allows administrators at different levels (City, Governorate, and Master) to analyze reports, manage employees and users, and visualize nationwide infrastructure data in real time.

## 🌐 Overview

The CivicEye admin dashboard is built using **React**, **Tailwind CSS**, and **Spring Boot** for backend services. It offers comprehensive tools for infrastructure monitoring, live report tracking, employee evaluation, and geographic visualization using an interactive map.

![Screenshot_3](https://github.com/user-attachments/assets/b91cf1e3-a843-444f-956b-3248f83ad839)

![Picture2](https://github.com/user-attachments/assets/9c419954-8fe5-4d7e-b7c4-5395d8e0bd57)

## 🧩 Features

- 🔐 **Role-Based Access Control**
  - CityAdmin: Can view and manage reports and employees in their city.
  - GovernorateAdmin: Can analyze multiple cities within their governorate.
  - MasterAdmin: Full system control with access to all governorates and admin management.

- 📊 **Real-Time Analytics**
  - Live charts for reports by department, region, and time.
  - Employee leaderboards and ratings.
  - Department-wise and city-wise report comparisons.

- 🗺️ **Interactive Egypt Map**
  - Boundaries visualized with heatmap overlays.
  - Markers for live reports.
  - GeoJSON + Leaflet + OpenStreetMap integration.
  
![Screenshot_2](https://github.com/user-attachments/assets/cdcefcef-90d5-47bb-a1bd-23341e709792)

- 📋 **Reports Management**
  - View all submitted reports with filters.
  - Review detailed info including location, citizen, and assigned employee.

![Screenshot_4](https://github.com/user-attachments/assets/af01239c-8649-4404-a177-7547d10811ac)

![Screenshot_1](https://github.com/user-attachments/assets/77f6f261-f1f5-4517-b21e-49dbc7e25d17)


- 👷 **Employee Management**
  - Add employees by city and governorate.
  - View employee performance and activity.
  - Restriction: CityAdmins can only manage employees in their city.

![Screenshot_8](https://github.com/user-attachments/assets/95a60ebf-f951-42b0-a92a-1872db3065ce)


- 👤 **Admin Management**
  - MasterAdmin can add or remove admins of all roles.
  - View all admins in the system.

![Screenshot_6](https://github.com/user-attachments/assets/cde8af14-6998-478b-8ed0-4a325d2d6bda)


## ⚙️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- JavaScript
- ApexCharts
- WebSockets
- Leaflet + OpenStreetMap + GeoJSON

### Backend
- Spring Boot (Java)
- REST APIs
- WebSocket/STOMP
- Maven

### Others
- Firebase for real-time database and auth integration
- Docker for deployment
- GitHub Actions (optional for CI/CD)

## 📦 Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/CivicEye-WebDashboard.git
   cd CivicEye-WebDashboard
   
2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   
3. **Run the frontend**
   ```bash
   npm start

