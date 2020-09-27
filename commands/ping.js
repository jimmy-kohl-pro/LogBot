module.exports = {
    name: 'ping',
    description: 'Ping !',
    async run(client, message, args) {
        let msg_ping = await message.channel.send(`🏓 Pinging....`);
        msg_ping.edit(`🏓 Pong!\nLa latence est de ${Math.floor(msg_ping.createdAt - message.createdAt)}ms\n` +
                    `La latence de l'API est de ${Math.round(client.ws.ping)}ms`);
    }
}