/**
 * 
 * Custom Function to convert numeric value to Indian Rupees words
 * This handles negative values, decimal values (will be trimmed to 2 digit decimals)
 * Result will be a string. The Output string will be in sentence case
 * 
 */

function INR(input) {
  symbol = '₹'

  decimalPart = input - Math.floor(input);
  decimalPart = decimalPart.toFixed(2) * 100;
  decimal = Number(parseInt(decimalPart, 10));

  rupees = Number(parseInt(input, 10));
  const output = [];

  if (rupees < 0) {
    rupees = Math.abs(rupees)
    symbol = '(-₹)'
  }
  if (rupees === 0) {
    output.push('zero');
  } else if (rupees === 1) {
    output.push('one');
  } else {
    const crores = Math.floor(rupees / 10000000) % 100;
    if (crores > 0) {
      output.push(`${getHundreds(crores)} crore`);
    }

    const lakhs = Math.floor(rupees / 100000) % 100;
    if (lakhs > 0) {
      output.push(`${getHundreds(lakhs)} lakh`);
    }

    const thousands = Math.floor(rupees / 1000) % 100;
    if (thousands > 0) {
      output.push(`${getHundreds(thousands)} thousand`);
    }

    const hundreds = Math.floor((rupees % 1000) / 100);
    if (hundreds > 0 && hundreds < 10) {
      output.push(`${getOnes(hundreds)} hundred`);
    }

    const tens = rupees % 100;
    if (tens > 0) {
      if (rupees > 100) output.push('and');
      output.push(`${getHundreds(tens)}`);
    }
  }

  if (decimal > 0) {
    output.push('.');
    last = getHundreds(decimal);
    last = last.substr(0,1).toUpperCase() + last.substr(1);
    output.push(last);
    output.push('paise');
  }

  last = output[0];
  last = last.substr(0,1).toUpperCase() + last.substr(1);
  output[0] = last;

  return [symbol, ...output]
    .join(' ')
    .split(/\s/)
    .join(' ');
}

function getOnes(number) {
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  return ones[number] || '';
}

function getTeens(number) {
  const teens = [
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];
  return teens[number] || '';
}

function getTens(number) {
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  return tens[number] || '';
}

function getHundreds(num) {
  if (num > 0 && num < 10) {
    return getOnes(num);
  }
  if (num >= 10 && num < 20) {
    return getTeens(num % 10);
  }
  if (num >= 20 && num < 100) {
    return `${getTens(Math.floor(num / 10))} ${getOnes(num % 10)}`;
  }
  return '';
}
