var config = require('../../bdd.js');
const { MessageEmbed } = require('discord.js');
var connection= config.connection


module.exports.run = async(client, message, args) => {
    const icon = message.guild.iconURL();
  const nameEmbed = new MessageEmbed()
  .setFooter("MrcSQLSystem")
  if (message.member.roles.cache.find(r => r.id === RolID)) {
      let hex = args[0]
      if (hex.startsWith("steam:") === false) {
          hex = `steam:${hex}`
      }  
      let firstname = args[1]
      let lastname = args[2]
      if (!firstname || !lastname) return message.channel.send("¡Mal uso!\nEj: !nombre 11000010aceb57a nombre apellido")

      connection.query("SELECT * FROM users WHERE identifier = ?",hex,(err,result) => {
          let user = result[0]
          let oldname = user.firstname
          let oldlastname = user.lastname
          if (!user) {
              nameEmbed.setColor("RED")
              .setDescription(`No se encontró ningún usuario con el ID hexadecimal ingresado.`)
              .setAuthor(" - SQL", icon)
              .setTitle("¡Operación fallida!")
              message.channel.send(nameEmbed)
              return;
          }
          connection.query(`UPDATE users SET firstname = '${firstname}' WHERE firstname = '${user.firstname}'`,(err,result) => {if (err) console.log(err)})
          connection.query(`UPDATE users SET lastname = '${lastname}' WHERE lastname = '${user.lastname}'`,(err,result) => {if (err) console.log(err)})
          nameEmbed.setColor("GREEN")
          .setDescription(`${hex} ID del jugador con identificación \`${oldname} ${oldlastname}\` Fue cambiado a \`${firstname} ${lastname}\` Con éxito!.`)
          .setAuthor(" - SQL", icon)
          .setTitle("¡El cambio fue realizado con exito!")
          message.channel.send(nameEmbed)
      })

  } else {
      nameEmbed.setColor("RED")
      .setAuthor(" - SQL", icon)
      .setDescription(`¡No tienes la autorización necesaria para hacer esto!`)
      .setTitle("¡Operación fallida!")
      message.channel.send(nameEmbed)
      return;
  }
}


