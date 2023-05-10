import { exec } from "child_process";
import path from 'path';
import { keyboard } from "@nut-tree/nut-js";
import { Key } from "@nut-tree/nut-js/dist/lib/key.enum.js";
import express from 'express';



//Configurações globais
const port = 3000;
const __dirname = path.resolve();
var app = express();

//midleware
app.use(express.static(__dirname + '/public')); // aqui eu determino onde o script deverá procurar os demais arquivos na localhost, que no casso é a pasta raiz, isso é importante para usar arquivos javascript no html.
console.log(__dirname)

//Endpoints
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html')); //remover o /project, quando for rodar na máquina
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
  exec("shutdown -s -t 0");
  console.log('Desligando o computador');
  res.redirect('..');
})


//SERVER START UP
app.listen(port, function() {
  console.log('App listening on port ', 3000);
})