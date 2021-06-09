1. git clone 

## To run the client 
---
1. cd client/ && npm install .
2. npm run serve
3. If chrome browser , disable the following from chrome://flags
   1. SameSite by default cookies
   2. Cookies without SameSite must be secure
4. open http://localhost:8080


## To run the seever
---
1. cd express-server/ && npm install .
2. mysql -u [username] -p [password]
3. CREATE DATABASE 'myfamily'
4. copy .env.sample to .env in the root folder
5. set your config values in the .env file 
6. set clientURI=http://localhost:8080 in .env file to avoid cors
7. npm run db:migrate 
8. npm start 

