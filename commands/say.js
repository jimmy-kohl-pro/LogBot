module.exports = {
    name: 'say',
    description: 'I say what you want me to tell.',
    run(client, message, args) {
        message.delete();
        message.channel.send(message.content.substr(5));
    }
}