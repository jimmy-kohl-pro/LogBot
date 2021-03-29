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
            const dayList = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
            const month = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                            "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

            for (let messages of channels_list) {   // Parcourir les channels textuel
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
                            const d = new Date(c.createdTimestamp);
                            // date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
                            // console.log(date);
                            // console.log(`mois : ${d.getMonth()} = ${month[d.getMonth()]}`);
                            return {content : c.content, author : c.author.username,
                                year : d.getFullYear(), month : `[${(d.getMonth() + 1).toString().padStart(2, "0")}] ${month[d.getMonth()]}`, day : `${dayList[d.getDay()]} ${d.getDate()}`};
                        })];
                        if (msgList.last())
                            before_id = msgList.last().id;
                        else
                            before_id = 0;
                        size = msgList.size;
                    });
                } while (size === 100);
                // Ecriture dans le fichier
                message.channel.send(`Copie des messages de ${channel_name} en cours...`);
                // fs.mkdirSync(target_dir, {recursive : true}); // Créer le dossier il n'existe pas
                // var file = fs.createWriteStream(`${target_dir}/${channel_name}.txt`);
                // file.on('error', function(err) {console.error(err)});
                messageList.reverse();
                // for (let i = messageList.length - 1; i >= 0; i--) {
                var last_msg = []
                last_msg = {author: ""};
                var last_filename;
                var newFile = true;
                for (const msg of messageList) {
                    // console.log(msg);
                    temp_target_dir = target_dir + `/${channel_name}/${msg.year}/${msg.month}`
                    fs.mkdirSync(temp_target_dir, {recursive : true}); // Créer le dossier il n'existe pas
                    filename = `${temp_target_dir}/${msg.day}.txt`;
                    if (filename != last_filename) {
                        if (file)
                            file.end();
                        var file = fs.createWriteStream(filename);
                        file.on('error', function(err) {console.error(err)});
                        newFile = true;
                    } else {
                        newFile = false;
                    }
                    if (msg.author === last_msg.author && !newFile)
                        await file.write(`${msg.content}\n`);
                    else
                        await file.write(`${msg.author} : ${msg.content}\n`);
                    last_msg = msg;
                    last_filename = filename;
                }


                                // for (let i = messageList.length - 1; i >= 0; i--) {
                                    // for (const msg in messageList) {
                                    //     temp_target_dir = target_dir + `/${channel_name}/${messageList[i].year}/${messageList[i].month}`
                                    //     fs.mkdirSync(temp_target_dir, {recursive : true}); // Créer le dossier il n'existe pas
                                    //     var file = fs.createWriteStream(`${temp_target_dir}/${messageList[i].day}.txt`);
                                    //     // file.on('error', function(err) {console.error(err)});
                                    //     if (i != messageList.length - 1 && messageList[i + 1].author === messageList[i].author)
                                    //         await file.write(`${messageList[i].content}\n`);
                                    //     else
                                    //         await file.write(`${messageList[i].author} : ${messageList[i].content}\n`);
                                    // }
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
            message.channel.send('Erreur système.');
            console.log(error);
        }
    }
}