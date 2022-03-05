
function route () {
    let getRoutes ={};
    let postRoutes = {};

    function get(path, handler) {
        getRoutes[path] = handler;
    }

    function post(path, handler) {
        postRoutes[path] = handler;
    }

    function getRoutesgetter() {
        return getRoutes;
    }

    function postRoutesgetter() {
        return postRoutes;
    }

    

    return { get, post, getRoutesgetter, postRoutesgetter };
}

module.exports = route;