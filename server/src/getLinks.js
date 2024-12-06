const axios = require('axios');
const cheerio = require('cheerio');

// Base URL for list of hikes
const BASE_URL = 'https://www.wta.org/go-hiking/hikes';

const fetchTrailLinks = async (pageNumber) => {
  try {
    const response = await axios.get(`${BASE_URL}?page=${pageNumber}`);
    const $ = cheerio.load(response.data);
    console.log("Starting fetchTrailLinks")

    const trailLinks = [];
    $('.search-result-item a').each((_, element) => {
      const fullLink = $(element).attr('href');
    
      trailLinks.push(fullLink);
    });

    return trailLinks;
  } catch (error) {
    console.error('Error fetching trail links:', error);
    return [];
  }
};


module.exports = fetchTrailLinks;