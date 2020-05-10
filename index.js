
const Telegraf = require('telegraf');
const Corona = require("./corona");
const loveCalculator = require("./helper");
const lyrics = require("./lyrics");
const quote = require("./quote");
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const commandParts = require('telegraf-command-parts');
const GoogleImages = require('google-images');
const client = new GoogleImages('Your Api Token');
const bot = new Telegraf('Your Token')

bot.use(commandParts());


bot.start((ctx) => ctx.reply('Weclome to @micael_bot. 🤖' +'\n' +'After making a ממשלת אחדות @micael_bot is here to help 😊' + '\n'  + 'I am here to spread love and positiviy ❤️' + '\n' + 'use command /help to see what I can do 🤯'))
bot.help((ctx) => ctx.reply('/love <name> <name> for love calculator 💙' + '\n' + '/reverse <param> to reverse word 📝' +'\n' +  '/hw to get latest 📑' + '\n' + '/quote 🤖' + '\n' +'/pic <description> 😊 \n' +'/getlyrics <song_name>  🎼' +'\n' + '/corona <country> 🦹‍♂️' + '\n' + 'More coming Soon stay tuned 💛 '))
bot.hears(/reverse (.+)/, ({ match, reply }) => reply(match[1].split('').reverse().join('')))
bot.hears(/love (.+)/, ({ match, reply }) => {
let words =match[1].toString().split(' ');
loveCalculator
      .getPercentage(words[0], words[1])
      .then(res => {
        const { fname, sname, percentage, result } = res.data;
        reply(
          `${fname} + ${sname} = ${percentage}% \n ${percentage > 50 ? '☺️' : '😢'} ${result}`)
      })
      .catch(err => reply('country not recognized or some sort of error please follow guidelines or contact @micael for help!📍'))
})
bot.hears(/corona (.+)/, ({ match, reply }) => {
  let words =match[1].toString().split(' ');
  Corona
        .getStats(words[0])
        .then(res => {
          const { response } = res.data;

          if(words[0].toLowerCase() === 'palestine')
          reply('go fuck yourself palestine is not real')
          else
          reply(
            ` In ${response[0].country} There are ${response[0].deaths.total} Deaths 💀 `)

        })
        .catch(err => reply('error occured make sure to follow guidelines!📍'))
  })
  
  bot.hears(/getlyrics (.+)/, ({ match, reply }) => {
    let words =match[1].toString().split(' ');
    lyrics
          .getLyrics(match[1])
          .then(res => {
            
            reply(res.data.content[0].title)
            reply(res.data.content[0].lyrics)
   

          })
          .catch('error occured make sure to follow guidelines!📍')
    })
    

      bot.command('pic', (ctx) => {
        let args = ctx.state.command.args;
        let n = Math.floor(Math.random() * 5);  
        if(args === "")
        ctx.reply("You need a parameter you gay shit")
      
        else{
        client.search(args)
        .then(images => {
            ctx.replyWithPhoto(images[n].url);
        });
      }
      });
      bot.command('quote', (ctx) => {
        quote
        .getQuote()
        .then( res =>{
          ctx.reply(res.data.content + ` - ` + res.data.author)
        })
        
      });
      bot.command('hw', (ctx) => {
        ctx.replyWithPhoto({source: 'time.png'});
        
      });
bot.launch();



