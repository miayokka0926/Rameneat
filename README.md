**The University of Melbourne**

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
| Huage Sun    |        Register, vendor orders   |                   Done |
| Yuxin Ma     |  Customer orders, customer menus |                   Done |
| Zhirong Piao |  testing, debug, report          | Deliverable 4 Finished |

## General info

This is project is to build a web app which server for vending car's owner and customer. By developing the fron end for displaying and back end for storing the vendor's and customer's and snacks' information, we could easily extract and accept the request made by customer and owner (for example, for customer to order snacks from the provided menu list and for owner to receive the customer's order's information to prepare the meal). All the images are found in unsplash.com by copying the image url address and store for each snacks. All information of snacks are pre-set and store in mongoDB collection "snacks". Similarlly, the vnedor's information are pre-set and store in mongoDB as all the van owner are pre-listed by the developer in this project's requirement.

## This is a brief explaination os deliverable 4
The first page ask you to choose your identity.


### Customer side
- If you are a customer but do not want to log in:

click 'Customer', then 'Proceed without login', you will be able to see vendors near you and their menus, but you are not able to submit order. There is a 'login' button on the top right of the page, that will direct you to login page at anytime.


- If your are a non-registered customer but want to log in:

Click 'New user?', submit your information into the form and log in with the new information.


- If you are a registered customer and want to log in:

Click 'Customer', then fillin your email and password, and log in.


#### Then, in ../customer:
you are able to: 
1. Find the five nearest vendors on the map, or acquire their name  by clicking the drop-downs.
2. Click on any vendor to view the menu and submit an order.
3. Change profile by clicking on 'My profile' --> ../profile.
4. View your order details. Edit your order within 10 mins. Rate and comment your order after pick up. 
5. For any order that takes more than 15 mins to be marked fulfilled, 20% discount badge will be automatically added to vendor and customer's order list.


#### Then, in ../profile:
you are able to:
1. View your first name, last name and email
2. Click 'change information' to change your first name, last name and password. 
    The new information will be updated into the database and the UI display will be updated in the next login
3. Click 'back' to go back to ../customer page



### Vendor side
- If your are a vendor and do not want to login:

click 'Vendor', then 'Proceed without login', you will be able to see where you are and login at any time.


- If you are a registered vendor and want to log in:

Click 'Vendor', then fillin your name and password, and log in.


#### Then, in ../vendor:
you will be able to: 
1. drag the pin to choose a location.
2. click on that pin to confirm and fill in your address, this must be a valid string. Then by clicking submit, you will be directed to ../orders page. 


#### Then, in ../orders:
you will be able to:
1. see full order list or list filtered by order status (outstanding, fulfilled and completed) in time order.
2. mark outstanding order -> fulfilled, fulfilled -> completed, by clicking on that tick button. Customer will be able to see that.
3. For any order that takes more than 15 mins to be marked fulfilled, 20% discount badge will be automatically added to vendor and customer's order list.


## Other information you may find useful:
Our localhost address: http://localhost:5500/. 

Live server on Heroku: https://rameneat.herokuapp.com/.

To run our code, type 'npm run dev' in the terminal.

To run test, type 'npm run test' in the terminal.

If the code cannot run properly on ios system, try to alter line 25: "start": "SET PORT=5500 && react-scripts start" inside front/package.json into "start": "PORT=5500 react-scripts start",

To access the data throught Mongo Compass, please copy the following link and set new connection to the database (You can check the changes in database along with the process of checking the route with the Postman json file).

Link: mongodb+srv://ChiZhang:Relax1017@snack.7ro1t.mongodb.net/test?authSource=admin&replicaSet=atlas-jndjgo-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true

#### dummy log in detail:
Customer:

email: alice@123.com;
password: 123;

email: bobb@abc.com;
password: abc;

Vendor:

name: big van;
password: 123;

name: biggg van;
password: 123;


## Deploy in Heroku
In heroku, you can simply type the link with the route presented in the Postman json file after the main route to see how the features have been fulfilled in live page.(you can add path after the main route to check the features' achievement)
Main Route Link: https://rameneat.herokuapp.com/

## Technologies

Project is created with:

- NodeJs 14.16.X
- Ipsum version: 2.33
- Ament library version: 999
- MongoDB & Mongoose
- React 17.0.2



## Task Status

- [x] Read the Project handouts carefully
- [x] User Interface (UI)mockup
- [x] App server mockup
- [x] Front-end + back-end (one feature)
- [x] Complete system + source code
- [x] Report on your work(+ test1 feature)
