// 初始化画布
const canvas = document.getElementById("liquidCanvas");
const ctx = canvas.getContext("2d");

// 容器尺寸同步
function initCanvas() {
    const container = document.querySelector(".cartoon");
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    ctx.fillStyle = "#7B3D99";
}
initCanvas();
window.addEventListener("resize", initCanvas);

// 物理参数
const balls = [];
const mouse = { x: 0, y: 0, isDown: false, targetBall: null };
const viscosity = 0.05; // 流体粘性系数
class Ball {
    constructor() {
        this.radius = Math.random() * 40 + 20; // 随机半径
        this.wanderStrength = 0.01; // 随机运动强度
        this.speedFactor = 0.2;
        this.ripples = [];
        this.reset();
    }
    reset() {
        const container = document.querySelector(".cartoon");
        this.x = container.clientWidth / 2 + (Math.random() - 0.5) * 100;
        this.y = container.clientHeight / 2 + (Math.random() - 0.5) * 100;
        this.vx = (Math.random() - 0.5) * this.speedFactor * 3;
        this.vy = (Math.random() - 0.5) * this.speedFactor * 3;
    }
    update() {
        if (mouse.isDown && this === mouse.targetBall) {
            const strength = 0.1; // 控制拖拽强度
            const damping = 0.8;  // 阻尼系数
            this.vx = (mouse.x - this.x) * strength;
            this.vy = (mouse.y - this.y) * strength;
            this.vx *= damping;
            this.vy *= damping;
        }

        this.x += this.vx;
        this.y += this.vy;

        // 边界反弹
        const bounce = 0.9;
        if (this.x < this.radius) { this.vx = Math.abs(this.vx) * bounce; }
        if (this.x > canvas.width - this.radius) { this.vx = -Math.abs(this.vx) * bounce; }
        if (this.y < this.radius) { this.vy = Math.abs(this.vy) * bounce; }
        if (this.y > canvas.height - this.radius) { this.vy = -Math.abs(this.vy) * bounce; }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    addRipple() {
        this.ripples.push({
            radius: 0,
            opacity: 0.5,
            x: this.x,
            y: this.y
        });
    }

    updateRipples() {
        this.ripples = this.ripples.filter(ripple => {
            ripple.radius += 0.5;
            ripple.opacity -= 0.001;
            return ripple.opacity > 0;
        });
    }

    drawRipples() {
        this.ripples.forEach(ripple => {
            ctx.beginPath();
            ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(white, ${ripple.opacity})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    }
}

// 初始化球体
for (let i = 0; i < 8; i++) balls.push(new Ball());

// 鼠标交互
canvas.addEventListener('mousedown', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

    // 寻找被点击的球体
    balls.some(ball => {
        const dx = mouse.x - ball.x;
        const dy = mouse.y - ball.y;
        if (dx * dx + dy * dy < ball.radius * ball.radius) {
            ball.addRipple();
            mouse.isDown = true;
            mouse.targetBall = ball;
            return true;
        }
    });
});

canvas.addEventListener('mousemove', e => {
    if (!mouse.isDown) return;
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

canvas.addEventListener('mouseup', () => {
    mouse.isDown = false;
    mouse.targetBall = null;
});


// 动画循环
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 更新物理状态
    balls.forEach(ball => ball.update());
    // 新增波纹更新
    balls.forEach(ball => {
        ball.update();
        ball.updateRipples();
    });

    // 绘制球体
    balls.forEach(ball => {
        ball.draw();
        ball.drawRipples(); // 先画球体再画波纹
    });

    requestAnimationFrame(animate);
}
animate();

// 下拉菜单交互
document.querySelectorAll('.dropdown-container').forEach(container => {
    const icon = container.querySelector('.dropdown-icon');

    // 切换菜单显示
    icon.addEventListener('click', (e) => {
        e.stopPropagation();
        container.classList.toggle('active');
    });

    // 点击外部关闭
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
            container.classList.remove('active');
        }
    });
});

document.getElementById('btn').addEventListener('click', function () {
    window.location.href = 'index.html';
});