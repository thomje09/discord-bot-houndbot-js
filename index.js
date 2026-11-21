// ============================================================================================================
// This is Hound4004's Discord bot called Houndbot4004 for his Discorder Server "Houndcord4004" 
// This bot's index was last updated (11/21/2026)
// ============================================================================================================

// ============================================================================================================
// GLOBAL ERROR HANDLING Updated (3/24/2026)
// ============================================================================================================
// Catch sync errors (crashes)
process.on('uncaughtException', (err) => {
  console.error('🔥 Uncaught Exception:');
  console.error(err);
});

// Catch async errors (promises)
process.on('unhandledRejection', (reason, promise) => {
  console.error('🔥 Unhandled Rejection at:', promise);
  console.error('Reason:', reason);
});

// ============================================================================================================
const client = require('./src/client.js');
const { Events } = require('discord.js');

require('./src/messageHandler.js'); // run mesage handelers (fun + swear bot detection)

const { Random_Holiday_of_the_Day } = require('./src/holidays.js');
const { handleUploads } = require('./src/youtube.js');


// ============================================================================================================
// Discord (client) ERROR HANDLING Updated (3/24/2026)
// ============================================================================================================
// Discord client errors
client.on('error', (err) => {
  console.error('🤖 Discord Client Error:', err);
});

// Discord warnings (rate limits, etc.)
client.on('warn', (info) => {
  console.warn('⚠️ Discord Warning:', info);
});

// Optional: log when bot disconnects/reconnects
client.on('shardDisconnect', (event, shardId) => {
  console.warn(`⚠️ Shard ${shardId} disconnected`, event);
});

client.on('shardReconnecting', (shardId) => {
  console.log(`🔄 Shard ${shardId} reconnecting...`);
});

// ============================================================================================================
//files data: and logged in Last updated (3/25/2026)
// ============================================================================================================

const keepAlive = require('./server.js');

client.once(Events.ClientReady, c => {
  console.log(`✅ Logged in as ${c.user.tag}`);
  console.log("Starting start_up()...");
  start_up();
  console.log("start_up() completed!");
});

//========================================================================
//start_up() function| run all functions | last Updated (11/12/2026)
//========================================================================
function start_up() {
  // (functions like swear _detect are called on the user input later in the code! 

  console.log("📍 start_up: Starting reactionroles...");
  reactionroles();

  console.log("📍 start_up: Starting handleUploads...");
  handleUploads().catch(console.error);;
  setInterval(handleUploads, 300000); // every 5 minutes

  console.log("📍 start_up: Setting Random Holiday function...");
  Random_Holiday_of_the_Day();
  setInterval(Random_Holiday_of_the_Day, 12 * 60 * 60 * 1000); // Check every 12 hours

  console.log("✅ start_up: All functions started!");
}

//========================================================================
// welcome bot
//========================================================================
client.on('guildMemberAdd', member => {
  const welcome_channel = client.channels.cache.get('700732150529392741');
  welcome_channel.send(`<@${member.id}> Welcome to the server! Before you start, please check <#${695022777081528363}>`);

  let Role_Testrole = member.guild.roles.cache.find(r => r.name === "DISCORD_ROLES_REACT_ROBOT_EMOJI_ID");
  member.roles.add(Role_Testrole).catch(console.error);
  console.log("welcome worked");
});
//========================================================================
// end welcome bot
//========================================================================


//========================================================================
//react to gain/remove roles last updated (?/?/????)
//========================================================================
//reaction working
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

  client.on("messageReactionAdd", async (reaction, user) => {
    const reactedMessageId = reaction.message.id;
    const matchedReaction = reactions.find((react) => react.messageId === reactedMessageId && react.emoji === reaction.emoji.name);

    if (matchedReaction && matchedReaction.function) {
      matchedReaction.function(user);
      reaction.message.reactions.resolve(reaction.emoji.name).users.remove(user.id)
        .catch(console.error);
    }
  });

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
}


//========================================================================
// Keep bot alive! | Last updated (3/26/2026)
//========================================================================
Bot_Alive();
function Bot_Alive() {
  login_do();
  keepAlive(); // keepAlive() on server.js
}

function login_do() {
  client.login(process.env.TOKEN)
    .catch((err) => {
      console.warn("[CRASH] Something went wrong when connecting to Houndbot... \n");
      console.warn("[CRASH] Error from Discord API:" + err);
      process.exit();
    });
  console.log("still connected!");
}
module.exports = login_do;

//========================================================================
//========================================================================
