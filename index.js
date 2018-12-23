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

// Check to see if someone started streaming
client.on('presenceUpdate', (oldMember, newMember) => {
  if (newMember.presence.game != null) {

    if (newMember.presence.game.streaming) {
      client.channels.get('self-advertising').send(`${newMember.displayName} is streaming! Come check it out at ${newMember.game.url} !`)
      console.log('someone is streaming');
    };
  };
});

// Bot login
client.login(config.token);
