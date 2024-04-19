const mockingoose = require('mockingoose');
const { createArticle } = require('../api/articles/articles.service');
const Article = require('../api/articles/articles.service');

describe('createArticle', () => {
  beforeEach(() => {
    mockingoose.resetAll(); 
  });
  
  it('successfully creates an article', async () => {
    const mockArticleData = { title: 'Test Article', content: 'Test content' };
    const mockArticle = { _id: '507f1f77bcf86cd799439011', ...mockArticleData };

    mockingoose(Article).toReturn(mockArticle, 'save');

    const article = await createArticle(mockArticleData);

    expect(article.title).toEqual('Test Article');
    expect(article.content).toEqual('Test content');
  });
});
