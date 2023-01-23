import mongoose from "mongoose";

const ProcessData = mongoose.Schema({
  Month: {
    type: String,
    required: false,
  },
  LoanNo: {
    type: String,
    required: false,
  },
  Custname: {
    type: String,
    required: false,
  },
  DisbDate: {
    type: String,
    required: false,
  },
  LoanApplied: {
    type: String,
    required: false,
  },
  LoanAmt: {
    type: String,
    required: false,
  },
  Remark1: {
    type: String,
    required: false,
  },
  DisbCity: {
    type: String,
    required: false,
  },
  ActualDibursalMonth: {
    type: String,
    required: false,
  },
  MatchQfile: {
    type: String,
    required: false,
  },
  Confirmwith: {
    type: String,
    required: false,
  },
  Remark2: {
    type: String,
    required: false,
  },
  BankNBFCName: {
    type: String,
    required: false,
  },
  Product: {
    type: String,
    required: false,
  },
  Rate: {
    type: String,
    required: false,
  },
  Subvention: {
    type: String,
    required: false,
  },
  Addition: {
    type: String,
    required: false,
  },
  Payout: {
    type: String,
    required: false,
  },
  GST: {
    type: String,
    required: false,
  },
  Cr: {
    type: String,
    required: false,
  },
  PaymentMade: {
    type: String,
    required: false,
  },
  Balance: {
    type: String,
    required: false,
  },
  SrNo: {
    type: String,
    required: false,
  },
  Month: {
    type: String,
    required: false,
  },
  LoanAcNo: {
    type: String,
    required: false,
  },
  CustomerIDAPAC: {
    type: String,
    required: false,
  },
  LOSnoAPACReff: {
    type: String,
    required: false,
  },
  CustomerName: {
    type: String,
    required: false,
  },
  DisbDate: {
    type: String,
    required: false,
  },
  DisbLoanAmount: {
    type: String,
    required: false,
  },
  InsuranceAmt: {
    type: String,
    required: false,
  },
  VLIAddPayouton: {
    type: String,
    required: false,
  },
  PayoutRate: {
    type: String,
    required: false,
  },
  AddiSubvPayout: {
    type: String,
    required: false,
  },
  AddiSubvAmt: {
    type: String,
    required: false,
  },
  City: {
    type: String,
    required: false,
  },
  CircleCluster: {
    type: String,
    required: false,
  },
  State: {
    type: String,
    required: false,
  },
  PaidRate: {
    type: String,
    required: false,
  },
  Team: {
    type: String,
    required: false,
  },
  TME: {
    type: String,
    required: false,
  },
  Remark: {
    type: String,
    required: false,
  },
  GSTstatus: {
    type: String,
    required: false,
  },
  BilledOn: {
    type: String,
    required: false,
  },
  BankNBFCName: {
    type: String,
    required: false,
  },
  Product: {
    type: String,
    required: false,
  },
  SubProduct: {
    type: String,
    required: false,
  },
  Amt: {
    type: String,
    required: false,
  },
  GST: {
    type: String,
    required: false,
  },
  Total: {
    type: String,
    required: false,
  },
  BillNo: {
    type: String,
    required: false,
  },
  BillDate: {
    type: String,
    required: false,
  },
  ReceivedDate: {
    type: String,
    required: false,
  },
  Proper: {
    type: String,
    required: false,
  },
  ReceivedAmt: {
    type: String,
    required: false,
  },
  diff: {
    type: String,
    required: false,
  },
  FinalRate: {
    type: String,
    required: false,
  },
});

export default mongoose.model('processdatastas', ProcessData);
