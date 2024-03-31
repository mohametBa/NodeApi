const { createArticle, updateArticle, deleteArticle } = require('./articles.service');

// Crée un nouvel article
const create = async (req, res) => {
  try {
    const userId = req.user._id; 
    const article = await createArticle(req.body, userId);

    // notifier les clients en temps réel
    req.io.emit('articleCreated', article);

    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un article existant
const update = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { id } = req.params;
    const article = await updateArticle(id, req.body, userId);
    if (!article) {
      res.status(404).json({ message: 'Article not found' });
    } else {
      //notifier les clients en temps réel de la mise à jour de l'article
      req.io.emit('articleUpdated', { id, article });

      res.json(article);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Pour supprimer un article
const remove = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    await deleteArticle(id, userId);
    
    req.io.emit('articleDeleted', { id });

    res.status(204).end(); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  create,
  update,
  remove
};
