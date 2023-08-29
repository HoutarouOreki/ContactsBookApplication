namespace ContactsBookApplication.Backend.Models
{
    public record ContactsResponse(IEnumerable<Contact> Data, int TotalMatchingFilter, int? PageNumber, int? PageSize)
    {
        public ContactsResponse(IEnumerable<Contact> data, int totalMatchingFilter) : this(data, totalMatchingFilter, null, null)
        {
        }
    }
}
