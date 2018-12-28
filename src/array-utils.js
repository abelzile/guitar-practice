export default {
  shuffle(array) {
    if (!array || array.length === 0) {
      return [];
    }

    const a = array.slice();

    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
  },
  random(array) {
    if (!array || array.length === 0) {
      return null;
    }
    return array[Math.floor(Math.random() * array.length)];
  }
}
