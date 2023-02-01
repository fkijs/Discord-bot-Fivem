const { MessageEmbed } = require('discord.js');
module.exports.run = async(client, message, args) => {
    const icon = message.guild.iconURL();
    const normativas = new MessageEmbed()
        .setTitle('Normativas')
        .setAuthor('', icon)
        // .setURL('')
        .addField('**Gracias por leer las normativas**', '*Para descargar click en el titulo*')
        // .setThumbnail('')
        .setTimestamp()
    message.channel.bulkDelete(1, true)
    message.author.send(normativas);
}