const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const Game = require('../../models/gameSchema')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gameadd")
    .setDescription("Add a game [Staff Only]")
    .addStringOption((option) =>
      option.setName("game").setDescription("The game name.").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction, client) {
    await interaction.deferReply({
      fetchReply: true,
    });
    const game = interaction.options.getString("game");

    const newGame = await Game.create({
      name: interaction.member.displayName,
      game: game,
    });
    newGame.save();

    const embed = new EmbedBuilder()
      .setColor("#7F98E6")
      .setTitle("`" + game + "` has been Added!")
      .setDescription(
        "A game as been added by <@" +
          interaction.member.id +
          "> \n Game added: `" +
          game +
          "`"
      )
      .setTimestamp(new Date());

    await interaction.editReply({
      embeds: [embed],
      ephemeral: false,
    });
  },
};
