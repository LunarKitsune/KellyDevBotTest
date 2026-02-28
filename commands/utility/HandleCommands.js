const fs = require(`node:fs`);
const path = require(`node:path`)
const {Client, Collection, Events, GatewayIntentBits, MessageFlags} = require(`discord.js`)


// const {REST, Routes} = require(`discord.js`);

// const fileModules = require(`fs`);

// const guildID = "insertGuildIDHere";
// const clientId = "BotsID"           //put this in config.js!!!!!

// module.exports = (client) => {
//     client.handleCommands = async (commandFolders, path) => {
//         client.commandArray = [];
//         for(folder of commandFolders{
//             const commandFiles = fileModules.readdirSync(`${path}/$folder`)
//         })
//     }
// }