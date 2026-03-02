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

//stores a collection of bot commands (writing this down to rememebr)
botClient.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');

//reads the folders in commands
const commandFolders = fs.readdirSync(foldersPath);

//Dev Note: It seems that the program is not reading .js as a directory.
//the file finding may be more complex than it is suppsoed to be.
//I will be reducing this to see if it helps. We already get into the
//commands folder (as tested with console.log() to see output.)

//I will see first if just putting ping.test into an extra folder
//since maybe its trying to see pingtest as a folder

//Update: So commandsPath was trying to read PingTest.js as a folder.
//Throwing PingTest into another folder Solved the issue!

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
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

//botClient.commands.set(command.data.name, command);

//adds a listener to an event. In this case a "ping event" and takes the interaction
botClient.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand())
        {
            return;
        }
    console.log(interaction);


    const command = interaction.client.commands.get(interaction.commandName);

//errors iif the command is not found
    if(!command){
    console.error(`No matching command name ${interaction.commandName} was found`);
    return;
    }

//trues the interaction
    try {
        await command.execute(interaction);
    }
//attemps a follow up, if no follow up of a reply or deferred, error msg will display to user
    catch(error){
        contentMsg = `there was an error while executing this command`
        if (interaction.replied || interaction.deferred){
                await interaction.followup(
                {
                content: `${contentMsg}`,
                flags: MessageFlags.Ephemeral,
                }
            );


        }
        else{
            await interaction.reply({
                content: `${contentMsg}`,
                flags: MessageFlags.Ephemeral,
            });
        }
    }

});