function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate();
}

function doPost() {
  return null
}

function getHtmlData(url) {
  const tmp = UrlFetchApp.fetch(url).getContentText();
  return tmp;
}

function getParsedHtmlData(html, fromText, toText, iterate) {
  if (iterate == 'build') return Parser.data(html).from(fromText).to(toText).build();
  else return Parser.data(html).from(fromText).to(toText).iterate();
}

function getPrice(code) {
  const KABUTAN = "https://kabutan.jp/";
  let prices = [0, 0, 0];
  let html = UrlFetchApp.fetch(KABUTAN).getContentText();
  prices = Parser.data(html).from('class="price">').to('</td>').iterate();
  for (let i in prices) prices[i] = prices[i].replace(/,|円/g, "");
  if (code == "nikkei") return Number(prices[0]);
  else if (code == "usdyen") return Number(prices[1]);
  else if (code == "nydow") return Number(prices[2]);
  html = UrlFetchApp.fetch(KABUTAN + `stock/?code=${code}`).getContentText();
  return Number(Parser.data(html).from('<span class="kabuka">').to('</span>').build().replace(/,|円/g, ""));
}
