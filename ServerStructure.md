# API and Database Requirements

Because Binance currenlty does not offer smart contract like functionality for their platform, a server will be used to simulate smart contract interaction.

## Database

The database should have a schema with the following:

A user object. Within that user object, we have an object that applies if they are a lender, and one that applies if they are a trader. 

One end point -- Lender Profile.

Another endpoint -- trader profile. 

One user ID can have both a trading profile and a lending profile, since it they will be logging in with their Binance account. 



