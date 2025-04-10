function doDate()
{
    var str = "";
    var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var now = new Date();
    str += now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear() + " " + now.getHours() +":" + now.getMinutes() + ":" + now.getSeconds();
    document.getElementById("date").innerHTML = str;
}

setInterval(doDate, 1000);

function showTerminal() {
    const hide = document.getElementById('terminal-hide');
    hide.style.visibility = 'visible';
}

const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', hideTerminal);


function hideTerminal() {
    const hide = document.getElementById('terminal-hide');
    hide.style.visibility = 'hidden';
}



const terminalWindow = document.querySelector('.terminal-window');
const terminalHeader = document.querySelector('.terminal-header');

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

terminalHeader.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - terminalWindow.offsetLeft;
    offsetY = e.clientY - terminalWindow.offsetTop;
    document.body.style.userSelect = 'none'; // prevent text selection while dragging
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        terminalWindow.style.left = `${e.clientX - offsetX}px`;
        terminalWindow.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = ''; // restore text selection
});









const fileSystem = {
    '/': {
      type: 'directory',
      contents: {
        home: {
          type: 'directory',
          contents: {
            'readme.txt': {
              type: 'file',
              content: `Welcome Agent.

Internal services have moved to:
intranet.local

Type 'help' if you need assistance.`
            },
            'key.enc': {
              type: 'file',
              content: `atob`
            }
          }
        }
      }
    }
  };

let currentPath = ['/']; // root
let whoamiCount = 0;

const inputField = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');

  inputField.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const command = inputField.value.trim();
      if (command !== "") {
        const line = document.createElement('div');
        line.className = 'command-line';
        const currentDirDisplay = currentPath.join('/');
        line.textContent = `user422@pc212:${currentDirDisplay}$ ${command}`;
        terminalOutput.appendChild(line);
        processInput(command);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }
      inputField.value = "";
    }
  });


function processInput(input) {
    if (input === "help") {
        terminalHelp();
    } else if (input === "clear") {
        clear();
        return;
    } else if (input === 'ls') {
        lsCommand();
    } else if (input.startsWith('cd ')) {
        const arg = input.split(' ')[1];
        cdCommand(arg);
    } else if (input.startsWith('ping')) {
        const arg = input.split(' ')[1];
        ping(arg);
    } else if (input.startsWith('touch ')) {
        const arg = input.split(' ')[1];
        touchCommand(arg);
    } else if (input.startsWith('mkdir ')) {
        const arg = input.split(' ')[1];
        mkdirCommand(arg);
    } else if (input.startsWith('echo ')) {
        echoCommand(input);
    } else if (input.startsWith('cat ')) {
        const arg = input.split(' ')[1];
        catCommand(arg);
    } else if (input.startsWith('su')) {
        printToTerminal('Cannot switch user - No permission!')
    } else if (input.startsWith('rm ')) {
        const arg = input.split(' ')[1];
        rmCommand(arg);
    } else if (input === 'pwd') {
        pwdCommand();
    } else if (input === 'whoami') {
        whoamiCommand();
    } else if (input.startsWith('finger')) {
        const arg = input.split(' ')[1];
        finger(arg)
    } else if (input.startsWith('decrypt ')) {
        const arg = input.split(' ')[1];
        decryptFile(arg);
    } else if (input === 'date') {
        dateCommand();
    } else if (input === 'browser') {
        openBrowser();
    } else if (input === 'ipconfig') {
        printToTerminal(`---Network configuration---

            2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
            inet 192.168.1.10/24 brd 192.168.1.255 scope global dynamic eth0
            valid_lft 86010sec preferred_lft 86010sec
            `)
    } else if (input === 'slashfetch') {
        slashFetchCommand();
    } else if (input === "ssh complete@local") {
        window.location.href = "completed.html";
    } else if (input.startsWith('curl ')) {
        const parts = input.split(' ');
        const url = parts[1];
        const output = parts[3];
        
        if (url === 'secure.local/secret.txt' && output === 'secret.txt') {
            const dir = getCurrentDir();
            dir.contents['secret.txt'] = {
            type: 'file',
            content: `Congratulations, Agent!
            To proceed to the next access level, use secure shell:
            ssh complete@local`
            };
            printToTerminal('File downloaded: secret.txt');
        } else {
            printToTerminal('curl: failed to download file');
        }
    } else if (input === 'exit') {
        clear();
        hideTerminal();
        printToTerminal(`Slash version 2.1.234 (Stable)
        Type <code>help</code> for a list of possible commands.`)
    } else {
        printToTerminal(`Unknown command: ${input}`);
    }
}








