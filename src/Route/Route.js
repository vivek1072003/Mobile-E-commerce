const express = require('express');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();


const ManageMobile =require("../controller/ManageMobile")
const ManageSaller  = require("../controller/Manage-Saller")
const MAnageCostomer  = require("../controller/Manage-Costomer")
const ManagePuschase = require("../controller/Purchase")
const router = express.Router();

 
router.post('/AddMobile',ManageMobile.AddMobile)
router.get('/GetAllMobile',ManageMobile.GetMobileList)
router.get('/GetMobileByKey',ManageMobile.SearchMobile)
router.put("/UpdateMobile/:ID",ManageMobile.UpdateMobile)
router.delete("/DeleteMobile/:ID",ManageMobile.DeleteMobile);

router.post("/AddSaller",ManageSaller.AddSaller)
router.get("/GetSalerList",ManageSaller.GetSalerList)
router.get('/GetSallerByKey',ManageSaller.SearchSaller)
router.put("/UpdateSaller/:ID",ManageSaller.UpdateSaller)
router.delete("/DeleteSaller/:ID",ManageSaller.DeleteSaller)

router.post("/AddCustomer",MAnageCostomer.AddCustomer)
router.get("/GetCustomerList",MAnageCostomer.GetCustomerList)
router.get('/GetCustomerByKey',MAnageCostomer.SearchCustomer)
router.put("/UpdateCustomer/:ID",MAnageCostomer.UpdateCustomer)
router.delete("/DeleteCustomer/:ID",MAnageCostomer.DeleteCustomer)


router.post("/PurchaseMobile",ManagePuschase.PurchaseMobile)
router.get("/GetPurchases",ManagePuschase.GetPurchases)
router.get("/GetSoldMobile",ManagePuschase.GetSoldMobile)

module.exports = router;