# Event Manager
The centralized event management system enables platform users to post different kinds of events and also enable interested attendees to register online for these events.

## technologies
In this MERN stack application the **frontend** is developed in HTML5, CSS3 and React.js with Material UI, while **backend** is created in Express and Node.js. 
**Data** is stored in MongoDB Atlas and users can access only their data but no others. The connection between users is established with **Socket.IO** library.

## description and features
- The system allows all users to create their own events, request registration on the events, so that they can attend chosen events. Users are also able to receive notifications right after other app users sends a registration request, which they can accept or reject. Users can keep track on received registration requests with registration requests list. Event creators can also delete events they have posted.
- Dashboard page with the listing of all events and an option to filter the events
- Registration page
- Login Page


## starting and using the application

#### backend

In terminal type command `cd server` and add your own **.env** file with following variables: **PORT** use 5000,  **MONGO_URI** use "mongodb+srv://**username**:**password**@pizzaordercomposer.n9nav.mongodb.net/**project_number**?retryWrites=true&w=majority" and **JWT_SECRET** . After that run `npm install` to install all the dependencies. After completing these steps run `npm start` script. 

That runs the server part of application in the development mode on http://localhost:5000.

#### frontend

After cloning repository and opening it in terminal type command `cd client` and run `npm install` script to install all the dependencies. After successfull instalataion run `npm start`. 

That runs the frontend part of application in the development mode.

Open http://localhost:3000 to view it in the browser. Register new user and login with those credentials. At the same time, in another tab navigate to **localhost:3000** again and register one more user and use credentials to login. You will now be able to test and use all features mentioned in [description and features](#description-and-features)

