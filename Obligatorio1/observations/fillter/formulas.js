module.exports = class Formula {
  constructor() {
  }

  async transform(valueFrom, unitT, unitF) {
    return await new Promise((resolve, reject) => {
      [{ key: "Km-m", value: valueFrom / 1000 },
      { key: "m-Km", value: valueFrom * 1000 },
      { key: "cm-m", value: valueFrom  / 10 },
      { key: "m-cm", value: valueFrom * 100 },
      { key: "km-cm", value: valueFrom * 100000 },
      { key: "cm-km", value: valueFrom / 100000 },
      { key: "s-m", value: valueFrom / 60 },
      { key: "m-s", value: valueFrom * 60 },
      { key: "m-h", value: valueFrom / 60 },
      { key: "h-m", value: valueFrom * 60 },
      { key: "s-h", value: valueFrom / 3600 },
      { key: "h-s", value: valueFrom * 3600 },
      { key: "C-K", value: valueFrom + 273.15 },
      { key: "K-C", value: valueFrom - 273.15 },
      { key: "C-F", value: valueFrom * 9/5 },
      { key: "k-F", value: (valueFrom - 273.15) * 9/5 + 32 },
      { key: "F-K", value: (valueFrom - 32) * 5/9 + 273.15 },
      { key: "F-C", value: (valueFrom - 32) * 5/9 },]
        .forEach(element => {
          const key = element.key
          const units = key.split("-")
          const unitFrom = units[0];
          const unitTo = units[1];
          if (unitFrom.toLowerCase() == unitF.toLowerCase() && 
          unitTo.toLowerCase() == unitT.toLowerCase()) {
            resolve(element.value)
          }
        });
    })
  }

}