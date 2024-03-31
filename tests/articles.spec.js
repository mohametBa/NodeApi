const request = require('supertest');
const app = require('../www/app'); 
const expect = require('chai').expect;

describe('Articles API', function() {
  let articleId;

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
        done();
      })
      .catch(err => done(err));
  });

  it('update and return status code 200', function(done) {
    request(app)
      .put(`/api/articles/${articleId}`)
      .send({
        title: 'Updated Test Article',
        content: 'Updated for the article'
      })
      .expect(200, done);
  });

  it('delete and return status code 204', function(done) {
    request(app)
      .delete(`/api/articles/${articleId}`)
      .expect(204, done);
  });
});
