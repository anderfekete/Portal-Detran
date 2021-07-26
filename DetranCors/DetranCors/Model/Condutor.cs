using DetranCors.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DetranCors.Data
{
    public class Condutor
    {

        [Key]
        public int Id { get; set; }
        public string Nome { get; set; }
        public string CPF { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public string CNH { get; set; }
        public DateTime Nascimento { get; set; }

        public ICollection<Venda> Venda{ get; set; }
    }
}
