const axios = require("axios");

const axiosRetry = require('axios-retry');

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    console.log(`retry attempt: ${retryCount}`);
    return retryCount * 2000;
  },
  retryCondition: (error) => {
    return error.response.status === 503;
  },
});


axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error.response.data);
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error.response.data);
});

module.exports = class GatewayService {
  constructor() { }

  async saveConsumer(data) {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`http://localhost:6069/exporter/consumer`, data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error.message));
        });
    });
  }

  async savePerson(data) {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`http://localhost:6061/analytics/person`, data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error.message));
        });
    });
  }



  async calculateAverageValues(ctx) {
    let data = ctx.request.body;
    let criterion = ctx.params.criterion;
    await this.authentication(ctx)
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`http://localhost:6061/analytics/averages/${criterion}`, data)
        .then((response) => {
          ctx.body = { data: response.data };
          resolve(response.data);
        })
        .catch((error) => {
          ctx.body = { data: error.message };
          reject(new Error(error.message));
        });
    });
  }

  async saveSensor(ctx) {
    let data = ctx.request.body;
    await this.authentication(ctx)
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`http://localhost:6065/catalog/sensor`, data)
        .then((response) => {
          ctx.body = { data: response.data };
          resolve(response.data);
        })
        .catch((error) => {
          ctx.body = { data: error.message };
          reject(new Error(error.message));
        });
    });
  }

  async authentication(ctx) {
    return await new Promise(async (resolve, reject) => {
      return axios
        .post(`http://localhost:6063/authentication`, ctx)
        .then((response1) => {
          resolve(response1)
        })
        .catch((error) => {
          reject(new Error(error.message));
        });
    });
  }

  async saveProperty(ctx) {
    let data = ctx.request.body;
    await this.authentication(ctx)
    return await new Promise(async (resolve, reject) => {
      return axios
        .post(`http://localhost:6065/catalog/property`, data)
        .then((response) => {
          ctx.body = { data: response.data };
          resolve(response.data);
        })
        .catch((error) => {
          ctx.body = { data: error.message };
          reject(new Error(error.message));
        });
    });

  }

  async saveRank(ctx) {
    let data = ctx.request.body;
    await this.authentication(ctx)
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`http://localhost:6065/catalog/rank`, data)
        .then((response) => {
          ctx.body = { data: response.data };
          resolve(response.data);
        })
        .catch((error) => {
          ctx.body = { data: error.message };
          reject(new Error(error.message));
        });
    });
  }


  async saveObservation(ctx) {
    let data = ctx.request.body;
    let esn;
    if (ctx.params.esn != undefined)
      esn = ctx.params.esn
    if (ctx.header.esn != undefined)
      esn = ctx.header.esn;
    else if (esn == null)
      throw new Error("Invalid empty esn");
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`http://localhost:6067/observations/${esn}`, data)
        .then((response) => {
          ctx.body = { data: response.data };
          resolve(response.data);
        })
        .catch((error) => {
          ctx.body = { data: error.message };
          reject(new Error(error.message));
        });
    });
  }

  async getAll(ctx) {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(`http://localhost:6067/observations`, ctx)
        .then((response) => {
          ctx.body = { data: response.data };
          resolve(response.data);
        })
        .catch((error) => {
          ctx.body = { data: error.message };
          reject(new Error(error.message));
        });
    });
  }

  async getAllProperties(ctx) {
    await this.authentication(ctx)
    return new Promise(async (resolve, reject) => {
      return axios
        .get(`http://localhost:6065/catalog/property`, ctx)
        .then((response) => {
          ctx.body = { data: response.data };
          resolve(response.data);
        })
        .catch((error) => {
          ctx.body = { data: error.message };
          reject(new Error(error.message));
        });
    });
  }

  async getAllSensors(ctx) {
    await this.authentication(ctx)
    return new Promise(async (resolve, reject) => {
      return axios
        .get(`http://localhost:6065/catalog/sensor`, ctx)
        .then((response) => {
          ctx.body = { data: response.data };
          resolve(response.data);
        })
        .catch((error) => {
          ctx.body = { data: error.message };
          reject(new Error(error.message));
        });
    });
  }

  async getAllRanks(ctx) {
    await this.authentication(ctx)
    return new Promise(async (resolve, reject) => {
      return axios
        .get(`http://localhost:6065/catalog/rank`, ctx)
        .then((response) => {
          ctx.body = { data: response.data };
          resolve(response.data);
        })
        .catch((error) => {
          ctx.body = { data: error.message };
          reject(new Error(error.message));
        });
    });
  }

  async getConsumerByEmail(ctx) {
    await this.authentication(ctx)
    return new Promise(async (resolve, reject) => {
      return axios
        .get(`http://localhost:6069/exporter/consumers/${ctx.params.email}`, ctx)
        .then((response) => {
          ctx.body = { data: response.data };
          resolve(response.data);
        })
        .catch((error) => {
          ctx.body = { data: error.message };
          reject(new Error(error.message));
        });
    });
  }

  async getPersonByEmail(ctx) {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(`http://localhost:6061/analytics/person/${ctx.params.email}`, ctx)
        .then((response) => {
          ctx.body = { data: response.data };
          resolve(response.data);
        })
        .catch((error) => {
          ctx.body = { data: error.message };
          reject(new Error(error.message));
        });
    });
  }

  async login(ctx) {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`http://localhost:6069/exporter/login`, ctx)
        .then((response) => {
          ctx.body = { data: response.data };
          resolve(response.data);
        })
        .catch((error) => {
          ctx.body = { data: error.message };
          reject(new Error(error.message));
        });
    });
  }

  async deletePerson(ctx) {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`http://localhost:6061/analytics/person/${ctx.params.email}`, ctx)
        .then((response) => {
          ctx.body = { data: response.data };
          resolve(response.data);
        })
        .catch((error) => {
          ctx.body = { data: error.message };
          reject(new Error(error.message));
        });
    });
  }


};
