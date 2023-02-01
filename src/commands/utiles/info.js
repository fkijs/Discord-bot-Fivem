const { MessageEmbed } = require('discord.js');

module.exports.run = async(client, message, args) => {
    const { name, region, memberCount } = message.guild;
    const icon = message.guild.iconURL();

    const info = new MessageEmbed()
        .setTitle('Informacion del servidor')
        .setThumbnail(icon)
        .setAuthor(name, `${icon}`)
        .addField('Usuarios', memberCount)
        .addField('Server Actual', region)
        .setTimestamp()
    message.channel.bulkDelete(1, true)
    message.channel.send(info)
    // console.log(name, region, memberCount, icon )

}