$(function () {

  var template = '<div>\
    <h2>SAIKI</h2>\
    <input type="email" class="email" placeholder="Email" value="demo@demo.com">\
    <input type="text" class="summoner" placeholder="Summoner">\
    <select type="text" class="regions"></select>\
    <button class="login">Start</button>\
  </div>';

  var validRegions = ['ru', 'kr', 'br1', 'oc1', 'jp1', 'na1', 'eun1', 'euw1', 'tr1', 'la1', 'la2'];

  $.tmpl(template, {}).appendTo('#app-container');

  var $select = $('select.regions');
  validRegions.forEach(function (region) {
    $select.append('<option value="' + region + '">' + region + '</option>');
  });

  $('button.login').click(function () {
    if (app.user) {
      return saveSummoner();
    }
    var email = $('input.email').val().trim().toLowerCase();
    if (!email || !app.validEmail(email)) {
      return;
    }
    app.proxy('POST', '/auth/email-login', {email: email}, loginSuccess, loginError);
  });
  
  var loginError = function (error) {
    console.log('error login', error);
  };

  var loginSuccess = function (data) {
    app.user = data;
    saveSummoner();
  };

  var saveSummoner = function () {
    var data = {
      name: $('input.summoner').val().trim().toLowerCase(),
      region: $('select').val()
    };
    // if (!data.name || !data.region) {
    //   return;
    // }
    app.proxy('POST', '/riot/summoner/by-name', data, summonerSaved, errorSavingSummoner);
  };

  var errorSavingSummoner = function (error) {
    console.log('Error saving summoner', error);
  };

  var summonerSaved = function (summoner) {
    app.user.summoner = summoner;
    $('#app-container').html('');
    app.loadQuestionnaire();
  };

});