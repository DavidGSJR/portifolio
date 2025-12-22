const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 120);
});

let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navlist.classList.toggle("active");
};

window.onscroll = () => {
    menu.classList.remove("bx-x");
    navlist.classList.remove("active");
};

// Skills Animation
const skillBars = document.querySelectorAll(".skill-bar");

const animateSkills = () => {
    skillBars.forEach((bar) => {
        const level = bar.getAttribute("data-level");
        bar.style.width = level + "%";
    });
};

// Intersection Observer for skills animation
const skillsSection = document.querySelector(".skills");
if (skillsSection) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    observer.observe(skillsSection);
}

// --- Read more / Acordeão nas descrições de experiência (agora expande a caixa) ---
const initReadMore = () => {
    console.debug('initReadMore: running');
    const COLLAPSED_HEIGHT = 140; // deve estar sincronizado com o CSS
    const boxes = document.querySelectorAll('.services .box, .portfolio .row');
    console.debug('initReadMore: boxes found', boxes.length);

    boxes.forEach((box, index) => {
        const desc = box.querySelector('.desc');
        const btn = box.querySelector('.read-more');
        console.debug(`initReadMore: box ${index}, desc? ${!!desc}, btn? ${!!btn}`);
        if (!desc || !btn) return;

        // garantir ids únicos
        const id = desc.id || `desc-${index}`;
        desc.id = id;
        btn.setAttribute('aria-controls', id);

        // se o conteúdo for pequeno, esconder o botão
        if (desc.scrollHeight <= COLLAPSED_HEIGHT) {
            console.debug(`initReadMore: box ${index} content small (scrollHeight=${desc.scrollHeight}) -> hide button`);
            btn.style.display = 'none';
            box.classList.remove('expanded');
            return;
        } else {
            btn.style.display = '';
            console.debug(`initReadMore: box ${index} content large (scrollHeight=${desc.scrollHeight}) -> show button`);
        }

        // evitar múltiplos event listeners
        if (btn.dataset.initialized) {
            console.debug(`initReadMore: box ${index} already initialized`);
            return;
        }
        btn.dataset.initialized = 'true';

        btn.addEventListener('click', (e) => {
            console.debug('read-more click on box', index);
            const expanded = box.classList.toggle('expanded');
            btn.setAttribute('aria-expanded', expanded);
            btn.textContent = expanded ? 'Ver menos' : 'Ver mais';

            // se expandiu, rolar o box para o topo do conteúdo (melhor UX)
            if (expanded) {
                box.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        });
    });
};

// iniciar após carregamento para garantir medidas corretas
window.addEventListener('load', initReadMore);
window.addEventListener('resize', () => {
    console.debug('window resize -> reinit');
    // remover marcação para recalcular corretamente
    document.querySelectorAll('.read-more').forEach(btn => {
        if (btn.dataset.initialized) delete btn.dataset.initialized;
    });
    initReadMore();
});
