const errorHandler = (e, req, res, next) => {
    // require value related error
    if (e.name === 'ValidationError') {
        return res.status(400).send({ message: e.message });
    }
    
    // unique value related error
    if (e.name === 'MongoServerError' && e.code === 11000) {
        return res.status(400).send({ message: 'Email already in use.' });
    }

    // any other error
    res.status(500).send({ message: 'Internal server error' });
}

module.exports = errorHandler
