const commando = require('discord.js-commando');

class r6s extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'r6s',
      group: 'text',
      memberName: 'r6s',
      description: 'Assigns the R6S role'
    });
  }


  async run(message, args) {
    var role = message.guild.roles.find(role => role.name === "R6S");
    message.member.addRole(role);
  }
};


module.exports = r6s;
