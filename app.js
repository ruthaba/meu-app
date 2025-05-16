// --- Sample Menu Data (Simulating a Database/Backend) ---
// In a real app, this would come from a server.
// Structure: { lang_code: { restaurant_name: "...", categories: [...] } }
const menuData = {
    "en": {
        restaurantName: "The Gourmet Place",
        categories: [
            {
                name: "Appetizers",
                items: [
                    { name: "Bruschetta", description: "Grilled bread rubbed with garlic and topped with olive oil, salt and tomato.", price: "$8.00", image: "placeholder-bruschetta.jpg" },
                    { name: "Caprese Salad", description: "Fresh mozzarella, tomatoes, and sweet basil, seasoned with salt and olive oil.", price: "$10.00", image: "placeholder-caprese.jpg" }
                ]
            },
            {
                name: "Main Courses",
                items: [
                    { name: "Spaghetti Carbonara", description: "Pasta with eggs, cheese, pancetta, and black pepper.", price: "$15.00", image: "placeholder-carbonara.jpg" },
                    { name: "Grilled Salmon", description: "Salmon fillet grilled to perfection, served with seasonal vegetables.", price: "$18.00", image: "placeholder-salmon.jpg" }
                ]
            }
        ]
    },
    "es": {
        restaurantName: "El Rincón Gourmet",
        categories: [
            {
                name: "Entrantes",
                items: [
                    { name: "Bruschetta", description: "Pan tostado frotado con ajo y cubierto con aceite de oliva, sal y tomate.", price: "€7.50" },
                    { name: "Ensalada Caprese", description: "Mozzarella fresca, tomates y albahaca dulce, sazonada con sal y aceite de oliva.", price: "€9.00" }
                ]
            },
            {
                name: "Platos Principales",
                items: [
                    { name: "Espaguetis a la Carbonara", description: "Pasta con huevos, queso, panceta y pimienta negra.", price: "€14.00" },
                    { name: "Salmón a la Parrilla", description: "Filete de salmón a la parrilla, servido con verduras de temporada.", price: "€17.00" }
                ]
            }
        ]
    },
    "fr": {
        restaurantName: "Le Coin Gastronomique",
        categories: [
            {
                name: "Entrées",
                items: [
                    { name: "Bruschetta", description: "Pain grillé frotté à l'ail et garni d'huile d'olive, de sel et de tomate.", price: "€8.00" },
                    { name: "Salade Caprese", description: "Mozzarella fraîche, tomates et basilic doux, assaisonnés de sel et d'huile d'olive.", price: "€9.50" }
                ]
            },
            {
                name: "Plats Principaux",
                items: [
                    { name: "Spaghetti Carbonara", description: "Pâtes aux œufs, fromage, pancetta et poivre noir.", price: "€14.50" },
                    { name: "Saumon Grillé", description: "Filet de saumon grillé à la perfection, servi avec des légumes de saison.", price: "€17.50" }
                ]
            }
        ]
    }
    // Add more languages and their menu translations here
};

// --- DOM Elements ---
const restaurantNameElement = document.getElementById('restaurant-name');
const menuContainer = document.getElementById('menu-container');
const langSelect = document.getElementById('lang-select');

// --- Functions ---
function displayMenu(language) {
    // Get the menu for the selected language
    const currentMenu = menuData[language];
    if (!currentMenu) {
        console.error("Menu data not found for language:", language);
        menuContainer.innerHTML = "<p>Menu not available in this language.</p>";
        restaurantNameElement.textContent = "Restaurant"; // Default
        return;
    }

    // Update restaurant name
    restaurantNameElement.textContent = currentMenu.restaurantName;

    // Clear previous menu items
    menuContainer.innerHTML = '';

    // Populate menu
    currentMenu.categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('menu-category');

        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category.name;
        categoryDiv.appendChild(categoryTitle);

        category.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('menu-item');

            // Optional: Add image
            if (item.image) {
                const imgElement = document.createElement('img');
                imgElement.src = item.image; // Make sure you have these images or use full URLs
                imgElement.alt = item.name;
                imgElement.classList.add('item-image');
                itemDiv.appendChild(imgElement);
            }

            const itemDetailsDiv = document.createElement('div');
            itemDetailsDiv.classList.add('item-details');

            const itemName = document.createElement('h3');
            itemName.textContent = item.name;
            itemDetailsDiv.appendChild(itemName);

            const itemDescription = document.createElement('p');
            itemDescription.classList.add('item-description');
            itemDescription.textContent = item.description;
            itemDetailsDiv.appendChild(itemDescription);

            itemDiv.appendChild(itemDetailsDiv);

            const itemPrice = document.createElement('div');
            itemPrice.classList.add('item-price');
            itemPrice.textContent = item.price;
            itemDiv.appendChild(itemPrice);

            categoryDiv.appendChild(itemDiv);
        });
        menuContainer.appendChild(categoryDiv);
    });
}

// --- Event Listeners ---
langSelect.addEventListener('change', (event) => {
    displayMenu(event.target.value);
});

// --- Initial Display ---
// Set default language (e.g., from browser, or first in list)
let defaultLanguage = langSelect.value;

// Optional: Try to detect browser language
const browserLang = navigator.language.split('-')[0]; // 'en-US' -> 'en'
if (menuData[browserLang]) {
    defaultLanguage = browserLang;
    langSelect.value = browserLang; // Update dropdown
}

displayMenu(defaultLanguage);