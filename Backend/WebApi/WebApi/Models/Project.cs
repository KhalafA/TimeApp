using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Project
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Title")]
        public string Title { get; set; }

        [BsonElement("BaseRate")]
        public decimal BaseRate { get; set; }

        [BsonElement("isActive")]
        public bool IsActive { get; set; }

        [BsonElement("Invoices")]
        public string Invoices { get; set; }

        [BsonElement("Entries")]
        public string Entries { get; set; }
    }
}
