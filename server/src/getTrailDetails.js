const axios = require('axios');
const cheerio = require('cheerio');
const { before } = require('node:test');

const fetchTrailDetails = async (url) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
  
      // Extract trail details
        const name = $('.hike-top h1').text().trim()
        const difficulty = $('dd.wta-pill').text().trim()
        const latitude = $('.h4 span:first').text().trim()
        const longitude = $('.h4 span:last').text().trim()
        const pass = $('#hike-trailhead-and-map .wta-sidebar-layout__content .alert h4').text().trim()
        const passName = $('#hike-trailhead-and-map .wta-sidebar-layout__content .alert a').text().trim()
        const passLink = $('#hike-trailhead-and-map .wta-sidebar-layout__content .alert a').attr('href')

        const passDetails = { pass: pass, passName: passName, passLink: passLink }

        
        const paragraphs = []
        const beforeYouGo = []
        
        $('#hike-body-text p').each(function () {
            paragraphs.push($(this).text().trim()); // Add the text content of each <p> to the array
        });

        $('#hike-trailhead-and-map .wta-sidebar-layout__content p').each(function () {
          const paragraphElement = $(this).text().trim();
          const linkElement = $(this).find('a');


          if (linkElement.length > 0) {
            const link = linkElement.attr('href');
            beforeYouGo.push({ text: paragraphElement, href: link });
          }
          else{
            beforeYouGo.push({ text: paragraphElement });
          }

        })
        
        

        
        return { name, difficulty, latitude, longitude, paragraphs, beforeYouGo, passDetails};

    } catch (error) {
      console.error(`Error fetching trail details from ${url}:`, error);
      return null;
    }
  };


module.exports = fetchTrailDetails;
  