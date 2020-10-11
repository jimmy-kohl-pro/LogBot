var fs = require('fs');
const archiver = require('archiver');
const filenamify = require('filenamify');

async function getMessageInfo(messages, messageId, messageList) {
    var msg = await messages.fetch(messageId);
    if (msg) {

    }
}

module.exports = {
    name: 'log',
    description: 'Log the server',
    async run(client, message, args) {
        try {
            message.channel.send('Je collecte les messages Master.');

            var channels_list = message.guild.channels.cache.filter(c => c.type == 'text').map(c => c.messages);
            var guild_id = message.guild.id;
            var guild_name = filenamify(message.guild.name, {replacement: '_'});
            var random_id = Math.floor(Math.random() * Math.floor(10000));
            var target = `./log/${guild_id}_${random_id}/${guild_name}`;

            for (let messages of channels_list) {
                let messageList = [];
                let size = 0;
                let before_id = null;
                let channel_name = filenamify(messages.channel.name, {replacement: '_'});
                let target_dir = target;
                
                if (messages.channel.parent)
                    target_dir += `/${filenamify(messages.channel.parent.name)}`
                do {
                    // Récupère tous les messages d'un channel, 100 par boucle
                    await messages.fetch({limit : 100, before : before_id}).then(msgList => {
                        messageList = [...messageList, ...msgList.array().map(c => {
                            return {content : c.content, author : c.author.username};
                        })];
                        before_id = msgList.last().id;
                        size = msgList.size;
                    });
                } while (size === 100);
                // Ecriture dans le fichier
                message.channel.send(`Copie des messages de ${channel_name} en cours...`);
                fs.mkdirSync(target_dir, {recursive : true}); // Créer le dossier il n'existe pas
                var file = fs.createWriteStream(`${target_dir}/${channel_name}.txt`);
                file.on('error', function(err) {console.error(err)});
                for (let i = messageList.length - 1; i >= 0; i--) {
                    if (i != messageList.length - 1 && messageList[i + 1].author === messageList[i].author)
                        await file.write(`${messageList[i].content}\n`);
                    else
                        await file.write(`${messageList[i].author} : ${messageList[i].content}\n`);
                }
                file.end();
            }
            message.channel.send('Compression...');
            fs.mkdirSync(target, {recursive : true});

            const output = fs.createWriteStream(target + '.zip');
            const archive = archiver('zip', {
                zlib: {level: 9}
            });
            archive.on('warning', function(err) {
                if (err.code === 'ENOENT') {
                  // log warning
                } else {
                  // throw error
                  throw err;
                }
            });
            archive.on('error', function(err) {
                throw err;
            });
            archive.pipe(output);
            archive.directory(target, false);
            await archive.finalize();
            output.end();
            message.channel.send(`C'est fait Master.`, { files: [target + '.zip'] });
        } catch (error) {
            message.channel.send('An error occure. \u{1F613}');
            console.log(error);
        }
    }
}