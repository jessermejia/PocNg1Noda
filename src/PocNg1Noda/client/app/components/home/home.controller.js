import moment from 'moment';
require('moment-timezone');

class HomeController {
  constructor(zdtService) {
    "ngInject";
    this.zdtService = zdtService;
    this.timeZone = '';
    this.timeZones = Object.keys(moment.tz._names)
      .map((key) => {
        return moment.tz._names[key];
      })
      .sort();
    this.datePickers = [];
    this.ogDatePickers = [];
    this.name = 'home';

    this.updateDatePicker = (index) => {
      var updated = this.datePickers[index];
      return this.zdtService.update(updated)
        .then(() => {
          // datepicker is model bound to array property
        });
    };
  }

  addDatePicker(tz) {
    if (!tz) {
      throw new Error('tz must not be null');
    }
    var now = new Date();
    var id = now.getTime().toString();
    var mtz = moment.tz(now.toISOString(), tz);
    var zdt = {
      id: id,
      zonedDateTime: mtz
    };

    return this.zdtService.create(zdt)
      .then(() => {
        this.datePickers = this.datePickers.concat(zdt);
      })
      .catch(() => {
        this.getAll();
      });
  }

  removeDatePicker(id) {
    return this.zdtService.delete(id)
      .then(() => {
        this.datePickers = this.datePickers
          .filter((dp) => {
            return dp.id !== id;
          });
      });
  }

  getAll() {
    this.zdtService.getAll()
      .then((zdts) => {
        this.datePickers = zdts;
      });
  }

  $onInit () {
    this.getAll();
  }
}

export default HomeController;
