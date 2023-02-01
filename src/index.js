const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const fs = require('fs').promises;
const { updatePlayerCount } = require('./commands/utiles/statusbot')
const path = require('path');
const { token, prefix } = require('../config.json');
const { firstLetterM } = require('./helper');

client.commands = new Map();


client.on('ready', () => { 
  console.log('Bot activo') 
  // updatePlayerCount(client, 5)
  client.user.setPresence({
    status: "online",  // You can show online, idle... Do not disturb is dnd
    activity: {
        name: "Servidor",  // The message shown
        type: "WATCHING" // PLAYING, WATCHING, LISTENING, STREAMING,
    }
});
  
});
client.on('message', async(message) => {
  const write = message.content;
  if (message.author.bot) return;
  if (message.channel.id === "822657705780052016") {
    let writeEmbed = new MessageEmbed()
          .setAuthor('Servidor', 'https://cdn.discordapp.com/attachments/780970578319638528/822679629868695572/image.png')
          .setDescription(`** [⁉] Sugerencia hecha por:** <@${message.author.id}>\n- ${firstLetterM(write)}`)
          .setFooter("Si estás de acuerdo con la sugerencia ✅ y si no lo estás ❌")
          .setTimestamp()
          .setColor("RANDOM");
        message.channel.send(writeEmbed).then((r) => {
          r.react("✅");
          r.react("❌");
        });

        message.channel.bulkDelete(1, true)
  } 
  if (write.includes('https://tornadus.net/orange' || 'http://tornadus.net/orange')) { //if it contains an invite link
  await message.delete(1) //delete the message
  await message.channel.send('Link Eliminado:\n**No puedes mandar este link 😘**').then(msg=> msg.delete({ timeout: 5000 }))
}
//   if (message.channel.id === "823738886647709727") {
//     let writeEmbed = new MessageEmbed()
//           .setAuthor(`Twitter`, 'https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-1.png')
//           .setTitle(`**-${message.author.username} ✅** __@${message.author.tag}__`)
//           .setDescription(`**・${firstLetterM(write)}**`)
//           .setTimestamp()
//           .setColor("RANDOM");
//         await message.channel.send(writeEmbed).then((r) => {
//           r.react("💭");
//           r.react("🔁");
//           r.react("♥");
//           r.react("📤");
//         });
//         message.delete();
// }
})

client.on('message', async function(message){
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
  let cmdArgs = message.content.substring(message.content.indexOf(prefix)+1).split(new RegExp(/\s+/))
  let cmdName = cmdArgs.shift();
  if (client.commands.get(cmdName)) {
    client.commands.get(cmdName).run(client, message, cmdArgs)
  } else {
    message.reply('El comando ingresado no existe!')
  }
});

(async function registerCommand(dir = 'commands') {
  let files = await fs.readdir(path.join(__dirname, dir)); // Creamos un arreglo llamado 'files' con todo lo que contiene la carpeta commands.
  // console.log(files)
  for (let file of files) { // Recorremos el arreglo files para encontrar mas carpetas con archivos.
    let stat = await fs.lstat(path.join(__dirname, dir, file));
    if (stat.isDirectory()) {
      registerCommand(path.join(dir, file));
    } else {
      if (file.endsWith('.js')) {
        let cmdName = file.substring(0, file.indexOf('.js'))
        let cmdModule = require(path.join(__dirname, dir, file));
        client.commands.set(cmdName, cmdModule);
        // console.log(client.commands)
      }
    }
  }
})();

client.on("guildMemberAdd", (member) => {
  const welcomeembed = new MessageEmbed()
    .setAuthor(
      "Bienvenido a nuestra ciudad!",
      ""
    )
    // .setThumbnail(member.guild.iconURL({ dynamic: true, size: 512 }))
    .setTitle(`Bienvenido ${member.user.username} a ${member.guild.name}`)
    .setDescription(
      "Recuerda leer las normativas de Servidor en <#822657705780052013>"
    )
    .setImage(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
    .setFooter(
      member.guild.name,
      member.guild.iconURL({ dynamic: true, size: 512 })
    )
    .setColor("RED")
    .setTimestamp();
  client.channels.resolve("822657705415016503").send(welcomeembed);
});

client.login(token)