function printToTerminal(text) {
    const terminalOutput = document.getElementById('terminal-output');
    const line = document.createElement('div');
    line.className = 'command-line';
    line.innerHTML = text.replace(/\n/g, '<br>'); // Replace \n with <br>
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}





function decryptFile(fileName) {
    const file = getCurrentDir().contents[fileName];
    if (!file || file.type !== 'file') {
      printToTerminal(`decrypt: file '${fileName}' not found`);
      return;
    }
  
    const userKey = prompt("Enter decryption key:");
    setTimeout(() => {
        printToTerminal(`Applying key ${userKey} to ${fileName}`);
    }, 500);
    setTimeout(() => {
        printToTerminal(`Base64 encoding detected`);
    }, 1000);
    setTimeout(() => {
        printToTerminal(`Processing Block 1/4...`);
    }, 1300);
    setTimeout(() => {
        printToTerminal(`Processing Block 2/4...`);
    }, 2000);
    setTimeout(() => {
        printToTerminal(`Processing Block 3/4...`);
    }, 2500);
    setTimeout(() => {
        printToTerminal(`Processing Block 4/4...`);
    }, 3500);
    setTimeout(() => {
        printToTerminal(`Generating output...`);
    }, 4200);
    if (userKey === "atob") {
      const decoded = atob(file.content); // base64
      setTimeout(() => {
        printToTerminal(`Decryption successful:\n${decoded}`);
    }, 4900);
    } else {
      setTimeout(() => {
        printToTerminal("decrypt: Decryption failed. Wrong key.");
    }, 4900);
    }
}
  

function finger(user) {
    if (user === 'user422') {
        printToTerminal(`Login: ${user}
            Name: ${user}
            Directory: /home/
            Shell: /slash/
            
            No mail.
            No plan.
            No escape.`);
    }
    else {
        printToTerminal(`finger: No such user.`);
    }
}

function ping(ip) {
    if (checkIPType(ip) === 'valid') {
        printToTerminal(`Pinging IP ${ip} with 32 bytes of data:`);
        setTimeout(() => {
            printToTerminal(`Reply from ${ip}: bytes=32 time<1ms TTL=128`);
        }, 500);
        setTimeout(() => {
            printToTerminal(`Reply from ${ip}: bytes=32 time<1ms TTL=128`);
        }, 1000);
        setTimeout(() => {
            printToTerminal(`Reply from ${ip}: bytes=32 time<1ms TTL=128`);
        }, 1500);
        setTimeout(() => {
            printToTerminal(`Reply from ${ip}: bytes=32 time<1ms TTL=128`);
        }, 2000);
        setTimeout(() => {
            printToTerminal(`Ping statistics for 192.168.0.122:
                Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
                Approximate round trip times in milli-seconds:
                Minimum = 0ms, Maximum = 0ms, Average = 0ms`);
        }, 3000);
    }
    else if (checkIPType(ip) === 'online') {
        printToTerminal(`Pinging IP ${ip} with 32 bytes of data:`);
        setTimeout(() => {
            printToTerminal(`Reply from ${ip}: Destination host unreachable.`);
        }, 1000);
        setTimeout(() => {
            printToTerminal(`Reply from ${ip}: Destination host unreachable.`);
        }, 1500);
        setTimeout(() => {
            printToTerminal(`Reply from ${ip}: Destination host unreachable.`);
        }, 2000);
        setTimeout(() => {
            printToTerminal(`Reply from ${ip}: Destination host unreachable.`);
        }, 2500);
        setTimeout(() => {
            printToTerminal(`Ping statistics for 192.168.0.122:
                Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)`);
        }, 3500);
    }
    else {
        printToTerminal(`ping: Ping request could not find host ${ip}. Please check the name and try again.`);
    }
}


function checkIPType(ip) {
    const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    if (!regex.test(ip)) {
      return 'invalid';
    }

    const octets = ip.split('.').map(Number);
  
    // Class A: 10.0.0.0 - 10.255.255.255
    if (octets[0] === 10) {
      return 'valid';
    }
  
    // Class B: 172.16.0.0 - 172.31.255.255
    if (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) {
      return 'valid';
    }
  
    // Class C: 192.168.0.0 - 192.168.255.255
    if (octets[0] === 192 && octets[1] === 168) {
      return 'valid';
    }
  
    return 'online';
}


  
function pwdCommand() {
    const path = currentPath.join('/');
    printToTerminal(path === '' ? '/' : path);
}

