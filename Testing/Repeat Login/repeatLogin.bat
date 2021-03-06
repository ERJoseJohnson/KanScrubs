:: This file tests what happens when a user who is already logged in tries to log in again.

ECHO OFF

:: First log saves in user1err.txt, second log saves in 2user1.txt

curl -v -H "Content-Type: application/json" http://localhost:3001/login/:username=JohnDoe@mymail.sutd.edu.sg -d "{\"username\":\"JohnDoe@mymail.sutd.edu.sg\",\"password\":\"IAmJohnDoes1!\",\"queryType\":\"General\"}"  > user1.txt 2> user1err.txt
curl -v -H "Content-Type: application/json" http://localhost:3001/login/:username=JohnDoe@mymail.sutd.edu.sg -d "{\"username\":\"JohnDoe@mymail.sutd.edu.sg\",\"password\":\"IAmJohnDoes1!\",\"queryType\":\"General\"}"  > 2user1.txt 2> 2user1err.txt

:: Catches errors
IF %ERRORLEVEL% NEQ 0 (
  ECHO Error occured.
)


PAUSE