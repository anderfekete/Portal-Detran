using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DetranCors.Migrations
{
    public partial class Veiculo_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Venda_tbl_veiculo_IdVeiculo",
                table: "Venda");

            migrationBuilder.DropTable(
                name: "tbl_veiculo");

            migrationBuilder.CreateTable(
                name: "Veiculo",
                columns: table => new
                {
                    Codigo = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Modelo = table.Column<string>(nullable: true),
                    Marca = table.Column<string>(nullable: true),
                    Placa = table.Column<string>(nullable: true),
                    Cor = table.Column<string>(nullable: true),
                    AnoFabricacao = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Veiculo", x => x.Codigo);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Venda_Veiculo_IdVeiculo",
                table: "Venda",
                column: "IdVeiculo",
                principalTable: "Veiculo",
                principalColumn: "Codigo",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Venda_Veiculo_IdVeiculo",
                table: "Venda");

            migrationBuilder.DropTable(
                name: "Veiculo");

            migrationBuilder.CreateTable(
                name: "tbl_veiculo",
                columns: table => new
                {
                    vei_n_codigo = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    vei_c_anoFabricacao = table.Column<string>(nullable: true),
                    vei_c_cor = table.Column<string>(nullable: true),
                    vei_c_marca = table.Column<string>(nullable: true),
                    vei_c_modelo = table.Column<string>(nullable: true),
                    vei_c_placa = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_veiculo", x => x.vei_n_codigo);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Venda_tbl_veiculo_IdVeiculo",
                table: "Venda",
                column: "IdVeiculo",
                principalTable: "tbl_veiculo",
                principalColumn: "vei_n_codigo",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
