const Repository = require('./repository');
const Consumer = require('../models/consumer')
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

module.exports = class ConsumerRepository {

  constructor() {
    this.repository = new Repository();
  }

  async findAll(limit, offset) {
    var query = await Consumer.find();
    if (limit) {
      query.limit(limit);
    }
    if (offset) {
      query.skip(offset);
    }
    let consumers = await query;
    return consumers.map((consumer) => consumer.toObject());
  }


  async generateURL() {
    crypto.randomBytes(64, (err, buf) => {
      if (err) throw err;
      return buf.toString('hex')
    });
  }

  async saveConsumer(data) {
    let existing = await Consumer.findOne({ Name: data.Name });
    if (existing == null) {
      data.URL = generateURL();
      let consumer = await Consumer.create(data);
      return consumer.toObject();
    } else {
      throw new Error("That consumer already exists");
    }
  }

  async findByName(name) {
    try {
      let consumer = await Consumer.findOne({ Name: name });
      return consumer ? consumer : null;
    } catch (err) {
      return null;
    }
  }

  async login(data) {
    if (data.URL != "") {
      let URL = md5(data.URL);
      let consumer = await Consumer.findOne({URL: URL });
      if (consumer != null) {
        const token = jwt.sign(
          {
            Name: consumer.Name,
            Id: consumer.Id,
            URL: consumer.URL,
            Proposito: consumer.Proposito,
            FechaRegistro: consumer.FechaRegistro
          },
          process.env.TOKEN_SECRET
        );
        return token;
      } else {
        throw new Error("Wrong data couldnt log in");
      }
    } else {
      throw new Error("Fields cant be empty");
    }
  }

}