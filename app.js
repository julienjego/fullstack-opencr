const express = require("express");
const mongoose = require("mongoose");
const Thing = require("./models/thing");

const app = express();

//Connexion à la base MongoDb
mongoose
    .connect("mongodb://localhost:27017", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

//Middleware pour extraire le corps json d'une requête POST
app.use(express.json());

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

// Méthode POST pour l'envoi de nouveaux objets
app.post("/api/stuff", (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body,
    });
    thing
        .save()
        .then(() => res.status(201).json({ message: "Objet enregistré !" }))
        .catch((error) => res.status(400).json({ error }));
});

// Méthode GET pour récupérer tous les objets
app.get("/api/stuff", (req, res, next) => {
    Thing.find()
        .then((things) => res.status(200).json(things))
        .catch((error) => res.status(400).json({ error }));
});

// Méthode GET pour récupérer un objet
app.get("/api/stuff/:id", (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then((thing) => res.status(200).json(thing))
        .catch((error) => res.status(404).json({ error }));
});

// Méthode PUT pour modifier un objet
app.put("/api/stuff/:id", (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet modifié !" }))
        .catch((error) => res.status(404).json({ error }));
});

//Méthode DELETE pour supprimer un objet
app.delete("/api/stuff/:id", (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
