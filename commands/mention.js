module.exports = {
    name: 'mention',
    description: 'Mention someone',
    async run(client, message, args) {
        var mention = message.mentions.users.array();

        if (!mention) {
            message.channel.send("Pas de mentions.");
            return ;
        }
        for (let i = 0; i < mention.length; i++) {
            message.channel.send( "```ini\n[" + mention[i].username + " la plus belle personne au monde]\n```");
        }
    }
}