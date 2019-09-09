# Short-Bex
A shorting platform built on top of Binance DEX

## Project Algorithm

Interest is calculated with the following formula.

> A = P (1 + rt)

Shorts are set to expire at 2 months (60 days). Interest rate is set at 7%.

So that collateral can cover all costs if the price of the asset goes high, the short position is closed, and funds are liquidated and returned to the lender just if the price of the asset doubles within those 2 months.

Leverage is calculated as so collateral can cover up to a 2x increase in price from the time the short position opens. The following decides a principle, scaling leverage dynamically for that 2x price increase loss tolerance.

> principal = 0.494312 * (2 * collateral + 1)

The principle equation is a solution to the following linear equation:

> 2 = 1/(principle + maximum interest - collateral)

Or,

> z = 1/ (y*(1+0.07*60/365) - x)

Where z is a multiple of the asset's original price, here set at 2x, determining the trader's tolerance before losing more than their collateral and entering debt.


## Business Model

A 7% APY interest rate is charged to the margin trader for borrowing. From that 7%, 6% goes to the lender, 1% goes to the platform as a service fee. As those fees accumulate, they are used as lending liquidity as well, acummulating 7% interest on the fees collected. The value of the company grows as both lenders and margin traders grow, and as the time the platform exists increases.

## Setup

### Client

Enter client directory. Install dependencies. And run.

```
cd client
yarn
yarn web || yarn mobile
```

### Server

Python 3 is required. Enter the server directory. Install dependency. And run.

```
cd client
# pip3 install hug
$ hug -f api.py
```

API v1, v2, and v3 is included. v3 is in progress. The client only queries v1 at the moment.

## Contact the Developers

**Edson Ayllon**&mdash;Freelance Decentralized Finance developer, smart contract and frontend designer
- [Twitter](https://twitter.com/relativeread)
- [Twitch](twitch.tv/edson6)
- [LinkedIn](https://www.linkedin.com/in/edson-ayllon/)
- [Gitter](https://gitter.im/edsonayllon)

**Lawrence Wu**&mdash;Linux Systems Administrator and Python developer
- [Github](https://github.com/lvw5264)
