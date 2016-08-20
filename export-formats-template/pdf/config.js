config = {
  // Rendering options
  "base": "file:///home/lionneldupouy/ELODIE/export-formats-template/pdf/style.css", // Base path that's used to load files (images, css, js) when they aren't referenced using a host

  // Zooming option, can be used to scale images if `options.type` is not pdf
  "zoomFactor": "1", // default is 1

  // File options
  "type": "pdf",             // allowed file types: png, jpeg, pdf
  "quality": "75",           // only used for types png & jpeg

};

module.exports = config;