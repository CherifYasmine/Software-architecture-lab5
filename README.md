# Hybrid software architecture

## Idea
The mean goal of this project is to build a backend solution of an online shopping web application that revolves around the following main usecases:

- A customer can view products.
- A customer can make purchases.
- A customer can view and update his/her shopping cart.
- A warehouse manager can manage inventory by viewing the list of products, adding new ones or removing existing ones.
- In case a product is out of stock, a customer can subscribe to that product and once it is back in stock, he/she is notified through an email.

## Technologies
<img align="left" width="200" height="100" src="https://res.cloudinary.com/practicaldev/image/fetch/s--m_Ng9MLF--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/fppjegg7q1kb2pdzmlvf.png">

<img align="left" width="100" height="100" src="https://user-images.githubusercontent.com/62222721/171054797-193dd2c8-169c-4f61-87b4-745da8f11e45.png">

<img width="200" height="100" src="https://user-images.githubusercontent.com/62222721/171054997-52494451-b22e-462a-a646-e2dbe227b4a7.png">

## Architecture
![architecture](https://user-images.githubusercontent.com/62222721/171055164-36874248-6a0f-4705-8359-7cebffe694ae.png)

**Client**
- The Client can add or delete from the user table and then it will send a notification to the Subscription microservice.
- If a notification is sent from the admin to add a new product, the client updates its table.

**Subscription**
- If the admin adds or deletes a product, a notification is sent to Subscription and it will update its table
- If the client adds or deletes a a user, a notification is sent to Subscription and it will update its table
- If the client buys a product, a notification is sent to Subscription and it will update its table (quantity--)

**Admin**
- If the admin adds a product, it will notify subscription microservice
- If the admin is notified by the subscription, it will update the product table (quality--)
