import { fromEvent } from "rxjs";
import { FromEventTarget } from "rxjs/internal/observable/fromEvent";
import { CountryService } from "./service/country.service";
import { pluck } from "rxjs/operators";
export interface Language {
  name: string;
  [prop: string]: any;
}
export interface Country {
  name: string;
  region: string;
  languages: Language[];
  [prop: string]: any;
}

const service = new CountryService();
service.getCountries().subscribe((data) => {
  const container = document.getElementsByClassName("country-container")[0];
  const list = data.reduce((result: string, item: Country) => {
    result += `<div class="country-item"><h2> ${item?.name} </h2>  <small> ${item?.region}</small> <h2>Language: ${item?.languages[0].name}</h2></div>`;
    return result;
  }, "");
  container!.innerHTML = list;
});

let input$ = fromEvent(
  document.getElementById("search") as FromEventTarget<Event>,
  "input"
)
  .pipe(pluck("target", "value"))
  .subscribe(console.log);

const btn = document.getElementById("lazy-loading-btn");
btn!.onclick = (e) =>
  import("./more").then((module) => {
    const print = module.default;
    print();
  });
