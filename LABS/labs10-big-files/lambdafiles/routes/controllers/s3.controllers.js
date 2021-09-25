var stream = require('stream');
 
const s3 = new aws.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  Bucket: process.env.Bucket
});
 
exports.doDownload = (req, res) => {
    const s3Client = s3.s3Client;
    const params = s3.downloadParams;
    
    params.Key = req.params.filename;

    s3Client.getObject(params)
	.createReadStream()
	.on('error', function(err){
	    res.status(500).json({error:"Error -> " + err});
	}).pipe(res);
}
