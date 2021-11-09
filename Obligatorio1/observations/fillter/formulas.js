module.exports = class Formula {
  constructor() {
  }

  async transform(valueFrom, unitT, unitF) {
    return await new Promise((resolve, reject) => {
      [{ key: "Km-m", value: valueFrom / 1000 },
      { key: "m-Km", value: valueFrom * 1000 }]
        .forEach(element => {
          const key = element.key
          const units = key.split("-")
          const unitFrom = units[0];
          const unitTo = units[1];
          if (unitFrom == unitF && unitTo == unitT) {
            resolve(element.value)
          }
        });
      throw new Error();
    })
  }

}