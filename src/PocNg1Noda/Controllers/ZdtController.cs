using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PocNg1Noda.Repositories;
using PocNg1Noda.Models;

namespace PocNg1Noda.Controllers
{
    [Route("api/[controller]")]
    public class ZdtController : Controller
    {
        private IZdtRepository _zdtRepository;

        public ZdtController(IZdtRepository zdtRepository)
        {
            _zdtRepository = zdtRepository;
        }

        // GET: api/zdt
        [HttpGet]
        public IEnumerable<Zdt> Get()
        {
            return _zdtRepository.GetAll();
        }

        // GET api/zdt/5
        [HttpGet("{zdtId}")]
        public Zdt Get(string zdtId)
        {
            return _zdtRepository.GetById(zdtId);
        }

        // POST api/zdt
        [HttpPost]
        public void Post([FromBody]Zdt zdt)
        {
            if (zdt == null)
            {
                throw new ArgumentNullException("zdt", "zdt must not be null");
            }
            _zdtRepository.Add(zdt);
        }

        // PUT api/zdt/5
        [HttpPut("{zdtId}")]
        public void Put(string zdtId, [FromBody]Zdt zdt)
        {
            _zdtRepository.Update(zdt);
        }

        // DELETE api/zdt/5
        [HttpDelete("{zdtId}")]
        public void Delete(string zdtId)
        {
            _zdtRepository.Remove(zdtId);
        }
    }
}
