//Copyright Kyle Lessnau 2018
//This parser is meant to be used to parse barcodes provided by General Motors. The identifiers found within the data matrix of the barcode represent different types of data 

//Example of barcode that would be scanned into the application.
var dataMatrix = "[)>06P23393314Q201JUN54490842917021649120L21LK14HD02FJ15KB0000CART7Q12GT2SGT";

//For error prevention, in case the barcode happens to contain identifiers that are lower-case, this will prevent them from being skipped.
dataMatrix.toUpperCase();

//Acquire index of beginning of each identifier
var pIdentIndex = dataMatrix.indexOf("P");              
var qIdentIndex = dataMatrix.indexOf("Q");
var oneJIdentIndex = dataMatrix.indexOf("1J");
var twentyLIdentIndex = dataMatrix.indexOf("20L");
var twentyOneLIdentIndex = dataMatrix.indexOf("21L");
var kIdentIndex = dataMatrix.indexOf("K");
var oneFiveKIndex = dataMatrix.indexOf("15K");
var bIndex = dataMatrix.indexOf("B");
var sevenQIndex = dataMatrix.indexOf("7Q");
var twoSIndex = dataMatrix.indexOf("2S");

//Because the sheet provided by GM stated that the identifiers can appear in ANY order, I'm going to push the indices to an array and sort them. 
//The dataMatrix variable above is already in the order I expect it to be in, but I will eventually test with my own custom data sets
//along with actual GM barcodes to test methods.
var indexArr = [];
//If ident exists, push it to array
if(pIdentIndex !== -1) 
    indexArr.push({ident: "P", index: pIdentIndex});
if(qIdentIndex !== -1)
    indexArr.push({ident: "Q", index: qIdentIndex});
if(oneJIdentIndex !== -1)
    indexArr.push({ident: "1J", index: oneJIdentIndex});
if(twentyLIdentIndex !== -1) 
    indexArr.push({ident: "20L", index: twentyLIdentIndex});
if(twentyOneLIdentIndex !== -1)
    indexArr.push({ident: "21L", index: twentyOneLIdentIndex});
if(kIdentIndex !== -1)
    indexArr.push({ident: "K", index: kIdentIndex});
if(oneFiveKIndex !== -1)
    indexArr.push({ident: "15K", index: oneFiveKIndex});
if(bIndex !== -1) 
    indexArr.push({ident: "B", index: bIndex});
if(sevenQIndex !== -1)
    indexArr.push({ident: "7Q", index: sevenQIndex});
if(twoSIndex !== -1)
    indexArr.push({ident: "2S", index: twoSIndex});

//Array of objects is sorted based on the index of the identifier.
indexArr.sort(function(a, b){
    if(a.index < b.index)
        return -1;
    if(a.index > b.index)
        return 1;
    return 0;
});

function parseEntireBarcode(dataMatrix, arr) {
    //Use this variable as the final element because our nested for-loop won't access it.
    var finalElement = arr.length - 1;
    var dataString = "";
    //For the n-1 identifiers, I'll start piecing together the parsed dataString
    for(var i = 0; i < arr.length - 1; i++) {
        for(var j = arr[i].index; j < arr[i+1].index; j++ ) {
            //To append data to dataString in Sysdev Kalipso, you *MUST* use dataString += dataMatrix.charAt(j).
            dataString += dataMatrix[j];
        }
        console.log(dataString);
        dataString = "";
    }
    //Piece together final substring.
    for(var i = arr[finalElement].index; i < dataMatrix.length; i++ ) {
        //To append data to dataString in Sysdev Kalipso, you *MUST* use dataString += dataMatrix.charAt(i).
        dataString += dataMatrix[i];
    }
    console.log(dataString);
}

if(indexArr.length > 0) 
    parseEntireBarcode(dataMatrix, indexArr);
else
    console.log("Barcode does not contain any modifiers declared by GM.");
