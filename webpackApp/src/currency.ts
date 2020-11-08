import { tap } from "rxjs/operators";
import { Country } from "./app";
import { CountryService } from "./service/country.service";

console.log("CURRENCY module is lazy loaded....");
const service = new CountryService();
export default (val: string) => {
  return service.getCountriesByCurrency(val).pipe(
    tap((data) => {
      if (data.length) {
        const container = document.getElementsByClassName(
          "country-container"
        )[0];
        const list = data.reduce((result: string, item: Country) => {
          result += `<div class="country-item"><img src="${item.flag}"  alt="flag"/><h2> ${item?.name} </h2>  <small> ${item?.region}</small> <h2>Language: ${item?.languages[0].name}</h2></div>`;
          return result;
        }, "");
        container!.innerHTML = list;
        (document.getElementById(
          "searchTitle"
        ) as HTMLElement).textContent = `Countries using ${data[0]?.currencies[0]?.code}`;
      }
    })
  );
};
