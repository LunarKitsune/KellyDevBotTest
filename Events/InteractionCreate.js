const {Events, MessageFlags, Collection} = require(`discord.js`);

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction){
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);


        if(!command){
            console.error("No matching folder/file to retrieve command from");
        }
        // else
        // {
        //     const {cooldowns} = interaction.client;

        //     if(!cooldowns.has(commandName.data.name)){
        //         cooldownsset(command.data.name, new Collection());

        //         SetCoolDown(command, userInteract = interaction)
        //         experiationTime = timeStamps.get(interaction.user.id) + command.cooldown;

        //         const now = Date.now();
        //         const timeStamps = cooldowns.get(command.data.name);

        //         if(timeStamps.has(interaction.user.id))
        //         {
        //             if(now < experiationTime)
        //             {
        //                 const expiredTimeStamp = Math.round(experiationTime/1_000);
        //                 timeStamps.set(interaction.user.id, now);
        //                 setTimeout(() => timeStamps.delete(interaction.user,id), command.cooldown);
        //                 return interaction.reply({
        //                     content: `Command: ${command.data.name} has until ${expiredTimeStamp} before it can be used again!`
        //                 });
        //             }
        //         }

        //     };
        // }

        try{
            await command.execute(interaction);
        }
        catch (error){
            console.error(error);
            if(interaction.replied || interaction.deferred){
                await interaction.followUp({
                        content: `There was an error executing this command`,
                        flags: MessageFlags.Ephemeral,
                }   );
            }
            else{
                await interaction.reply({
                    content: `There was an error executing this command`,
                    flags: MessageFlags.Ephemeral,
                });
            }
        }

    }
};