const axios = require('axios');
const cheerio = require('cheerio');

const fetchTrailDetails = async (url) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
  
      // Extract trail details
        const name = $('.hike-top h1').text().trim()
        const difficulty = $('dd.wta-pill').text().trim()
        const latitude = $('.h4 span:first').text().trim()
        const longitude = $('.h4 span:last').text().trim()

        
        const paragraphs = []
        
        $('.hike-major-section .wta-sidebar-layout__content p').each(function () {
            paragraphs.push($(this).text().trim()); // Add the text content of each <p> to the array
        });
        
        

        
        return { name, difficulty, latitude, longitude, paragraphs };

    } catch (error) {
      console.error(`Error fetching trail details from ${url}:`, error);
      return null;
    }
  };


module.exports = fetchTrailDetails;
  