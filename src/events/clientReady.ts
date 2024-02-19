import { client } from "..";
import { Events } from "discord.js";
import { logger } from "../function/logger";
import { setSchedule } from "../schedule";

client.once(Events.ClientReady, async () => {
  if (client.user?.tag)
    logger.info(`Ready! ${client.user.tag}としてログインしました！`);
  else
    logger.warn("Ready! だけどよくわからないユーザーとしてログインしました。");

  setSchedule(client.guilds.cache.first()!);
});
