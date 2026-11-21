// ============================================================================================================
// Houndbot4004
// youtube.js
// last updated: (11/21/2026)
// ============================================================================================================
const fs = require("fs");
const client = require('./client.js');

//========================================================================
//Get Latest Hound4004 YouTube Video / detect video  - last updated (11/12/2026)
//========================================================================
async function handleUploads() {
    const postedVideos = await client.db.get(`postedVideos`);
    if (postedVideos === null || postedVideos === undefined) {
        await client.db.set(`postedVideos`, []);
    }
    console.log("Video_checked");

    const Gather_json_file_data = async () => {
        const data_gathered = fs.readFileSync('./json.sqlite');
        return data_gathered;
    };

    client.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${client.config.channel_id}`)
        .then(async data => {
            const posted = await client.db.get(`postedVideos`);
            if (posted.includes(data.items[0].link)) return;
            else {
                //delete json.sqlite here?
                await client.db.set(`videoData`, data.items[0]);
                await client.db.push("postedVideos", data.items[0].link);
                let parsed = await client.db.get(`videoData`);
                let channel = client.channels.cache.get(client.config.Discord_Video_channel);
                if (!channel) return;

                //below should only delete the old, if a new video is posted!
                //delete word_test
                delete_word_json();
                function delete_word_json() {

                    Gather_json_file_data().then(data_gathered => {
                        console.log("gathered video data 1");
                        if (data_gathered.includes("News")) {

                            var delete_data = "\b";
                            fs.appendFile('json.sqlite', delete_data,
                                // callback function
                                function (err) {
                                    if (err) throw err;
                                    // if no error
                                    console.log("deleted data in json.sqlite sucsesfully");
                                }
                            );
                        }
                        if (data_gathered.includes("Shorts")) {

                            var delete_data = "\b";
                            fs.appendFile('json.sqlite', delete_data,
                                // callback function
                                function (err) {
                                    if (err) throw err;
                                    // if no error
                                    console.log("deleted data in json.sqlite sucsesfully");
                                }
                            );
                        }
                    }).catch(err => {
                        console.log('some error occured in using/gathering data');
                        return data_gathered;
                    });
                }
                //End_delete word_test

                var title_check = /{title}/g;
                if (title_check == "chicken") { console.log("Cluck"); } else {
                    console.log("test");

                    Gather_json_file_data().then(data_gathered => {
                        console.log(data_gathered);
                        if (data_gathered.includes("News")) {
                            console.log("News Video type");
                            let message_video = client.config.messageTemplateMCN
                                .replace(/{author}/g, parsed.author)
                                .replace(/{title}/g, parsed.title)
                                //Discord.Util.escapeMarkdown(parsed.title))
                                .replace(/{url}/g, parsed.link);
                            channel.send(message_video);
                        } else if (data_gathered.includes("Shorts")) {
                            console.log("Short Video");
                            let message_video = client.config.messageTemplateSHT
                                .replace(/{author}/g, parsed.author)
                                .replace(/{title}/g, parsed.title)
                                //Discord.Util.escapeMarkdown(parsed.title))
                                .replace(/{url}/g, parsed.link);
                            channel.send(message_video);
                        } else {
                            console.log("Defalt video type ");
                            let message_video = client.config.messageTemplate
                                .replace(/{author}/g, parsed.author)
                                .replace(/{title}/g, parsed.title)
                                // Discord.Util.escapeMarkdown(parsed.title))
                                .replace(/{url}/g, parsed.link);
                            channel.send(message_video);
                        }
                        console.log("Video Posted!!?!?");
                    });
                }//end chicken ELSE
                console.log("maybe_2");

            }
        });
    //}); //non needed interval end
}
//end detect video


module.exports = { handleUploads };