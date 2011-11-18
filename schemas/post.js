var mongoose = require('mongoose')
  , Promise = mongoose.Promise
  , Schema = mongoose.Schema

var Post = module.exports = new Schema({
  author : {type: String},
  content : {type: String},
  date : {type: Date, default: Date.now},
})

Post.static('top', function(n, callback){
  // we create a promise based on this callback
  // and return it; that way, this function can
  // just be passed into a res.render or res.send
  // call and express-mongoose will make magic happen
  var promise = new Promise(callback);

  // here, we do the actual work
  this.find({},{},{
    sort : { date : -1 },
    limit : n,
  }, function(err, rs){
    if (err!==null) promise.error(err);
    else promise.complete(rs);
  })

  // and here we return the promise object.
  return promise;
})
