function lightdarkMain() {
    /**
     * Autorun function, handles setting everything up.
     */

    // Add the no-transition class to prevent animations
    document.body.classList.add('no-transition');
    // Get the saved preference
    let theme = sessionStorage.getItem('theme');
    // Check if there's a preference set, and if so, set the html property
    setLightModeAttr(theme);
    // Setup the toggle, if it's available.
    setupToggleThemeButton(theme);
    // Force the css to update
    document.body.offsetHeight;
    // Remove the no-transition class to allow animaitons again
    document.body.classList.remove('no-transition');
}
// Run the main function on init
lightdarkMain();

function setLightModeAttr( themeMode ) {
    /**
     * Setup html attribute
     * 
     * @param {string} themeMode - Either "dark" or "light". If "", returns without running. Get it from sessionStorage.getItem('theme')
     */

    if (!themeMode) {
        return;
    }
    document.documentElement.dataset.theme = themeMode;
}

function setupToggleThemeButton(themeMode = '') {
    /**
     * Setup toggle buttons, if available
     * 
     * @param {string} themeMode - "dark", "light" or "". Get from sessionStorage.getItem('theme')
     */

    // Look for the listOfThemeToggles, and if not found just leave.
    let listOfThemeToggles = document.querySelectorAll("#theme-toggle");
    if (listOfThemeToggles.length == 0) {
        console.log('no toggle available')
        return;
    } else {
        // Go through each toggle and add a click event to them
        listOfThemeToggles.forEach(toggle => {
            toggle.addEventListener( 'click', () => {
                colorModeSwitcher(toggle);
            });
        });
    }

    // Create a variable to hold the class that will be added to the toggle
    let toggleClass = '';
    // Now, check the themeMode.
    if ( themeMode == 'light' ) {
        toggleClass = 'light';
    } else if (themeMode == 'dark') {
        toggleClass = 'dark';
    } else {
        // No theme was set, so use the system preference
        // Check whether the System Dark Mode is set
        let defaultDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
        if ( defaultDarkMode.matches ) {
            toggleClass = 'dark';
        } else {
            toggleClass = 'light';
        }
    }
    setThemeToggles(toggleClass);
}
function colorModeSwitcher(el) {
    /**
     * The function that is called by the toggle buttons to change the theme.
     * 
     * @param el - The element of the button calling the function, should have either the light or dark classes.
     */

    let setTo = 'light';
    // If it has the light mode class, set it up in dark mode, otherwise, leave it as light
    if ( el.classList.contains('light') ) {
        setTo = 'dark';
    }
    setLightModeAttr(setTo);
    sessionStorage.setItem('theme', setTo);
    setThemeToggles(setTo);

    // If there is a game, update it's colors
    if ( typeof GAME !== 'undefined' ) {
        GAME.updateColors();
    }
}
function setThemeToggles(toggleClass) {
    /**
     * Loop through all toggle buttons and set them with the right class
     * 
     * @param {string} toggleClass - The class to toggle to
     */
    
    let listOfThemeToggles = document.querySelectorAll("#theme-toggle");
    listOfThemeToggles.forEach(toggle => {
        toggle.classList.remove('light', 'dark'); 
        toggle.classList.add(toggleClass); 
    });
}