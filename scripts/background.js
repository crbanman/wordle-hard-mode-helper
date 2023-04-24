const game = document.querySelector("#wordle-app-game");
const keyboard = game.querySelector('[class^="Keyboard-module_keyboard"]');
const backspaceKey = "←";

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

gameObserver.observe(game, { childList: true, subtree: true });
