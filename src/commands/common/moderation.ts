import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { Command } from "../../struct/types/command";

export default new Command({
    name: "moderate",
    description: "moderation utilitys command",
    type: ApplicationCommandType.ChatInput,

    options: [{
        name: "user",
        type: ApplicationCommandOptionType.User,
        description: "user to be moderated",
        required: true,
    },
    {
        name: "type",
        type: ApplicationCommandOptionType.SubcommandGroup,
        description: "type of moderation",
            options: [{
                name: 'ban',
                description: 'ban a user',
                type: ApplicationCommandOptionType.Subcommand,
            }, 
            {
                name: 'kick',
                description: 'kick a user',
                type: ApplicationCommandOptionType.Subcommand,
            },
            {
                name: 'mute',
                description: 'mute a user',
                type: ApplicationCommandOptionType.Subcommand,
            },
            {
                name: 'unmute',
                description: 'unmute a user',
                type: ApplicationCommandOptionType.Subcommand,
            },
            {
                name: 'warn',
                description: 'warn a user',
                type: ApplicationCommandOptionType.Subcommand,
            },
            {
                name: 'unwarn',
                description: 'unwarn a user',
                type: ApplicationCommandOptionType.Subcommand,
            }
        ]
    }
    ],

    run({ interaction, options }) {
        const user = options.getUser("user", true);
        const userContext = interaction.guild?.members.cache.get(user.id);
        const reason = options.getString("reason", false);
        const type = options.getSubcommandGroup(false);
        const subcommand = options.getSubcommand(false);

        if (!type) {
            interaction.reply({ content: "Please specify a type of moderation", ephemeral: true });
            return;
        }

        if (!userContext) {
            interaction.reply({ content: "User not found", ephemeral: true });
            return;
        }

        if (!userContext.bannable) {
            interaction.reply({ content: "I can't moderate this user", ephemeral: true });
            return;
        }

    }
})