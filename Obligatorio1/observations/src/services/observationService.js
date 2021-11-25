const ObservationRepository = require('../repositories/observationRepository');
const axios = require("axios");

module.exports = class ObservationService {
    constructor() {
        this.observationRepository = new ObservationRepository();
    }

    async findAllByConsumer(ctx) {
        let observeFrom = ctx.params.observeFrom;
        let observations = [];
        let allObservations = await this.observationRepository.findAll();
        allObservations.forEach(element => {
            if (new Date(element.registrationDate).getTime() >= new Date(observeFrom).getTime() ){
                observations.push(element)
            }
        });        
        return observations;
    }

    async findAll() {
        return await this.observationRepository.findAll();
    }

    async save(data) {
        try {
            if (this.existSensorProperty(data)) {
                return await this.observationRepository.save(data);
            } else {
                throw new Error("That reading does not belong to any observable property of said sensor.");
            }
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async existSensorProperty(data) {
        try {
            return new Promise(async (resolve, reject) => {
                return axios
                    .get(`http://localhost:6065/catalog/sensor/${data.ESN}/${data.name}`, data)
                    .then((response) => {
                        if (response.data.data === undefined || response.data.length === 0) {
                            reject(new Error("No data"));
                        } else {
                            resolve(response.data);
                            return response.data;
                        }
                    })
                    .catch((error) => {
                        reject(new Error(error.message));
                    });
            });
        }
        catch (err) {
            throw new Error("Sensor does not exist");
        }
    }

    async sensorProperty(input, next) {
        return new Promise(async (resolve, reject) => {
            return axios
                .get(`http://localhost:6065/catalog/sensor/property/${input.ESN}/${input.name}`, input)
                .then((response) => {
                    if (response.data.data === undefined || response.data.length === 0) {
                        reject(new Error("No data"));
                    } else {
                        resolve(response.data);
                    }
                })
                .catch((error) => {
                    reject(new Error(error.message));
                });
        });
    }

    async findByName(name) {
        return await this.observationRepository.findByName(name);
    }

    async findPropertiesByDateAndSensor(ctx,next) {
        return await this.observationRepository.findPropertiesByDateAndSensor(ctx,next);
    }
}