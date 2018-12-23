const commando = require('discord.js-commando');

class diceRollCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'roll',
      group: 'text',
      memberName: 'roll',
      description: 'Rolls a die'
    });
  }

  async run(message, args) {
    var roll = Math.floor(Math.random() * 6) + 1;
    message.channel.sendMessage("You rolled a " + roll);
  }
};


module.exports = diceRollCommand;
