import moment from 'moment';

// Capitalize
export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Lowercase
export function lowercase(string) {
  return string.toLowerCase();
}

// Format price
export function formatPrice(number) {
  const fnumber = parseFloat(number);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(fnumber);
}

function toCamelCase(str) {
  return str
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/ (.)/g, function ($1) {
      return $1.toUpperCase();
    })
    .replace(/ /g, '');
}

export function objectToCamelCase(origObj) {
  return Object.keys(origObj).reduce(function (newObj, key) {
    let val = origObj[key];
    let newVal = typeof val === 'object' ? objectToCamelCase(val) : val;
    newObj[toCamelCase(key)] = newVal;
    return newObj;
  }, {});
}

export function strTolCamelcase(str) {
  var out = str.replace(/^\s*/, ''); // strip leading spaces
  out = out.replace(/^[a-z]|[^\s][A-Z]/g, function (str, offset) {
    if (offset == 0) {
      return str.toUpperCase();
    } else {
      return str.substr(0, 1) + ' ' + str.substr(1).toUpperCase();
    }
  });
  return out;
}

export function UniqueArray(value, index, self) {
  return self.indexOf(value) === index;
}

export function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function filterURL(url) {
  if (url) {
    return url
      .toLowerCase()
      .replace(/[.*+?^${}()|/.*:, $\]\\]/g, '-')
      .substring(0, 100)
      .split('---')
      .join('-')
      .split('--')
      .join('-');
  }
}

export const createMarkup = (content) => {
  return { __html: content };
};

export const formateDate = (date: Date, formatType: string) => {
  const formated = moment(date).format(formatType);
  return formated;
};

export function humanize(str) {
  return str
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
}
