using API.Models;

namespace API.DTOs
{
    public class VentaDTO
    {
        public int? Id { get; set; }
        public int Cantidad { get; set; }
        public int DineroTotal { get; set; }
        public int ProductoId { get; set; }
        public int VentaCabeceraId { get; set; }
        public Producto? Producto{get; set;}
    }
}