const express = require('express');
const con = require('../Connection/conn');
const Validation = require('../Validation/Validation')



const AddMobile = async (req, res, next) => {

    try {

        let Data = {
            MobileName: req.body.MobileName,
            Discrition: req.body.Discrition,
            Auther: req.body.Auther
        }
        if (!Validation.isValid(Data.MobileName)) {
            return res.status(400).send({ status: false, message: "Please provide Mobile Name field 🛑" });
        }
        if (!Validation.isValid(Data.Discrition)) {
            return res.status(400).send({ status: false, message: "Please provide Ram field 🛑" });
        }
        if (!Validation.isValid(Data.Auther)) {
            return res.status(400).send({ status: false, message: "Please provide Brand Name field 🛑" });
        }

        Data = [Data.Auther, Data.Discrition, Data.Auther]

        var Sqlquery = "insert into tbl_book(MobileName,Ram,Brand) values(?,?,?)"
        con.query(Sqlquery, Data, function (err, result) {
            if (err) throw err;

            res.status(200).send({ Data: result });
            console.log(result);
        });


    } catch (error) {
        console.log(error);
    }



}

const GetMobileList = (req, res) => {

    try {


        let Sqlquery = "select *from tbl_book"
        con.query(Sqlquery, (err, result) => {
            if (err) throw err;
            res.send(result)
            // console.log(result);


        })

    } catch (error) {

        console.log(error);

    }
}


const SearchMobile = (req, res) => {

  try {
    let ID = { Id: req.query.ID };
    let MobileName = { MobileName: req.query.MobileName };
    let Auther = { Auther: req.query.Auther };
    let Data = [ID.Id, MobileName.MobileName, Auther.Auther]


    let Sqlquery = " SELECT * FROM tbl_book WHERE ID= (?) or MobileName = (?) or Auther = (?)"

    con.query(Sqlquery, Data, (err, result) => {
        if (err) throw err;
        res.send(result);
        console.log(result);
    }) 
  } catch (error) {
    console.log(error);
  }

}


const UpdateMobile = (req, res) => {
    try {
        let ID = req.params.ID;
        console.log(ID);
        let Data = req.body;
        let UpdateAT = new Date();
        UpdateAT = UpdateAT.toLocaleString();
        UpdateAT = UpdateAT.replaceAll(',', '');
        console.log(UpdateAT);
    
        Data = [
            req.body.MobileName,
            req.body.Discrition,
    
            req.body.Auther,
            UpdateAT
        ]
    
        // console.log(Data);
        let Sqlquery = "UPDATE tbl_book SET MobileName =?,Discrition =?,Auther =?,UpdateAt =? WHERE id =  " + ID + ""
        con.query(Sqlquery, Data, (err, result) => {
            if (err) throw err;
            res.send(result);
            console.log(result);
        
    
        }); 
    } catch (error) {
        console.log(error);
    }
}




const DeleteMobile = (req, res) => {
    try {
        
        let ID = req.params.ID;


        let Sqlquery = "DELETE FROM tbl_book WHERE ID = (?)";
    
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
    AddMobile,
    GetMobileList,
    SearchMobile,
    DeleteMobile,
    UpdateMobile
}