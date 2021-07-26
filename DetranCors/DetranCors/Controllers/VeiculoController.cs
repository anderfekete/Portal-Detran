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
        public async Task<IEnumerable<Veiculo>> GetVeiculos()
        {
            return await _context.Veiculo.ToListAsync();
        }

        [HttpGet]
        [Route("getPorCondutor")]
        public async Task<IEnumerable<Veiculo>> getPorCondutor(int id)
        {

            var veiculos = (from venda in _context.Venda
                              join veiculo in _context.Veiculo on venda.IdVeiculo equals veiculo.Id
                              where venda.IdCondutor == id
                              select veiculo).ToList();

            return veiculos;
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Veiculo>> GetVeiculo(int id)
        {
            var veiculo = await _context.Veiculo.FindAsync(id);

            if (veiculo == null)
            {
                return NotFound();
            }

            return veiculo;
        }

        [HttpGet]
        [Authorize]
        [Route("buscar")]
        public async Task<ActionResult<Veiculo>>BuscarVeiculo(string placa)
        {
            var veiculo = await _context.Veiculo.Where(x=> x.Placa == placa).FirstOrDefaultAsync();

            if (veiculo == null)
            {
                return NotFound();
            }

            return veiculo;
        }

        [HttpPost]
        [Authorize]
        [Route("postVeiculo")]
        public async Task<IActionResult> PostVeiculo([FromBody] Veiculo veiculo)
        {
            ObjectReturn objectReturn = new ObjectReturn();
            _context.Veiculo.Add(veiculo);
            await _context.SaveChangesAsync();

            objectReturn.status = "success";
            objectReturn.content = "Veículo cadastrado com sucesso!";
            objectReturn.id = veiculo.Id;


            return Ok(objectReturn);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Veiculo>> DeleteVeiculo(int id)
        {
            ObjectReturn objectReturn = new ObjectReturn();
            var veiculo = await _context.Veiculo.FindAsync(id);
            if (veiculo == null)
            {
                return NotFound();
            }

            _context.Veiculo.Remove(veiculo);
            await _context.SaveChangesAsync();
            objectReturn.status = "success";
            return Ok(objectReturn);
        }
    }
}
