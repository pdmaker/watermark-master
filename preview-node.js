const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// 设置静态文件的根目录
const staticPath = path.join(__dirname, '/');

// 创建HTTP服务器
http.createServer((req, res) => {
    // 检查请求的URL路径
    const filePath = path.join(staticPath, req.url === '/' ? 'index.html' : req.url);
    console.log('filePath = ' + filePath)

    // 读取文件并返回给客户端
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log('readFile error: ' + filePath)
            // 如果文件不存在，返回404错误
            res.writeHead(404);
            res.end('404 Not Found');
        } else {
            // 设置Content-Type
            const ext = path.extname(filePath);
            let contentType = 'text/html';
            if (ext === '.css') contentType = 'text/css';
            if (ext === '.js') contentType = 'application/javascript';
            if (ext === '.jpg') contentType = 'image/jpeg';
            if (ext === '.png') contentType = 'image/png';

            // 发送响应头和内容
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}).listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
	
    // 在 Windows 上使用默认浏览器打开
    exec('start http://127.0.0.1:8080', (err) => {
        if (err) {
            console.error('Failed to open browser:', err);
        }
    });
});
