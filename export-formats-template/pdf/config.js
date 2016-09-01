config = {
  // Rendering options
  "base": "file:///Users/lionneldupouy/ELODIE/", // Base path that's used to load files (images, css, js) when they aren't referenced using a host

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

module.exports = config;