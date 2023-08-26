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

Linkfolio.hoverStars = function() {
  const stars = $('label i');
  let clickedStar = null;

  stars.mouseenter(function() {
    if (!clickedStar) {
      const hoveredStar = $(this);
      const hoveredIndex = stars.index(hoveredStar);

      // Swap the style for the hovered star and its preceding siblings to fa-solid
      for (let i = 0; i <= hoveredIndex; i++) {
        stars.eq(i).removeClass('fa-regular').addClass('fa-solid');
      }

      // Revert the style for the stars after the hovered star to fa-regular
      for (let i = hoveredIndex + 1; i < stars.length; i++) {
        stars.eq(i).removeClass('fa-solid').addClass('fa-regular');
      }
    }
  });

  stars.mouseleave(function() {
    if (!clickedStar) {
      const hoveredStar = $(this);
      const hoveredIndex = stars.index(hoveredStar);

      // Revert the style for the hovered star and its following siblings to fa-regular
      for (let i = hoveredIndex; i < stars.length; i++) {
        stars.eq(i).removeClass('fa-solid').addClass('fa-regular');
      }
    }
  });

  stars.click(function() {
    clickedStar = $(this);
    const clickedIndex = stars.index(clickedStar);

    // Set the style for the clicked star and its preceding siblings to fa-solid
    for (let i = 0; i <= clickedIndex; i++) {
      stars.eq(i).removeClass('fa-regular').addClass('fa-solid');
    }

    // Revert the style for the stars after the clicked star to fa-regular
    for (let i = clickedIndex + 1; i < stars.length; i++) {
      stars.eq(i).removeClass('fa-solid').addClass('fa-regular');
    }
  });
};

Linkfolio.adjustRating = function() {
  const starOne = $('#icon-1');
  const starTwo = $('#icon-2');
  const starThree = $('#icon-3');
  const starFour = $('#icon-4');
  const starFive = $('#icon-5');

  // url: /api/pins/:id/ratings

  $('#star-1').on('click', function() {
    // Check if the star is currently in the filled state by seeing if it has the 'fa-solid' class
    const isFilled = $(this).hasClass('fa-solid');

    // console.log($(this).next('label').children('i')[0]);
    // console.log(starOne);

    // Retrieve the pin ID from the element's data attribute
    const pinId = $(this).data('pin-id');

    // const starOne = $(this).next('label').children('i');

    // Execute AJAX request to the server
    $.ajax({
      method: 'POST',
      url: `/api/pins/${pinId}/ratings`,
      data: {
        pin_id: pinId,
        owner_id: 1,
        value: 1
      },
      success: (response) => {
        // If the star was originally in a filled state, it's now empty. Update its visual state.
        if (!isFilled) {
          starOne.removeClass('fa-regular').addClass('fa-solid');
        }
      },
      // Log any errors that occur during the AJAX request
      error: (error) => {
        console.log('Error while toggling rating: ', error);
      }
    });
  });

  $('#star-2').on('click', function() {
    const isFilled = $(this).hasClass('fa-solid');
    const pinId = $(this).data('pin-id');

    $.ajax({
      method: 'POST',
      url: `/api/pins/${pinId}/ratings`,
      data: {
        pin_id: pinId,
        owner_id: 1,
        value: 2
      },
      success: (response) => {
        if (!isFilled) {
          starTwo.removeClass('fa-regular').addClass('fa-solid');
          starOne.removeClass('fa-regular').addClass('fa-solid');
        }
      },
      error: (error) => {
        console.log('Error while toggling rating: ', error);
      }
    });
  });

  $('#star-3').on('click', function() {
    const isFilled = $(this).hasClass('fa-solid');
    const pinId = $(this).data('pin-id');

    $.ajax({
      method: 'POST',
      url: `/api/pins/${pinId}/ratings`,
      data: {
        pin_id: pinId,
        owner_id: 1,
        value: 3
      },
      success: (response) => {
        if (!isFilled) {
          starThree.removeClass('fa-regular').addClass('fa-solid');
          starTwo.removeClass('fa-regular').addClass('fa-solid');
          starOne.removeClass('fa-regular').addClass('fa-solid');
        }
      },
      error: (error) => {
        console.log('Error while toggling rating: ', error);
      }
    });
  });

  $('#star-4').on('click', function() {
    const isFilled = $(this).hasClass('fa-solid');
    const pinId = $(this).data('pin-id');

    $.ajax({
      method: 'POST',
      url: `/api/pins/${pinId}/ratings`,
      data: {
        pin_id: pinId,
        owner_id: 1,
        value: 4
      },
      success: (response) => {
        if (!isFilled) {
          starFour.removeClass('fa-regular').addClass('fa-solid');
          starThree.removeClass('fa-regular').addClass('fa-solid');
          starTwo.removeClass('fa-regular').addClass('fa-solid');
          starOne.removeClass('fa-regular').addClass('fa-solid');
        }
      },
      error: (error) => {
        console.log('Error while toggling rating: ', error);
      }
    });
  });

  $('#star-5').on('click', function() {
    const isFilled = $(this).hasClass('fa-solid');
    const pinId = $(this).data('pin-id');

    $.ajax({
      method: 'POST',
      url: `/api/pins/${pinId}/ratings`,
      data: {
        pin_id: pinId,
        owner_id: 1,
        value: 5
      },
      success: (response) => {
        if (!isFilled) {
          starFive.removeClass('fa-regular').addClass('fa-solid');
          starFour.removeClass('fa-regular').addClass('fa-solid');
          starThree.removeClass('fa-regular').addClass('fa-solid');
          starTwo.removeClass('fa-regular').addClass('fa-solid');
          starOne.removeClass('fa-regular').addClass('fa-solid');
        }
      },
      error: (error) => {
        console.log('Error while toggling rating: ', error);
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
  Linkfolio.hoverStars();
  Linkfolio.adjustRating();
  Linkfolio.searchCategory();
});
