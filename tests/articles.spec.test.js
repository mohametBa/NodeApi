const request = require('supertest');
const app = require('../www/app');
const { expect } = require('@jest/globals');

describe('Articles API', function() {
  let articleId;

  // Test pour créer un article
  it('create and return status code 201', function(done) {
    request(app)
      .post('/api/articles')
      .send({
        title: 'Test Article',
        content: 'Test for the article'
      })
      .expect(201)
      .then(response => {
        articleId = response.body._id;
        // Utiliser expect pour vérifier que le corps de la réponse contient les bonnes propriétés
        expect(response.body).toHaveProperty('title', 'Test Article');
        expect(response.body).toHaveProperty('content', 'Test for the article');
        done();
      })
      .catch(err => done(err));
  });

  // Test pour mettre à jour un article
  it('update and return status code 200', function(done) {
    request(app)
      .put(`/api/articles/${articleId}`)
      .send({
        title: 'Updated Test Article',
        content: 'Updated for the article'
      })
      .expect(200)
      .then(response => {
        // Utiliser expect pour vérifier que le titre et le contenu ont été mis à jour
        expect(response.body).toHaveProperty('title', 'Updated Test Article');
        expect(response.body).toHaveProperty('content', 'Updated for the article');
        done();
      })
      .catch(err => done(err));
  });

  // Test pour supprimer un article
  it('delete and return status code 204', function(done) {
    request(app)
      .delete(`/api/articles/${articleId}`)
      .expect(204)
      .then(response => {
        expect(response.body).toEqual({});
        done();
      })
      .catch(err => done(err));
  });
});