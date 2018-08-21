# Choo.js meets Feathers.js

This is a little example of putting choo.js and feathers.js together in one playground.

I hope it can serve as a boilerplate for dealing with Auth and more. I love Choo.js and Feathers.js seems too good to be true sometimes. I will try to add in different branches to show incremental development before it gets too big to read anymore.

***

## Branches

### 00-generate-choo-and-feathers



In terminal window 1:
```
create-choo-app client

cd client
npm install
npm start
```

In terminal window 2:
```
mkdir server
cd server
feathers generate app
# accept defaults

npm start
```
