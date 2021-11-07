const queue = require("bull");
const config = require("config");
const AnalyticsService = require("../services/analyticsService");

module.exports = class Subscriber {
  constructor() {
    this.analyticsService = new AnalyticsService()
    this.subObservation = new queue("PostObservation", {
      removeOnSuccess: true,
      redis: config.get("redis"),
    });
  }

  initSubscriber() {
    this.subObservation.process((observation, done) => {
      try {
        if (observation.data.type == "save") {
          const result = this.analyticsService.isValidData(observation.data.data)
          done(null, result);
        }
      } catch (err) {
        done(err);
      }
    });
  }
};