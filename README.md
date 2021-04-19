# Resturant Diary

### About:
**Resturant Diary** is an app where users can create personal reviews of resturants based on overal experience, meals, price, and location. Users will have the ability to create their own account, add resturant locations to a google map using the google maps API, and potentially view other users reviews.

### Wireframe

![Imgur](https://i.imgur.com/FdjlM1z.png?1)

### User Stories:
* The user will see a login screen.  
* The use will be able to create an account.  
* The user will be able to login, if they have an account.   
* After logging in, the suer will be able to see a google map and cards of their reviewed restaurants.   
* The user will be able to enter a new zip code or city to view restaurants in that area.  
* The user will be able to add a new restaurant review card; they can do this based on map or not.  
* The user will be able to add the restuarant's name, address, personal rating, what they ordered, and any extra notes.  
* The user will be able to search their review cards.  
* The user will be able to edit and delete their review cards. 

### Stretch Goals:
* The user can click on a review to see it closer.
* The user will be able to add stars to the review.   
* The user will be able to add what the price they paid.  
* The user will be able to invite others to add to the review.  
* The user will be able to share their review.  
* The user will be able to see how other users rated a restuarant.  
* The user will be able to click on a restaurant on the map and see reviews they've made. 
* The user will be able to click on a review and see it on the map.  

### CRUD Routes:
* GET/Index for after login -> see map and list of reviews  
* POST/Update for adding the new account  
* POST creating new review 
* PUT for updating a review
* DELETE for deleting a review
* POST/GET for when the user logs out

### Models and Components:
**Models**
- Review: that includes name, address (map coorinates maybe?), rating, meal, money spent, notes
- User: username/email, password, reviews array (using mongo ID)

**Components**
- login
- each review
- map
- header/navbar
