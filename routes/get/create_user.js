console.log(req.query);

res.send(require("./users").create(req.query.username, req.query.password));