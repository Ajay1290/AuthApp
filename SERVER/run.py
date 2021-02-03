from gevent.pywsgi import WSGIServer
from manager import create_app

http_server = WSGIServer(('', 5000), create_app())

if __name__ == '__main__':
    http_server.serve_forever()