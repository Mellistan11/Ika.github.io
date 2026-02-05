// Menu open / close

    const menuButton = document.getElementById("menu-button");
    let menuOpen = false;

    // Opens and adds to history
    function openMenu(push = true) {
    menuButton.classList.add("menu-button-open");
    menuOpen = true;

    if (push) {
        history.pushState({ menuOpen: true }, "", "");
    }
    }

    // Closes
    function closeMenu() {
    menuButton.classList.remove("menu-button-open");
    menuOpen = false;
    }

    // If close -> Open else Open -> Close
    menuButton.addEventListener("click", () => {
    if (!menuOpen) {
        openMenu();
    } else {
        history.back();
    }
    });

    // Controlls browser back or forward
    window.addEventListener("popstate", (event) => {
    if (event.state && event.state.menuOpen) {
        openMenu(false); // Opens but doesnt change history
    } else {
        closeMenu();
    }
    });




// Header shows and hides                           //

    const mainHeader = document.getElementById("main-header");
    const gradient = document.getElementById("header-gradient");
    const mainHeaderHeight = mainHeader.offsetHeight;

    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;      
    let currentOffset = 0;
    let targetOffset = 0;
    let rafId = null;
    
    function clamp(v, min, max)  {
        return Math.max(min, Math.min(max, v));
    }

    function animate() {
        currentOffset += (targetOffset - currentOffset) * 0.2;
        if (Math.abs(targetOffset - currentOffset) < 0.5) currentOffset = targetOffset;

        mainHeader.style.transform = `translateY(-${currentOffset}px)`;

        if (currentOffset !== targetOffset) {
            rafId = requestAnimationFrame(animate);
        } else {
            rafId = null;
        }
    }

    window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const delta = scrollTop - lastScrollTop;

        targetOffset = clamp(targetOffset + delta, 0, mainHeaderHeight);
        lastScrollTop = scrollTop;

        if (!rafId) rafId = this.requestAnimationFrame(animate);
    });




// const mainHeader = document.getElementById("main-header");
// const gradient = document.getElementById("header-gradient");

// let lastScrollTop = 0;
// const mainHeaderHeight = mainHeader.offsetHeight;

// window.addEventListener("scroll", function() {
//     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     const scrollingDown = scrollTop > lastScrollTop;

//     if (scrollingDown) { // If scrolling down -> Hides      
//             mainHeader.style.transition = "none"
//         const translateY = Math.min(scrollTop, mainHeaderHeight);   
//         mainHeader.style.transform = `translateY(-${translateY}px)`  

//         gradient.classList.remove("gradient-shown");  
//         gradient.classList.add("gradient-hidden");
//     } else { 
//         // If not scrolling down -> Shows       
//         mainHeader.style.transition = "transform 0.3s ease"
//         mainHeader.style.transform = "translateY(0)";

//         gradient.classList.remove("gradient-hidden");    
//         gradient.classList.add("gradient-shown");    
//     }

//     lastScrollTop = scrollTop <= 0 ? 0 : scrollTop   
// })

