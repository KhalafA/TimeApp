using System.Collections.Generic;
using WebApi.Models;

namespace WebApi.Services
{
    public interface IWebApiService
    {
        List<Client> Get();

        Client Get(string id);

        Client Create(Client item);

        void Update(string id, Client itemIn);

        void Remove(Client itemIn);

        void Remove(string id);

        // --------------------------- Project --------------------------- \\

        List<Project> GetProjects(string id);

        Project GetProject(string clientId, string projectId);

        Client CreateProject(string clientId, Project item);

        void UpdateProject(string clientId,string projectId, Client itemIn);

        void RemoveProject(string clientId, Project item);

        void RemoveProject(string clientId, string projectId);

        // --------------------------- Entry --------------------------- \\
        List<Entry> GetEntries(string clientId, string projectId);

        Entry GetEntry(string clientId, string projectId, string entryId);

        Client CreateEntry(string clientId, string projectId, Entry item);

        void UpdateEntry(string clientId, string projectId, string entryId, Entry itemIn);

        void RemoveEntry(string clientId, string projectId, Entry item);

        void RemoveEntry(string clientId, string projectId, string entryId);

        // --------------------------- Invoice --------------------------- \\
        Invoice GetInvoice(string clientId, string projectId);

        Client CreateInvoice(string clientId, string projectId, Invoice item);

        void UpdateInvoice(string clientId, string projectId, Invoice itemIn);

        void RemoveInvoice(string clientId, string projectId, Invoice item);

        void RemoveInvoice(string clientId, string projectId);
    }
}
