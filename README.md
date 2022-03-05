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

This module is currently capable of managing GET and POST requests:

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