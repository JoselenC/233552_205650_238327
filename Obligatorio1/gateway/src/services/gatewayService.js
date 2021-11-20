const axios = require("axios");


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

  async calculateAverageValues(data, criterion) {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`http://localhost:6061/analytics/averages/${criterion}`, data)
        .then((response) => {
          resolve(response.data);
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
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error.message));
        });
    });
  }

  async saveProperty(data) {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`http://localhost:6065/catalog/property`, data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error.message));
        });
    });
  }

  async saveRank(data) {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`http://localhost:6065/catalog/rank`, data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error.message));
        });
    });
  }

  async saveObservation(ctx, esn) {
    return new Promise(async (resolve, reject) => {
      return axios
        .post(`http://localhost:6067/observations/${esn}`, ctx)
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

  async getConsumers(ctx) {
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




};
