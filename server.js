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

// Dosen
app.get("/api/Dosen", function(req, res)
{
  var query = "select * from Dosen";
  executeQuery(res, query, null, 0);
});

// Penelitian
app.get("/api/Penelitian", function(req, res)
{
  var query = "select * from Penelitian";
  executeQuery(res, query, null, 0);
});

// Abmas
app.get("/api/Abmas", function(req, res)
{
  var query = "select * from Abmas";
  executeQuery(res, query, null, 0);
});

// Publikasi
app.get("/api/Publikasi", function(req, res)
{
  var query = "select * from Publikasi";
  executeQuery(res, query, null, 0);
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
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'create_date', sqltype: sql.Char, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Char, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.Char, value: req.body.expired_date }
  ]

  var query = 'insert into DataDasar ( id, nama, create_date, last_update, expired_date ) values( @id, @nama, @create_date, @last_update, @expired_date)';
  executeQuery(res, query, param, 1)
})

app.put('/api/DataDasar/:id',function(req,res){
  var param = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
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
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'aspek', sqltype: sql.VarChar, value: req.body.aspek },
    { name: 'komponen_aspek', sqltype: sql.VarChar, value: req.body.komponen_aspek }
  ]

  var query = 'insert into Aspek ( id, aspek, komponen_aspek ) values( @id, @aspek, @komponen_aspek )';
  executeQuery(res, query, param, 1)
})

app.put('/api/Aspek/:id',function(req,res){
  var param = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
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
    { name: 'id', sqltype: sql.Int, value: req.body.id },
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

  var query = 'insert into MasterIndikator ( id, id_aspek, id_penyebut, id_pembilang, nama, deskripsi, default_bobot, create_date, last_update, expired_date ) values( @id, @id_aspek, @id_penyebut, @id_pembilang, @nama, @deskripsi, @default_bobot, @create_date, @last_update, @expired_date)';
  executeQuery(res, query, param, 1)
})

app.put('/api/MasterIndikator/:id',function(req,res){
  var param = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
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

// Jenis Satker
app.get("/api/JenisSatker", function(req, res)
{
  var query = "select * from JenisSatker";
  executeQuery(res, query, null, 0);
});

app.post("/api/JenisSatker", function(req, res)
{
  var param = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'create_date', sqltype: sql.Char, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Char, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.Char, value: req.body.expired_date }
  ]

  var query = 'insert into JenisSatker ( id, nama, create_date, last_update, expired_date ) values( @id, @nama, @create_date, @last_update, @expired_date)';
  executeQuery(res, query, param, 1)
})

app.put('/api/JenisSatker/:id',function(req,res){
  var param = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'create_date', sqltype: sql.Char, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Char, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.Char, value: req.body.expired_date }
  ]

  var query = "update JenisSatker set nama = @nama, create_date= @create_date, last_update = @last_update, expired_date = @expired_date WHERE id =" + req.params.id;
  executeQuery(res,query, param, 1);
});

app.delete("/api/JenisSatker/:id", function(req, res)
{
  var query = "delete from JenisSatker where id=" + req.params.id;
  executeQuery(res, query, null, 0);
})

// Periode
app.get("/api/Periode", function(req, res)
{
  var query = "select * from Periode";
  executeQuery(res, query, null, 0);
});

app.post("/api/Periode", function(req, res)
{
  var param = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'create_date', sqltype: sql.Char, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Char, value: req.body.last_update }
  ]

  var query = 'insert into Periode ( nama, create_date, last_update ) values( @nama, @create_date, @last_update )';
  executeQuery(res, query, param, 1)
})

app.put('/api/Periode/:id',function(req,res){
  var param = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'create_date', sqltype: sql.Char, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Char, value: req.body.last_update }
  ]

  var query = "update Periode set nama = @nama, create_date = @create_date, last_update = @last_update WHERE id =" + req.params.id;
  executeQuery(res,query, param, 1);
});

app.delete("/api/Periode/:id", function(req, res)
{
  var query = "delete from Periode where id=" + req.params.id;
  executeQuery(res, query, null, 0);
})

// Indikator Periode
app.get("/api/Indikator_Periode", function(req, res)
{
  var query = "select * from Indikator_Periode";
  executeQuery(res, query, null, 0);
});

app.post("/api/Indikator_Periode", function(req, res)
{
  var param = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_periode', sqltype: sql.Int, value: req.body.id_periode },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobo }
  ]

  var query = 'insert into Indikator_Periode ( id, id_master, id_periode, bobot) values( @id, @id_master, @id_periode, @bobot)';
  executeQuery(res, query, param, 1)
})

