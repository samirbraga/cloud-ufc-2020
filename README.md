# Instagram-like application using Amazon AWS
## Description
A web application similar to Instagram that uses some of the services provided by Amazon AWS, such as Amazon EC2, Amazon S3, Amazon RDS, Amazon DynamoDB, Amazon DocumentDB, LoadBalancing and AutoScaling.

This project is being developed as part of 2020's "_Desenvolvimento de Software para Nuvem_ (Software Development in the Cloud)" class @ _Universidade Federal do Ceará_. 

The project has two parts. The first one is the development of the application in itself. The second one is the addition of LoadBalacing and AutoScaling to the application.

## Functional Requirements
The user must be able to:

+ **create** an account
+ **update** his account's password, fullname, and personal photo
+ **post** photos
+ **like/dislike** other user's photos.
+ **view** other user's profile and photos 
+ **search** another user by their account's nickname
+ **list** photos posted in a given time interval (the user must enter an initial date and a final date to use the filter)

## Technical restrictions and Development Environment

+ User information must be recorded in a **AmazonRDS database**
+ Users's photos must be stored in **Amazon S3**.
+ Photos' likes and dislikes must be stored in **Amazon DynamoDB** _or_ **Amazon DocumentDB**
+ We must use Amazon AWS's REST API to have access to its services
+ The web application must be hosted in an **Amazon EC2's** virtual machine.
+ We must use **LoadBalancer** and **Auto Scaling** to create additional instances in case a instance's average cpu-use exceeds 70% for more than a minute.  Otherwise, if the average cpu-use of the current used instances is below 10% for more than a minute, one instance must be terminated. The maximum number of instances is 3.

Futhermore, to develop the application, we are using the following development environment:

+ Node.js + Express.js
+ ReactJS 
+ Amazon AWS' SDK for Node.js


## Team

+ Hariamy Vasconcelos ( _Front end_ )
+ Jarélio Gomes ( _Back end_ )
+ Samir Braga ( _Front and back end_ )
+ Thiago Fraxe ( _Back end_ )