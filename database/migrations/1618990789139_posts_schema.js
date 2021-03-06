'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.string('id');
      table.integer('user_id');
      table.string('title');
      table.string('body');
      table.timestamps();
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
