const express = require('express');
const router = express.Router();
const db = require('../data/helper/workorders');

//GET all workorders

router.get('/', (req, res) => {
	db.get().then((workorders) => res.status(200).json(workorders)).catch((err) => {
		res.status(500).json({ error: `${err}` });
	});
});

//GET work orders by order of ID

router.get('/property/:id', (req, res) => {
	const { id } = req.params;
	db
		.getByPropertyId(id)
		.then((workorder) => {
			if (workorder) {
				res.status(200).json(workorder);
			} else {
				res.status(404).json({ error: 'workorder not found' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: `${err}` });
		});
});

router.get('/landlord/:id', (req, res) => {
	const { id } = req.params;
	db
		.getByLandlordId(id)
		.then((workorder) => {
			if (workorder) {
				res.status(200).json(workorder);
			} else {
				res.status(404).json({ error: 'workorder not found' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: `${err}` });
		});
});

router.get('/tenant/:id', (req, res) => {
	const { id } = req.params;
	db
		.getByTenantId(id)
		.then((workorder) => {
			if (workorder) {
				res.status(200).json(workorder);
			} else {
				res.status(404).json({ error: 'workorder not found' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: `${err}` });
		});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	db
		.findByWorkOrderId(id)
		.then((workorder) => {
			if (workorder) {
				res.status(200).json(workorder);
			} else {
				res.status(404).json({ error: 'workorder not found' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: `${err}` });
		});
});

router.get('/name/:id', (req, res) => {
	const { id } = req.params;
	db
		.getName(id)
		.then((workorder) => {
			console.log(workorder);
			if (workorder) {
				res.status(200).json(workorder);
			} else {
				res.status(404).json({ error: 'workorder not found' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: `${err}` });
		});
});

//POST new workorder

router.post('/', (req, res, next) => {
	const newWorkorder = req.body;
	console.log(newWorkorder);
	db
		.create(newWorkorder)
		.then((ids) => {
			console.log(ids);
			db
				.getById(ids)
				.then((newWorkorder) => {
					res.status(201).json('success');
				})
				.catch((err) => {
					res.status(500).json({ error: `${err}` });
				});
		})
		.catch((err) => {
			next('h500', err);
		});
});

//update(PUT) existing workorder using the id

router.put('/:id', (req, res, next) => {
	const { id } = req.params;
	const edit = req.body;

	db
		.editWorkOrder(id, edit)
		.then((update) => {
			if (update) {
				res.status(200).json({
					message: 'Work order updated'
				});
			} else {
				res.status(404).json({ error: 'That workorder seems to be missing!' });
			}
		})
		.catch((err) => {
			next('h500', err);
		});
});

//DELETE existing work order by using ID

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	db
		.deleteWorkOrder(id)
		.then((workorder) => {
			if (workorder) {
				res.status(202).json({ message: 'Workorder deleted' });
			} else {
				res.status(404).json({ error: 'That Workorder seems to be missing!' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: `${err}` });
		});
});

module.exports = router;
