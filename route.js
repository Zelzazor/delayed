
function route () {
    let getRoutes ={};
    let postRoutes = {};
    let putRoutes = {};
    let deleteRoutes = {};
    let middlewares = [];


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


    function getRoutesgetter() {
        return getRoutes;
    }

    function postRoutesgetter() {
        return postRoutes;
    }

    function putRoutesgetter() {
        return putRoutes;
    }

    function deleteRoutesgetter() {
        return deleteRoutes;
    }

    function use(fn){
        middlewares.push(fn);
    }
    

    return { get, post, put, del, use, getRoutesgetter, postRoutesgetter, putRoutesgetter, deleteRoutesgetter, middlewares };
}

module.exports = route;