# Contacts Book

![Alt text](image.png)
Main view

![Alt text](image-1.png)
Creating a contact

![Alt text](image-2.png)
Updating a contact

![Alt text](image-3.png)
Success alert

![Alt text](image-4.png)
Filtering by email

![Alt text](image-5.png)
Spinner while loading data

## Validation

There's frontend and backend validation. Only first name, last name, email, and phone numbers are validated.

## Technologies and frameworks
- Angular 16
- .NET 6
- Bootstrap
- MS SQL Express

## Database

Database: ContactsBook

Backup: `database.sql` file in this repository

User: abcde
Password: AfD*943!

![database diagram](database_diagram.png) 

## Running

Backend:
```
cd ContactsBookApplication.Backend/ContactsBookApplication.Backend

dotnet run
```

Frontend:
```
cd frontend
ng serve -o
```