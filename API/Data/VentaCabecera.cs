using API.DTOs;

namespace API.Models
{
    public class VentaCabecera
    {
        public int Id { get; set; }
        public List<Venta> Ventas { get; set; }
        public int PrecioTotal{get; set;}
    }
}