using DetranCors.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DetranCors.Model
{
    public class Venda
    {
        [Key]
        public int Id { get; set; }
        public int IdVeiculo { get; set; }
        public int IdCondutor { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime Data { get; set; }

        [ForeignKey("IdVeiculo")]
        public virtual Veiculo tbl_veiculo { get; set; }

        [ForeignKey("IdCondutor")]
        public virtual Condutor tbl_condutor { get; set; }

    }
}

