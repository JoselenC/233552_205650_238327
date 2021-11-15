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


 
  async saveConsumer(data) {
    data.Password = md5(data.Password);
    let existing = await Consumer.findOne({ Email: data.Email });
    if (existing == null) {
      data.URL = "http://localhost:8080/gateway/exporter/consumer/"+ data.Email;
      let consumer = await Consumer.create(data);
      return consumer.toObject();
    } else {
      throw new Error("That consumer already exists");
    }
  }

  async findByEmail(email) {
    try {
      let consumer = await Consumer.findOne({ Email: email });
      return consumer ? consumer : null;
    } catch (err) {
      return null;
    }
  }

  async login(data) {
    if (data.Password != "" && data.Email != "") {
      let password = md5(data.Password);
      let consumer = await Consumer.findOne({Password: password });
      if (consumer != null) {
        const token = jwt.sign(
          {
            Name: consumer.Name,
            Id: consumer.Id,
            URL: consumer.URL,
            Proposito: consumer.Proposito,
            FechaRegistro: consumer.FechaRegistro,
            Email: consumer.Email
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