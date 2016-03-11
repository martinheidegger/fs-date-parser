[![Build Status](https://travis-ci.org/martinheidegger/fs-date-parser.svg?branch=master)](https://travis-ci.org/martinheidegger/fs-date-parser)[![Coverage Status](https://coveralls.io/repos/github/martinheidegger/fs-date-parser/badge.svg?branch=master)](https://coveralls.io/github/martinheidegger/fs-date-parser?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# fs-date-parser

For static site blogs or pages you might want to setup the path to contain a date for sorting and publication. This little parser is fairly flexible and aimed exactly at this purpose.

## Usage

Install the date parser using:

`$ npm i fs-date-parser --save`

Then you can use it just like

```JavaScript
var parse = require('fs-date-parser');

parse('2015/06/09-hello.md'); // {date: /*Tue Jun 09 2015 00:00:00 GMT+0900 (JST)*/, rest: 'hello.md'}
parse('2015-06-09-hello.md'); // {date: /*Tue Jun 09 2015 00:00:00 GMT+0900 (JST)*/, rest: 'hello.md'}

parse('hello.md') // {date:}
```

(writing this from a japanese time-zone)
