const express = require('express');
const con = require('../Connection/conn');



const PurchaseMobile = async (req, res, next) => {

    let MobilesName = { MobilesName: req.body.MobilesName };
    let Data = req.body.NumberOFBook
    MobilesName = [MobilesName.MobilesName]

    console.log("MobilesName" + MobilesName);
    try {
        let Sqlquery = "SELECT * FROM tbl_book WHERE MobilesName =(?)"
        con.query(Sqlquery, MobilesName, (err, result) => {
            if (err) {

                return res.status(500).json({
                    error: err
                });

            }
            else {

                for (var a = 0; a < result.length; a++) {
                    let id;
                    id = result[a].id;
                    console.log("ID is " + id);

                    let Sqlquery = "UPDATE tbl_book SET MobileStock =? WHERE id =  " + id + ""
                    con.query(Sqlquery, result[a].BookStock - Data, (err, result) => {

                        if (err) {

                            return res.status(500).json({ error: err })
                        }
                        else {
                            return res.status(200).send({ Result: "Purchase " + Data + " Book SuccesFully" });

                        }
                    })
                }

            }

            MobilesName = " '" + MobilesName + "'";
            let Dat = {
                MobilesName: req.body.MobilesName,
                CostomerName: req.body.CostomerName
            }
            Dat = [MobilesName, Dat.CostomerName]
            console.log(Dat);
            Sqlquery = "insert into tbl_PurchaseMobile(MobilesName,CostomerName) values(?,?)"
            con.query(Sqlquery, Dat, function (err, result) {
                if (err) {
                    res.send(err)
                };
                return res.status(200).send({ Result: "Purchase " + Data + " Mobile SuccesFully" });
                console.log(result);
            });
        })

    } catch (error) {

    }
}
const GetPurchases = (req, res) => {
    try {
        let Sqlquery = "select *from tbl_PurchaseMobile"
        con.query(Sqlquery, (err, result) => {
            if (err) throw err;
            res.send(result)
            console.log(result);
        })
    } catch (error) {

        console.log(error);

    }
}



const GetSoldMobile = (req, res) => {
    var SallerName;
    var OrderID;
    var MobilesName;

    let Data;
    try {
        let Sqlquery = "select *from tbl_PurchaseMobile"
        con.query(Sqlquery, (err, result) => {
            if (err) throw err;

            for (var a = 0; a < result.length; a++) {

                OrderID = result[a].OrderID
                MobilesName = result[a].MobilesName

            }
            Data = result


            let Sqlquery2 = "select *from tbl_Saller"
            con.query(Sqlquery2, (err, result) => {
                if (err) throw err;

                for (var a = 0; a < result.length; a++) {

                    SallerName = result[a].SallerName

                }

                return res.status(200).send({ status: true, result: Data,SallerName:SallerName });

            })




        })






    } catch (error) {

        console.log(error);

    }
}






module.exports = {
    PurchaseMobile,
    GetPurchases,
    GetSoldMobile
}