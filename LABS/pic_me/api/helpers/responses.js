exports.send = (res, status, data) => {
	res.status(status).send(data);
};

exports.error = (res, err, message) => {
	res.status(500).send({ err, message });
};
