window.addEventListener('load', () => {
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('gameContent');
    const body = document.body;
    const advisor = document.getElementById('advisor')



    setTimeout(() => {
      advisor.remove();
      overlay.remove();
      content.classList.add('visible');
      body.classList.add('bg-visible');
    }, 4000);

    setTimeout(() => {
        overlay.remove();
        content.classList.add('visible');
        body.classList.add('bg-visible');
        body.classList.add('dizzy');
      }, 4000);
      
});