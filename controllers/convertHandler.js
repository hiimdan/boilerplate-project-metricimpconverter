

function ConvertHandler() {
  let validUnits = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
  let unitsOutput = ['l', 'gal', 'km', 'mi', 'kg', 'lbs', 'L', 'GAL', 'KM', 'MI', 'KG', 'LBS'];
  this.getNum = function(input) {
    let result;
    let ind = input.search(/[a-zA-Z]/);
    if (ind !== 0) {
      let numToParse = ind == -1 ? input : input.substring(0, ind);
      if (/^\d+[.]?\d*([/]\d+[.]?\d*)?$/.test(numToParse)) {
        if (/[/]/.test(numToParse)) {
          let operands = numToParse.split('/');
          result = operands[0] / operands[1];
        } else {
          result = numToParse;
        }
      } else {
        result = false;
      }
    } else {
      result = 1;
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    let ind = input.search(/[a-zA-Z]/);
    if (ind !== -1) {
      let unit = ind == 0 ? input : input.substring(ind);
      if (validUnits.indexOf(unit) >= 0) {
        result = unit;
      } else {
        result = false;
      }
    } else {
      result = false;
    } 
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    
    return unitsOutput[validUnits.indexOf(initUnit)];
  };

  this.spellOutUnit = function(unit) {
    let convObj = {
      gal: 'gallon',
      l: 'liter',
      mi: 'mile',
      km: 'kilometer',
      lbs: 'pound',
      kg: 'kilogram' 
    }
    
    return convObj[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch(initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
    }
    
    return Math.round(result * Math.pow(10, 5)) / Math.pow(10, 5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = initNum + ' ';
    
    result+= initNum == 1 ? this.spellOutUnit(initUnit.toLowerCase()) + ' converts to ' + returnNum + ' ' : this.spellOutUnit(initUnit.toLowerCase()) + 's converts to ' + returnNum + ' ';
    result+= returnUnit == 1 ? this.spellOutUnit(returnUnit.toLowerCase()) : this.spellOutUnit(returnUnit.toLowerCase()) + 's';
    return result;
  };
  
}

module.exports = ConvertHandler;
