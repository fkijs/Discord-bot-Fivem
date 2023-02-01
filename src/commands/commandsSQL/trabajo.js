var config = require('../../bdd.js');
const { RolID } = require('../../../config.json');
const { MessageEmbed } = require('discord.js');
var connection= config.connection


module.exports.run = async(client, message, args) => {
    const icon = message.guild.iconURL();
    const jobEmbed = new MessageEmbed()
    .setFooter("MrcSQLSystem")
    if(message.member.roles.cache.find(r => r.id === RolID)) {
        let hex = args[0]
        if (hex.startsWith("steam:") === false) {
            hex = `steam:${hex}`
        }
        let trabajo = args[1]
        let grade = parseInt(args[2])
        if (!hex || !trabajo || !grade) return message.channel.send("Uso incorrecto ! \nEj:!trabajo 11000010aceb57a police 1")
        connection.query("SELECT * FROM users WHERE identifier = ?",hex,(err,result) => {
            let user = result[0]
            let antiguo = user.job
            let lastjob = user.job_grade
            if (user) {
                connection.query(`UPDATE users SET job = '${trabajo}' WHERE job = '${user.job}'`, (err,result) => {
                    if (err) console.log(err)
                })
                connection.query(`UPDATE users SET job_grade = ${grade} WHERE job_grade = ${user.job_grade}`, (err,result) => {
                    if (err) console.log(err)
                })
                jobEmbed.setColor("GREEN")
                .setDescription(`${hex} El id ingresado es valido, La antigua profesión \`${antiguo}(${lastjob})\` Ajustado a \`${trabajo}(${grade})\` `)
                .setTitle("¡El cambio fue realizado exitósamente!")
                .setAuthor("servidor - SQL", icon)
                message.channel.send(jobEmbed)
            } else {
                jobEmbed.setColor("RED")
                .setDescription(`No se encontró ningún usuario con el ID hexadecimal ingresado.`)
                .setTitle("¡Operación fallida!")
                .setAuthor("servidor - SQL", icon)
                message.channel.send(jobEmbed)
                return;
            }
        })
    } else {
        jobEmbed.setColor("RED")
        .setDescription(`¡No tienes la autorización necesaria para hacer esto!`)
        .setTitle("¡Operación fallida!")
        .setAuthor("servidor - SQL", icon)
        message.channel.send(jobEmbed)
        return;
    }
}
