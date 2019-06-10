using WebApi.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace WebApi.Services
{
    public class ClientService
    {
        private readonly IMongoCollection<Client> _clients;

        public ClientService(IDbSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _clients = database.GetCollection<Client>(settings.ClientCollectionName);
        }

        public List<Client> Get() =>
            _clients.Find(item => true).ToList();

        public Client Get(string id) =>
            _clients.Find<Client>(item => item.Id == id).FirstOrDefault();

        public Client Create(Client item)
        {
            _clients.InsertOne(item);
            return item;
        }

        public void Update(string id, Client itemIn) =>
            _clients.ReplaceOne(item => item.Id == id, itemIn);

        public void Remove(Client itemIn) =>
            _clients.DeleteOne(item => item.Id == itemIn.Id);

        public void Remove(string id) =>
            _clients.DeleteOne(item => item.Id == id);
    }
}