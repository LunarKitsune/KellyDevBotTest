const { Collection } = require("discord.js");
const fs = require(`node:fs`);
const path = require(`node:path`)

module.exports ={
    GetCommands:function(basefolders){
        const commands = new Collection();
        for(const folders of basefolders){
            const commandFolders = path.join(folders,basefolders);
            const commandFiles = fs.readdirSync(commandFolders).filter((file) => file.endsWith(`.js`));

            for(const file of commandFiles){
                const commandPath = path.join(commandFiles,file);
                const command = require(commandPath);
                commands.set(command);
        }
        return commands;
    }
}}