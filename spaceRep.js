//WebRecommend.js
//Owen Chen

//Tool to add websites you like into a json database file. Applies 
//Spaced repitition to generate websites that you like and 
//Learns based on your quality of response
//0 = Love it, show it more. 5 = hate it push it back. 
//


//CHANGING DATE TYPES TO INTS

var fs = require('fs');
var readline = require('readline');

var siteFile = 'sites.json',
    quizList = [],
    quizTimer = 500,
    today = 0, //ADD IN DATE FUNCTIONALITY LATER
    topicDict = [],
    sites = [], //All of the sites of the CURRENT topic. Each an object 

    newSiteObjArr = []; //same as sites array above, but with site objects
    siteJSONs = {}, //All of the JSON decks for each category
    curSiteKey = 0;

    cardCounter = 0;
    curKeyIndex = []; //Get the key name for index _ of this topic

// today.setHours(0,0,0,0);

console.log("Welcome to your personalized web generator!\n" +
  "After each site respond as follows:\n" +
  "(0) Absolutely friggin' love it \n" +
  "(1) It's sweet, but some parts bug me\n" +
  "(2) Meh, it's alright\n" +
  "(3) Hmmmmm\n" +
  "(4) Ok, I just wasted 5 minutes of my life\n" +
  "(5) Never take me here again.");

function readsiteFile(file) {
  fs.readFile(file, function(err, data) {
    if (err) throw err;
    topicDict = JSON.parse(data);
    //Count the number of topics
    // console.log(Object.keys(topicDict));
    var subjects = Object.keys(topicDict); //Number of subjects
    var subCount = subjects.length; //Subject Count
    // console.log(subCount);

    if (subCount) {
      console.log("There are " + subCount + " site topics you can pick");
      console.log("Here are the options: ");
      console.log(subjects);
      getUserInput("Pick a topic... ", pickTopic)
    } else {
      console.log("Error or something");
    }

  });
}

readsiteFile(siteFile);


//Chose which topic to start generator
function pickTopic(line){
  console.log(line);
  // console.log(topicDict[line]);

  //Populating new sites array with objects
  var sites = topicDict[line];
  console.log(sites);
  //NEED TO MAKE OBJECTS TO POPULATE SITES ARRAY
  //------------------------------------
 //Now the website is newSiteObjArr.name, and it has properties

  for (var i in sites){
    var newSiteObj = {
      name: sites[i]
      }

    newSiteObjArr.push(newSiteObj);
  }

  // for (var i in sites){
  //   var siteTitle = sites[i];

  //   sites[i] = new Object()
  //   sites[i].name = "Owen"; 
  //   console.log(sites[i]);
  //   // sites[i] = var siteKey = new Object();
  // }

  //---------------------------------

  // console.log(sites);

  // console.log("All sites newwww " + sites);

  sitesCount = newSiteObjArr.length;

  console.log("Sites dictionary length!!! " + sitesCount);

  siteJSONs[String(line) + ".json"] = sites;
  // console.log(siteJSONs);
  curSiteKey = line + ".json";
  console.log(curSiteKey + " This is curSite Key");



  if (sitesCount){
    console.log("You have " + sitesCount + " of sites here");
    getUserInput("Press enter to start your recommendations..",startStopQuiz);
  } else {
    console.log("There are no sites here today");
  }




}

function getUserInput(question, next, card) {
  var rl = readline.createInterface(process.stdin, process.stdout);
  rl.setPrompt(question);
  rl.prompt();
  rl.on('line', function(line) {
    rl.close();

    if (!card) {

      console.log("Goes into the not card");
      next(line);
    } else {

      console.log("goes into next");
      next(line, card);
    }
  });
}


function startStopQuiz(line) {

  console.log("Start STOP quiz line " + line);
  if (line.trim() === "exit") {
    return;
  } else {
    var count = sitesCount;
    console.log("countttttt " + count);
    if (count) {
      cardCounter = 0;

      console.log("Going into getNextCard " + newSiteObjArr[0].name);
      getNextCard(newSiteObjArr[0]);
      
    }
  }
}

