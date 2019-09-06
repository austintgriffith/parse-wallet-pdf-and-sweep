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

---------------------------------------------------------------------------------------------------

parsing pdf to private keys:
![image](https://user-images.githubusercontent.com/2653167/64444058-8a8ee780-d090-11e9-9dc4-3e620bcdc31f.png)

sweeping from all private keys to a single burner wallet:
![image](https://user-images.githubusercontent.com/2653167/64444017-70eda000-d090-11e9-81dd-444b69e9f88c.png)

