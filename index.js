const Discord = require('discord.js');
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "봇-채널";
const byeChannelName = "봇-채널";
const welcomeChannelComment = "환영합니다! s?로 제 명령어를 확인해보세요!!";
const byeChannelComment = "다음에 또 봐요...";

client.on('ready', () => {
  	client.user.setPresence({game : { name: 's? | SIMSIM 작동' }, status: 'online' });
   	console.log('SIMSIM Start!');
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
	if(message.content == 's?') {
      		let helpImg = 'https://simsim.msub.kr/img/simsim.jpg';
      		let embed = new Discord.RichEmbed()
         		.setAuthor('SIMSIM Commands', helpImg)
         		.setColor('#186de6')
         		.setFooter(`SIMSIM`)
         		.setTimestamp()
         		embed.addField('Command: ', '• `s?`: 도움말이 뜹니다.');
         		embed.addField('General: ', '• `s뉴스`: 실시간 네이버 뉴스 top10을 보냅니다.');
         		embed.addField('Game: ', '• `제작중`: 곧 공개됩니다...');
         		embed.addField('Bot: ', '• `심심아`: 심심이가 대답합니다.');
      		message.channel.send(embed);
   	}

   	if (message.content === '테스트') {
      		editMsg(message, "테스트 5초 뒤 변경", "테스트 변경완료!", 5000);
   	}

   	if (message.content === '심심아') {
      		let reply_1 = ['부르셨어요?','왜요?','혹시 찾으셨나요?'];
      		message.reply(reply_1[Math.floor(Math.random()*3)]);
   	}
    
    	if (message.content === 's뉴스') {
        	request.get('http://simsim.msub.kr/api/news/', function (error, response, body) {
        		let helpImg = 'https://simsim.msub.kr/img/simsim.jpg';
        		let embed = new Discord.RichEmbed()
        			.setAuthor('SIMSIM Commands', helpImg)
      				.setColor('#186de6')
      				.setFooter(`SIMSIM`)
      				.setTimestamp()
				embed.addField('실시간 뉴스 top 10!', '\n'+body);
			message.channel.send(embed)
   		});
   	}
   
   	if (message.content === 's한강') {
   		request.get('https://hangang.msub.kr/', function (error, response, body) {
     			message.channel.send(body);
   		});
   	}
   
});


async function editMsg(message, str1, str2, delay) {
	let msg = await message.channel.send(str1);

	setTimeout(() => {
    	msg.edit(str2);
  	}, delay);
}

client.login(token);
