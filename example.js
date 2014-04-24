var app = require('koa')();
var dispatch = require('.');

dispatch.param('name', function* (name) {
  if (name == 'walter') this.noAccess = true;
  this.pet = { name: name };
});

function* hasPermission () {
  if (this.noAccess) this.throw(403);
}

function* getPet () {
  this.body = this.pet;
}

app.use(dispatch.get('/pets/:name', hasPermission, getPet));
app.listen(3000);
