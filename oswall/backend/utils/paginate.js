function paginate(array, page = 1, limit = 10) {
    const start = (page - 1) * limit;
    return array.slice(start, start + limit);
}

module.exports = { paginate };
