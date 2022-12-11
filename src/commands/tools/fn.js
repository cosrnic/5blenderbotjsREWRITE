const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");
require("dotenv").config();
module.exports = {
    data: new SlashCommandBuilder()
        .setName("fn")
        .setDescription(
            "Search for a model (BR ONLY!) <!>THIS DOES NOT SEARCH THE DRIVE!<!>"
        )
        .addStringOption((option) =>
            option
                .setName("name")
                .setDescription("The Skin Name")
                .setRequired(true)
        ),
    async execute(interaction, client) {
        await interaction.deferReply({
            fetchReply: true,
        });

        const input = interaction.options.getString("name");
        try {
            const axiosRequest = await axios.get(
                `https://fortnite-api.com/v2/cosmetics/br/search?name=${input}`
            );
            const data = axiosRequest.data;
            const embed = new EmbedBuilder()
                .setColor("#7F98E6")
                .setTitle(`${data.data.name}`)
                .setDescription(
                    `**Description:** ${data.data.description} \n **Rarity:** ${data.data.rarity.displayValue} \n **Set:** ${data.data.set.value}`
                )
                .addFields(
                    { name: `ID`, value: "`" + data.data.id + "`" },
                    { name: `Path`, value: "`" + data.data.path + "`" }
                )
                .setImage(`${data.data.images.icon}`);
            interaction.editReply({
                embeds: [embed],
            });
        } catch (error) {
            interaction.editReply({
                content: "Couldn't find model: `" + input + "`",
            });
        }
    },
};
