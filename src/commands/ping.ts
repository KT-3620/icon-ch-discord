import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Pingを応答します")
  .setDMPermission(false);
export async function execute(interaction: ChatInputCommandInteraction) {
  const embed = new EmbedBuilder().setTitle("Ping中...");
  const sent = await interaction.reply({
    embeds: [embed],
    fetchReply: true,
    ephemeral: true,
  });

  const WebsocketPing = interaction.client.ws.ping;
  const pingValue = sent.createdTimestamp - interaction.createdTimestamp;

  //Embedを編集
  const secondEmbed = new EmbedBuilder()
    .setTitle("Pong!")
    .setColor("Green")
    .addFields(
      {
        name: "Web Socket",
        value: `${WebsocketPing}ms`,
      },
      {
        name: "往復",
        value: `${pingValue}ms`,
      }
    );

  //EmbedにEditReply
  interaction.editReply({
    embeds: [secondEmbed],
  });
}
