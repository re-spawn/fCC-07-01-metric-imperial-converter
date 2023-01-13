'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    // console.log('GET /api/convert');
    let input = req.query['input'];
    // console.log("input:", input);
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    if (initUnit == 'invalid unit' && initNum == 'invalid number') {
      res.send('invalid number and unit');
    } else if (initUnit == 'invalid unit') {
      res.send(initUnit);
    } else if (initNum == 'invalid number') {
      res.send(initNum);
    } else {
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
      });
      // console.log("res.json:", res.json);
    }
  });

};
