const express = require("express");
const mongoose = require("mongoose");

const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

const app = express();

//Connexion à la base MongoDb
mongoose
    .connect("mongodb://localhost:27017", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

//Envoi des headers pour éviter les erreurs CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

//Middleware pour extraire le corps json d'une requête POST
app.use(express.json());

// Mise en place du routing pour les Things
app.use("/api/stuff", stuffRoutes);

//Mise en place du routing pour l'authentification Users
app.use("/api/auth", userRoutes);

module.exports = app;
