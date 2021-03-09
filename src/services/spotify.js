require('dotenv/config');
var SpotifyWebApi = require('spotify-web-api-node');


var spotifyApi = new SpotifyWebApi({
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  redirectUri: 'localhost:4000/'
});

const login = async () => {
    const credencial = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(credencial.body['access_token']);
}

const buscaAlbum = async (artistId) => {

    await login();
    const response = await spotifyApi.getArtistAlbums(artistId,{limit: 30});

    const items = response.body.items;

    const inseridos = [];
    const uniqueItems = [];

    items.forEach((item) => {
        if (!inseridos.includes(item.name)) {
            inseridos.push(item.name);
            uniqueItems.push(item);
        }
    });


    const shuffle = (a) => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    shuffle(uniqueItems);

    return uniqueItems;
}

const buscaArtista = async (artista) => {
    await login();
    const response = await spotifyApi.searchArtists(artista,{limit: 1});
    return response;
}

module.exports = {buscaAlbum,buscaArtista};