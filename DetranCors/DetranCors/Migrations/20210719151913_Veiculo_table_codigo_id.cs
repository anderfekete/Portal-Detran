using Microsoft.EntityFrameworkCore.Migrations;

namespace DetranCors.Migrations
{
    public partial class Veiculo_table_codigo_id : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Codigo",
                table: "Veiculo",
                newName: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Veiculo",
                newName: "Codigo");
        }
    }
}
