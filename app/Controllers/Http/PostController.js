'use strict'

class PostController {

    async index ({ request, response, view }) {
        const posts = [
            {
                title: 'Post 1',
                body: 'This is the body of Post 1'
            },
            {
                title: 'Post 2',
                body: 'This is the body of Post 2'
            },
            {
                title: 'Post 3',
                body: 'This is the body of Post 3'
            },
            {
                title: 'Post 4',
                body: 'This is the body of Post 4'
            }
        ];

        return view.render('posts.index', {
            title: 'Check out the Posts',
            posts
        });
    }
}

module.exports = PostController
