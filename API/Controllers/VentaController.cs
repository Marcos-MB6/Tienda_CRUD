using API.Data;
using API.DTOs;
using API.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class VentaController : BaseApiController
    {
        public readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public VentaController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        [HttpPost]
        public async Task<ActionResult<Venta>> AñadirVenta([FromBody] VentaDTO ventadto)
        {
            Producto producto = await _context.Productos.FirstOrDefaultAsync(P => P.Id == ventadto.ProductoId);

            if (producto != null)
            {
                Venta venta = _mapper.Map<Venta>(ventadto);


                _context.Add(venta);

                if (await _context.SaveChangesAsync() != 0)
                {
                    return venta;
                }
                else
                {
                    return BadRequest("Ha habido un error.");
                }
            }
            else
            {
                return BadRequest("No existe ese producto.");
            }

        }

        // [HttpPut("actualizar/{id}")]
        // public async Task<ActionResult<Venta>> ActualizarVenta(int id, VentaDTO ventadto)
        // {
        //     Venta venta = _context.Ventas.First(V => V.Id == id);
        //     Producto producto = _context.Productos.First(P => P.Id == venta.ProductoId);
        //     VentaCabecera ventaCabecera = _context.Ventas_Cabecera.First(V => V.Id == venta.VentaCabeceraId);
        //     List<Venta> listaVentas = _context.Ventas.Where(V => V.VentaCabeceraId == ventaCabecera.Id).ToList();

        //     Venta ventaNueva = _mapper.Map(ventadto, venta);
            

        //     ventaNueva.DineroTotal = ventaNueva.Cantidad * producto.Precio;

        //     ventaCabecera.PrecioTotal=0;
        //     foreach (Venta v in listaVentas)
        //     {
        //         ventaCabecera.PrecioTotal += v.DineroTotal;
        //     }
            

        //     _context.Update(ventaNueva);

        //     if (await _context.SaveChangesAsync() != 0)
        //     {
        //         return ventaNueva;
        //     }
        //     else
        //     {
        //         return BadRequest("Ha habido un error.");
        //     }
        // }

        [HttpDelete("eliminar/{id}")]
        public async Task<ActionResult> EliminarVenta(int id)
        {
            Venta venta = _context.Ventas.First(V => V.Id == id);
            // VentaCabecera ventaCabecera = _context.Ventas_Cabecera.First(V => V.Id == venta.VentaCabeceraId);
            // ventaCabecera.PrecioTotal = ventaCabecera.PrecioTotal - venta.DineroTotal;

            _context.Remove(venta);

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
        public async Task<ActionResult<List<VentaDTO>>> ObtenerVentas()
        {
            List<Venta> ventas = _context.Ventas.ToList();
            List<VentaDTO> ventasdto = _mapper.Map<List<VentaDTO>>(ventas);
            return ventasdto;
        }

        [HttpGet("venta/{id}")]
        public async Task<ActionResult<VentaDTO>> ObtenerVentasPorId(int id)
        {
            Venta venta = _context.Ventas.First(V => V.Id == id);
            VentaDTO ventadto = _mapper.Map<VentaDTO>(venta);
            return ventadto;
        }
    }
}