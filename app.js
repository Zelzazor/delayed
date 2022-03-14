const http = require('http');
const path = require('path');
const fs = require('fs');


function app() {
    const getRoutes = {};
    const postRoutes = {};
    const putRoutes = {};
    const deleteRoutes = {};
    const globalMiddlewares = [];
    const variables = {};
    const compilations = {};

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

    function set(name, value) {
        variables[name] = value;
    }

    


    function listen(port, callback = () => { }) {
        
        const server = http.createServer(async function (req, res) {

            const buffers = [];

            for await(const chunk of req) {
                buffers.push(chunk);
            }

            const body = Buffer.concat(buffers).toString();

            req.body = body;
            
            function status (statusCode = 200){
                res.statusCode = statusCode;
                return {json, render};
            }

            function render(name, dependencies = {}){
                const result = compilations[name](dependencies)
                res.writeHead(res.statusCode, {'Content-Type': 'text/html'});
                res.write(result); 
                res.end();
            }
            function json(data){
                res.writeHead(res.statusCode, {'Content-Type': 'application/json'})
                res.write(JSON.stringify(data)); 
                res.end();
            }
            
            res.render = render;
            res.status = status;
            res.json = json;
            
            
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


        
        if(variables['view engine'] && variables['views']){
            compileTemplate();
        }

        

        //console.log("compilations", compilations)
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

    function compileTemplate(){
            const files = fs.readdirSync(variables['views']);
            
        
            const filesPath = files.map(file => {
                return path.join(variables['views'], file);
            });

            const template = require(variables['view engine']);
            filesPath.forEach((file)=>{
                const filename = path.parse(file).name;
                if(variables['view engine'] === 'pug'){
                    const compilation = template.compileFile(file);
                    compilations[filename] = compilation;
                }
                else if(variables['view engine'] === 'ejs'){
                    const compilation = template.compile(file);
                    compilations[filename] = compilation;
                }
                
            })
    }


    return { get, post, put, del, listen, use, set };
}

app.Router = require('./route');
app.json = require('./json');

module.exports = app;