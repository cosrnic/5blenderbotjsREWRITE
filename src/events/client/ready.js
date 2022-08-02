const { ActivityType } = require("discord.js");
const mongoose = require('mongoose');
module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    await mongoose.connect(process.env.MONGO_LOGIN, { keepAlive: true });
    console.log(`Ready!!! ${client.user.tag} is logged in and online.`);
    client.user.setPresence({
      activities: [
        {
          name: `/help`,
          type: ActivityType.Watching,
        },
      ],
      status: `online`,
    });
    
  },
};
