document.querySelectorAll('.gallery-item img').forEach((img, index) => {
    img.addEventListener('click', function() {
        
        const modal = document.createElement('div');
        modal.classList.add('modal');
        
        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modal.appendChild(modalImg);

        // Tlačítko pro zavření
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('close-btn');
        closeBtn.innerHTML = '&times;';  // Symbol pro zavření
        closeBtn.addEventListener('click', function() {
            modal.remove();
        });
        modal.appendChild(closeBtn);

        let currentIndex = index;
        
        const nextBtn = document.createElement('button');
        nextBtn.classList.add('next-btn');
        nextBtn.innerHTML = '&gt;';
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % document.querySelectorAll('.gallery-item img').length;
            modalImg.src = document.querySelectorAll('.gallery-item img')[currentIndex].src;
        });
        modal.appendChild(nextBtn);

        const prevBtn = document.createElement('button');
        prevBtn.classList.add('prev-btn');
        prevBtn.innerHTML = '&lt;';
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + document.querySelectorAll('.gallery-item img').length) % document.querySelectorAll('.gallery-item img').length;
            modalImg.src = document.querySelectorAll('.gallery-item img')[currentIndex].src;
        });
        modal.appendChild(prevBtn);

        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.remove();
            }
        });
        
        document.body.appendChild(modal);
    });
        // Funkce pro přidání třídy "show" při načtení a scrollování
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("show");
            }
        }
    }

    // Spuštění při scrollování i načtení stránky
    window.addEventListener("scroll", revealOnScroll);
    window.addEventListener("load", revealOnScroll);



    function updateActiveImage() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (window.innerWidth > 768) {
        // Jsme na desktopu → odeber všechny .active
        galleryItems.forEach(item => item.classList.remove('active'));
        return;
    }

    let closestItem = null;
    let closestDistance = Infinity;
    const centerY = window.innerHeight / 2;

    galleryItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(centerY - itemCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestItem = item;
        }
    });

    galleryItems.forEach(item => item.classList.remove('active'));
    if (closestItem) closestItem.classList.add('active');
}

    let startX, endX;

// Funkce pro posun obrázků
function swipeImage(direction) {
    const images = document.querySelectorAll('.gallery-item img');
    let currentIndex = Array.from(images).findIndex(img => img.src === document.querySelector('.modal img').src);
    
    // Posun obrázku
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % images.length;
    } else if (direction === 'prev') {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
    }

    document.querySelector('.modal img').src = images[currentIndex].src;
}

// Přidání event listenerů pro touchstart a touchend pro swipe
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('touchstart', function(e) {
        startX = e.changedTouches[0].screenX; // Získání počáteční pozice prstu
    });

    modal.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].screenX; // Získání koncové pozice prstu
        const swipeDistance = startX - endX;
        
        if (Math.abs(swipeDistance) > 50) { // Pokud je vzdálenost mezi start a end dostatečná pro swipe
            if (swipeDistance > 0) {
                swipeImage('next');  // Swipe doprava (next)
            } else {
                swipeImage('prev');  // Swipe doleva (prev)
            }
        }
    });
});
});