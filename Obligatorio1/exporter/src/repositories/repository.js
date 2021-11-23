const Config = require("config");
const mongoose = require("mongoose");
const Consumer = require('../models/consumer')
const md5 = require("md5");

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
    let connectionUrl = Config.get("repository.url");
    return connectionUrl;
  }

  static async initRepository() {
    try {
      await this.connect();
      await Consumer.create({
        Name: 'Admin',
        Email: 'admin@admin.com',
        Proposito: 'Administrate',
        Password: md5('admin'),
      });
    } catch (err) {
      console.log(`Error trying to connect to database: ${err}`);
    }
  }
};