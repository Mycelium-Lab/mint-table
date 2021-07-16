# mint-table

Uniswap v2

## Components 
  - MaterialTable - creates the interactive table with props
    - SmartAccordion - creates the pull-out card with wallet addres and additiona info
      - AdditionalTable - creates the table with the mint data of this liquidity provider
  - EnchancedTableToolbar - creates toolbar with min amount and period selectors
    

##Styles
  - styles.js

## Utils
  - Utils.js - sort function and comparators *(legacy)*
  - timeConvert.js - converts timestamps to normal date and normal date to timestamps, also calculates the time travel
  
## Demo
![Somth went wrong](/img/demo.png)

## Todo list
  - [x] Let Apollo make big graphQL queries (more than 100 entities) 
  - [x] Fix sorting
  - [x] Delete duplicates
  - [x] Let user change the period (1 month, ...)
  - [x] Let user changes the amount
  - [x] The "mint" list to each liquidity provider
  - [ ] Deploy and fun
  - [ ] Prettify the code, and add some comments
  - [ ] Redesign the UI