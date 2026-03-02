const { REST, Routes} = require(`discord.js`);
const { clientID, guildID, token} = require(`./config.json`);
const fs = require(`node:fs`);
const path = require(`node:path`);

const commands = [];

//gets folder path under the main project directory under the commands folder
const foldersPath = path.join(__dirname, 'commands');
//reads the folders in commands
const commandFolders = fs.readdirSync(foldersPath);

//for the folders in commands
for (const folder in commandFolders)
{
    //join /commands + additional folders undercommands.
    //any command files in these folders will be picked up if they end up ending in .js
    const commandPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandPath).filter((file) => file.endsWith(`.js`));

    for (const file in commandFiles)
    {
        const filePath = path.join(commandPath,file);
        const command = require(filePath);
        if((`data` in command) && (`execute` in command)){
            commands.push(command.data.toJson());
        }
        else{
            console.log('[WARNING] File/Data Cannot be found. Please check files under commands folder');
        }
    }
}

//sets the token needed for the bot to work
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();