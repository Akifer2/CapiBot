import { ApplicationCommandOptionType, ApplicationCommandType, PermissionResolvable } from "discord.js";
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

    async run({ interaction, options }) {
        const user = options.getUser("user", true);
        const userContext = await interaction.guild?.members.fetch(user.id);
        const reason = options.getString("reason", false);
        const type = options.getSubcommandGroup(false);

        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild()) return;

        if (!userContext?.permissions.has("Administrator")) {
            interaction.reply({ content: "Bot does not have enough permissions!", ephemeral: true });
            return;
        }

        switch (type) {
            case 'ban':
                await userContext?.ban({ reason: reason || "No reason provided" });
                interaction.reply({ content: `User ${user.username} has been banned`, ephemeral: true });
                break;
            case 'kick':
                await userContext?.kick(reason || "No reason provided");
                interaction.reply({ content: `User ${user.username} has been kicked`, ephemeral: true });
                break;
            case 'mute':
                await userContext?.roles.add("Muted");
                interaction.reply({ content: `User ${user.username} has been muted`, ephemeral: true });
                break;
            case 'unmute':
                await userContext?.roles.remove("Muted");
                interaction.reply({ content: `User ${user.username} has been unmuted`, ephemeral: true });
                break;
            case 'warn':
                await userContext?.roles.add("Warned");
                interaction.reply({ content: `User ${user.username} has been warned`, ephemeral: true });
                break;
            case 'unwarn':
                await userContext?.roles.remove("Warned");
                interaction.reply({ content: `User ${user.username} has been unwarned`, ephemeral: true });
                break;
            default:
                interaction.reply({ content: "Please specify a type of moderation", ephemeral: true });
                break;
        }
    },
})