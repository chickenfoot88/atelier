const css = require('./../sass/app.sass');
import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/modal';
require.context('../images/material/', true);
require('./unitegallery');
import '../sass/unite-gallery.css';
import '../sass/ug-theme-default.css';
require("font-awesome-webpack");
import {models} from './models';
import './mail.js';

$(function(){


  $('#model-modal').on('show.bs.modal', function (event) {

    var button = $(event.relatedTarget);

    var modelName = button.data('details');

    var modal = $(this);

    var model = models[modelName];

    modal.find('.modal-title').text(model.name);

    var modelImg = '<img src="' + './images/model_' + model.name + '.jpg" alt="' + model.name + '" class="modal-model-image">';

    $('.model-image').html(modelImg);

    var details = '<p class="model-parts">' + model.parts + '</p><p>' + model.material + '</p><p>' + model.color + '</p><p>' + model.price +'</p>';

    $('.model-details').html(details);

    var materialImg= '<img src="' + './images/material_' + model.color + '.jpg" alt="material_' + model.color + '" class="modal-mateial-image">';

    $('.material-image').html(materialImg);

  });

  $("#gallery").unitegallery({
    tiles_min_columns: 1,
    tile_enable_textpanel: false
  });

  $(window).scroll(function() {
    if($(this).scrollTop() > 300) {
      $('.scroll-top-btn').fadeIn();
    } else {
      $('.scroll-top-btn').fadeOut();
    }
  });

  $('.scroll-top-btn').click(function() {
    $('body,html').animate({scrollTop:0},800);
  });

  $(window).on('load', function(){
    $('.preloader').delay(600).fadeOut('slow');
  });

  $('.button-buy').click(function(){
    $(".modal").one('hidden.bs.modal', function(){
    });
  });

  $('#contacts-modal').on('shown.bs.modal', function(){
    $('body').addClass('body-hidden');
  });

  $('#contacts-modal').on("hidden.bs.modal", function () {
    $('body').removeClass('body-hidden');
  })

});
