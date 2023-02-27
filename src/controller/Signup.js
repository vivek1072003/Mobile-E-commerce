const express = require('express');
const con = require('../conn/conn');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const token = "SPASaloon"

const SignUP = async (req, res, next) => {
    let value = req.body.Password;
    const salt = await bcrypt.genSalt(10);
    value = await bcrypt.hash(value, salt);
    console.log(value);
    let Data = {
        Name: req.body.Name,
        Mobile: req.body.Mobile,
        Email: req.body.Email,
        Password: value
    }
    var sql = "INSERT INTO tbl_SignUp SET = ?"
    con.query(sql, Data, function (err, result) {
        if (err) throw err;
        console.log(result);
        jwt.sign({ result }, token, { expiresIn: '3600s' }, function (err, token) {
            //  res.send("Token : " + token);
            res.send({ result, auth: token });
        });

    });

}
module.exports = {
    SignUP
}
