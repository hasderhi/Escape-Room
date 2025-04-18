document.getElementById('browser-url').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const url = e.target.value.trim();
    simulateBrowserNavigation(url);
  }
});

document.querySelector('.window-dot.red').addEventListener('click', () => {
  document.getElementById('browser').classList.add('hidden');
});

function openBrowserFromGUI() {
    const browser = document.getElementById('browser');
    browser.classList.remove('hidden');
}

(function makeDraggable(elemId, handleId) {
    const elem = document.getElementById(elemId);
    const handle = document.getElementById(handleId);
    let offsetX = 0, offsetY = 0, isDown = false;
    
    handle.addEventListener('mousedown', (e) => {
        isDown = true;
        offsetX = e.clientX - elem.offsetLeft;
        offsetY = e.clientY - elem.offsetTop;
        handle.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        elem.style.left = (e.clientX - offsetX) + 'px';
        elem.style.top = (e.clientY - offsetY) + 'px';
    });
    
    document.addEventListener('mouseup', () => {
        isDown = false;
        handle.style.cursor = 'grab';
    });
    })('browser', 'browser-header');
    

function attachFakeLinkHandlers() {
    const links = document.querySelectorAll('.fake-link');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const newUrl = this.getAttribute('href');
        document.getElementById('browser-url').value = newUrl;
        simulateBrowserNavigation(newUrl);
      });
    });
}
  
function simulateBrowserNavigation(url) {
    const content = document.getElementById('browser-content');
    const normalizedUrl = url.trim().toLowerCase();

    if (normalizedUrl === 'intranet.local') {
        content.innerHTML = `<h3>Intranet</h3>
        <p>Welcome to the intranet. Where do want to go?</p>
        <ol>
            <li><a href="vault.local" class="fake-link">Secure Vault</a></li>
            <li><a href="intranet.local/help" class="fake-link">Help page</a></li>
        </ol>
        `;
    } else if (normalizedUrl === 'intranet.local/help') {
      content.innerHTML = `
        <h3>Help Page</h3>
        <p>This is the internal help site.</p>
        <a href="intranet.local" class="fake-link">Go back</a>
      `;
    } else if (normalizedUrl === 'xhost.remote') {
      content.innerHTML = `
        <iframe src="attacker.html" height="590" width="970" title="Iframe"></iframe>
      `;
    } else if (normalizedUrl === 'vault.local') {
        content.innerHTML = `
          <h3>🔐 Secure Vault</h3>
          <p>Welcome to the vault! Please enter your username and password to continue.</p>
          <input type="text" id="username" placeholder="Username"/>
          <input type="password" id="password" placeholder="Password"/>
          <button id="vault-login-btn">Login</button><br><br>
          <a href="intranet.local" class="fake-link">Go back</a><br>
          <a href="intranet.local/help" class="fake-link">Help</a>
        `;
    
        setTimeout(() => {
            const loginBtn = document.getElementById('vault-login-btn');
            loginBtn.addEventListener('click', () => {
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
    
                if (username === 'agent422' && password === 'metallic') {
                    simulateBrowserNavigation('vault.local/success');
                } else {
                    simulateBrowserNavigation('vault.local/login');
                }
            });
        }, 0);
    } else if (normalizedUrl === 'vault.local/login') {
        content.innerHTML = `
          <h3>🔐 Secure Vault</h3>
          <p>❌ Incorrect username or password.</p>
          <a href="vault.local" class="fake-link">Try again</a>
        `;
    } else if (normalizedUrl === 'vault.local/success') {
        content.innerHTML = `
          <h3>🧾 Secure File Access</h3>
          <p>Access granted. 1 new file(s) is/are available for user422.</p>
          <p>To download the file(s), use the following command in your terminal:</p>
          <code>curl secure.local/secret.txt -o secret.txt</code>
          <br><br>
          <a href="intranet.local" class="fake-link">Back to intranet</a>
        `;
    } else {
      content.innerHTML = `<h3>Website not available</h3><p>The address "${url}" is blocked or unreachable.</p>`;
    }

  
    attachFakeLinkHandlers();
}
  