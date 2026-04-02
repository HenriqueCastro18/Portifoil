const projectData = {
    'dieta': {
        title: 'Dieta Fácil V3',
        year: '2026',
        longDesc: 'Ecossistema completo de saúde que integra IA Generativa de baixa latência (Gemini 2.0 e Groq) para análise nutricional e geração de treinos personalizados. O sistema utiliza uma arquitetura multicamadas com persistência em nuvem via Firebase Firestore e segurança defensiva robusta, incluindo Multi-Factor Authentication (MFA). O grande diferencial técnico é o sistema de gamificação em RPG, que utiliza lógica de XP, Streaks (combos de consistência) e spritesheets animados para recompensar o progresso do usuário com pets exclusivos.',
        images: [
            './Image/Dieta_IA/home.png',
            './Image/Dieta_IA/rankingFunc.png',
            './Image/Dieta_IA/gameficaçao.png'
        ],
        live: 'https://dieta-ia-v3.vercel.app/', 
        repo: 'https://github.com/HenriqueCastro18/Dieta-Facil'
    },
    'biblioteca': {
        title: 'Biblioteca v4.0',
        year: '2026',
        longDesc: 'Sistema robusto de gestão de acervos desenvolvido em C#. Implementa padrões de projeto como Singleton e Repository, com integração total a banco de dados para controle de empréstimos e usuários.',
        images: ['./image/Dieta_IA/home.png'],
        live: '#',
        repo: 'https://github.com/HenriqueCastro18/Biblioteca-v4.0'
    },
    'mario': {
        title: 'Mario Jumper',
        year: '2025',
        longDesc: 'Projeto de desenvolvimento de jogos com foco em lógica de programação pura e física. Inclui o sistema "Cannon Precision" para garantir colisões precisas e jogabilidade fluida.',
        images: ['./image/Dieta_IA/home.png'],
        live: '#',
        repo: 'https://github.com/HenriqueCastro18/Mario-Jumper---Cannon-Precision'
    },
    'gastos': {
        title: 'Gestor de Gastos',
        year: '2025',
        longDesc: 'Aplicação voltada para organização financeira pessoal. Permite o rastreio detalhado de receitas e despesas com dashboards intuitivos para análise da saúde financeira.',
        images: ['./image/Dieta_IA/home.png'],
        live: '#',
        repo: 'https://github.com/HenriqueCastro18/Gestor_Gastos'
    },
    'medicenter': {
        title: 'MediCenter',
        year: '2024',
        longDesc: 'Landing page moderna para o setor de saúde. Totalmente responsiva e otimizada, utilizando técnicas avançadas de CSS para garantir uma interface limpa e profissional.',
        images: ['./image/Dieta_IA/home.png'],
        live: '#',
        repo: 'https://github.com/HenriqueCastro18/MediCenter'
    }
};

const params = new URLSearchParams(window.location.search);
let id = params.get('id');
if (!projectData[id]) id = 'dieta'; 

const content = projectData[id];

document.title = `${content.title} // Henrique Castro`;
document.getElementById('p-title').innerText = content.title;
document.getElementById('p-year').innerText = content.year;
document.getElementById('p-long-desc').innerText = content.longDesc;

const liveBtn = document.getElementById('p-live');
if(content.live === '#') {
    liveBtn.style.display = 'none';
} else {
    liveBtn.href = content.live;
}
document.getElementById('p-repo').href = content.repo;

const gallery = document.getElementById('p-gallery');
content.images.forEach(src => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `<img src="${src}" alt="Screenshot">`;
    gallery.appendChild(slide);
});

document.addEventListener('DOMContentLoaded', function() {
    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 20,      
            stretch: 0,
            depth: 100,      
            modifier: 1,
            slideShadows: true, 
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        keyboard: {
            enabled: true,
        },
    });
});