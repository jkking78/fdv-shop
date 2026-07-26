import http.server
import socketserver
import os
import mimetypes
import urllib.parse

PORT = 8888

class DirectFileHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        url_path = urllib.parse.unquote(self.path.split('?')[0])
        clean_path = url_path.lstrip('/')
        if not clean_path:
            clean_path = 'index.html'

        filepath = os.path.normpath(os.path.join(os.getcwd(), clean_path))

        if not os.path.isfile(filepath):
            public_filepath = os.path.normpath(os.path.join(os.getcwd(), 'public', clean_path))
            if os.path.isfile(public_filepath):
                filepath = public_filepath

        if os.path.isfile(filepath):
            mime_type, _ = mimetypes.guess_type(filepath)
            if not mime_type:
                mime_type = 'application/octet-stream'
            
            try:
                with open(filepath, 'rb') as f:
                    content = f.read()
                
                self.send_response(200)
                self.send_header('Content-Type', mime_type)
                self.send_header('Content-Length', str(len(content)))
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Cache-Control', 'no-cache')
                self.end_headers()
                self.wfile.write(content)
            except Exception as e:
                self.send_error(500, f"Error: {str(e)}")
        else:
            self.send_error(404, f"File not found: {clean_path}")

    def log_message(self, format, *args):
        pass

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), DirectFileHandler) as httpd:
        print(f"FDV Shopping Server live at http://localhost:{PORT}")
        httpd.serve_forever()
