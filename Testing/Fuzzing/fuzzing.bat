:: This file tests what happens when fuzzing occur.

ECHO OFF

curl -v -H "Content-Type: application/json" http://localhost:3001/login/zxcvzxcvzxcvzxcvzxcvzxcv -d "{\"username\":\"zxcvzxcvzxcvzxcvzxcvzxcv\",\"password\":\"IAmJohnDoes1!\",\"queryType\":\"General\"}"  > user2.txt 2> user2err.txt

curl -v -H "Content-Type: application/json" http://localhost:3001/login/asdfasdfasdf123534523 -d "{\"username\":\"asdfasdfasdf123534523\",\"password\":\"IAmJohnDoes1!\",\"queryType\":\"General\"}"  > user1.txt 2> user1err.txt



:: Catches errors
IF %ERRORLEVEL% NEQ 0 (
  ECHO Error occured.
)


PAUSE