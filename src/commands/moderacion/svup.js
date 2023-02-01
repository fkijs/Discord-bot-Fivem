const { MessageEmbed } = require('discord.js');

module.exports.run = async(client, message, args) => {
    const { name } = message.guild;
    const icon = message.guild.iconURL();
    if (message.member.hasPermission('ADMINISTRATOR')){     
    message.channel.send('|| @everyone ||')
    const info = new MessageEmbed()
        .setTitle('Informacion del servidor')
        // .setURL('')
        .setAuthor(name, icon)
        .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
        .setDescription('- El servidor se encuentra actualmente ONLINE - :white_check_mark:')
        .addField('Ip:', 'Pronto.. :D')
        .setImage('')
        .setFooter('Que disfrutes del server!')
        .setTimestamp()
    message.channel.bulkDelete(1, true)
    message.channel.send(info)
    // console.log(name, region, memberCount, icon )
    }
}