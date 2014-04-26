fs = require("fs");
params.tests = fs.readdirSync("public/js/tests");
params.title = "nodejs template";
res.render('test', params);