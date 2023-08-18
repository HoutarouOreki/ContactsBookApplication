using ContactsBookApplication.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace ContactsBookApplication.Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactsController : Controller
    {
        private readonly ApplicationDbContext context;

        public ContactsController(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();
            this.context = context;
        }

        [HttpGet("")]
        public ActionResult Index()
        {
            return Json(context.Contacts.ToList());
        }

        [HttpPost("")]
        public ActionResult Create(Contact contact)
        {
            var validationErrors = Validate(contact);
            if (validationErrors.Count > 0)
            {
                return BadRequest(validationErrors);
            }

            var entityEntry = context.Contacts.Add(contact);
            context.SaveChanges();
            return Ok(entityEntry.Entity);
        }

        [HttpPut("")]
        public ActionResult Edit(Contact contact)
        {
            var entityEntry = context.Contacts.Find(contact.ID);
            if (entityEntry == null)
            {
                return NotFound();
            }

            var validationErrors = Validate(contact);
            if (validationErrors.Count > 0)
            {
                return BadRequest(validationErrors);
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
            return Ok(entityEntry);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            var entity = context.Contacts.Find(id);
            if (entity != null)
            {
                context.Contacts.Remove(entity);
                context.SaveChanges();
                return Ok();
            }
            else
            {
                return NotFound();
            }
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
            if (!Regex.IsMatch(contact.Email, @"^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"))
            {
                errors.Add("Email is invalid");
            }
            if (!Regex.IsMatch(contact.PhoneNumber, @"^\d{9}$"))
            {
                errors.Add("Phone number must have 9 digits");
            }
            return errors;
        }
    }
}
