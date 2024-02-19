import { EmbedBuilder, MessageCreateOptions, MessageFlags } from "discord.js";
import { getAllData, removeData } from "./redis";
import { logger } from "./logger";
import { send } from "./send";

let isChecking = false;

export async function schedule() {
  
}
