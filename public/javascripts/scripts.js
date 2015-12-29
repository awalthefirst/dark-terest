$(document).ready(function () {

  $('.showpin').click(function () {
    
    /*$.ajax({
      method: 'POST',
      url: "/api/addpin",
      data: {
        name: 'new',
        src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRgmI6AYPVUgKihGRi5G_LDamHONdy1Mc2b2xjWJAf_njnbtSRG"
      }
    });*/

   
  
  });


  $(document).on("load", function () {
    var $grid = $('.container').imagesLoaded(function () {
      // init Masonry after all images have loaded
      $grid.masonry({
        columnWidth: 200,
        itemSelector: '.grid',
        gutter: 20,
      });
    });

  });

});

