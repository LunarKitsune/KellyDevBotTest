const{ SlashCommandBuilder } = require("discord.js");


//makes a module export of data. Data here will be read from the Index.js as an event creation
module.exports = {
	data: new SlashCommandBuilder().setName("ping").setDescription("simulated test ping"),
    async execute(interaction) {
        await interaction.reply(`Ping received!`);
    },
};