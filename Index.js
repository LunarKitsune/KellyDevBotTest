//push the required classes in from discord.js
const fs = require(`node:fs`);
const path = require(`node:path`)
const {Client, Collection, Events, GatewayIntentBits, MessageFlags} = require(`discord.js`)
const {token} = require('./config.json');


//creates the new client. In this case the bot is the client
const botClient = new Client({
    intents: [GatewayIntentBits.Guilds]
});

//stores a collection of bot commands (writing this down to rememebr)
botClient.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');

// reads the folders in commands
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            botClient.commands.set(command.data.name, command);
        } else {
            const errorDescript = `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`;
            console.log(`${errorDescript}`);
        }
    }
}

//grab events and execute
//pushing required modules for interaction and ready events
const EventPath = path.join(__dirname,`Events`);
const EventFiles = fs.readdirSync(EventPath).filter((file) => file.endsWith(`.js`));


for (const file of EventFiles)
{
    const filePath = path.join(EventPath, file);
    const event = require(filePath);
    if(event.once){
        botClient.once(event.name, (...args) => event.execute(...args));
    }
    else{
        botClient.on(event.name, (...args) => event.execute(...args));
    }
}

//log bot in
botClient.login(token);