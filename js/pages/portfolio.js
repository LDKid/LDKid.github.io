// Get the full list of projects. This list will be reused every time the user searches.
const PROJECT_LIST = document.querySelectorAll('.portfolio-project');

function portfolioMain() {
    /**
     * Autorun function, handles setting everything up.
     */

    // Get the search Input Element
    const SEARCH_EL = document.getElementById('search-input');

    // Set it's placeholder
    setupSearchPlaceholder( SEARCH_EL );
    
    // Add an event listener so whenever the user interacts with the input, the portfolioSearch funtion is called.
    SEARCH_EL.addEventListener('input', portfolioSearch );

    // Check if we arrived at the page with filter data
    const QUERY_STRING = window.location.search;
    const URL_PARAMS = new URLSearchParams(QUERY_STRING);
    const QUERY = URL_PARAMS.get('search');

    if ( QUERY ) {
        SEARCH_EL.value = QUERY;
        portfolioSearch(QUERY);
    }
}

// Run the main function on init
portfolioMain();

function setupSearchPlaceholder( searchEl ) {
    /**
     * Setup the placeholder text of the search element
     * @param {Object} searchEl The HTML input element
     */

    // The placeholder text is in a hidden element, with the ID search-placeholder-text. Just find that element, take it's inner text and set it as the search's placeholder.
    let placeholderText = document.getElementById('search-placeholder-text').innerText;
    searchEl.placeholder = placeholderText;
}

function portfolioSearch( forceQuery = '' ) {
    /**
     * Hide or Show elements depending on search.
     */

    // Becomes this comes from the eventListener, "this" is the input. Get it's value and set it to lowercase to ignore case on search.
    let query = ( typeof forceQuery !== 'string' ) ? this.value.toLowerCase() : forceQuery;

    // If searching by type
    let cutQuery = query.split('=')[1];

    // Loop through all projects and either hide or show them.
    PROJECT_LIST.forEach( project => {
        // Get the name, type and tags of the project, in lowercase.
        let name = project.dataset.name.toLowerCase();
        let type = project.dataset.type.toLowerCase();
        let tags = project.dataset.tags.toLowerCase();
        
        if ( query.startsWith('type=') || query.startsWith('tipo=') ) {
            if ( type.includes( cutQuery ) ) {
                project.classList.remove('hidden');
            } else {
                project.classList.add('hidden');
            }
        } else if ( query.startsWith('tag=') ) {
            if ( tags.includes( cutQuery ) ) {
                project.classList.remove('hidden');
            } else {
                project.classList.add('hidden');
            }
        } else {
            // If any of the 3 variables contains whatever was written, then show it. Otherwise, hide it. Hiding is handling with the class "hidden".
            if ( name.includes( query ) || type.includes( query ) || tags.includes( query ) ) {
                project.classList.remove('hidden');
            } else {
                project.classList.add('hidden');
            }
        }
    });
}