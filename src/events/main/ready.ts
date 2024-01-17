import { Client } from "../.."
import { Event } from "../../struct/types/event";

export default new Event({
    name: "ready",
    once: true,
    run() {
        const { buttons, commands, selects, modals } = Client;

        console.log("(✔) ".green + "Bot is ready!");
        console.log("(✔) ".green + `${buttons.size} buttons loaded!`);
        console.log("(✔) ".green + `${commands.size} commands loaded!`);
        console.log("(✔) ".green + `${selects.size} selects loaded!`);
        console.log("(✔) ".green + `${modals.size} modals loaded!`);

    }
})