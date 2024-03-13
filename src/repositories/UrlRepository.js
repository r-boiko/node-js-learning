const urlStorage = new Map();

export default class UrlRepository {
  save(url) {
    urlStorage.set(url.code, url);
  }

  get(code) {
    return urlStorage.get(code);
  }

  updateVisits(code) {
    const prevValue = this.get(code);

    urlStorage.set(code, { ...prevValue, visits: prevValue.visits + 1 });
  }
}
