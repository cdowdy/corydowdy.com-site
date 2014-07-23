/**
 * Created by Cory on 7/21/2014.
 */

$(document).foundation();

$(document).ready(function() {
  $('.image-popup-vertical-fit').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });
});

$(function(){FastClick.attach(document.body);});$(function(){$("img.lazy").jail()});

$(window).bind("load", function () {
  var footer = $("#sticky-footer");
  var pos = footer.position();
  var height = $(window).height();
  height = height - pos.top;
  height = height - footer.height();
  if (height > 0) {
    footer.css({
      'margin-top': height + 'px'
    });
  }
});
