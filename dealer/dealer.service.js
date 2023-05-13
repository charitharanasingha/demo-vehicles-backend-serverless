const NodeCache = require('node-cache');
const axios = require('axios');
const { retryFetch } = require('../utils/retryFetch');
const cache = new NodeCache();
const CACHE_TTL = process.env.CACHE_TTL;
const DEMO_VEHICLES_THIRDPARTY_API = process.env.DEMO_VEHICLES_THIRDPARTY_API;
const RETRY_LIMITS = process.env.RETRY_LIMITS;
const RETRY_DELAY = process.env.RETRY_DELAY;


exports.getDealers = async function () {
  try {
    const THIRD_PARTY_URL = `${DEMO_VEHICLES_THIRDPARTY_API}/dealers`;
    console.log(THIRD_PARTY_URL);
    const cachedData = cache.get("dealers");
    if (cachedData) {
      console.log("Dealers data fetched from cache.");
      return cachedData;
    }
    const response = await axios.get(THIRD_PARTY_URL);
    const dealers = response.data;
    console.log("Dealers data fetched from third-party API.");
    cache.set("dealers", dealers, CACHE_TTL);
    console.log("Dealers data pushed to cache.");
    return dealers;
  } catch (error) {
    console.error(`Error fetching and caching dealers: ${error.message}`);
    const dealers = await retryFetch(RETRY_LIMITS, THIRD_PARTY_URL, RETRY_DELAY);
    if (dealers) {
      cache.set("dealers", dealers, CACHE_TTL);
      return dealers;
    } else {
      //Not failing the api and trying to send a data to frontend
      return [];
    }
  }
};
