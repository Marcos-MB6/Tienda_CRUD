using API.Data;
using API.DTOs;
using API.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
    public class ProductoController : BaseApiController
    {
        public readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ProductoController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<Producto>> AñadirProducto(ProductoDTO productodto)
        {
            Producto producto = _mapper.Map<Producto>(productodto);

            _context.Add(producto);

            if (await _context.SaveChangesAsync() != 0)
            {
                return producto;
            }
            else
            {
                return BadRequest("Ha habido un error.");
            }
        }

        [HttpPut("actualizar/{id}")]
        public async Task<ActionResult<Producto>> ActualizarProducto(int id, ProductoDTO productodto)
        {
            Producto producto = _context.Productos.First(P => P.Id == id);
            List<Venta> ventas = _context.Ventas.Where(V => V.ProductoId == id).ToList();


            Producto productoNuevo = _mapper.Map(productodto, producto);

            foreach (Venta v in ventas)
            {
                v.DineroTotal = v.Cantidad * productoNuevo.Precio;
            }

            _context.Update(productoNuevo);

            if (await _context.SaveChangesAsync() != 0)
            {
                return productoNuevo;
            }
            else
            {
                return BadRequest("Ha habido un error.");
            }
        }

        [HttpDelete("eliminar/{id}")]
        public async Task<ActionResult> EliminarProducto(int id)
        {
            Producto producto = _context.Productos.First(P => P.Id == id);
            _context.Remove(producto);

            if (await _context.SaveChangesAsync() != 0)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Ha habido un error.");
            }
        }

        [HttpGet("lista")]
        public async Task<ActionResult<List<ProductoDTO>>> ObtenerProductos()
        {
            List<Producto> productos = _context.Productos.ToList();
            List<ProductoDTO> productosdto = _mapper.Map<List<ProductoDTO>>(productos);
            return productosdto;
        }

        [HttpGet("producto/{id}")]
        public async Task<ActionResult<ProductoDTO>> ObtenerProductosPorId(int id)
        {
            Producto producto = _context.Productos.First(P => P.Id == id);
            ProductoDTO productodto = _mapper.Map<ProductoDTO>(producto);
            return productodto;
        }
    }
}