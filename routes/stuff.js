const express = require("express");
const auth = require("../middleware/auth");
const stuffController = require("../controllers/stuff");

const router = express.Router();

// Méthode POST pour l'envoi de nouveaux objets
router.post("/", auth, stuffController.createThing);

// Méthode GET pour récupérer tous les objets
router.get("/", auth, stuffController.getAllThings);

// Méthode GET pour récupérer un objet
router.get("/:id", auth, stuffController.getOneThing);

// Méthode PUT pour modifier un objet
router.put("/:id", auth, stuffController.modifyThing);

//Méthode DELETE pour supprimer un objet
router.delete("/:id", auth, stuffController.deleteThing);

module.exports = router;
