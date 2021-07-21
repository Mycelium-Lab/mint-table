# mint-table

Uniswap v2

## Components 
  - MaterialTable - creates the interactive table with props
    - SmartAccordion - creates the pull-out card with wallet addres and additiona info *(legacy)*
      - AdditionalTable - creates the table with the mint data of this liquidity provider
    - SmartRow - creates the pull-out card with wallet addres and additiona info *(used)*
      - AdditionalTable - creates the table with the mint data of this liquidity provider
  - EnchancedTableToolbar - creates toolbar with min amount and period selectors
    

## Styles
  - styles.js

## Utils
  - Utils.js - sort function and comparators *(legacy)*
  - timeConvert.js - converts timestamps to normal date and normal date to timestamps, also calculates the time travel
  
## Demo
![Somth went wrong](/img/demo.png)

U can test the demo in https://60f32acfb66d4b5a0003c781--amazing-benz-3fd575.netlify.app/

## Todo list
  - [x] Let Apollo make big graphQL queries (more than 100 entities) 
  - [x] Fix sorting
  - [x] Delete duplicates
  - [x] Let user change the period (1 month, ...)
  - [x] Let user changes the amount
  - [x] The "mint" list to each liquidity provider
  - [x] Deploy and fun
  - [x] New fields in the addtional table
  - [x] Sticky header of the table
  - [x] Add the burn events (now: green - mints, red - burns)
  - [ ] Prettify the code, and add some comments
  - [ ] Redesign the UI