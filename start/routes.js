'use strict'

const PostController = require('../app/Controllers/Http/PostController');

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.on('/').render('home');

// Route.get('test/:id', ({ params }) => {
//     return `Parameter id: ${params.id}`;
// });

Route.group(() => {
    Route.get('/', 'PostController.index');
    Route.get('/add', 'PostController.add');
    Route.get('/edit/:id', 'PostController.edit');
    Route.get('/:id', 'PostController.details');
    
    Route.post('/', 'PostController.store');
    Route.post('/:id/edit', 'PostController.update');
    Route.delete('/:id/delete', 'PostController.destroy');
}).prefix('/posts');