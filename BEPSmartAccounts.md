# Binance Evolution Proposal [BEP]: Smart Accounts

This project uses concepts from Ethereum smart contract development. One concept is having an automated account accept funds and move funds around. 

The proposal is to have smart accounts. Binance DEX trading accounts which can trade on behaf of a user given the user provides to it their permission. 

A Smart Account would have the following functionality:
- Hold funds in all wallets available to Binance members
- Trade on the Binance Platform with user funds given to it by permission
- Have automation, where trades can be placed automatically given pre-specified conditions are met

Binance themselves can charge a fee for keeping Smart Accounts active. 

## What a Smart Account Would do for This App

The functionality of a Smart Account can be seen with the functionality of this app. 

Lenders would deposit funds into this account. It will be held until the lender requests funds returned, by which a portion of the account funds will be kept cold until all available user credited funds can be returned. 

Margin traders would query this account for borrowing funds with frontend calculated leverage by sending collateral to the smart account. 

The Smart Account keeps the collateral as is. The Smart Account would take the principle allotted to the shorter from the lender funds held in the Smart Account, and trade it for a stable currency such as DAI token on the Binance DEX. This determines an open position for a shorter. 

When the shorter decides to close their position, the original asset is bought with stable coin for the principle plus interest. If the price of the original asset dropped sufficiently, the shorter profits, keeping the difference in stable coin. If the price of the original asset increased, the total stable currency held by that position is converted into the original asset by Smart Account submitting trades to the DEX, and the remaining balance required to meet the lender's principle + interest is taken from the collateral. 

If the price of the original asset approaches the limit the collateral can safely cover, the Smart Account submits trades closing the position early. That price for this app's algorithm is 2x the price of the asset on opening the position. If ETH was priced at 200 USD, if within 2 months the price of ETH reached 400 USD, the Smart Account would close the position on behalf of the shorter. 

The Smart Account takes a 1% fee for its service each time a shorter closes a position. A portion of that is kept as emergency in the case collateral does not meet debt by small amounts. The remaining portion is allocated as lending liquidity, as so the fees taken make interest.

