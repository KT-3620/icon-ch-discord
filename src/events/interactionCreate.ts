import { Events, InteractionReplyOptions } from "discord.js";
import { cmdCollection } from "..";
import { logger } from "../function/logger";
import { client } from "../index";

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = cmdCollection.get(interaction.commandName);

  if (!command) {
    logger.error(
      `${interaction.commandName} に一致するコマンドが見つかりませんでした。`
    );
    return;
  }

  try {
    const commandName = interaction.commandName;
    const subCmdName = interaction.options.getSubcommand(false);
    if (subCmdName == null) {
      logger.info(`${commandName} @${interaction.user.tag}`);
    } else {
      logger.info(`${commandName} ${subCmdName} @${interaction.user.tag}`);
    }
    await command.execute(interaction);
  } catch (error) {
    logger.error(error);

    const errContent: InteractionReplyOptions = {
      content: "コマンド実行中にエラーが発生しました!",
      ephemeral: true,
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errContent);
    } else {
      await interaction.reply(errContent);
    }
  }
});
