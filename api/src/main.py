from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from flask_httpauth import HTTPBasicAuth
from flask_cors import CORS

# import getpass
import os
import logging 
from dotenv import load_dotenv


from api.ApiMisc import apiMisc
from api.ApiConfig import apiConfig
from api.ApiInvoice import apiInvoice

from util.ConfigUtil import ConfigUtil

#### Logging Configuration
logging.basicConfig(
    format='%(asctime)s - %(levelname)s:%(message)s',
    handlers=[
        logging.StreamHandler(), #print to console
    ],
    level=logging.INFO
)

app = Flask(__name__)

CORS(app)

app.register_blueprint(apiMisc)
app.register_blueprint(apiConfig)
app.register_blueprint(apiInvoice)


@app.route('/hello')
def indexhellow():
    resp = {"msg": "hello"}
    return resp, 200

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

### Main method
def main():
    logging.info("main started .....")
    load_dotenv()

    configUtil = ConfigUtil()
    app.config["configUtil"] = configUtil


    # Get all attributes of the module
    module_attributes = dir(ConfigUtil)
    # Print the list of attributes
    print(module_attributes)

    ### Run the app
    app.run(host ='0.0.0.0', port = 3001, debug = False)

if __name__ == '__main__':
    main()