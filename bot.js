const Discord = require("discord.js");
var   XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const client = new Discord.Client();

var mapURLbase = "http://q-prod.net/BTT/Pictures/Levels/";
var weekliesURLbase = "http://q-prod.net/BTT/challenges.php?discord=1";
var thsURLbase = "http://q-prod.net/BTT/api/discord_ths.php";
var ranksearchURLbase = "http://q-prod.net/BTT/api/discord_ranksearch.php";
var compareURLbase = "http://q-prod.net/BTT/api/discord_compare.php";
var battleURLbase = "http://q-prod.net/BTT/api/discord_battle.php";
var mapURLClassic = "Classic/";
var mapURLSSBM = "SSBM/";
var mapURLPrefixClassic = "Stage%20";
var mapURLPrefixSSBM = "Melee%20-%20";

var classicLevelNameArray = ["r_01", "r_02", "r_03", "r_03bis", "r_03bis3", "r_03bis2", "r_01bis", "r_04", "r_05", "r_06", "r_08", "r_07", "r_07bis", "r_07bis2", "r_21", "r_22", "r_24", "r_18", "r_09", "r_23", "r_10", "r_11", "r_12", "r_25", "r_13", "r_15", "r_17", "r_14", "r_26", "r_27", "r_27bis2", "r_27bis", "r_19", "r_20", "r_16bis", "r_31", "r_32", "r_33", "r_28", "r_28bis", "r_16", "r_34", "r_35", "r_35bis", "r_36", "r_37", "r_38", "r_30", "r_39", "r_41", "r_42", "r_43", "r_44", "r_45", "r_48", "r_47", "r_shield", "r_shield2", "r_shield3", "r_46", "r_40", "r_49", "r_50", "r_51", "r_52", "r_57", "r_63", "r_79", "r_62", "r_53", "r_54", "r_55", "r_56", "r_59", "r_58", "r_60", "r_61", "r_71", "r_72", "r_73", "r_74", "r_66", "r_67", "r_68", "r_64", "r_65", "r_69", "r_70", "r_75", "r_76", "r_77", "r_81", "r_82", "r_83", "r_84", "r_85", "r_80", "r_106", "r_86", "r_87", "r_88", "r_89", "r_90", "r_102", "r_107", "r_91", "r_92", "r_93", "r_94", "r_95", "r_96", "r_97bis", "r_29", "r_78", "r_97", "r_98", "r_99", "r_105", "r_100", "r_101", "r_103", "r_104", "r_110", "r_111", "r_112", "r_108", "r_109", "r_113", "r_114", "r_115", "r_116", "r_117", "r_118", "r_119", "r_120", "r_121", "r_122", "r_123", "r_124", "r_125"];
var ssbmLevelNameArray = ["ssbm_01", "ssbm_02", "ssbm_03", "ssbm_04", "ssbm_05", "ssbm_06", "ssbm_07", "ssbm_08", "ssbm_09", "ssbm_10", "ssbm_11", "ssbm_12", "ssbm_13", "ssbm_14", "ssbm_15", "ssbm_16", "ssbm_17", "ssbm_18", "ssbm_19", "ssbm_20", "ssbm_21", "ssbm_22", "ssbm_23", "ssbm_24", "ssbm_25"];

var theChannel;

function getClassicStageLink(stageNumber) {
    fullPath = mapURLbase + mapURLClassic + mapURLPrefixClassic + stageNumber + ".png";
    return fullPath;
}

