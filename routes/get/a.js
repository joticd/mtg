
console.log(req.session);
req.session.a = 5;
req.session.b = 7;
console.log(req.session);
res.send(req.session);