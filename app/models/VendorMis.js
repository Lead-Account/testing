import mongoose from "mongoose";

const VendorMis = mongoose.Schema({
    Month: String,
    LoanNo: String,
    Custname: String,
    DisbDate: String,
    LoanApplied: String,
    LoanAmt: String,
    Remark1: String,
    DisbCity: String,
    ActualDibursalMonth: String,
    MatchQfile: String,
    Confirmwith: String,
    Remark2: String,
    BankNBFCName: String,
    Product: String,
    Rate: String,
    Subvention: String,
    Addition: String,
    Payout: String,
    GST: String,
    Cr: String,
    PaymentMade: String,
    Balance: String
});

export default mongoose.model('vendormis', VendorMis);