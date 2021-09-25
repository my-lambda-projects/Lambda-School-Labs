const PullRequest = require('./pr-model');
const util = require('../utils/utilities')();

const handleUserOnSave = (newPr, res, done) => {
  const newPullRequest = new PullRequest(newPr);
  newPullRequest.save((err, savedPR) => {
    if (err) return SendStatusError(err, res);
      res.json(savedPR);
      done();
  });
};
    
const handleUpdatePullRequest = (id, item, res, done) => {
  PullRequest.findByIdAndUpdate(
    id, 
    item, 
    (error, updatedPr) => {
      // console.log("ERROR: ", error);
      // console.log("updatedPr: ", updatedPr);
      if (error) {
        return SendStatusError(error, res, done);
      }
      res.json(updatedPr);
  });
};

module.exports = () => {
  return {
    handlePr: (req, res, done) => {
      const PR = req.body.pull_request;
      console.log(req.body);
      const { name } = req.body.repository;
      if (PR) {
        const user = { login, avatar_url } = PR.user;
        const { html_url, state, createdAt, id } = PR;
        const newPr = { user: { login, avatar_url }, html_url, state, name, createdAt, id };
        PullRequest.find({id: id}, (err, objectFound) => {
          if (err) {
            // if error is found handle it.
            return util.errorHandler(500, 'Server error creating PR.', res, done);
          }
          if (objectFound.length === 0) {
            // if PR doesn't exists save it.
            handleUserOnSave(newPr, res, done);
          } else {
            // if PR exists we're going to just update it.
            const id = objectFound[0]._id;
            handleUpdatePullRequest(id, newPr, res, done);
          }
        });
      } else {
        res.status(200);
        res.json({ 'Message: ': 'must be a test' });
      }
    },
        
    getAllPrs: (req, res, done) => {
      // console.log('GET ALL PRS');
      PullRequest.find({}, (err, pullRequests) => {
        if (err) return util.errorHandler(500, 'Server error locating all the Pull Requests.', res, done);
        res.json(pullRequests);
      });
    },

    getOnePr: (req, res, done) => {
      // To get a single PR
      const { id } = req.params;
      PullRequest.findById(id).exec((err, pr) => {
        if (err) return util.errorHandler(500, 'Server error locating this pull request.', res, done);
        return pr ? res.json(pr) : util.errorHandler(404, 'This Pull Request does not exist in the database.', res, done);
      })
    },

    deleteOnePr: (req, res, done) => {
      const { id } = req.params;
      PullRequest.findByIdAndRemove(id, err => err ? util.errorHandler(500, 'Server error trying to delete this pull request.', res, done) : res.json(response));
    },

    clearClosedPrs : (req, res, done) => {
      PullRequest.remove({ state: 'closed'}, err => err ? util.errorHandler(500, 'Server error clearing closed PRs.', res, done) : res.status(200).send({ message: 'All closed PRs have been deleted.' }));
    },
        
    // Whenever somebody goes in a file in a pull request and creates, edits, or deletes a comment for a 'dif'
    // Should be refactored in the future to be easier to navigate and probably only need to write one call to db.
    handlePrDiffComment: (req, res, done) => {
      const action = req.body.action;
      const prId = req.body.pull_request.id;
      const ghId = req.body.comment.id;
      const postComment = {
        ghId,
        body: req.body.comment.body,
        created: new Date(req.body.comment.created_at),
        file: req.body.comment.path,
        user: {
          login: req.body.comment.user.login,
          avatar_url: req.body.comment.user.avatar_url
        }
      }
      const deleteDiffComment = () => {
        PullRequest.update({id: prId}, 
          { $pull: { diffComments: { ghId }}}, 
          { safe: true, multi: true }, 
          (err, response) => {
            return err ? util.errorHandler(500, 'Server error deleting this comment from the pull request.', res, done) : res.json(response);
          });
      }
      const createDiffComment = () => {
        PullRequest.findOne({id: prId})
          .exec((err, pr) => {
            if (err) return util.errorHandler(500, 'Server Error looking up the Pull request to inser a new Diff comment.', res, done);
            pr.diffComments.push(postComment);
            pr.save((err,result) => {
              return err ? util.errorHandler(500, 'Server saving this diff comment in the pull request', res, done) : res.json(result);
            });
          })
      }
      const editDiffComment = () => {
        PullRequest.update({id: prId, 'diffComments': {'$elemMatch': {ghId } }}, 
          { $set : postComment }, 
          { new:true, upsert:true, safe:true }, 
          (err, response) => {
            return err ? util.errorHandler(500, 'Error updating a diff comment for the pull request', res, done) : res.json(response);
          })
      }
      switch(action) {
        case 'created':
          return createDiffComment();
        case 'edited':
          return editDiffComment();
        case 'deleted':
          return deleteDiffComment();
        default:
          res.status(422).send({message: 'Something went wrong handling this comment'});
      }
    }
  }
}