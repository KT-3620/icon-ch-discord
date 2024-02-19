import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
} from "discord.js";
import { getRandomImage } from "../function/getRandomImage";
import { logger } from "../function/logger";

let editing = false;

export const data = new SlashCommandBuilder()
  .setName("change")
  .setDescription("アイコンを即時にランダムに変えます。")
  .setDMPermission(false)
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);
export async function execute(interaction: ChatInputCommandInteraction) {
  if (editing) {
    await interaction.reply({
      content: "別の場所で編集中です。しばらくお待ちください。",
      ephemeral: true,
    });
    return;
  }

  editing = true;

  const embed = new EmbedBuilder()
    .setTitle("Testing...")
    .setDescription("変更を試しています...");
  await interaction.reply({
    embeds: [embed],
    ephemeral: true,
  });

  try {
    embed.setTitle("OK!").setColor("Green").setDescription("変更できました！");

    const randomImage = getRandomImage();
    const username = interaction.user.username;
    await interaction.guild?.setIcon(
      randomImage,
      "Icon Bot: " + username + "による手動の変更"
    );
    await interaction.editReply({
      embeds: [embed],
    });
  } catch (error) {
    logger.error(error);
    embed
      .setTitle("Error!")
      .setColor("Red")
      .setDescription("アイコンの変更に失敗しました");
    await interaction.editReply({
      embeds: [embed],
    });
  } finally {
    editing = false;
  }
}
