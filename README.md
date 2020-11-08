# Jambo Apparel

![](src/assets/logo.png)

## Description

Jambo Apparel's (NPO) proprietary e-commerce store to sell merchandise without incurring the costs of major platform providers such as Shopify. By having this proprietary online store, the NPO was able save money that is spent on deployment and direct it towards growth and donations for its objective.

## Technologies Used

<img src="./src/assets/Jambo Architecture Diagram.png" width="700">

## Table of Contents

- [Description](#Description)
- [Technologies Used](#Technologies-Used)
- [Installation](#Installation)
- [Deployment](#Deployment)
- [Usage](#Usage)
- [Contributing](#Contributing)
- [Credits](#Credits)

## Installation

In the project directory, do the following to run the project:

1. Install npm packages:

```
npm i
```

2. Start the front-end ReactJS website and the ExpressJS server (Port 9000)

```
npm run dev
```

## Deployment

Front-end deployment is automatic using Vercel

- Pushing to `master` deploys the web app onto the Vercel domain

To deploy the ExpressJS server onto Heroku, do the following:

- Connect to Heroku instance:

`heroku git:remote -a {heroku instance name}`

- Push server code to Heroku git:

`git subtree push --prefix server heroku master`

## Usage

Just browse the site lol

## Contributing

This is not an open-source project but if you find any issues or bugs with the web app, please let one of the developers know!

## Credits

[Harsohail Brar](https://github.com/harsohailB)

[Ryan Holt](https://github.com/ryan-holt)

[Gary Wu](https://github.com/garywu2)
