# Inventory App
![incoming gif]()
## Links
- [Link to the Assignment](https://www.theodinproject.com/lessons/nodejs-inventory-application)

## About
### ReactJS, Express, NodeJS, MongoDB
<hr>
The core of this assignment is to create an mini inventory app where the user can create, read, update, and delete data.

### Design
I wanted to create an inventory system based off of items you would see in a video game.
The Player can discover new items that will be randomly generated. Once found they can add it to the bag where they can keep track
of all their items. Then the user would be able to update the items name, quality, description, image, stats, and special text.

### Code
<hr>

The user experience starts with the app fetching the list of items from the api and saving it to a state where it is then 
displayed in the bag component. The User can either click on the discover tab to search for a new item or click on an item and then 
access the forge to update it. 

The api includes the CRUD functions such as getting the item list and individual item detail, creating, updating, and deleting an item.


#### Discover.js
The item is created from a handleClick function. The item will roll it stats using the helper function where it will randomly pick a few stat names
and assigned them different values. It will then determine the quality of the item based off the rolled stats and give the item a special attribute
if it manages to roll an Epic or Legendary quality. These stats are then assigned to an object and set into a state. The item is displayed for the user to decide if they would like to discover a new item or keep it. If the user keeps the item, the handleSubmit function will post to the api to update the database with the new item.

#### Forge.js
Here the selected item's data will be converted to a form where the user can edit the Name, Image, Description, and Special. The user can 
delete the item which will send an axios post to delete the item based off the item's ID. The other option is to edit the text that will update the states
for the corresponding field. Then the handleSubmit function will create a new FormData() and append all the updated text as well as an uploaded image. The 
FormData will then post to the api using the item's ID to update the database.

#### Multer
The API uses multer,a middleware for handling uploading files. The user can upload images for the items they find. 

## Note about Deployment

Due to recent changes at heroku and limited space on railway, unable to show off project. I will figure out a different way to deploy the project.
For now, if you would like to view the project, you can clone and run 'npm start' at the root of the project and you will be able to view the project
at http://localhost:3000/.
