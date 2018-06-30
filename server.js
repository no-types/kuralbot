/* Setting things up. */
var path = require('path'),
    express = require('express'),
    app = express(),   
    helpers = require(__dirname + '/helpers.js'),
    twitter = require(__dirname + '/twitter.js');

app.use(express.static('public'));


/* You can use uptimerobot.com or a similar site to hit your /BOT_ENDPOINT to wake up your app and make your Twitter bot tweet. */

// app.all("/" + process.env.BOT_ENDPOINT, function (req, res) {

//   /* See EXAMPLES.js for some example code you can use. */
//     twitter.tweet('அகர முதல எழுத்தெல்லாம் ஆதி பகவன் முதற்றே உலகு. \n Translation: "Primal Deity"" is first through all the world\'s domains', function(err, data){
//       if (err){
//         console.log(err);     
//         res.sendStatus(500);
//       }
//       else{
//         console.log('tweeted');
//         res.sendStatus(200);
//       }
//    });
// });

let kuralCount = 0;

app.all("/" + process.env.BOT_ENDPOINT, function (req, res) {

  /* See EXAMPLES.js for some example code you can use. */
  helpers.post_kural(kuralCount,function(err, kural){
    if (err){
      console.log(err);      
      res.sendStatus(500);
    }
    if(kural){
        let kural_tweet = `${kural.kural[0]} \n${kural.kural[1]}\n ---- \nஅதிகாரம் : ${kural.chapter} \nபால் : ${kural.section} \nகுறள் எண் : ${kural.number}\n ---- \nMeaning : ${kural.meaning.en} \n#thirukural`;
        if(kural_tweet.length >= 280 ){
          kural_tweet = `${kural.kural[0]} \n${kural.kural[1]}\n ---- \nஅதிகாரம் : ${kural.chapter} \nபால் : ${kural.section} \nகுறள் எண் : ${kural.number}\n ----\n#thirukural`;
        }
        twitter.tweet(kural_tweet, function(err, data){
        if (err){
            console.log(err);     
            res.sendStatus(500);
          }
          else{
            console.log('tweeted');
            res.sendStatus(200);
            kuralCount ++;
          }
       }); 
    }
  });
  
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your bot is running on port ' + listener.address().port);
});
