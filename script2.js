


class Waterfall {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.items = Array.from(this.container.children);
        this.colHeights = [];
        this.resizeObserver = new ResizeObserver(() => this.layout());
        this.init();
    }

    init() {

        this.colHeights = new Array(5).fill(0);


        if (this.container) {
            this.resizeObserver.observe(this.container);
        }

        this.items.forEach(item => {
            const img = item.querySelector('img');
            if (img && !img.complete) {
                img.addEventListener('load', () => this.layout());
            }
        });

        this.layout();

        window.addEventListener('scroll', () => this.handleScroll());

        // 点赞事件监听
        this.container.addEventListener('click', (e) => {
            const likeBtn = e.target.closest('.like-btn');
            if (likeBtn) {
                likeBtn.classList.toggle('active');
            }
        });
    }

    layout() {
        const gap = 20;
        const colCount = 5;
        const containerWidth = this.container.offsetWidth;
        const colWidth = (containerWidth - (gap * (colCount - 1))) / colCount;

        this.colHeights = new Array(colCount).fill(0);

        this.items.forEach(item => {
            // 获取项目实际高度
            const itemHeight = item.offsetHeight;

            // 找到最短列
            const minHeight = Math.min(...this.colHeights);
            const targetCol = this.colHeights.indexOf(minHeight);

            // 定位项目
            item.style.position = 'absolute';
            item.style.width = `${colWidth}px`;
            item.style.left = `${targetCol * (colWidth + gap)}px`;
            item.style.top = `${minHeight}px`;

            // 更新列高度
            this.colHeights[targetCol] += itemHeight + gap;
        });

        // 更新容器高度
        this.container.style.height = `${Math.max(...this.colHeights)}px`;

        this.items.forEach(item => {
            const circle = item.querySelector('.cartoon-circle');
            if (circle) {
                circle.style.width = `${item.offsetWidth * 2}px`;
                circle.style.height = `${item.offsetWidth * 2}px`;
            }
        });
    }

    // 滚动加载示例
    handleScroll() {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            this.loadMoreItems();
        }
    }

    // 模拟加载更多数据
    loadMoreItems() {
        const newItem = document.createElement('div');
        newItem.className = 'item';
        newItem.innerHTML = `
            <div class="it-img">
                <img src="" class="it-img-src">
            </div>
            <div class="text"><span>新内容</span></div>
            <div class="author-icon">...</div>
        `;

        this.container.appendChild(newItem);
        this.items.push(newItem);
        this.layout();
    }
}

// 初始化瀑布流
document.addEventListener('DOMContentLoaded', () => {
    const waterfall = new Waterfall('.g-container');
});

document.querySelectorAll('.it-img-src').forEach(img => {
    img.addEventListener('load', function () {
        waterfall.layout();
    });
});

