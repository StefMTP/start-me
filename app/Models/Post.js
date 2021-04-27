'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {

    static get incrementing () {
        return false;
    }

    static get primaryKey () {
        return 'id';
    }
}

module.exports = Post
