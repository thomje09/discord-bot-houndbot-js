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
require('./src/welcome.js'); // run welcome bot
require('./src/reactionRoles.js'); // run reaction rolls

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
  console.log("📍 start_up: Starting handleUploads...");
  handleUploads().catch(console.error);
  setInterval(handleUploads, 300000); // every 5 minutes

  console.log("📍 start_up: Setting Random Holiday function...");
  Random_Holiday_of_the_Day();
  setInterval(Random_Holiday_of_the_Day, 12 * 60 * 60 * 1000); // Check every 12 hours

  console.log("✅ start_up: All functions started!");
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
