//busybox reboot
//killall -9 node
//ps ax

const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app).listen(process.env.PORT || 3030, () => {
  console.log("server running...")
});
const JSONdb = require('simple-json-db');

app.use(express.static('./public'))
app.use('/vendor', express.static('./node_modules'))
app.set("views", "./public");
app.set("view engine", "html");
//Redirecionamentos
app.get("/", (req, res) => {
  try {
    return res.render('index.html')
  } catch {
    console.log("/ error")
  }
})
app.get("/graph.html", (req, res) => {
  try {
    return res.render('graph.html')
  } catch {
    console.log("/ error")
  }
})
app.get("/json", (req, res) => {
  try {
    const db = new JSONdb('data.json');
    const data = db.JSON();
    return res.json(data)
  }
  catch {
    return res.json('404');
  }
})
app.get("/wake", (req, res) => {
  console.log("running...")
  return res.json('200')
})
app.get("/data", (req, res) => {
  try {
    trigger(req)
    return res.json('200')
  } catch {
    return res.json('200')
  }
})
//Outras funcoes
async function trigger(req) {
  const db = new JSONdb('data.json');
  const timestamp = Date.now();
  const date = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
  const url = req.query['url']
  const shopid = req.query['shopid']
  const source = req.query['source']
  const data = { 'date': date, 'timestamp': timestamp, 'shopid': shopid, 'url': url, 'source': source };
  try {
    if (url) {
      db.set(timestamp, data);
    }
  } catch (err) {
    console.error(err);
  }
}