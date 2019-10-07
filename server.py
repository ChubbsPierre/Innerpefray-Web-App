from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
from bson import json_util
from bson.json_util import dumps

app = Flask(__name__)

#information for the mongo database 
mongoHost = 'localhost'
mongoPort = 27017
dbsName= 'db'
dataLimit = 6551
ledgerCollectionName = 'LedgerData'
ledgerTo1968CollectionName = 'LedgerData1968'

#what follows are all the projections for the queries into the mongo database. Each chart has its own projection to avoid confusion
fieldsHandwriting = {'_id': 0, 'handwriting': 1} 
fieldsGenre = {'_id': 0, 'Genre': 1} 
fieldsDate = {'_id': 0, 'Date': 1} 
fieldsPub = {'_id': 0, 'PlaceOfPub': 1}
fieldsLanguage = {'_id': 0, 'Language': 1}
fieldsReturn = {'_id': 0, 'return_status': 1}
fieldsFire = {'_id': 0, 'PlaceOfPub': 1, 'Date': 1}
fieldsOccupation = {'_id': 0, 'borrower_occupation': 1, 'borrowed_yr': 1}

@app.route("/")
def index():
    return render_template("index.html")

#----------------------- Pie Charts----------------------- 

@app.route("/PieCharts") #returns an html template for the user to view wwhen they access this URL
def pieCharts():
    return render_template("pieCharts.html")

@app.route("/db/handwritingData") #Retrieves data about the ledger handwriting status from the mongo database
def db_handwritingData():
    connection = MongoClient(mongoHost, mongoPort) #open a connection to our mongo database
    collection = connection[dbsName][ledgerCollectionName] #navigate to the correct database and collection
    projects = collection.find(projection=fieldsHandwriting, limit = dataLimit) #query the database collection and return the required fields, typically one

    json_projects = [] #array to hold the query data
    for project in projects: 
        json_projects.append(project) #append onto the array every returned docuemnt 

    json_projects = json.dumps(json_projects, default=json_util.default)
    connection.close()
    return json_projects

@app.route("/db/genreData")
def db_genreData():
    connection = MongoClient(mongoHost, mongoPort)
    collection = connection[dbsName][ledgerCollectionName]
    projects = collection.find(projection = fieldsGenre, limit = dataLimit)

    json_projects = []
    for project in projects:
        json_projects.append(project)

    json_projects = json.dumps(json_projects, default=json_util.default)
    connection.close()
    return json_projects

@app.route("/db/returnData")
def db_returnData():
    connection = MongoClient(mongoHost, mongoPort)
    collection = connection[dbsName][ledgerCollectionName]
    projects = collection.find(projection = fieldsReturn, limit = dataLimit)

    json_projects = []
    for project in projects:
        json_projects.append(project)

    json_projects = json.dumps(json_projects, default=json_util.default)
    connection.close()
    return json_projects

#-----------------------Bar Charts----------------------- 

@app.route("/BarCharts")
def BarCharts():
    return render_template("BarCharts.html")

@app.route("/db/bookDateData")
def db_bookDateData():
    connection = MongoClient(mongoHost, mongoPort)
    collection = connection[dbsName][ledgerCollectionName]
    projects = collection.find(projection = fieldsDate, limit = dataLimit)

    json_projects = []
    for project in projects:
        json_projects.append(project)

    json_projects = json.dumps(json_projects, default = json_util.default)
    connection.close
    return json_projects

@app.route("/db/pubData")
def db_pubData():
    connection = MongoClient(mongoHost, mongoPort)
    collection = connection[dbsName][ledgerCollectionName]
    projects = collection.find(projection = fieldsPub, limit = dataLimit)

    json_projects = []
    for project in projects:
        json_projects.append(project)

    json_projects = json.dumps(json_projects, default = json_util.default)
    connection.close
    return json_projects

@app.route("/db/langData")
def db_langData():
        connection = MongoClient(mongoHost, mongoPort)
        collection = connection[dbsName][ledgerCollectionName]
        projects = collection.find(projection = fieldsLanguage, limit = dataLimit)

        json_projects = []
        for project in projects:
            json_projects.append(project)

        json_projects = json.dumps(json_projects, default = json_util.default)
        connection.close
        return json_projects

@app.route("/db/fireData")
def db_fireData():
        connection = MongoClient(mongoHost, mongoPort)
        collection = connection[dbsName][ledgerCollectionName]
        projects = collection.find(projection = fieldsFire, limit = dataLimit)

        json_projects = []
        for project in projects:
            json_projects.append(project)

        json_projects = json.dumps(json_projects, default = json_util.default)
        connection.close
        return json_projects

#-----------------------Occupation Chart----------------------- 

@app.route("/occupationChart")
def OccupationCharts():
    return render_template("occupationChart.html")

@app.route("/db/occupationData")
def db_occupationData():
    connection = MongoClient(mongoHost, mongoPort)
    collection = connection[dbsName][ledgerTo1968CollectionName]
    projects = collection.find(projection = fieldsOccupation, limit= 21000)

    json_projects = []
    for project in projects:
        json_projects.append(project)

    json_projects = json.dumps(json_projects, default = json_util.default)
    connection.close
    return json_projects


if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5000,debug=True)