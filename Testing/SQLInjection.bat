:: This file tests what happens when SQL Injection attacks occur.

ECHO OFF

curl -v -H "Content-Type: application/json" http://localhost:3001/login/abcOR1=1 -d "{\"username\":\"abcOR1=1\",\"password\":\"IAmJohnDoes1!\",\"queryType\":\"General\"}"  > user2.txt 2> user2err.txt

curl -v -H "Content-Type: application/json" http://localhost:3001/login/101OR1=1 -d "{\"username\":\"101OR1=1\",\"password\":\"IAmJohnDoes1!\",\"queryType\":\"General\"}"  > user1.txt 2> user1err.txt


:: Catches errors
IF %ERRORLEVEL% NEQ 0 (
  ECHO Error occured.
)


PAUSE