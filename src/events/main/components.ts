import { Client } from "../..";
import { Event } from "../../struct/types/event";

export default new Event({
    name: "interactionCreate",
    run(interaction) {
        if (interaction.isModalSubmit()) Client.modals.get(interaction.customId)?.(interaction);
        if (interaction.isButton()) Client.buttons.get(interaction.customId)?.(interaction);
        if (interaction.isStringSelectMenu()) Client.selects.get(interaction.customId)?.(interaction);

    }
})