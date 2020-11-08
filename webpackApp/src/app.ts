import { from, fromEvent, iif, of } from "rxjs";
import { FromEventTarget } from "rxjs/internal/observable/fromEvent";

import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  pluck,
  startWith,
  switchMap,
} from "rxjs/operators";
import "./sass/style.scss";
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

let selectedSection = "language";
const btnLang = document.getElementsByClassName("lang-btn")[0] as HTMLElement;
btnLang!.onclick = () => {
  selectedSection = "language";
  btnLang.classList.add("active");
  btnCurrency.classList.remove("active");
};

const btnCurrency = document.getElementsByClassName(
  "currency-btn"
)[0] as HTMLElement;
btnCurrency!.onclick = () => {
  selectedSection = "currency";
  btnCurrency.classList.add("active");
  btnLang.classList.remove("active");
};

let input$ = fromEvent(
  document.getElementById("search") as FromEventTarget<Event>,
  "input"
)
  .pipe(
    pluck("target", "value"),
    startWith("en"),
    filter((val) => {
      return (val as string).trim().length > 1;
    }),
    distinctUntilChanged(),
    debounceTime(600),
    switchMap((val) =>
      iif(
        () => selectedSection === "language",
        from(import("./language")),
        from(import("./currency"))
      ).pipe(
        switchMap((m) => {
          console.log(val);
          const getCountries = m.default;
          return getCountries(val as string).pipe(
            catchError((error) => {
              console.log("Caught search error the right way!");
              return of([]);
            })
          );
        })
      )
    )
  )
  .subscribe(console.log);
