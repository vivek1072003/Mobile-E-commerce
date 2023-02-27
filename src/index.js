const express = require('express')
const conn = require('./Connection/conn')
const router = require('./Route/Route')
const bodyParser = require('body-parser');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const token = "SPASaloon"
const port = 3000
const app = express()
app.use(express.json());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Customer API",
        description: "Customer API Information",
        contact: {
          name: "Amazing Developer"
        },
        servers: ["http://localhost:3000"]
      }
    },
    apis: ['./Route/Route.js']
    // apis: ["index.js"]
  };

  

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

const Login = async (req, res, next) => {
  let { Email, Password } = req.body
  var sql = 'SELECT * FROM tbl_SignUp WHERE Email = ?';
  let EmailData = con.query(sql, Email, async function (err, result) {
      if (err) throw err;
      if (result == 0) {
          res.send({
              message: "Please enter a valid email"
          })
      } else {
          const hashedPassword = result[0].Password
          console.log(hashedPassword);
          if (await bcrypt.compare(Password, hashedPassword)) {
              console.log("---------Login Successful--------")
              jwt.sign({ result }, jwttoken, { expiresIn: '3600s' }, function (err, token) {
                  console.log(result);
                  for (var a = 0; a < result.length; a++) {

                      res.send({ Name: result[a].FirstName, UserType: result[a].UserType, Status: result[a].Status, auth: token });
                      console.log(result[a].UserType);
                      console.log(result[a].FirstName);
                      console.log(result[a].Status);
                  }
              })
          }
          else {
              console.log(" Password Incorrect");
              res.send({ message: "Password Incorrect" });
          }
      }
  })
}

app.use('/', router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))