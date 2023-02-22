# READER-CV


## General definition of the project:

TalanSeeker is a tool for the management and data processing of the company's talents (both hired and in interview process).
The implemented functionality adds a CV (resume) reading system that selects the most relevant data of new candidates and is able to automatically generate standardized CVs to present the available information of each one. 

## Requirements specification:

TalanSeeker is developed with Angular, NodeJS, Express and MongoDB, (MEAN) and complemented with Firebase SDK for user management.
The system will be developed with the same technologies proposed in the TalanSeeker Stack.

## Installation procedures: 

Within the root folder of the project, the installation of the necessary dependencies for the operation of both the front and backend is required. To do this, enter the folder called "backend" and execute the command "npm install" and repeat the same step inside the folder "talanreader-web". This installs all the dependencies for the correct functioning of the module.

## Users
	
This functionality is intended for consultants in the human talent area, who have access to the resumes of new employees joining the company.

## Objectives

## General Objective

Develop an easy-to-use interface to upload and edit resumes according to the standard format and requirements of the company.

## Specific Objectives 

* Facilitate the extraction of relevant information from resumes according to the company's format.
* Automatically and quickly deliver a standardized CV format to present the previously extracted information.
* Develop a functionality of easy integration with the TalanSeeker application.
* Perform the complete documentation of the feature.

## Development procedures:
 
### Tools used:

* Backend: Several libraries were used for the module operation.

* Express: Library used to start the web application.

* Cors: Library used as security protocol for web requests.

* Nodemon: library used for the initialization of the web application from the backend.

* Multer: library used to capture the pdf file sent from frontend

* Pdf-parse: library used to extract information from pdf files. WARNING: this library requires the presence of a pdf file inside a test/data/05-versions-space folder. This file is a requirement for the correct functionality of the library, but it is not part of the project.


For more information refer to the bug documentation:

    https://gitlab.com/autokent/pdf-parse/-/issues/24
    
Library documentation:

    https://www.npmjs.com/package/pdf-parse. 

### Frontend:

Jspdf / jspdf-autotable: library installed on Angularjs, which allows to download a pdf file according to the content represented in the frontend.

## Versions: 

Node: version 14.21.2
Angular CLI: version 15.1.3

## Planning:

* Initially, the functionality of the module was planned and subdivided into the following functions:

* Information extraction: We identify the data type in which we are going to receive the information from the pdf.

* Information processing: We identified different sections within the curriculums, so we started a standardization of the information, initially we put all the information in lowercase and additionally, we eliminated special characters such as accents or umlauts. After this, we proceed to tokenize and search the sections within the information tokens.

* Storage of the information in a .JSON file: after having the information divided into sections, it is stored in a javascript object type data structure, and stored in a .JSON file.

* Presentation of the information to the user for correction: the stored information is presented to the user, in a pre-filled format, so that he/she can modify the information extracted by the application.

* Update of the json file: Finally the corrected data is stored in the .JSON file.

* PDF download of the information: In addition, the user can download a pdf file with the information extracted by the application, as well as the edited information.

## System architecture


The program starts its execution in the index.js file, found in the backend folder.

* Index.js: This starts a web application, it is configured to run on the path http://localhost:3001/api/consultor on port 3001. Additionally, this module imports the 'network.js' module, which contains the request routes.

* components/network.js: This module handles the post request to the /upload endpoint, receives the file sent in the request, sends it to the function that processes the information and finally locally deletes the file.

* components/controller.js: This module makes use of the multer library, in order to receive the file sent from the frontend. The function that receives the file is executed at the moment of making the post request in the /upload endpoint.

* reader/automate.js: This module reads the stored pdf and passes it to the function in charge of processing the information located in reader/process_data.js

* reader/process_data.js: This module contains the instructions for processing the information and is in charge of calling different functions, each one in charge of processing a specific segment of the information. Finally, this module creates a javascript object and stores it in a .JSON file.

Name, phone and email processing - get_personal_data.js.
Academic experience processing - get_academic.js.
Work experience - get_work.js.
Skills - get_skills.js.

* reader/get_personal_data.js: Module in charge of extracting personal data such as the consultant's name, email and cell phone number from the resume.

* reader/get_academic.js: Module in charge of extracting the consultant's academic section or area.

* reader/get_work.js: Module in charge of extracting the consultant's work experience section or area.

* reader/get_skills.js: Module in charge of extracting the skills or abilities that the consultant reflects in his resume.

## Running Backend

    nodemon index.js

## Runing Frontend

Jsonserver

    npm run serverAPI

Angular app

    ng serve

## Authors

* [Paola Suarez](https://github.com/paosua86)

* [David Andres Perez Cruz](https://github.com/davidperez95)

* [Rodrigo Andres Duque Gomez](https://github.com/rodrigoandresd)