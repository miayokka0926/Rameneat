f eafea**The University of Melbourne**

# INFO30005 – Web Information Technologies

# Group Project Repository

Welcome!

We have added to this repository a `README.md`, `.gitignore`, and `.gitattributes`.

- **README.md**: is the document you are currently reading. It should be replaced with information about your project, and instructions on how to use your code in someone else's local computer.

- **.gitignore**: lets you filter out files that should not be added to git. For example, Windows 10 and Mac OS create hidden system files (e.g., .DS_Store) that are local to your computer and should not be part of the repository. This files should be filtered by the `.gitignore` file. This initial `.gitignore` has been created to filter local files when using MacOS and Node. Depending on your project make sure you update the `.gitignore` file. More information about this can be found in this [link](https://www.atlassian.com/git/tutorials/saving-changes/gitignore).

- **.gitattributes**: configures the line ending of files, to ensure consistency across development environments. More information can be found in this [link](https://git-scm.com/docs/gitattributes).

Remember that _"this document"_ can use `different formats` to **highlight** important information. This is just an example of different formating tools available for you. For help with the format you can find a guide [here](https://docs.github.com/en/github/writing-on-github).

## Table of contents

- [Team Members](#team-members)
- [General Info](#general-info)
- [Technologies](#technologies)
- [Code Implementation](#code-implementation)
- [Adding Images](#adding-images)

## Team Members

| Name         |               Task               |                  State |
| :----------- | :------------------------------: | ---------------------: |
| Haoyue Wang  |            UI Mockup             |                   Done |
| Huage Sun    |            App Mockup            |                   Done |
| Yuxin Ma     | Front End & Back End One feature |                Testing |
| Zhirong Piao |          README Format           | Deliverable 2 Finished |

## General info

This is project is to build a web app which server for vending car's owner and customer. By developing the fron end for displaying and back end for storing the vendor's and customer's and snacks' information, we could easily extract and accept the request made by customer and owner (for example, for customer to order snacks from the provided menu list and for owner to receive the customer's order's information to prepare the meal). All the images are found in unsplash.com by copying the image url address and store for each snacks. All information of snacks are pre-set and store in mongoDB collection "snacks". Similarlly, the vnedor's information are pre-set and store in mongoDB as all the van owner are pre-listed by the developer in this project's requirement.

# This is the brief explaination of Deliverable 2

This deliverable is for creating the brief mockup of the server side for both customer and owners by allowing them to get or post the data to the database (in here we use MongoDB). No front end design is included in this deliverable but only the raw json data would be presented in the live server (similarly if you sent the request method in Postman, it should onlyh retrun the json data for a clearer visualisation).

The coding part is presented in the main branch with commit id: 98b030d (Please notice that the newest commit only change the readme.md file, no code is changed)

The testing route request methods are all included in the Postman exported json file, which includes Get methods for features 1, 2, 5 and Post method for features 3, 4, 6. By simply operating the request method in this json file, you could reach the data (or posh to update) from (or to) mongoDB's targeted collections (These exported json file are all stored in the github main branch folder "PostmanRequest")

Explnation of four postman json file.
(1) customer.postman_collection.json file contain an "POST" method for allowing customers to register in this app.
(2) order.postman_collection.json file contain "POST" methods for create a order (feature 3 start order) and updata and order (feature 6 change to fulfill) in this app. A "GET" method is apply for allowing each vendor to access to their own outstanding orderlist.
(3) snack.postman_collection.json file contain "POST" method for create a new snack (not needed in this deliverable). Contains "GET" method for requesting the menu snack list and "GET" method for requesting a single snack's detail data.
(4) vendor.postman_collection.json file contain two "POST" methods for create a new vendor (not needed in this deliverable) and method to updata vendor status (that is updating the information of location and operrating status (we use "parked" = true or false for representing whether the vendor is open or closed)).

Four collections are pre-set in mongoDB with "customers", "orders", "snacks", "vendors" (for the purpose of testing, we pre-set some data in customers as register and login are currently not needed in this deliverable 2). To access the data throught Mongo Compass, please copy the following link and set new connection to the database (You can check the changes in database along with the process of checking the route with the Postman json file).

In heroku, you can simply type the link with the route presented in the Postman json file after the main route to see how the features have been fulfilled in live page.

## Technologies

Project is created with:

- NodeJs 14.16.X
- Ipsum version: 2.33
- Ament library version: 999
- MongoDB & Mongoose

## Code Implementation

You can include a code snippet here.

```HTML
<!--
Example code from: https://www.w3schools.com/jsref/met_win_alert.asp
__>

<!DOCTYPE html>
<html>
<body>

<p>Click the button to display an alert box.</p>

<button onclick="myFunction()">Try it</button>

<script>
function myFunction() {
  alert("Hello! I am an alert box!");
}
</script>

</body>
</html>
```

## Adding Images (All images are stored in mongoDB as String Url style, all image src are from unsplash.com)

You can use images/gif hosted online:

<p align="center">
  <img src="https://github.com/Martin-Reinoso/sandpit-Profile/raw/main/Images_Readme/01.gif"  width="300" >
</p>

Or you can add your own images from a folder in your repo with the following code. The example has a folder `Gifs` with an image file `Q1-1.gif`:

```HTML
<p align="center">
  <img src="Gifs/Q1-1.gif"  width="300" >
</p>
```

**Now Get ready to complete all the tasks:**

- [x] Read the Project handouts carefully
- [x] User Interface (UI)mockup
- [x] App server mockup
- [ ] Front-end + back-end (one feature)
- [ ] Complete system + source code
- [ ] Report on your work(+ test1 feature)
