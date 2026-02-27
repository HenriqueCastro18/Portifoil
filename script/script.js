const scrollObserverOptions = {
    root: null,
    threshold: 0.1
};

const handleElementIntersection = (entries) => {
    entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
            target.classList.add('section-visible');
        } else {
            target.classList.remove('section-visible');
        }
    });
};

const setupScrollAnimations = () => {
    const sectionObserver = new IntersectionObserver(handleElementIntersection, scrollObserverOptions);
    const animatableSections = document.querySelectorAll('.certifications, .projects');

    animatableSections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
};

const forceScrollToTop = () => {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', () => {
    forceScrollToTop();
    setupScrollAnimations();
});

const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

const Games = () => scrollToSection('#projetos');
const B7WEB = () => scrollToSection('#certificados');
const Sites = () => scrollToSection('#projetos');