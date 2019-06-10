using WebApi.Models;
using WebApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly ClientService _clientService;

        public ClientsController(ClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpGet]
        public ActionResult<List<Client>> Get() =>
            _clientService.Get();

        [HttpGet("{id:length(24)}", Name = "getClient")]
        public ActionResult<Client> Get(string id)
        {
            var item = _clientService.Get(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        [HttpPost]
        public ActionResult<Client> Create(Client item)
        {
            _clientService.Create(item);
            
            return CreatedAtRoute("getClient", new { id = item.Id.ToString() }, item);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Client itemIn)
        {
            var item = _clientService.Get(id);

            if (item == null)
            {
                return NotFound();
            }

            _clientService.Update(id, itemIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var item = _clientService.Get(id);

            if (item == null)
            {
                return NotFound();
            }

            _clientService.Remove(item.Id);

            return NoContent();
        }
    }
}