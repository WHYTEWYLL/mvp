
var app = {};
var HOST = 'http://localhost:8080';

app.proxy = function (type, url, data, onSuccess, onError) {
  var headers = {};
  if (app.user && app.user.token) {
    headers = {
      'Authorization': 'Bearer ' + app.user.token
    };
  }
  $.ajax({
    type: type,
    url: HOST + url,
    dataType: 'json',
    data: data,
    headers: headers || {}
  })
  .done(onSuccess)
  .fail(onError);
};

app.validEmail = function (email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};