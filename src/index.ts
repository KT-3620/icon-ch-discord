/* eslint-disable @typescript-eslint/no-var-requires */
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
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildPresences,
  ],
});

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

const foldersPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = import(filePath);
  if ("data" in command && "execute" in command) {
    cmdCollection.set(command.data.name as string, command);
  } else {
    logger.warn(
      `${filePath} ファイルのコマンドは、dataプロパティまたはexecuteプロパティを持っていません。`
    );
  }
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
