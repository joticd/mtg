
console.log(req.session);
params.username = req.session.username;
res.render('login', params);