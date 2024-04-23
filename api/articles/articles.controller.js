const ArticleService = require('./articles.service');

exports.create = async (req, res) => {
  try {
    const userId = req.user._id;
    const article = await ArticleService.createArticle({ ...req.body, user: userId });
    req.io.emit('articleCreated', article);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création de l'article: " + error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await ArticleService.updateArticle(id, req.body);
    req.io.emit('articleUpdated', { id, article });
    res.json(article);
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await ArticleService.deleteArticle(id);
    req.io.emit('articleDeleted', { id });
    res.status(204).send();
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};
