using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [Route("[controller]")]
    public class UserController : BaseApiController
    {

        public readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public UserController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(RegisterDTO registerdto)
        {
            using var hmac = new HMACSHA512();

            User usuario = new User
            {
                Username = registerdto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerdto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(usuario);
            await _context.SaveChangesAsync();

            return usuario;
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(LoginDTO logindto)
        {
            User usuario = _context.Users.SingleOrDefault(u => u.Username == logindto.Username);

            if (usuario == null) return Unauthorized("Nome incorrecto");

            using var hmac = new HMACSHA512(usuario.PasswordSalt);

            var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(logindto.Password));

            for (int i = 0; i < ComputeHash.Length; i++)
            {
                if (ComputeHash[i] != usuario.PasswordHash[i]) return Unauthorized("Contraseña incorrecta");
            }

            return usuario;
        }


        [HttpGet("lista")]
        public async Task<ActionResult<List<User>>> ObtenerUsuarios()
        {
            List<User> usuarios = _context.Users.ToList();

            return usuarios;
        }

        [HttpDelete("eliminar/{id}")]
        public async Task<ActionResult> EliminarUsuario(int id)
        {
            User usuario = _context.Users.First(u => u.Id == id);
            _context.Remove(usuario);

            if (await _context.SaveChangesAsync() != 0)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Ha habido un error.");
            }
        }

    }
}