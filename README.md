WebRecGenerator
===============

  WebRecommend.js
   - Owen Chen
  -----------------------
  Description:
  Tool to add websites you like into a json database file. Applies 
  Spaced repitition algorithm generate websites that you like/dislike and learns based on your quality of response by sorting them in a specific order. Pick a topic, and it auto generates a site under that topic based on the SR algorithm. This is a good way to organize your bookmarks that adapts to your preferences. 

 Node.js app that utilizes spaced repitition learning algorithm to recommend websites in your database that you like more often and push those you dislike in the back. (sports.json file has example parameters from learned space-repitition) 
  
 -Ability to seperate topics in seperate JSON files. If none exists, creates a new JSON file with default clean parameters. Each JSON file contains personalized data, and sites.json is the master list of topics with each site. 

  Changes to the algorithm:
  - E-Factor (easiness factor) changed to hardness factor. The higher 
  q, the less likely you'd want to see it again. Changes to dislike
  factor. 

  -webSite files are seperated by topic. Spaced repitition applies to the
  sites inside each topic, new JSON file with attributes created with 
  each topic.

-  Quality of response is 0-5 for how much you like or dislike a website
 

	Algorithm:
  0 = Love it, show it more. 5 = hate it push it back. 

  Brief outline of SM-2 SR algorithm:
  1. Split into smallest possible items. 
  2. E-Factor of 2.5 initialized to all variables. 
  3. OF Matrix and E-Factor categories. Algorithm:
          OF(1,EF) = 4
          for n > 1 OF(n, EF) := EF

          Where OF(n, EF) - optimal factor for n-th repitition  and EF 
  4. OF Matrix to determine inter-repetition intervals. 
          I(n, EF) = OF( n, EF) * I(n-1, EF)
          ... Code Onbline
  5. Assess quality of repetition responses in 0-5 scale
  6. Modify E-factor According to formula
  7. After each rep, modify relevant entry of OF matrix. 
  8. if quality respobse is lower than 3 start repetition for the item from the beginning with no E-factor change
  9. Repeat all items under four in quality assement.


  -V 1.0
  Algorithm based off SuperMemo SM-2 Learning Algorithm as described:
  http://www.supermemo.com/english/ol/sm2.htm

  Algorithm is working, but need to modify the math to change up the intervals b/c I'm using # of sessions instead of the actual date time.

  Updates needed:
  -Implement checkFileExists [x]
  -Add in Date Functionality 
  -Ability to import into your master JSON topic/site list
  -better algorithm for calculating the data



HOW TO USE:

node spacedRep.js
command line prompts show up and you follow the directions

