If you generate a pdf full of private key paper wallets and you need to recover all the funds from them without manually scanning and sending from each.

install packages
```
npm install
```

edit `index.js` to set the name of your `PDFFILE`

run PDF parser to extract private keys:
```
node index.js
```

edit `transfer.js` to set your `RPC`, `SENDTOADDRESS`, and `PKFILE` (generated in previous step)

sweep funds:
```
node transfer.js
```
