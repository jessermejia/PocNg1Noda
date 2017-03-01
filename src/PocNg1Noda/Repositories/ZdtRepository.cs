using System.Collections.Generic;
using System.Linq;
using PocNg1Noda.Models;
using System;

namespace PocNg1Noda.Repositories
{
    public class ZdtRepository : IZdtRepository
    {
        private static List<Zdt> _zdtList = new List<Zdt>();

        public void Add(Zdt zdt)
        {
            if (_zdtList.Count() >= 100)
            {
                _zdtList.Clear();
                _zdtList.Add(zdt);
                throw new Exception("Naive way to prevent too much memory from being used");
            }
            _zdtList.Add(zdt);
        }

        public IEnumerable<Zdt> GetAll()
        {
            return _zdtList;
        }

        public Zdt GetById(string id)
        {
            return _zdtList.FirstOrDefault(x => x.Id == id);
        }

        public void Remove(string id)
        {
            _zdtList.RemoveAll(x => x.Id == id);
        }

        public void Update(Zdt zdt)
        {
            var countOfRemoved = _zdtList.RemoveAll(x => x.Id == zdt.Id);
            if (countOfRemoved != 1)
            {
                throw new KeyNotFoundException();
            }
            _zdtList.Add(zdt);
        }
    }
}
