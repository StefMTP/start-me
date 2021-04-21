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

If for example we have a PostController with the method index that accepts request, response and view (groupped together, they are called the HTTP context), we can use that method to render a view when the url we have mapped to the controller.method (use dot notation for folder structure!). Index calls the view.render method and passes in the view contained in views and any other data we wish to pass in, in an object.

We can also create routes for urls that are followed by parameters, but we need to be careful. If I have a 'posts/add' route for creating new posts and a 'posts/:id' to check the post with the certain id, we need to include the add route first. If we don't, then Adonis will think we are calling the view for the url 'posts/:id', with the id being 'add'.

We need to be careful with the routes and the controller methods. We need to distinguish routes with get requests for methods that render things and routes with post/put/etc. requests for methods that manipulate our data. For example, our blogpost app will have a get request to the Blogpost Controller method (for example add) that renders the create post form, but the actual manipulation of data is done through a post request to another Blogpost Controller method (for example store).

The Adonis template engine is used exactly like in Laravel: you can create your layout view that wraps around all appropriate views by using section blocks accordingly. Looping through arrays is done with each blocks. Including components into our views is done with the include block.

## Including a Database and fixing up the Models.

Having a local mysql database, we hook up the appropriate variables in the .env file of our project (we can do the same configuration with any other dbsm to be honest, except maybe for mongo, which requires other configurations). In order to create a new Model that will be represented as a table in the database, we need to make and run our migrations. Migrations (like in Django and Laravel) are database mutations that we can roll up or down, meaning we can run them, or roll them back whenever we want Adonis comes with two default migrations: one for a User model and another for a Token model.

In the schema file for our migration, we are supposed to have an up and a down method. The down method basically is supposed to revert the changes made by the up method. If the up method is creating a table, then the down method will be dropping that table.

There are many column modifiers and types to represent the sql relations and types that will be applied on the tables.

Migrations run using migration:run and they rollback using migration:rollback. There is also refresh and reset in case we want to start fresh again. It is recommended to create one table per schema file. This way, we can easily rollback to any version without much trouble.

In order to be able to manage the tables through the Adonis application, we need a model for each table. Since we have added the logic in the schemas, models don't require any modifications. They provide methods to call queries on our tables and return the results to our views.

## CRUD operations with everything we have gathered.

To implement create-update-delete functionality to our app, we need to make different methods in our Controllers and hook them up with the appropriate post/delete requests in the routes file.

With post requests, we are usually accepting inputs from the user through forms and as such, we need to pull the inputs accordingly through the request parameter input method. We create new records in our tables by calling a new instance of the respective model, assigning inputs to the appropriate fields and finally saving the model. Updating and deleting is done in a very similar way (this time however, we are calling specific records currently in our database and updating or deleting them).

In order to make a put request, we need to append a parameter _method=PUT to the url of the form action. Generally, bunch updates must be done through POST requests, while a change on one attribute through PUT.

### Sessions and Validators

We can use sessions to implement flash messaging in our app, to inform the user if the request they have made was successful or not. We need to install the adonis validator and include it through our providers into the controller we want. The validator provides us with a validate method, to which we can apply our rules for the fields (Adonis comes with its own validation rules but we can also create our own). Then we need an if statement that checks whether the validation fails function is true, meaning we have a validation problem, in which we can flash the errors we are interested in and then redirect the user back to the same page.