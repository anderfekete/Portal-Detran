using DetranCors.Data;
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
        [Route("getCondutores")] 
        public async Task<IEnumerable<tbl_condutor>> GetCondutores()
        {
            return await _context.tbl_condutor.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<tbl_condutor>> GetCondutor(int id)
        {
            var condutor = await _context.tbl_condutor.FindAsync(id);

            if (condutor == null)
            {
                return NotFound();
            }

            return condutor;
        }

        [HttpGet]
        [Route("buscar")]
        public async Task<ActionResult<tbl_condutor>> BuscarCondutor(string cpf)
        {
            var condutor = await _context.tbl_condutor.Where(x => x.con_c_cpf == cpf).FirstOrDefaultAsync();

            if (condutor == null)
            {
                return NotFound();
            }

            return condutor;
        }

        [HttpPost]
        [Route("postCondutor")] //pms/auth/signup
        public async Task<IActionResult> PostCondutor([FromBody] tbl_condutor condutor)
        {
            ObjectReturn objectReturn = new ObjectReturn();

            if (condutor.con_n_codigo == 0)
            {
                _context.tbl_condutor.Add(condutor);
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
            objectReturn.id = condutor.con_n_codigo;

            return Ok(objectReturn);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<tbl_condutor>> DeleteCondutor(int id)
        {
            ObjectReturn objectReturn = new ObjectReturn();
            var condutor = await _context.tbl_condutor.FindAsync(id);
            if (condutor == null)
            {
                return NotFound();
            }

            _context.tbl_condutor.Remove(condutor);
            await _context.SaveChangesAsync();
            objectReturn.status = "success";
            return Ok(objectReturn);
        }
    }
}
