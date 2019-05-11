# fledgling-fitness
A fitness app for the recent ex-couch potato or those aspiring to be a recent ex-couch pototo. 

## The Task 
The task was to develop a multi-page web application using the MERN (MongodB, Express, React, Node) stack and which requires user authentication. A listing of the web technologies employed is provided in the **Tech Employed** section below.

## Site Overview 
<div align="center">
    <img src="/client/public/images/SearchTop.png" width="400px" /></img> 
    <img src="/client/public/images/BookCard.png" width="400px" /></img>
    <img src="/client/public/images/SavedPage.png" width="400px" /></img> 
</div>
<br>
The Fledgling Fitness landing page of this mult-page site presents the user an with a simple and intuitive user experience. Upon arriving, the client is welcomed to the site, provided a quick overview of the intent of the site via short sub-title and three bullet points. A large, green button label "GET STARTED" encourages the client to enter the site and begin their fitness journey. 


Upon clicking the "GET STARTED" button, the client is brought to the login page, with the option to register if they are not currently enrolled with Fledgling Fitness. Once registered, if need be, the user is brought back to the login page to enter their email and password to enter the site. If the client is new to the site, they are brought to the "Let's Get Started" page to enter some baseline fitness assessment information. This page also contains links on key words, easily identified by the green outlines around the term of interest. Each link opens a modal that displays some key points about each exercise as well as a brief video demonstrating proper form as well as other salient points regarding that specific exercise. Once the client enters their baseline information, clicking the large green "CREATE MY PLAN" button starts their fitness journey.

Clicking "CREATE MY PLAN" brings the client to the Fledgling Fitness workout selection page. Four exercises are included in the Fledgling Fitness program; walking for cardiovascular health as well as pushups, situps, and squats for body weight based strength exercises target multiple muscle groups. Exercises available for the client at a given stage in the program are indicated by green buttons, exercises not yet available are indicated by light grey backgrounds and the button are disabled until a given stage is reached. The Fledgling Fitness program gradually introduces a new exercise after a given number of the previous stage exercises have been recorded in the database. The order of exercise introduction is walking, then pushups, then situps, and finally squats. The workouts are paired such that walking and situps occur on the same day and pushups and squats occur on the same day. Exercise pair days are alternated on an everyother day basis with a rest day provided the final day of each exercise week.

Selection an available exercise on the workout page brings the client to the exercise page for that specific activity. Workout cards provided the user with information as to which day to perform the exercise as well as how long (walking) or how many sets and repetitions within each set (pushups, situps, squats). Each workout card also provides the client with three options for recording the workout session. The three options are: attempted, missed, and completed. These buttons are only available, indicated by green background color, on the workout card to be completed in the series. After that information has been recorded, these same options become available on the next workout card in the series.

Finally, clients can see their progress over time via the progress page available from a link in the navagation bar labeled "Progress". The progress page provides the client information regarding the date the activity was recorded, the duration or sets and repeitions that were targeted for that day, and whether the client attempted and completed the exercise for that day.


## Run App Through Heroku
Try the [App](https://fledgling-fitness.herokuapp.com/).
 
  
## Tech Employed
* Node.js - (see below) - backend networking
* Assert - https://www.npmjs.com/package/assert - unit tests
* Axios - https://www.npmjs.com/package/axios - promise based http client 
* bcryptjs - https://www.npmjs.com/package/bcryptjs - password salting and hashing 
* Concurrently - https://www.npmjs.com/package/concurrently - run multiple concurrent commands
* ESLint - https://eslint.org/ - code quality pattern identification
* Express - https://expressjs.com/ - web application framework for node.js
* If-env - https://www.npmjs.com/package/if-env - run development mode with one command
* Is-empty - https://www.npmjs.com/package/is-empty - assess whether a given parameter or function has no value
* JavaScript - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Resources - programming language of MERN stack
* jsonwebtoken - https://www.npmjs.com/package/jsonwebtoken - encoded JSON objects for party to party access claims
* JSX - https://reactjs.org/docs/introducing-jsx.html - JavaScript based programming type for React
* mLab MongoDB - https://mlab.com/ - mongodb database hosting  
* Mocha -  - https://www.npmjs.com/package/mocha - node and browser test framework
* MongoDB - https://www.mongodb.com/ - NoSQL database
* Moment npm - https://www.npmjs.com/package/moment - parse, validate, manipulate and format dates and times
* Mongoose - https://www.npmjs.com/package/mongoose - mongodb schema based modeling and interaction
* Morgan - https://www.npmjs.com/package/morgan - request logger for node
* Nodemon - https://www.npmjs.com/package/nodemon - automatically restarts node server after file changes
* Passport - https://www.npmjs.com/package/passport - request authentication
* Passport-jwt -https://www.npmjs.com/package/passport-jwt - JSON web token based authentication for node 
* React - https://reactjs.org/ - front end framework
* React-materialize - https://www.npmjs.com/package/react-materialize - material design components for react
* React-redux - https://react-redux.js.org/ - react based redux for containing state in javascript applications
* Validator - https://www.npmjs.com/package/validator - string sanitation and validization

## Prerequisites
* Node.js - The latest version of Node is available at: https://nodejs.org/en/

## Built With
VS Code - Text Editor

## Authored and Maintained By:
* Dennis Ries

Contact: dtries@gmail.com

© 2019 GitHub, Inc.
Terms   
Privacy
Security
Status
