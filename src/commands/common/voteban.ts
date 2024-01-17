import { Command } from '../../struct/types/command';
import { ApplicationCommandOptionType, ApplicationCommandType, MessageReaction, User } from 'discord.js';

export default new Command({
    name: 'voteban',
    type: ApplicationCommandType.ChatInput,
    description: 'voteban command',

    options: [
        {
            name: 'user',
            description: 'user to be banned',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'votes',
            description: 'number of votes needed to ban',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: 'reason',
            description: 'reason for ban',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],

    async run({ interaction, options }) {
        const user = options.getUser('user', true);
        const userContext = await interaction.guild?.members.fetch(user.id);
        const reason = options.getString('reason', false);
        const votes = options.getInteger('votes', true);

        let totalVotes = 0;

        const response = `Voteban started for ${user} with reason: ${reason} and ${votes} votes needed`;

        const reactions = ['✅', '❌'];

        interaction.reply({
            content: response
        });
        const message = await interaction.channel?.send({
            content: response
        });

        for (const reaction of reactions) {
            await message?.react(reaction);
        }

        const filter = (reaction: MessageReaction, user: User) =>
            reactions.includes(reaction.emoji.name || '') && user.id !== interaction.user.id;

        const collector = message?.createReactionCollector({ filter, time: 60000 });

        collector?.on('collect', (reaction, user) => {
            if (reaction.emoji.name === '✅') {
                totalVotes++;
                interaction.followUp({ content: `Total votes: ${totalVotes}` });
            }
        });

        collector?.on('end', () => {
            if (totalVotes >= votes) {
                interaction.followUp({
                    content: `Voteban passed, ${user.tag} has been banned for: ${reason || 'No reason provided'}`,
                });
                userContext?.ban({ reason: reason || 'No reason provided' });
            } else {
                interaction.followUp({ content: 'Voteban failed, not enough votes.' });
            }
        });
    },
});
