import { tap } from "rxjs/operators";
import { Country } from "./app";
import { CountryService } from "./service/country.service";

console.log("CURRENCY module is lazy loaded....");
const service = new CountryService();
export default (val: string) => {
  const searchMessage = document.getElementById("searchTitle") as HTMLElement;
  const container = document.getElementsByClassName("country-container")[0];
  container!.innerHTML = "<div></div>";
  searchMessage.textContent = "🧐 Searching ...";
  return service.getCountriesByCurrency(val).pipe(
    tap((data) => {
      if (data.length) {
        const list = data.reduce((result: string, item: Country) => {
          result += `<div class="country-item"><img class="flag" src="${item.flag}"  alt="flag"/><div class="description"><h2> ${item?.name} </h2>  <small> ${item?.region}</small> <h2>Language: ${item?.languages[0].name}</h2></div></div>`;
          return result;
        }, "");
        container!.innerHTML = list;
        searchMessage.textContent = `Countries using ${data[0]?.currencies[0]?.code}`;
      } else {
        searchMessage.textContent = `No Countries found ☹️`;
      }
    })
  );
};
