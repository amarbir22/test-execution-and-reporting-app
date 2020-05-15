# test-execution-and-reporting-app
TEAR is a MERN application for Test Execution and Reporting. Initially the goal is to archive JMeter performance 
reports and provide insights into performance metrics and compare reports. Future releases will have features to
execute tests from a central QA Dashboard

## Run Application
Application can be run in three formats:
   1.   Run prebuilt public image from docker hub
   2.   Build and run local docker image
   3.   Run app in sandbox
   
## Run prebuilt public image from docker hub
```sh
docker run -it --rm -e MONGO_DEV_PASSWORD='PASS' -p 8080:8080 amarbir22/tear-app:latest
```
## Build and run local docker image
Build image
```
docker built -t teat-app:latest .
```
Run Image
```
docker run -it --rm -e MONGO_DEV_PASSWORD='PASS' -p 8080:8080 tear-app:latest
```

## Run in Sandbox
Install App
```
npm install
```
Run App in development mode
```
MONGO_DEV_PASSWORD='PASS' npm start
``

## Start App and Server

```sh
MONGO_DEV_PASSWORD=ASK_AMAR_FOR_PASSWORD npm start
```
Due to the dependency on the DB now the app requires a mongoDB instance URI. Plan is to mock the DB for running the app in DEV mode.
