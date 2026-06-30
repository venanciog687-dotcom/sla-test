const mongoose = require("mongoose");

const databases = {
    // Stumble Guys
    stumble: () => mongoose.connection.useDb("StumbleGuysPriv", { useCache: true }),
};

module.exports = databases;