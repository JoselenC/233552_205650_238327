const queue = require("bull");
const config = require("config");

module.exports = class Publisher {
  constructor() {
    this.pubObservation = new queue("PostObservation", {
      removeOnSuccess: true,
      redis: config.get("redis"),
    });
  }

  async publishSaveObservation(data) {
    const addData = await this.pubObservation.add({
      type: "save",
      data: data,
    });
    await addData.finished();
  }
}