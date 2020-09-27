function getAllMessagesOfChannel() {
    
}

module.exports = {
    name: 'log',
    description: 'Log the server',
    async run(client, message, args) {
        try {
            message.channel.send('Reading all the messages... \u{1F440}');
            var channels_list = message.guild.channels.cache.filter(c => c.type == 'text').map(c => c.messages);
            // console.log(channels_list);
            for (let messages of channels_list) {
                let messageList = [];
                var done = false;
                while (!done) {
                    mess
                }
                messages.fetch('758723873541193799').then(async messages => {
                    // let msg = messages.array().reverse();
                    // console.log(msg);
                    console.log(messages);
                    // console.log(messages.map(c => c.content));
                }).catch(console.error);
                // console.log(channel);
            }
            message.channel.send('There you are !', { files: ['./log/logilolg.zip'] });
        } catch (error) {
            message.channel.send('An error occure. \u{1F613}');
            console.log(error);
        }
    }
}