const ArticleService = require('./articles.service');

// Création d'un article
exports.create = async (req, res) => {
  try {
    const userId = req.user._id;
    const article = await ArticleService.createArticle(req.body, userId);
    req.io.emit('articleCreated', article);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mise à jour d'un article
exports.update = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });  // Clarification du message d'erreur
  }
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const article = await ArticleService.updateArticle(id, req.body, userId);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    req.io.emit('articleUpdated', { id, article });
    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Suppression d'un article
exports.remove = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  try {
    const userId = req.user._id;
    const { id } = req.params;
    await ArticleService.deleteArticle(id, userId);
    req.io.emit('articleDeleted', { id });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
