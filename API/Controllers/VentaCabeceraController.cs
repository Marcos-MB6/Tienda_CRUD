using API.Data;
using API.DTOs;
using API.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class VentaCabeceraController : BaseApiController
    {
        public readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public VentaCabeceraController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        [HttpPost]
        public async Task<ActionResult<VentaCabecera>> AñadirPedido(VentaCabeceraDTO ventacabeceradto)
        {
            VentaCabecera ventaCabecera = _mapper.Map<VentaCabecera>(ventacabeceradto);

            for (int i = 0; i < ventaCabecera.Ventas.Count(); i++)
            {
                Producto producto = await _context.Productos.FirstAsync(P => P.Id == ventaCabecera.Ventas[i].ProductoId);

                ventaCabecera.Ventas[i].DineroTotal = ventaCabecera.Ventas[i].Cantidad * producto.Precio;
                ventaCabecera.Ventas[i].Producto = producto;
                ventaCabecera.PrecioTotal += ventaCabecera.Ventas[i].DineroTotal;
            }

            _context.Add(ventaCabecera);

            if (await _context.SaveChangesAsync() != 0)
            {
                return ventaCabecera;
            }
            else
            {
                return BadRequest("Ha habido un error.");
            }
        }

        [HttpDelete("eliminar/{id}")]
        public async Task<ActionResult> EliminarPedido(int id)
        {
            VentaCabecera ventaCabecera = _context.Ventas_Cabecera.First(V => V.Id == id);
            _context.Remove(ventaCabecera);

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
        public async Task<ActionResult<List<VentaCabeceraDTO>>> ObtenerPedido()
        {
            List<VentaCabecera> ventasCabecera = await _context.Ventas_Cabecera
                .Include(v => v.Ventas)
                    .ThenInclude(v => v.Producto)
                .ToListAsync();
            List<VentaCabeceraDTO> ventascabeceradto = _mapper.Map<List<VentaCabeceraDTO>>(ventasCabecera);
            return ventascabeceradto;
        }


        [HttpGet("pedido/{id}")]
        public async Task<ActionResult<VentaCabeceraDTO>> ObtenerPedidoPorId(int id)
        {
            VentaCabecera ventaCabecera = _context.Ventas_Cabecera.First(V => V.Id == id);
            VentaCabeceraDTO ventacabeceradto = _mapper.Map<VentaCabeceraDTO>(ventaCabecera);
            return ventacabeceradto;
        }
    }
}