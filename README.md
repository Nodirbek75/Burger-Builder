# Burger Builder
> Burger Builder App built with React.js with Firebase for database and passport.js for authentication...

## Quick Start
* First you should enable css modules in webpack.config.js 
* Create database in firebase and put the url to axios-orders.js file in src folder
* Use your sign in and sign up url with your key generated by firebase in auth.js file in store folder
* Create ingredients object in database as mentioned below and put the url to burgerBuilder.js file in store folder to fetch ingredients. 
        
        ingredinets{
            bacon:0,
            salad:0,
            meat:0,
            cheese:0
        }
* Install dependencies:
            
        npm install
  
* Run the app:
    
        npm start
