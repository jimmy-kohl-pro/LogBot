module.exports = {
    name: 'newgroup',
    description: 'Ping !',
    async run(client, message, args) {
        let filter = m => m.author.id === message.author.id;
        let answer = null;
        try { // QUESTION REPONSE
            message.channel.send("Pour quel projet ?");
            answer = await message.channel.awaitMessages(filter, {max: 1, time: '30000', errors: ['time'] });
            var project = answer.first().content.toUpperCase();
            message.channel.send("\nQuel est le nom de votre groupe ?");
            answer = await message.channel.awaitMessages(filter, {max: 1, time: '30000', errors: ['time'] });
            var group = answer.first().content;
            var group_name = `[${project}] ${group}`;
            message.channel.send("Qui devrait être dans ce groupe ?");
            answer = await message.channel.awaitMessages(filter, {max: 1, time: '30000', errors: ['time'] });
            var mention = answer.first().mentions.members.array();
        }
        catch (error) {
            console.log(error);
            message.channel.send("Annulation.");
            return (0);
        }
        try { // APPLICATION DES REPONSES
            if (!(await message.guild.channels.cache.find(c => c.name.toUpperCase() === project
            && c.type === 'category')))
            await message.guild.channels.create(project, { type: 'category'});
            if (message.guild.roles.cache.find(r => r.name == group_name)) {
                message.channel.send(`${group_name} déjà existant. '\ bebou addmember [member] [group name] '\ pour ajouter un membre à votre group`);
                return (0);
            }
            var category = message.guild.channels.cache.find(c => c.name == project && c.type == 'category');
            await message.guild.roles.create({
                data: {
                    name: group_name,
                    color: '#' + function (str) {
                        let hash = 0;
                        for (let i = 0; i < str.length; i++)
                            hash = str.charCodeAt(i) + ((hash << 5) - hash);
                        let c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
                        return "00000".substring(0, 6 - c.lenght) + c;
                    }(project),
                },
            }).then(group_create => {
                message.guild.channels.create(group, {type: 'text'}).then((channel) => {
                    channel.setParent(category.id);
                    channel.updateOverwrite(message.guild.roles.everyone, { VIEW_CHANNEL: false });
                    channel.updateOverwrite(group_create.id, { VIEW_CHANNEL: true });
                }).catch(console.error);
                message.guild.channels.create(group, {type: 'voice'}).then((channel) => {
                    channel.setParent(category.id);
                    channel.updateOverwrite(message.guild.roles.everyone, { CONNECT: false });
                    channel.updateOverwrite(group_create.id, { CONNECT: true });
                }).catch(console.error);
                if (!mention)
                    message.channel.send("Pas de mentions.");
                else
                    for (let i = 0; i < mention.length; i++)
                        mention[i].roles.add(group_create.id);
            }).catch(console.error);
        } catch (error) {
            console.log(error);
            message.channel.send("Erreur dans la création du groupe.");
            return (0);
        }
        message.channel.send("Création du groupe bien effectuée ! Enjoy !");
    }
}