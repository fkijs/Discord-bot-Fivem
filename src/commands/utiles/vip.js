const { MessageEmbed } = require('discord.js');

module.exports.run = async(client, message, args) => {
    const embed = new MessageEmbed()
        .setTitle('Ingresa aqui para ver los VIPs!')
        .setURL('')
        .setAuthor('Nombre srver', '')
        .setFooter('')
        .setTimestamp()
        message.delete()
        message.reply('**Se ha enviado un mensaje directo con toda la informacion.**').then(msg => msg.delete({ timeout: 7000 }));
        message.author.send(embed);
}


