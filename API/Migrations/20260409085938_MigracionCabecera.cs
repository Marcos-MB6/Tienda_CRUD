using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class MigracionCabecera : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "VentaCabeceraId",
                table: "Productos",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Ventas_Cabecera",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PrecioTotal = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ventas_Cabecera", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Productos_VentaCabeceraId",
                table: "Productos",
                column: "VentaCabeceraId");

            migrationBuilder.AddForeignKey(
                name: "FK_Productos_Ventas_Cabecera_VentaCabeceraId",
                table: "Productos",
                column: "VentaCabeceraId",
                principalTable: "Ventas_Cabecera",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Productos_Ventas_Cabecera_VentaCabeceraId",
                table: "Productos");

            migrationBuilder.DropTable(
                name: "Ventas_Cabecera");

            migrationBuilder.DropIndex(
                name: "IX_Productos_VentaCabeceraId",
                table: "Productos");

            migrationBuilder.DropColumn(
                name: "VentaCabeceraId",
                table: "Productos");
        }
    }
}
