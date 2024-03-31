const mongoose = require('mongoose');
const { Schema } = mongoose;

// le schema pour la methode populate
const personSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number,
    stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
  });
  
  const storySchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Person' },
    title: String,
  });
  
  // Modèles populate()
  const Story = mongoose.model('Story', storySchema);
  
  const getStoriesWithDetails = async () => {
    const stories = await Story.find()
      .populate('author', 'name -_id') // on enléve son id
      .exec();
  
    return stories;
  };
  
  getStoriesWithDetails().then(stories => {
    console.log(stories);
  }).catch(err => {
    console.error(err);
  });

const Article = require('./articles.schema'); 

const createArticle = async (articleData, userId) => {
  const article = new Article({ ...articleData, user: userId });
  return await article.save();
};

const updateArticle = async (articleId, articleData, userId) => {
  const article = await Article.findOne({ _id: articleId, user: userId });
  if (!article) {
    throw new Error('Article introuvable');
  }

  Object.assign(article, articleData);
  return await article.save();
};

const deleteArticle = async (articleId, userId) => {
  const result = await Article.deleteOne({ _id: articleId, user: userId });
  if (result.deletedCount === 0) {
    throw new Error('Article introuvable');
  }
  return result;
};

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle
};
