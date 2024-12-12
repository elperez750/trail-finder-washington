const axios = require('axios');
const cheerio = require('cheerio');

// Base URL for list of hikes
const BASE_URL = `https://www.wta.org/go-outside/hikes`;

const fetchTrailLinks = async (offset) => {
  try {
    const response = await axios.get(`${BASE_URL}?b_start:int=${offset}`);
    const $ = cheerio.load(response.data);
    console.log("Starting fetchTrailLinks")

    const trailLinks = [];
    $('.listitem-title a').each((_, element) => {
      const fullLink = $(element).attr('href');
    
      trailLinks.push(fullLink);
    });

    console.log(`Found ${trailLinks.length} trail links on offset ${offset}.`);
    console.log(trailLinks)

    return trailLinks;
  } catch (error) {
    console.error('Error fetching trail links:', error);
    return [];
  }
};




module.exports = fetchTrailLinks;