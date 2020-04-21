:: This file tests what happens when 2 users have the same query.

ECHO OFF

:: First log saves in user1err.txt, second log saves in user2err.txt

curl -v -H "Content-Type: application/json" http://localhost:3001/login/:username=JohnDoe@mymail.sutd.edu.sg -d "{\"username\":\"JohnDoe@mymail.sutd.edu.sg\",\"password\":\"IAmJohnDoes1!\",\"queryType\":\"General\"}"  > user1.txt 2> user1err.txt
curl -v -H "Content-Type: application/json" http://localhost:3001/login/:username=JaneDoe@mymail.sutd.edu.sg -d "{\"username\":\"JaneDoe@mymail.sutd.edu.sg\",\"password\":\"IAmJaneDoes1!\",\"queryType\":\"General\"}"  > user2.txt 2> user2err.txt

:: Catches errors
IF %ERRORLEVEL% NEQ 0 (
  ECHO Error occured.
)


PAUSE