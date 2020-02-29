CREATE TABLE `USER` (
	ID varchar(255),
    UserName varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE TASK (
	ID varchar(255),
    TaskName varchar(1024) NOT NULL,
    TaskContainerId varchar(255) NOT NULL,
    UserId varchar(255),
    PRIMARY KEY (ID),
    FOREIGN KEY (UserId) REFERENCES USER(ID)
);
