const queue = require("bull");
const config = require("config");
const AnalyticsService = require("../services/analyticsService");

module.exports = class Subscriber {
  constructor() {
    this.analyticsService = new AnalyticsService()
    this.subDataCollected = new queue("PostDataCollected", {
      removeOnSuccess: true,
      redis: config.get("redis"),
    });
  }

  initSubscriber() {
    this.subDataCollected.process((dataCollected, done) => {
      try {
        if (dataCollected.data.type == "save") {
          const result = this.analyticsService.isValidData(dataCollected.data.data)
          done(null, result);
        }
      } catch (err) {
        done(err);
      }
    });
  }
};