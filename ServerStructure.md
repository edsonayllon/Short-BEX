# API and Database Requirements

Because Binance currenlty does not offer smart contract like functionality for their platform, a server will be used to simulate smart contract interaction.

## Database

The database should have a schema with the following:

A user object. Within that user object, we have an object that applies if they are a lender, and one that applies if they are a trader. 

One end point -- Lender Profile.

Another endpoint -- trader profile. 

One user ID can have both a trading profile and a lending profile, since it they will be logging in with their Binance account. 

Here's a user object:

`api/profile` is sending this input:

```
{
    userId: string
}
```

and expecting this output:

```
{
    userId: string,
    shortingProfile: {
        positions // see positions
    },
    lendingProfile: {
        availableBalance: string | BigNumber // current available funds
        projectedBalance: string | BigNumber // sum of principles + interest, what is expected when all funds return
        active: boolean // can money be used for lends, or are they awaiting to remove their funds
        lends // see lends
    }
}
```

Positions is an array of positions.

```
positions: [{
    id: string // id of position
    isOpen: boolean, true if position was opened and is still open,
    collateral: string | BigNumber, // collateral
    principle: string | bigNumber, // amount borrowed
    currency: string // ie "ETH",
    openPrice: string | BigNumber, // Price of currency in USD when position was opened
    currentPrice: string | BigNumber, // Price of currency
    terminationPrice: string | BigNumber, // termination price is 1.98x the opening price
    interestAccumlated: string | BigNumber // interest is principle*(1 + (time passed/ 1 year) * 0.07) - principle
    expiration: timestamp // Date at which liquidity is forced to be returned to lender
}] // an array, more than one can be open
```

Lends is also an array.

```
lends: [{
    id: string // id of position lending to
    lent: string | BigNumber // amount given to trader as principle. One trader can source multiple lenders
    ratioLent: string | BigNumber // of all the money borrowed from lenders by trader, what fraction of that is reserved to this lender on return of funds? 
    expiration: timestamp // Date at which liquidity is forced to be returned to lender 
}]
```

