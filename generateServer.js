
// importing modules 
const fs = require('fs');
const path = require('path');

// defining file paths 
const configPath = path.join(__dirname, "input", "config.json");
const outputPath = path.join(__dirname, "output", "server.js");

// this will create output folder if not present
if (!fs.existsSync("output")) {
    fs.mkdirSync("output");
}

// parsing json file 
const rawData = fs.readFileSync(configPath);
const config = JSON.parse(rawData);

// server code generation 
let serverCode = `const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
`;

const middlewares = {
    auth: `const authMiddleware = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};
// app.use(authMiddleware);`,
    cors: `app.use(cors({ origin: "*" }));`
};

config.nodes.forEach(node => {
    if (node.properties.type === "middleware") {
        if (node.properties.auth_required) {
            serverCode += middlewares.auth + "\n";
        }
        if (node.properties.allowed_origins) {
            serverCode += middlewares.cors + "\n";
        }
    }
});

config.nodes.forEach(node => {
    if (node.properties.endpoint) {
        let method = node.properties.method.toLowerCase();
        // let middleware = node.properties.auth_required ? ", authMiddleware" : "";
        serverCode += `app.${method}("${node.properties.endpoint}", ${node.properties.auth_required ? "authMiddleware, " : ""}(req, res) => {
            res.json({ message: "Response from ${node.name}" });
        });\n`;
        
    }
});

serverCode += "app.listen(3000, () => console.log(\"Server running on port 3000\"));";

fs.writeFileSync(outputPath, serverCode);
console.log("server.js generated successfully in output folder");

