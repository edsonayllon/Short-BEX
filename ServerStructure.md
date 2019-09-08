# API and Database Requirements

Because Binance currenlty does not offer smart contract like functionality for their platform, a server will be used to simulate smart contract interaction.

## Database Schemaas

User: 
```
{
    walletAddress,
    walletBalance,
    lender: {
        sentLoans: [{
            positionId
        }]
    },
    trader: {
        position: [{
            positionId,
            lenderSource: [{
                lenderWalletAddress,
                ratioOfTotalBorrowed
            }],
            expiration,
            collateral,
            principle,
        }]
    }
}
```

Say a person opens a position. 

The principle is stored, as well as the collateral into the position array. That position in the array is assigned an ID. Lenders are querried by most available balance. 

## API

Binance DEX API documentation is found here: https://docs.binance.org/api-reference/dex-api/paths.html

We need to allow BTCB-USDSB and BNB-USDSB pairs. 

The database should have a schema with the following:

A user object. Within that user object, we have an object that applies if they are a lender, and one that applies if they are a trader. 

One end point -- Lender Profile.

Another endpoint -- trader profile. 

One user ID can have both a trading profile and a lending profile, since it they will be logging in with their Binance account. 

Here's a user object:

### `api/profile` 

is sending this input:

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

This is a GET request. Query the required fields from the database, and send it as JSON.


### `api/lenderDeposit` 

is sending this input.

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

Initiates lender's withdraw from escrow to their owned account. 

1. Sets the lender status as not lending
2. Available funds in escrow (not being lent) are returned immediately
3. No other actions are done by this end point

At the `api/closePosition` endpoint, the lender status is observed. If lender is marked as not lending (a boolean), funds are returned immediately to the lender's owned wallet from the escrow. This is how the remaining funds are returned to the lender. 

The action is:
1. Subtract total from application balance in lender profile
2. Add total from application balance escrow to user's own balance

Ideally, we would be querying the user's balance from their balance on their Binance account. The user balance here is just a placeholder. 



### `api/openPosition` 

is sending this input:

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

1. Query escrow of loans and get sum of funds available to be borrowed
2. Compare sum of availabe escrow funds to the principle
3. If principle exceeds available escrow, end and return an error message to the user "Not enough liquidity available for trade"
4. If principle is less than sum of available escrow, enough funds are available for the margin trade. Store a deadline timestamp as 60 days from now match start matching requested principle with escrow from each user
    1. For each user queried, check if their lending status is set to available for lending
    2. If not availabe, skip. 
    3. If available, check if their funds cover the principal. If they do, stop here, store lender ratio to 1 as well as lender address (the lender ID) as the only element in the lenders array for the position, convert principle to USD, store USD in position
    4. if more than one lender is needed to cover principle, collect a list of lenders until the funds from that list meet or exceed principle. If funds exceed, take only what is needed from the last from the list. Store an array of lender addresses who provided margin, as well as the lending ratio each lender provides to the principal. This ratio is the amount provided by the lender divided by the principle. Convert the principle to stable coin, store this stable coin amount in the position object.
    5. Return success to the client


### `api/closePosition` 

is sending this input:

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

1. Determine total principle + interest (total to lender) Equation is: total owed = principle(1 + 0.06 * time passed/1 year)
2. Take a 1% fee, send it to the escrow account positioned as an active lend (You can skip this for now, just know it would be there in the future if we continue)
3. Convert required stable coin for total owed to lender(s) (what remains after the fee is taken)
4. Send total to lender distributed all lenders distributed by each's contribution ratio
    1. Check each lender's lender status to see if they're expecting withdraw from escrow
    2. If they are no longer active as a lender, send directly to the user's wallet (represented as account balance for now in this demo). If lending status is still set as active, return funds to the lender's escrow allocation.
5. calculate difference using initial position price - current price
6. Return a success message along with difference calculated

The position status is changed from open to closed for this position in the user's position array. 

Example result:

```
{
    "success": true,
    "message": "Close complete",
    "difference": "-20"
}
```
