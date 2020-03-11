const express = require("express");
const app = express();
const sql = require('mssql')
const hostname = '10.199.14.46';
const port = 8005;

//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const config = {
    user: 'su',
    password: 'SaSa1212',
    server: '10.199.13.253',
    database: 'nrp05111740000023'
};

var executeQuery = function(res, query, param, reqType) {
  sql.connect(config, function(err){
    if(err) {
      res.end('Connection Error\n' + err)
    }
    else {
      var request = new sql.Request()
      if(reqType != 0) {
        param.forEach(function(p)
        {
          request.input(p.name, p.sqltype, p.value);
        });
      }
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

app.get("/api/Mahasiswa", function(req, res)
{
  var query = "select * from Mahasiswa";
  executeQuery(res, query, null, 0);
});

app.post("/api/Mahasiswa", function(req, res)
{
  var param = [
    { name: 'NRP', sqltype: sql.VarChar, value: req.body.NRP },
    { name: 'Nama', sqltype: sql.VarChar, value: req.body.Nama },
    { name: 'Tgl_lahir', sqltype: sql.Char, value: req.body.Tgl_lahir }
  ]

  var query = 'insert into Mahasiswa ( NRP, Nama, Tgl_lahir ) values( @NRP, @Nama, @Tgl_lahir)';
  executeQuery(res, query, param, 1)
})

app.put('/api/Mahasiswa/:Id',function(req,res){
  var param = [
    { name: 'Id', sqltype: sql.Int, value: req.body.Id }, 
    { name: 'NRP', sqltype: sql.VarChar, value: req.body.NRP },
    { name: 'Nama', sqltype: sql.VarChar, value: req.body.Nama },
    { name: 'Tgl_lahir', sqltype: sql.Char, value: req.body.Tgl_lahir }
  ]

  var query = "update Mahasiswa set NRP = @NRP, Nama = @Nama, Tgl_lahir = @Tgl_lahir WHERE Id =" + req.params.Id;
  executeQuery(res,query, param, 1);
});

app.delete("/api/Mahasiswa/:Id", function(req, res)
{
  var query = "delete from Mahasiswa where Id=" + req.params.Id;
  executeQuery(res, query, null, 0);
})

app.listen(port, hostname, function () {
  var message = "Server runnning on Port: " + port;
  console.log(message);
});
