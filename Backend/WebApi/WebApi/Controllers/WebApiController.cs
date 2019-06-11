using WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly IWebApiService _webApiService;

        public ClientsController(IWebApiService webApiService)
        {
            _webApiService = webApiService;
        }


        [HttpGet]
        public ActionResult<List<Client>> Get() =>
            _webApiService.Get();

        [HttpGet("{id:length(24)}", Name = "getClient")]
        public ActionResult<Client> Get(string id)
        {
            var item = _webApiService.Get(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        [HttpPost]
        public ActionResult<Client> Create(Client item)
        {
            _webApiService.Create(item);
            
            return CreatedAtRoute("getClient", new { id = item.Id.ToString() }, item);
        }


        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Client itemIn)
        {
            var item = _webApiService.Get(id);

            if (item == null)
            {
                return NotFound();
            }

            _webApiService.Update(id, itemIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var item = _webApiService.Get(id);

            if (item == null)
            {
                return NotFound();
            }

            _webApiService.Remove(item.Id);

            return NoContent();
        }

        // --------------------------- Project --------------------------- \\
        [HttpGet("{id:length(24)}/projects", Name = "getProject")]
        public ActionResult<List<Project>> GetProjects(string id)
        {
            var item = _webApiService.GetProjects(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        [HttpGet("{clientId:length(24)}/projects/{projectId:length(24)}")]
        public ActionResult<Project> GetProject(string clientId, string projectId)
        {
            var item = _webApiService.GetProject(clientId, projectId);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        [HttpPost("{clientID:length(24)}")]
        public ActionResult<Project> CreateProject(string clientID, Project itemIn)
        {

            Client item = _webApiService.Get(clientID);

            if (item == null)
            {
                return NotFound();
            }

            _webApiService.CreateProject(clientID, itemIn);

            

            return CreatedAtRoute("getProject", new { id = itemIn.Id.ToString() }, itemIn);

        }


        // --------------------------- Entry --------------------------- \\
        [HttpGet("{clientId:length(24)}/projects/{projectId:length(24)}/entries", Name = "getEntry")]
        public ActionResult<List<Entry>> GetEntries(string clientId, string projectId)
        {
            var item = _webApiService.GetEntries(clientId, projectId);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        [HttpGet("{clientId:length(24)}/projects/{projectId:length(24)}/entries/{entryId:length(24)}")]
        public ActionResult<Entry> GetEntry(string clientId, string projectId, string entryId)
        {
            var item = _webApiService.GetEntry(clientId, projectId, entryId);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        [HttpPost("{clientId:length(24)}/projects/{projectId:length(24)}")]
        public ActionResult<Entry> CreateEntry(string clientID, string projectId, Entry itemIn)
        {

            Project item = _webApiService.GetProject(clientID, projectId);

            if (item == null)
            {
                return NotFound();
            }

            _webApiService.CreateEntry(clientID, projectId, itemIn);



            return CreatedAtRoute("getEntry", new { id = itemIn.Id.ToString() }, itemIn);

        }

        // --------------------------- Invoice --------------------------- \\
        [HttpGet("{clientId:length(24)}/projects/{projectId:length(24)}/invoice")]
        public ActionResult<Invoice> GetInvoice(string clientId, string projectId)
        {
            var item = _webApiService.GetInvoice(clientId, projectId);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        [HttpPost("{clientId:length(24)}/projects/{projectId:length(24)}/create-invoice")]
        public ActionResult<Invoice> CreateInvoice(string clientID, string projectId, Invoice itemIn)
        {

            Project item = _webApiService.GetProject(clientID, projectId);

            if (item == null)
            {
                return NotFound();
            }

            _webApiService.CreateInvoice(clientID, projectId, itemIn);


            return CreatedAtRoute("getInvoice", new { id = itemIn.Id.ToString() }, itemIn);

        }


    }
}