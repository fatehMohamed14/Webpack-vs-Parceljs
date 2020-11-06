import { from, fromEvent, iif, of } from "rxjs";
import { FromEventTarget } from "rxjs/internal/observable/fromEvent";
import { CountryService } from "./service/country.service";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  pluck,
  switchMap,
} from "rxjs/operators";
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

let selectedSection = "langauge";
const btnLang = document.getElementsByClassName("lang-btn")[0] as HTMLElement;
btnLang!.onclick = () => {
  selectedSection = "language";
};

const btnCurrency = document.getElementsByClassName(
  "currency-btn"
)[0] as HTMLElement;
btnCurrency!.onclick = () => {
  selectedSection = "currency";
};

let input$ = fromEvent(
  document.getElementById("search") as FromEventTarget<Event>,
  "input"
)
  .pipe(
    pluck("target", "value"),
    filter((val) => {
      return val.trim().length > 1;
    }),
    distinctUntilChanged(),
    debounceTime(600),
    switchMap((val) =>
      iif(
        () => selectedSection === "langauge",
        from(import("./language")),
        from(import("./currency"))
      ).pipe(
        switchMap((m) => {
          console.log(val);
          const getCountries = m.default;
          return getCountries(val).pipe(
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
