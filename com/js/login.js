$(function () {

  var template = '<div>\
    <h2>SAIKI</h2>\
    <input type="email" class="email" placeholder="Email" value="">\
    <div class="summoner-container hidden">\
      <input type="text" class="summoner" placeholder="Summoner">\
      <select type="text" class="regions"></select>\
    </div>\
    <button class="login">Crear</button>\
  </div>';

  var validRegions = ['eun1', 'euw1', 'ru', 'kr', 'br1', 'oc1', 'jp1', 'na1', 'tr1', 'la1', 'la2'];

  $.tmpl(template, {}).appendTo('#app-container');

  var $select = $('select.regions');
  validRegions.forEach(function (region) {
    $select.append('<option value="' + region + '">' + region + '</option>');
  });

  $('button.login').click(function () {
    $('h2.error').remove();
    if (app.user) {
      return saveSummoner();
    }
    var email = $('input.email').val().trim().toLowerCase();
    if (!email || !app.validEmail(email)) {
      return showError('Email incorrecto');
    }
    app.proxy('POST', '/auth/email-login', {email: email}, loginSuccess, loginError);
  });
  
  var loginError = function (error) {
    console.log('Login error', error);
    showError('Error creando el usuario');
  };

  var loginSuccess = function (data) {
    app.user = data;
    $('input.email').addClass('hidden');
    $('div.summoner-container').removeClass('hidden');
    $('button.login').text('Empezar');
  };

  var saveSummoner = function () {
    var data = {
      name: $('input.summoner').val().trim().toLowerCase(),
      region: $('select').val()
    };
    if (!data.name || !data.region) {
      return showError('Introduce el nombre del summoner');
    }
    app.proxy('POST', '/riot/summoner/by-name', data, summonerSaved, errorSavingSummoner);
  };

  var errorSavingSummoner = function (error) {
    console.log('Error saving summoner', error);
    showError('Summoner no encontrado');
  };

  var showError = function (text) {
    $('#app-container').append('<h2 class="error">' + text + '</h2>');
  };

  var summonerSaved = function (summoner) {
    app.user.summoner = summoner;
    $('#app-container').html('');
    app.loadQuestionnaire();
  };

});