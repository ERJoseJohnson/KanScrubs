DROP TABLE IF EXISTS users; 
DROP TABLE IF EXISTS activities; 
DROP TABLE IF EXISTS registered; 

CREATE TABLE customers (

    username TEXT  , 
    password TEXT NOT NULL, 
    id TEXT , 
    query_type TEXt , 
    jid TEXT ,  

);

CREATE TABLE agents (
    username TEXT , 
    id TEXT, 
    avail TEXT, 
    jid TEXT, 
    speicialization TEXT,
);


INSERT INTO agents VALUES ("John Doe", "1", "yes", "1@1", "General") ; 
-- INSERT INTO users VALUES ("mihir", "skydiving"); 
-- INSERT INTO activities VALUES (1, 'adventure', DATE(), DATE() , "mihir","nyx",3,NULL,"fun",4) ; 
-- INSERT INTO registered VALUES ("mihir", 1) ; 
-- INSERT INTO registered VALUES ("mihir", 2);
-- INSERT INTO registered values ("josh", 2); 
--SELECT TOP 5 * FROM activites WHERE creator = NULL ; 