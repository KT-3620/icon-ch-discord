import { cronCheck } from "./function/cronCheck";
import * as schedule from "node-schedule";
import { logger } from "./function/logger";

/** スケジュールを設定する関数
 * @param userID ユーザーID
 * @param date 集中モードの終了時間
 */
export function setSchedule(userID: string, date: Date) {
  schedule.scheduleJob(userID, date, async () => {
    await cronCheck();
  });
  // logger.debug(`スケジュールを設定しました: ${userID}`);
  // logger.debug(schedule.scheduledJobs);
}

/** スケジュールを削除する関数
 * @param userID ユーザーID
 */
export function removeSchedule(userID: string) {
  schedule.cancelJob(userID);
  // logger.debug(`スケジュールを削除しました: ${userID}`);
  // logger.debug(schedule.scheduledJobs);
}

process.on("SIGINT", () => {
  schedule.gracefulShutdown().then(() => {
    logger.info("停止します...");

    process.exit(0);
  });
});
