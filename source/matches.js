
db = require('monk')('localhost/magic');
matches = db.get("matches");
 
module.exports = function(mid) 
{
 return {
  "open" : function(clb) 
  {
   matches.findOne({ "matchid" : mid }, function(err, doc) 
   {
    clb(doc);
   });
  },
 
  "save" : function(doc, clb) 
  {
   matches.update({ "matchid" : mid }, doc, function(err, doc) 
   {
    clb();
   });
  }
 };
};