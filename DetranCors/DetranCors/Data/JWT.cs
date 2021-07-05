using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DetranCors.Data
{
    public class JWT
    {
        public string Secret { get; set; }
        public int ExpiracaoHoras { get; set; }
        public string Emissor { get; set; }
        public string ValidoEm { get; set; }
    }
}
