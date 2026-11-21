// ============================================================================================================
// Houndbot4004
// welcome.js
// last updated: (11/21/2026)
// ============================================================================================================
const client = require('./client.js');

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