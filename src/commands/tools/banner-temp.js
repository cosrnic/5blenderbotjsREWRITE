const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
require("dotenv").config();
module.exports = {
    data: new SlashCommandBuilder()
        .setName("banner-test")
        .setDescription("Returns the bot's ping")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction, client) {
        await interaction.deferReply({
            fetchReply: true,
        });

        const guild = interaction.guild;

        guild
            .setBanner("./temp.png")
            .then((updated) =>
                interaction.editReply({
                    content: "Updated banner",
                })
            )
            .catch(console.error);

        interaction.editReply({
            content: `${guild.banner || "no"}`,
        });
    },
};
