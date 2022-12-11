const {
    SlashCommandBuilder,
    embedLength,
    EmbedBuilder,
} = require("discord.js");
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("faq")
        .setDescription("Returns some FAQ's")
        .addStringOption((option) =>
            option
                .setName("topic")
                .setDescription("The topic of the FAQ")
                .setAutocomplete(true)
                .setRequired(true)
        ),
    async autocomplete(interaction, client) {
        const focusedValue = interaction.options.getFocused();
        const choices = ["search"];
        const filtered = choices.filter((choice) =>
            choice.startsWith(focusedValue)
        );

        await interaction.respond(
            filtered.map((choice) => ({ name: choice, value: choice }))
        );
    },
    async execute(interaction, client) {
        const option = interaction.options.getString("topic");
        switch (option) {
            case "search":
                const embed = new EmbedBuilder()
                    .setTitle(`FAQ - Searching`)
                    .setDescription(
                        `How to search! **THIS COMMAND IS OUTDATED!**`
                    )
                    .addFields(
                        {
                            name: `Standard Searching`,
                            value: `> **Firstly**, Head to <#905185485427720222> and download the \`.pdf\` or \`.xlsx\`.\n> **Secondly**, Open either of the files up in Excel, Google Sheets or in any PDF Viewer.\n> **Thirdly**, Hold the \`CONTROL\`(Windows) or \`CMD\`(Mac) key on your keyboard, then press the \`F\` key on your keyboard. \n> **Finally**, Type the name of the model you would like to search for.`,
                        },
                        {
                            name: `Discord Searching`,
                            value: `> **Firstly**, Head to <#886371955312324638>.\n> **Secondly**, Hold the \`CONTROL\`(Windows) or \`CMD\`(Mac) key on your keyboard, then press the \`F\` key on your keyboard, this will open discords searching prompt.\n> **Finally**, Type the name of the model you would like to search for. (not all models are avaliable this way!)\n> **IMPORTANT**: If the searched model **DOES NOT** appear, try adding \`.blend\` to the end of it, this is because added models often use the full file name instead of just the model name.`,
                        }
                    )
                    .setFooter({
                        text:
                            "Created by " +
                            (await client.users.fetch(process.env.COSMIC))
                                .username +
                            "#" +
                            (await client.users.fetch(process.env.COSMIC))
                                .discriminator,
                        iconURL: (
                            await client.users.fetch(process.env.COSMIC)
                        ).avatarURL(),
                    })
                    .setColor(client.colour);

                await interaction.reply({
                    embeds: [embed],
                });
                break;

            default:
                break;
        }
    },
};
