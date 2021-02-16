window.addEventListener("load", schedualMeetings);

// Function send GET request to main API
function schedualMeetings() {
  fetch("https://api.hacksoft.io/v1/categories/list/")
    .then((res) => res.json())
    .then((data) => {
      let dataResults = data.results;
      // console.log(dataResults);

      dataResults.forEach((subcat) => {
        let { category, flag, subcategories } = subcat;
        let innerIsFinal = subcat.is_final_category;

        if (innerIsFinal) {
          finalFetching(category);
        } else {
          subcategories.forEach((subc) => {
            let { category, flag, subcategories } = subc;
            let innerIsFinal = subc.is_final_category;
            if (innerIsFinal) {
              finalFetching(category);
            }
          });
        }
      });
    });

  // Function receives final object with events and infiltrate them into DOM
  function finalFetching(obj) {
    let slugEl = obj.slug;

    fetch(`https://api.hacksoft.io/v1/categories/${slugEl}/retrieve/`)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((arr) => {
          let startOfEvent = arr.start;
          let findType = typeof arr;
          let endOfEvent = arr.end;
          let title = arr.title;

          if (findType !== Object) {
            // console.log(startOfEvent, endOfEvent, title);
            let timeOfBegginig = collectTimeOfEvent(startOfEvent);
            let timeOfEnding = collectTimeOfEvent(endOfEvent);
            findDomElById(timeOfBegginig, timeOfEnding, title);
          }
        });
      });
  }
}

// Function collect hours and minutes of array
function collectTimeOfEvent(iterator) {
  let regex = /([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(Z)/g;

  let arrayFromTime = iterator.matchAll(regex);
  let currentResult = arrayFromTime.next();
  return [currentResult.value[4], currentResult.value[5]];
}

// Function finds the exact DOM element of every event
function findDomElById(firstHourAndMinutes, secondHourAndMinutes, content) {
  let [hourOfBeggining, muniteOfBeggining] = firstHourAndMinutes;
  let [hourOfEnding, muniteOfEnding] = secondHourAndMinutes;
  // if (content.length > 27) {
  //   content = $content.slice(0, 27) + "...";
  // }

  let setTime = `${hourOfBeggining}-${muniteOfBeggining}`;
  console.log(setTime);

  console.log(content);
  let currentStartContainerColumn = document.getElementById(`${setTime}`);
  console.log(currentStartContainerColumn);

  let createElement = documnent.createElement("p");
  createElement.style.backgroundColor = "meeting";

  createElement.innerHTML = `

      Loremipsumdolorsitametconsectetur adipisicing elit. At, totam
      voluptate. Natus minus debitis aperiam.

  `;
  currentStartContainerColumn.appendChild(createElement);
}

// function test() {
//   let regex = /([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(Z)/g;
//   let date = "2018-02-03T13:15:30Z";
//   let iterator = date.matchAll(regex);

//   let currentResult = iterator.next();
//   console.log(currentResult.value[4]);
//   console.log(currentResult.value[5]);
// }
// test();
