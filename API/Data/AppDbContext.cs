using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Producto> Productos{get;set;}
    public DbSet<Venta> Ventas{get;set;}

    public DbSet<VentaCabecera> Ventas_Cabecera{get;set;}
    public DbSet<User> Users{get;set;}
}