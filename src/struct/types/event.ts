import { ClientEvents } from "discord.js";

export type eventType<key extends keyof ClientEvents> = {
    name: key;
    once?: boolean;
    run(...args: ClientEvents[key]): any;
}

export class Event<key extends keyof ClientEvents> {
    constructor(options: eventType<key>) {
        Object.assign(this, options)
    }
}