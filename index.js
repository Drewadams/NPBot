const commando = require('discord.js-commando');
const path = require('path');
const config = require('./config.json');

const client = new commando.Client({
    owner: config.owner,
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
      newMember.guild.channels.find(channel => channel.name === "self-advertising").send(`${newMember.displayName} is streaming ${newMember.presence.game.name}! Come check it out: ${newMember.presence.game.url}`)

      // If part of stream team.
      if (newMember.highestRole === streamerRole) {
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
client.login(config.token);
