# Wedding-API

Test-bed for experimenting with new ideas, while simultaneously building our wedding RSVP app.

## How to Use?

At a minimum, you'll need Docker and Docker-Compose. There's a plethora of environment variables that you'll need, eventually that `setupEnv.sh` script will be able to handle specifying what they'll be, but in the meantime, scan the base `docker-compose.yml` file to get the basics. For the most part, they'll be unique to your machine, so you should be able to set them to anything you'd like, sans the `MAILGUN_API_KEY`.

As for _starting_ the up, I prefer my `startup.sh` script. Just run the script and it should give you some a dev or prod option to fire up.

## TODOS

- [ ] Fix build scripts to run UI builds as well as
