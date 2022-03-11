
function route () {
    let getRoutes ={};
    let postRoutes = {};
    let putRoutes = {};
    let deleteRoutes = {};


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

    

    return { get, post, put, del, getRoutesgetter, postRoutesgetter, putRoutesgetter, deleteRoutesgetter };
}

module.exports = route;