app.put('/api/Indikator_Periode/:id',function(req,res){
  var param = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_periode', sqltype: sql.Int, value: req.body.id_periode },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot }
  ]

  var query = "update Indikator_Periode set bobot = @bobot, id_master = @id_master, id_periode = @id_periode WHERE id =" + req.params.id;
  executeQuery(res,query, param, 1);
});

app.delete("/api/Indikator_Periode/:id", function(req, res)
{
  var query = "delete from Indikator_Periode where id=" + req.params.id;
  executeQuery(res, query, null, 0);
})

// Satuan Kerja
app.get("/api/SatuanKerja", function(req, res)
{
  var query = "select * from SatuanKerja";
  executeQuery(res, query, null, 0);
});

app.post("/api/SatuanKerja", function(req, res)
{
  var param = [
    { name: 'id', sqltype: sql.VarChar, value: req.body.id },
    { name: 'id_jns_satker', sqltype: sql.Int, value: req.body.id_jns_satker },
    { name: 'id_induk_satker', sqltype: sql.VarChar, value: req.body.id_induk_satker },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'level_unit', sqltype: sql.VarChar, value: req.body.level_unit },
    { name: 'create_date', sqltype: sql.VarChar, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.VarChar, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.VarChar, value: req.body.expired_date },
    { name: 'email', sqltype: sql.VarChar, value: req.body.email }
  ]

  var query = 'insert into SatuanKerja ( id, id_jns_satker, id_induk_satker, nama, level_unit, create_date, last_update, expired_date, email ) values( @id, @id_jns_satker, @id_induk_satker, @nama, @level_unit, @create_date, @last_update, @expired_date, @email )';
  executeQuery(res, query, param, 1)
})

app.put('/api/SatuanKerja/:id',function(req,res){
  var param = [
    { name: 'id', sqltype: sql.VarChar, value: req.body.id },
    { name: 'id_jns_satker', sqltype: sql.Int, value: req.body.id_jns_satker },
    { name: 'id_induk_satker', sqltype: sql.VarChar, value: req.body.id_induk_satker },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'level_unit', sqltype: sql.VarChar, value: req.body.level_unit },
    { name: 'create_date', sqltype: sql.VarChar, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.VarChar, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.VarChar, value: req.body.expired_date },
    { name: 'email', sqltype: sql.VarChar, value: req.body.email }
  ]

  var query = "update SatuanKerja set id_jns_satker = @id_jns_satker, id_induk_satker = @id_induk_satker, nama = @nama, level_unit = @level_unit, create_date = @create_date, last_update = @last_update, expired_date = @expired_date, email = @email WHERE id ='" + req.params.id + "'";
  executeQuery(res,query, param, 1);
});

app.delete("/api/SatuanKerja/:id", function(req, res)
{
  var query = "delete from SatuanKerja where id='" + req.params.id + "'";
  executeQuery(res, query, null, 0);
})

// Capaian Unit
app.get("/api/Capaian_Unit", function(req, res)
{
  var query = "select * from Capaian_Unit";
  executeQuery(res, query, null, 0);
});

app.post("/api/Capaian_Unit", function(req, res)
{
  var param = [
    { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
    { name: 'id_datadasar', sqltype: sql.Int, value: req.body.id_datadasar },
    { name: 'waktu', sqltype: sql.Char, value: req.body.waktu },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capai }
  ]

  var query = 'insert into Capaian_Unit ( id_satker, id_datadasar, waktu, capaian ) values( @id_satker, @id_datadasar, @waktu, @capaian )';
  executeQuery(res, query, param, 1)
})

app.put('/api/Capaian_Unit/:id_datadasar',function(req,res){
  var param = [
    { name: 'waktu', sqltype: sql.Char, value: req.body.waktu },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
  ]

  var query = "update Capaian_Unit set waktu = @waktu, capaian = @capaian WHERE id_datadasar =" + req.params.id_datadasar;
  executeQuery(res,query, param, 1);
});

app.delete("/api/Capaian_Unit/:id_datadasar", function(req, res)
{
  var query = "delete from Capaian_Unit where id_datadasar=" + req.params.id_datadasar;
  executeQuery(res, query, null, 0);
})

// Indikator Satuan Kerja
app.get("/api/Indikator_SatuanKerja", function(req, res)
{
  var query = "select * from Indikator_SatuanKerja";
  executeQuery(res, query, null, 0);
});

