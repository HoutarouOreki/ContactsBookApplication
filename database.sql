-- ContactsBook.dbo.Contact definition

-- Drop table

-- DROP TABLE ContactsBook.dbo.Contact;

CREATE TABLE ContactsBook.dbo.Contact (
	ID int IDENTITY(1,1) NOT NULL,
	FirstName nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	LastName nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Email nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	PhoneNumber nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Address nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	City nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	ZipCode nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK_Contact PRIMARY KEY (ID)
);

INSERT INTO ContactsBook.dbo.Contact (FirstName,LastName,Email,PhoneNumber,Address,City,ZipCode) VALUES
	 (N'aaaaa',N'string',N'string@12345.com',N'123456789',N'string',N'string',N'string'),
	 (N'string',N'hhhh',N'string@hh.com',N'123456789',N'string',N'string',N'string'),
	 (N'string',N'string',N'string@hh.com',N'123456789',N'string',N'string',N'string'),
	 (N'string',N'string',N'string@hh.com',N'123456789',N'string',N'string',N'string'),
	 (N'string',N'string',N'string@hh.com',N'123456789',N'string',N'string',N'string'),
	 (N'string',N'string',N'string@hh.com',N'123456789',N'string',N'string',N'string'),
	 (N'string',N'string',N'string@hh.com',N'123456789',N'string',N'string',N'string'),
	 (N'string',N'string',N'string@hh.com',N'123456789',N'string',N'string',N'string'),
	 (N'string',N'string',N'string@hh.com',N'123456789',N'string',N'string',N'string'),
	 (N'string',N'string',N'string@hh.com',N'123456789',N'string',N'string',N'string');
INSERT INTO ContactsBook.dbo.Contact (FirstName,LastName,Email,PhoneNumber,Address,City,ZipCode) VALUES
	 (N'string',N'string',N'string@hh.com',N'123456789',N'string',N'string',N'string'),
	 (N'string',N'string',N'string@hh.com',N'123456789',N'string',N'string',N'string'),
	 (N'string',N'string',N'string@hh.com',N'123456789',N'string',N'string',N'string'),
	 (N'string',N'string',N'string@hh.com',N'123456789',N'string',N'string',N'string'),
	 (N'string',N'string',N'string@hh.com',N'123456789',N'string',N'string',N'string'),
	 (N'string',N'string',N'string@hh.com',N'123456789',N'string',N'string',N'string'),
	 (N'string',N'string',N'string@hh.com',N'123456789',N'string',N'string',N'string'),
	 (N'string',N'string',N'string@hh.com',N'123456789',N'string',N'string',N'string'),
	 (N'dsadas',N'ddsa',N'dsaas@dsa.com',N'212121212',N'',N'',N''),
	 (N'aaaa',N'aaaa',N'aa@aa.com',N'111111111',N'',N'',N'');
INSERT INTO ContactsBook.dbo.Contact (FirstName,LastName,Email,PhoneNumber,Address,City,ZipCode) VALUES
	 (N'aaa',N'aaaa',N'aa@aa.com',N'111111111',N'',N'',N''),
	 (N'aa',N'aa',N'aaa@gmail.com',N'111111111',N'',N'',N''),
	 (N'aaaaa',N'aaaaaa',N'aaa@gmail.com',N'111111111',N'',N'',N''),
	 (N'adasd',N'dsaasd',N'aaa@gmail.com',N'111111111',N'',N'',N''),
	 (N'aaa',N'aa',N'aaa@gmail.com',N'111111111',N'',N'',N''),
	 (N'bbb',N'bbb',N'aaa@gmail.com',N'111111111',N'',N'',N''),
	 (N'aa',N'aa',N'aaa@gmail.com',N'111111111',N'',N'',N''),
	 (N'aaa',N'aaaa',N'das@fase.com',N'111111111',N'',N'',N''),
	 (N'asdsa',N'asddasd',N'dsa@sdsa.com',N'111111111',N'',N'',N''),
	 (N'cccc',N'cccc',N'aaa@gmail.com',N'111111111',N'',N'',N'');
INSERT INTO ContactsBook.dbo.Contact (FirstName,LastName,Email,PhoneNumber,Address,City,ZipCode) VALUES
	 (N'dsdsdsd',N'dsdhhhhh',N'dsaas@dsa.com',N'111111111',N'',N'',N'aads');
