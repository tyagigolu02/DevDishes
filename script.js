/*  DevDishes – Recipes served with developer precision – 2025  */
const apiKey = "804549490fb34a349c078c66a4e15f00";   // ⬅️ Replace with your own API key

/*  DOM Elements --------------------------------------------------------- */
const searchBtn = document.getElementById("search-btn");
const ingredientsIn = document.getElementById("ingredients");
const recipeResults = document.getElementById("recipe-results");
const modal = document.getElementById("recipe-modal");
const recipeDetail = document.getElementById("recipe-detail");
const closeModal = document.querySelector(".close");

/*  Event Listeners ----------------------------------------------------- */
searchBtn.addEventListener("click", () => doSearch(ingredientsIn.value.trim()));

ingredientsIn.addEventListener("keyup", e => {
  if (e.key === "Enter") searchBtn.click();
});

closeModal.addEventListener("click", hideModal);
window.addEventListener("click", e => {
  if (e.target === modal) hideModal();
});

/*  Main Search Function ------------------------------------------------ */
async function doSearch(ingredients) {
  if (!ingredients) {
    showMessage("Please enter some ingredients or dish names to search!");
    return;
  }

  showLoading("🔍 Searching recipes with developer precision...");

  try {
    const searchUrl = 
      `https://api.spoonacular.com/recipes/complexSearch` +
      `?query=${encodeURIComponent(ingredients)}` +
      `&includeIngredients=${encodeURIComponent(ingredients)}` +
      `&number=20&addRecipeInformation=true&fillIngredients=true&apiKey=${apiKey}`;

    const response = await fetch(searchUrl);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const { results } = await response.json();

    if (!results || results.length === 0) {
      showMessage(`
        <div class="no-results">
          <h3>🤔 No recipes found</h3>
          <p>Try searching for:</p>
          <ul>
            <li><strong>Ingredients:</strong> chicken, pasta, tomatoes</li>
            <li><strong>Dishes:</strong> pizza, burger, sandwich</li>
            <li><strong>Cuisines:</strong> italian, mexican, indian</li>
          </ul>
        </div>
      `);
      return;
    }

    renderRecipeCards(results);
  } catch (error) {
    console.error("Search error:", error);
    showMessage(`
      <div class="error-message">
        <h3>⚠️ Oops! Something went wrong</h3>
        <p>Please check your internet connection and try again.</p>
        <small>Error: ${error.message}</small>
      </div>
    `);
  }
}

/*  Render Recipe Cards ------------------------------------------------- */
function renderRecipeCards(recipes) {
  const cardsHTML = recipes.map(recipe => {
    const readyTime = recipe.readyInMinutes || "N/A";
    const servings = recipe.servings || "N/A";
    const image = recipe.image || "./images/food_logo.png";
    
    return `
      <div class="recipe-card" data-id="${recipe.id}">
        <div class="card-image">
          <img src="${image}" alt="${recipe.title}" loading="lazy" />
          <div class="card-overlay">
            <button class="view-recipe-btn" data-id="${recipe.id}">
              👁️ View Recipe
            </button>
          </div>
        </div>
        <div class="card-content">
          <h3 class="recipe-title">${recipe.title}</h3>
          <div class="recipe-meta">
            <span class="meta-item">
              <span class="icon">⏱️</span>
              <span>${readyTime} min</span>
            </span>
            <span class="meta-item">
              <span class="icon">🍽️</span>
              <span>${servings} servings</span>
            </span>
          </div>
          ${recipe.cuisines && recipe.cuisines.length > 0 ? 
            `<div class="cuisine-tags">
              ${recipe.cuisines.slice(0, 2).map(cuisine => 
                `<span class="cuisine-tag">${cuisine}</span>`
              ).join('')}
            </div>` : ''
          }
        </div>
      </div>
    `;
  }).join("");

  recipeResults.innerHTML = `
    <div class="results-header">
      <h2>🍽️ Found ${recipes.length} delicious recipes</h2>
    </div>
    <div class="recipe-grid">
      ${cardsHTML}
    </div>
  `;

  // Attach event listeners
  document.querySelectorAll(".view-recipe-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openRecipe(btn.dataset.id);
    });
  });
}

