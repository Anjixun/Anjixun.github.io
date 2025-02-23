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

    // 箭头事件
    document.querySelector('.prev').addEventListener('click', () => {
        goToSlide((currentIndex - 1 + items.length) % items.length);
    });

    document.querySelector('.next').addEventListener('click', () => {
        goToSlide((currentIndex + 1) % items.length);
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


class WaterfallFinal {
    constructor(container) {
        this.container = container;
        this.items = [];
        this.generateItems(30); // 生成30个商品
        this.init();
    }

    generateItems(count) {
        const products = [
            { name: "纯棉夜用卫生巾组合装", price: 89.90 },
            { name: "孕妇专用护理液500ml", price: 129.00 },
            { name: "哺乳文胸三件套", price: 199.00 },
            { name: "经期安睡裤6片装", price: 59.90 }
        ];

        for (let i = 0; i < count; i++) {
            const item = document.createElement('div');
            item.className = 'item';
            const product = products[i % 4];

            item.innerHTML = `
                <div class="it-img">
                    <img src="./images/14.png" class="it-img-src" >
                </div>
                <div class="text">
                    <a>${product.name}</a>
                    <div class="author-icon">
                        <div class="price-container">
                            <span class="price">¥${product.price.toFixed(2)}</span>
                            <span class="sales">已售${Math.floor(Math.random() * 500 + 50)}</span>
                        </div>
                    </div>
                </div>
            `;

            this.container.appendChild(item);
            this.items.push(item);
        }
    }

    init() {
        this.layout();
        window.addEventListener('resize', () => this.layout());

        // 图片加载后刷新布局
        this.items.forEach(item => {
            const img = item.querySelector('img');
            img.onload = () => this.layout();
        });
    }

    layout() {
        const containerWidth = this.container.offsetWidth;
        let columnCount;

        if (containerWidth >= 1200) {
            columnCount = 6; // 1200px以上6列
        } else if (containerWidth >= 768) {
            columnCount = 4; // 768-1200px 4列
        } else {
            columnCount = 2; // 移动端2列
        }

        const gap = 20;
        const colWidth = (containerWidth - gap * (columnCount - 1)) / columnCount;
        const columnHeights = new Array(columnCount).fill(0);

        this.items.forEach(item => {
            // 动态设置宽度
            item.style.width = `${colWidth}px`;

            // 找到最短列
            const minHeight = Math.min(...columnHeights);
            const colIndex = columnHeights.indexOf(minHeight);

            // 定位元素
            item.style.transform = `translate(
                ${colIndex * (colWidth + gap)}px,
                ${minHeight}px
            )`;

            // 更新列高（通过aspect-ratio自动计算高度）
            columnHeights[colIndex] += item.offsetHeight + gap;
        });

        // 更新容器高度
        this.container.style.height = `${Math.max(...columnHeights)}px`;
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new WaterfallFinal(document.querySelector('.line-3'));
});