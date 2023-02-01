var config = require('../../bdd.js');
const { RolID } = require('../../../config.json');
const { MessageEmbed } = require('discord.js');
var connection= config.connection


module.exports.run = async(client, message, args) => {
    const icon = message.guild.iconURL();
    const telEmbed = new MessageEmbed()
    .setFooter("MrcSQLSystem")
    if (message.member.roles.cache.find(r => r.id === RolID)) {
        let hex = args[0]
        if (hex.startsWith("steam:") === false) {
            hex = `steam:${hex}`
        }
        let amount = args[1]

        connection.query("SELECT * FROM users WHERE identifier = ?",hex,(err,result) => {
            let user = result[0]
            if (user) {
                connection.query(`UPDATE users SET money = '${amount}' WHERE identifier = '${steamhex}`,(err,result) => {
                    if (err) console.log(err)
                    telEmbed.setColor("GREEN")
                    .setTitle("¡La transacción es exitosa!")
                    .setAuthor("Servidor - SQL", icon)
                    message.channel.send(telEmbed)
                })
            } else {
                telEmbed.setColor("RED")
                .setDescription(`No se encontró ningún usuario con el ID hex ingresado.`)
                .setTitle("¡operación fallida!")
                .setAuthor("Servidor - SQL", icon)
                message.channel.send(telEmbed)
                return;
            }
        })
    } else {
        telEmbed.setColor("RED")
        .setAuthor("Servidor - SQL", icon)
        .setDescription(`¡No tienes la autorización necesaria para hacer esto!`)
        message.channel.send(telEmbed)
        return;
    }
}
