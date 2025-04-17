const terminalWindow = document.querySelector('.terminal-window');
const terminalHeader = document.querySelector('.terminal-header');

const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', hideTerminal);

function showTerminal() {
    const hide = document.getElementById('terminal-hide');
    hide.style.visibility = 'visible';
}
function hideTerminal() {
    const hide = document.getElementById('terminal-hide');
    hide.style.visibility = 'hidden';
}

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

terminalHeader.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = terminalWindow.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    terminalHeader.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        terminalWindow.style.left = `${e.clientX - offsetX}px`;
        terminalWindow.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    terminalHeader.style.cursor = 'grab';
    document.body.style.userSelect = '';
});



function doDate()
{
    var str = "";
    var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var now = new Date();
    str += now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear() + " " + now.getHours() +":" + now.getMinutes() + ":" + now.getSeconds();
    document.getElementById("date").innerHTML = str;
}
setInterval(doDate, 1000);

let lvl = 0;

if (document.getElementById('lvlID').innerHTML === '0') {
    lvl = 0;
}
else if (document.getElementById('lvlID').innerHTML === '1') {
    lvl = 1;
}




let fileSystem = {
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


if (lvl === 0) {
    fileSystem ={
        '/':{
           type:'directory',
           contents:{

              home:{
                 type:'directory',
                 contents:{

                    'readme.txt':{
                       type:'file',
                       content:`Welcome Agent.
                       
                                Internal services have moved to:
                                intranet.local
                                    
                                Type 'help' if you need assistance.`
                    },

                    'key.enc':{
                       type:'file',
                       content:`atob`
                    }
                 }
              }
           }
        }
     };
}
else if (lvl === 1) {
    fileSystem = {
        "/":{
           "type":"directory",
           "contents":{

              "home":{
                 "type":"directory",
                 "contents":{

                    "var":{
                       "type":"directory",
                       "contents":{

                          "log":{
                             "type":"directory",
                             "contents":{

                                "sys":{
                                   "type":"directory",
                                   "contents":{

                                      "trace.log":{
                                         "type":"file",
                                         "content":`Activity Trace Log - Unknown Date
                                            Processes:
                                            slashDaemon.slash (OS internal verified) - PID #00012
                                            slashBrowser.slash - PID #02123
                                            editor.slash - PID #00567
                                            messanger.slash - PID #00792
                                            x_tunnel_host.slash - PID #00004
                                                        `
                                      }
                                   }
                                }
                             }
                          }
                       }
                    }
                 }
              }
           }
        }
     }
}

let currentPath = ['/']; // root

function storeFileSystem() {
    try {
        localStorage.setItem('slashFileSystem', JSON.stringify(fileSystem));
        printToTerminal('File system stored successfully.');
    } catch (e) {
        printToTerminal('Error storing file system: ' + e.message);
    }
}

function loadFileSystem() {
    try {
        const data = localStorage.getItem('slashFileSystem');
        if (data) {
            fileSystem = JSON.parse(data);
            printToTerminal('File system loaded from local storage.');
        } else {
            printToTerminal('No file system found in local storage.');
        }
    } catch (e) {
        printToTerminal('Error loading file system: ' + e.message);
    }
}

function clearFileSystem() {
    localStorage.removeItem('slashFileSystem');
    printToTerminal('File system removed from local storage.');
}

function getFileFromPath(path) {
    const parts = path.split('/').filter(Boolean);
    let node = fileSystem['/'];
    
    for (const part of parts) {
      if (node.type === 'directory' && node.contents[part]) {
        node = node.contents[part];
      } else {
        return null;
      }
    }
    return node;
}



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
    } else if (input === 'storefs') {
        storeFileSystem();
    } else if (input === 'loadfs') {
        loadFileSystem();
    } else if (input === 'clearfs') {
        clearFileSystem()
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
    } else if (input.startsWith("editor ")) {
        const path = input.slice(7).trim();
        const pathArray = path.split('/').filter(p => p);
        openTextEditor(['/', ...pathArray]);
        return;
    } else if (input === 'editor') {
        printToTerminal("editor command usage: editor filepath");
    } else if (input.startsWith('shutdown')) {
        shutdownCommand();
    } else if (input === 'ipconfig') {
        printToTerminal(`---Network configuration---

            2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
            inet 192.168.1.10/24 brd 192.168.1.255 scope global dynamic eth0
            valid_lft 86010sec preferred_lft 86010sec

            lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
                inet 127.0.0.1  netmask 255.0.0.0
                inet6 ::1  prefixlen 128  scopeid 0x10<host>
                loop  txqueuelen 1000  (Local Loopback)
                RX packets 16  bytes 1915 (1.9 KB)
                RX errors 0  dropped 0  overruns 0  frame 0
                TX packets 16  bytes 1915 (1.9 KB)
                TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
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
    } else if (input.startsWith("run ")) {
        const arg = input.slice(4).trim();
        runSlashFile(arg);
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
    if (userKey === "atob") {
        try {
            const decoded = atob(file.content); // base64
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
            setTimeout(() => {
                printToTerminal(`Decryption successful:\nContent:\n\n"${decoded}"`);
            }, 4900);
        }
        catch (error) {
            printToTerminal(`decrypt: Decryption failed. File is not encoded correctly. ${error}`)
            return;
        } 
    }
    else {
        setTimeout(() => {
            printToTerminal(`Applying key ${userKey} to ${fileName}`);
        }, 500);
        setTimeout(() => {
            printToTerminal("decrypt: Decryption failed. Wrong key.");
        }, 1000);
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
        printToTerminal('Do you even know that yourself?');
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
        if (Object.keys(item.contents).length > 0) {
            printToTerminal(`rm: cannot remove '${name}': Directory not empty`);
        } else {
            delete dir.contents[name];
        }
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
        editor -file        &gt; Opens the editor with a specified file (Absolute filepath)
        run -file           &gt; Runs a .slash file (Absolute filepath)
        curl -o -url -file  &gt; Downloads a file from an URL
        pwd                 &gt; Prints current directory
        whoami              &gt; Prints current user
        finger              &gt; Prints information about the current user
        date                &gt; Shows current date/time
        decrypt             &gt; Decrypt a file using a key
        ipconfig            &gt; Shows network configuration
        ping -ip            &gt; Pings an IP address
        exit                &gt; Exits the terminal
        shutdown            &gt; Shuts down the system
        
        [Debug Options]
        storefs             &gt; Saves the current state of the simulated filesystem to LocalStorage
        loadfs              &gt; Loads a previously saved state of the filesystem
        clearfs             &gt; Deletes the filesystem from LocalStorage`);
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

function shutdownCommand() {
    printToTerminal("Logout")
    setTimeout(() => {
        goToStart()
    }, 1000);
}



function runSlashFile(path, callingScript = null) {
    const pathArray = path.split('/').filter(p => p);
    const fullPath = ['/', ...pathArray];
    let error = false;

    let ref = fileSystem['/'];
    for (let i = 1; i < fullPath.length - 1; i++) {
        if (ref.type === 'directory' && ref.contents[fullPath[i]]) {
            ref = ref.contents[fullPath[i]];
        } else {
            printToTerminal('Invalid path to .slash file.');
            return;
        }
    }

    const filename = fullPath[fullPath.length - 1];
    const file = ref.contents[filename];

    if (!file || file.type !== 'file') {
        printToTerminal('Invalid .slash file.');
        return;
    }
    printToTerminal(`Running ${filename}...`);

    const lines = file.content.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    const slashVariables = {};
    const functions = {};
    let i = 0;

    // First pass: collect all functions
    while (i < lines.length) {
        if (lines[i].startsWith('function ')) {
            const parts = lines[i].split(' ');
            const funcName = parts[1];
            const argNames = parts.slice(2);
            const funcBody = [];
            i++;

            while (i < lines.length && lines[i] !== 'endfunc') {
                funcBody.push(lines[i]);
                i++;
            }

            if (i >= lines.length || lines[i] !== 'endfunc') {
                printToTerminal(`Syntax error: Missing 'endfunc' for function '${funcName}'.`);
                error = true;
                return;
            }

            functions[funcName] = { body: funcBody, args: argNames };
        }
        i++;
    }

    // Second pass: run script
    i = 0;
    while (i < lines.length) {
        let line = lines[i].split('#')[0].trim();
        if (line.length === 0) {
            i++;
            continue;
        }

        // Skip function declarations
        if (line.startsWith('function ')) {
            while (i < lines.length && lines[i] !== 'endfunc') i++;
            i++; continue;
        }

        // Function call with return assignment: set x = call myFunc arg1 arg2
        if (line.startsWith('set ') && line.includes('= call ')) {
            const setParts = line.slice(4).split('=').map(p => p.trim());
            const variableName = setParts[0];
            const callParts = setParts[1].split(' ').slice(1); // skip "call"
            const funcName = callParts[0];
            const args = callParts.slice(1);

            if (!functions[funcName]) {
                printToTerminal(`Error: Function '${funcName}' not found.`);
                error = true;
                return;
            }

            const { body, args: argNames } = functions[funcName];
            if (argNames.length !== args.length) {
                printToTerminal(`Error: '${funcName}' expects ${argNames.length} argument(s), got ${args.length}.`);
                error = true;
                return;
            }

            const localVars = { ...slashVariables };
            argNames.forEach((name, idx) => {
                localVars[name] = evaluateExpression(args[idx], slashVariables);
            });

            let returnValue = '';
            for (let cmd of body) {
                if (cmd.startsWith('return ')) {
                    returnValue = evaluateExpression(cmd.slice(7).trim(), localVars);
                    break;
                }
                runSlashLine(cmd, localVars);
            }

            slashVariables[variableName] = returnValue;
            i++;
            continue;
        }

        // Function call without return
        if (functions[line]) {
            const { body } = functions[line];
            for (let cmd of body) {
                const replacedCmd = replaceVariables(cmd, slashVariables);
                processInput(replacedCmd);
            }
            i++;
            continue;
        }

        // Variable assignment with expression
        if (line.startsWith('set ')) {
            const parts = line.slice(4).split('=');
            if (parts.length !== 2) {
                printToTerminal(`Syntax error: Invalid variable declaration '${line}'`);
                error = true;
                return;
            }
            const key = parts[0].trim();
            const rawValue = parts[1].trim();
            const value = evaluateExpression(rawValue, slashVariables);
            slashVariables[key] = value;
            i++;
            continue;
        }

        // If/Else
        if (line.startsWith('if ')) {
            const conditionRaw = line.slice(3).trim();
            const cleanedCondition = conditionRaw.replace(/^\[|\]$/g, '').trim();
            const condition = replaceVariables(cleanedCondition, slashVariables);
            const isTrue = evaluateCondition(condition);

            const trueBlock = [], falseBlock = [];
            let inElse = false;
            i++;

            let foundEndif = false;
            while (i < lines.length) {
                if (lines[i] === 'endif') {
                    foundEndif = true;
                    break;
                }
                if (lines[i] === 'else') {
                    if (inElse) {
                        printToTerminal(`Syntax error: Multiple 'else' blocks.`);
                        error = true;
                        return;
                    }
                    inElse = true;
                } else {
                    const cmd = replaceVariables(lines[i], slashVariables);
                    (inElse ? falseBlock : trueBlock).push(cmd);
                }
                i++;
            }

            if (!foundEndif) {
                printToTerminal(`Syntax error: Missing 'endif' for if block.`);
                error = true;
                return;
            }

            for (let cmd of (isTrue ? trueBlock : falseBlock)) {
                processInput(cmd);
            }

            i++; continue;
        }

        // For loop
        if (line.startsWith('for ')) {
            const forParts = line.split(' ');
            if (forParts.length < 4 || forParts[2] !== 'in') {
                printToTerminal(`Syntax error: Invalid for loop syntax.`);
                error = true;
                return;
            }

            const loopVar = forParts[1];
            const values = forParts.slice(3);

            const loopBlock = [];
            i++;

            let foundEndfor = false;
            while (i < lines.length) {
                if (lines[i] === 'endfor') {
                    foundEndfor = true;
                    break;
                }
                loopBlock.push(lines[i]);
                i++;
            }

            if (!foundEndfor) {
                printToTerminal(`Syntax error: Missing 'endfor' for loop.`);
                error = true;
                return;
            }

            for (let val of values) {
                slashVariables[loopVar] = val;
                for (let cmd of loopBlock) {
                    const replacedCmd = replaceVariables(cmd, slashVariables);
                    processInput(replacedCmd);
                }
            }

            i++; continue;
        }

        // Input prompt: input varName = prompt text
        if (line.startsWith('input ')) {
            const parts = line.slice(6).split('=');
            if (parts.length !== 2) {
                printToTerminal(`Syntax error: Invalid input syntax in '${line}'`);
                error = true;
                return;
            }

            const varName = parts[0].trim();
            const promptText = replaceVariables(parts[1].trim(), slashVariables);
            const userInput = prompt(promptText);

            if (userInput !== null) {
                slashVariables[varName] = userInput;
            } else {
                printToTerminal(`Input cancelled by user.`);
            }

            i++;
            continue;
        }

        // Prevent script from running itself
        if (line.startsWith('run ')) {
            const target = replaceVariables(line.slice(4).trim(), slashVariables);

            // Normalize paths (remove extra slashes)
            const targetPath = target.replace(/\/+/g, '/').replace(/\/$/, '');
            const currentPath = path.replace(/\/+/g, '/').replace(/\/$/, '');

            if (targetPath === currentPath) {
                printToTerminal(`Error: Cannot run script '${target}' from itself.`);
                error = true;
                i++;
                continue;
            }

            runSlashFile(target, path);
            i++;
            continue;
        }

        // Default command
        line = replaceVariables(line, slashVariables);
        processInput(line);
        i++;
    }
    if (error === false) {
        printToTerminal(`${filename} exited successfully.`);
    }
}

function evaluateCondition(condition) {
    condition = condition.replace(/^\[|\]$/g, '').trim();
    const [left, operator, right] = condition.split(' ');

    switch (operator) {
        case '==': return left === right;
        case '!=': return left !== right;
        case '>': return parseFloat(left) > parseFloat(right);
        case '<': return parseFloat(left) < parseFloat(right);
        default: return false;
    }
}

function replaceVariables(line, variables) {
    return line.replace(/\$[a-zA-Z_][a-zA-Z0-9_]*/g, match => {
        const varName = match.slice(1);
        return variables[varName] !== undefined ? variables[varName] : match;
    });
}

function evaluateExpression(expr, variables) {
    expr = replaceVariables(expr, variables);
    try {
        if (/^[\d+\-*/().\s]+$/.test(expr)) {
            return eval(expr).toString();
        } else {
            return expr;
        }
    } catch {
        return expr;
    }
}

function runSlashLine(line, slashVariables) {
    line = line.split('#')[0].trim();
    if (line.length === 0) return;

    if (line.startsWith('set ')) {
        const parts = line.slice(4).split('=');
        if (parts.length !== 2) {
            printToTerminal(`Syntax error: Invalid variable declaration '${line}'`);
            return;
        }
        const key = parts[0].trim();
        const rawValue = parts[1].trim();
        const value = evaluateExpression(rawValue, slashVariables);
        slashVariables[key] = value;
        return;
    }

    const replaced = replaceVariables(line, slashVariables);
    processInput(replaced);
}
