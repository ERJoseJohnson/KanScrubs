:: Sentences starting with "::" are comments. "ECHO" is basically print.

:: This file tests what happens when there are more clients (7) than agents (5).
:: LisaDoe and BobDoe should be queued and waiting, so the error will be logged in either 'user6.txt/user7.txt' / 'user6err.txt/user7err.txt' respectively

:: Aesthetic
ECHO OFF

:: Makes a POST request, adding User#1-7 to database
curl -v -H "Content-Type: application/json" http://localhost:3001/login/JohnDoe@mymail.sutd.edu.sg -d "{\"username\":\"JohnDoe@mymail.sutd.edu.sg\",\"password\":\"IAmJohnDoes1!\",\"queryType\":\"General\"}" -H 'Content-Type: application/json' http://localhost:3001/login/:username=JohnDoe@mymail.sutd.edu.sg > user1.txt 2> user1err.txt
curl -v -H "Content-Type: application/json" http://localhost:3001/login/JaneDoe@mymail.sutd.edu.sg -d "{\"username\":\"JaneDoe@mymail.sutd.edu.sg\",\"password\":\"IAmJaneDoes1!\",\"queryType\":\"Mortgage\"}" -H 'Content-Type: application/json' http://localhost:3001/login/:username=JaneDoe@mymail.sutd.edu.sg > user2.txt 2> user2err.txt
curl -v -H "Content-Type: application/json" http://localhost:3001/login/FrankDoe@mymail.sutd.edu.sg -d "{\"username\":\"FrankDoe@mymail.sutd.edu.sg\",\"password\":\"IAmFrankDoes1!\",\"queryType\":\"Insurance\"}" -H 'Content-Type: application/json' http://localhost:3001/login/:username=FrankDoe@mymail.sutd.edu.sg > user3.txt 2> user3err.txt
curl -v -H "Content-Type: application/json" http://localhost:3001/login/JamesDoe@mymail.sutd.edu.sg -d "{\"username\":\"JamesDoe@mymail.sutd.edu.sg\",\"password\":\"IAmJamesDoes1!\",\"queryType\":\"Card\"}" -H 'Content-Type: application/json' http://localhost:3001/login/:username=JamesDoe@mymail.sutd.edu.sg > user4.txt 2> user4err.txt
curl -v -H "Content-Type: application/json" http://localhost:3001/login/MaryDoe@mymail.sutd.edu.sg -d "{\"username\":\"MaryDoe@mymail.sutd.edu.sg\",\"password\":\"IAmMaryDoes1!\",\"queryType\":\"Card\"}" > user5.txt 2> user5err.txt
curl -v -H "Content-Type: application/json" http://localhost:3001/login/LisaDoe@mymail.sutd.edu.sg -d "{\"username\":\"LisaDoe@mymail.sutd.edu.sg\",\"password\":\"IAmLisaDoes1!\",\"queryType\":\"General\"}" > user6.txt 2> user6err.txt
curl -v -H "Content-Type: application/json" http://localhost:3001/login/BobDoe@mymail.sutd.edu.sg -d "{\"username\":\"BobDoe@mymail.sutd.edu.sg\",\"password\":\"IAmBobDoes1!\",\"queryType\":\"Credit\"}" > user7.txt 2> user7err.txt


:: Catches errors
IF %ERRORLEVEL% NEQ 0 (
  ECHO Error occured.
)
PAUSE