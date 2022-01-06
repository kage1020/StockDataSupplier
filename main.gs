const KABUTAN = "https://kabutan.jp/";
const UserIdSheet = SpreadsheetApp.openById("spreadsheet id is here").getActiveSheet();
let prices = [0, 0, 0];

function doGet(e) {
  return HtmlService.createTemplateFromFile("index").evaluate();
  // return HtmlService.createTemplateFromFile("test").evaluate();
}

function getHtmlData(url) {
  const tmp = UrlFetchApp.fetch(url).getContentText();
  return tmp;
}

function getParsedHtmlData(html, fromText, toText, iterate) {
  if (iterate == "build") return Parser.data(html).from(fromText).to(toText).build();
  else return Parser.data(html).from(fromText).to(toText).iterate();
}

function test() {
  const html = getHtmlData("https://kabutan.jp/stock/finance?code=8001");
  const list = parseTable("財務", html);
  console.log(list);
}