const Repository = require('./repository');
const Consumer = require('../models/consumer')
const md5 = require("md5");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
      data.URL = "http://localhost:6069/exporter/data/consumer/" + data.Email;
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


  async findByName(name) {
    try {
      let consumer = await Consumer.findOne({ Name: name });
      return consumer ? consumer : null;
    } catch (err) {
      return null;
    }
  }

  async login(data) {
    try {
      if (data.Password != "" && data.Email != "") {
        let password = md5(data.Password);
        var consumer;
        let consumers = await Consumer.find();
        consumers.forEach(element => {
          if (element.Email == data.Email && element.Password == password){
            consumer = element
          }
        });
        const token = jwt.sign(
          {
            Name: consumer.Name,
            Id: consumer.Id,
            URL: consumer.URL,
            Proposito: consumer.Proposito,
            FechaRegistro: consumer.FechaRegistro,
            Email: consumer.Email
          },
          process.env.JWT_SECRET
        );
        return token;
      } else {
        throw new Error("Password and email cannot be empty")
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

}