using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class MigracionPedidos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Productos_Ventas_Cabecera_VentaCabeceraId",
                table: "Productos");

            migrationBuilder.DropIndex(
                name: "IX_Productos_VentaCabeceraId",
                table: "Productos");

            migrationBuilder.DropColumn(
                name: "VentaCabeceraId",
                table: "Productos");

            migrationBuilder.AddColumn<int>(
                name: "VentaCabeceraId",
                table: "Ventas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Ventas_VentaCabeceraId",
                table: "Ventas",
                column: "VentaCabeceraId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ventas_Ventas_Cabecera_VentaCabeceraId",
                table: "Ventas",
                column: "VentaCabeceraId",
                principalTable: "Ventas_Cabecera",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ventas_Ventas_Cabecera_VentaCabeceraId",
                table: "Ventas");

            migrationBuilder.DropIndex(
                name: "IX_Ventas_VentaCabeceraId",
                table: "Ventas");

            migrationBuilder.DropColumn(
                name: "VentaCabeceraId",
                table: "Ventas");

            migrationBuilder.AddColumn<int>(
                name: "VentaCabeceraId",
                table: "Productos",
                type: "int",
                nullable: true);

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
    }
}
