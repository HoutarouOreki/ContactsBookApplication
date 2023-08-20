using System.Text.RegularExpressions;
using ContactsBookApplication.Backend.Models;

namespace ContactsBookApplication.Backend.Services
{
    public class ContactService : IContactService
    {
        private readonly ApplicationDbContext context;

        public ContactService(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();
            this.context = context;
        }

        public bool Add(Contact contact, out IEnumerable<string> validationErrors)
        {
            validationErrors = Validate(contact);
            if (validationErrors.Any())
            {
                return false;
            }
            context.Add(contact);
            context.SaveChanges();
            return true;
        }

        public IEnumerable<Contact> GetAll()
        {
            return context.Contacts.ToList();
        }

        public Contact? GetById(int id)
        {
            return context.Contacts.Find(id);
        }

        public void Remove(int id)
        {
            var contact = context.Contacts.Find(id);
            if (contact is not null)
            {
                context.Contacts.Remove(contact);
                context.SaveChanges();
            }
        }

        public bool Update(Contact contact, out IEnumerable<string> validationErrors)
        {
            var entityEntry = context.Contacts.Find(contact.ID);
            if (entityEntry is null)
            {
                validationErrors = new List<string> { $"A {nameof(Contact)} with id {contact.ID} doesn't exist." };
                return false;
            }

            validationErrors = Validate(contact);
            if (validationErrors.Any())
            {
                return false;
            }

            entityEntry.Address = contact.Address;
            entityEntry.City = contact.City;
            entityEntry.Email = contact.Email;
            entityEntry.FirstName = contact.FirstName;
            entityEntry.LastName = contact.LastName;
            entityEntry.PhoneNumber = contact.PhoneNumber;
            entityEntry.ZipCode = contact.ZipCode;

            context.Update(entityEntry);
            context.SaveChanges();
            return true;
        }

        private static List<string> Validate(Contact contact)
        {
            var errors = new List<string>();

            if (string.IsNullOrWhiteSpace(contact.FirstName) || contact.FirstName.Trim().Length < 2)
            {
                errors.Add("First name must have at least 2 characters");
            }
            if (string.IsNullOrWhiteSpace(contact.LastName) || contact.LastName.Trim().Length < 2)
            {
                errors.Add("Last name must have at least 2 characters");
            }
            if (!Regex.IsMatch(contact.Email.ToLower(), @"^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"))
            {
                errors.Add("Email is invalid");
            }
            if (contact.PhoneNumber.Length > 0 && !Regex.IsMatch(contact.PhoneNumber, @"^\d{9}$"))
            {
                errors.Add("Phone number must have 9 digits or be blank");
            }
            return errors;
        }
    }
}