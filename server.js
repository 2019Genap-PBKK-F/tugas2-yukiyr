const express = require("express");
const app = express();
const sql = require('mssql')
const hostname = '10.199.14.46';
const port = 8005;


const config = {
    user: 'su',
    password: 'SaSa1212',
    server: '10.199.13.253',
    database: 'nrp05111740000023'
};

var executeQuery = function(res, query) {
  sql.connect(config, function(err){
    if(err) {
      res.end('Connection Error\n' + err)
    }
    else {
      var request = new sql.Request()
      request.query(query, function(err, response){
        if(err) {
          console.log('Query Error\n' + err)
        }
        else{
          res.send(response.recordset)
        }
     })
    }
  })
}

app.get("/",function(req, res)
{
  res.end('Hello World');
});

app.get("/api/mahasiswa", function(req, res)
{
  var query = "select * from mahasiswa";
  executeQuery(res, query);
});

app.listen(port, function () {
  console.log('Server is running..');
});