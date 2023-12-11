function startGame() {
    const introContainer = document.querySelector('.intro-container');
    const gameContainer = document.getElementById('game-container');

    introContainer.style.display = 'none';
    gameContainer.style.display = 'block';

    resetMarmotPosition();
}
// Rest of your existing code

document.addEventListener('DOMContentLoaded', function () {
  const introContainer = document.querySelector('.intro-container');
  const gameContainer = document.getElementById('game-container');
  const marmot = document.getElementById('marmot');

  document.addEventListener('keydown', function (event) {
    const key = event.key.toLowerCase();

    if (['s', 'd', 'j', 'k'].includes(key)) {
      if (isMarmotHit(key)) {
        alert('Ouch! You hit the marmot!');
        resetMarmotPosition();
      }
    }
  });

  function isMarmotHit(key) {
    const marmotRect = marmot.getBoundingClientRect();
    const marmotX = marmotRect.left + marmotRect.width / 2;
    const marmotY = marmotRect.top + marmotRect.height / 2;

    switch (key) {
      case 's':
        return marmotY > window.innerHeight / 2;
      case 'd':
        return marmotX > window.innerWidth / 2;
      case 'j':
        return marmotY <= window.innerHeight / 2;
      case 'k':
        return marmotX <= window.innerWidth / 2;
      default:
        return false;
    }
  }

  function resetMarmotPosition() {
    const maxWidth = window.innerWidth - marmot.clientWidth;
    const maxHeight = window.innerHeight - marmot.clientHeight;

    const newX = Math.random() * maxWidth;
    const newY = Math.random() * maxHeight;

    marmot.style.left = `${newX}px`;
    marmot.style.top = `${newY}px`;
  }

  function startGame() {
    introContainer.style.display = 'none';
    gameContainer.style.display = 'block';
    resetMarmotPosition();
  }

});
