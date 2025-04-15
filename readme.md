# Decrypted - Escape Room Game

## A hacker-style escape room game made entirely with HTML, CSS and JavaScript

![Screenshot of the in-game desktop with the terminal opened.](src/media/img/screenshot1.png)

Do you know how to use linux and do you like escape rooms? Then this might be for you...
In this game, you have to follow instructions, use the terminal with its many commands and
try to decrypt encrypted data to proceed. You have a linux-style terminal with many available
commands, a webbrowser and an app to communicate with your boss.

As this game is still under development, there is only one level so far, but there will be more in the
future. Also, this is my first game to develop, so if you have any ideas how to improve it, feel free
to open an issue!

![Screenshot of the in-game desktop with the webbrowser opened.](src/media/img/screenshot2.png)

## How to play

To start playing, download the repository and open ```index.html```. From there, just click continue.
For the best experience I recommend using fullscreen mode (F11 in most browsers). Now you should be in
an simulated desktop environment. Have fun playing!

![The terminal with a list of usable commands.](src/media/img/screenshot3.png)

## The terminal

In the terminal, you can interact with a lot of simulated linux-style commands like ```cd```, ```touch```, etc...
Here is a complete list of available commands:

```bash
help                > Shows a list of possible commands
clear               > Clears the terminal
ls                  > Lists files in current directory
cd -dir             > Changes to directory (Use "cd .." to go back)
touch -file         > Creates new file
mkdir -dir          > Creates new directory
rm -file            > Deletes a file
cat -file           > Views contents of a file
echo -text > -file  > Prints text to terminal or saves it to a file when used echo -text > -file
editor -file       > Opens the editor with a specified file (Absolute filepath)
curl -o -url -file  > Downloads a file from an URL
pwd                 > Prints current directory
whoami              > Prints current user
finger -user        > Prints information about an user
date                > Shows current date/time
decrypt -file       > Decrypt a file using a key
ipconfig            > Shows network configuration
ping -ip            > Pings an IP address
exit                > Exits the terminal
```

There are a few hidden commands and easter eggs, but I won't list them here.

## ToDo-List

- Add more levels
- Add more commands
- Add a text editor (Maybe even a small scripting language)
- Improve the GUI (Yes I know, the terminal is behaving weirdly when dragged)
- Add a real storyline
