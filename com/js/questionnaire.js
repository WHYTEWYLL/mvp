$(function () {

  var template = '<div>\
    <h2>${question}</h2>\
    <a href="#" class="button" data-control="1">1</a>\
    <a href="#" class="button" data-control="2">2</a>\
    <a href="#" class="button" data-control="3">3</a>\
    <a href="#" class="button" data-control="4">4</a>\
    <a href="#" class="button" data-control="5">5</a>\
  </div>';

  app.loadQuestionnaire = function () {
    downloadQuestionnaire();
  };

  //$.tmpl(template, {question : 'John Doe' }).appendTo('#app-container');

});