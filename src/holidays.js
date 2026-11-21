// ============================================================================================================
// Houndbot4004
// holidays.js
// last updated: (11/21/2026)
// ============================================================================================================
const fs = require("fs");
const client = require('./client.js');
//========================================================================
// Random Holiday of the Day - last updated (3/28/2026)
//========================================================================
let lastHolidayDate = "";

function Random_Holiday_of_the_Day() {
    const today = new Date();
    const todayMonth = today.getMonth() + 1;  // 3 (number)
    const todayDay = today.getDate();         // 28 (number)
    const fullDate = today.toDateString();

    // If we already posted today, stop
    if (lastHolidayDate === fullDate) return;

    const holidayChannel = client.channels.cache.get(process.env.DISCORD_HOLLIDAY_CHAT_ID);

    try {
        const data = fs.readFileSync('./Random Holidays.txt', 'utf8');
        const lines = data.split('\n');

        let holidayMessage = "No special holiday found... Hmmm.. yell at Hound4004 to fix me!";
        for (const line of lines) {
            // Get the date part (first 5 characters like "03/28")
            const datePart = line.substring(0, 5);
            const fileMonth = parseInt(datePart.substring(0, 2));  // "03" → 3
            const fileDay = parseInt(datePart.substring(3, 5));    // "28" → 28

            if ((fileMonth === todayMonth) && (fileDay === todayDay)) {
                holidayMessage = line.substring(6);
                break;
            }
        }

        const formattedDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        holidayChannel.send(`📅 **${formattedDate}**\n🎉 Today's Random Holiday: **${holidayMessage}**`);
        lastHolidayDate = fullDate;
        console.log(`📅 Sent holiday: ${holidayMessage}`);

    } catch (error) {
        console.error('Holiday error:', error.message);
    }
}
//========================================================================
// END Random Holiday
//========================================================================
module.exports = { Random_Holiday_of_the_Day };
