
console.log(req.session);
req.session.a = req.session.a || 12;
req.session.b = req.session.b + 1 || 14;
console.log(req.session);
res.send(req.session);