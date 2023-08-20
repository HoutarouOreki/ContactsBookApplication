using ContactsBookApplication.Backend.Models;

namespace ContactsBookApplication.Backend.Services
{
    public interface IContactService
    {
        IEnumerable<Contact> GetAll();

        Contact? GetById(int id);

        /// <summary>
        ///     Adds a <see cref="Contact"/> to a database and returns true
        ///     if the <paramref name="contact"/> is valid.
        ///     Otherwise returns false.
        /// </summary>
        /// <param name="contact">
        ///     The <see cref="Contact"/> to add. This function will update
        ///     this object's <see cref="Contact.ID"/>.
        /// </param>
        /// <param name="validationErrors">
        ///     If there were any validation errors, this ienumerable
        ///     will contain their messages.
        /// </param>
        /// <returns>
        ///     Whether the contact was added.
        /// </returns>
        bool Add(Contact contact, out IEnumerable<string> validationErrors);

        /// <summary>
        ///     Updates a <see cref="Contact"/> in the database and returns true
        ///     if the <paramref name="contact"/> with given id exists and is valid.
        ///     Otherwise returns false.
        /// </summary>
        /// <param name="contact">
        ///     The <see cref="Contact"/> to update.
        /// </param>
        /// <param name="validationErrors">
        ///     If there were any validation errors, this ienumerable
        ///     will contain their messages.
        /// </param>
        /// <returns>
        ///     Whether the contact was updated.
        /// </returns>
        bool Update(Contact contact, out IEnumerable<string> validationErrors);

        /// <summary>
        ///     Removes a <see cref="Contact"/> with the given
        ///     <paramref name="id"/> from the database if it exists.
        ///     Otherwise does nothing.
        /// </summary>
        void Remove(int id);
    }
}