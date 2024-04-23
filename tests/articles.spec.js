const request = require('supertest');
const app = require('../www/app'); 
const mockingoose = require('mockingoose');
const mongoose = require('mongoose'); 
const Article = require('../api/articles/articles.schema'); 

describe('Articles API', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an article and return status code 201', async (done) => { 
    const articleData = {
      title: 'Test Article',
      content: 'Test content',
      user: new mongoose.Types.ObjectId(),
    };

    mockingoose(Article).toReturn(articleData, 'save');

    request(app)
      .post('/api/articles')
      .send(articleData)
      .expect(201, done);
  });

  it('should update an article and return status code 200', async (done) => { 
    const articleId = new mongoose.Types.ObjectId();
    const updateData = {
      title: 'Updated Test Article',
      content: 'Updated content',
    };

    mockingoose(Article).toReturn(updateData, 'findOneAndUpdate');

    request(app)
      .put(`/api/articles/${articleId}`)
      .send(updateData)
      .expect(200, done);
  });

  it('should delete an article and return status code 204', async (done) => { 
    const articleId = new mongoose.Types.ObjectId();
    mockingoose(Article).toReturn({ deletedCount: 1 }, 'deleteOne');

    request(app)
      .delete(`/api/articles/${articleId}`)
      .expect(204, done);
  });
});
