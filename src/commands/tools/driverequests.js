const {
	SlashCommandBuilder,
	EmbedBuilder,
	PermissionFlagsBits,
} = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("driverequests")
		.setDescription("Open or Close the Drive Requests.")
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
	async execute(interaction, client) {
		await interaction.deferReply({
			fetchReply: true,
		});
		const channel = client.channels.cache.find(
			(channel) => channel.id === "1003674584303816714"
		);
		const guild = interaction.guild;
		const everyone = guild.roles.everyone;
		if (
			channel.permissionsFor(everyone).has(PermissionFlagsBits.SendMessages)
		) {
			try {
				channel.permissionOverwrites.edit(everyone, { SendMessages: false });
			} catch (error) {
				console.error(error);
			}
			const embed = new EmbedBuilder()
				.setTitle("Locked Drive Requests")
				.setDescription("Drive requests have successfully been locked!")
				.setFooter({
					text:
						"Created by " +
						(await client.users.fetch("508662064063971348")).username +
						"#" +
						(await client.users.fetch("508662064063971348")).discriminator,
					iconURL: (await client.users.fetch("508662064063971348")).avatarURL(),
				})
				.setColor(client.colour);
			const channelEmbed = new EmbedBuilder()
				.setTitle("Drive Requests Closed")
				.setDescription(
					"Drive requests have been temporarily suspended for the weekend. \n The channel will reopen on Monday."
				)
				.setFooter({
					text:
						"Created by " +
						(await client.users.fetch("508662064063971348")).username +
						"#" +
						(await client.users.fetch("508662064063971348")).discriminator,
					iconURL: (await client.users.fetch("508662064063971348")).avatarURL(),
				})
				.setThumbnail(
					"https://hotemoji.com/images/dl/2/lock-emoji-by-twitter.png"
				)
				.setColor(client.colour);
			interaction.editReply({
				embeds: [embed],
			});
			channel.send({
				embeds: [channelEmbed],
			});
		} else {
			try {
				channel.permissionOverwrites.edit(everyone, { SendMessages: true });
			} catch (error) {
				console.error(error);
			}
			const embed = new EmbedBuilder()
				.setTitle("Unlocked Drive Requests")
				.setDescription("Drive requests have successfully been unlocked!")
				.setFooter({
					text:
						"Created by " +
						(await client.users.fetch("508662064063971348")).username +
						"#" +
						(await client.users.fetch("508662064063971348")).discriminator,
					iconURL: (await client.users.fetch("508662064063971348")).avatarURL(),
				})
				.setColor(client.colour);
			const channelEmbed = new EmbedBuilder()
				.setTitle("Drive Requests Open")
				.setDescription(
					"Drive requests are now open once again!\nPlease remember the rules when making a request."
				)
				.setFooter({
					text:
						"Created by " +
						(await client.users.fetch("508662064063971348")).username +
						"#" +
						(await client.users.fetch("508662064063971348")).discriminator,
					iconURL: (await client.users.fetch("508662064063971348")).avatarURL(),
				})
				.setThumbnail(
					"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/twitter/87/open-lock_1f513.png"
				)
				.setColor(client.colour);
			interaction.editReply({
				embeds: [embed],
			});
			channel.send({
				embeds: [channelEmbed],
			});
		}
	},
};
