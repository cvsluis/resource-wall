const Linkfolio = {};

Linkfolio.toggleLike = function() {
  // Attach a click event handler to elements with the 'fa-heart' class
  $('.fa-heart').on('click', function() {

    // Check if the heart is currently in the "liked" state by seeing if it has the 'fa-solid' class
    const isLiked = $(this).hasClass('fa-solid');

    // Retrieve the pin ID from the element's data attribute
    const pinId = $(this).data('pin-id');
    console.log("Pin ID:", pinId);

    let apiUrl;
    const heartElement = $(this);

    // Determine the API URL and request method based on whether the item is currently liked
    if (isLiked) {
      // Set URL for delete like if it's already liked
      apiUrl = `/api/pins/${pinId}/likes/delete`;
      methodType = 'DELETE';
    } else {
      // Set URL for add like if it's not liked yet
      apiUrl = `/api/pins/${pinId}/likes`;
      methodType = 'POST';
    }

    // Execute AJAX request to the server
    $.ajax({
      url: apiUrl,
      type: methodType,
      success: (response) => {
        // If the heart was originally in a liked state, it's now "unliked". Update its visual state.
        if (isLiked) {
          console.log('Successfully unliked.');
          heartElement.removeClass('fa-solid').addClass('fa-regular');
        }
        // If the heart was not in a liked state, it's now "liked". Update its visual state.
        else {
          console.log('Successfully liked.');
          heartElement.removeClass('fa-regular').addClass('fa-solid');
        }
      },
      // Log any errors that occur during the AJAX request
      error: (error) => {
        console.log('Error while toggling like:', error);
      }
    });

  });

};

Linkfolio.searchCategory = function() {
  // event handler on search bar to show categories
  $('.search-bar').on('click', function(event) {
    // prevent propagating to body to call event handler below
    event.stopPropagation();
    // show categories drop down
    $('#search-dropdown').show();
  });

  // click anywhere on screen to hide the category drop down
  $('body').on('click', function() {
    if ($('#search-dropdown:visible')) {
      $('#search-dropdown').hide();
    }
  });

  // click on category and redirect to search all pins with category as query
  $('.category-button').on('click', function() {
    const category = $(this).data('category');
    window.location = `/pins/?q=${category}`;
  });
};

$(document).ready(function() {
  Linkfolio.toggleLike();
  Linkfolio.searchCategory();
});
