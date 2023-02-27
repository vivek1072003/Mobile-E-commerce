const express = require('express');
const con = require('../Connection/conn');
const Validation = require('../Validation/Validation')

const AddCustomer = async (req, res, next) => {
    try {

        let Data = {
            Name: req.body.Name,
            MobileNo: req.body.MobileNo,
            Address: req.body.Address
        }
        if (!Validation.isValid(Data.MobileNo)) {
            return res.status(400).send({ status: false, message: "Please provide  Name field 🛑" });
        }
        if (!Validation.isValidMobileNum(Data.MobileNo)) {
            return res.status(400).send({ status: false, message: "Please provide MobileNo field 🛑" });
        }
        if (!Validation.isValid(Data.Address)) {
            return res.status(400).send({ status: false, message: "Please provide Address field 🛑" });
        }
        Data = [Data.Name, Data.MobileNo, Data.Address]
        var Sqlquery = "insert into tbl_Customer(Name,MobileNO,Address) values(?,?,?)"
        con.query(Sqlquery, Data, function (err, result) {
            if (err) throw err;

            res.status(200).send({ Data: result });
            console.log(result);
        });
    } catch (error) {
        console.log(error);
    }
}

const GetCustomerList = (req, res) => {

    try {


        let Sqlquery = "select *from tbl_Customer"
        con.query(Sqlquery, (err, result) => {
            if (err) throw err;
            res.send(result)
            console.log(result);


        })

    } catch (error) {

        console.log(error);

    }
}



const SearchCustomer = (req, res) => {

    try {
        let ID = { Id: req.query.ID };
        let Name = { Name: req.query.Name };
        let MobileNO = { MobileNO: req.query.MobileNO };
        let Data = [ID.Id, Name.Name, MobileNO.MobileNO]


        let Sqlquery = " SELECT * FROM tbl_Customer WHERE ID= (?) or Name = (?) or MobileNO = (?)"

        con.query(Sqlquery, Data, (err, result) => {
            if (err) throw err;
            res.send(result);
            console.log(result);
        })
    } catch (error) {
        console.log(error);
    }

}

const UpdateCustomer = (req, res) => {
    try {
        let ID = req.params.ID;
        console.log(ID);
        let Data = req.body;
        let UpdateAT = new Date();
        UpdateAT = UpdateAT.toLocaleString();
        UpdateAT = UpdateAT.replaceAll(',', '');
        console.log(UpdateAT);

        Data = [
            req.body.Name,
            req.body.MobileNO,
            UpdateAT
        ]

        let Sqlquery = "UPDATE tbl_Customer SET Name =?,MobileNO =?,UpdateAt =? WHERE id =  " + ID + ""
        con.query(Sqlquery, Data, (err, result) => {
            if (err) throw err;
            res.send(result);
            console.log(result);



        });
    } catch (error) {
        console.log(error);
    }
}

// Delete Book from Params
const DeleteCustomer = (req, res) => {
    try {

        let ID = req.params.ID;


        let Sqlquery = "DELETE FROM tbl_Customer WHERE ID = (?)";

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
    AddCustomer,
    GetCustomerList,
    SearchCustomer,
    DeleteCustomer,
    UpdateCustomer
}