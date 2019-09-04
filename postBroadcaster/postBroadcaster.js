const dsteem = require('dsteem');

const client = new dsteem.Client('https://api.steemit.com');

async function createPost (post, key) {
    return await client.broadcast.comment(post, key);
}

module.exports = createPost;