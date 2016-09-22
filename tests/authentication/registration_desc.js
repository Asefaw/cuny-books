var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var expect = chai.expect;

chai.use(chaiHttp);


describe('Signup Controller (Version 1)', function() {
  it('should render signup form on /signup GET'); 
  it('should save user in database on /signup POST');  
});