const commando = require('discord.js-commando');

class muteCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'mute',
      group: 'text',
      memberName: 'mute',
      userPermissions: ['MANAGE_MESSAGES'],
      description: 'Gives a mute role for a user supplied amount of time. Time is in minutes.',
      examples: ['np.mute @veri 1440']
    });
  }

  // stn.mute @ time
  async run(message, args) {
      // All the variables
      const muteRole = message.guild.roles.find(role => role.name === "Muted")
      if (!muteRole) { // Checks to see if the mute role exists
        message.say('You need to create the Muted role first!')
      }
      let commandText = message.content.split(" ");
      console.log(commandText)
      let time = Number(commandText[2]) * 1000 * 60;
      let announceTime = Number(commandText[2]);
      let name = message.mentions.members.first();
      console.log(name + ' ' + time);

      // checking for proper entry of the command
      if (!name || !time) {
        message.say('Proper use: "Command @ Time". Time is in minutes. A day is 1440 minutes.')
      } else if (name.roles.has(muteRole.id)) {
        message.say('They are already muted.')
      } else {
        name.addRole(muteRole);
        console.log(`Muted role given to ${name}.`);
        message.say(`${name} has been muted for ${announceTime} minutes.`);

        // removes the role after the set amount of time
        setTimeout(function() {
          name.removeRole(muteRole);
          message.say(`${name} has been unmuted.`);
          console.log(`Muted role removed from ${name}.`);
        }, time);
      }
    }
  }

  module.exports = muteCommand;
