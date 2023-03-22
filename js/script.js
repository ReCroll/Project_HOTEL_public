"use strict"
// ===================== MENU BURGER ==========================
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
const headerMenu = document.querySelector('.header__menu');
if (iconMenu) {
    iconMenu.addEventListener("click", function(){
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
        menuBody.classList.toggle('__container');
        headerMenu.classList.toggle('_active');
        
    });
}
// ======================= ТЕКСТ ПО КОЛУ ======================
function $$(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
    
}
$$(".circular").forEach(function(el) {
    var NS = "http://www.w3.org/2000/svg";
    // var xlinkNS = "http://www.w3.org/1999/xlink";
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    var circle = document.createElementNS(NS, "path");
    circle.setAttribute("d", "M0,50 a50,50 0 1,1 0,1z");
    circle.setAttribute("id", "circle");
    var text = document.createElementNS(NS, "text");
    var textPath = document.createElementNS(NS, "textPath");
    textPath.textContent = el.textContent;
    textPath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#circle");
    text.appendChild(textPath);
    svg.appendChild(circle);
    svg.appendChild(text);
    el.textContent = "";
    el.appendChild(svg);
    });
//===========================================================
//======================= ПЕРЕМІЩЕННЯ ОБ’ЄКТІВ =================
(function () {
    let original_position = [];
    let da_elements = document.querySelectorAll('[data-da]');
    let da_elements_array = [];
    let da_match_media = [];

    if (da_elements.length > 0) {
        let number = 0;
        for (let index = 0; index < da_elements.length; index++) {
            const da_element = da_elements[index];
            const da_move = da_element.getAttribute('data-da');
            const da_array = da_move.split(',');
            if (da_array.length == 3) {
                da_element.setAttribute('data-da-index', number);
                original_position[number] = {
                    "parent": da_element.parentNode,
                    "index": index_in_parent(da_element)
                };
                da_elements_array[number] = {
                    "element": da_element,
                    "destination": document.querySelector('.' + da_array[0].trim()),
                    "place": da_array[2].trim()
                }
                number++;
            }
            
        }
        dynamic_adapt_sort(da_elements_array);

        for (let index = 0; index < da_elements_array.length; index++) {
            const el = da_elements_array[index];
            const da_breakpoint = el.breakpoint;
            const da_type = "max";  //для MobileFirst замінити на "min"

            da_match_media.push(window.matchMedia("(" + da_type + "-width: " + da_breakpoint + "px)"));
            da_match_media[index].addEventListener(dynamic_adapt);
            
        }
    }
    function dynamic_adapt(e) {
        for (let index = 0; index < da_elements_array.length; index++) {
            const el = da_elements_array[index];
            const da_element = el.element;
            const da_destination = el.destination;
            const da_place = el.place;
            const da_breakpoint = el.breakpoint;
            const da_classname = "_dynamic_adapt_" + da_breakpoint;
            
            if (da_match_media[index].matches) {
                if (!da_element.classList.contains(da_classname)) {
                    let actual_index;
                    if (da_place == 'first') {
                        actual_index = index_of_elements(da_destination)[0];
                    } else if (da_place == 'last') {
                        actual_index = index_of_elements(da_destination)[index_of_elements(da_destination).length];
                    }else {
                        actual_index = index_of_elements(da_destination)[da_place];
                    }
                    da_destination.insertBefore(da_element, da_destination.children[actual_index]);
                    da_element.classList.add(da_classname);
                }
            }else {
                if (da_element.classList.contains(da_classname)) {
                    dynamic_adapt_back(da_element);
                    da_element.classList.remove(da_classname);
                }
            }
        }
        custom_adapt();
    }
    dynamic_adapt();

    function dynamic_adapt_back(el) {
        const da_index = el.getAttribute('data-da-index');
        const original_place = original_position[da_index];
        const parent_place = original_place['parent'];
        const index_place = original_place['index'];
        const actual_index = index_of_elements(parent_place, true)[index_place];
        parent_place.insertBefore(el, parent_place.children[actual_index]);
    }

    function index_in_parent(el) {
        var children = Array.prototype.slice.call(el.parentNode.children);
        return children.indexOf(el);
    }

    function index_of_elements(parent, back) {
        const children = parent.children;
        const children_array = [];
        for (let i = 0; i < children.length; i++) {
            const children_element = children[i];
            if (back) {
                children_array.push(i);
            }else {
                if (children_element.getAttribute('data-da') == null) {
                    children_array.push(i);
                }
            }
        }
        return children_array;
    }
    function dynamic_adapt_sort(arr) {
        arr.sort(function (a, b) {
            if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 } // для MobileFirst поміняти
        });
        arr.sort(function (a, b) {
            if (a.place > b.place) { return 1 } else { return -1 }
        });
    }
    function custom_adapt() {
        const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    window.addEventListener('resize', function (event) {
        custom_adapt(viewport_width);
    });
})
//================= SWIPER ======================
new Swiper('.rooms__slider',{
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: '.swiper-pagination',
        // clickable: true,
        // dynamicBullets: true,
        type: 'fraction',
    },
    hasNavigation: {
        watchState: true,
    },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },
    spaceBetween: 30,
    loop: true,
    speed: 800,
    // effect: 'cube',
    // cubEffect: {
    //     sliderShadows: true,
    //     shadow: true,
    //     shadowOffset: 20,
    //     shadowScale: 0.94
    // },

});

