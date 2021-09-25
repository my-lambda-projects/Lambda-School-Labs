require("dotenv").config();
const express = require("express");
const router = express.Router();
const pg = require("pg");

var client = new pg.Client(process.env.RDS_SECRET);
client.connect();


router.get("/files", async (req, res) => {
    client.query(`SELECT * FROM files`)
	.then(result => {
	    res.status(200).json(result.rows);
	})
	.catch(e => {
        console.error(e),
	    res.status(404).json(e.stack);
	})
});

router.post("/files", (request, res) => {
    console.log("RequestB", request.body);
    const { filename, file_size, URL, upload_date, file_id, FK_user_id} = request.body;
    client.query(`INSERT INTO files (
		filename, file_size, URL, upload_date, file_id, FK_user_id)
    VALUES ($1, $2, $3, $4, $5, $6)`,[filename, file_size, URL, upload_date, file_id, FK_user_id])
	.then(result => {
	    res.status(200).json(result);
	    // process.exit();
	})
	.catch(e => {
	    console.error(e.detail),
	    res.send(e)
	})
});


//DELETE FILE BY FILE_ID
router.delete("/:id", (request, res) => {
    const fileID = parseInt(request.params.id)
    client.query(`DELETE FROM files WHERE file_id = $1`,[fileID])
	.then(result => {
	    res.status(200).json(result);
	})
	.catch(e => {
	    console.error(e),
	    res.send(e)
	})
});

//UPDATE FILE BY FILE_ID
router.put("/:id", (request, res) => {
	const fileID = parseInt(request.params.id)
	const { filename, file_size, URLs, upload_date, file_id, FK_user_id } = request.body;

	console.log("RB", request.body);
	client.query(`UPDATE files SET filename = $1, file_size = $2, url = $3, upload_date = $4,
	 file_id = $5, FK_user_id = $6 WHERE file_id = $7`, 
	 [filename, file_size, URLs, upload_date, file_id, FK_user_id, fileID])
	  .then(result => {
		res.status(200).json(result);
	  })
	  .catch(e => {
		console.error(e.detail), res.send(e);
	  });
  });


module.exports = router;
