import random
import requests
import string

length = random.randint(1, 20)

def get_random_alphaNumeric_string(length=8):    
    lettersAndDigits = string.ascii_letters + string.digits
    return ''.join((random.choice(lettersAndDigits) for i in range(length)))

for x in range(15):
    a = get_random_alphaNumeric_string(length)

    url = "http://localhost:3001/login/" + a

    r = requests.post(url, data={'username':a})
