// ============================================================================================================
// Houndbot4004
// messageHandler.js
// last updated: (11/21/2026)
// ============================================================================================================
const client = require('./client.js');
const { bad_words } = require('../Swear_Bot_vocab.js');


//========================================================================
// User input (messgae) detection Last update (3/24/2026)  
// Need to only have one client.on('messageCreate'.... fix this soon!
//========================================================================
//works, fires multiple times!
const triggerWords = ['banana', 'fire', 'white'];

client.on('messageCreate', (message) => {
    const message_content = message.content.toLowerCase(); //Lets simplify the message to the letters

    triggerWords.forEach((word) => {
        if (message_content.includes(word) && message.author.id != 946745700966891550) {
            message.reply(message_content);
        }
    })
    if (message_content.includes("houndbot")) {
        message.react('🤖').catch(console.error);
    }

    if (message_content == "hi") {
        message.reply({ content: 'hello', allowedMentions: { repliedUser: false } });
    }

    Swear_detect(message_content, message); //This calls to the swear detect function below. passes the message to said fuction
});

//========================================================================
//Swear Bot function last updated (3/26/2026)
//========================================================================
const recentSwears = {};

function Swear_detect(message_content, message) {
    const userId = message.author.id;
    let message_contains_bad_word = false

    for (const bad_word of bad_words) {
        const bad_word_pattern = new RegExp(`\\b${bad_word}\\b`, 'i');     // \b matches word boundaries (spaces, punctuation, start/end)
        if (bad_word_pattern.test(message_content)) {
            message_contains_bad_word = true;
            break;
        }
    }

    if (message_contains_bad_word == true) {
        const now = Date.now();   // Get current time
        // Clean up old swears (keep only last 5 minutes)
        if (!recentSwears[userId]) {
            recentSwears[userId] = [];
        }
        recentSwears[userId] = recentSwears[userId].filter(time => now - time < 300000); // 5 minutes
        recentSwears[userId].push(now);

        // Count swears in last 5 minutes
        const swearCount = recentSwears[userId].length;
        let swear_warning_Message_reply = "";

        if (swearCount == 1) {
            swear_warning_Message_reply = "No swearing please! 😊";
        }
        else if (swearCount == 2) {
            swear_warning_Message_reply = "I already told you! No swearing! ⚠️";
        }
        else if (swearCount >= 3) {
            swear_warning_Message_reply = "FINAL WARNING! Stop swearing or you'll be muted! 🚫";
        }
        message.channel.send(`<@${message.author.id}>, ${swear_warning_Message_reply}`).catch(console.error);
        message.delete().catch(console.error);
    }
}
//========================================================================
//end swear bot
//========================================================================