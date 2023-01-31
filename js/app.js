(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    let items = document.querySelectorAll("#categoriesSlider .carousel-item");
    let minPerSlide = 0;
    const md = window.matchMedia("(max-width: 992px)");
    const sm = window.matchMedia("(max-width: 768px)");
    if (sm.matches) minPerSlide = 3; else if (md.matches) minPerSlide = 4; else minPerSlide = 6;
    window.addEventListener("resize", (e => {
        let temp = 0;
        if (sm.matches) temp = 3; else if (md.matches) temp = 4; else temp = 6;
        if (temp != minPerSlide) {
            minPerSlide = temp;
            updateFilters();
        }
    }));
    function updateFilters() {
        items.forEach((el => {
            let current = el.cloneNode(true);
            let next = el.nextElementSibling;
            while (el.firstChild) el.removeChild(el.firstChild);
            el.appendChild(current.children[0]);
            for (var i = 1; i < minPerSlide; i++) {
                if (!next) next = items[0];
                let cloneChild = next.cloneNode(true);
                el.appendChild(cloneChild.children[0]);
                next = next.nextElementSibling;
            }
        }));
    }
    updateFilters();
    (new WOW).init();
    window["FLS"] = true;
    isWebp();
})();