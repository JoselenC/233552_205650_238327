const Config = require("config");
const mongoose = require("mongoose");

module.exports = class Repository {
  constructor() {
    this.connection = null;
  }

  static async connect() {
    this.connection = await mongoose.connect(this.getUrl(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  static getUrl() {
    let connectionUrl = Config.get("repositoryAnalytics.url");
    return connectionUrl;
  }

  static async initRepository() {
    try {
      await this.connect();
    } catch (err) {
      console.log(`Error trying to connect to database: ${err}`);
    }
  }
};