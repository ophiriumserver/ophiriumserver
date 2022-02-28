npm install nodemon -g 
nodemon ./app.js localhost 8080

Install the Heroku CLI
Download and install the Heroku CLI.

If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

$ heroku login
Clone the repository
Use Git to clone reward-point-system's source code to your local machine.

$ heroku git:clone -a reward-point-system
$ cd reward-point-system
Deploy your changes
Make some changes to the code you just cloned and deploy them to Heroku using Git.

$ git add .
$ git commit -am "make it better"
$ git push heroku master


heroku git:remote -a projectsc19

Account 1: 
https://ophirium-test.herokuapp.com/web/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiLU1uZXZEbFh5WF9SYUR2ajl6dFMiLCJ3YWxsZXRfYWRkcmVzcyI6IjBmZmUyMTg5LWY3MWUtNTJmZC1hZDg0LTgzODM1NjliM2E2OCIsImlhdCI6MTYzNjAyODk2OCwiZXhwIjo0Nzg5NjI4OTY4fQ.jz_wuSRNZEOyJL9gDrFJmAYtG0A5rEajUqWyBsNISP8


Account 2: 
https://ophirium-test.herokuapp.com/web/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiLU1uZXpSMkVaTmJhaUFyajZWNmsiLCJ3YWxsZXRfYWRkcmVzcyI6ImVlMjBhMjAwLThiMjYtNWNmMi1hODFjLWNlZmZkZTFkNTE1ZSIsImlhdCI6MTYzNjAzMDA3MSwiZXhwIjo0Nzg5NjMwMDcxfQ.P0GAV8rkQHiFK2VLkU9m6iiBGaWE1EMXeB37i82343U