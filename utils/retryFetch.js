const axios = require('axios');

module.exports.retryFetch = async(numberOfRetries= 3, apiUrl, retryInterval) => {
  const MAX_RETRIES = numberOfRetries;
  let data;
  
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const response = await axios.get(apiUrl);
      data = response.data;
      return data;
    } catch (error) {
      console.error(`Error fetching dealers: ${error.message}`);
      if (i < MAX_RETRIES - 1) {
        await new Promise((resolve) => setTimeout(resolve, retryInterval));
      } else {
        return false;
      }
    }
  }
}
