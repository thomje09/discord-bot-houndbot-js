// ============================================================================================================
// Houndbot4004
// reactionRoles.js
// last updated: (11/21/2026)
// ============================================================================================================

const client = require('./client.js');

//========================================================================
//react to gain/remove roles last updated (?/?/????)
//========================================================================

const reactions = reactionroles();

client.on("messageReactionAdd", async (reaction, user) => {
    const reactedMessageId = reaction.message.id;
    const matchedReaction = reactions.find((react) => react.messageId === reactedMessageId && react.emoji === reaction.emoji.name);

    if (matchedReaction && matchedReaction.function) {
        matchedReaction.function(user);
        reaction.message.reactions.resolve(reaction.emoji.name).users.remove(user.id)
            .catch(console.error);
    }
});

function reactionroles() {
    const reactions = [
        { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "🔔", function: AllNotifications },
        { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "📢", function: Announcements },
        { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "📊", function: Polls },
        { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "🤖", function: BotUpdates },
        { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "🎬", function: AllContent },
        { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "🎥", function: Videos },
        { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "🩳", function: Shorts },
        { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "🔴", function: Live },
        { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "🎙️", function: Podcast },
        { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "📰", function: MinecraftNews },
        { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "❌", function: Mee6Hate },
        { messageId: process.env.DISCORD_ROLES_Message_ID, emoji: "✅", function: Mee6Love }
    ];

    function AllNotifications(user) {
        const guild = client.guilds.cache.get("599652841132392476");
        const member = guild.members.cache.get(user.id);

        const requiredRoles = [
            "1107291772784222330",
            "1107292972262903888",
            "1107293670991999026",
            "1107294677171974207",
            "1112062613640200292",
            "1107296255794745354",
            "1107296662621257800",
            "1107297102788300911"
        ];

        const hasAllRoles = requiredRoles.every(roleId => member.roles.cache.has(roleId));

        if (hasAllRoles) {
            requiredRoles.forEach(roleId => member.roles.remove(roleId));
        } else {
            requiredRoles.forEach(roleId => member.roles.add(roleId));
        }
    }

    function Announcements(user) {
        const guild = client.guilds.cache.get("599652841132392476");
        const member = guild.members.cache.get(user.id);

        if (member.roles.cache.has("1107291772784222330")) {
            member.roles.remove("1107291772784222330");
        } else {
            member.roles.add("1107291772784222330");
        }
    }

    function Polls(user) {
        const guild = client.guilds.cache.get("599652841132392476");
        const member = guild.members.cache.get(user.id);

        if (member.roles.cache.has("1107292972262903888")) {
            member.roles.remove("1107292972262903888");
        } else {
            member.roles.add("1107292972262903888");
        }
    }

    function BotUpdates(user) {
        const guild = client.guilds.cache.get("599652841132392476");
        const member = guild.members.cache.get(user.id);

        if (member.roles.cache.has("1107293670991999026")) {
            member.roles.remove("1107293670991999026");
        } else {
            member.roles.add("1107293670991999026");
        }
    }

    function AllContent(user) {
        const guild = client.guilds.cache.get("599652841132392476");
        const member = guild.members.cache.get(user.id);

        const requiredRoles = [
            "1107294677171974207",
            "1112062613640200292",
            "1107296255794745354"
        ];

        const hasAllRoles = requiredRoles.every(roleId => member.roles.cache.has(roleId));

        if (hasAllRoles) {
            requiredRoles.forEach(roleId => member.roles.remove(roleId));
        } else {
            requiredRoles.forEach(roleId => member.roles.add(roleId));
        }
    }

    function Videos(user) {
        const guild = client.guilds.cache.get("599652841132392476");
        const member = guild.members.cache.get(user.id);

        if (member.roles.cache.has("1107294354726469672")) {
            member.roles.remove("1107294354726469672");
        } else {
            member.roles.add("1107294354726469672");
        }
    }

    function Shorts(user) {
        const guild = client.guilds.cache.get("599652841132392476");
        const member = guild.members.cache.get(user.id);

        if (member.roles.cache.has("1112062613640200292")) {
            member.roles.remove("1112062613640200292");
        } else {
            member.roles.add("1112062613640200292");
        }
    }

    function Live(user) {
        const guild = client.guilds.cache.get("599652841132392476");
        const member = guild.members.cache.get(user.id);

        if (member.roles.cache.has("1107296255794745354")) {
            member.roles.remove("1107296255794745354");
        } else {
            member.roles.add("1107296255794745354");
        }
    }

    function Podcast(user) {
        const guild = client.guilds.cache.get("599652841132392476");
        const member = guild.members.cache.get(user.id);

        if (member.roles.cache.has("1107296662621257800")) {
            member.roles.remove("1107296662621257800");
        } else {
            member.roles.add("1107296662621257800");
        }
    }

    function MinecraftNews(user) {
        const guild = client.guilds.cache.get("599652841132392476");
        const member = guild.members.cache.get(user.id);

        if (member.roles.cache.has("1107297102788300911")) {
            member.roles.remove("1107297102788300911");
        } else {
            member.roles.add("1107297102788300911");
        }
    }

    function Mee6Love(user) {
        const guild = client.guilds.cache.get("599652841132392476");
        const member = guild.members.cache.get(user.id);

        if (member.roles.cache.has("713050162574000209")) {
            member.roles.remove("713050162574000209");
        } else {
            member.roles.add("713050162574000209");
        }
    }

    function Mee6Hate(user) {
        const guild = client.guilds.cache.get("599652841132392476");
        const member = guild.members.cache.get(user.id);

        if (member.roles.cache.has("713050273458946110")) {
            member.roles.remove("713050273458946110");
        } else {
            member.roles.add("713050273458946110");
        }
    }
    return reactions;

}
