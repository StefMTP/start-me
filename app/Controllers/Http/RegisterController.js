'use strict'
const User = use('App/Models/User');
const { validate } = use('Validator');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for registering users
 */
class RegisterController {
  /**
   * Show a list of all registers.
   * GET registers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new user.
   * GET registers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('auth.register', {
      title: 'Register'
    });
  }

  /**
   * Create and save a new user.
   * POST register
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session }) {
    const user = new User();
    const rules = {
      username: 'required',
      email: 'required|email|unique:users',
      password: 'required|min:6|confirmed'
    };

    const validation = await validate(request.all(), rules);

    if(validation.fails()) {
      session.withErrors(validation.messages()).flashAll();

      return response.redirect('back');
  }
  
    user.username = request.input('username');
    user.email = request.input('email');
    user.password = request.input('password');

    await user.save();

    session.flash({ notification: 'New user registered.'});

    return response.redirect('/auth/login');
  }
}

module.exports = RegisterController;