/*  Recipe Detail Modal ------------------------------------------------- */
async function openRecipe(recipeId) {
  try {
    modal.style.display = "block";
    recipeDetail.innerHTML = `
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading recipe details...</p>
      </div>
    `;

    const detailUrl = 
      `https://api.spoonacular.com/recipes/${recipeId}/information` +
      `?includeNutrition=false&apiKey=${apiKey}`;

    const response = await fetch(detailUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to load recipe: ${response.status}`);
    }

    const recipe = await response.json();

    const ingredients = recipe.extendedIngredients || [];
    const instructions = recipe.instructions || recipe.summary || "No instructions available.";
    
    recipeDetail.innerHTML = `
      <div class="recipe-detail-content">
        <div class="recipe-header">
          <img src="${recipe.image}" alt="${recipe.title}" class="recipe-detail-image" />
          <div class="recipe-info">
            <h2>${recipe.title}</h2>
            <div class="recipe-stats">
              <span class="stat">⏱️ ${recipe.readyInMinutes || 'N/A'} minutes</span>
              <span class="stat">🍽️ ${recipe.servings || 'N/A'} servings</span>
              ${recipe.healthScore ? `<span class="stat">💚 Health Score: ${recipe.healthScore}/100</span>` : ''}
            </div>
            ${recipe.cuisines && recipe.cuisines.length > 0 ? 
              `<div class="recipe-cuisines">
                ${recipe.cuisines.map(cuisine => 
                  `<span class="cuisine-badge">${cuisine}</span>`
                ).join('')}
              </div>` : ''
            }
          </div>
        </div>

        <div class="recipe-sections">
          <div class="ingredients-section">
            <h3>📝 Ingredients</h3>
            <ul class="ingredients-list">
              ${ingredients.map(ingredient => 
                `<li>
                  <span class="ingredient-amount">${ingredient.amount || ''} ${ingredient.unit || ''}</span>
                  <span class="ingredient-name">${ingredient.name || ingredient.original}</span>
                </li>`
              ).join('')}
            </ul>
          </div>

          <div class="instructions-section">
            <h3>👨‍🍳 Instructions</h3>
            <div class="instructions-content">
              ${instructions}
            </div>
          </div>

          ${recipe.sourceUrl ? 
            `<div class="recipe-source">
              <a href="${recipe.sourceUrl}" target="_blank" rel="noopener" class="source-link">
                🔗 View Original Recipe
              </a>
            </div>` : ''
          }
        </div>
      </div>
    `;

  } catch (error) {
    console.error("Recipe detail error:", error);
    recipeDetail.innerHTML = `
      <div class="error-container">
        <h3>❌ Failed to load recipe</h3>
        <p>Something went wrong while loading the recipe details.</p>
        <small>Error: ${error.message}</small>
      </div>
    `;
  }
}

/*  Utility Functions --------------------------------------------------- */
function showLoading(message) {
  recipeResults.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">${message}</p>
    </div>
  `;
}

function showMessage(message) {
  recipeResults.innerHTML = `<div class="message-container">${message}</div>`;
}

function hideModal() {
  modal.style.display = "none";
  recipeDetail.innerHTML = "";
}

/*  Footer Functions ---------------------------------------------------- */
async function showRandomRecipe() {
  showLoading("🎲 Getting random recipe for developers...");
  
  try {
    const randomUrl = `https://api.spoonacular.com/recipes/random?number=3&apiKey=${apiKey}`;
    const response = await fetch(randomUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch random recipes: ${response.status}`);
    }

    const { recipes } = await response.json();
    
    if (recipes && recipes.length > 0) {
      renderRecipeCards(recipes);
    } else {
      showMessage("🤷‍♂️ No random recipes available right now. Try searching for something specific!");
    }
  } catch (error) {
    console.error("Random recipe error:", error);
    showMessage("❌ Failed to fetch random recipes. Try searching manually!");
  }
}

function clearSearch() {
  ingredientsIn.value = '';
  recipeResults.innerHTML = '';
  ingredientsIn.focus();
  showMessage(`
    <div class="welcome-message">
      <h2>👋 Welcome to DevDishes!</h2>
      <p>Search for recipes using ingredients you have or dish names you crave.</p>
      <p>Perfect for developers who love great food! 🍕💻</p>
    </div>
  `);
}

function searchIngredient(ingredient) {
  ingredientsIn.value = ingredient;
  doSearch(ingredient);
}

function shareApp() {
  if (navigator.share) {
    navigator.share({
      title: 'DevDishes – Recipes served with developer precision',
      text: 'Discover amazing recipes crafted for developers who love great food!',
      url: window.location.href
    }).catch(err => console.log('Error sharing:', err));
  } else {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('🎉 DevDishes URL copied to clipboard! Share it with fellow developers!');
    }).catch(() => {
      alert(`Share DevDishes: ${url}`);
    });
  }
}

/*  Initialize App ------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', function() {
  // Set current year
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
  
  // Update recipe count
  updateRecipeCount();
  
  // Show welcome message
  showMessage(`
    <div class="welcome-message">
      <h2>👋 Welcome to DevDishes!</h2>
      <p>Search for recipes using ingredients you have or dish names you crave.</p>
      <p>Perfect for developers who love great food! 🍕💻</p>
    </div>
  `);
});

function updateRecipeCount() {
  const recipeCountElement = document.getElementById('recipe-count');
  if (recipeCountElement) {
    recipeCountElement.textContent = '10,000+';
  }
}
