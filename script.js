document.addEventListener('DOMContentLoaded', () => {
    // 1. Lluvia de Corazones
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    let hearts = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function createHeart() {
        return {
            x: Math.random() * canvas.width,
            y: -20,
            size: Math.random() * 15 + 10,
            speed: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.5
        };
    }

    function drawHeart(h) {
        ctx.save();
        ctx.globalAlpha = h.opacity;
        ctx.fillStyle = '#ff4d6d';
        ctx.beginPath();
        ctx.moveTo(h.x, h.y);
        ctx.bezierCurveTo(h.x - h.size/2, h.y - h.size/2, h.x - h.size, h.y + h.size/3, h.x, h.y + h.size);
        ctx.bezierCurveTo(h.x + h.size, h.y + h.size/3, h.x + h.size/2, h.y - h.size/2, h.x, h.y);
        ctx.fill();
        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (hearts.length < 40 && Math.random() < 0.1) hearts.push(createHeart());
        hearts.forEach((h, i) => {
            h.y += h.speed;
            drawHeart(h);
            if (h.y > canvas.height) hearts.splice(i, 1);
        });
        requestAnimationFrame(animate);
    }
    animate();

    // 2. Navegación
    const rain = document.getElementById('heartRain');
    const yorkie = document.getElementById('yorkieScene');
    const question = document.getElementById('questionScreen');
    const success = document.getElementById('successScreen');

    const start = () => {
        if (rain.classList.contains('active')) {
            rain.classList.remove('active');
            yorkie.classList.add('active');
            setTimeout(() => {
                yorkie.classList.remove('active');
                question.classList.add('active');
            }, 3000);
        }
    };

    document.addEventListener('keydown', start);
    rain.addEventListener('click', start);

    // 3. El botón NO huye
    const noBtn = document.getElementById('noBtn');
    noBtn.addEventListener('mouseover', () => {
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 50);
        noBtn.style.position = 'fixed';
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
    });

    document.getElementById('yesBtn').onclick = () => {
        question.classList.remove('active');
        success.classList.add('active');
    };

    // 4. Modal y Copiar
    const modal = document.getElementById('clabeModal');
    document.getElementById('coffeeBtn').onclick = () => modal.style.display = 'flex';
    document.querySelector('.modal-close').onclick = () => modal.style.display = 'none';
    
    document.getElementById('copyClabeBtn').onclick = function() {
        navigator.clipboard.writeText(document.getElementById('clabeDisplay').innerText);
        this.innerText = "¡Copiado!";
        setTimeout(() => this.innerText = "📋 Copiar CLABE", 2000);
    };
});