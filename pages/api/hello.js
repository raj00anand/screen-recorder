const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: "dgfozubct",
    api_key: "776215595396479",
    api_secret: "Pz-_aVmhXTqIkvjKBHmyCT6NTuo",
});


export const config = {
    api: {
      bodyParser: {
        sizeLimit: '240mb',
      },
    },
  };


  export default async function handler(req, res) {
    let uploaded_url = '';
    const fileStr = req.body.data;
  
    if (req.method === 'POST') {
      try {
        const uploadedResponse = await cloudinary.uploader.upload_large(fileStr, {
          resource_type: 'video',
          chunk_size: 6000000,
        });
        console.log('uploaded_url', uploadedResponse.secure_url);
        uploaded_url = uploadedResponse.secure_url;
      } catch (error) {
        res.status(500).json({ error: 'Something wrong' });
      }
      console.log('objects', uploaded_url);
      //res.writeHead(200, { 'Content-Type': 'text/event-stream' });
  
      res.status(200).json({ data: uploaded_url });
    }
  }