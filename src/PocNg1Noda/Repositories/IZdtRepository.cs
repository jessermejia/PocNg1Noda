using PocNg1Noda.Models;
using System.Collections.Generic;

namespace PocNg1Noda.Repositories
{
    public interface IZdtRepository
    {
        IEnumerable<Zdt> GetAll();
        Zdt GetById(string id);
        void Add(Zdt zdt);
        void Remove(string id);
        void Update(Zdt zdt);
    }
}