function getSSBMStageLink(stageNumber) {
    fullPath = mapURLbase + mapURLSSBM + mapURLPrefixSSBM + stageNumber + ".png";
    return fullPath;
}

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function sendMessageToChat(theText) {
    
    theChannel.send(theText,{split:true});
}

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", (message) => {
    // Direct replies
    if (message.content.toLowerCase().indexOf("thank you") !== -1) {
        const emoji = client.emojis.find("name", "pda");
        message.reply("You're welcome! " + emoji);
        return;
    }

    // Commands
    if (message.content.startsWith("!")) {
        var commandList = message.content.substr(1).split(" ");
        var commandlistLength = commandList.length;

        if (commandList.length < 1) {
            return;
        }
        var command = commandList[0];

        // Maps
        if (command === "level") {
             // Display a Classic level picture.
            var levelNumber = commandList[1];
            if (commandlistLength == 2 && Number(levelNumber) != NaN) {
                url = "";

                if (Number(levelNumber) > 0 && Number(levelNumber) < 141) {

                    url = getClassicStageLink(levelNumber);
                }
                const embed = new Discord.RichEmbed() 
                .setTitle((command+" "+levelNumber).toUpperCase())
                .setImage(url)
                .setFooter(message.content)
                .setColor(0x0086AE);
                message.channel.send({embed});
            }
        }

        if (command === "ssbm") {
             // Display a Ssbm picture.
            var levelNumber = commandList[1];
            if (commandlistLength == 2 && Number(levelNumber) != NaN) {
                url = "";

                if (Number(levelNumber) > 0 && Number(levelNumber) < 26) {
                    url = getSSBMStageLink(levelNumber);
                }
                const embed = new Discord.RichEmbed() 
                .setTitle((command+" "+levelNumber).toUpperCase())
                .setImage(url)
                .setFooter(message.content)
                .setColor(0xAE0028);
                message.channel.send({embed});
            }
        }

        // Leaderboards
        if (command === "lb") {
             // Display a specific level leaderboard.
            if (commandlistLength == 4) {
                var levelNumber = Number(commandList[3]);
                var levelType = commandList[2];
                var character = commandList[1];

                if (character.toLowerCase() != "zerex" && character.toLowerCase() != "planck" && character.toLowerCase() != "p" && character.toLowerCase() != "z") { return; }

                var characterValue = 0;
                if (character == "zerex" || character == "z") {
                    characterValue = 1;
                }

                if (Number(levelNumber) == NaN) { return; }

                var levelName = "";
                if (levelType.toLowerCase() == "level") {
                    if (levelNumber < 1 || levelNumber > 140) { return; }
                    levelName = classicLevelNameArray[levelNumber - 1];

                }
                else if (levelType.toLowerCase() == "ssbm") {
                    if (levelNumber < 1 || levelNumber > 25) { return; }
                    levelName = ssbmLevelNameArray[levelNumber - 1];
                }

                var url = "http://q-prod.net/BTT/api/discord.php?ch=" + characterValue + "&level=" + levelName + "&limit=5&scrmd=0&displaylevel=" + levelNumber;
                theChannel = message.channel;
                httpGetAsync(url, sendMessageToChat);
            }
        }

        if (command === "qual") {
            message.channel.send("My Daddy <3");
        }

        if (command === "alive") {
            const emoji = client.emojis.find("name", "pda");
            message.channel.send("Hi, I'm ready to help!\n"+emoji);
            

        }

        if (command === "wc") {
            // Display actives Weekly Challenges.
            theChannel = message.channel;
            httpGetAsync(weekliesURLbase, sendMessageToChat);
        }

        if (command === "battle") {
            // DISCORD BATTLE \o/.
            if (commandlistLength == 2){
                
                if (commandList[1]=="create") {
                theChannel = message.channel;
                httpGetAsync(battleURLbase+"?create=1", sendMessageToChat);
                }
                else  {
                    theChannel = message.channel;
                    httpGetAsync(battleURLbase+"?status="+commandList[1], sendMessageToChat);
                    }
                }

        }

        if (command === "planck") {
            // Display some commands exemples.
            theChannel = message.channel;
            message.channel.send("Hi! How can I help you?");
            message.channel.send("To see the Planck Top 5 of level #55:");
            message.channel.send("```!lb p level 55```");
            message.channel.send("```For Zerex Ssbm #11: !lb z ssbm 11```");
            message.channel.send("To display the picture of level #138");
            message.channel.send("```!level 138```");
            message.channel.send("If you want to see the Cumulated WRs THS:8");
            message.channel.send("```!ths```");
            message.channel.send("To list currents active Weekly Challenges:");
            message.channel.send("```!wc```");
            message.channel.send("More sick commands?");
            message.channel.send("```!commands```");

        }
        
        if (command === "embed") {
            // Display some commands exemples. Don't delete for further references :D

         
        const embed = new Discord.RichEmbed()
        .setTitle("This is your title, it can hold 256 characters")
        .setAuthor("Author Name", "https://i.imgur.com/lm8s41J.png")
        /*
        * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
        */
        .setColor(0x00AE86)
        .setDescription("This is the main body of text, it can hold 2048 characters.")
        .setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
        .setImage("http://i.imgur.com/yVpymuV.png")
        .setThumbnail("http://i.imgur.com/p2qNFag.png")
        /*
        * Takes a Date object, defaults to current date.
        */
        .setTimestamp()
        .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
        .addField("This is a field title, it can hold 256 characters",
            "This is a field value, it can hold 2048 characters.")
        /*
        * Inline fields may not display as inline if the thumbnail and/or image is too big.
        */
        .addField("Inline Field", "They can also be inline.", true)
        /*
        * Blank field, useful to create some space.
        */
        .addBlankField(true)
        .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);

        message.channel.send({embed});    
        }
        if (command === "search") {
            // Search a nickname in the database, and display how well it's ranked
            if (commandlistLength == 4) {
                var nickname = commandList[1];
                var levelType = commandList[3]; //done
                var character = commandList[2]; //done
                if (character.toLowerCase() != "zerex" && character.toLowerCase() != "planck" && character.toLowerCase() != "p" && character.toLowerCase() != "z") { return; }

                var characterValue = 0;
                if (character == "zerex" || character == "z") {
                    characterValue = 1;
                }
                var levelValue = 0;
                if (levelType.toLowerCase() == "classic") {
                    levelValue = 0;
                }
                else if (levelType.toLowerCase() == "ssbm") {
                    levelValue = 1;
                }
                var url = ranksearchURLbase + "?character=" + characterValue + "&type=" + levelValue + "&nickname=" + nickname;
                theChannel = message.channel;
                httpGetAsync(url, sendMessageToChat);

            }

        }

        if (command === "compare") {
            // Compare the score between 2 players
            if (commandlistLength == 5) {
                var p1 = commandList[1];
                var p2 = commandList[2];
                var levelType = commandList[4]; //done
                var character = commandList[3]; //done
                if (character.toLowerCase() != "zerex" && character.toLowerCase() != "planck" && character.toLowerCase() != "p" && character.toLowerCase() != "z") { return; }

                var characterValue = 0;
                if (character == "zerex" || character == "z") {
                    characterValue = 1;
                }
                var levelValue = 0;
                if (levelType.toLowerCase() == "classic") {
                    levelValue = 0;
                }
                else if (levelType.toLowerCase() == "ssbm") {
                    levelValue = 1;
                }
                var url = compareURLbase + "?character=" + characterValue + "&type=" + levelValue + "&p1=" + p1 + "&p2=" + p2;
                theChannel = message.channel;
                httpGetAsync(url, sendMessageToChat);

            }

        }

        if (command === "ths") {
            // Display Cumulated World Records for CLassic, Ssbm and both characters.
            theChannel = message.channel;
            httpGetAsync(thsURLbase, sendMessageToChat);
        }

        if (command === "commands") {
            // Display a nicely formatted list of available commands.
            var c ="```";
            var output = 
            "Picture of a Classic level. *Parameters = <levelNumber> 1-140*\n" +
                c+"!level \<levelNumber\>"+c+"\n"+
            "Picture of a Ssbm level. *Parameters = <levelNumber> 1-25*\n" +
                c+"!ssbm \<levelNumber\>"+c+"\n"+
            "Leaderboard top 5. *Parameters = <character> = z, zerex, p, planck. <leveltype> = level, ssbm, <levelNumber> = 1-140, 1-25.*\n" +
                c+"!lb <character> <leveltype> <levelNumber>"+c+"\n"+
            "Search how well a nickname is ranked. *Parameters = \<nickname\> = nickname to search. <character> = z, zerex, p, planck. <leveltype> = classic, ssbm.*\n" +
                c+"!search  \<nickname\> <character> <leveltype>"+c+"\n"+
            "Compare the scores of 2 players. *Parameters = \<p1\> \<p1\> = nicknames to search. <character> = z, zerex, p, planck. <leveltype> = classic, ssbm.*\n" +
                c+"!search  \<p1\> \<p2\> <character> <leveltype>"+c+"\n"+
            "Total Cumulated World Records\n" +
                c+"!ths"+c+"\n"+
            "Active Weekly Challenges\n" +
                c+"!wc"+c+"\n";
            
            message.channel.send(output);
        }
    }
});

client.login("");
