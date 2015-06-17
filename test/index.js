'use strict';

var Lab = require('lab'),
    code = require('code'),
    lab = Lab.script(),
    expect = code.expect,
    describe = lab.describe,
    it = lab.it,
    dateFromPath = require('../');

describe('parsing of dates', function () {
    it('should ignore non-dates', function (done) {

        expect(dateFromPath('').date).to.be.equal(null);
        expect(dateFromPath('hello world').date).to.be.equal(null);
        expect(dateFromPath('hello world').rest).to.be.equal('hello world');
        expect(dateFromPath('hello world').date).to.be.equal(null);
        expect(dateFromPath('213_0201hello world').date).to.be.equal(null);
        expect(dateFromPath('hello world').date).to.be.equal(null);
        expect(dateFromPath('hello world').date).to.be.equal(null);
        expect(dateFromPath('213.2.1-hello world').date).to.be.equal(null);
        done();
    });
    it('should parse regular months', function (done) {

        expect(dateFromPath('2013-hello').date.toString()).to.be.equal(new Date(2013, 0, 1).toString());
        expect(dateFromPath('2013-02-hello').date.toString()).to.be.equal(new Date(2013, 1, 1).toString());
        expect(dateFromPath('2013/02/01-hello').date.toString()).to.be.equal(new Date(2013, 1, 1).toString());
        expect(dateFromPath('2013-02-01-hello').date.toString()).to.be.equal(new Date(2013, 1, 1).toString());
        done();
    });
    it('should parse hours too', function (done) {

        expect(dateFromPath('201302010230-hello').date.toString()).to.be.equal(new Date(2013, 1, 1, 2, 30).toString());
        expect(dateFromPath('20130201-0230-hello').date.toString()).to.be.equal(new Date(2013, 1, 1, 2, 30).toString());
        expect(dateFromPath('2013-02-01-0230-hello').date.toString()).to.be.equal(new Date(2013, 1, 1, 2, 30).toString());
        expect(dateFromPath('2013-02-01-02:30-hello').date.toString()).to.be.equal(new Date(2013, 1, 1, 2, 30).toString());
        done();
    });
    it('should parse seconds too', function (done) {

        expect(dateFromPath('20130201-020010-hello').date.toString()).to.be.equal(new Date(2013, 1, 1, 2, 0, 10).toString());
        expect(dateFromPath('2013-02-01-020015-hello').date.toString()).to.be.equal(new Date(2013, 1, 1, 2, 0, 15).toString());
        expect(dateFromPath('2013-02-01-02:00:20-hello').date.toString()).to.be.equal(new Date(2013, 1, 1, 2, 0, 20).toString());
        done();
    });
    it('should parse am/pm time case-insensitive', function (done) {

        expect(dateFromPath('20130201-02:00am-hello').date.toString()).to.be.equal(new Date(2013, 1, 1, 2, 0).toString());
        expect(dateFromPath('2013-02-01-02:00pm-hello').date.toString()).to.be.equal(new Date(2013, 1, 1, 14, 0).toString());
        expect(dateFromPath('2013-02-01-02:00:20PM-hello').date.toString()).to.be.equal(new Date(2013, 1, 1, 2, 0, 20).toString());
        done();
    });
    it('should return the rest as well', function (done) {

        expect(dateFromPath('20130201-02:00am-hello').rest).to.be.equal('hello');
        expect(dateFromPath('2013-02-01-02:00pm_holla').rest).to.be.equal('holla');
        expect(dateFromPath('2013-02-01-02:00:20PM.monsoon').rest).to.be.equal('monsoon');
        done();
    });
    it('should parse respect timezone specifications', function (done) {

        expect(dateFromPath('2013 +0100-hello').date.toString()).to.be.equal(new Date(Date.UTC(2013, 0, 1, 1)).toString());
        expect(dateFromPath('2013 -0100-hello').date.toString()).to.be.equal(new Date(Date.UTC(2012, 11, 31, 23)).toString());
        expect(dateFromPath('2014-02 +0100-hello').date.toString()).to.be.equal(new Date(Date.UTC(2014, 1, 1, 1)).toString());
        expect(dateFromPath('2014-02 -0100-hello').date.toString()).to.be.equal(new Date(Date.UTC(2014, 0, 31, 23)).toString());
        expect(dateFromPath('2015-02-02 +0100-hello').date.toString()).to.be.equal(new Date(Date.UTC(2015, 1, 2, 1)).toString());
        expect(dateFromPath('2015-02-02 -0100-hello').date.toString()).to.be.equal(new Date(Date.UTC(2015, 1, 1, 23)).toString());
        expect(dateFromPath('2016-02-02-02:00:00 +0100-hello').date.toString()).to.be.equal(new Date(Date.UTC(2016, 1, 2, 3)).toString());
        expect(dateFromPath('2016-02-02-02:00:00 -0100-hello').date.toString()).to.be.equal(new Date(Date.UTC(2016, 1, 2, 1)).toString());
        done();
    });
});

exports.lab = lab;
