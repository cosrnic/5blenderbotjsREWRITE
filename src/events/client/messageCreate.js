const { EmbedBuilder } = require("discord.js");
require("dotenv").config();
const Admins = require("../../models/adminSchema");
const slowmodeSchema = require("../../models/slowmodeSchema");

const slowmodeSet = new Set();
module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        if (message.author.bot && message.author.id != client.user.id) {
            if (message.webhookId) {
                if (message.attachments.size > 0) {
                    return;
                } else {
                    if (message.channelId === process.env.AES_KEYS) {
                        message.channel.send(`<@&${process.env.AES_ALERTS}>`);
                    } else {
                        if (message.channelId === process.env.DRIVE_ADDITIONS) {
                            message.channel.send(
                                `<@&${process.env.UPLOAD_ALERTS}>`
                            );
                        }
                    }
                }
            } else {
                if (message.channelId === process.env.AES_KEYS) {
                    message.channel.send(`<@&${process.env.AES_ALERTS}>`);
                }
            }
        }
        if (!message.author.bot) {
            const newmessage = message.content.toLowerCase();

            if (
                newmessage.includes("i need") ||
                newmessage.includes("anyone got") ||
                newmessage.includes("does someone") ||
                newmessage.includes("does some one") ||
                newmessage.includes("someone have") ||
                newmessage.includes("does anyone have")
            ) {
                if (message.channelId === process.env.COMMUNITY_FILES) {
                    message.reply({
                        content: `This channel is **__NOT__** for requesting, please use <#${process.env.DRIVE_REQUESTS}> to request models.`,
                    });
                }
            } else {
                if (message.content.startsWith("?request")) {
                    const args = message.content.split(" ");
                    if (
                        (args[1] != null || args[1] != undefined) &&
                        args[1].startsWith("<@")
                    ) {
                        const pingeduser = message.mentions.users.first();
                        message.delete();
                        message.channel.send(
                            "<@" +
                                pingeduser +
                                `> This channel is **__NOT__** for requesting, please use <#${process.env.DRIVE_REQUESTS}> to request models.`
                        );
                    }
                }
            }
            if (message.channelId === process.env.DRIVE_REQUESTS) {
                if (message.member.roles.cache.has(process.env.SERVER_STAFF))
                    return;

                if (message.attachments.size > 0) {
                    if (message.content == "") {
                        message.delete();
                        const channel = client.channels.cache.find(
                            (channel) => channel.id === process.env.DRIVE_HELP
                        );
                        channel.send(
                            "<@" +
                                message.author.id +
                                "> Please attach the Model Name and Game and an image of the model to your message and resend it!"
                        );
                        message.author.send(
                            "<@" +
                                message.author.id +
                                "> Please attach the Model Name and Game and an image of the model to your message and resend it!"
                        );
                    }
                } else {
                    message.delete();
                    const channel = client.channels.cache.find(
                        (channel) => channel.id === process.env.DRIVE_HELP
                    );
                    channel.send(
                        "<@" +
                            message.author.id +
                            "> Please attach the Model Name and Game and an image of the model to your message and resend it!"
                    );
                    message.author.send(
                        "<@" +
                            message.author.id +
                            "> Please attach the Model Name and Game and an image of the model to your message and resend it!"
                    );
                }
                const slowmodeData = await slowmodeSchema.findById({
                    _id: "637e1e8dc5eddead0cc16690",
                });
                const normalDuration = slowmodeData.slowmodeDuration;
                const supporterDuration =
                    slowmodeData.supporterSlowmodeDuration;
                if (!slowmodeSet.has(message.member.id)) {
                    if (message.member.roles.cache.has(process.env.SUPPORTER)) {
                        slowmodeSet.add(message.member.id);

                        setTimeout(() => {
                            slowmodeSet.delete(message.member.id);
                            message.channel.permissionOverwrites.delete(
                                message.member,
                                "Slowmode expired"
                            );
                            // console.log("slowmode expired");
                            message.author.send(
                                `Your <#${process.env.DRIVE_REQUESTS}> cooldown has expired! Make sure to remember the rules when requesting!`
                            );
                        }, supporterDuration);

                        message.channel.permissionOverwrites
                            .create(
                                message.member,
                                {
                                    SendMessages: false,
                                },
                                {
                                    reason: "Given Supporter Slowmode",
                                }
                            )
                            .catch(console.error);
                        return;
                    } else {
                        slowmodeSet.add(message.member.id);

                        setTimeout(() => {
                            slowmodeSet.delete(message.member.id);
                            message.channel.permissionOverwrites.delete(
                                message.member,
                                "Slowmode expired"
                            );
                            // console.log("slowmode expired");
                            message.author.send(
                                `Your <#${process.env.DRIVE_REQUESTS}> cooldown has expired! Make sure to remember the rules when requesting!`
                            );
                        }, normalDuration);
                        message.channel.permissionOverwrites
                            .create(
                                message.member,
                                {
                                    SendMessages: false,
                                },
                                {
                                    reason: "Given Slowmode",
                                }
                            )
                            .catch(console.error);
                        return;
                    }
                }
            }

            if (message.mentions.users.first() == undefined) {
                return;
            } else {
                const adminList = await Admins.find();
                for (let i = 0; i < adminList.length; i++) {
                    if (
                        adminList[i].userID == message.mentions.users.first().id
                    ) {
                        if (
                            message.member.roles.cache.has(
                                process.env.SERVER_STAFF
                            )
                        ) {
                            return;
                        }
                        const mentionedUser = message.mentions.users.first();
                        const user = message.author;
                        const messageloc = message.channel;
                        const embed = new EmbedBuilder()
                            .setColor("#7F98E6")
                            .setTitle("Detected Ping")
                            .setTimestamp(Date.now())
                            .setDescription(
                                `User <@${user.id}> pinged ${
                                    mentionedUser.username +
                                    "#" +
                                    mentionedUser.discriminator
                                } in <#${messageloc.id}>`
                            );
                        message.reply({
                            content: `Please do not ping ${mentionedUser.username}!`,
                            ephemeral: false,
                        });
                        client.channels.cache
                            .get(process.env.MOD_BOTS)
                            .send({ embeds: [embed] });
                    }
                }
            }
        }
    },
};
