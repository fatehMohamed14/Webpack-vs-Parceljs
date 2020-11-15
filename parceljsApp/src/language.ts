import { tap } from "rxjs/operators";
import { Country } from "~index";
import { CountryService } from "~service/country.service";

console.log("LANGUAGE module is lazy loaded....");
const service = new CountryService();
export default (val: string) => {
  const searchMessage = document.getElementById("searchTitle") as HTMLElement;
  const container = document.getElementsByClassName("country-container")[0];
  container!.innerHTML = "<div></div>";
  searchMessage.textContent = "🧐 Searching ...";
  return service.getCountriesByLanguage(val).pipe(
    tap((data) => {
      if (data.length) {
        const list = data.reduce((result: string, item: Country) => {
          result += `<div class="country-item"><img class="flag" src="${item.flag}"  alt="flag"/><div class="description"><h2> ${item?.name} </h2>  <small> ${item?.region}</small> <h2>Capital: ${item?.capital}</h2></div></div>`;
          return result;
        }, "");
        container!.innerHTML = list;
        (document.getElementById(
          "searchTitle"
        ) as HTMLElement).textContent = `${data.length} ${
          data.length === 1 ? "Country" : "Countries"
        } speaking ${getFullLanguageName(data[0]?.languages, val)}`;
      } else {
        searchMessage.textContent = `No Countries found ☹️`;
      }
    })
  );
};

function getFullLanguageName(languages: any[], code: string) {
  const lang = languages.find((e) => e.iso639_1 === code);
  return lang ? lang.name : code;
}
