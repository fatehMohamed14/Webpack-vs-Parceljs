import { Observable } from "rxjs";
import { fromFetch } from "rxjs/fetch";

import { mergeMap } from "rxjs/operators";
import { Country } from "../app";

export class CountryService {
  getCountriesByLanguage(lang: string): Observable<Country[]> {
    return fromFetch(`https://restcountries.eu/rest/v2/lang/${lang}`).pipe(
      mergeMap((response: Response) => response.json())
    );
  }
  getCountriesByCurrency(currency: string): Observable<Country[]> {
    return fromFetch(
      `https://restcountries.eu/rest/v2/currency/${currency}`
    ).pipe(mergeMap((response: Response) => response.json()));
  }
}
