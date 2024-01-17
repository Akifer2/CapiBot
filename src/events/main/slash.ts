import { CommandInteractionOptionResolver } from "discord.js";
import { Client } from "../..";
import { Event } from "../../struct/types/event";

export default new Event({
    name: "interactionCreate",
    run(interaction) {
        if (!interaction.isCommand()) return;
        const command = Client.commands.get(interaction.commandName);
        if (!command) return;

        if (interaction.isAutocomplete() && command.autoComplete) {
            command.autoComplete(interaction);
            return;
        }

        if (interaction.isChatInputCommand()) {
            const options = interaction.options as CommandInteractionOptionResolver
            command.run({ client: Client, interaction, options })
            return;
        }
    },
})