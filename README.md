# Dockerized-Node-Web-App-with-SQLite
Create a complete web application with HTML/CSS frontend, Python backend, and SQLite database, all containerized with Docker.

# Dockerized-Python-Web-App-with-SQLite
Create a complete web application with HTML/CSS frontend, Python backend, and SQLite database, all containerized with Docker.

Project Structure text
project/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
├── database.js
├── package.json
├── Dockerfile
└── docker-compose.yml


Create a project directory with "project"  and navigate to it
Build and run the Docker containers with command
"docker-compose build"
Run the build image with port to acces the service
"docker run -p 3000:3000 (image ID)"
access localhost "http://localhost:3000"

