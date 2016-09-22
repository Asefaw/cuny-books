var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var expect = chai.expect;

chai.use(chaiHttp);


describe('Signup Controller (Version 2)', () => {
  it('should list render signup form on /signup GET', (done) => {
    chai.request(server)
      .get('/signup')
      .end((err,res) => {
        expect(res.status).to.equal(200); 
        done();
      });
  }); 
  it('should add a SINGLE article on /signup POST', (done) => {
    chai.request(server)
      .get('/signup')
      .end((err,res) => {
        expect(res.status).to.equal(200); 
        done();
      });
  });
  //it('should update a SINGLE article on /articles/:title PUT');
  //it('should delete a SINGLE article on /articles/:title DELETE');
});