import fs from "fs"
import mongodb from "mongodb";
import fastcsv from"fast-csv";

// let url = "mongodb://username:password@localhost:27017/";
let url = "mongodb://localhost:27017/";
let stream = fs.createReadStream("BankMIS.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push({
      SrNo: data[0],
      Month: data[1],
      LoanAcNo: data[2],
      CustomerIDAPAC: data[3],
      LOSnoAPACReff: data[4],
      CustomerName: data[5],
      DisbDate: data[6],
      DisbLoanAmount: data[7],
      InsuranceAmt: data[8],
      VLIAddPayouton: data[9],
      PayoutRate: data[10],
      AddiSubvPayout: data[11],
      AddiSubvAmt: data[12],
      City: data[13],
      CircleCluster: data[14],
      State: data[15],
      PaidRate: data[16],
      Team: data[17],
      TME: data[18],
      Remark: data[19],
      Remark: data[20],
      GSTstatus: data[21],
      BilledOn: data[22],
      BankNBFCName: data[23],
      Product: data[24],
      SubProduct: data[25],
      Amt: data[26],
      GST: data[27],
      Total: data[28],
      BillNo: data[29],
      BillDate: data[30],
      ReceivedDate: data[31],
      Proper: data[32],
      ReceivedDate: data[33],
      ReceivedAmt: data[34],
      diff: data[35],
      FinalRate: data[36],
      PaidRate: data[37],
      Team: data[38],
      TME: data[39],
      Team: data[40],
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
          .collection("mis")
          .insertMany(csvData, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });

stream.pipe(csvStream);
