// Core
const express = require("express");
const path = require("path");

const app = express();

// Middlewares
const { shield } = require("./middlewares");
app.use(shield);

// Banco de dados
require("./services/mongo.connection");

// JSON
app.use(express.json());

// Rota principal (corrige o Cannot GET /)
app.get("/", (req, res) => {
    res.json({
        status: "online",
        backend: "Stumble Hero Backend",
        version: process.env.version || "1.0.0"
    });
});

// Health check
app.get("/onlinecheck", (req, res) => {
    res.json({
        online: true
    });
});

// Log das requisições
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.originalUrl}`);
    next();
});

// Rotas
const stumbleRoutes = require("./routes");
app.use("/", stumbleRoutes);

// Arquivos estáticos
app.use(
    "/file/get",
    express.static(path.join(__dirname, "shared", "images"))
);

// 404
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});

module.exports = app;
