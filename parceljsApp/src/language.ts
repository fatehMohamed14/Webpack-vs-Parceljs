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
          result += `<div class="country-item"><img class="flag" src="${item.flag}"  alt="flag"/><div class="description"><h2> ${item?.name} </h2>  <small> ${item?.region}</small> <h2>Language: ${item?.languages[0].name}</h2></div></div>`;
          return result;
        }, "");
        container!.innerHTML = list;
        (document.getElementById(
          "searchTitle"
        ) as HTMLElement).textContent = `${data.length} Countries speaking ${data[0]?.languages[0]?.name}`;
      } else {
        searchMessage.textContent = `No Countries found ☹️`;
      }
    })
  );
};
