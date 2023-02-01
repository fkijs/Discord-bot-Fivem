const cheerio = require('cheerio');
const axios = require('axios');

module.exports = {
    updatePlayerCount: (client, seconds) => {
        const interval = setInterval(function setStatus() {
            axios.get('')
                .then(res => {
                    const $ = cheerio.load(res.data);
                    let text = ($("body > main > p").text());
                    let resultado = text.substring(5, 7);
                    if (resultado == '{{' || resultado == '{') return;
                    let status = `${resultado} jugador/es`
                    client.user.setActivity(status, { type: 'WATCHING' })
                })
            return setStatus;
        }(), seconds * 1000)
    }
}