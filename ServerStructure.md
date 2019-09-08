# API and Database Requirements

Because Binance currenlty does not offer smart contract like functionality for their platform, a server will be used to simulate smart contract interaction.

## API

Binance DEX API documentation is found here: https://docs.binance.org/api-reference/dex-api/paths.html

We need to allow BTCB-USDSB and BNB-USDSB pairs. 

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
    accountBalance: [{
        token: string // symbol like BNB,
        amount: string // quantity of this token
    }],
    shortingProfile: {
        positions // see positions
    },
    lendingProfile: {
        applicationBalance: [{
            token: string // symbol like BNB,
            amount: string // quantity of this token
        }],
        projectedBalance: [{
            token: string // symbol like BNB,
            amount: string // quantity of this token
        }],
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
    token: string // ie "ETH",
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
    principle: string | BigNumber // amount given to trader as principle. One trader can source multiple lenders
    ratioLent: string | BigNumber // of all the money borrowed from lenders by trader, what fraction of that is reserved to this lender on return of funds? 
    expiration: timestamp // Date at which liquidity is forced to be returned to lender 
    token: string // Token symbol
}]
```

Prices must be queried from the Binance API. `openPrice` is queried when the position is opened and stored in the database. `currentPrice` is queried when the frontend accesses the `api/profile` endpoint, is sent to the frontend, but is not stored by the server. 

The server acts as if funds were moved, but does not actually submit trades to Binance through their API. Movement of funds is recorded in the Database with each time a position is opened and closed, or a loan amounts are sent or returned. 

Example:


```
{
    "userId": "0xBBAac64b4E4499aa40DB238FaA8Ac00BAc50811B",
    "accountBalance": [
        {
            "token": "BNB",
            "amount": "20"
        },
        {
            "token": "BTC",
            "amount": "0.002"
        }
    ],
    "shortingProfile": {
        "positions": [
            {
                "id": "1",
                "isOpen": true,
                "collateral": "1",
                "principle": "3.0134",
                "token": "BNB",
                "openPrice": "22.00",
                "currentPrice": "20.00",
                "terminationPrice": "44.00",
                "interestAccumlated": "0.001",
                "expiration": "1568899866"
            }
        ]
    },
    "lendingProfile": {
        "applicationBalance": [
            {
                "token": "BNB",
                "amount": "3"
            }
        ],
        "projectedBalance": [
            {
                "token": "BNB",
                "amount": "24.34"
            }
        ],
        "active": true,
        "lends": [
            {
                "id": "2",
                "principle": "3.0134",
                "ratioLent": "1",
                "expiration": "1568899866",
                "token": "BNB"
            }
        ]
    }
}
```


`api/provideLoan` is sending this input.

```
{
    userId: string // userId
    currency: string // token symbol
    amount: string | BigNumber // amount of token lender is making available to traders
}
```

Provide loan moves the loan amount from the user's own wallet balance to the application escrow account named application balance for the lender's profile. 

1. The loan amount is subtracted from the user's balance
2. The loan amount is then stored as application balance under the user's lender profile in the database

These values would not be recorded in the daatabase if using a smart contract, and would be kept by the ledger. 

And expecting this output:

```
{
    success: boolean // true if action performed
    message: string // message of success or failure, such as "position successfully closed
}
```

Funds enter accounts available to lend balance, which can be accessed by short traders.

Example:

```
{
    "success": true,
    "message": "Lend made available to borrowers"
}
```


`api/closeLoans` is sending this input.

```
{
    loanId: string
}
```

This initiates returning all funds to the lender when the funds become available. No more funds can be taking from this lender's provided funds. Funds are moved from user's application balance to user's account balance.

output.

```
{
    success: boolean,
    message: string
}
```

Example:

```
{
    "success": true,
    "message": "Fund withdraw initiated, please await remaining lenders to return funds for at most 2 months"
}
```

`api/openPosition` is sending this input:

```
{
    collateral: string | BigNumber,
    principal: string | BigNumber // amount of loan requested
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

Example

```
{
    "success": true,
    "message": "Position opened"
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

Example result:

```
{
    "success": true,
    "message": "Close complete",
    "difference": "-20"
}
```
