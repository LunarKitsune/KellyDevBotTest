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

botClient.login(token);

//stores a collection of bot commands (writing this downt o rememebr)
botClient.commands = new Collection();

const foldersPath = path.join(__dirname, `commands`);

for (const folder of commandFolders){
    const commandPath = path.join(foldersPath, folder);

    //each "command path" will be a folder, then the file associated would will be attatched.
    //so utilities will be the command paths then "ping" would be the command file ending in
    //".js". consequently becomes => /utilities/ping.js
    const commandFiles = fs.readdirSync(commandPath).filter((file) => file.endsWith(`.js`));
    for (const file of commandFiles){
        const filePath = path.join(commandPath, file)

        //the final built filepath will become the source of the command
        const command = require(filePath)

        if (('data' in command) && (`execute` in command)){
            botClient.commands.set(command.data.name, command);
        }
        else{
            console.log("file missing/data in commmand file missing")
        }
    }
}

botClient.on(Events.InteractionCreate, (interaction) => {
    console.log(interaction)
})