var dateFromPath = require('../')
var test = require('tap').test

test('parsing of dates should ignore non-dates', function (t) {
  t.equal(dateFromPath('').date, null)
  t.equal(dateFromPath('hello world').date, null)
  t.equal(dateFromPath('hello world').rest, 'hello world')
  t.equal(dateFromPath('hello world').date, null)
  t.equal(dateFromPath('213_0201hello world').date, null)
  t.equal(dateFromPath('hello world').date, null)
  t.equal(dateFromPath('hello world').date, null)
  t.equal(dateFromPath('213.2.1-hello world').date, null)
  t.end()
})

test('parsing of dates should parse regular months', function (t) {
  t.equal(dateFromPath('2013-hello').date.toString(), new Date(2013, 0, 1).toString())
  t.equal(dateFromPath('2013-02-hello').date.toString(), new Date(2013, 1, 1).toString())
  t.equal(dateFromPath('2013/02/01-hello').date.toString(), new Date(2013, 1, 1).toString())
  t.equal(dateFromPath('2013-02-01-hello').date.toString(), new Date(2013, 1, 1).toString())
  t.end()
})

test('parsing of dates should parse hours too', function (t) {
  t.equal(dateFromPath('201302010230-hello').date.toString(), new Date(2013, 1, 1, 2, 30).toString())
  t.equal(dateFromPath('20130201-0230-hello').date.toString(), new Date(2013, 1, 1, 2, 30).toString())
  t.equal(dateFromPath('2013-02-01-0230-hello').date.toString(), new Date(2013, 1, 1, 2, 30).toString())
  t.equal(dateFromPath('2013-02-01-02:30-hello').date.toString(), new Date(2013, 1, 1, 2, 30).toString())
  t.end()
})

test('parsing of dates should parse seconds too', function (t) {
  t.equal(dateFromPath('20130201-020010-hello').date.toString(), new Date(2013, 1, 1, 2, 0, 10).toString())
  t.equal(dateFromPath('2013-02-01-020015-hello').date.toString(), new Date(2013, 1, 1, 2, 0, 15).toString())
  t.equal(dateFromPath('2013-02-01-02:00:20-hello').date.toString(), new Date(2013, 1, 1, 2, 0, 20).toString())
  t.end()
})

test('parsing of dates should parse am/pm time case-insensitive', function (t) {
  t.equal(dateFromPath('20130201-02:00am-hello').date.toString(), new Date(2013, 1, 1, 2, 0).toString())
  t.equal(dateFromPath('2013-02-01-02:00pm-hello').date.toString(), new Date(2013, 1, 1, 14, 0).toString())
  t.equal(dateFromPath('2013-02-01-02:00:20PM-hello').date.toString(), new Date(2013, 1, 1, 2, 0, 20).toString())
  t.end()
})

test('parsing of dates should return the rest as well', function (t) {
  t.equal(dateFromPath('20130201-02:00am-hello').rest, 'hello')
  t.equal(dateFromPath('2013-02-01-02:00pm_holla').rest, 'holla')
  t.equal(dateFromPath('2013-02-01-02:00:20PM.monsoon').rest, 'monsoon')
  t.end()
})

test('parsing of dates should parse respect timezone specifications', function (t) {
  t.equal(dateFromPath('2013 +0100-hello').date.toString(), new Date(Date.UTC(2013, 0, 1, 1)).toString())
  t.equal(dateFromPath('2013 -0100-hello').date.toString(), new Date(Date.UTC(2012, 11, 31, 23)).toString())
  t.equal(dateFromPath('2014-02 +0100-hello').date.toString(), new Date(Date.UTC(2014, 1, 1, 1)).toString())
  t.equal(dateFromPath('2014-02 -0100-hello').date.toString(), new Date(Date.UTC(2014, 0, 31, 23)).toString())
  t.equal(dateFromPath('2015-02-02 +0100-hello').date.toString(), new Date(Date.UTC(2015, 1, 2, 1)).toString())
  t.equal(dateFromPath('2015-02-02 -0100-hello').date.toString(), new Date(Date.UTC(2015, 1, 1, 23)).toString())
  t.equal(dateFromPath('2016-02-02-02:00:00 +0100-hello').date.toString(), new Date(Date.UTC(2016, 1, 2, 3)).toString())
  t.equal(dateFromPath('2016-02-02-02:00:00 -0100-hello').date.toString(), new Date(Date.UTC(2016, 1, 2, 1)).toString())
  t.end()
})
