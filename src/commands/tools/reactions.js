const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
require("dotenv").config();
module.exports = {
    data: new SlashCommandBuilder()
        .setName("reactions")
        .setDescription("What the reactions mean"),
    async execute(interaction, client) {
        await interaction.deferReply({
            fetchReply: true,
        });

        const embed = new EmbedBuilder()
            .setColor("#7F98E6")
            .setTitle("Reactions for Drive Requests")
            .setTimestamp(new Date())
            .setDescription(
                "Model Reaction Emoji are as follows. \n <:AddedToDrive:893619889259040789> = Your request was added. Check the posted model and image in <#886371955312324638> channel." +
                    " \n <:AddedInCommunityFiles:906280966908162099> = The file you requested in in the <#886375095516418059> channel posted by another member or staff member.\n​ <:AwaitingResponse:893623261869527100> = Waiting for someone in the team to export your request. Be patient and don't keep asking or it'll be ignored! \n <:OnTheDrive_Please_Search:899458722764566629> = Your request is on the drive already. If you can't find what you're looking for after getting this reaction to a model request, Ask in Drive help AFTER double checking, also search in the community files for an upload. \n <:InProgress:893620051507298314> = The person that reacts with this reaction will be porting your request and adding it to the drive when complete they will post the <:AddedToDrive:893619889259040789> Reaction under the request in the post you made in <#886042189782745109> . \n <:CannotExport:893621517982793758> = It is either not in the files, custom made for loading screens or trailers  or it has not been decrypted/ added to the files yet or you are asking the impossible - FX do not export and take a lot of work. Or you are asking for a map location that are impossible to export.   \n <:NotPortedYouAskedAlreadyB4:908054621380022292> = Porting Cancelled for various reasons example 'constant requests - negative comments - sarcastic comments etc' \n <:CustomMadeModel:939247784069042226> = The model you requested had to be custom made. \n <:Dont_Have_The_Game_CantExport:951638779284836373> = We dont have the game, please check `/games` before requesting! \n <:File_Updated_Download_Again:946900065736343642> = The model you requested has been updated, download it again. \n <:IncorrectImageNotPorting:944019498464346203> = Incorrect image, we wont be searching for the correct model. \n <:No_Clue_What_That_Is:946180080739184660> = We dont know what model that is or game it is from! \n <:InvalidName:921806788117016647> = Incorrect model name! \n <:More_Than_one_Variation:999417391450701896> = There is more than one Variation of this model, please specify! \n <:Please_Use_Model_Exact_Name:999421102432456784> = Please use the exact model name, this makes it easier for us to find the model. \n <:More_Than_1_Model_Requested_NO:962048419327770654> = More than 1 model has been requested in the request, please keep them to 1 request per."
            );
        interaction.editReply({
            embeds: [embed],
            ephemeral: false,
        });
    },
};
