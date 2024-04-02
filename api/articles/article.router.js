const express = require('express');
const router = express.Router();
const articlesController = require("./articles.controller");
const { isAuthenticated,authoAdmin } = require("../../middlewares/authoAdmin"); 

//Ici on ajoute une autorisation admin dans le route avec le fichier 

router.put("/:id", isAuthenticated, authoAdmin, async(req, res) => {
    res.send("Update route is working");
  });

router.delete("/:id", isAuthenticated, authoAdmin, articlesController.remove);

router.post("/", isAuthenticated, authoAdmin, articlesController.create);


module.exports = router;
