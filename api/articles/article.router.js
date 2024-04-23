const express = require('express');
const router = express.Router();
const articlesController = require("./articles.controller");
const { authoAdmin, isAuthenticated } = require("../../middlewares/auth");

// Middleware qui vérifie si l'utilisateur est connecté et est un admin
const requireAdmin = [isAuthenticated, authoAdmin];

router.post("/", isAuthenticated, articlesController.create); // Seuls les utilisateurs connectés peuvent créer des articles
router.put("/:id", requireAdmin, articlesController.update); // Seuls les admins peuvent mettre à jour les articles
router.delete("/:id", requireAdmin, articlesController.remove); // Seuls les admins peuvent supprimer les articles

module.exports = router;
