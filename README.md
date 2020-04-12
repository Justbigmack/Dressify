# Dressify

Welcome to Dressify. Dressify is a Full-Stack Web Application that allows you to run your own online store.

## Demo

You can visit https://dressify.andrewkaras.me for a working demo.

## Summary

Dressify is an ambitious project I started with a view of packing a lot of technologies in one web application. I used React, Next.js, Apollo and styled components for the front end. For the backend I decided to go with Node.js, Express, GraphQL and Prisma. Online Payments are implemented via Stripe API. Transactional emails are sent via Sendgrid API. Tests are written with Jest and Enzyme.

## Built With

- [React](https://reactjs.org) - A JavaScript library for building user interfaces
- [Apollo](https://www.apollographql.com) - A complete state management library for JavaScript apps
- [Next.JS](https://nextjs.org) - A JavaScript framework for server-side rendering and static web applications that use React
- [Node.js](https://nodejs.org) - An open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a web browse
- [Express](https://expressjs.com) - A framework for building web applications and APIs
- [GraphQL](https://graphql.org) - An open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data
- [Prisma](https://www.prisma.io) - An open-source database toolkit
- [Jest](https://jestjs.io/) - A JavaScript Testing Framework
- [Enzyme](https://enzymejs.github.io/enzyme/) - A JavaScript Testing utility
- [Styled Components](https://styled-components.com) - A way to use CSS in modern JavaScript
- [Stripe](https://stripe.com) - An online payment processor
- [Sendgrid](https://sendgrid.com) - A platform for transactional and marketing email

## How to use

Once you land on the home page, you will see the selection of items we have in store. However, in order to buy any of them, you will need to sign up / log in. To navigate your way through the items, use the pagination at the bottom of the page.

In order to purchase an item, use a test credit card number (4242 4242 4242 4242) and any expiration date in the future. You will not be charged real money.

You can search for an item using the search bar. Just type in what you are looking for and it will display the match for it, if an item name or description contains that query.

You can sell items by clicking the "sell" link in the nav bar, uploading the images you have of it, filling out the details of this item and then submitting the form. This will place that item among the rest of them.

You can check your orders by going to /orders or clicking the "Orders" link in the nav bar.

Different users have different permissions. Standard user that signs up will have standard permissions, but if needed, they can be bumped to an admin, which will allow them to also edit / delete items (respective buttons will appear for every item) and manage other users' permissions by going to /permissions.

## Running it on your local machine

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

You will need to have a Prisma, Sendgrid and Stripe accounts to complete the setup. You will need a Sengrid API key to send out password reset emails, Stripe secret API key to process payments and a Prisma account to deploy the backend to Prisma.

To get an API key for Sendgrid or Stripe, you will need to sign up for the service and obtain it in your account.

### Running the app

First, you need to clone this repo. Then you will need to run the following command in both the frontend folder, and the backend folder:

```
npm -i
```

This will install the necessary dependencies. After that you need to navigate to the backend folder and create a variables.env file.

In there you will need to enter the following data:

```
FRONTEND_URL="http://localhost:8000"
PRISMA_ENDPOINT="REPLACE THIS WITH YOUR ACTUAL PRISMA ENDPOINT"
PRISMA_SECRET="REPLACE THIS WITH YOUR PRISMA SECRET KEY"
APP_SECRET="REPLACE THIS WITH ANY SECRET KEY YOU LIKE"
STRIPE_SECRET="REPLACE THIS WITH YOUR STRIPE SECRET API KEY"
PORT=4444
SENDGRID_API_KEY="REPLACE THIS WITH YOUR SENDGRID API KEY"
```

At the very end of the setup you will need to populate that with your actual data for the strings that mark the necessity to be replaced.

First, you will need to deploy your Prisma server. You can follow this tutorial to do that: https://www.prisma.io/docs/1.34/get-started/01-setting-up-prisma-new-database-TYPESCRIPT-t002/#deploy-the-prisma-datamodel

After that, make sure that your Prisma server is deployed and enter the values for PRISMA_ENDPOINT and PRISMA_SECRET fields.

Next, enter your Stripe account and grab the secret API key to paste it in the STRIPE_SECRET field. Same for the Sendgrid API key and the SENDRID_API_KEY field.

You can leave the PORT field unchanged.

After you have configured the env file, run the following command in both the frontend and backend folders to start the app:

```
npm run dev
```

You should be good to go! Visit http://localhost:8000 to view the app.
