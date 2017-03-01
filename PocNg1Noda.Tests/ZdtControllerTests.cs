using PocNg1Noda.Models;
using PocNg1Noda.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Moq;
using Xunit;
using PocNg1Noda.Controllers;

namespace PocNg1Noda.Tests
{
    public class ZdtControllerTests
    {
        [Fact]
        public void GetReturnsEverythingInRepository()
        {
            // ARRANGE
            var zdts = new[] {
                new Zdt
                {
                    Id = Guid.NewGuid().ToString()
                },
                new Zdt
                {
                    Id = Guid.NewGuid().ToString()
                }
            };
            var mockZdtRepository = new Mock<IZdtRepository>();
            mockZdtRepository.Setup(x => x.GetAll()).Returns(zdts);
            var zdtController = new ZdtController(mockZdtRepository.Object);

            // ACT
            var result = zdtController.Get();

            // ASSERT
            Assert.Same(zdts, result);
        }

        [Fact]
        public void PostAddsANewZdtToTheRepository()
        {
            // Arrange
            var zdt = new Zdt
            {
                Id = Guid.NewGuid().ToString()
            };
            var mockZdtRepository = new Mock<IZdtRepository>();
            mockZdtRepository.Setup(x => x.Add(zdt)).Verifiable();
            var zdtController = new ZdtController(mockZdtRepository.Object);

            // Act
            zdtController.Post(zdt);

            // Assert
            mockZdtRepository.Verify();
        }

        [Fact]
        public void GetCallsGetById()
        {
            // ARRANGE
            var mockZdtRepository = new Mock<IZdtRepository>();
            mockZdtRepository.Setup(x => x.GetById("")).Verifiable();
            var zdtController = new ZdtController(mockZdtRepository.Object);

            // ACT
            var result = zdtController.Get("");

            // ASSERT
            mockZdtRepository.Verify();
        }

        [Fact]
        public void PutCallsUpdate()
        {
            // ARRANGE
            var zdt = new Zdt();
            var mockZdtRepository = new Mock<IZdtRepository>();
            mockZdtRepository.Setup(x => x.Update(zdt)).Verifiable();
            var zdtController = new ZdtController(mockZdtRepository.Object);

            // ACT
            zdtController.Put(zdt.Id, zdt);

            // ASSERT
            mockZdtRepository.Verify();
        }

        [Fact]
        public void DeleteCallsRemove()
        {
            // ARRANGE
            var zdtId = Guid.NewGuid().ToString();
            var mockZdtRepository = new Mock<IZdtRepository>();
            mockZdtRepository.Setup(x => x.Remove(zdtId)).Verifiable();
            var zdtController = new ZdtController(mockZdtRepository.Object);

            // ACT
            zdtController.Delete(zdtId);

            // ASSERT
            mockZdtRepository.Verify();
        }
    }
}
