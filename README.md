# US-visa-appointment-notifier

This is just a script I put together to check and notify me via email ([Nodemail SMTP](https://nodemailer.com/smtp/)) when there's an earlier date before my initial appointment date. It doesn't handle **rescheduling**. 


```
$ npm start

info: =====>>> Step: starting process with 1 tries left
info: =====>>> Step: logging in
info: =====>>> Step: checking for schedules Calgary
[{"date":"2023-02-08","business_day":true},{"date":"2023-04-26","business_day":true},{"date":"2023-10-11","business_day":true}]
info: =====>>> Step: starting process with 0 tries left
info: =====>>> Step: checking for schedules Halifax
info: =====>>> Step: starting process with -1 tries left
info: =====>>> Step: checking for schedules Montreal
info: =====>>> Step: starting process with -2 tries left
info: =====>>> Step: checking for schedules Ottawa
[{"date":"2023-02-08","business_day":true},{"date":"2023-04-26","business_day":true},{"date":"2023-10-11","business_day":true}]
info: =====>>> Step: starting process with -3 tries left
info: =====>>> Step: checking for schedules Quebec City
info: =====>>> Step: starting process with -4 tries left
info: =====>>> Step: checking for schedules Toronto
info: =====>>> Step: starting process with -5 tries left
info: =====>>> Step: checking for schedules Vancouver
info: =====>>> Step: starting process with -6 tries left
info: =====>>> Step: sending an email to schedule for 2023-02-08
...
```



## How it works

* Logs you into the portal
* checks for schedules by day 
* If there's a date before your initial appointment, it notifies you via email
* If no dates found, the process waits for set amount of seconds to cool down before restarting and will stop when it reaches the set max retries.

> see `config.js` or `.env.example` for values you can configure

## Configuration

copy the example configuration file exampe in `.env.example`, rename the copied version to `.env` and replace the values.

### Nodemailer SMTP values 

You can create SMTP configurations

1.Gather Information: Collect the SMTP server details provided by your email service provider, including the server address and port number.

2.Access Email Settings: Log in to your email account and access the settings section. This can usually be found by clicking on your profile picture or username and selecting "Settings" or "Account Settings."

3.Locate SMTP Settings: Look for the SMTP settings within the email account settings. This might be under an "Email Settings," "Server Settings," or "SMTP Settings" tab.

4.Enter SMTP Server Details: Input the SMTP server address and port number provided by your email service provider into the designated fields.

5.Enable Authentication: Check if SMTP authentication is required. If so, enable it. This ensures secure transmission of emails.

6.Enter Username and Password: Provide your email address (username) and password associated with your email account. This allows the SMTP server to authenticate you as a legitimate user.

7.Save Settings: Once you've entered all the necessary information, save the SMTP settings.


## FAQ

* How do I get my facility ID - 
* How do I get my schedule ID - 

## How to use it

* clone the repo 
* run `npm i` within the cloned repo directory
* start the process with `npm start`


