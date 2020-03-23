# Invoice-app

Invoice-app is a demo app that allows to create a PDF version of invoices based on a server-side data.

Project has been developed using React, Redux and TypeScript.
Server-side data has been mocked using [`json-server`](https://www.npmjs.com/package/json-server).

To run the project clone the repo locally and install project's dependencies using `npm install` command.
A default file with mocked data (`db.json`) has been attached to the project.

## setup

To enable `json-server` run:

    json-server --watch db.json --port 8000

Then open the app with `npm start` command.

----

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
