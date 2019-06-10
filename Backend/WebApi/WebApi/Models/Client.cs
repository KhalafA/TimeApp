using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace WebApi.Models
{
    public class Client
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Email")]
        public string Email { get; set; }

        [BsonElement("Address")]
        public string Address { get; set; }

        [BsonElement("LogoUrl")]
        public string LogoUrl { get; set; }

        [BsonElement("Projects")]
        public List<Projects> Projects { get; set; }

    }
}


