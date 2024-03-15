const urlStorage = new Map();

export default class UrlRepository {
  save(url) {
    urlStorage.set(url.code, url);
  }

  get(code) {
    return urlStorage.get(code);
  }

  getAll() {
    return urlStorage.values();
  }

  getUrlsByKey(key, value) {
    const result = [];

    for (let url of this.getAll()) {
      if (url[key] === value) {
        result.push(url);
      }
    }

    return result;
  }

  updateVisits(code) {
    const prevValue = this.get(code);

    urlStorage.set(code, { ...prevValue, visits: prevValue.visits + 1 });
  }
}
