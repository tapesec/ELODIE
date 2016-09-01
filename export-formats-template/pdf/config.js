config = {
  // Rendering options

  // Zooming option, can be used to scale images if `options.type` is not pdf
  "zoomFactor": "1", // default is 1

  // File options
  "type": "pdf",             // allowed file types: png, jpeg, pdf
  "orientation": "landscape",
  "border": {
    	"top": "10px",            // default is 0, units: mm, cm, in, px
    	"right": "10px",
    	"bottom": "10px",
    	"left": "10px"
  }

};

if (process.env.NODE_ENV == "production") {
  // Base path that's used to load files (images, css, js) when they aren't referenced using a host
  config.base = "https://elodidel.herokuapp.com";
} else {
  config.base = "file:///Users/lionneldupouy/ELODIE/";
}


module.exports = config;