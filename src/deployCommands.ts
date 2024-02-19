import { REST, Routes } from "discord.js";

import fs from "node:fs";
import path from "node:path";
import { logger } from "./function/logger";

const clientId = process.env.ICON_BOT_CLIENT_ID;
const token = process.env.ICON_BOT_DISCORD_TOKEN;

export function deployCommands() {
  if (!clientId || !token) {
    logger.fatal(
      ".envにCLIENT_IDまたはDISCORD_TOKENが見つかりませんでした。\n.env.exampleを参考に.envを作成してください。"
    );
    process.exit(1);
  }

  /** deployするコマンドの配列 */
  const commands = [];

  /** commands/ のパス */
  const foldersPath = path.join(__dirname, "commands");
  /** commands以下のフォルダーの名前の配列 */
  const commandFolders = fs.readdirSync(foldersPath);

  /** フォルダーのパスを取得する */
  const commandsPath = path.join(foldersPath, folder);
  /** ファイルを読み取る */
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));

    // ファイルそれぞれに対して次の操作をする
  for (const file of commandFiles) {
    /** 指定したファイルのパスを取得する */
    const cmdFilePath = path.join(commandsPath, file);
    /** 指定したファイルのmodule.exportsを読み取った定数 */
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command = require(cmdFilePath);
    // 配列commandsにJSON形式のコマンドを追加する
    commands.push(command.data.toJSON());
  }

  // REST APIを使ってコマンドをdeployする
  const rest = new REST({ version: "10" }).setToken(token);

  // async即時関数
  (async () => {
    try {
      logger.info(
        `更新を始めています...  ${commands.length} command(s)が渡されています。`
      );
      // deployする
      logger.trace(commands);

      await rest.put(Routes.applicationCommands(clientId), {
        body: commands,
      });
      logger.info(`${commands.length} command(s)のreloadが完了しました。`);
    } catch (error) {
      logger.fatal("エラーが発生したため強制終了します。");
      logger.fatal(error);
      process.exit(1);
    }
  })();
}
