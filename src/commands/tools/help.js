const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
require("dotenv").config();
module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Returns the help message."),
    async execute(interaction, client) {
        await interaction.deferReply({
            fetchReply: true,
        });

        const embed = new EmbedBuilder()
            .setColor("#7F98E6")
            .setTitle("Help!")
            .setFooter({
                text:
                    "Created by " +
                    (await client.users.fetch(process.env.COSMIC)).username +
                    "#" +
                    (await client.users.fetch(process.env.COSMIC))
                        .discriminator,
                iconURL: (
                    await client.users.fetch(process.env.COSMIC)
                ).avatarURL(),
            })
            .setDescription(
                "Help is here! Here is a list of commands and some info about what the bot does! \n \n **What the bot does!** \n The bot is coded to ping a role when 1. A new AES Key is posted! 2. A new Model is uploaded to the Drive! \n It also features commands, see below \n \n **Commands** \n **/search** Usage - `/search {model}` - Searches for a model from Fortnite [similar to !cid in Flash's Bot] \n **/aes** - Usage `/aes` - Displays the newest Fortnite AES Key \n **/games** - Usage `/games` - Displays the games we can port from [WIP] \n **/reactions** - Usage `/reactions` - Gives meaning to those reacted emojis you see in <#886042189782745109> \n \n **Staff Commands** \n **/gameadd** - Usage `/gameadd {game}` - Adds a new game to the games.txt file which is shown by `/games` \n \n \n **Nerd Stuff** \n Bot was made in <:jslogo:958026548756230204> using <:djs_logo:958026538362757140>"
            );
        await interaction.editReply({
            embeds: [embed],
            ephemeral: false,
        });
    },
};
