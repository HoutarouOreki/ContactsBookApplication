using ContactsBookApplication.Backend.Models;
using ContactsBookApplication.Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace ContactsBookApplication.Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactsController : Controller
    {
        private readonly IContactService service;

        public ContactsController(IContactService service)
        {
            this.service = service;
        }

        [HttpGet("")]
        public ActionResult<ContactsResponse> Get([FromQuery(Name = "filter")] string? _filter, [FromQuery] int? pageNumber, [FromQuery] int? pageSize)
        {
            var filter = (_filter ?? "").Trim().ToLower();

            var contactsQueryable = service.GetAll().Where(contact => contact.Email.ToLower().Contains(filter));
            var totalMatchingFilter = contactsQueryable.Count();

            if (pageNumber.HasValue && pageSize.HasValue)
            {
                var start = (pageNumber * pageSize - pageSize).Value;
                contactsQueryable = contactsQueryable.Skip(start).Take(pageSize.Value);
            }

            var response = new ContactsResponse(contactsQueryable, totalMatchingFilter, pageNumber, pageSize);

            return Json(response);
        }

        [HttpPost("")]
        public ActionResult Create(Contact contact)
        {
            if (!service.Add(contact, out var validationErrors))
            {
                return BadRequest(validationErrors);
            }

            return Ok(contact);
        }

        [HttpPut("")]
        public ActionResult Edit(Contact contact)
        {
            if (!service.Update(contact, out var validationErrors))
            {
                return BadRequest(validationErrors);
            }

            return Ok(contact);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            var entity = service.GetById(id);
            if (entity is null)
            {
                return NotFound();
            }

            service.Remove(id);

            return Ok();
        }
    }
}
