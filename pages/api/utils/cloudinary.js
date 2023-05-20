require('dotenv').config();


const cloudinary = require('cloudinary');


cloudinary.config({
    cloud_name: "dgfozubct",
    api_key: "776215595396479",
    api_secret: "Pz-_aVmhXTqIkvjKBHmyCT6NTuo",
});


module.exports = {cloudinary};