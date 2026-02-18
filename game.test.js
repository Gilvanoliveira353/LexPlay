const {
  loadWords,
  getRandomWord,
  isValidKey,
  addLetter,
  removeLetter,
  validateGuess,
  resetGame
} = require('./game.js');

// Como currentGuess é variável global dentro de game.js, precisamos mockar updateGrid
// e verificar o estado final do palpite com base na lógica.

describe("Funções de palavras", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ words: ["casa", "doce"] }),
      })
    );
  });

  test("loadWords deve retornar lista de palavras", async () => {
    const words = await loadWords();
    expect(words).toEqual(["casa", "doce"]);
  });

  test("getRandomWord deve retornar uma palavra da lista", async () => {
    const word = await getRandomWord();
    expect(["casa", "doce"]).toContain(word);
  });

  test("loadWords deve retornar lista vazia em caso de erro", async () => {
    global.fetch = jest.fn(() => Promise.reject("Erro de rede"));
    const words = await loadWords();
    expect(words).toEqual([]);
  });
});

describe("Funções de teclado e palpites", () => {
  beforeEach(() => {
    // Reset do estado do jogo
    resetGame();
    // Mock do console.log para não poluir saída
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  test("isValidKey deve aceitar letras de a-z", () => {
    expect(isValidKey("a")).toBe(true);
    expect(isValidKey("z")).toBe(true);
  });

  test("isValidKey deve aceitar Enter e Backspace/Delete", () => {
    expect(isValidKey("Enter")).toBe(true);
    expect(isValidKey("Backspace")).toBe(true);
    expect(isValidKey("Delete")).toBe(true);
  });

  test("isValidKey deve rejeitar outras teclas", () => {
    expect(isValidKey("1")).toBe(false);
    expect(isValidKey("ArrowUp")).toBe(false);
  });

  test("addLetter deve adicionar uma letra ao palpite atual", () => {
    addLetter("a");
    // Verifica se o console.log foi chamado com o palpite atualizado
    expect(console.log).toHaveBeenLastCalledWith("Palpite atual:", "a");
  });

  test("removeLetter deve remover a última letra do palpite atual", () => {
    addLetter("a");
    addLetter("b");
    removeLetter();
    // Verifica apenas a última chamada ao console.log
    expect(console.log).toHaveBeenLastCalledWith("Palpite atual:", "a");
  });

  test("validateGuess deve alertar se palpite incompleto", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ words: ["casa"] }),
      })
    );

    global.alert = jest.fn();

    addLetter("c");
    addLetter("a");
    await validateGuess();

    expect(global.alert).toHaveBeenCalledWith("Palpite incompleto!");
  });
});
