const container = document.querySelector('.container');
const signupButton = document.querySelector('.signup-section header');
const loginButton = document.querySelector('.login-section header');

loginButton.addEventListener('click', () => {
    container.classList.add('active');
});

signupButton.addEventListener('click', () => {
    container.classList.remove('active');
});

document.addEventListener('DOMContentLoaded', () => {
    //获取表单元素
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    //登录表单提交事件处理
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('loginEmail').value;//获取用户输入的电子邮件
        const password = document.getElementById('loginPassword').value;//获取用户输入的密码

        try {
            //使用fetch API发送POST请求到API网关的/api/auth/login端点，发送用户名和密码。
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: email, password: password })
            });

            if (response.ok) {
                const data = await response.json(); //解析响应体中的JSON数据
                const token = data.token; //获取返回的JWT令牌
                localStorage.setItem('token', token); //将令牌存储在浏览器的本地存储中
                window.location.href = 'protected.html';  //重定向到受保护的页面
            } else {
                const errorText = await response.text();
                alert(errorText); //在页面上显示错误消息
            }
        } catch (error) {
            console.error('Error:', error);
            alert('有错误发生，请重试.');
        }
    });

    //注册表单提交事件处理
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('signupUsername').value;//获取用户输入的用户名。
        const email = document.getElementById('signupEmail').value;//获取用户输入的电子邮件。
        const password = document.getElementById('signupPassword').value;//获取用户输入的密码。

        try {
            //使用fetch API发送POST请求到API网关的/api/auth/register端点，发送用户名、电子邮件和密码。
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, email: email, password: password })
            });

            if (response.ok) {
                alert('Registration successful!'); //显示注册成功的消息。
                window.location.href = 'login.html'; // 重定向到登录页面
            } else {
                const errorText = await response.text();
                alert(errorText); // 在页面上显示错误消息
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
