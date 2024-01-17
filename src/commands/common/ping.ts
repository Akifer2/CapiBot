import { ApplicationCommandType } from "discord.js";
import { Command } from "../../struct/types/command";

export default new Command({
    name: "ping",
    description: "ping command",
    type: ApplicationCommandType.ChatInput,
    run({ interaction }) {
        interaction.reply({ ephemeral: true, content: "pong!" })
    }
})