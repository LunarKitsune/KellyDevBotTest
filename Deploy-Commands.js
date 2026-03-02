const { REST, Routes} = require(`discord.js`);
const {token, GuildID, ClientID} = require(`./config.json`);
const fs = require(`node:fs`);
const path = require(`node:path`);

const commands = [];
//gets folder path under the main project directory under the commands folder
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
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


// //for the folders in commands
// for (const folder of commandFolders)
// {
//     //join /commands + additional folders undercommands.
//     //any command files in these folders will be picked up if they end up ending in .js
//     const commandPath = path.join(foldersPath, folder);
//     const commandFiles = fs.readdirSync(commandPath).filter((file) => file.endsWith(`.js`));

//     for (const file of commandFiles)
//     {
//         const filePath = path.join(commandPath,file);
//         const command = require(filePath);
//         if((`data` in command) && (`execute` in command)){
//             commands.push(command.data.toJson());
//         }
//         else{
//             console.log('[WARNING] File/Data Cannot be found. Please check files under commands folder');
//         }
//     }
// }

//sets the token needed for the bot to work
const rest = new REST().setToken(token);
//C:\Users\chico\Desktop\DiscordBotDev\KellyDevBotTest\KellyDevBotTest\commands\PingTest.js
// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(Routes.applicationGuildCommands(ClientID, GuildID), { body: commands });

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();