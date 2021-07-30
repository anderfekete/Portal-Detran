using DetranCors.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DetranCors.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly JWT _appSettings;
        private readonly DataBaseContext _database;

        public UsuarioController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager, IOptions<JWT> appSettings)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _appSettings = appSettings.Value;
        }

        [HttpPost]
        [Route("signup")]
        public async Task<IActionResult> PostUsuario([FromBody] Usuario usuario)
        {

            if (string.IsNullOrEmpty(usuario.usu_c_nome) || string.IsNullOrEmpty(usuario.usu_c_senha)) return BadRequest();

            var user = new IdentityUser
            {
                UserName = usuario.usu_c_email,
                Email = usuario.usu_c_email,
                EmailConfirmed = true
            };

            try
            {
                var result = await _userManager.CreateAsync(user, usuario.usu_c_senha);

                if (!result.Succeeded) return BadRequest(result.Errors);

                await _signInManager.SignInAsync(user, false);

                return Ok();
            }

            catch
            {
                return BadRequest("Error");
            }
        }

        [HttpPost]
        [Route("signin")]
        public async Task<IActionResult> Login([FromBody] Usuario usuario)
        {
            ObjectReturn objectReturn = new ObjectReturn();
            try
            {
                if (string.IsNullOrEmpty(usuario.usu_c_email) || string.IsNullOrEmpty(usuario.usu_c_email)) return BadRequest("Usuário ou senha em branco!");
                var result = await _signInManager.PasswordSignInAsync(usuario.usu_c_email, usuario.usu_c_senha, false, true);

                if (result.Succeeded)
                {
                    return Ok(await GerarJwt(usuario.usu_c_email));
                }

                return NotFound("Usuario ou senha inválidos");
            }
            catch (Exception ex)
            {
                objectReturn.content = ex.Message;
                return BadRequest(objectReturn);
            }

        }

        private async Task<string> GerarJwt(string email)
        {
            try
            {
                var userData = await _userManager.FindByNameAsync(email); //Encontra o user pelo email, na tabela aspnetUsers
                                                                          //-----------------------JWT---------------------------------------------------//
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret); //gera um código com base na tabela ASCII 
                var exp = DateTime.UtcNow.AddHours(_appSettings.ExpiracaoHoras);
                var now = DateTime.Now;
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Issuer = _appSettings.Emissor,
                    Audience = _appSettings.ValidoEm,
                    Expires = DateTime.UtcNow.AddHours(_appSettings.ExpiracaoHoras), //tempo em horas que faz o token deixar de ser útil
                    NotBefore = DateTime.Now,

                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)//chave de segurança
                };
                //esse é um objeto que é utilizado para a criação do token propriamente dito. Objeto que cria objeto.
                var tokenHandler = new JwtSecurityTokenHandler();

                //Criação do token, através do tokenHandler, ocorre, utulizando o que foi espeficicado no tokenDescriptor
                return tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

    }
}
