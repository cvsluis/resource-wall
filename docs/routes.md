Users
Read    GET   /users/:id          // View user profile page and user's saved and liked pins
Read    GET   /users/:id/edit     // View user edit profile page
Edit    POST  /users/:id/edit     // Edit user profile 

Login
Read    GET   /users/login/:id    // Login user     

Pins
Browse  GET   /pins               // View all pins in database
Read    GET   /pins/:id           // View one pin
Add     POST  /pins               // Add pin

Comments
Browse  GET   /comments           // View all comments
Add     POST  /comments           // Add comment

Ratings
Browse  GET   /ratings            // View all ratings
Edit    POST  /ratings/:id        // Update rating (maybe stretch?)
Add     POST  /ratings            // Add rating

Likes
Browse  GET   /ratings/           // View all likes
Add     POST  /ratings            // Add like
Delete  POST  /ratings/:id/delete // Remove like
