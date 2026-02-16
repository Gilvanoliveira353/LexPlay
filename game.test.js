const { loadWords, getRandomWord } = require('./game.js');

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
