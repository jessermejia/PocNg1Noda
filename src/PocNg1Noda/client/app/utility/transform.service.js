'use strict';

import moment from 'moment';
require("moment-timezone");

const zdtRegex = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?\s[a-zA-Z\-\+\d]+(\/)?([a-zA-Z\-\+\d_]+)?(\/)?([a-zA-Z_]+)?$/;

class TransformService {
    constructor() { }

    isZdt(zdtString) {
        return zdtRegex.test(zdtString);
    }

    transformZonedDateTimeToMoment(zdtString) {
        const parts = zdtString.split(' ');
        return moment.tz(parts[0], parts[1]);
    }

    transformResponse(input) {
        if (typeof input === 'string' && this.isZdt(input)) {
            return this.transformZonedDateTimeToMoment(input);
        }
        // Ignore things that aren't objects.
        if (typeof input !== 'object') {
            return input;
        }

        for (let key in input) {
            if (!input.hasOwnProperty(key)) continue;

            let value = input[key];
            // Check for string properties which look like dates.
            if (typeof value === "string" && this.isZdt(value)) {
                let mmnt = this.transformZonedDateTimeToMoment(value);
                if (mmnt.isValid()) {
                    input[key] = mmnt;
                } else {
                    console.error("moment:", mmnt);
                    throw new Error('Uh oh...looks like the transformResponse is broken');
                }
            } else if (typeof value === "object") {
                // Recurse into object
                this.transformResponse(value);
            }
        }
        return input;
    }
}

export default TransformService;
