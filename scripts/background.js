let game = document.querySelector("#wordle-app-game");
let keyboard = game?.querySelector('[class^="Keyboard-module_keyboard"]');
const backspaceKey = "←";

const gameWatcher = new MutationObserver((mutations, observer) => {
  mutations.forEach((mutation) => {
    if (mutation.type !== "childList") return;

    if (document.querySelector("#wordle-app-game") !== null) {
      game = document.querySelector("#wordle-app-game");
      keyboard = game.querySelector('[class^="Keyboard-module_keyboard"]');
      gameObserver.observe(game, { childList: true, subtree: true });
      observer.disconnect();
    }
  });
});

const gameObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type !== "childList") return;

    mutation.addedNodes.forEach((node) => {
      if (node.nodeName !== "#text") return;

      const keyIsDisabled = !!keyboard.querySelector(
        `button[data-key='${node.textContent}'][data-state='absent']`
      );

      if (keyIsDisabled) {
        keyboard.querySelector(`[data-key='${backspaceKey}']`).click();
      }
    });
  });
});

// NYTimes added a welcome screen and I'm not sure if it's always there.
// So if we don't find the game, we'll watch changes to the body until
// it's there.
if (game === null) {
  gameWatcher.observe(document.body, { childList: true, subtree: true });
} else {
  gameObserver.observe(game, { childList: true, subtree: true });
}
