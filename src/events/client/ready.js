const { ActivityType, EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");
require("dotenv").config();

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        await mongoose.connect(process.env.MONGO_LOGIN, { keepAlive: true });
        console.log(`Ready!!! ${client.user.tag} is logged in and online.`);
        const embed = new EmbedBuilder()
            .setTitle("Bot Update")
            .setDescription(
                "The bot has successfully been updated and is now online!"
            )
            .setColor(client.colour);

        client.channels.cache
            .get(process.env.MOD_BOTS)
            .send({ embeds: [embed] });
        client.user.setPresence({
            activities: [
                {
                    name: `/help`,
                    type: ActivityType.Watching,
                },
            ],
            status: `online`,
        });
    },
};
