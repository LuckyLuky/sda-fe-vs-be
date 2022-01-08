/**
 * Event pro cekani na nacteni stranky (vcetne skriptu, stylu, obrazku, ..):
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
 *
 * Event pro cekani na nacteni stranky (pouze DOM/html prvky, bez skriptu, stylu, obrazku, ..):
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
 */

/**
 * Funkce pro ilustraci, proc se nekdy vyplati mit skript v hlavicce
 * a praci s DOMem mit osetrenou pres eventy (napr. "DOMContentLoaded")
 */
function logUserToAnalytics() {
  console.log("logUserToAnalytics");
}

function onLoad() {
  // console.log("load");
  const errorContainer = document.getElementById("error");

  const createUserForm = document.getElementById("create-user-form");
  createUserForm.addEventListener("submit", (event) => {
    /**
     * Potlaci defaultni chovani, v pripade formulare je to refresh stranky
     */
    event.preventDefault();

    /**
     * Spravne bychom meli vstupy od uzivatelu osetrovat, aby nebyly "nebezpecne".
     */
    const userIdInput = document.getElementById("user-id");
    const userNameInput = document.getElementById("user-name");

    fetch("http://localhost:3000/users", {
      // Pro zasilani (vytvareni, editace, ..) dat je vhodne pouzivat POST namisto GET
      method: "POST",
      headers: {
        // Aby backend vedel, jak spravne zpracovat data v tele ("body"), musime mu napovedet, ze posilame JSON
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userIdInput.value,
        name: userNameInput.value,
      }),
    })
      .then(() => {
        userIdInput.value = "";
        userNameInput.value = "";
      })
      .catch((err) => {
        console.error(err);

        if (err.message) {
          errorContainer.innerText = err.message;

          setTimeout(() => {
            errorContainer.innerText = "";
          }, 5000);
        }
      });
  });

  // Synchronni kod
  const loadUsersBtn = document.getElementById("load-users");
  const usersList = document.getElementById("users-list");

  loadUsersBtn.addEventListener("click", () => {
    console.log("click");

    // Asynchronni kod
    fetch("http://localhost:3000/users")
      // fetch("https://jsonplaceholder.typicode.com/posts/")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log("data", data);

        usersList.innerHTML = "";
        /**
         * destructuring parameter
         */
        // data.forEach(({ id, name }) => {
        data.forEach((user) => {
          const userDiv = document.createElement("div");
          const id = user.id;
          const name = user.name;

          /**
           * Ekvivalentni zapis jako o radek nize
           */
          // userDiv.innerText = `${id}: ${name}`;
          userDiv.innerText = id + ": " + name;
          usersList.appendChild(userDiv);
        });
      })
      .catch((err) => {
        console.error(err);

        if (err.message) {
          errorContainer.innerText = err.message;

          setTimeout(() => {
            errorContainer.innerText = "";
          }, 5000);
        }
      });

    /**
     * U asynchronniho kodu se muze pokracovat dale (na radky nize) a pak se vratit (na "then" nebo "catch")
     * az kdyz je vysledek pripraven (prijde odpoved ze serveru).
     */
    // console.log("Kod pokracuje za fetchem");
    // console.log("Kod porad pokracuje za fetchem");
    // console.log("Kod stale pokracuje za fetchem");
    // console.log("Kod stale jeste pokracuje za fetchem");
  });

  // console.log("kod za listenerem");
}

// logUserToAnalytics();

window.addEventListener("DOMContentLoaded", onLoad);

/**
 * Ukazka vyuziti Promise a ze se nemusi jednat pouze o "fetch".
 * Pokud vas kod nize spis mate, tak ho radeji ignorujte :)
 */

function waitFor(miliseconds) {
  const maxMiliseconds = 10000;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (miliseconds > maxMiliseconds) {
        /**
         * Reject urcuje, ze Promise dopadl spatne -> vola se "catch".
         * Muzeme vkladat i hodnoty, ktere jsou pak parametrem v "catch".
         */
        // reject(new Error("Maximalni delka cekani je " + maxMiliseconds));
        reject("Hups, nepovedlo se to");
      } else {
        /**
         * Resolve urcuje, ze Promise dopadl dobre -> vola se "then"
         */
        resolve();
      }
    }, Math.min(maxMiliseconds, miliseconds));
  });
}

// console.log("Pred volanim cekani 3s");
// waitFor(3000)
//   .then(() => console.log("Cekani 3s dopadlo dobre"))
//   .catch(() => console.log("Cekani 3s dopadlo spatne"));
// console.log("Po volani cekani 3s");

// logUserToAnalytics();

// console.log("Pred volanim cekani 15s");
// waitFor(15000)
//   .then(() => console.log("Cekani 15s dopadlo dobre"))
//   .catch((error) => {
//     console.log("Cekani 15s dopadlo spatne");
//     console.error(error);
//   });
// console.log("Po volani cekani 15s");

// logUserToAnalytics();
