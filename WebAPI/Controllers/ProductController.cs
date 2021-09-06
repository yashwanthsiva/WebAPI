using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class ProductController : ApiController
    {
        ProductEntities db = new ProductEntities();

        //post
        public string Post(Product product)
        {
            db.Products.Add(product);
            db.SaveChanges();
            return "Product added";
        }

        //Get
        public IEnumerable<Product> Get()
        {
            return db.Products.ToList();
        }

        //Get single product
        public Product Get(int id)
        {
           Product product= db.Products.Find(id);
            return product;
        }

        //update
        public string Put(int id, Product product)
        {
            var product_ = db.Products.Find(id);
            product_.Name = product.Name;
            product_.Price = product.Price;
            product_.Quantity = product.Quantity;
            product_.Active = product.Active;

            db.Entry(product_).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return "Product updated";
                 
        }

        public string Delete(int id)
        {
            Product product = db.Products.Find(id);
            db.Products.Remove(product);
            db.SaveChanges();
            return "Deleted";
        }
    }
}
