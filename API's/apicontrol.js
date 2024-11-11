import { updateQuote } from "./quote.js";
import { fetchNews } from "./news.js";
import { fetchBackground } from "./background.js";

class ApiControl {
  constructor(setup) {
    this.setup = setup;
  }

  async fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return { response, data };
  }

  async getData() {
    const array = [];
    const response = await fetch(this.setup);
    const values = await response.json();

    values.forEach((element) => {
      array.push(element);
    });

    return array;
  }

  async getResponses(responses) {
    let array = [];
    for (let i = 0; i < responses.length; i++) {
      let buildURL =
        responses[i].url +
        "" +
        (responses[i].apiKey == null ? "" : responses[i].apiKey);
      let resp = await this.fetchData(buildURL);
      array.push(resp);
    }
    return array;
  }

  async callApis() {
    let responses = await this.getData();
    let actualResponses = await this.getResponses(responses);
    //updateQuote(actualResponses[0].response, actualResponses[0].data);
    fetchNews(actualResponses[1].response, actualResponses[1].data);
    //fetchBackground(actualResponses[2].response, actualResponses[2].data);
  }
}

const apiControl = new ApiControl("API's/settings.json");
apiControl.callApis();
