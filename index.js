var image = require('get-image-data')
const jsQR = require("jsqr");
const pdf = require('pdf-parse');
const fs = require('fs');
var PDFImage = require("pdf-image").PDFImage;
let base64url = require('base64url')

const PDFFILE = "burnerdai.pdf"

function imageToCode(path){
  image(path, function (err, info) {
    var data = info.data
    var height = info.height
    var width = info.width

    const code =  jsQR(data,width,height);
    console.log(code.data)
    let base64encodedPK = code.data.substring(code.data.indexOf("/pk"))
    base64encodedPK = base64encodedPK.replace("/pk#","")
    let rawPK = Buffer.from(base64url.toBuffer(base64encodedPK)).toString('hex');
    console.log("0x"+rawPK)
    fs.appendFileSync(PDFFILE+".parsed","0x"+rawPK+"\n")
    fs.unlinkSync(path)
  })
}

let dataBuffer = fs.readFileSync(PDFFILE);

pdf(dataBuffer).then(function(data) {
    console.log("Parsing "+data.numpages+" pages...");
    var pdfImage = new PDFImage(PDFFILE);
    for(let page = 0; page<=data.numpages; page++){
      pdfImage.convertPage(page).then(function (imagePath) {
        console.log(imagePath)
        imageToCode(imagePath)
      });
    }
})
