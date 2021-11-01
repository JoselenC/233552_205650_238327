const queue = require("bull");
const config = require("config");

module.exports = class Publisher {
  constructor() {
    this.pubReservation = new queue("PostDataCollected", {
      removeOnSuccess: true,
      redis: config.get("redis"),
    });
  }

  async publishSaveDataCollected(data) {
    const addData = await this.pubReservation.add({
      type: "save",
      data: data,
    });
    const res = await addData.finished();
    return res;
  }
}