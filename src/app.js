// Core
const express = require("express");
const path = require("path");

const app = express();

// Database
require("./services/mongo.connection");

// Middlewares
const { shield } = require("./middlewares");
app.use(shield);

// Necessário para JSON
app.use(express.json());

// Rota principal (corrige o "Cannot GET /")
app.get("/", (req, res) => {
    res.status(200).json({
        status: "online",
        backend: "Stumble Hero Backend",
        version: process.env.version || "dev"
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

// Rotas da API
const stumbleRoutes = require("./routes");
app.use("/", stumbleRoutes);

// Arquivos estáticos
app.use(
    "/file/get",
    express.static(path.join(__dirname, "shared", "images"))
);

// Tratamento de rota inexistente
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});

module.exports = app;
