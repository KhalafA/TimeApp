using WebApi.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace WebApi.Services
{
    public class WebApiService : IWebApiService
    {
        private readonly IMongoCollection<Client> _clients;

        public WebApiService(IDbSettings settings)
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

        // --------------------------- Project --------------------------- \\

        public List<Project> GetProjects(string id)
        {
            Client client = _clients.Find<Client>(item => item.Id == id).FirstOrDefault();

            return client.Projects;
        }

        public Project GetProject(string clientId, string projectId)
        {

            List<Project> projects = GetProjects(clientId);

            Project project = null;

            foreach (Project element in projects)
            {
                if (element.Id == projectId)
                {
                    project = element;
                }
            }

            return project; 
        }

        public Client CreateProject(string id, Project item)
        {
            item.Id = MongoDB.Bson.ObjectId.GenerateNewId().ToString();

            var filter = Builders<Client>.Filter.Eq(e => e.Id, id);
            var update = Builders<Client>.Update.Push<Project>(e => e.Projects, item);

            Client client = _clients.FindOneAndUpdate(filter, update);

            return client;
        }

        public void UpdateProject(string clientId, string projectId, Client itemIn)
        {
            throw new System.NotImplementedException();
        }

        public void RemoveProject(string clientId, Project item)
        {
            throw new System.NotImplementedException();
        }

        public void RemoveProject(string clientId, string projectId)
        {
            throw new System.NotImplementedException();
        }

        // --------------------------- Entry --------------------------- \\
        public List<Entry> GetEntries(string clientId, string projectId)
        {
            Project project = GetProject(clientId, projectId);

            return project.Entries;
        }

        public Entry GetEntry(string clientId, string projectId, string entryId)
        {

            List<Entry> Entries = GetEntries(clientId, projectId);

            Entry entry = null;

            foreach (Entry element in Entries)
            {
                if (element.Id == entryId)
                {
                    entry = element;
                }
            }

            return entry;
        }

        public Client CreateEntry(string clientId, string projectId, Entry item)
        {
            item.Id = MongoDB.Bson.ObjectId.GenerateNewId().ToString();

            var filter = Builders<Client>.Filter.And(
             Builders<Client>.Filter.Where(x => x.Id == clientId),
             Builders<Client>.Filter.Eq("Projects.Id", projectId));
            var update = Builders<Client>.Update.Push("Projects.$.Entries", item);

            Client client = _clients.FindOneAndUpdateAsync(filter, update).Result;

            return client;

        }

        public void UpdateEntry(string clientId, string projectId, string entryId, Entry itemIn)
        {
            throw new System.NotImplementedException();
        }

        public void RemoveEntry(string clientId, string projectId, Entry item)
        {
            throw new System.NotImplementedException();
        }

        public void RemoveEntry(string clientId, string projectId, string entryId)
        {
            throw new System.NotImplementedException();
        }


        // --------------------------- Invoice --------------------------- \\
        public Invoice GetInvoice(string clientId, string projectId)
        {

            Project project = GetProject(clientId, projectId);

            return project.Invoice;
        }

        public Client CreateInvoice(string clientId, string projectId, Invoice item)
        {
            item.Id = MongoDB.Bson.ObjectId.GenerateNewId().ToString();

            var filter = Builders<Client>.Filter.And(
             Builders<Client>.Filter.Where(x => x.Id == clientId),
             Builders<Client>.Filter.Eq("Projects.Id", projectId));
            var update = Builders<Client>.Update.Set("Projects.$.Invoice", item).Set("Projects.$.isActive", "false");

            Client client = _clients.FindOneAndUpdateAsync(filter, update).Result;

            return client;
        }

        public void UpdateInvoice(string clientId, string projectId, Invoice itemIn)
        {
            throw new System.NotImplementedException();
        }

        public void RemoveInvoice(string clientId, string projectId, Invoice item)
        {
            throw new System.NotImplementedException();
        }

        public void RemoveInvoice(string clientId, string projectId)
        {
            throw new System.NotImplementedException();
        }
    }
}