import { fromEvent } from "rxjs";
import { FromEventTarget } from "rxjs/internal/observable/fromEvent";
import { PersonsService } from "./service/persons.service";
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

const service = new PersonsService();
service.getPersons().subscribe((data) => {
  const container = document.getElementById("list-container");
  const list = data.reduce((result: string, item: Country) => {
    result += `<li><b>Name:</b> ${item?.name} | <b>Age:</b> ${item?.region} | <b>Country:</b> ${item?.languages[0].name}</li>`;
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
