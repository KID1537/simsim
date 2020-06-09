const Discord = require('discord.js');
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "노는방";
const byeChannelName = "안녕히가세요";
const welcomeChannelComment = "환영합니다! s?로 제 명령어를 확인해보세요!!";
const byeChannelComment = "다음에 또 봐요...";
let PREFIX = 's! ';

client.on('ready', () => {
   client.user.setPresence({game : { name: 's? | SIMSIM 작동' }, status: 'online' });
   console.log('I am ready!');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
    
  if (message.content === 'test') {
    fs.writeFileSync('test/test.js', 'utf-8', 'test');
    message.channel.send('테스트 성공!');
  }
   
  if (message.content === 'read') {
    let l = fs.readFileSync('test/test.js', 'utf-8');
    message.channel.send(l+'\n\n읽기 성공!');
  }
   
 if(message.content == 's?') {
    let helpImg = 'https://cdn.discordapp.com/attachments/714828023093788752/715066220868534332/KakaoTalk_20200523_212814624.jpg';
    let embed = new Discord.RichEmbed()
      .setAuthor('SIMSIM Commands', helpImg)
      .setColor('#186de6')
      .setFooter(`SIMSIM`)
      .setTimestamp()

    embed.addField('Command: ', '• `s?`: 도움말이 뜹니다.');
    embed.addField('General: ', '• `안녕`: 인사를 합니다.');
    embed.addField('Game: ', '• `제작중`: 곧 공개됩니다...');
    embed.addField('Bot: ', '• `심심아`: 심심이가 대답합니다.');

    message.channel.send(embed)
  }

  if (message.content === '안녕') {
    message.channel.send('반가워');
  }

  if (message.content === '심심아') {
     let reply_1 = ['부르셨어요?','왜요?','혹시 찾으셨나요?'];
     message.reply(reply_1[Math.floor(Math.random()*3)]);
  }
    
});


async function editMsg(message, str1, str2, delay = 2000) {
  let msg = await message.channel.send(str1);

  setTimeout(() => {
    msg.edit(str2);
  }, delay);
}

client.login(token);
