window.addEventListener('load', () => {
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('gameContent');
    const body = document.body;



    setTimeout(() => {
      overlay.remove();
      content.classList.add('visible');
      body.classList.add('bg-visible');
    }, 1000);

    setTimeout(() => {
        overlay.remove();
        content.classList.add('visible');
        body.classList.add('bg-visible');
        body.classList.add('dizzy');
      }, 1000);
      
});