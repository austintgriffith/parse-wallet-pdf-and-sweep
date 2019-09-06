const Web3 = require('web3');
const fs = require('fs');
const util = require('ethereumjs-util')

const RPC = "https://dai.poa.network"
const PKFILE = "burnerdai.pdf.parsed"
const SENDTOADDRESS = "0x06f3a3e339d89dbc500246422a4ee159ad7025a1"
const GASPRICE = 1000000000
const GASLIMIT = 25000


var web3 = new Web3(RPC)

async function loadPKsAndTransfer() {
  let privateKeys = (fs.readFileSync(PKFILE)).toString().split("\n");
  for(let p in privateKeys){
    let pk = privateKeys[p]
    if(pk){
      console.log(pk)
      await cleanOut(pk)
    }
  }
}
loadPKsAndTransfer()

async function cleanOut(pk){
  let account = "0x"+util.privateToAddress(pk).toString('hex')
  try{
    let balance = await web3.eth.getBalance(account)
    console.log("balance of "+account+" is "+balance/10**18)
    let xferValue = balance-(GASPRICE*GASLIMIT)
    if(xferValue>0){
      let paramsObject = {
        to: SENDTOADDRESS,
        from: account,
        data: "0x",
        value: xferValue,
        gasPrice: GASPRICE,
        gas: GASLIMIT
      }
      let signedtx = await web3.eth.accounts.signTransaction(paramsObject,pk)
      console.log("signedtx",signedtx)
      return web3.eth.sendSignedTransaction(signedtx.rawTransaction)
    }
  }catch(e){
    console.log(e)
  }
}
