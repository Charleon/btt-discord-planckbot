const Discord = require("discord.js");
var   XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const client = new Discord.Client();

var mapURLbase = "http://q-prod.net/BTT/Pictures/Levels/"
var mapURLClassic = "Classic/";
var mapURLSSBM = "SSBM/";
var mapURLPrefixClassic = "Stage%20";
var mapURLPrefixSSBM = "Melee%20-%20";

var classicLevelNameArray = ["r_01","r_02","r_03","r_03bis","r_03bis3","r_03bis2","r_01bis","r_04","r_05","r_06","r_08","r_07","r_07bis","r_07bis2","r_21","r_22","r_24","r_18","r_09","r_23","r_10","r_11","r_12","r_25","r_13","r_15","r_17","r_14","r_26","r_27","r_27bis2","r_27bis","r_19","r_20","r_16bis","r_31","r_32","r_33","r_28","r_28bis","r_16","r_34","r_35","r_35bis","r_36","r_37","r_38","r_30","r_39","r_41","r_42","r_43","r_44","r_45","r_48","r_47","r_shield","r_shield2","r_shield3","r_46","r_40","r_49","r_50","r_51","r_52","r_57","r_63","r_79","r_62","r_53","r_54","r_55","r_56","r_59","r_58","r_60","r_61","r_71","r_72","r_73","r_74","r_66","r_67","r_68","r_64","r_65","r_69","r_70","r_75","r_76","r_77","r_81","r_82","r_83","r_84","r_85","r_80","r_106","r_86","r_87","r_88","r_89","r_90","r_102","r_107","r_91","r_92","r_93","r_94","r_95","r_96","r_97bis","r_29","r_78","r_97","r_98","r_99","r_105","r_100","r_101","r_103","r_104","r_110","r_111","r_112","r_108","r_109","r_113","r_114","r_115","r_116","r_117","r_118","r_119","r_120","r_121","r_122","r_123","r_124","r_125"];
var ssbmLevelNameArray = ["ssbm_01","ssbm_02","ssbm_03","ssbm_04","ssbm_05","ssbm_06","ssbm_07","ssbm_08","ssbm_09","ssbm_10","ssbm_11","ssbm_12","ssbm_13","ssbm_14","ssbm_15","ssbm_16","ssbm_17","ssbm_18","ssbm_19","ssbm_20","ssbm_21","ssbm_22","ssbm_23","ssbm_24","ssbm_25"];

var theChannel;

function getClassicStageLink(stageNumber)
{
    fullPath = mapURLbase + mapURLClassic + mapURLPrefixClassic + stageNumber + ".png";
    return fullPath;
}

function getSSBMStageLink(stageNumber)
{
    fullPath = mapURLbase + mapURLSSBM + mapURLPrefixSSBM + stageNumber + ".png";
    return fullPath;
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function sendMessageToChat(theText)
{
    theChannel.send(theText);
}

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", (message) => {
    // Direct replies
    if (message.content.toLowerCase().indexOf("thank you planck") !== -1)
    {
        const emoji = client.emojis.find("name", "pda");
        message.reply("You're welcome! " + emoji);
        return;
    }

    // Commands
    if (message.content.startsWith("!"))
    {
        var commandList = message.content.substr(1).split(" ");
        var commandlistLength = commandList.length;

        if(commandList.length < 1)
        {
            return;
        }
        var command = commandList[0];

        // Maps
        if(command === "level")
        {
            var levelNumber = commandList[1];
            if (commandlistLength == 2 && Number(levelNumber) != NaN)
            {
                url = "";

                if(Number(levelNumber) > 0 && Number(levelNumber) < 141)
                {
                    url = getClassicStageLink(levelNumber);
                }

                message.channel.send(url);
            }
        }

        if(command === "ssbm")
        {
            var levelNumber = commandList[1];
            if (commandlistLength == 2 && Number(levelNumber) != NaN)
            {
                url = "";

                if(Number(levelNumber) > 0 && Number(levelNumber) < 26)
                {
                    url = getSSBMStageLink(levelNumber);
                }

                message.channel.send(url);
            }
        }

        // Leaderboards
        if(command === "lb")
        {
            if (commandlistLength == 4)
            {
                var levelNumber = Number(commandList[3]);
                var levelType = commandList[2];
                var character = commandList[1];

                if (character.toLowerCase() != "zerex" && character.toLowerCase() != "planck" && character.toLowerCase() != "p" && character.toLowerCase() != "z" ){ return; }

                var characterValue = 0;
                if(character == "zerex" || character == "z" ) {
                    characterValue = 1;
                }

                if (Number(levelNumber) == NaN) { return; }

                var levelName = "";
                if (levelType.toLowerCase() == "level")
                {
                    if(levelNumber < 1 || levelNumber > 140) { return; }
                    levelName = classicLevelNameArray[levelNumber - 1];

                }
                else if(levelType.toLowerCase() == "ssbm")
                {
                    if(levelNumber < 1 || levelNumber > 25) { return; }
                    levelName = ssbmLevelNameArray[levelNumber - 1];
                }

                var url = "http://q-prod.net/BTT/api/discord.php?ch="+ characterValue +"&level=" + levelName + "&limit=5&scrmd=0&displaylevel="+levelNumber;
                theChannel = message.channel;
                httpGetAsync(url, sendMessageToChat);
            }
        }

        if(command === "qual")
        {
            message.channel.send("My Daddy");
        }

        if(command === "commands")
        {
            var output = "```\n" +
                "Picture of map \<number\>\n" +
                "    !level \<number\>\n" +
                "Picture of ssbm map \<number\>\n" +
                "    !ssbm  \<number\>\n" +
                "Leaderboard top 5. Parameters = <character> = z, zerex, p, planck. <leveltype> = level, ssbm, <levelNumber> = 1-140, 1-25.\n" +
                "    !lb <character> <leveltype> <levelNumber>```";
            message.channel.send(output);
        }
    }
});

client.login("");