//================= SHOW SERVICES ===============
const showServices = document.querySelectorAll('._show-services');
if (showServices.length > 0) {
    for (let index = 0; index < showServices.length; index++) {
        const showService = showServices[index];
        showService.addEventListener("click", function (e) {
            let hideContentService = showService.closest('.content-row');
            let showHiddenServices = showService.getAttribute('class').replace('_show-services ', '');
            hideContentService.classList.add('_hide-services');
            const closeWrapper = hideContentService.closest('.content__row-wrapper');
            closeWrapper.classList.add('_rotate');
            let showHiddenService = document.getElementById(showHiddenServices);
            showHiddenService.classList.remove('_hidden')
            e.preventDefault();
        });
        
    }
    const hideServices = document.querySelectorAll('._hide-services-content');
    if (hideServices.length > 0) {
        for (let i = 0; i < hideServices.length; i++) {
            const hideService = hideServices[i];
            hideService.addEventListener("click", function (e){
                let closeHidden =  hideService.closest('.hidden__row')
                closeHidden.classList.add('_hidden');
                const getAttrContents = hideService.getAttribute('data-close');
                const contentRowsClose = document.getElementById(getAttrContents);
                const paddingContentRowsUp = contentRowsClose.closest('.content__row-wrapper');
                contentRowsClose.classList.remove('_hide-services');
                paddingContentRowsUp.classList.remove('_rotate');
                e.preventDefault();
            });
        }
        
    }
}
//========================================================================================


//============================= GALLERY 3 ===============================================
const galleryImageArray = document.querySelectorAll('.gallery__image-wrapper');
if (galleryImageArray.length > 0) {
    for (let index = 0; index < galleryImageArray.length; index++) {
        const galleryImageWrapper = galleryImageArray[index];
        galleryImageWrapper.addEventListener("click", function (e) {
                searchActive(galleryImageWrapper);
        })
    }
}
function searchActive(galleryImageWrapper) {
    if (galleryImageWrapper.classList.contains('_active')) {
        return;
    }else {
        removeActive(galleryImageWrapper);
    }
}
function removeActive(galleryImageWrapper) {
    
    var searchElemsActive = document.getElementsByClassName('gallery__image-wrapper _active');
    for (let index = 0; index < searchElemsActive.length; index++) {
        const searchElemActive = searchElemsActive[index];
        
        searchElemActive.classList.remove('_active');
        searchElemActive.style.top = galleryImageWrapper.style.top;
        searchElemActive.style.left = galleryImageWrapper.style.left;
        searchElemActive.style.right = galleryImageWrapper.style.right;
        searchElemActive.style.bottom = galleryImageWrapper.style.bottom;

        addClassActive(galleryImageWrapper);
    }
}
function addClassActive(galleryImageWrapper) {
    galleryImageWrapper.classList.add('_active');
}
//============================= ПРИБРАТИ PLACEHOLDER =====================
jQuery(document).ready(function ($) {
    $('input[type=text], textarea').focus(function(){
        $(this).data('placeholder',$(this).attr('placeholder'))
        $(this).attr('placeholder','');
        });
        $('input[type=text], textarea').blur(function(){
        $(this).attr('placeholder',$(this).data('placeholder'));
        });
    });
//=======================================================================