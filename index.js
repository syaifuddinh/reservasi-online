var express = require('express')
var app = express()
app.set('view engine', 'pug')
app.use('/assets', express.static('assets'))
var globalInfo = {homeTitle : 'Dashboard', homeLink : '/'}

// Menggunakan cookie parser
var cookieParser = require('cookie-parser')
app.use(cookieParser())
// Menggunakan session
var session = require('express-session')
app.use(session({ secret: 'this-is-a-secret-token'}));
// Memvalidasi apakah user sudah login atau belum login
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))




app.get('/', function (req, res) {
	
	// Mengambil data poli melalui API, data diolah dlam bentuk JSON
	var request = require('request');
	request('http://192.168.0.20:2003/api/poli', function (error, response, body) {
	  if(!error) {
		  var data = {title: 'Daftar Poli', daftarPoli : JSON.parse(body)}
		  res.render('dashboard', data)
	  }
	  else {
	  	console.log('Error: ' + error)
	  }
	});
})

app.get('/poli/:id', function (req, res) {
	
	var id = req.params.id
	// Mengambil data poli melalui API, data diolah dlam bentuk JSON
	var request = require('request');
	request(`http://192.168.0.20:2003/api/poli/${id}`, function (error, response, body) {
	  if(!error) {
		  var data = {title: 'Daftar Poli', daftarDokter : JSON.parse(body), idPoli : id}
		  res.render('poli/daftar-dokter', data)
	  }
	  else {
	  	console.log('Error: ' + error)
	  }
	});
})

app.get('/form-reservasi/:idPoli/:idDokter', function(req, res){
	res.render('poli/form-reservasi')
})

app.post('/submit-reservation', function(req, res){
	var params = {
		namaPasien : req.body.namaPasien,
		keluhan : req.body.keluhan,
		tanggalReservasi : req.body.tanggalReservasi,
		waktuReservasi : req.body.waktuReservasi,
		jenisLayanan : req.body.jenisLayanan
	}
})

// Dummy API =========================================================

app.get('/api/poli', function (req, res) {
 var data = [
 	{
 		idPoli : 1,
 		namaPoli : "Poli Gigi",
 		jumlahAntrian : 10
 	},
 	{
 		idPoli : 2,
 		namaPoli : "Poli Mata",
 		jumlahAntrian : 6
 	},
 	{
 		idPoli : 3,
 		namaPoli : "Poli Anak",
 		jumlahAntrian : 7
 	},
 	{
 		idPoli : 4,
 		namaPoli : "Poli THT",
 		jumlahAntrian : 2
 	},
 ]
 res.json(data);	
})

app.get('/api/poli/:id', function (req, res) {
 var id = req.params ? req.params.id : null;	

 var data = [
 	{
 		idDokter : 1,
 		namaDokter : "Dr. Ihsan Wiranagara",
 		jumlahAntrian : 3
 	},
 	{
 		idDokter : 2,
 		namaDokter : "Dr. Nadia Sekar Ayu",
 		jumlahAntrian : 5
 	},
 	{
 		idDokter : 3,
 		namaDokter : "Dr. Wildan Pangaribuan",
 		jumlahAntrian : 6
 	},
 ]

 res.json(data);	
})



app.listen(2003, '192.168.0.20', () => console.log('Example app listening on port 2003!'))
