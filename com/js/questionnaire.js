$(function () {

  var items = [];
  var answers = [];
  var position = 0;
  var clicked = false;

  var itemTemplate = '<div>\
    <h2>${question}</h2>\
    <a href="#" class="button vote" data-control="1">1</a>\
    <a href="#" class="button vote" data-control="2">2</a>\
    <a href="#" class="button vote" data-control="3">3</a>\
    <a href="#" class="button vote" data-control="4">4</a>\
    <a href="#" class="button vote" data-control="5">5</a>\
  </div>';

  var finishedTemplate = '<div>\
    <h2>Hemos terminado!</h2>\
    <h4>Te enviaremos los resultados por email, muchas gracias por participar.</h4>\
  </div>';

  app.loadQuestionnaire = function () {
    downloadQuestionnaire();
  };

  var clear = function () {
    $('#app-container').html('');
    clicked = false;
  };

  var downloadQuestionnaire = function () {
    console.log('ready');
    app.proxy('GET', '/user/questionnaire', {}, saveQuestionnaire, errorSavingQuestionnaire);
  };

  var saveQuestionnaire = function (data) {
    items = data.items;
    answers = data.answers;
    position = data.position;
    //$('div.arrows').removeClass('hidden');
    printItem();
  };

  var errorSavingQuestionnaire = function (err) {
    console.log('Error:', err);
  };

  var printItem = function () {
    clear();
    var item = items[position];
    if (!item) {
      return finished();
    }
    $.tmpl(itemTemplate, {question: item.title.es}).appendTo('#app-container');
  };

  $(document).on('click', 'a.button.vote', function (event) {
    if (clicked) { 
      return; 
    }
    clicked = true;
    $(event.currentTarget).addClass('active');
    var value = parseInt($(event.currentTarget).data('control'));
    sendAnswer(value);
  });

  var sendAnswer = function (value) {
    var data = {
      value: value,
      item: items[position]._id
    };
    app.proxy('POST', '/user/answer', data, answerCreated, errorCreatingAnswer);
  };

  var answerCreated = function (answer) {
    answers.push(answer);
    if (position <= 100) {
      return finished();
    }
    setTimeout(function () {
      position += 1;
      printItem();
    }, 1200);
  };

  var errorCreatingAnswer = function (err) {
    console.log('Error creating answer:', err);
  };

  var finished = function () {
    clear();
    $.tmpl(finishedTemplate, {}).appendTo('#app-container');
    $('#app-container').css('background', '#79cae5');
  };

});