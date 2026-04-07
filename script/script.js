const init3DScene = () => {
    const container = document.querySelector('.hero-3d-viewport');
    const canvas = document.querySelector('#hero-3d-canvas');
    if (!canvas || !container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(30, container.clientWidth / container.clientHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const light = new THREE.DirectionalLight(0xffffff, 2.5);
    light.position.set(5, 10, 7);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 2.1;

    let model, mixer;
    let isInteracting = false;
    const clock = new THREE.Clock();
    const loader = new THREE.GLTFLoader();

    controls.addEventListener('start', () => { isInteracting = true; });
    controls.addEventListener('end', () => { isInteracting = false; });

    const updateCameraAspect = () => {
        const width = container.clientWidth;
        const height = container.clientHeight;

        renderer.setSize(width, height);
        camera.aspect = width / height;

        if (width < 600) {
            camera.fov = 20;
            camera.position.set(0, 4, 30);
        } else if (width < 1024) {
            camera.fov = 24;
            camera.position.set(0, 3, 25);
        } else {
            camera.fov = 12;
            camera.position.set(0, 2, 18);
        }

        const centerY = 0;
        camera.lookAt(0, centerY, 0);
        controls.target.set(0, centerY, 0);
        camera.updateProjectionMatrix();
    };

    loader.load('3D.glb', (gltf) => {
        model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        model.scale.set(1.4, 1.4, 1.4);
        model.position.y = -8.8; 

        scene.add(model);

        if (gltf.animations && gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(model);
            mixer.clipAction(gltf.animations[0]).play();
        }

        updateCameraAspect();
    });

    const animate = () => {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();

        if (mixer) mixer.update(delta);

        if (model && !isInteracting) {
            model.rotation.y += 0.003;
        }

        controls.update();
        renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', updateCameraAspect);
};

const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
};

const initMobileMenu = () => {
    const mobileBtn = document.getElementById('mobile-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-links li a');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileBtn.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileBtn.classList.remove('active');
            });
        });
    }
};

window.openProject = (id) => {
    window.location.href = `${id}.html`;
};

document.addEventListener('DOMContentLoaded', () => {
    init3DScene();
    initSmoothScroll();
    initMobileMenu();
});