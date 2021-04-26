'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with logins
 */
class LoginController {
  /**
   * Show the login form.
   * GET login form
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    return view.render('auth.login', {
      title: 'Login'
    });
  }


  /**
   * Try to log the user in.
   * POST login
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async login ({ request, response, auth, session }) {
    await auth.attempt(request.input('email'), request.input('password'));

    session.flash({ notification: 'You are now logged in.'})

    return response.redirect('/posts');
  }

  async logout ({request, auth, response}) {
    await auth.logout();

    return response.redirect('/auth/login');
  }
}

module.exports = LoginController
