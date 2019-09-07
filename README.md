# Short-Bex
A shorting platform built on top of Binance DEX

## Project Algorithm

Interest is calculated with the following formula.

<img src="https://latex.codecogs.com/gif.latex?A%20%3D%20P%20%281&plus;rt%29" />

Shorts are set to expire at 2 months (60 days). Interest rate is set at 7%.

So that collateral can cover all costs if the price of the asset goes high, the short position is closed, and funds are liquidated and returned to the lender just if the price of the asset doubles within those 2 months. 

Leverage is calculated as so collateral can cover up to a 2x increase in price from the time the short position opens. The following decides a principle, scaling leverage dynamically for that 2x price increase loss tolerance.

<img src="https://latex.codecogs.com/gif.latex?principle%20%3D%200.494312*%20%282%5Ccdot%20collateral%20&plus;%201%29" />


## Roadmap

### Minimal Viable Product

- [x] Architect project algorithm
- [x] Generate starting wireframes
- [x] Initiate project base

Features
- [ ] Login to Binance Dex wallet

