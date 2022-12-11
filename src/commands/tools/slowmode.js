const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
} = require("discord.js");
require("dotenv").config();
const slowmodeSchema = require("../../models/slowmodeSchema");

const slowmode = new Set();
module.exports = {
    data: new SlashCommandBuilder()
        .setName("slowmode")
        .setDescription(
            "Set the slowmode for Default members in Drive-Requests"
        )
        .addNumberOption((option) =>
            option
                .setName("hours")
                .setDescription("The number of Hours")
                .setRequired(true)
        )
        .addNumberOption((option) =>
            option
                .setName("minutes")
                .setDescription("The number of Minutes")
                .setRequired(true)
        )
        .addNumberOption((option) =>
            option
                .setName("seconds")
                .setDescription("The number of Seconds")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction, client) {
        const toMilliseconds = (hrs, min, sec) =>
            (hrs * 60 * 60 + min * 60 + sec) * 1000;

        await interaction.deferReply({
            fetchReply: true,
        });

        const hours = interaction.options.getNumber("hours");
        const mins = interaction.options.getNumber("minutes");
        const seconds = interaction.options.getNumber("seconds");

        let profileData = await slowmodeSchema.findOneAndUpdate(
            {
                _id: "637e1e8dc5eddead0cc16690",
            },
            {
                $set: {
                    slowmodeDuration: toMilliseconds(hours, mins, seconds),
                    supporterSlowmodeDuration:
                        toMilliseconds(hours, mins, seconds) / 2,
                },
            }
        );

        const embed = new EmbedBuilder();
        embed.setFooter({
            text:
                "Created by " +
                (await client.users.fetch(process.env.COSMIC)).username +
                "#" +
                (await client.users.fetch(process.env.COSMIC)).discriminator,
            iconURL: (await client.users.fetch(process.env.COSMIC)).avatarURL(),
        });
        embed.setColor(client.colour);
        embed.setTitle("Slowmode Updated!");
        embed.setDescription(
            "Slowmode has been set to \n ```Normal: " +
                toMilliseconds(hours, mins, seconds) +
                "ms (" +
                `${hours}h, ${mins}m, ${seconds}s` +
                ")\nSupporter: " +
                toMilliseconds(hours, mins, seconds) / 2 +
                "ms (" +
                `${hours / 2}h, ${mins / 2}m, ${seconds / 2}s` +
                ")```"
        );

        await interaction.editReply({
            embeds: [embed],
        });
    },
};
