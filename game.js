async function loadWords() {
  try {
    const response = await fetch('./json/words-list.json');
    const data = await response.json();
    return data.words || [];
  } catch (error) {
    console.error("Erro ao carregar palavras:", error);
    return [];
  }
}

async function getRandomWord() {
  const words = await loadWords();
  if (words.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

module.exports = { loadWords, getRandomWord };
