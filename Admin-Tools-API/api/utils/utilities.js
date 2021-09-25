module.exports = () => {
    return {
        errorHandler: (status, message, res, done) => {
            res.status(status).send({ message });
            return;
        }
    }
}