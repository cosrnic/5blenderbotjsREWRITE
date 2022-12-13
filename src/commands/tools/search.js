const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { google } = require("googleapis");
const fs = require("fs");
require("dotenv").config();
const KEYFILEPATH = "blenderdrive-e4a7633f2081.json";

const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});

const drive = google.drive("v3");
google.options({ auth });

const talkedRecently = new Set();

let cooldown = 30000;
let reqlimit = 10;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("search")
        .setDescription("Search for a model on the drive")
        .addStringOption((option) =>
            option
                .setName("name")
                .setDescription("The Model name")
                .setRequired(true)
        ),
    async execute(interaction, client) {
        // await interaction.deferReply({
        //     fetchReply: true,
        // });

        // fs.open("delay.txt", "w", function (err, data) {
        //     if (data == undefined) {
        //         fs.writeFile("delay.txt", "5");
        //     }
        //     console.log(data);
        // });

        const input = interaction.options.getString("name");

        if (interaction.channel == null) {
            // fs.writeFile(
            //     "search.log",
            //     `"DMS -> ${interaction.user.username}#${interaction.user.discriminator}"(${interaction.user.id}) used /search, input: "${input}".`,
            //     { flag: "wx" }
            // );
            const embed = new EmbedBuilder()
                .setTitle("Incorrect Channel!")
                .setDescription(
                    `This command must be used in <#${process.env.BOT_COMMANDS}>! \n It cannot be used in DMS!`
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
            interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
            return;
        }

        if (
            interaction.channel != null &&
            !(interaction.channel.id == process.env.BOT_COMMANDS) &&
            !interaction.member.roles.cache.has(process.env.SERVER_STAFF) // 887809952327028736
        ) {
            // fs.writeFile(
            //     "search.log",
            //     `"${interaction.channel.name} --> ${interaction.user.username}#${interaction.user.discriminator}"(${interaction.user.id}) used /search, input: "${input}".`,
            //     { flag: "wx" }
            // );
            const embed = new EmbedBuilder()
                .setTitle("Incorrect Channel!")
                .setDescription(
                    `This command must be used in <#${process.env.BOT_COMMANDS}>! \n It cannot be used here!`
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
            interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
            return;
        }

        if (!talkedRecently.has(interaction.user.id)) {
            if (interaction.member.roles.cache.has(process.env.SUPPORTER)) {
                cooldown = 15000;
                reqlimit = 15;
            }

            talkedRecently.add(interaction.user.id);
            setTimeout(() => {
                talkedRecently.delete(interaction.user.id);
            }, cooldown);
            const params = {};
            params.q = "'1LDDA2yi-AMUOh2ToK1h0OkQhBw5A0uZU' in parents";
            params.orderBy = "name";
            const newParams = {};
            newParams.orderBy = "name";
            const newerParams = {};
            newerParams.orderBy = "name";
            // const extraParams = {};
            // extraParams.orderBy = "name";
            const array = [];
            let folderID;
            let folderName;
            let count = 0;

            // let fileCount = 0;

            const embed = new EmbedBuilder();
            embed.setFooter({
                text:
                    "Created by " +
                    (await client.users.fetch(process.env.COSMIC)).username +
                    "#" +
                    (await client.users.fetch(process.env.COSMIC))
                        .discriminator,
                iconURL: (
                    await client.users.fetch(process.env.COSMIC)
                ).avatarURL(),
            });
            embed.setColor(client.colour);

            interaction.deferReply({
                fetchReply: true,
            });

            let desc;

            const ogRes = await drive.files.list(params);
            // fileCount = ogRes.data.files.length;
            // console.log(ogRes.data.files.length);
            for (let i = 0; i < ogRes.data.files.length; i++) {
                folderID = ogRes.data.files[i].id;
                folderName = ogRes.data.files[i].name;
                embed.setTitle("Currently Searching");
                desc = "Currently looking in the " + folderName + " folder.";
                embed.setDescription(desc);
                interaction.editReply({
                    embeds: [embed],
                });

                if (
                    folderID == "1E3Hqo3iOhmqAx5AjmqlyN2dT0siA50Qh" ||
                    folderID == "1bx-E-3m6TvXl0C6YNRku_U3rzH7LCmt8"
                ) {
                    console.log("in special case folders");
                    newParams.q = `'${folderID}' in parents`;
                    const res = await drive.files.list(newParams);
                    // const countres = await drive.files.list(extraParams);
                    // for (let k = 0; k < countres.data.files.length; k++) {
                    //     fileCount = fileCount + countres.data.files.length;
                    //     console.log(folderName, countres.data.files.length);
                    // }

                    for (let j = 0; j < res.data.files.length; j++) {
                        folderID = res.data.files[j].id;
                        folderName = res.data.files[j].name;

                        desc =
                            "Currently looking in the " +
                            folderName +
                            " folder [inside " +
                            ogRes.data.files[i].name +
                            " folder].";
                        embed.setDescription(desc);
                        interaction.editReply({
                            embeds: [embed],
                        });

                        newerParams.q = `'${folderID}' in parents and name contains '${input}'`;
                        const res2 = await drive.files.list(newerParams);
                        for (let k = 0; k < res2.data.files.length; k++) {
                            if (array.length < reqlimit) {
                                console.log(res2.data.files[k]);
                                console.log(res.data.files[j]);
                                embed.addFields({
                                    name: `Found: ${res2.data.files[k].name}`,
                                    value: `Folder: ${res.data.files[j].name} [inside ${ogRes.data.files[i].name} folder]`,
                                });
                                embed.setAuthor({
                                    name: "I am still looking for more models",
                                });
                                array[count] =
                                    count +
                                    1 +
                                    ". " +
                                    res2.data.files[k].name +
                                    " [[Download]](https://drive.google.com/uc?id=" +
                                    res2.data.files[k].id +
                                    "&export=download) | [[Folder]](https://drive.google.com/drive/folders/" +
                                    res.data.files[j].id +
                                    ")";
                                count = count + 1;
                            }
                        }
                    }
                    continue;
                }
                // extraParams.q = `'${folderID}' in parents`;
                newParams.q = `'${folderID}' in parents and name contains '${input}'`;
                try {
                    const res = await drive.files.list(newParams);
                    // const countres = await drive.files.list(extraParams);
                    // for (let k = 0; k < countres.data.files.length; k++) {
                    //     fileCount = fileCount + countres.data.files.length;
                    //     console.log(folderName, countres.data.files.length);
                    // }

                    for (let j = 0; j < res.data.files.length; j++) {
                        if (array.length < reqlimit) {
                            embed.addFields({
                                name: `Found: ${res.data.files[j].name}`,
                                value: `Folder: ${ogRes.data.files[i].name}`,
                            });
                            embed.setAuthor({
                                name: "I am still looking for more models",
                            });
                            array[count] =
                                count +
                                1 +
                                ". " +
                                res.data.files[j].name +
                                " [[Download]](https://drive.google.com/uc?id=" +
                                res.data.files[j].id +
                                "&export=download) | [[Folder]](https://drive.google.com/drive/folders/" +
                                ogRes.data.files[i].id +
                                ")";
                            count = count + 1;
                        }
                    }
                } catch (err) {
                    console.error(err);
                    interaction.editReply({
                        content: "errored, tell Cosmic to check console",
                    });
                    return;
                }
            }
            // console.log(fileCount);
            if (array.length == 0) {
                embed.setTitle(`Search results for \`${input}\``);
                embed.setDescription(
                    "Unfortunately, I was unable to find any models containing the word `" +
                        input +
                        "`! Sorry!"
                );
                embed.addFields({
                    name: "Not found what you needed?",
                    value: "Try using the exact model name, if that still doesn't work then request it in <#886042189782745109> :)",
                });
                interaction.editReply({
                    embeds: [embed],
                });
                return;
            }
            if (array.length > reqlimit) array.length = reqlimit;
            // console.log(array);

            embed.setTitle(`Search results for \`${input}\``);
            embed.setDescription(array.toString().replaceAll(",", "\n"));
            embed.spliceFields(0, 25);
            embed.addFields(
                {
                    name: "Not found what you needed?",
                    value: "Try using the exact model name, if that still doesn't work then request it in <#886042189782745109> :)",
                },
                {
                    name: "Want more results per request?",
                    value: "Support 5th at https://ko-fi.com/5blender",
                }
            );
            embed.setAuthor({ name: "Done Looking!" });

            interaction.editReply({
                embeds: [embed],
            });
        } else {
            if (interaction.member.roles.cache.has(process.env.SUPPORTER)) {
                const embed = new EmbedBuilder()
                    .setTitle(`Command Cooldown`)
                    .setDescription(
                        `You recently used this command! Please wait atleast **__15 seconds__** before trying again!`
                    )
                    .setColor(client.colour);
                embed.setFooter({
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
                });
                interaction.reply({
                    embeds: [embed],
                    ephemeral: true,
                });
                return;
            }
            const embed = new EmbedBuilder()
                .setTitle(`Command Cooldown`)
                .setDescription(
                    `You recently used this command! Please wait atleast **__30 seconds__** before trying again!`
                )
                .setColor(client.colour)
                .addFields({
                    name: "Want a shorter cooldown?",
                    value: "Support 5th at https://ko-fi.com/5blender",
                });
            embed.setFooter({
                text:
                    "Created by " +
                    (await client.users.fetch(process.env.COSMIC)).username +
                    "#" +
                    (await client.users.fetch(process.env.COSMIC))
                        .discriminator,
                iconURL: (
                    await client.users.fetch(process.env.COSMIC)
                ).avatarURL(),
            });
            interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
        }
    },
};
