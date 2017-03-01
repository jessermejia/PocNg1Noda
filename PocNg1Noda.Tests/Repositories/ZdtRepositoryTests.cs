using NodaTime;
using PocNg1Noda.Models;
using PocNg1Noda.Repositories;
using System;
using Xunit;

namespace PocNg1Noda.Tests.Repositories
{
    public class ZdtRepositoryTests
    {
        private IZdtRepository zdtRepository;

        public ZdtRepositoryTests()
        {
            zdtRepository = new ZdtRepository();
        }

        [Fact]
        public void AddingAZdtWorks()
        {
            // ARRANGE
            var zdtRepository = new ZdtRepository();
            Instant instant = default(Instant);
            var zone = DateTimeZoneProviders.Tzdb["America/Los_Angeles"];
            var zonedDateTime = new ZonedDateTime(instant, zone);
            var zdt = new Zdt
            {
                ZonedDateTime = zonedDateTime
            };

            // ACT
            zdtRepository.Add(zdt);

            // ASSERT
            Assert.NotEmpty(zdtRepository.GetAll());
        }

        [Fact]
        public void RemovingAZdtWorks()
        {
            // ARRANGE
            var zdtRepository = new ZdtRepository();
            var zdtId = Guid.NewGuid().ToString();
            var zdt = new Zdt
            {
                Id = zdtId,
                ZonedDateTime = new ZonedDateTime(default(Instant), DateTimeZoneProviders.Tzdb["America/Los_Angeles"])
            };
            zdtRepository.Add(zdt);

            // ACT
            zdtRepository.Remove(zdtId);

            // ASSERT
            Assert.Empty(zdtRepository.GetAll());
        }

        [Fact]
        public void GettingAZdtByIdWorks()
        {
            // ARRANGE
            var zdtRepository = new ZdtRepository();
            var zdtId = Guid.NewGuid().ToString();
            var expected = new Zdt
            {
                Id = zdtId,
                ZonedDateTime = new ZonedDateTime(default(Instant), DateTimeZoneProviders.Tzdb["America/Los_Angeles"])
            };
            zdtRepository.Add(expected);

            // ACT
            var actual = zdtRepository.GetById(zdtId);

            // ASSERT
            Assert.Same(expected, actual);
        }

        [Fact]
        public void UpdatingAZdtWorks()
        {
            // ARRANGE
            var zdtRepository = new ZdtRepository();
            var zdtId = Guid.NewGuid().ToString();
            var ogZdt = new Zdt
            {
                Id = zdtId,
                ZonedDateTime = new ZonedDateTime(default(Instant), DateTimeZoneProviders.Tzdb["America/Los_Angeles"])
            };
            zdtRepository.Add(ogZdt);

            var updatedZdt = new Zdt
            {
                Id = zdtId,
                ZonedDateTime = new ZonedDateTime(default(Instant), DateTimeZoneProviders.Tzdb["America/New_York"])
            };

            // ACT
            zdtRepository.Update(updatedZdt);
            var actual = zdtRepository.GetById(zdtId);

            // ASSERT
            Assert.Same(updatedZdt, actual);
        }
    }
}
