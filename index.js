const commando = require('discord.js-commando');
const path = require('path');
const config = require("./config.json");

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
});

// Check to see if person started streaming based on game status update
client.on('presenceUpdate', (oldMember, newMember) => {
  // Checks for any game activity
  if (newMember.presence.game != null) {
    // If that person is streaming
    if (newMember.presence.game.streaming === true) {
      console.log(`${newMember.displayName} is streaming!`);
      let role = newMember.guild.roles.find(role => role.name === "Now Live");
      newMember.addRole(role);
      newMember.guild.channels.find(channel => channel.name === "self-advertising").send(`${newMember.displayName} is streaming! Come check it out at ${newMember.presence.game.url} !`)

    } else {
      let role = newMember.guild.roles.find(role => role.name === "Now Live");
      console.log('got to the else statement');
      if (newMember.highestRole === role) {
        console.log('got to the if statement inside else');
        let role = newMember.guild.roles.find(role => role.name === "Now Live");
        console.log(role.name);
        newMember.removeRole(role);
      };
    };
  };
});

// Bot login
client.login(config.token);
