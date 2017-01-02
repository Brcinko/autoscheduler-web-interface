# autoscheEDUler-web-interface

This project is a part of master thesis named "Automation of virtual machine placement". 
This repository contains web interface for OpenStack scheduler automatization software - autoschEDUler.

## Prerequisities and installation guide

Here comes list of prerequisities, for it is just:
* python 2.7.6
* Flask
* pymongo
* pprint
* MongoDB

## TODO list

* Configurations
  * Frontend
    * display data in table
    * create API call for get conf
  * Backend
    * figure out automatic UUID
* Statistics
  * Frontend
    * create API call for get stats
    * create API call for get stats for specific host
  * Backend
    * create API call for get stats
    * create API call for get stats for specific host
    
## Database scheme
autoschEDUler uses MongoDB which is noSQL database based on JSON (BSON) objects. autoschEDUler (and also webinterface) knows following collection with specific documents:
* __collection_name__: configurations, __example_file__: frontend/get_conf_example.json
