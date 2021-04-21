'use strict'
const Post = use('App/Models/Post');
const { validate } = use('Validator');

class PostController {
    
    async index ({ request, response, view }) {
        
        const posts = await Post.all();

        return view.render('posts.index', {
            title: 'Check out the Posts',
            posts: posts.toJSON()
        });
    }

    async details ({ params, view }) {

        const post = await Post.find(params.id);

        return view.render('posts.details', {
            post
        });
    }

    async add ({view}) {
        return view.render('posts.add', {
            title: 'Add Post'
        })
    }

    async store ({ request, response, session }) {
        const post = new Post();
        const rules = {
            title: 'required|min:3|max:255',
            body: 'required|min:3'
        };
        const validation = await validate(request.all(), rules);

        if(validation.fails()) {
            session.withErrors(validation.messages()).flashAll();

            return response.redirect('back');
        }

        post.title = request.input('title');
        post.body = request.input('body');



        await post.save();

        session.flash({ notification: 'Post added successfully.'});

        return response.redirect('/posts');
    }

    async edit ({ params, view }) {
        const post = await Post.find(params.id);

        return view.render('/posts.edit', {
            title: 'Edit Post',
            post
        })
    }

    async update ({ params, request, response, session}) {
        const post = await Post.find(params.id);
        const rules = {
            title: 'required|min:3|max:255',
            body: 'required|min:3'
        };
        const validation = await validate(request.all(), rules);

        if(validation.fails()) {
            session.withErrors(validation.messages()).flashAll();

            return response.redirect('back');
        }

        post.title = request.input('title');
        post.body = request.input('body');



        await post.save();

        session.flash({ notification: 'Post updated.'});

        return response.redirect('/posts');
    }

    async destroy ({params, response, session }) {
        const post = await Post.find(params.id);
        
        await post.delete();

        session.flash({ notification: 'Post deleted.'});

        return response.redirect('/posts');
    }
}

module.exports = PostController;
