const NodeCache = require('node-cache');
const axios = require('axios');
const { retryFetch } = require('../utils/retryFetch');
const cache = new NodeCache();
const CACHE_TTL = process.env.CACHE_TTL;
const DEMO_VEHICLES_THIRDPARTY_API = process.env.DEMO_VEHICLES_THIRDPARTY_API;
const RETRY_LIMITS = process.env.RETRY_LIMITS;
const RETRY_DELAY = process.env.RETRY_DELAY;

exports.getVehiclesByDealer = async function (bac) {
  try {
    const THIRD_PARTY_URL = `${DEMO_VEHICLES_THIRDPARTY_API}/vehicles/${bac}`;
    const cachedData = cache.get(`vehicles-${bac}`);
    if (cachedData) {
      console.log("Vehicles data fetched from cache.");
      return cachedData;
    }
    const response = await axios.get(THIRD_PARTY_URL);
    const vehicles = response.data;
    console.log("Vehicles data fetched from third-party API.");
    cache.set(`vehicles-${bac}`, vehicles, CACHE_TTL);
    console.log("Vehicles data pushed to cache.");
    return vehicles;
  } catch (error) {
    console.error(`Error fetching and caching vehicles: ${error.message}`);
    const vehicles = await retryFetch(RETRY_LIMITS, THIRD_PARTY_URL, RETRY_DELAY);
    if (vehicles) {
      cache.set(`vehicles-${bac}`, vehicles, CACHE_TTL);
      return vehicles;
    } else {
      //Not failing the api and trying to send a data to frontend
      return [];
    }
  }
};
