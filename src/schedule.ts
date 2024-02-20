import * as schedule from "node-schedule";
import { logger } from "./function/logger";
import { Guild } from "discord.js";
import { getRandomImage } from "./function/getRandomImage";

/** スケジュールを設定する関数
 * @param userID ユーザーID
 * @param date 集中モードの終了時間
 */

export function setSchedule(guild: Guild) {
  const cron = (() => {
    if (process.env.ICON_CRON) {
      return process.env.ICON_CRON;
    } else {
      logger.info(
        "ICON_CRONが設定されていません。デフォルトの設定を使用します。"
      );
      return "0 0 * * *";
    }
  })();

  schedule.scheduleJob(cron, async () => {
    try {
      const imagePath = getRandomImage();
      await guild.setIcon(imagePath, "Icon Botによる定時変更");
      logger.info(`アイコンを変更しました:\n${imagePath}`);
    } catch (error) {
      logger.error("アイコンの変更に失敗しました");
      logger.error(error);
    }
  });
}
