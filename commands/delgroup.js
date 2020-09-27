module.exports = {
    name: 'delgroup',
    description: 'Delete a group.',
    async run(client, message, args) {
        if (args.length != 2) {
            message.reply('utilisation de la commande : bebou delgroup project group_name');
            return (0);
        }
        category = await message.guild.channels.cache.find(c => c.name == args[0] && c.type == 'category');
        channel_text = await message.guild.channels.cache.find(c => c.name == args[1] && c.type == 'text');
        channel_voice = await message.guild.channels.cache.find(c => c.name == args[1] && c.type == 'voice');

        try {
            if (channel_text)
                channel_text.delete();
            else
                message.channel.send("Le channel textuel de ce groupe n'existe pas.");
            if (channel_voice)
                channel_voice.delete();
            else
                message.channel.send("Le channel vocal de ce groupe n'existe pas.");
            client.commands.get('delete_role').run(client, message, args);
        } catch (error) {
            console.log(error);
            message.channel.send("Erreur dans la suppresion du groupe.");
            return (0);
        }
        message.channel.send("Le channel textuel a bien été supprimé.");
        message.channel.send("Le channel vocal a bien été supprimé.");
    }
}