import { exec } from "child_process";
import path from 'path';
import { keyboard } from "@nut-tree/nut-js";
import { Key } from "@nut-tree/nut-js/dist/lib/key.enum.js";
import express from 'express';
import ngrok from 'ngrok';


//Configurações globais
const portValue = 4000;
const __dirname = path.resolve();
var app = express();

//Midleware
app.use(express.static(__dirname + '/public')); // aqui eu determino onde o script deverá procurar os demais arquivos na localhost, que no caso é a pasta raiz, isso é importante para usar arquivos javascript no html.
console.log(__dirname)


//Endpoints
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html')); //remover o /project, quando for rodar na máquina e não no pen-driver
})

app.get('/next', function(req, res) {
  keyboard.pressKey(Key.Right);
  console.log('next');
  res.redirect('..');
  
})

app.get('/back', function(req, res) {
  keyboard.pressKey(Key.Left);
  console.log('back');
  res.redirect('..');
})

app.get('/desligar', function(req, res) {
  exec("shutdown -s -t 60");
  console.log('Desligando o computador');
  res.redirect('..');
})


//NGROK
const urlNgrok = await ngrok.connect(portValue);

app.listen(portValue, function() {
  console.log('App listening on port ',portValue);
  console.log('Domain: ', urlNgrok);
})

