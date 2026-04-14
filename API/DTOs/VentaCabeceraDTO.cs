using API.Models;

namespace API.DTOs
{
    public class VentaCabeceraDTO
    {
        public int? Id { get; set; }
        public List<Venta> Ventas { get; set; }
        public int PrecioTotal{get; set;}
    }
}