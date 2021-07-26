using DetranCors.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DetranCors.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CondutorController : Controller
    {
        private readonly DataBaseContext _context;

        public CondutorController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        [Route("getCondutores")] 
        public async Task<IEnumerable<Condutor>> GetCondutores()
        {
            return await _context.Condutor.ToListAsync();
        }

        [HttpGet]
        [Route("getPorVeiculo")]
        public async Task<IEnumerable<Condutor>> getPorVeiculo(int id)
        {

            var condutores = (from venda in _context.Venda
                              join condutor in _context.Condutor on venda.IdCondutor equals condutor.Id
                              where venda.IdVeiculo == id
                              select condutor).ToList();

            return condutores;
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Condutor>> GetCondutor(int id)
        {
            var condutor = await _context.Condutor.FindAsync(id);

            if (condutor == null)
            {
                return NotFound();
            }

            return condutor;
        }

        [HttpGet]
        [Authorize]
        [Route("buscar")]
        public async Task<ActionResult<Condutor>> BuscarCondutor(string cpf)
        {
            var condutor = await _context.Condutor.Where(x => x.CPF == cpf).FirstOrDefaultAsync();

            if (condutor == null)
            {
                return NotFound();
            }

            return condutor;
        }

        [HttpPost]
        [Authorize]
        [Route("postCondutor")] //pms/auth/signup
        public async Task<IActionResult> PostCondutor([FromBody] Condutor condutor)
        {
            ObjectReturn objectReturn = new ObjectReturn();

            if (condutor.Id == 0)
            {
                _context.Condutor.Add(condutor);
                await _context.SaveChangesAsync();
                objectReturn.content = "Condutor registrado com sucesso!";

            }
            else
            {
                _context.Entry(condutor).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                objectReturn.content = "Condutor atualizado com sucesso!";
            }


            objectReturn.status = "success";
            objectReturn.id = condutor.Id;

            return Ok(objectReturn);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Condutor>> DeleteCondutor(int id)
        {
            ObjectReturn objectReturn = new ObjectReturn();
            var condutor = await _context.Condutor.FindAsync(id);
            if (condutor == null)
            {
                return NotFound();
            }

            _context.Condutor.Remove(condutor);
            await _context.SaveChangesAsync();
            objectReturn.status = "success";
            return Ok(objectReturn);
        }
    }
}
