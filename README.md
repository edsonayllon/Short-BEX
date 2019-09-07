# Short-Bex
A shorting platform built on top of Binance DEX

## Project Algorithm

Interest is calculated with the following formula.

<img src="https://latex.codecogs.com/gif.latex?A%20%3D%20P%20%281&plus;rt%29" />

Shorts are set to expire at 2 months (60 days). Interest rate is set at 7%.

So that collateral can cover all costs if the price of the asset goes high, the short position is closed, and funds are liquidated and returned to the lender just if the price of the asset doubles within those 2 months. This allows tolerance for up to a 2x increase in price, ensuring the collateral can cover both the cost of principle and interest during those 2 months, as so the margin trader can lose no more than their provided collateral per short, reducing debt.

To do so, leverage is scaled based on the size of collateral, decreasing as collateral increases. For a given collateral, principle is calculated as follows. 

<img src="https://latex.codecogs.com/gif.latex?principle%20%3D%200.494312*%20%282%5Ccdot%20collateral%20&plus;%201%29" />

This ensures the margin trader will always have funds to pay the lender back principle and interest, protecting both the trader and lender, while also always providing the margin trader leverage without the trader needing to decide on how much, simplifying decision making required for the trader. 

## Roadmap

### Minimal Viable Product

- [x] Architect project algorithm
- [x] Generate starting wireframes
- [x] Initiate project base

Features
- [ ] Login to Binance Dex wallet

