import BankMis from "../models/BankMis.js";
import VendorMis from "../models/VendorMis.js";
import ProcessData from "../models/ProcessData.js";
import DuplicateData from "../models/DuplicateData.js";
import csv from "csvtojson";
import "dotenv/config";

// Upload CSV Only
export const uploadBankCSV = async (req, res) => {
  try {
    csv()
      .fromFile(req.file.path)
      .then((jsonObj) => {
        var army = [];
        for (var i = 0; i < jsonObj.length; i++) {
          var obj = {};
          obj.SrNo = jsonObj[i]["SrNo"];
          obj.Month = jsonObj[i]["Month"];
          obj.LoanAcNo = jsonObj[i]["LoanAcNo"];
          obj.CustomerIDAPAC = jsonObj[i]["CustomerIDAPAC"];
          obj.LOSnoAPACReff = jsonObj[i]["LOSnoAPACReff"];
          obj.CustomerName = jsonObj[i]["CustomerName"];
          obj.DisbDate = jsonObj[i]["DisbDate"];
          obj.DisbLoanAmount = jsonObj[i]["DisbLoanAmount"];
          obj.InsuranceAmt = jsonObj[i]["InsuranceAmt"];
          obj.VLIAddPayouton = jsonObj[i]["VLIAddPayouton"];
          obj.PayoutRate = jsonObj[i]["PayoutRate"];
          obj.AddiSubvPayout = jsonObj[i]["AddiSubvPayout"];
          obj.AddiSubvAmt = jsonObj[i]["AddiSubvAmt"];
          obj.City = jsonObj[i]["City"];
          obj.CircleCluster = jsonObj[i]["CircleCluster"];
          obj.State = jsonObj[i]["State"];
          obj.PaidRate = jsonObj[i]["PaidRate"];
          obj.Team = jsonObj[i]["Team"];
          obj.TME = jsonObj[i]["TME"];
          obj.Remark = jsonObj[i]["Remark"];
          obj.GSTstatus = jsonObj[i]["GSTstatus"];
          obj.BilledOn = jsonObj[i]["BilledOn"];
          obj.BankNBFCName = jsonObj[i]["BankNBFCName"];
          obj.Product = jsonObj[i]["Product"];
          obj.SubProduct = jsonObj[i]["SubProduct"];
          obj.Amt = jsonObj[i]["Amt"];
          obj.GST = jsonObj[i]["GST"];
          obj.Total = jsonObj[i]["Total"];
          obj.BillNo = jsonObj[i]["BillNo"];
          obj.BillDate = jsonObj[i]["BillDate"];
          obj.ReceivedDate = jsonObj[i]["ReceivedDate"];
          obj.Proper = jsonObj[i]["Proper"];
          obj.ReceivedAmt = jsonObj[i]["ReceivedAmt"];
          obj.diff = jsonObj[i]["diff"];
          obj.FinalRate = jsonObj[i]["FinalRate"];
          // Itterate DB
          army.push(obj);
        }
        BankMis.insertMany(army)
          .then(function () {
            res.status(200).send({
              message: "Successfully Uploaded!",
            });
          })
          .catch(function (error) {
            res.status(500).send({
              message: "failure",
              error,
            });
          });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload CSV Only
export const uploadVendorCSV = async (req, res) => {
  try {
    csv()
      .fromFile(req.file.path)
      .then((jsonObj) => {
        var army = [];
        for (var i = 0; i < jsonObj.length; i++) {
          var obj = {};
          obj.Month = jsonObj[i]["Month"];
          obj.LoanNo = jsonObj[i]["LoanNo"];
          obj.Custname = jsonObj[i]["Custname"];
          obj.DisbDate = jsonObj[i]["DisbDate"];
          obj.LoanApplied = jsonObj[i]["LoanApplied"];
          obj.LoanAmt = jsonObj[i]["LoanAmt"];
          obj.Remark1 = jsonObj[i]["Remark1"];
          obj.DisbCity = jsonObj[i]["DisbCity"];
          obj.ActualDibursalMonth = jsonObj[i]["ActualDibursalMonth"];
          obj.MatchQfile = jsonObj[i]["MatchQfile"];
          obj.Confirmwith = jsonObj[i]["Confirmwith"];
          obj.Remark2 = jsonObj[i]["Remark2"];
          obj.BankNBFCName = jsonObj[i]["BankNBFCName"];
          obj.Product = jsonObj[i]["Product"];
          obj.Rate = jsonObj[i]["Rate"];
          obj.Subvention = jsonObj[i]["Subvention"];
          obj.Addition = jsonObj[i]["Addition"];
          obj.Payout = jsonObj[i]["Payout"];
          obj.GST = jsonObj[i]["GST"];
          obj.Cr = jsonObj[i]["Cr"];
          obj.PaymentMade = jsonObj[i]["PaymentMade"];
          obj.Balance = jsonObj[i]["Balance"];
          // Itterate DB
          army.push(obj);
        }
        VendorMis.insertMany(army)
          .then(function () {
            res.status(200).send({
              message: "Successfully Uploaded!",
            });
          })
          .catch(function (error) {
            res.status(500).send({
              message: "failure",
              error,
            });
          });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get  All Processdata MIS Data From DB
export const getProcessDataData = async (req, res) => {
  try {
    const functionGet = () =>
      VendorMis.aggregate([
        {
          $lookup: {
            from: "mis",
            localField: "LoanNo",
            foreignField: "LOSnoAPACReff",
            as: "bankmis",
          },
        },
        {
          $match: { bankmis: { $ne: [] } },
        },
        {
          $out: "processdatastas",
        },
      ]).exec((err, result) => {
        if (err) {
          console.log("error", err);
        }
        if (result) {
          res.json(result);
          ProcessData.find(result);
        }
      });
    functionGet();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get  All Process Data From DB
export const getProcessTableData = async (req, res) => {
  try {
    const users = await ProcessData.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get  All Vendor MIS Data From DB
export const getVendorMisData = async (req, res) => {
  try {
    const users = await VendorMis.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Matched Single Data WIth the Help of ID and this api for edit button click
export const getProcessDataDataId = async (req, res) => {
  try {
    const id = req.params.id;
    ProcessData.findById(id).then((e) => {
      if (!e)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else {
        res.json(e);
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Matched Single Data WIth the Help of ID and this api for edit button click
export const getProcessDataSingleId = async (req, res) => {
  try {
    const id = req.params.id;
    VendorMis.findById(id).then((e) => {
      if (!e)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else {
        ProcessData.insertMany([e])
          .then((d) => {
            // console.log(d);
            res.json(d);
          })
          .catch((error) => {
            console.log(error);
          });

        VendorMis.deleteOne({ _id: id })
          .then((d) => {
            res.send("Removed succesfully");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Matched Single Data WIth the Help of ID and this api for edit button click
export const getSaveProcessDataId = async (req, res) => {
  try {
    const id = req.params.id;
    ProcessData.findById(id).then((e) => {
      if (!e)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else {
        res.json(e);
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Data WIth the Help of ID and this api for edit button click
export const getVendorMisDataSingle = async (req, res) => {
  try {
    const id = req.params.id;
    VendorMis.findById(id).then((e) => {
      if (!e)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else {
        res.send(e);
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Any Single Vendor MIS Record
export const updateUser = async (req, res) => {
  try {
    const updateduser = await VendorMis.updateOne(
      { LoanNo: req.params.LoanNo },
      { $set: req.body }
    );
    res.status(200).json(updateduser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Any Single Vendor MIS Record
export const deleteUser = async (req, res) => {
  try {
    const deleteduser = await VendorMis.deleteOne({
      id: req.params._id,
    });
    res.status(200).json(deleteduser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Bank MIS Data from DB
export const getBankMisData = async (req, res) => {
  try {
    const users = await BankMis.find();
    res.json(users);
    //functionGet();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Any Single Bank MIS Record
export const updateBankUser = async (req, res) => {
  try {
    const updateduser = await BankMis.updateOne(
      { LOSnoAPACReff: req.params.LOSnoAPACReff },
      { $set: req.body }
    );
    res.status(200).json(updateduser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Any Single Bank MIS Record
export const deleteBankUser = async (req, res) => {
  try {
    const deleteduser = await BankMis.deleteOne({
      id: req.params._id,
    });
    res.status(200).json(deleteduser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get Matched Single Data WIth the Help of ID and this api for edit button click
export const updateDupliacteValue = async (req, res) => {
  try {
    const id = req.params.id;
    VendorMis.findById(id).then((e) => {
      if (!e)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else {
        DuplicateData.insertMany([e])
          .then((d) => {
            // console.log(d);
            res.json(d)
          })
          .catch((error) => {
            console.log(error);
          });

        VendorMis.deleteOne({ _id: id })
           .then((d) => {
            // console.log("Removed succesfully");
           })
           .catch((error) => {
             console.log(error);
         });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Duplicate Data List
export const getDuplicateDataList = async (req, res) => {
  try {
    const users = await DuplicateData.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};