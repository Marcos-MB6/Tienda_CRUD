using System.Drawing;
using System.Text.Json.Serialization;

namespace API.Models
{
    public class Producto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int Precio { get; set; }
        public string Marca { get; set; }
        public string Tipo { get; set; }
        public string Imagen {get; set;}
    }
}