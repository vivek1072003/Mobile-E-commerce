const express = require('express');
const con = require('../Connection/conn');
const Validation = require('../Validation/Validation')

const AddSaller = async (req, res, next) => {

    try {

        let Data = {
            SallerName: req.body.SallerName,
            Address: req.body.Address,
            MobileNO: req.body.MobileNO
        }
        if (!Validation.isValid(Data.SallerName)) {
            return res.status(400).send({ status: false, message: "Please provide  Saller Name field 🛑" });
        }
        if (!Validation.isValid(Data.Address)) {
            return res.status(400).send({ status: false, message: "Please provide Address field 🛑" });
        }
        if (!Validation.isValidMobileNum(Data.MobileNO)) {
            return res.status(400).send({ status: false, message: "Please provide MobileNO field 🛑" });
        }

        Data = [Data.SallerName, Data.Address, Data.MobileNO]

        var Sqlquery = "insert into tbl_Saller(SallerName,Address,MobileNO) values(?,?,?)"
        con.query(Sqlquery, Data, function (err, result) {
            if (err) throw err;

            res.status(200).send({ Data: result });
            console.log(result);
        });


    } catch (error) {
        console.log(error);
    }



}
const GetSalerList = (req, res) => {

    try {


        let Sqlquery = "select *from tbl_Saller"
        con.query(Sqlquery, (err, result) => {
            if (err) throw err;
            res.send(result)
            console.log(result);


        })

    } catch (error) {

        console.log(error);

    }
}



const SearchSaller = (req, res) => {

    try {
        let ID = { Id: req.query.ID };
        let SallerName = { SallerName: req.query.SallerName };
        let MobileNO = { MobileNO: req.query.MobileNO };
        let Data = [ID.Id, SallerName.SallerName, MobileNO.MobileNO]


        let Sqlquery = " SELECT * FROM tbl_Saller WHERE ID= (?) or SallerName = (?) or MobileNO = (?)"

        con.query(Sqlquery, Data, (err, result) => {
            if (err) throw err;
            res.send(result);
            console.log(result);
        })
    } catch (error) {
        console.log(error);
    }

}
const UpdateSaller = (req, res) => {
    try {
        let ID = req.params.ID;
        console.log(ID);
        let Data = req.body;
        let UpdateAT = new Date();
        UpdateAT = UpdateAT.toLocaleString();
        UpdateAT = UpdateAT.replaceAll(',', '');
        console.log(UpdateAT);

        Data = [
            req.body.SallerName,
            req.body.MobileNO,
            UpdateAT
        ]

        let Sqlquery = "UPDATE tbl_Saller SET SallerName =?,MobileNO =?,UpdateAt =? WHERE id =  " + ID + ""
        con.query(Sqlquery, Data, (err, result) => {
            if (err) throw err;
            res.send(result);
            console.log(result);

            

        });

    } catch (error) {
        console.log(error);
    }
}

const DeleteSaller = (req, res) => {
    try {

        let ID = req.params.ID;


        let Sqlquery = "DELETE FROM tbl_Saller WHERE ID = (?)";

        con.query(Sqlquery, ID, (err, result) => {
            if (err) throw err;
            res.send(result);
            console.log(result);


        })

    } catch (error) {
        console.log(error);
    }


}




module.exports = {
    AddSaller,
    GetSalerList,
    SearchSaller,
    DeleteSaller,
    UpdateSaller
}