# PetPulse Application

This repository contains the source code for the PetPulse application, which includes a React-based frontend, a Spring Boot backend, and additional programs for machine learning and chatbot functionalities.

## Project Structure

### Frontend (React Application)
**Folder:** `Frontend`

- Contains the React application code.
- Key Components:
  - **Scripts Folder:**
    - Subfolders for each page, including the respective components, styling files, and additional images.
    - Subfolders for reusable components like animations and navbars.
  - **App.tsx:**
    - The main entry point for the server start, containing the route logic for navigating the application.

### Backend (Spring Boot Application)
**Folder:** `Backend`

- Contains the main Spring Boot application for PetPulse.
- Key Components:
  - **Models:**
    - **Entities:** Contains the entity classes.
    - **Data Transfer Objects (DTOs):** Contains the data transfer objects.
  - **Controllers:** Contains the controller classes.
  - **Services:** Contains the service classes.
  - **Repositories:** Contains the repository interfaces.
  - **Exceptions:** Defines custom exceptions used in the application.
  - **Config:** Contains necessary configuration files.

### Additionally Programs
**Folder:** `Additionally programs`

- **Chatbot Training Files:** Contains files necessary for training the chatbot.
- **TensorFlow Model:** Contains the Python project used to run the TensorFlow model for image recognition.

## Getting Started

### Prerequisites

- **Node.js** and **npm** for the frontend.
- **Java** and **Maven** for the backend.
- **Python** and necessary libraries for additional programs.

### Installation

#### Frontend
1. Navigate to the `Frontend` directory:
   ```bash
   cd Frontend

2. Install the dependencies:
   ```bash
   npm install

3. Start the development server:
   ```bash
   npm start

#### Backend
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend

2. Build the project using Maven:
   ```bash
   mvn clean install

3. Run the Spring Boot application:
   ```bash
    mvn spring-boot:run

