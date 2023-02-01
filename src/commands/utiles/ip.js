const Discord = require('discord.js');
const cheerio = require('cheerio');
const axios = require('axios');

module.exports.run = async(client, message, args) => {
    const icon = message.guild.iconURL();
    // axios.get('https://cfx.re/join/d99zy3')
    //     .then(res => {
    //         const $ = cheerio.load(res.data);
    //         const text = ($("body > main > p").text());
    //         let resultado = text.substring(5,7)
    //         if (resultado === '{' || resultado === '{{') {
    //             resultado = '0';
    //         }
            const embed = new Discord.MessageEmbed()
            .setTitle("Lista de jugadores online")
            .setAuthor('Servidor', icon)
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
            .addField('Jugadores online:', `0/64`) // ${resultado.toUpperCase()}
            .addField('IP:', '**connect PRONTO..**')
            .setColor("#000")
            .setImage('')
            .setFooter(`Solicitado por: ${message.author.tag}`, message.author.avatarURL)
            .setTimestamp()
            message.channel.bulkDelete(1, true)
            message.channel.send(embed).then(msg => msg.delete({ timeout: 15000 }))
        // })       
}



