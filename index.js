const commando = require('discord.js-commando');
const path = require('path');
const aws = require('aws-sdk');

const client = new commando.Client({
    owner: process.env.owner,
    commandPrefix: 'np.',
    unknownCommandResponse: false
});

client.registry
  .registerGroups([
    ['text', 'Text Commands'],
    ['twitch', 'Twitch Commands']
])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, "commands"));

// Ready to launch
client.on('ready', () => {
  console.log('Logged in as NP Bot.')
});

// DM's any new users
client.on('guildMemberAdd', member => {

  // Welcome message
  // emojis
  const npg = client.emojis.find(emoji => emoji.name === "NPG");
  const tripz = client.emojis.find(emoji => emoji.name === "TRIPZ");
  const nathan = client.emojis.find(emoji => emoji.name === "NATHAN");
  const daxedy = client.emojis.find(emoji => emoji.name === "Daxedy");

  member.guild.channels.find(channel => channel.name === "welcome").send(`Hey ${member.user}, welcome to No Problem Gaming Public ${npg}! If you are here for a tryout please contact Tripz ${tripz} for Rust or Nathan ${nathan} and Daxedy ${daxedy} for siege, and please go to the <#511739375764111381> channel to receive a role, visit <#415684176461824000> for more info.`);

  // Send the message to DM:
  member.user.send(`Welcome to the NP Public server, ${member}!`);
  member.user.send('Type  *np.r6s*  or  *np.rust*  in the #roles channel to get a role.');
  let defaultRole = member.guild.roles.find(role => role.name === "Member");
  member.addRole(defaultRole)
});

// Check to see if person started streaming based on game status update
client.on('presenceUpdate', (oldMember, newMember) => {
  // Checks for any game activity
  if (newMember.presence.game != null) {

    // Variables
    let liveRole = newMember.guild.roles.find(role => role.name === "Now Live");
    let streamerRole = newMember.guild.roles.find(role => role.name === "NP Streamers/Content Creators");

    // If that person is streaming
    if (newMember.presence.game.streaming === true) {

      // Announces in self-advertising
      console.log(`${newMember.displayName} is streaming!`);
      // newMember.guild.channels.find(channel => channel.name === "self_advertisement").send(`${newMember.displayName} is streaming ${newMember.presence.game.name}! Come check it out: ${newMember.presence.game.url}`)

      console.log('Does this person have streamer role? ' + newMember.roles.has(streamerRole.id));
      // If part of stream team.
      if (newMember.roles.has(streamerRole.id)) {
        // Add role of Now Live.
        console.log(`Giving Now Live role to ${newMember.displayName}.`);
        newMember.addRole(liveRole);
      };

      // removes Now Live when stream ends.
    } else {
      console.log('Presence update either: ended stream or wasn\'t streaming');
      if (newMember.highestRole === liveRole) {
        console.log(`removing ${liveRole.name}`);
        newMember.removeRole(liveRole);
      };
    };
    // If no game activity shown, still removes Now Live
  } else {
    let liveRole = newMember.guild.roles.find(role => role.name === "Now Live");
    if (newMember.highestRole === liveRole) {
      console.log(`Removing ${liveRole.name} from ${newMember.displayName} without game activity.`);
      newMember.removeRole(liveRole);
    };
  };
});

// Bot login
client.login(process.env.token);
