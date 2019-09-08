# Short-Bex
A shorting platform built on top of Binance DEX

## Project Algorithm

Interest is calculated with the following formula.

<img src="https://latex.codecogs.com/gif.latex?A%20%3D%20P%20%281&plus;rt%29" />

Shorts are set to expire at 2 months (60 days). Interest rate is set at 7%.

So that collateral can cover all costs if the price of the asset goes high, the short position is closed, and funds are liquidated and returned to the lender just if the price of the asset doubles within those 2 months.

Leverage is calculated as so collateral can cover up to a 2x increase in price from the time the short position opens. The following decides a principle, scaling leverage dynamically for that 2x price increase loss tolerance.

<img src="https://latex.codecogs.com/gif.latex?principle%20%3D%200.494312*%20%282%5Ccdot%20collateral%20&plus;%201%29" />

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
