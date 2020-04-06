const config = require('../../config');

module.exports = (req, result) => {
    let page = parseInt(req.query.page) || 1;
    page = page < 1 ? 1 : page;
    const offset = (page - 1) * config.PAGE_SIZE;
    const limit = offset + config.PAGE_SIZE;

    return {
        query: {
            offset,
            limit
        },
        response: result => ({
            page,
            page_size: config.PAGE_SIZE > result.count ? result.count : config.PAGE_SIZE,
            total_pages: Math.ceil(result.count / config.PAGE_SIZE),
            total_items: result.count
        })
    };
};
