## ADONIS CHAD JS

#### Basic folder structure, important folders to notice:

-databases/
-config/
-app/
-start/
-resources/views/
-public

All in very Laravel-like form!
Just run 'adonis serve --dev' if you wanna watch for changes.

## Let's start building some routes, for example, a new route for the homepage.
In the cmd run 'adonis make:view home', which creates a new home.edge file in resources/views.
In routes, if we call the on function from Route we can set which view renders when a certain url of our webpage is called. This renders a view directly when dealing for example with static pages.
Normally, we want to call Route.get/post to serve and respond to our requests.
Similarly to Express, we call Route.get(url, arrow function that returns something for us)
Also, we probably should bind our http requests to controllers.
Similar to Laravel, we write Route.get('test', 'TestController.index'), which maps the url test to the index method of the TestController.
We can also call the Route.routes function if we want to respond to various requests with one registered route, but we have to complete it with an array of the expected request verbs (GET, POST, PUT, DELETE...)
In very Laravel fashion, routes can also be named so we can directly call them using route helpers from templates and other pieces of code (using the as method for each controller method individually, or by using Route.resource which assigns CRUD routes to a controller automatically with one line).


## Let's now focus on Controllers.
Like we already know, Controllers are a vital piece in the MVC architectural pattern: they accept the requests and inputs from the user and transform them into commands in order to manipulate the data as they are structured in Models, since Models have their own unique logic and rules.
In Adonis, Controllers we create (adonis make:controller Name) are placed under app/Controllers.
[adonis make:controller Tests --type http --resource to create a resourceful controller for nice crud applications.]

If for example we have a PostController with the method index that accepts request, response and view (called the HTTP context), we can use that method to render a view when the url we have mapped to the controller.method (use dot notation for folder structure!). Index calls the view.render method and passes in the view contained in views and any other data we wish to pass in, in an object.

The Adonis template engine is used exactly like in Laravel: you can create your layout view that wraps around all appropriate views by using section blocks accordingly. Looping through arrays is done with each blocks.