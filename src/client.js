// ============================================================================================================
// Houndbot4004
// client.js
// last updated: (11/21/2026)
// ============================================================================================================

const { Client, Intents, MessageButton, MessageActionRow, ButtonBuilder, ButtonStyle, MessageEmbed, EmbedBuilder, Partials, Events, Collection, WebhookClient, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction
    ]
});

const { QuickDB } = require("quick.db");
client.db = new QuickDB();
client.request = new (require("rss-parser"))();
client.config = require("./videoConfig.js");

require('events').EventEmitter.defaultMaxListeners = 20;

module.exports = client;