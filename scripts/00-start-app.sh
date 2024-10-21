#!/bin/bash

echo "app Started ...."

export WRITE_INTERIM_FILES=TRUE
export LOGLEVEL=DEBUG
export ENVIZI_CONFIG_FILE="/Users/gandhi/GandhiMain/700-Apps/envizi-invoice-assist/api/config/envizi-config.json"
export DATA_FOLDER="/Users/gandhi/GandhiMain/700-Apps/envizi-invoice-assist/api/data"
export DATA_STORE_FOLDER="/Users/gandhi/GandhiMain/700-Apps/envizi-invoice-assist/api/data-store"

export OUTPUT_FOLDER="/Users/gandhi/GandhiMain/700-Apps/envizi-invoice-assist/output"

python api/src/main.py

echo "app completed ...."