Users
Read    GET   /users/:id                                // View user profile page and user's saved and liked pins
Read    GET   /users/:id/edit                           // View user edit profile page
Edit    POST  /users/:id/edit                           // Edit user profile 

Login
Read    GET   /login/:id                                // Login user     

Pins
Browse  GET   /pins/                                    // View all pins in database
Read	  GET	  /pins/new		                              // View add one pin
Read    GET   /pins/:id                                 // View one pin

Add     POST  /api/pins                                 // Add pin

Add     POST  /api/pins/:pinId/comments                 // Add comment

Add     POST  /api/pins/:pinId/ratings                  // Add rating

Add     POST  /api/pins/:pinId/likes                    // Add like
Delete  POST  /api/pins/:pinId/likes/delete             // Remove like
