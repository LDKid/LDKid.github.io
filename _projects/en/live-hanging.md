---
published: true
date: 2022-06-22
name: Live Hanging
type: game
link: 404
image-path: /assets/projects/live-hanging/
slideshow: [ cover.png ]
links: []
tags: [ Godot, Twitch, Customization, Newgrounds, Itch.io, Gamejolt ]
engine: Godot
slogan: Play or let your chat play a fully customisable hangman!
---
Live Hanging is a fully customisable hangman game, that can be played solo, or streamed on Twitch and played by the chat.

The main menu has a button for Offline and Streaming, with the latter option asking for the Twitch name. After inputting it, a code is generated and shown, only the Streamer can use it, anyone else is ignored, this authenticates the Streamer as the person with the game open.

Whether Offline or Streaming, the player has to pick a Topic. These topics are game related, with some example being Arcade, Horror and RPG. If the player wants, they can pick "Random" and the word chosen can be from any topic. Another option is they have is to write their own word list, of up to 10 words.

After everything has been setup, the game can finally start, it works differently depending on whether it's Offline or Streamer:
- Offline users can now use either their keyboard or the onscreen buttons to play the game;
- Streamers can now leave the game running, and chat will play it using the commands listed below.
The game will keep track of wins and losses, and also has a leaderboard for chat.

How it works
The game uses the Twitch API. When the game starts, it checks if anyone in chat has used the command !lhplay to register. If there is atleast one player in the array of active players, the game will randomly pick someone, avoiding repeats (unless it's just one person). Only the person that is picked can make a guess. There is also a kicking system, if the person picked doesn't play until the end of a timer, they pass their turn. The timer for them becomes smaller, and if they miss their turn 3 times they are removed from the list of active players and added to a list of kicked players.

Customisation
Anything in the game can be changed, the character, the list of words, the gallows, and even the background.
There is a button in the customization screen that leads to a webpage where players can make a request for custom assets to be made and added to the game so they can use them.

Mobile support
The game does work on mobile, however the screens are not optimized for mobile. For the best experience a computer is recommended,

Chat Commands:
!livehanging → Displays some information about the game.
!lhhelp → Shows and explains the list of commands.
!lhauth → STREAMER ONLY. When writen, the streamer confirms they are playing, and allow the game to interact with their chat.
!lhstart → STREAMER ONLY. Start the game. They can also just press the button on screen to start.
!lhplay → Register for the list that the game will use to choose a random player.
!lhpass → Skip your turn.
!lhl or !lhletter → Guess the letter l. With "!lhl a" try to guess the letter "a".
!lhw or !lhword → Guess the word w. With "!lhw hangman" try to guess the word "hangman".
!lhleave → When a player doesn't want to play anymore, they can type this command to quit the game.