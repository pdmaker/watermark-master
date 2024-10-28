# 备注：本文件与这个 HTML 项目没有直接关系。使用 python server.py 启动服务器，访问 http://localhost:5801/en 或 http://localhost:5801/zh 查看效果。这样能够避免本地文件路径问题。比如访问 /en 不至于出现 Cannot GET /en 的问题。

import http.server
import socketserver

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # 所有请求都返回 index.html
        if self.path.startswith('/en'):
            self.path = '/index.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

PORT = 5801
Handler.extensions_map['.js'] = 'application/javascript'  # 正确处理 .js 文件

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Server running at http://localhost:{PORT}")
    httpd.serve_forever()
