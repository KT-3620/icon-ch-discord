import { client } from "..";
import { Events } from "discord.js";
import { logger } from "../function/logger";

client.once(Events.ClientReady, async () => {
  if (client.user?.tag)
    logger.info(`Ready! ${client.user.tag}としてログインしました！`);
  else
    logger.warn("Ready! だけどよくわからないユーザーとしてログインしました。");
  
  
});
