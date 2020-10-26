import { Observable } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { Country } from "../app";
import { mergeMap } from "rxjs/operators";

export class PersonsService {
  getPersons(): Observable<Country[]> {
    return fromFetch("https://restcountries.eu/rest/v2/lang/es").pipe(
      mergeMap((response: Response) => response.json())
    );
  }
}
