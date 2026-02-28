//push the required classes in from discord.js
const fs = require(`node:fs`);
const path = require(`node:path`)
const {Client, Collection, Events, GatewayIntentBits, MessageFlags} = require(`discord.js`)
const {token} = require('./config.json');

//creates the new client. In this case the bot is the client
const botClient = new Client({
    intents:
    [GatewayIntentBits.Guilds]
});

botClient.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`)
});

console.log(`\n ${token}`)

botClient.login(token);