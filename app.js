const http = require('http');

function app() {
    const getRoutes = {};
    const postRoutes = {};
    const putRoutes = {};
    const deleteRoutes = {};
    const globalMiddlewares = [];

    function get(path, handler) {
        getRoutes[path] = handler;
    }

    function post(path, handler) {
        postRoutes[path] = handler;
    }

    function put(path, handler) {
        putRoutes[path] = handler;
    }

    function del(path, handler) {
        deleteRoutes[path] = handler;
    }


    function listen(port, callback = () => { }) {
        
        const server = http.createServer(function (req, res) {
            const url = req.url;
            const method = req.method;
            let handler = null;

            switch(method) {
                case 'GET':
                    handler = getRoutes[url];
                    break;
                case 'POST':
                    handler = postRoutes[url];
                    break;
                case 'PUT':
                    handler = putRoutes[url];
                    break;
                case 'DELETE':
                    handler = deleteRoutes[url];
                    break;
                default:
                    handler = null;
                    break;
            }

            if (handler) { 
                if(globalMiddlewares.length > 0) {
                    for(let middleware of globalMiddlewares) {
                        middleware(req, res);
                    }
                }
                handler(req, res);
            } else {
                res.statusCode = 404;
                res.end(`Cannot ${method} ${url}`);
            }
        }); 


        //console.log('get',getRoutes);
        //console.log('post',postRoutes);
        //console.log('put',putRoutes);
        //console.log('delete',deleteRoutes);

        server.listen(port);
        callback();

        return server;

    }

    function use(param1, routes) {
        if(typeof param1 === 'string') {
            addRoute(param1, routes);
        }
        else if(typeof param1 === 'function' && typeof routes === 'undefined') {
            globalMiddlewares.push(param1);
        }
    }

    function addRoute(route, routes){
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
        for (let key in routes.putRoutesgetter()) {
            if(key === '/') {
                put(`${route}${key}`, routes.putRoutesgetter()[key]);
                key = route;
                put(key, routes.putRoutesgetter()['/']);
            }
            else {
                put(`${route}${key}`, routes.putRoutesgetter()[key]);
            }
        }
        for (let key in routes.deleteRoutesgetter()) {
            if(key === '/') {
                del(`${route}${key}`, routes.deleteRoutesgetter()[key]);
                key = route;
                del(key, routes.deleteRoutesgetter()['/']);
            }
            else {
                del(`${route}${key}`, routes.deleteRoutesgetter()[key]);
            }
        }
    }


    return { get, post, put, del, listen, use };
}

app.Router = require('./route');

module.exports = app;