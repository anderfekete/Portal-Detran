using DetranCors.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DetranCors.Data
{
    public class Veiculo
    {
        [Key]
        public int Id { get; set; }
        public string Modelo { get; set; }
        public string Marca { get; set; }
        public string Placa { get; set; }
        public string Cor { get; set; }
        public string AnoFabricacao { get; set; }

        public virtual ICollection<Venda> Venda { get; set; }

    }
}
