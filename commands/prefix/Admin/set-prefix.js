const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "prefix",
    description: "Set the prefix for the guild.",
    usage: "prefix [new prefix]"
  },
  permissions: ['Administrator'],
  owner: false,
  run: async (client, message, args, prefix, config, db) => {

    if (!args[0]) return message.reply({ embeds: [
      new EmbedBuilder()
        .setTitle("Missing argument")
        .setDescription("Por favor diga um novo prefixo!")
    ]});

    if (args[0].length > 5) return message.reply({ embeds: [
      new EmbedBuilder()
        .setTitle("Excesso de letras")
        .setDescription("Desculpe, mas um prefixo só pode ser valido até 5 letras!")
    ]});

    const newPrefix = await db.set(`guild_prefix_${message.guild.id}`, args[0]);

    const finalEmbed = new EmbedBuilder()
      .setTitle("Success!")
      .setDescription(`O novo prefixo do server é: \`${newPrefix}\`.`)
      .setColor("Green");

    return message.reply({ embeds: [finalEmbed] });
    
  },
};

