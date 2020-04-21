:: This file tests what happens when user logs out.

ECHO OFF

curl -v -H "Content-Type: application/json" http://localhost:3001/signout/:username=JohnDoe@mymail.sutd.edu.sg -d "{\"username\":\"JohnDoe@mymail.sutd.edu.sg\",\"password\":\"IAmJohnDoes1!\",\"queryType\":\"General\"}"  > user1.txt 2> user1err.txt


:: Catches errors
IF %ERRORLEVEL% NEQ 0 (
  ECHO Error occured.
)


PAUSE