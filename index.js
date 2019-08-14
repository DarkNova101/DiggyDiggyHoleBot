const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = ">";

const fs = require('fs');

client.login("STUPID ME");

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on('disconnect', () => console.log('Bot Disconnected, Reconnecting Now   '));

client.on('reconnecting', () => console.log('I am reconnecting now!'));

client.on('message', msg => {
    if (msg.author.bot) return;
    //if (!msg.content.startsWith(prefix)) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'summon' || command === 'join' || msg.content.includes("dig")) {
        if (msg.member.voiceChannel) {
            msg.member.voiceChannel.join()
                .then(c => { // Connection is an instance of VoiceConnection
                    //msg.reply(`I have successfully connected to ${msg.member.voiceChannel.name}!`);
                    console.log(`Joined Voice Channel ${msg.member.voiceChannel.name}. Command Run by ${msg.member.user.tag}`);
                    const stream = fs.createReadStream('./DDH.mp3');
                    //const dispatcher = c.playFile(stream);
                    const dispatcher = c.playFile("./DDH.mp3");

                    dispatcher.on('end', () => {
                        console.log("Done");
                        c.disconnect();
                    });
                    dispatcher.on('error', e => {
                        console.log(e);
                    });
                    console.log(dispatcher.time);
                })
                .catch(console.log);
        } else {
            msg.reply('You need to join a voice channel first!');
        }
    }
     if (command === 'leave' || command === 'disconnect') {
         msg.guild.me.setVoiceChannel(null).catch(console.error);
    }
});
