# API and Database Requirements

Because Binance currenlty does not offer smart contract like functionality for their platform, a server will be used to simulate smart contract interaction.

## API

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
    currency: string // Token symbol
}]
```

`api/provideLoan` is sending this input.

```
{
    id: string // userId
    currency: string // token symbol
    amount: string | BigNumber // amount of token lender is making available to traders
}
```

And expecting this output:

```
{
    success: boolean // true if action performed
    message: string // message of success or failure, such as "position successfully closed
}
```

Funds enter accounts available to lend balance, which can be accessed by short traders.

`api/openPosition` is sending this input:

```
{
    collateral: string | BigNumber,
    principle: string | BigNumber // amount of loan requested
    currency: string // token symbol
}
```

And is expecting this output:

```
{
    success: boolean,
    message: string // should output error and not open position if not enough lending funds are available, suggesting to try a different amount
}
```

Open position borrows money, creates a timestamp of when the position was opened and creates an expiration for 60 days after time of opening. 

The principle asset is borrowed and sold for stable coin, awaiting for the position to close to buy back asset at new price. 

The termination price where position closes automatically is calculated at 1.98x the principle. If this price is reached, the same actions as the `api/closePosition` endpoint is executed


`api/closePosition` is sending this input:

```
{
    userId: string // id of user
    positionId: string // id of position
}
```

and is expecing this output:

```
{
    success: boolean // true if action performed
    message: string // message of success or failure, such as "position successfully closed
    difference: string | BigNumber // if the position was closed, amount of money lost or gained, empty string if error
}
```

What this wants, principle + interest is returned to all lenders. 

1. Determine total principle + interest (total to lender)
2. Convert required stable coin for total to lender
3. Send total to lender distributed all lenders distributed by each's contribution ratio
4. calculate difference using initial position price - current price

The position status is changed from open to closed for this position in the user's position array. 
