import express from "express";
import multer from "multer";
import { 
    getBankMisData, 
    getVendorMisData,
    updateUser,
    deleteUser,
    getVendorMisDataSingle,
    getProcessDataData,
    getProcessDataDataId,
    getProcessTableData,
    uploadBankCSV,
    uploadVendorCSV,
    getProcessDataSingleId,
    updateDupliacteValue,
    getDuplicateDataList,

} from "../controllers/UserController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get('/', (req, res) => {
    res.json("Home Bakcend");
});

// Upload CSV
router.post("/uploadBankCSV", upload.single("file"), uploadBankCSV)
router.post("/uploadVendorCSV", upload.single("file"), uploadVendorCSV)

// Bank MIS CURD Operations
router.get('/bankmisdata', getBankMisData);
router.get('/getonebank/:id', getVendorMisDataSingle);
router.put('/bankmis/:LoanNo', updateUser);
router.delete('/bankmis/:id', deleteUser);

// Process Data Routes
router.get('/processdatas', getProcessDataData);
router.get('/processdata/:id', getProcessDataDataId);
router.get('/processCsvData/:id', getProcessDataSingleId);
router.get('/processdatatable', getProcessTableData);

// Duplicate Data Routes
router.get('/duplicatedata/:id', updateDupliacteValue);
router.get('/duplicatedatalist', getDuplicateDataList);

// Vendor MIS CURD Operation
router.get('/vendormis', getVendorMisData);
router.get('/getonevendor/:id', getVendorMisDataSingle);
router.put('/vendormis/:LoanNo', updateUser);
router.delete('/vendormis/:id', deleteUser);

export default router;