//Amount of sites up for quizzing today
function cardQuizCount() {
  var count = 0;
  for (var i=0; i<sites.length; i++) {
      var c = sites[i];
      var d = new Date(c.nextDate);
      if (c.interval === 0 || !c.interval || d.getTime() === today.getTime()) {
        count++;
      }
  }

  // console.log("COUNT IS "+ count);
  return count;
}

function getNextCard(card) {
    // console.log(jsonFile);
    // console.log(line);
    // console.log(card.name + " this is the card");
    if (!card) {
      console.log("no card, write siteFile");
      writesiteFile(curSiteKey); //Save to file

      var count = cardQuizCount(); //
      if (count) {
        getUserInput("Done. Hit enter to repeat " + count + " sites graded 3 or lower, or type exit to finish", startStopQuiz);
      } else {
        getUserInput("Done for today. Don't forget to come back tomorrow. :) (enter to exit)", startStopQuiz);
      }
      return;
    }
    //Set Defaults if new card. We need each card to have it's own
    //Properties somehow
    //Javascript objects have attributes. var card = {nextDate: 0}
    //DEBUG THIS
   //----------------------------
    if (!card.nextDate) { card.nextDate = today; console.log(card.nextDate); }
    if (!card.prevDate) { card.prevDate = today; }
    if (!card.interval) { card.interval = 0; }
    if (!card.reps) {  card.reps = 0; }
    if (!card.EF) { card.EF = 2.5; }

    //----------------------------
    console.log("Setting defaults");

    // var nextDate = new Date(card.nextDate); //convert to comparable date type
    var nextDate = card.nextDate; //convert to comparable date type

    // console.log(nextDate + " the next Date");
    if (nextDate <= today) {
      quizCard(card);
    } else {
      cardCounter++;
      console.log(cardCounter);
      console.log("Update cardCounter");
      getNextCard(sites[cardCounter]);
    }
}

function quizCard(card) {
    console.log("Site: " + card.name);
    setTimeout(function() {
      console.log("How did you like it?");
      getUserInput("Grade> ", updateCard, card);
    }, quizTimer);
}

function updateCard(line, card) {
  var grade = parseInt(line, 10);
  if (grade <= 5 && grade >= 0) {
    calcIntervalEF(card, grade);
    cardCounter++;
    getNextCard(newSiteObjArr[cardCounter]);

  } else { //Bad input
    getUserInput("Please enter 0-5 for... " + card.side2 + ": ", updateCard, card);
  }
}

// Briefly the algorithm works like this:
// EF (easiness factor) is a rating for how difficult the card is.
// EF = E-Factor. Dislike factor. Higher the factor the less you will see it
// Grade: (0-3) 
//        ()   
//        (4-5) Reps + 1, interval is calculated using EF, increasing in time.
function calcIntervalEF(card, grade) {
  var oldEF = card.EF,
      newEF = 0,
      // nextDate = new Date(today);
      nextDate = today; 


  if (grade >= 0 && grade <=5){ //Dont repeat based on the grade
    newEF = oldEF + (0.1 - (5-grade)*(0.08+(5-grade)*0.02));
    if (newEF < 1.3) { // 1.3 is the minimum E-F
      card.EF = 1.3;
    } else {
      card.EF = newEF;
    }

    card.reps = card.reps + 1;

    switch (card.reps) {
      case 1:
        card.interval = 1;
        break;
      case 2:
        card.interval = 6;
        break;
      default:
        card.interval = Math.ceil((card.reps - 1) * card.EF);
        break;
    }
  }

  nextDate = today + card.interval;
  card.nextDate = nextDate;
}

function writesiteFile(siteFile) {
  fs.writeFile(siteFile, JSON.stringify(newSiteObjArr, null, 2), function(err) {
    if (err) throw err;
    console.log("\nProgress saved back to file." + siteFile);
  });
}