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
    public class VeiculoController : Controller
    {
        private readonly DataBaseContext _context;

        public VeiculoController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        [Route("getVeiculos")]
        public async Task<IEnumerable<tbl_veiculo>> GetVeiculos()
        {
            return await _context.tbl_veiculo.ToListAsync();
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<tbl_veiculo>> GetVeiculo(int id)
        {
            var veiculo = await _context.tbl_veiculo.FindAsync(id);

            if (veiculo == null)
            {
                return NotFound();
            }

            return veiculo;
        }
        [HttpGet]
        [Authorize]
        [Route("buscar")]
        public async Task<ActionResult<tbl_veiculo>>BuscarVeiculo(string placa)
        {
            var veiculo = await _context.tbl_veiculo.Where(x=> x.vei_c_placa == placa).FirstOrDefaultAsync();

            if (veiculo == null)
            {
                return NotFound();
            }

            return veiculo;
        }

        [HttpPost]
        [Authorize]
        [Route("postVeiculo")]
        public async Task<IActionResult> PostVeiculo([FromBody] tbl_veiculo veiculo)
        {
            ObjectReturn objectReturn = new ObjectReturn();
            _context.tbl_veiculo.Add(veiculo);
            await _context.SaveChangesAsync();

            objectReturn.status = "success";
            objectReturn.content = "Veículo cadastrado com sucesso!";
            objectReturn.id = veiculo.vei_n_codigo;


            return Ok(objectReturn);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<tbl_veiculo>> DeleteVeiculo(int id)
        {
            ObjectReturn objectReturn = new ObjectReturn();
            var veiculo = await _context.tbl_veiculo.FindAsync(id);
            if (veiculo == null)
            {
                return NotFound();
            }

            _context.tbl_veiculo.Remove(veiculo);
            await _context.SaveChangesAsync();
            objectReturn.status = "success";
            return Ok(objectReturn);
        }
    }
}
