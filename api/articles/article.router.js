const express = require('express');
const router = express.Router();
const articlesController = require('./articles.controller');
const { isAuthenticated } = require('../../middlewares/authoAdmin'); 

//Ici on ajoute une autorisation admin dans le route avec le fichier 
const authoAdmin = require('../middlewares/authoAdmin'); 

router.put('/:id', isAuthenticated, authoAdmin, articlesController.update);
router.delete('/:id', isAuthenticated, authoAdmin, articlesController.remove);

router.post('/', isAuthenticated, articlesController.create);

router.put('/:id', isAuthenticated, articlesController.update);

router.delete('/:id', isAuthenticated, articlesController.remove);

module.exports = router;
