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

        const aes = await axios.get("https://fortnite-api.com/v2/aes");
        const key = aes.data.data.mainKey;
        const ver = aes.data.data.build;

        const embed = new EmbedBuilder()
            .setColor("#7F98E6")
            .setTitle("Aes Key for " + ver)
            .addFields({
                name: "Key",
                value: "`" + key + "`",
            });

        for (let i = 0; i < aes.data.data.dynamicKeys.length; i++) {
            if (i >= 24) break;

            if (aes.data.data.dynamicKeys[i].pakFilename.includes("optional"))
                break;

            if (
                i > 0 &&
                aes.data.data.dynamicKeys[i].key ==
                    aes.data.data.dynamicKeys[i - 1].key
            ) {
                embed.addFields({
                    name: aes.data.data.dynamicKeys[i].pakFilename,
                    value: "`" + aes.data.data.dynamicKeys[i].key + "`",
                });
            }
        }

        interaction.editReply({
            embeds: [embed],
        });
    },
};
