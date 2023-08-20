Users
Read    GET   /users/:id             // View user profile page and user's saved and liked pins
Read    GET   /users/:id/edit        // View user edit profile page
Edit    POST  /users/:id/edit        // Edit user profile 

Login
Read    GET   /login/:id             // Login user     

Pins
Browse  GET   /pins                  // View all pins in database
Read	  GET	  /pins/new		           // View add one pin
Read    GET   /pins/:id              // View one pin
Add     POST  /pins                  // Add pin

Add     POST  /pins/comments         // Add comment

Edit    POST  /pins/ratings/:id      // Update rating (maybe stretch?)
Add     POST  /pins/ratings          // Add rating

Add     POST  /pins/likes            // Add like
Delete  POST  /pins/likes/:id/delete // Remove like
