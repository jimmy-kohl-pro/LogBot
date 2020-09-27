module.exports = {
    name: 'delete_role',
    description: 'Delete a role.',
    async run(client, message, args) {
        if (args.length != 2) {
            message.reply('utilisation de la commande : bebou delgroup project group_name');
            return (0);
        }
        let rolename = "[" + args[0].toUpperCase() + "] " + args[1];
        var role = message.guild.roles.cache.find(c => c.name == rolename);

        if (!role) {
            console.log("Role not removed.");
            return;
        }
        try {
            role.delete();
        } catch {
            console.error(error);
            message.reply('an error occure while execute this command.');
        }
        message.channel.send("Le role a bien été supprimé.");
    }
}