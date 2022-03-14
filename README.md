# Delayed

Another Node.js web framework inspired by Express. This is a proof of concept for now.

## Install

Simply execute the following command: 

```bash
# npm

$ npm install delayed-web

# yarn

$ yarn add delayed-web
```

## Usage

You can use Delayed by importing the dependency:

```js
const delayed = require("delayed-web");

const app = delayed();
```

This module is currently capable of managing GET and POST requests (PUT and DELETE requests are available as an experimental feature):

```js
app.get('/', (req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("Hello World!");
});

app.post('/', (req, res)=>{
    console.log(req.body);
    //do something
})
```
This module is also capable of simple routing:

```js
const delayed = require("delayed-web");

const app = delayed();

const userRoute = delayed.Router();

userRoute.get('/hello', (req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("Hello World from user!");
});


app.use('/users', userRouter); // /users/hello

```

Finally, to start your application, you only need to get it to listen to an specified port:

```js
app.listen(3000, ()=>{
    console.log("Listening to http://localhost:3000");
})
```

## The Future of Delayed

This is only a learning project. Is not going to be very ambitious (I was just inspired by express and tried to recreate some of its features).

## Use of Experimental Features

These features are currently being tested, to use them you must clone this repository and require the dependency like so (assuming you are working on the same directory):

```js
const delayed = require(".");
```

Currently, these are the features that are experimental:

- PUT requests.

    ```js
    app.put('/', (req, res)=>{
    // PUT request
    });
    ```
- DELETE requests (to use them must use ```app.del()``` method).

    ```js
    app.del('/', (req, res)=>{
    // DELETE request
    });
    ```
- Both of these request methods on custom routing.
    ```js
    userRoute.put('/', (req, res)=>{
    // PUT request
    });
    userRoute.del('/', (req, res)=>{
    // DELETE request
    });
    ```

- Global middlewares (it's just a matter of creating them and adding them to the application with ```app.use(middleware)```).
    ```js
    function clock(req, _res) {
        req.clock = new Date();
    }
    app.use(clock);
    ```
- Set variables (it's currently just used to determine the views directory and the view engine).
    ```js
    app.set('views', './views');
    app.set('view engine', 'pug');
    ```
- Compatibility with pug and EJS (need to set the "views" and "view engine" variables with ```app.set(key, value)``` and render the view via it's name with ```res.render(view, data)```, inside the endpoint handler).
    ```js
    app.get('/', (req, res) => {
        console.log("reached here");
        res.render('index', {name: "Felipe"})
    });
    ```
- ```res.status``` and ```res.json``` methods on response object.
    ```js
    app.get('/hello', (req, res) => {
        console.log("reached here");
        res.status(200).json({message: true})
    });
    ```
- ```req.body```, with the possibility of parsing JSON with the ```delayed.json``` middleware.
    ```js
    app.use(delayed.json);
    app.post('/', (req, res) => {
        console.log(req.body);
        res.status(200).json(req.body);
    });
    ```