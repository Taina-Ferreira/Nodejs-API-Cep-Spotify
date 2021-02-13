const fetch = require('node-fetch');

const buscaCep = async (cep) => {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    return await response.json();
}

module.exports = buscaCep;