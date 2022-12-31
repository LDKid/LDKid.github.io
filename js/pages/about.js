var topicContainer = document.getElementById("topic-container");
var infoContainer = document.getElementById("info-container");
var arrowButton = topicContainer.querySelector("#vertical-arrow");

function prevCategory() {
    let active = document.getElementById('category-container').querySelector('.category.active');
    active.classList.remove('active');
    
    let nextEl = active.previousElementSibling;
    if ( nextEl.classList.contains('arrow-button') ) {
        nextEl = active.parentNode.lastElementChild.previousElementSibling;
    }
    changingCategory(nextEl);

}
function nextCategory() {
    let active = document.getElementById('category-container').querySelector('.category.active');
    active.classList.remove('active');
    
    let nextEl = active.nextElementSibling;
    if ( nextEl.classList.contains('arrow-button') ) {
        nextEl = active.parentNode.children[1];
    }
    changingCategory(nextEl);
}
function changingCategory(nextEl) {
    nextEl.classList.add('active');
    let newCategory = nextEl.dataset.category;
    if ( newCategory == "aboutme") {
        topicContainer.classList.add("hidden");
        infoContainer.classList.remove("hidden");
        handleInfo(newCategory);
    } else {
        topicContainer.classList.remove("hidden", "toggled");
        arrowButton.classList.remove("toggled");
        infoContainer.classList.add("hidden");
        handleTopics(newCategory);
    }
}
function handleTopics(newCategory) {
    let foundFirst = false;
    topicContainer.querySelector('#topic-list').querySelectorAll('.topic').forEach( topicEl => {
        topicEl.classList.remove("active");
        if (topicEl.dataset.category == newCategory) {
            topicEl.classList.remove("hidden");
            if (!foundFirst) {
                foundFirst = true;
                topicEl.classList.add("active");
                handleInfo(newCategory, topicEl.dataset.topic);
            }
        } else {
            topicEl.classList.add("hidden");
        }
    });
}


function toggleTopics(el = null) {
    arrowButton.classList.toggle("toggled");
    var activeTopicEl = topicContainer.querySelector(".topic.active");
    if (el && el.classList.contains("topic") && !el.classList.contains("active")) {
        activeTopicEl.classList.remove('active');
        activeTopicEl = el;
        el.classList.add("active");
    }
    if (arrowButton.classList.contains("toggled")) {
        topicContainer.classList.add("toggled");
        handleInfo(activeTopicEl.dataset.category, activeTopicEl.dataset.topic);
        infoContainer.classList.remove("hidden");
    } else {
        topicContainer.classList.remove("toggled");
        infoContainer.classList.add("hidden");
    }
}



function handleInfo(newCategory, newTopic = null) {
    Array.from(infoContainer.children).forEach( child => {
        child.classList.add('hidden');
        if (child.dataset.category == newCategory && newTopic == null || child.dataset.topic == newTopic) {
            child.classList.remove('hidden');
        }
    });
    setTimeout(() => {
        infoContainer.scroll({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, 2);
}