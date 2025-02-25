# Server Generator

## 📌 Overview
This project contains a script that reads a JSON configuration file representing server nodes and links, then generates a fully functional Express.js server (`server.js`). The generated server includes routes, middleware, authentication, and CORS handling based on the input JSON.

---

## Setup Instructions

### Install Dependencies
Make sure you have **Node.js** installed, then run:
```bash
npm install express cors
```

### Update Configuration File
Modify `input/config.json` to define your server structure. Example:
```json
{
  "nodes": [
    { "id": "1", "name": "CORS Middleware", "properties": { "type": "middleware", "allowed_origins": ["*"] } },
    { "id": "2", "name": "Login Route", "properties": { "endpoint": "/login", "method": "POST" } }
  ]
}
```

### Generate the Server File
Run the following command to generate `server.js`:
```bash
node generateServer.js
```

### Start the Server
Run the generated server:
```bash
node output/server.js
```

---

## Parsing Logic
The script follows these steps to parse the JSON and generate `server.js`:
1. **Read the JSON file** (`config.json`) and parse it into a JavaScript object.
2. **Identify middleware nodes** (e.g., CORS, authentication) and configure them in Express.
3. **Identify routes** (e.g., `/login`, `/user`) and dynamically create Express routes.
4. **Attach necessary middleware** based on the node properties.
5. **Write the generated server code** to `output/server.js`.
   
---

## 🛠️ Testing
1. Test public routes without headers.
2. Test protected routes with and without an `Authorization` header.
3. Validate that CORS headers are set for allowed origins.

---

