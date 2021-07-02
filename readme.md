

### Prerequisites

1. node server(LTS) - check https://nodejs.org/en/ 
2. vue cli - npm install -g @vue/cli to run debug scripts
3. mysql or mariadb server
4. knex- npm install -g knex to run debug scripts
5. git clone https://github.com/mxreni/family.git

### To run the client 

1. cd client/ && npm install .
2. npm run serve
3. open http://localhost:8080


### To run the server

1. cd express-server/ && npm install .
2. check systemctl status mysqld.service is active
3. mysql -u [username] -p [password]
4. CREATE DATABASE 'myfamily'
5. copy .env.sample to .env in the root folder
6. set your config values in the .env file 
7. set clientURI=http://localhost:8080 in .env file to avoid cors
8. npm run db:migrate 
9. (optional) npm run db:data (to load and test with sample data)
10. npm start 