function whoamiCommand() {
    if (whoamiCount < 3) {
        printToTerminal('user422');
        whoamiCount ++;
    }
    else {
        printToTerminal('Do we all even really know who we are?');
        whoamiCount = 0;
    }
}

function dateCommand() {
    const now = new Date();
    printToTerminal(now.toString());
}

function catCommand(fileName) {
    const dir = getCurrentDir();
    const file = dir.contents[fileName];

    if (file && file.type === 'file') {
        printToTerminal(file.content || '');
    } else if (file && file.type === 'directory') {
        printToTerminal(`cat: ${fileName}: Is a directory`);
    } else {
        printToTerminal(`cat: ${fileName}: No such file`);
    }
}


function rmCommand(name) {
    const dir = getCurrentDir();
    const item = dir.contents[name];

    if (!item) {
        printToTerminal(`rm: cannot remove '${name}': No such file or directory`);
    } else if (item.type === 'directory') {
        printToTerminal(`rm: cannot remove '${name}': Is a directory`);
    } else {
        delete dir.contents[name];
    }
}



function mkdirCommand(dirName) {
    const dir = getCurrentDir();
    if (!dir.contents[dirName]) {
        dir.contents[dirName] = {
            type: 'directory',
            contents: {}
        };
    } else {
        printToTerminal(`mkdir: cannot create directory '${dirName}': File exists`);
    }
}


function echoCommand(input) {
    const match = input.match(/^echo\s+(.+?)(?:\s*>\s*(\S+))?$/);
    if (!match) {
        printToTerminal('echo: invalid syntax');
        return;
    }

    const message = match[1];
    const fileName = match[2];

    if (fileName) {
        const dir = getCurrentDir();
        dir.contents[fileName] = {
            type: 'file',
            content: message
        };
    } else {
        printToTerminal(message);
    }
}






function terminalHelp() {
    printToTerminal(`--- HELP ---
        help                &gt; Shows a list of possible commands
        clear               &gt; Clears the terminal
        ls                  &gt; Lists files in current directory
        cd -dir             &gt; Changes to directory
        touch -file         &gt; Creates new file
        mkdir -dir          &gt; Creates new directory
        rm  -file           &gt; Deletes a file
        cat  -file          &gt; Views contents of a file
        echo  -text > -file &gt; Prints text to terminal or saves it to a file when used echo -text > -file
        curl -o -url -file  &gt; Downloads a file from an URL
        pwd                 &gt; Prints current directory
        whoami              &gt; Prints current user
        finger              &gt; Prints information about the current user
        date                &gt; Shows current date/time
        decrypt             &gt; Decrypt a file using a key
        ipconfig            &gt; Shows network configuration
        ping -ip            &gt; Pings an IP address
        exit                &gt; Exits the terminal`);
}


function clear() {
    const terminalOutput = document.getElementById('terminal-output');
    terminalOutput.innerHTML = "";
}

function getCurrentDir() {
    let dir = fileSystem['/'];
    for (let i = 1; i < currentPath.length; i++) {
        dir = dir.contents[currentPath[i]];
    }
    return dir;
}

function lsCommand() {
    const dir = getCurrentDir();
    const entries = Object.keys(dir.contents).join('  ');
    printToTerminal(entries || '(empty)');
}

function cdCommand(dirName) {
    if (dirName === '..') {
        if (currentPath.length > 1) currentPath.pop();
        return;
    }

    const dir = getCurrentDir();
    if (dir.contents[dirName] && dir.contents[dirName].type === 'directory') {
        currentPath.push(dirName);
    } else {
        printToTerminal(`cd: no such directory: ${dirName}`);
    }
}

function touchCommand(fileName) {
    const dir = getCurrentDir();
    if (!dir.contents[fileName]) {
        dir.contents[fileName] = {
        type: 'file',
        content: ''
        };
    } else {
        printToTerminal(`touch: file '${fileName}' already exists`);
    }
}

function openBrowser() {
    const browser = document.getElementById('browser');
    browser.classList.remove('hidden');
    printToTerminal('Opening browser...');
}

function slashFetchCommand() {
    printToTerminal(`
user422@pc212   
-------------
OS: SlashOS 2.1.234
Shell: Slash
    
Author: Tobias Kisling
GitHub: hasderhi
Have fun playing!

`);
}