var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId: '<>',
  clientSecret: '<>',
  redirectUri: 'localhost:4000/'
});

const login = async () => {
    const credencial = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(credencial.body['access_token']);
}

const buscaAlbum = async (artistId) => {

    await login();
    const response = await spotifyApi.getArtistAlbums(artistId,{limit: 21});
    return response;
}

const buscaArtista = async (artista) => {
    await login();
    const response = await spotifyApi.searchArtists(artista,{limit: 1});
    return response;
}

module.exports = {buscaAlbum,buscaArtista};