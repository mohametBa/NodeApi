const mongoose = require('mongoose');
const Article = require('./articles.schema');

// creation d'un article
const createArticle = async (articleData, userId) => {
  const article = new Article({ ...articleData, user: userId });
  return await article.save();
};

// mise a jour d'un article
const updateArticle = async (articleId, articleData, userId) => {
  const article = await Article.findByIdAndUpdate(
    { _id: articleId, user: userId },
    articleData,
    { new: true }  // Retourne le document
  );
  if (!article) {
    throw new Error('Article introuvable ou accès non autorisé');
  }
  return article;
};

// supprimer un article
const deleteArticle = async (articleId, userId) => {
  const result = await Article.deleteOne({ _id: articleId, user: userId });
  if (result.deletedCount === 0) {
    throw new Error('Article introuvable ou accès non autorisé');
  }
  return result;
};

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle
};
