using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DetranCors.Data
{
    public class tbl_condutor
    {
        [Key]
        public int con_n_codigo { get; set; }
        public string con_c_nome { get; set; }
        public string con_c_cpf { get; set; }
        public string con_c_telefone { get; set; }
        public string con_c_email { get; set; }
        public string con_c_cnh { get; set; }
        public DateTime con_d_nascimento { get; set; }
    }
}
