const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");
require("dotenv").config();
module.exports = {
    data: new SlashCommandBuilder()
        .setName("aes")
        .setDescription("Returns the current Fortnite AES Key."),
    async execute(interaction, client) {
        await interaction.deferReply({
            fetchReply: true,
        });

        const aes = await axios.get(
            "https://fortnitecentral.gmatrixgames.ga/api/v1/aes"
        );
        const key = aes.data.mainKey;
        const ver = aes.data.version;
        const embed = new EmbedBuilder()
            .setColor("#7F98E6")
            .setTitle("Aes Key for " + ver)
            .setDescription("`" + key + "`");
        interaction.editReply({
            embeds: [embed],
        });
    },
};
