const commando = require('discord.js-commando');

class rust extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'rust',
      group: 'text',
      memberName: 'rust',
      description: 'Assigns the Rust role'
    });
  }


  async run(message, args) {
    var role = message.guild.roles.find(role => role.name === "Rust");
    message.member.addRole(role);
  }
};


module.exports = rust;
