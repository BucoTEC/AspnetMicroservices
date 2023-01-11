using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Catalog.API.Entities;
using MongoDB.Driver;

namespace Catalog.API.Data
{
    public interface ICatalogContext
    {
        IMongoCollection<Product> Products { get; }
    }
}

// TODO look in to basic mongo operation in c#
