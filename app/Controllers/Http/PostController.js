'use strict'
const Post = use('App/Models/Post');
const { validate } = use('Validator');
const uuid = use('uuid');

class PostController {
    
    async index ({ view }) {
        
        const posts = await Post.all();

        return view.render('posts.index', {
            title: 'Check out the Posts',
            posts: posts.toJSON()
        });
    }

    async myIndex ({ view, auth }) {
        const posts = await Post.query().where('user_id', auth.user.id).fetch();

        return view.render('posts.myIndex', {
            title: `Posts made by ${auth.user.username}`,
            posts: posts.toJSON()
        })
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

    async store ({ request, auth, response, session }) {
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

        post.primaryKeyValue = uuid.v4();
        post.title = request.input('title');
        post.body = request.input('body');
        
        post.user_id = auth.user.id;


        await post.save();

        session.flash({ notification: 'Post added successfully.'});

        return response.redirect('/posts');
    }

    async edit ({ params, view, auth, response }) {
        const post = await Post.find(params.id);

        if (auth.user.id === post.user_id){
            return view.render('/posts.edit', {
                title: 'Edit Post',
                post
            })
        }

        return response.redirect('/posts');
    }

    async update ({ params, request, response, session, auth}) {
        const post = await Post.find(params.id);

        if (auth.user.id !== post.user_id) {
            return response.redirect('/posts');
        }

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

    async destroy ({params, response, session, auth }) {
        const post = await Post.find(params.id);

        if (auth.user.id === post.user_id){
            await post.delete();
            session.flash({ notification: 'Post deleted.'});
        }

        return response.redirect('/posts');
    }
}

module.exports = PostController;
