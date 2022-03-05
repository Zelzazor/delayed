const http = require('http');

function app() {
    let getRoutes = {};
    let postRoutes = {};

    function get(path, handler) {
        getRoutes[path] = handler;
    }

    function post(path, handler) {
        postRoutes[path] = handler;
    }

    function listen(port, callback = () => { }) {
        
        const server = http.createServer(function (req, res) {
            const url = req.url;
            const method = req.method;
            const handler = method === 'GET' ? getRoutes[url] : postRoutes[url];

            if (handler) { 
                handler(req, res);
            } else {
                res.statusCode = 404;
                res.end('Not found');
            }
        }); 

        console.log(getRoutes);
        server.listen(port);
        callback();

        return server;

    }

    function use(route, routes) {
        for (let key in routes.getRoutesgetter()) {
            if(key === '/') {
                get(`${route}${key}`, routes.getRoutesgetter()[key]);
                key = route;
                get(key, routes.getRoutesgetter()['/']);
            }
            else {
                get(`${route}${key}`, routes.getRoutesgetter()[key]);
            }
        }
        for (let key in routes.postRoutesgetter()) {
            if(key === '/') {
                post(`${route}${key}`, routes.postRoutesgetter()[key]);
                key = route;
                post(key, routes.postRoutesgetter()['/']);
            }
            else {
                post(`${route}${key}`, routes.postRoutesgetter()[key]);
            }
        }
    }

    return { get, post, listen, use };
}

app.Router = require('./route');

module.exports = app;