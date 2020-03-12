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

  push(key, obj) {
    let list = this.#getRaw(key);

    localStorage.setItem(key, JSON.stringify([
      ...list,
      obj
    ]));
  }

  get(key, cls) {
    return this.#getRaw(key).map((data) => Object.assign(new cls, data));
  }

  filter(key, cls, filter) {
    let list = this.get(key, cls);

    localStorage.setItem(key, JSON.stringify(list.filter(filter)));
  }
}

export const storage = new Storage();
