import { mockToastify, unMockToastify } from "./toastifyMock.js";

beforeEach(() => {

  // 1️⃣ mock do Toastify
  global.Toastify = mockToastify();

  // 2️⃣ criar HTML falso (igual ao index.html)
  document.body.innerHTML = `
    <div id="board"></div>
    <div id="keyboard-container"></div>
    <div id="debug-panel"></div>
    <div id="message-container"></div>

    <div id="row-1"></div>
    <div id="row-2"></div>
    <div id="row-3"></div>
  `;

  // 3️⃣ carregar o jogo SOMENTE depois do HTML existir
  require("./game.js");
});

afterEach(() => {
  unMockToastify();
});

test("jogo inicializa corretamente", () => {
  const board = document.getElementById("board");
  expect(board).not.toBeNull();
});
