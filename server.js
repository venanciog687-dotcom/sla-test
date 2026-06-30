require("dotenv").config();

const app = require("./src/app");

// Porta do Render (usa 10000 como padrão para desenvolvimento)
const PORT = process.env.PORT || 10000;

// Inicia o servidor
app.listen(PORT, "0.0.0.0", () => {
    console.log("====================================");
    console.log("🚀 Stumble Hero Backend iniciado");
    console.log(`🌐 Porta: ${PORT}`);
    console.log(`📦 Ambiente: ${process.env.NODE_ENV || "development"}`);
    console.log(`🕒 Iniciado em: ${new Date().toLocaleString("pt-BR")}`);
    console.log("====================================");
});

// Tratamento de erros não capturados
process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:");
    console.error(err);
});

process.on("unhandledRejection", (reason) => {
    console.error("❌ Unhandled Rejection:");
    console.error(reason);
});

// Encerramento gracioso
process.on("SIGTERM", () => {
    console.log("🛑 Encerrando servidor...");
    process.exit(0);
});

process.on("SIGINT", () => {
    console.log("🛑 Servidor interrompido pelo usuário.");
    process.exit(0);
});
