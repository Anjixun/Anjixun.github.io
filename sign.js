document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const captcha = document.getElementById('captcha').value;

    if (!username || !password || !captcha) {
        alert('请填写所有字段');
        return;
    }

    // 模拟登录成功
    console.log('登录信息：', { username, password, captcha });


    window.location.href = 'index.html';

    alert('登录成功！正在跳转...');
});

document.querySelector('.password-icon').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        this.src = './images/eye-slash-icon.png';
    } else {
        passwordField.type = 'password';
        this.src = './images/xx.png';
    }
});

// 验证码生成逻辑
function generateCaptcha() {
    const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
    let captcha = "";
    for (let i = 0; i < 4; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('captchaBox').textContent = captcha;
}

// 初始化验证码
generateCaptcha();

// 添加点击刷新功能
document.getElementById('captchaBox').addEventListener('click', generateCaptcha);