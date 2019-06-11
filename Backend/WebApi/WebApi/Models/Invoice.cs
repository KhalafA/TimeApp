using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Invoice
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Created")]
        public DateTime Created { get; set; }

        [BsonElement("DueDate")]
        public DateTime DueDate { get; set; }

        [BsonElement("PaymentMethod")]
        public string PaymentMethod { get; set; }

        [BsonElement("Discription")]
        public string Discription { get; set; }

        [BsonElement("Note")]
        public string Note { get; set; }
    }
}
