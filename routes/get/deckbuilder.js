
if(req.session) {
  params.username = req.session.username;
  res.render('deckbuilder', params);
} else {
  params.username = "";
  res.render('login', params);
}  
// params.username = req.session ? req.session.username : "";

