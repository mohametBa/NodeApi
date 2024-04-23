const Article = require('./articles.schema'); 

// Création d'un article
const createArticle = async (articleData, userId) => {
  const article = new Article({ ...articleData, user: userId });
  return await article.save();
};

// maj d'un article
const updateArticle = async (articleId, articleData, user) => {
  if (user.role !== 'admin') {
    throw new Error('Vous devez être administrateur pour effectuer cette action.');
  }
  
  const article = await Article.findById(articleId);
  
  if (!article) {
    throw new Error('Article introuvable.');
  }

  // maj de l'article avec les données fournies et retourner le nouvel article
  Object.assign(article, articleData);
  return await article.save();
};

// supprimer un article
const deleteArticle = async (articleId, user) => {
  if (user.role !== 'admin') {
    throw new Error('Vous devez être administrateur pour effectuer cette action.');
  }
  
  const result = await Article.findByIdAndDelete(articleId);
  
  if (!result) {
    throw new Error('Article introuvable.');
  }
  
  return result;
};

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle
};
