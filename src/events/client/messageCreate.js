const { EmbedBuilder } = require("discord.js");
const Admins = require("../../models/adminSchema");
module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot && message.author.id != client.user.id) {
      if (message.webhookId) {
        if (message.attachments.size > 0) {
          return;
        } else {
          if (message.channelId === "886285720883453953") {
            message.channel.send("<@&902716565320007731>");
          } else {
            if (message.channelId === "886371955312324638") {
              message.channel.send("<@&902716611964858378>");
            }
          }
        }
      } else {
        if (message.channelId === "886371955312324638") {
          message.channel.send("<@&902716611964858378>");
        }
      }
    }
    if (!message.author.bot) {
      if (message.channelId === "886042189782745109") {
        if (message.attachments.size > 0) {
          if (message.content == "") {
            message.delete();
            const channel = client.channels.cache.find(
              (channel) => channel.id === "900358367657197598"
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
            (channel) => channel.id === "900358367657197598"
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
      }
      if (message.mentions.users.first() == undefined) {
        return;
      } else {
        const adminList = await Admins.find();
        for (let i = 0; i < adminList.length; i++) {
          if (adminList[i].userID == (message.mentions.users.first().id)) {
            if (message.member.roles.cache.has("887809952327028736")) {
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
                  mentionedUser.username + "#" + mentionedUser.discriminator
                } in <#${messageloc.id}>`
              );
            message.reply({
              content: `Please do not ping ${mentionedUser.username}!`,
              ephemeral: false,
            });
            client.channels.cache
              .get("899445608744628264")
              .send({ embeds: [embed] });
          }
        }
      }
    }
  },
};
