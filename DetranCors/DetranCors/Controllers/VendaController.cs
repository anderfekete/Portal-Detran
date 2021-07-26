using DetranCors.Data;
using DetranCors.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DetranCors.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendaController : Controller
    {
        private readonly DataBaseContext _context;

        public VendaController(DataBaseContext context)
        {
            _context = context;
        }
       
        [HttpPost]
        [Authorize]
        [Route("postVenda")]
        public async Task<IActionResult> postVenda([FromBody] Venda venda)
        {
            try
            {
                ObjectReturn objectReturn = new ObjectReturn();
                _context.Venda.Add(venda);
                await _context.SaveChangesAsync();

                objectReturn.status = "success";
                objectReturn.content = "Venda registrada com sucesso!";
                objectReturn.id = venda.Id;


                return Ok(objectReturn);
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
