import os
import json
import logging
from datetime import datetime
from dotenv import load_dotenv

from util.DateUtils import DateUtils

### Sigleton class to handle config file values.
class ConfigUtil :

    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ConfigUtil, cls).__new__(cls)
            cls._instance.__initialized = False
        return cls._instance

    def __init__(self) :
        if not self.__initialized:
            self.__initialized = True
            self.value = None
        load_dotenv()
        self.couner = 0
        self.timestampString = ""
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(os.environ.get('LOGLEVEL', 'INFO').upper())
        ### Config file
        config_file_name = os.getenv("ENVIZI_CONFIG_FILE", "./envizi-config.json")
        self.configData = self._loadConfigFile(config_file_name)
        self._populateConfigDataInVariable()

    def update(self, payload):
        self.configData = payload
        self._populateConfigDataInVariable()
        return self.configData

    def getConfigData(self):
        return self.configData

    def _loadConfigFile(self, fileName):

        data = {}
        try:
            with open(fileName, "r") as json_file:
                data = json.load(json_file)
                self.logger.debug(data)
        except FileNotFoundError:
            self.logger.error(f"The file '{fileName}' does not exist.")
        except json.JSONDecodeError:
            self.logger.error(f"The file '{fileName}' is not valid JSON.")
        return data
    
    def _populateConfigDataInVariable(self):
        self.DISCOVERY_API_KEY = self.configData['discovery']['access']['api_key']
        self.DISCOVERY_SERVICE_URL = self.configData['discovery']['access']['service_url']
        self.DISCOVERY_PROJECT_ID = self.configData['discovery']['access']['project_id']
        self.DISCOVERY_COLLECTION_ID = self.configData['discovery']['access']['collection_ids']
        self.DISCOVERY_PROJECT_ID2 = self.configData['discovery']['access']['project_id2']
        self.DISCOVERY_COLLECTION_ID2 = self.configData['discovery']['access']['collection_ids2']
        self.DISCOVERY_COUNT= self.configData['discovery']['access']['count']

        self.ENVIZI_ORG_NAME = self.configData['envizi']['parameters']['org_name']
        self.ENVIZI_LOCATION = self.configData['envizi']['parameters']['location']

        self.WATSONX_API_KEY = self.configData['watsonx_ai']['access']['api_key']
        self.WATSONX_API_URL = self.configData['watsonx_ai']['access']['api_url']
        self.WATSONX_PROJECT_ID = self.configData['watsonx_ai']['access']['project_id']
        self.WATSONX_MODEL_ID = self.configData['watsonx_ai']['access']['model_id']
        self.WATSONX_AUTH_URL = self.configData['watsonx_ai']['access']['ibmc_auth_url']