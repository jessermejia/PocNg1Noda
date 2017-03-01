# PocNg1Noda
## What
A proof of concept web application to demonstrate a way to approach handling dates/times where:
* the app is internationally used
* users enter information pertaining to scheduling, payroll, etc. for multiple time zones.

## Why
I want to share an end to end (database <--> browser) approach to solving this problem (and perhaps learn something along the way).

## Frameworks / libraries / components
1.	.NET Core
2.	NodaTime
3.	NodeTime.Serialization.JsonNet
4.	AngularJS (dropped in [NG6-Starter](https://github.com/AngularClass/NG6-starter))
5.	moment.js
6.	moment-timezone.js
7.	angular-bootstrap-datetimepicker ([modified](https://github.com/jessermejia/angular-bootstrap-datetimepicker))

## Getting Started
### Things to install
.NET Core
Node
NPM (and/or yarn)

### Commands to run
    git clone ....
    cd <projectroot>/src/PocNg1Noda
    npm install (or yarn install)
    npm run build
    dotnet run (should start on port 5000, to change this, see OS specific commands to set the port below)

#### optional:
run the following command to enable HMR and proxy the kestrel server. The gulp config presumes kestrel is running on port 5000

    npm run start

## Troubleshooting
### make sure [kestrel is set to run on port](https://github.com/aspnet/KestrelHttpServer/issues/639#issuecomment-237721352) 5000
#### Unix:
    ASPNETCORE_URLS="https://*:5000" dotnet run
#### Windows PowerShell:
    $env:ASPNETCORE_URLS="https://*:5000" ; dotnet run
#### Windows CMD (note: no quotes):
    SET ASPNETCORE_URLS=https://*:5000 && dotnet run
