function json(req, _res){
    if(req.body){
        req.body = JSON.parse(req.body);
    }
}

module.exports = json;