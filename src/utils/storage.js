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

  push(key, data) {
    let list = this.#getRaw(key);

    localStorage.setItem(key, JSON.stringify([
      ...list,
      data
    ]));
  }

  update(key, id, data) {
    const list = this.#getRaw(key);

    localStorage.setItem(key, JSON.stringify(list.map((value) => value.id === id ? data : value )));
  }

  get(key) {
    return this.#getRaw(key);
  }

  getById(key, id) {
    return this.get(key).find((obj) => obj.id === id);
  }
}

export const storage = new Storage();
