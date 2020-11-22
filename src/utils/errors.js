class NotFoundError extends Error {
    constructor (type = '', ...params) {
        super(...params);
        this.name = 'NotFoundError';
        this.type = type;
    }
}

class DuplicateError extends Error {
    constructor (title = '', ...params) {
        super(...params);
        this.name = 'DuplicateError';
        this.title = title;
    }
}

module.exports = {
    NotFoundError,
    DuplicateError,
};
