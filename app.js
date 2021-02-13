var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var buscaCep = require('./src/services/cep');
var spotify = require('./src/services/spotify');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.get ('/',(req, res) => {
    res.render("index")
});

app.get('/cep',(req,res)=>{
    res.render("buscaCep")
})

app.post('/cep',async (req,res)=>{
    const { cep } = req.body
    const resultado = await buscaCep(cep);
    res.render("exibirCep",{data:resultado})
});

app.get('/artista', (req,res)=>{
    res.render('buscaAlbum')
})

app.post('/artista',async(req,res)=>{
    const {nomeArtista} = req.body
    const artista = await spotify.buscaArtista(nomeArtista);
    const id_artista = artista['body']['artists']['items'][0]['id'];

    const album = await spotify.buscaAlbum(id_artista);

    res.render('exibirArtista',{artista:artista,album:album})
    //res.send(album)
})



app.listen(4000,() => console.log("servidor rodando"))