
const config = {
    images: Array.from({ length: 6 }, (_, i) => `./images/image${i + 1}.png`),
    bubbleSize: 48,
    spawnInterval: 600,
    maxOffset: 80,
    fixedBubbles: 5,
    fixedBubbleSize: 48,
    fixedAreaHeight: 0.25
};

function toggleDropdown() {
    const dropdownTable = document.querySelector('.dropdown-table');
    const arrow = document.querySelector('.dropdown-header img'); // 获取箭头图标
    dropdownTable.classList.toggle('active');

    // 添加旋转动画
    arrow.style.transform = dropdownTable.classList.contains('active')
        ? 'rotate(180deg)'
        : 'rotate(0deg)';
}

function toggleMobileMenu() {
    document.querySelector('.nav-center').classList.toggle('active');
}

function initSearch() {
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.querySelector('.search-input');

    searchIcon.addEventListener('click', () => {
        filterCards(searchInput.value);
    });
}

window.addEventListener('load', () => {
    createFixedBubbles();
    initSearch();

    const resizeHandler = () => {
        document.querySelectorAll('.fixed-bubble, .bubble').forEach(b => b.remove());
        createFixedBubbles();
    };
    window.addEventListener('resize', resizeHandler);

    setInterval(() => {
        if (bubbleCounter < 30) {
            createBubble();
            bubbleCounter++;
        }
    }, config.spawnInterval);
});





function createImageElement() {
    const img = new Image();
    img.className = 'bubble-img';
    img.src = config.images[Math.random() * config.images.length | 0];
    return img;
}

function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const circleRect = document.getElementById('big-circle').getBoundingClientRect();

    bubble.style.cssText = `
        left: ${circleRect.left + Math.random() * (circleRect.width - config.bubbleSize)}px;
        top: ${circleRect.bottom - config.bubbleSize}px;
        transform: rotate(${Math.random() * 45}deg);
    `;

    bubble.appendChild(createImageElement());
    document.body.appendChild(bubble);

    bubble.addEventListener('animationend', () => bubble.remove());
}

function createFixedBubbles() {
    const bigCircle = document.getElementById('big-circle');
    const circleRect = bigCircle.getBoundingClientRect();
    const radius = config.fixedBubbleSize / 2;

    for (let i = 0; i < config.fixedBubbles; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'fixed-bubble';
        const centerX = Math.random() * circleRect.width;
        const centerY = circleRect.height * (1 - config.fixedAreaHeight * Math.random());

        bubble.style.cssText = `
            left: ${centerX - radius}px;
            top: ${centerY - radius}px;
        `;

        bubble.appendChild(createImageElement());
        bigCircle.appendChild(bubble);
    }
}

function createImageElement() {
    const img = new Image();
    img.className = 'bubble-img';
    img.alt = '动态气泡';
    img.onerror = () => {
        console.error('图片加载失败:', img.src);
        img.src = 'https://placehold.co/48x48'; // 备用图片
    };
    img.src = config.images[Math.random() * config.images.length | 0];
    return img;
}

let bubbleCounter = 0;


document.addEventListener('animationend', e => {
    if (e.target.classList.contains('bubble')) bubbleCounter--;
});

document.getElementById('one').addEventListener('click', function () {
    window.location.href = 'index2.html';
});

document.getElementById('two').addEventListener('click', function () {
    window.location.href = 'index4.html';
});
document.getElementById('three').addEventListener('click', function () {
    window.location.href = 'index5.html';
});