app.get("/api/Indikator_SatuanKerja/:id", function(req, res)
{
    var query = "select * from Indikator_SatuanKerja where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});

app.post("/api/Indikator_SatuanKerja", function(req, res)
{
  var param = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_indikator_periode', sqltype: sql.Int, value: req.body.id_indikator_periode },
    { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot },
    { name: 'target', sqltype: sql.Float, value: req.body.target },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian },
    { name: 'persentase_capaian', sqltype: sql.VarChar, value: req.body.persentase_capaian },
    { name: 'last_update', sqltype: sql.VarChar, value: req.body.last_update }
  ]

  var query = 'insert into Indikator_SatuanKerja ( id, id_indikator_periode, id_satker, bobot, target, capaian, persentase_capaian, last_update ) values( @id, @id_indikator_periode, @id_satker, @bobot, @target, @capaian, @persentase_capaian, @last_update )';
  executeQuery(res, query, param, 1)
})

app.put('/api/Indikator_SatuanKerja/:id',function(req,res){
  var param = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_indikator_periode', sqltype: sql.Int, value: req.body.id_indikator_periode },
    { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot },
    { name: 'target', sqltype: sql.Float, value: req.body.target },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian },
    { name: 'persentase_capaian', sqltype: sql.VarChar, value: req.body.persentase_capaian },
    { name: 'last_update', sqltype: sql.Char, value: req.body.last_update }
  ]

  var query = "update Indikator_SatuanKerja set id_indikator_periode = @id_indikator_periode, id_satker = @id_satker, bobot = @bobot, target = @target, capaian = @capaian, last_update = @last_update WHERE id =" + req.params.id;
  executeQuery(res,query, param, 1);
});

app.delete("/api/Indikator_SatuanKerja/:id", function(req, res)
{
  var query = "delete from Indikator_SatuanKerja where id=" + req.params.id;
  executeQuery(res, query, null, 0);
})

// Konkin
app.get("/api/konkin/:id", function(req, res)
{
    var query = "SELECT a.aspek, a.komponen_aspek, mi.nama, isk.bobot, isk.target, isk.capaian, isk.persentase_capaian as cap FROM aspek AS a inner JOIN MasterIndikator AS mi ON a.id=mi.id_aspek inner JOIN Indikator_SatuanKerja as isk ON isk.id_indikator_periode=mi.id where isk.id_satker='"+req.params.id+"'";
    executeQuery(res, query, null, 0);
});

app.get("/api/konkin/", function(req, res)
{
    var query = "SELECT a.aspek, a.komponen_aspek, mi.nama, isk.bobot, isk.target, isk.capaian, isk.persentase_capaian as cap FROM aspek AS a inner JOIN MasterIndikator AS mi ON a.id=mi.id_aspek inner JOIN Indikator_SatuanKerja as isk ON isk.id_indikator_periode=mi.id";
    executeQuery(res, query, null, 0);
});

// Indikator Satuan Kerja Log
app.get("/api/Indikator_SatuanKerja_Log", function(req, res)
{
  var query = "select * from Indikator_SatuanKerja_Log";
  executeQuery(res, query, null, 0);
});

app.post("/api/Indikator_SatuanKerja_Log", function(req, res)
{
  var param = [
    { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_periode', sqltype: sql.Int, value: req.body.id_periode },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capai },
    { name: 'create_date', sqltype: sql.Char, value: req.body.create }
  ]

  var query = 'insert into Indikator_SatuanKerja_Log ( id_satker, id_master, id_periode, capaian, create_date ) values( @id_satker, @id_master, @id_periode, @capaian, @create_date )';
  executeQuery(res, query, param, 1)
})

app.put('/api/Indikator_SatuanKerja_Log/:id_master',function(req,res){
  var param = [
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian },
    { name: 'create_date', sqltype: sql.Char, value: req.body.create_date }
  ]

  var query = "update Indikator_SatuanKerja_Log set capaian = @capaian, create_date = @create_date WHERE id_master =" + req.params.id_master;
  executeQuery(res,query, param, 1);
});

app.delete("/api/Indikator_SatuanKerja_Log/:id_master", function(req, res)
{
  var query = "delete from Indikator_SatuanKerja_Log where id_master=" + req.params.id_master;
  executeQuery(res, query, null, 0);
})

// Login

// auth
app.get('/auth/login/:email', function(req, res)
{
  var model = [
    { name: 'email', sqltype: sql.VarChar, value: req.params.email }
  ]
  var query = 'select id, nama, email from SatuanKerja where email = @email'

  executeQuery(res, query, model, 1)
})

// Mahasiswa
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
