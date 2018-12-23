const commando = require('discord.js-commando');

class giveRoleCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'role',
      group: 'text',
      memberName: 'role',
      description: 'DM\'s user to give them a role in NP Public Server.'
    });
  }

  async run(message, args) {
    var roll = Math.floor(Math.random() * 6) + 1;

    message.direct('Type  *np.r6s*  or  *np.rust*  in the #roles channel to get a role.');
  }
};

module.exports = giveRoleCommand;
