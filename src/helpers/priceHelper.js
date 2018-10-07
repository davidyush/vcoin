export function marketCost(amount) {
  return amount.toLocaleString('en').split('.')[0].split(',').join(' ');
}

export function priceCoin(price) {
  let result = price.toLocaleString('ru-RU');
  if(!result.split(',')[1]) {
    return result + '.0000';
  }
  let currentLength = result.split(',')[1].length;
  if(currentLength === 3) {
    result += '0';
  } else if(currentLength === 2) {
    result += '00';
  } else if(currentLength === 1) {
    result += '000';
  } else if(currentLength === 0) {
    result += '0000';
  }
  return result;
}

export function shortPrice(price) {
  let temp = Number(price);
  if(Math.abs(temp) >= 1.0e+9) {
    temp = (Math.abs(temp) / 1.0e+9).toFixed(2) + 'b';
  } else if(Math.abs(temp) >= 1.0e+6) {
    temp = (Math.abs(temp) / 1.0e+6).toFixed(2) + 'm';
  } else if(Math.abs(temp) >= 1.0e+3) {
    temp = (Math.abs(temp) / 1.0e+3).toFixed(2) + 'k';
  }
  return temp;
}