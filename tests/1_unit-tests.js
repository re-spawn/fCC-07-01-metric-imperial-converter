const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  suite('getNum', function() {
    test('Read whole number input', function() {
      assert.strictEqual(convertHandler.getNum('4gal'), 4);
    });
    test('Read decimal number input', function() {
      assert.strictEqual(convertHandler.getNum('4.1gal'), 4.1);
    });
    test('Read fractional input', function() {
      assert.strictEqual(convertHandler.getNum('1/4gal'), 0.25);
    });
    test('Read fractional input with decimal', function() {
      assert.strictEqual(convertHandler.getNum('1.5/4gal'), 0.375);
      assert.strictEqual(convertHandler.getNum('1/0.5gal'), 2);
    });
    test('Reject double-fraction input', function() {
      assert.strictEqual(convertHandler.getNum('3/2/3gal'), 'invalid number');
    });
    test('Default to 1 when no numerical input', function() {
      assert.strictEqual(convertHandler.getNum('gal'), 1);
    });
  });

  suite('getUnit', function() {
    test('Read valid input units', function() {
      assert.strictEqual(convertHandler.getUnit('4gal'), 'gal');
      assert.strictEqual(convertHandler.getUnit('4l'), 'L');
      assert.strictEqual(convertHandler.getUnit('4mi'), 'mi');
      assert.strictEqual(convertHandler.getUnit('4km'), 'km');
      assert.strictEqual(convertHandler.getUnit('4.4lbs'), 'lbs');
      assert.strictEqual(convertHandler.getUnit('1.0/4kg'), 'kg');
    });
    test('Ignore case for valid input units', function() {
      assert.strictEqual(convertHandler.getUnit('4GAL'), 'gal');
      assert.strictEqual(convertHandler.getUnit('4L'), 'L');
    });
    test('Reject invalid input units', function() {
      assert.strictEqual(convertHandler.getUnit('1x'), 'invalid unit');
    });
  });

  suite('getReturnUnit', function() {
    test('Return conversion units', function() {
      assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
      assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal');
      assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
      assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
      assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
      assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
    });
  });

  suite('spellOutUnit', function() {
    test('Return spelled out units', function() {
      assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons');
      assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters');
      assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles');
      assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers');
      assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds');
      assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms');
    });
  });

  suite('convert', function() {
    const decimals = 5;
    const round = function(number, decimals) {
      return Math.round(number * (10 ** decimals)) / (10 ** decimals);
    };
    test('Convert gal to L', function() {
      assert.strictEqual(convertHandler.convert(1, 'gal'), round(3.78541, decimals));
    });
    test('Convert L to gal', function() {
      assert.strictEqual(convertHandler.convert(1, 'L'), round((1 / 3.78541), decimals));
    });
    test('Convert mi to km', function() {
      assert.strictEqual(convertHandler.convert(1, 'mi'), round(1.60934, decimals));
    });
    test('Convert km to mi', function() {
      assert.strictEqual(convertHandler.convert(1, 'km'), round((1 / 1.60934), decimals));
    });
    test('Convert lbs to kg', function() {
      assert.strictEqual(convertHandler.convert(1, 'lbs'), round(0.453592, decimals));
    });
    test('Convert kg to lbs', function() {
      assert.strictEqual(convertHandler.convert(1, 'kg'), round((1 / 0.453592), decimals));
    });
  });

  suite('getString', function() {
    test('Return string', function() {
      let input = '4.4lbs';
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      assert.strictEqual(
        convertHandler.getString(initNum, initUnit, returnNum, returnUnit),
        '4.4 pounds converts to 1.99580 kilograms'
      );
    });
  });

});
