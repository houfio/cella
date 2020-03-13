class Storage {
  // eslint-disable-next-line no-undef
  #getRaw(key) {
    try {
      const result = JSON.parse(localStorage.getItem(key));

      if (!Array.isArray(result)) {
        return [];
      }

      return result;
    } catch {
      return [];
    }
  };

  // eslint-disable-next-line no-undef
  #getProductRaw(key, id) {
    return this.#getRaw(key).find(product => product.id === id);
  }

  push(key, data) {
    let list = this.#getRaw(key);

    localStorage.setItem(key, JSON.stringify([
      ...list,
      data
    ]));
  }

  get(key) {
    return this.#getRaw(key);
  }

  getProduct(key, id) {
    return this.#getProductRaw(key, id);
  }

  filter(key, filter) {
    let list = this.get(key);

    localStorage.setItem(key, JSON.stringify(list.filter(filter)));
  }
}

export const storage = new Storage();
