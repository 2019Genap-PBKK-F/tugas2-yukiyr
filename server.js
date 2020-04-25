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
    user: 'sa',
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
// Data Dasar
app.get("/api/DataDasar", function(req, res)
{
  var query = "select * from DataDasar";
  executeQuery(res, query, null, 0);
});

app.post("/api/DataDasar", function(req, res)
{
  var param = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'create_date', sqltype: sql.Char, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Char, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.Char, value: req.body.expired_date }
  ]

  var query = 'insert into DataDasar ( nama, create_date, last_update, expired_date ) values( @nama, @create_date, @last_update, @expired_date)';
  executeQuery(res, query, param, 1)
})

app.put('/api/DataDasar/:id',function(req,res){
  var param = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'create_date', sqltype: sql.Char, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Char, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.Char, value: req.body.expired_date }
  ]

  var query = "update DataDasar set nama = @nama, create_date = @create_date, last_update = @last_update, expired_date = @expired_date WHERE id =" + req.params.id;
  executeQuery(res,query, param, 1);
});

app.delete("/api/DataDasar/:id", function(req, res)
{
  var query = "delete from DataDasar where id=" + req.params.id;
  executeQuery(res, query, null, 0);
})

// Aspek
app.get("/api/Aspek", function(req, res)
{
  var query = "select * from Aspek";
  executeQuery(res, query, null, 0);
});

app.post("/api/Aspek", function(req, res)
{
  var param = [
    { name: 'aspek', sqltype: sql.VarChar, value: req.body.aspek },
    { name: 'komponen_aspek', sqltype: sql.VarChar, value: req.body.komponen_aspek }
  ]

  var query = 'insert into Aspek ( aspek, komponen_aspek ) values( @aspek, @komponen_aspek )';
  executeQuery(res, query, param, 1)
})

app.put('/api/Aspek/:id',function(req,res){
  var param = [
    { name: 'aspek', sqltype: sql.VarChar, value: req.body.aspek },
    { name: 'komponen_aspek', sqltype: sql.VarChar, value: req.body.komponen_aspek }
  ]

  var query = "update Aspek set aspek = @aspek, komponen_aspek = @komponen_aspek WHERE id =" + req.params.id;
  executeQuery(res,query, param, 1);
});

app.delete("/api/Aspek/:id", function(req, res)
{
  var query = "delete from Aspek where id=" + req.params.id;
  executeQuery(res, query, null, 0);
})

// Master Indikator
app.get("/api/MasterIndikator", function(req, res)
{
  var query = "select * from MasterIndikator";
  executeQuery(res, query, null, 0);
});

app.post("/api/MasterIndikator", function(req, res)
{
  var param = [
    { name: 'id_aspek', sqltype: sql.Int, value: req.body.id_aspek },
    { name: 'id_penyebut', sqltype: sql.Int, value: req.body.id_penyebut },
    { name: 'id_pembilang', sqltype: sql.Int, value: req.body.id_pembilang },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'deskripsi', sqltype: sql.VarChar, value: req.body.deskripsi },
    { name: 'default_bobot', sqltype: sql.Float, value: req.body.default },
    { name: 'create_date', sqltype: sql.Char, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Char, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.Char, value: req.body.expired_date }
  ]

  var query = 'insert into MasterIndikator ( id_aspek, id_penyebut, id_pembilang, nama, deskripsi, default_bobot, create_date, last_update, expired_date ) values( @id_aspek, @id_penyebut, @id_pembilang, @nama, @deskripsi, @default_bobot, @create_date, @last_update, @expired_date)';
  executeQuery(res, query, param, 1)
})

app.put('/api/MasterIndikator/:id',function(req,res){
  var param = [
    { name: 'id_aspek', sqltype: sql.Int, value: req.body.id_aspek },
    { name: 'id_penyebut', sqltype: sql.Int, value: req.body.id_penyebut },
    { name: 'id_pembilang', sqltype: sql.Int, value: req.body.id_pembilang },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'deskripsi', sqltype: sql.VarChar, value: req.body.deskripsi },
    { name: 'default_bobot', sqltype: sql.Float, value: req.body.default_bobot },
    { name: 'create_date', sqltype: sql.Char, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Char, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.Char, value: req.body.expired_date }
  ]

  var query = "update MasterIndikator set id_aspek = @id_aspek, id_penyebut = @id_penyebut, id_pembilang = @id_pembilang, nama = @nama, deskripsi = @deskripsi, default_bobot = @default_bobot, create_date = @create_date, last_update = @last_update, expired_date = @expired_date WHERE id =" + req.params.id;
  executeQuery(res,query, param, 1);
});

app.delete("/api/MasterIndikator/:id", function(req, res)
{
  var query = "delete from MasterIndikator where id=" + req.params.id;
  executeQuery(res, query, null, 0);
})
