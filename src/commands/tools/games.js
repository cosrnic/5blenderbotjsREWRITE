const { SlashCommandBuilder } = require("discord.js");
const Game = require('../../models/gameSchema')
module.exports = {
  data: new SlashCommandBuilder()
    .setName("games")
    .setDescription("List of games we own/can port from!"),
  async execute(interaction, client) {
    await interaction.deferReply({
      fetchReply: true,
    });
    const GameData = await Game.find()
    let dataArray = []
    for (let i = 0; i < GameData.length; i++){
        dataArray[i] = (GameData[i].name + " - " + GameData[i].game)
    }

    interaction.editReply({
        content: `**Current Games**\`\`\`\n${dataArray.toString().replaceAll(`,`, `\n`)}\`\`\``,
        ephemeral: false
    })
  },
};
