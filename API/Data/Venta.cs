using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Venta
    {
        public int Id { get; set; }
        public int Cantidad { get; set; }
        public int DineroTotal { get; set; }

        [ForeignKey("Producto")]
        public int ProductoId { get; set; }
        public Producto? Producto { get; set; }

        [ForeignKey("VentaCabecera")]
        public int VentaCabeceraId { get; set; }
        public VentaCabecera? VentaCabecera { get; set; }

    }
}