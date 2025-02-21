document.addEventListener('DOMContentLoaded', () => {

    const myDropdown = document.querySelector('.my-dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const arrow = document.querySelector('.arrow');

    myDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
        arrow.classList.toggle('rotate');
    });

    // 右侧菜单
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.querySelector('.side-menu');

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        sideMenu.classList.toggle('show');
    });

    // 点击外部关闭菜单
    document.addEventListener('click', () => {
        dropdownMenu.classList.remove('show');
        sideMenu.classList.remove('show');
        arrow.classList.remove('rotate');
    });
});
// 添加键盘支持
function initSearch() {
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.querySelector('.search-input');

    // 点击搜索图标
    searchIcon.addEventListener('click', () => {
        filterCards(searchInput.value);
    });

    // 回车键触发搜索
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            filterCards(searchInput.value);
        }
    });


    searchIcon.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            filterCards(searchInput.value);
        }
    });
}
window.addEventListener('load', () => {
    initSearch();
})

document.addEventListener('DOMContentLoaded', () => {
    // 轮播功能
    const container = document.querySelector('.carousel-container');
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelector('.carousel-indicators');
    let currentIndex = 0;

    // 初始化指示器
    items.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.toggle('active', index === 0);
        dot.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(dot);
    });


    function goToSlide(index) {
        currentIndex = index;
        container.style.transform = `translateX(-${index * 100}%)`;
        document.querySelectorAll('.carousel-indicators span').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // 自动轮播
    setInterval(() => goToSlide((currentIndex + 1) % items.length), 5000);
});
