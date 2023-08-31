from flask import Flask
import os

app = Flask(__name__)


@app.route("/")
def hello():
    return "Hello World!"


if __name__ == "__main__":
    port = os.environ.get("PORT") or ${{ values.port }}
    port = int(port)

    app.run(port=port, host="0.0.0.0")
