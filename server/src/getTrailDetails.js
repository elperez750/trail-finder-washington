const axios = require('axios');
const cheerio = require('cheerio');


const fetchTrailDetails = async (url) => {

    try {
        const response = await axios.get("http://api.scraperapi.com", {
          params: {
            api_key: process.env.SCRAPER_API_KEY,
            url: url,
            render:false,
            autoparse: true
        },
  
            
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
            "Referer": "https://www.google.com",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "DNT": "1", // Do Not Track
            
        }
        })
        console.log(response.data)
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
  