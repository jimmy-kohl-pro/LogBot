# carlos-bot
Bot Discord pour serveur Epitech


# Presentation

In this uncertain time, telecommuting is part of our quotidian. My team and I decide to use a Discord Server to communicate about our project, especially now, when the semester 2 is full of group project, communication is the most important thing. 

Therefore, the Discord server is important. For now, it works well, but on a single server, and with several group, it must be organized. That is why, on the discord server, I created category for each project, and textual and vocal channel for each group of these. 

But this is really tiring, to create each category, each group, each permission for each group to each channel. 

This is why I want to create a program to do it for myself and create a nice workspace for Epitech students. 

A Discord Bot is perfect for that, he can do it with simple command in a textual channel, this is the point of this project: create a bot to manage category, group, channel and permissions corresponding to the need of Epitech students. 

We will have to interact with the bot through commands by any users with the role “Tek”, because I only want Epitech students to manage a new workspace for this use. 

For example: “bebou newgroup” 

First, the bot will ask to user for what project he want to create workspace. (it corresponding to what category he wants to create the new channels) 

For example: “MY_RPG” 

Second, it will ask what the name of the group is. 

For example: “Studio Bebou” 

Then, the bot will create textual and vocal channels “Studio Bebou” to the corresponding category (MY_RPG) and also create a new role “[MY_RPG] Studio Bebou” and assign permissions of this role to the corresponding channels, then, only users with this role can access and speak to the new channel. 

Finally, it will ask to tag people of the group. 

For example: “@Baptiste @Lakhdar @Jimmy”, 

And give the role previously created to people tagged, and here is the new workspace create in 4 simple command in few seconds, instead of creating and assign everything manually.  


# Run server side

```node index.js```

# Commands client side

```
bebou newgroup
bebou mention [mention someone]...
bebou ping
bebou say [Phrase to say]
bebou delproject [project name]
bebou delgroup [group name]
```
