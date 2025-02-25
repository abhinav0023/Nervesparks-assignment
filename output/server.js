const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
const authMiddleware = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};
// app.use(authMiddleware);
app.post("/login", (req, res) => {
            res.json({ message: "Response from Login Route" });
        });
app.post("/signup", (req, res) => {
            res.json({ message: "Response from Signup Route" });
        });
app.post("/signout", (req, res) => {
            res.json({ message: "Response from Signout Route" });
        });
app.get("/user", (req, res) => {
            res.json({ message: "Response from User Route" });
        });
app.get("/admin", (req, res) => {
            res.json({ message: "Response from Admin Route" });
        });
app.get("/home", (req, res) => {
            res.json({ message: "Response from Home Page" });
        });
app.get("/about", (req, res) => {
            res.json({ message: "Response from About Page" });
        });
app.get("/news", (req, res) => {
            res.json({ message: "Response from News Page" });
        });
app.get("/blogs", (req, res) => {
            res.json({ message: "Response from Blogs Page" });
        });
app.listen(3000, () => console.log("Server running on port 3000"));