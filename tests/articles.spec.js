const request = require('supertest');
const app = require('../www/app');  
const mongoose = require('mongoose'); 
const Article = require('../api/articles/articles.schema'); 
const mockingoose = require('mockingoose');

describe('API des articles', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //la création d'un article
  it('devrait créer un article et retourner le code statut 201', async () => { 
    const articleData = {
      title: 'Article de Test',
      content: 'Contenu de test',
      user: new mongoose.Types.ObjectId(), 
    };
    mockingoose(Article).toReturn(articleData, 'save');

    const res = await request(app)
      .post('/api/articles')
      .send(articleData)
      .expect(201); 
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toEqual(articleData.title);
    expect(res.body.content).toEqual(articleData.content);
  }, 10000);  

  //la mise à jour d'un article
  it('devrait mettre à jour un article et retourner le code statut 200', async () => {
    const articleId = new mongoose.Types.ObjectId();
    const updateData = {
      title: 'Article Modifié',
      content: 'Contenu modifié',
    };
    mockingoose(Article).toReturn(updateData, 'findOneAndUpdate');

    const res = await request(app)
      .put(`/api/articles/${articleId}`)
      .send(updateData)
      .expect(200);
    expect(res.body.title).toEqual(updateData.title);
    expect(res.body.content).toEqual(updateData.content);
  }, 10000);

  //la suppression d'un article
  it('devrait supprimer un article et retourner le code statut 204', async () => {
    const articleId = new mongoose.Types.ObjectId();
    mockingoose(Article).toReturn({ deletedCount: 1 }, 'deleteOne');
    await request(app)
      .delete(`/api/articles/${articleId}`)
      .expect(204);
  }, 10000); 
});
