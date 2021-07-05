using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DetranCors.Data
{
    public class tbl_veiculo
    {
        [Key]
        public int vei_n_codigo { get; set; }
        public string vei_c_modelo { get; set; }
        public string vei_c_marca { get; set; }
        public string vei_c_placa { get; set; }
        public string vei_c_cor { get; set; }
        public string vei_c_anoFabricacao { get; set; }
    }
}
