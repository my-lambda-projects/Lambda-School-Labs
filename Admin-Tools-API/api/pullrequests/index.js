const express = require('express');
const router = express.Router();
const controller = require('./pr-controller')();



// Highly suggest changing this route to include something like 'all';
router.get('/all', controller.getAllPrs);

// Route to get one Pull request by ID from our db
router.get('/:id', controller.getOnePr);

// Highly suggest making this route be what handles the creation of new prs; ('this is the old pr-save' route)
// Changed name so that we can handle whatever happens with the pr in the same route since github uses the same webhook to send all the following actions: 
// Pull request opened, closed, reopened, edited, assigned, unassigned, review requested, review request removed, labeled, unlabeled, or synchronized..
router.post('/handlePr', controller.handlePr);

// This handles comments on diffs in files from pull requests:
// Pull request diff comment created, edited, or deleted
router.post('/handlePrDiffComment', controller.handlePrDiffComment);

// Route to delete all closed PRs
router.delete('/clear', controller.clearClosedPrs); 

// Route to delete one PR by ID
router.delete('/:id', controller.deleteOnePr);

module.exports = router;