
var fs = require('fs');
module.exports = function(lang) {
    if(fs.existsSync("locale/" + lang + "/site.json")) {
        return JSON.parse(fs.readFileSync("locale/" + lang + "/site.json"));        
    } else return JSON.parse(fs.readFileSync("locale/en/site.json"));
};