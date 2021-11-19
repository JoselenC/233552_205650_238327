const axios = require("axios");


module.exports = class GatewayService {
  constructor() { }

  async saveConsumer(data) {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`http://localhost:6069/exporter/consumer`, data)
        .then((response) => {
          if (response.data === undefined || response.data.length === 0) {
            reject(new Error("consumer already exist"));
          } else {
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(new Error("Consumer already exist"));
        });
    });
  }

  async savePerson(data) {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`http://localhost:6061/analytics/person`, data)
        .then((response) => {
          if (response.data === undefined || response.data.length === 0) {
            reject(new Error(""));
          } else {
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(new Error("Person to notify already exist"));
        });
    });
  }

  async calculateAverageValues(data,criterion) {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`http://localhost:6061/analytics/averages/${criterion}`, data)
        .then((response) => {
          if (response.data.data === undefined || response.data.length === 0) {
            reject(new Error(""));
          } else {
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(new Error(error.message));
        });
    });
  }

  async saveSensor(data) {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`http://localhost:6065/catalog/sensor`, data)
        .then((response) => {
          if (response.data === undefined || response.data.length === 0) {
            reject(new Error("No data"));
          } else {
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(new Error("Invalid sensor data"));
        });
    });
  }

  async saveProperty(data) {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`http://localhost:6065/catalog/property`, data)
        .then((response) => {
          if (response.data === undefined || response.data.length === 0) {
            reject(new Error("No data"));
          } else {
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(new Error("Invalid property observed data"));
        });
    });
  }

  async saveRank(data) {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`http://localhost:6065/catalog/rank`, data)
        .then((response) => {
          if (response.data === undefined || response.data.length === 0) {
            reject(new Error("No data"));
          } else {
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(new Error("Invalid rank data"));
        });
    });
  }

  async saveObservation(ctx,esn) {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`http://localhost:6067/observations/${esn}`, ctx)
        .then((response) => {
          if (response.data === undefined || response.data.length === 0) {
            reject(new Error(""));
          } else {
            ctx.body = {data: response.data};
            resolve(response.data);          
          }
        })
        .catch((error) => {
          ctx.body = {data: error.message};
          reject(new Error(error.message));
        });
    });
  }

  async getAll(ctx) {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(`http://localhost:6067/observations`, ctx)
        .then((response) => {
          if (response.data.data === undefined || response.data.length === 0) {
            reject(new Error(""));
          } else {
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(new Error(error.message));
        });
    });
  }

  async getAllProperties(ctx) {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(`http://localhost:6065/catalog/property`, ctx)
        .then((response) => {
          if (response.data.data === undefined || response.data.length === 0) {
            reject(new Error("No data"));
          } else {
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(new Error(error.message));
        });
    });
  }

  async getAllSensors(ctx) {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(`http://localhost:6065/catalog/sensor`, ctx)
        .then((response) => {
          if (response.data.data === undefined || response.data.length === 0) {
            reject(new Error("No data"));
          } else {
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(new Error(error.message));
        });
    });
  }

  async getAllRanks(ctx) {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(`http://localhost:6065/catalog/rank`, ctx)
        .then((response) => {
          if (response.data.data === undefined || response.data.length === 0) {
            reject(new Error("No data"));
          } else {
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(new Error(error.message));
        });
    });
  }




  async getConsumers(ctx) {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(`http://localhost:6069/exporter/consumers/${ctx.params.email}`, ctx)
        .then((response) => {
          if (response.data.data === undefined || response.data.length === 0) {
            reject(new Error("No data found"));
          } else {
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(new Error(error.message));
        });
    });
  }

  async getData(ctx) {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(`http://localhost:6069/exporter/consumer/${ctx.params.email}`, ctx)
        .then((response) => {
          if (response.data.data === undefined || response.data.length === 0) {
            reject(new Error(""));
          } else {
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(new Error(error.message));
        });
    });
  }



  async getPersonByEmail(ctx) {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(`http://localhost:6061/analytics/person/${ctx.params.email}`, ctx)
        .then((response) => {
          if (response.data.data === undefined || response.data.length === 0) {
            reject(new Error("No data found"));
          } else {
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(new Error(error.message));
        });
    });
  }


  



};
