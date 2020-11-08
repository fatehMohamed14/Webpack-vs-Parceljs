import { tap } from "rxjs/operators";
import { Country } from "./app";
import { CountryService } from "./service/country.service";

console.log("LANGUAGE module is lazy loaded....");
const service = new CountryService();
export default (val: string) => {
  return service.getCountriesByLanguage(val).pipe(
    tap((data) => {
      if (data.length) {
        const container = document.getElementsByClassName(
          "country-container"
        )[0];
        const list = data.reduce((result: string, item: Country) => {
          result += `<div class="country-item"><img class="flag" src="${item.flag}"  alt="flag"/><div class="description"><h2> ${item?.name} </h2>  <small> ${item?.region}</small> <h2>Language: ${item?.languages[0].name}</h2></div></div>`;
          return result;
        }, "");
        container!.innerHTML = list;
        (document.getElementById(
          "searchTitle"
        ) as HTMLElement).textContent = `${data.length} Countries speaking ${data[0]?.languages[0]?.name}`;
      }
    })
  );
};
