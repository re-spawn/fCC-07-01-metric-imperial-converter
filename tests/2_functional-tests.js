const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  this.timeout(5000);

  test('Convert valid input', function(done) {
      chai
        .request(server)
        .get('/api/convert?input=10L')
        .end(function(err, res) {
          if (err) {
            console.error(err);
          } else {
            assert.strictEqual(res.status, 200, 'Response status not 200');
            assert.strictEqual(res.body.initNum, 10);
            assert.strictEqual(res.body.initUnit, 'L');
            assert.strictEqual(res.body.returnNum, 2.64172);
            assert.strictEqual(res.body.returnUnit, 'gal');
            assert.strictEqual(res.body.string, '10 liters converts to 2.64172 gallons');
          }
          done();
      });
  });
  test('Reject invalid input unit', function(done) {
      chai
        .request(server)
        .get('/api/convert?input=32g')
        .end(function(err, res) {
          if (err) {
            console.error(err);
          } else {
            assert.strictEqual(res.status, 200, 'Response status not 200');
            assert.strictEqual(res.text, 'invalid unit');
          }
          done();
      });
  });
  test('Reject invalid input number', function(done) {
      chai
        .request(server)
        .get('/api/convert?input=3/7.2/4kg')
        .end(function(err, res) {
          if (err) {
            console.error(err);
          } else {
            assert.strictEqual(res.status, 200, 'Response status not 200');
            assert.strictEqual(res.text, 'invalid number');
          }
          done();
      });
  });
  test('Reject invalid input number and unit', function(done) {
      chai
        .request(server)
        .get('/api/convert?input=3/7.2/4kilomegagram')
        .end(function(err, res) {
          if (err) {
            console.error(err);
          } else {
            assert.strictEqual(res.status, 200, 'Response status not 200');
            assert.strictEqual(res.text, 'invalid number and unit');
          }
          done();
      });
  });
  test('Convert valid input with no number', function(done) {
      chai
        .request(server)
        .get('/api/convert?input=kg')
        .end(function(err, res) {
          if (err) {
            console.error(err);
          } else {
            assert.strictEqual(res.status, 200, 'Response status not 200');
            assert.strictEqual(res.body.initNum, 1);
            assert.strictEqual(res.body.initUnit, 'kg');
            assert.strictEqual(res.body.returnNum, 2.20462);
            assert.strictEqual(res.body.returnUnit, 'lbs');
            assert.strictEqual(res.body.string, '1 kilograms converts to 2.20462 pounds');
          }
          done();
      });
  });


});
