import os

from dotenv import load_dotenv

from ibm_watson_machine_learning.foundation_models import Model


import requests
import json
import os
from dotenv import load_dotenv
from ibm_cloud_sdk_core import IAMTokenManager
import time
load_dotenv()

import logging 
from util.FileUtil import FileUtil
from util.ConfigUtil import ConfigUtil
from util.DateUtils import DateUtils

class LlmMain(object):

    def __init__(
        self,
        configUtil: ConfigUtil,
    ) -> None:
        load_dotenv()
        self.configUtil = configUtil
        self._init_config()

    def _init_config(self):
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(os.environ.get('LOGLEVEL', 'INFO').upper())

    def callWatsonx(self, project_id, model_id, prompt_input, max_new_tokens):
        self.logger.info("------------------------------------------------ callWatsonx Started ------------------------------------------------")
        start_time = time.time()
        self.logger.info(f"Prompt : {prompt_input} ")

        access_token = IAMTokenManager(apikey = self.configUtil.WATSONX_API_KEY, url =  self.configUtil.WATSONX_AUTH_URL).get_token()
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ access_token
            }
        
        parameters = {
            "decoding_method": "greedy",
            "max_new_tokens": max_new_tokens,
            "min_new_tokens": 1,
            "repetition_penalty": 1
            }
        
        llmPayload = {
            "project_id": project_id,
            "model_id": model_id, 
            "parameters": parameters,
            "input": prompt_input
            }
        
        llmResponse = requests.post(self.configUtil.WATSONX_API_URL, json=llmPayload, headers=headers)
        if llmResponse.status_code == 200:
            output = llmResponse.json()["results"][0]["generated_text"]
        else:
            output = ""

        
        end_time = time.time()
        execution_time = end_time - start_time
        self.logger.info(f"\n\n\nresult : {output} ")
        self.logger.info(f"\nExecution time: callWatsonx : {execution_time} seconds")
        self.logger.debug("------------------------------------------------ callWatsonx Completed ------------------------------------------------\n\n\n")

        return output


    def generateInvoiceSummary(self, invoiceText):
        self.logger.info("LlmMain -> generateInvoiceSummary  ... ")

        # prompt_input = """You are legal expert in reviewing property title reports. \nBelow is extract of the title search report for a property.\nPlease extract the names of all the previous and current owners of the property and display these names in a numbered list in a chronological order. \nPlease ensure that you consider joint ownership and display them as single numbered item.\nPlease consider only ownership rights to the property and do not consider any person who may have other rights to the property.\n\nTitle search report:\n\n
        prompt_input = "Given below the invoice content. Can you create a nice summary out of it\n\n"

        prompt_input += " Invoice Content : " + invoiceText

        SKIP_LLM = os.getenv("SKIP_LLM", "FALSE")
        if (SKIP_LLM == "TRUE") :
            generated_response = "This a test message"
        else :
            generated_response = self.callWatsonx(self.configUtil.WATSONX_PROJECT_ID, self.configUtil.WATSONX_MODEL_ID, prompt_input, 200)

        return generated_response

