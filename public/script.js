const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEL = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEL = document.getElementById('single-meal');

// Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  single_mealEL.innerHTML = '';

  // Get search term
  const term = search.value;

  // Check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>Could not find ${term.toUpperCase()}. Try again!</p>`
        } else {
          mealsEL.innerHTML = data.meals.map(meal =>   `
            <div class="meal cursor-pointer relative h-44 w-44 text-center">
              <img class="border-img w-full h-full" src="${meal.strMealThumb}" alt="${meal.strMeal} >
              <div class="meal-info absolute top-0 left-0 h-full w-full bg-black bg-opacity-70 flex justify-center items-center transition-opacity duration-200 ease-in opacity opacity-0 hover:opacity-100" deal-mealID="${meal.idMeal}"> 
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
            `
          )
          .join('')
        }
      });
      // Clear Search Text
      search.value = '';
  } else {
    alert('Please enter a search term');
  }
}

// Event listeners
submit.addEventListener('submit', searchMeal);
