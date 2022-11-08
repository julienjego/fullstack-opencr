const express = require("express");
const router = express.Router();

const Thing = require("../models/thing");
const stuffController = require("../controllers/stuff");

// Méthode POST pour l'envoi de nouveaux objets
router.post("/", stuffController.createThing);

// Méthode GET pour récupérer tous les objets
router.get("/", stuffController.getAllThings);

// Méthode GET pour récupérer un objet
router.get("/:id", stuffController.getOneThing);

// Méthode PUT pour modifier un objet
router.put("/:id", stuffController.modifyThing);

//Méthode DELETE pour supprimer un objet
router.delete("/:id", stuffController.deleteThing);

module.exports = router;
