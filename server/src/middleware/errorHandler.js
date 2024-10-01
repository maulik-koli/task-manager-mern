const errorHandler = (err, req, res, next) => {
    // require value related error
    if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
    }

    // unique value related error
    if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(400).send({ message: 'Email already in use.' });
    }

    // any other error
    res.status(500).send({ message: 'Internal server error' });
}

module.exports = errorHandler
