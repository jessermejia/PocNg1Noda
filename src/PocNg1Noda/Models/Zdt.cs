using Newtonsoft.Json;
using NodaTime;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PocNg1Noda.Models
{
    public class Zdt
    {
        public string Id { get; set; }

        [JsonIgnore]
        public DateTimeOffset DateTimeOffset { get; set; }

        [JsonIgnore]
        public string IanaTimeZone { get; set; }

        [NotMapped]
        public ZonedDateTime ZonedDateTime
        {
            get
            {
                if (string.IsNullOrWhiteSpace(IanaTimeZone))
                {
                    return default(ZonedDateTime);
                }
                var instant = Instant.FromDateTimeOffset(DateTimeOffset);
                var zone = DateTimeZoneProviders.Tzdb[IanaTimeZone];
                return new ZonedDateTime(instant, zone);
            }
            set
            {
                DateTimeOffset = value.ToDateTimeOffset();
                IanaTimeZone = value.Zone.ToString();
            }
        }
    }
}
