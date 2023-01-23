const fs = require("fs");
const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");

// let url = "mongodb://username:password@localhost:27017/";
let url = "mongodb://localhost:27017/";
let stream = fs.createReadStream("VendorMIS.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push({
      Month: data[0],
      LoanNo: data[1],
      Custname: data[2],
      DisbDate: data[3],
      LoanApplied: data[4],
      LoanAmt: data[5],
      Remark1: data[6],
      DisbCity: data[7],
      ActualDibursalMonth: data[8],
      MatchQfile: data[9],
      Confirmwith: data[10],
      Remark2: data[11],
      BankNBFCName: data[12],
      Product: data[13],
      Rate: data[14],
      Subvention: data[15],
      Addition: data[16],
      Payout: data[17],
      GST: data[18],
      Cr: data[19],
      PaymentMade: data[20],
      Balance: data[21],
    });
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    console.log(csvData);

    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;

        client
          .db("mis")
          .collection("vendormis")
          .insertMany(csvData, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });

stream.pipe(csvStream);
