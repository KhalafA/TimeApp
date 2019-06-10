using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebApi.Models
{
    public class Client
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Name")]
        public string ClientName { get; set; }

        [BsonElement("Email")]
        public string Email { get; set; }

        [BsonElement("Address")]
        public string Address { get; set; }

        [BsonElement("Logo")]
        public string LogoUrl { get; set; }

    }
}


