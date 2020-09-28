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
            message.channel.send('Reading all the messages... \u{1F440}');
            var channels_list = message.guild.channels.cache.filter(c => c.type == 'text').map(c => c.messages);
            // console.log(channels_list);
            for (let messages of channels_list) {
                let messageList = [];
                let size = 0;
                let before_id = null;
                do {
                    await messages.fetch({limit : 100, before : before_id}).then(msgList => {
                        messageList = [...messageList, ...msgList.array().map(c => {
                            console.log(c.content);
                            return {content : c.content, author : c.author.username};
                        })];
                        before_id = msgList.last().id;
                        size = msgList.size;
                    });
                } while (size === 100);
                console.log(messageList);
                break;
            }
            // message.channel.send('There you are !', { files: ['./log/logilolg.zip'] });
        } catch (error) {
            message.channel.send('An error occure. \u{1F613}');
            console.log(error);
        }
    }
}