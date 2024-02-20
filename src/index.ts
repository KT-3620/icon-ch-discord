import fs from "node:fs";
import path from "node:path";
import {
  ChatInputCommandInteraction,
  Client,
  Collection,
  GatewayIntentBits,
  SlashCommandBuilder,
} from "discord.js";
import dotenv from "dotenv";
import { logger } from "./function/logger";
import { deployCommands } from "./deployCommands";

dotenv.config();

deployCommands();

logger.debug("デバッグログも出力されます");

/** Discord Botの唯一のClient */
export const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// ../image フォルダがなければ作成
const imageFolderPath = path.join(__dirname, "../image");
if (!fs.existsSync(imageFolderPath)) {
  fs.mkdirSync(imageFolderPath);
  logger.warn("imageフォルダを作成しました。画像を追加してください。");
} else {
  if (
    fs.readdirSync(imageFolderPath).filter((file) => file.endsWith(".png"))
      .length === 0
  ) {
    logger.warn(
      "imageフォルダにpng形式の画像が含まれていません。画像を追加してください。"
    );
  }
}

/**
 *
 * **コマンドのコレクション**
 *
 * 中にコマンド名関数が含まれる
 *
 */

interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export const cmdCollection: Collection<string, Command> = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  (async () => {
    const command = await import(filePath);
    if ("data" in command && "execute" in command) {
      cmdCollection.set(command.data.name as string, command);
    } else {
      logger.warn(
        `${filePath} ファイルのコマンドは、dataプロパティまたはexecuteプロパティを持っていません。`
      );
    }
  })();
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  import(filePath);
}

const token = process.env.ICON_BOT_DISCORD_TOKEN;

if (token === undefined || token === "") {
  logger.fatal("[X] 環境変数 ICON_BOT_DISCORD_TOKEN が設定されていません。");
  process.exit(1);
}

client.login(token);
