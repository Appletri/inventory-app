function rollStats() {
  let numberOfStats = 2;
  let typeOfStats = ['def', 'att', 'str', 'dex', 'vit', 'int', 'block', 'health regen', 'health', 'mana', 'mana regen', 'dodge', 'crit rate', 'crit damage']
  let stats = [];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function rollNumberOfStats() {
    let x = getRandomInt(6);
    if (x < 2) {
      x = 2;
    };
    numberOfStats = x;
  }

  function rollTypeOfStats() {

    for (let i = 0; i < numberOfStats; i++) {
      let obj = {};

      obj[typeOfStats[getRandomInt(typeOfStats.length)]] = rollStatValue();

      stats.push(obj);
    }
  }

  function rollStatValue() {
    const rarity = getRandomInt(100);
    //common
    if (rarity < 40) {
      return getRandomInt(10) + 1;
    }
    //uncommon
    else if (rarity < 65) {
      return getRandomInt(10) + 10;
    }
    //rare
    else if (rarity < 85) {
      return getRandomInt(10) + 25;
    }
    //epic
    else if (rarity < 98) {
      return getRandomInt(10) + 40;
    }
    //legendary
    else {
      return getRandomInt(10) + 100;
    }
  }


  rollNumberOfStats();
  rollTypeOfStats();

  return stats;
}

export default rollStats;