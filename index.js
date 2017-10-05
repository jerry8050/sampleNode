let fs  = require('fs');
const _ = require('lodash');

fs.readFile('bad.html', (err, resp) => {
    console.log(err, resp);
})


let xlsx = require('node-xlsx');

let obj = xlsx.parse(fs.readFileSync('./sheet.xls',{cellDates:true}));
// xlsx.utils.sheet_to_json(obj.Sheets[obj.SheetNames[0]], {raw:true, header:1})
console.log(obj);


let contractInfo = {
    advertiserID:   _.get(obj, '["0"].data["1"]["7"]'),
    advertiserName: _.get(obj, '["0"].data["2"]["7"]'),
    campaignID:     _.get(obj, '["0"].data["3"]["7"]'),
    campaignName:   _.get(obj, '["0"].data["4"]["7"]')
};

function adInfoMapper(adInfo) {
    return {
        "advertiserID":            adInfo[0],
        "advertiserName":          adInfo[1],
        "campaignID":              adInfo[2],
        "campaignName":            adInfo[3],
        "placementID":             adInfo[4],
        "placementExternalID":     adInfo[5],
        "site":                    adInfo[6],
        "placementName":           adInfo[7],
        "placementCompatibility":  adInfo[8],
        "dimensions":              adInfo[9],
        "startDate":               new Date(1900, 0, adInfo[10] - 1),
        "endDate":                 new Date(1900, 0, adInfo[11] - 1),
        "adID":                    adInfo[12],
        "adName":                  adInfo[13],
        "creativeID":              adInfo[14],
        "creativeName":            adInfo[15],
        "impressionTagImage":      adInfo[16],
        "impressionTagIFrame":     adInfo[17],
        "impressionTagJavaScript": adInfo[18],
        "clickTag":                adInfo[19]
    }
};
let adInfoArray = obj[0]['data'].slice(10);
let ads = adInfoArray.map((adInfo)=>{
    return adInfoMapper(adInfo);
})
console.log(ads);