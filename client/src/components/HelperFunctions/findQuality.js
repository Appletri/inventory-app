function findQuality(arr) {
  let int = 0;
  for (let i = 0; i < arr.length; i++) {
    int += parseFloat(Object.values(arr[i]));
  }
  //common
  if (int < 50) {
    return 'Common';
  }
  //uncommon
  else if (int < 100) {
    return 'Uncommon';
  }
  //rare
  else if (int < 150) {
    return 'Rare';
  }
  //unique
  else if (int < 200) {
    return 'Epic';
  }
  //legendary
  else {
    return 'Legendary';
  }
}

export default findQuality;