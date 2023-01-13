function ConvertHandler() {

  const conversions = {
    gal: 'L',
    L: 'gal',
    mi: 'km',
    km: 'mi',
    lbs: 'kg',
    kg: 'lbs'
  };
  
  this.getNum = function(input) {
    let result;
    let index = input.indexOf('/');
    if (index == -1) {
      if (input.search(/\d/) == -1) {
        result = 1;
      } else {
        result = Number.parseFloat(input);
      }
    } else {
      if (input.slice(index + 1).indexOf('/') == -1) {
        result = Number.parseFloat(input) / Number.parseFloat(input.slice(index + 1));
      } else {
	result = 'invalid number';
      }
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result = input.slice(input.search(/[^0-9\.\/]/)).toLowerCase();
    if (result == 'l') {
      result = 'L';
    } 
    if (!(result in conversions)) {
      result = 'invalid unit';
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = conversions[initUnit];
    return result;
  };

  this.spellOutUnit = function(unit) {
    const units = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    let result = units[unit];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const miToKm = 1.60934;
    const lbsToKg = 0.453592;
    let result;
    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
	break;
      case 'L':
        result = initNum / galToL;
	break;
      case 'mi':
        result = initNum * miToKm;
	break;
      case 'km':
        result = initNum / miToKm;
	break;
      case 'lbs':
        result = initNum * lbsToKg;
	break;
      case 'kg':
        result = initNum / lbsToKg;
	break;
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = initNum + " " + this.spellOutUnit(initUnit) 
      + " converts to " 
      + returnNum.toFixed(5) + " " + this.spellOutUnit(returnUnit);
    return result;
  };
  
}

module.exports = ConvertHandler;
