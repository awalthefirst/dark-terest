$(document).ready(function () {

  $('.showpin').click(function () {
    $(".url, .imagename").val('');
    $(".overlay, .modals").show();
  });


  $('.glyphicon-remove-circle').click(function () {
    $(".overlay, .modals ").hide();
    $(".url, .imagename").val('');
  });


  $('.preload').click(function (e) {
    e.preventDefault()
    var url = $(".url").val();

    $('.innerimage').attr('src', url);

  });

  $('.delete').click(function () {
    var me = this
    var name = $(me).attr('id').trim()

    var url = $(me).parent().siblings('img').attr('src')
    $.ajax({
      method: 'DELETE',
      url: "/api/rmpin",
      data: {
        name: name,
        src: url
      },
      success: function () {
        $(me).parent().parent().hide();
        $('.cont').masonry()
      }
    });

  });

  $('.addpin').click(function (e) {
    e.preventDefault();
    var name = $(".imagename").val();
    var url = $(".url").val();

    $.ajax({
      method: 'POST',
      url: "/api/addpin",
      data: {
        name: name,
        src: url
      },
      success: function () {
        window.location.reload()
      }
    });

  });

  $('.cont').masonry({
    itemSelector: '.grid'
  }).imagesLoaded(function () {
    $('.cont').masonry();
  });

});
