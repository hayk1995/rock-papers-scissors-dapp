## Rock Paper Sciccors Dapp

Please use Ropsten network for testing. Used next.js to build application, have 3 api routes which basically store,load,delete game for players.

###
Steps to test the application

* Visit [Application](https://rock-papers-scissors-dapp.vercel.app/) - your feedback and contributions are welcome!
* Connect all you ropsten accounts (you will need at leas two)
* After connecting fill form to create game
* After game created switch account in metamask this will trigger reload for second player (play for player 2 make a move)
* Switch back to first player and solve game
* You can now close game and start a new one

### Salt management
For generation of salt using web3.utils.randomHex(32), storing it in localstorage for future use, assuming it is safe and can't be stolen. 
For future improvements eth_getEncryptionPublicKey can be used with eth_decrypt to improve storage, but this adds more interaction with metamask and currently is deprecated, thats the reason haven't used it.

###
Mixed strategy Nash equilibria of this game

Mixed-strategy Nash equilibrium of this game is ((1/5,1/5,1/5,1/5,1/5),(1/5,1/5,1/5,1/5,1/5)). So each player should play each move with equal probability.
Explanation In any mixed-strategy Nash equilibrium each player strategy is indifferent when other players strategies are fixed, including pure strategies. 
This means if first player plays with probabilities (r,p,sc,sp,l) then in corresponding pure strategies second players wins 
with probabilities (sc+l,r+sp,p+l,r+sc,p+sp). And as all this values should be equal we get r=p=sc=sp=l=1/5. Same is true for second player.  