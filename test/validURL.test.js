//const assert = require('chai').assert;
const expect = require('chai').expect;
const validURL = require('../public/javascripts/validURL');

describe('validURL', function () {
    it("input a valid long url", function () {
        document = "";
        expect(validURL("https://www.google.com/search?sxsrf=ACYBGNQir13I3b2ttVYsFrU0gRgUFXowEA%3A1571251401092&ei=yWSnXbGiBc7k_AbzyZGAAw&q=switch&oq=switch&gs_l=psy-ab.3..35i39l2j0i67j0l2j0i67l3j0l2.37874.38545..38722...0.2..1.180.522.3j2......0....1..gws-wiz.......0i71j0i273.hXbfFIhrTSg&ved=0ahUKEwjxqvXMt6HlAhVOMt8KHfNkBDAQ4dUDCAs&uact=5")).to.equal(true);
    });
});

describe('validURL', function () {
    it("input a valid long url", function () {
        document = "";
        expect(validURL("https://www.google.com/search?sxsrf=ACYBGNTbAcbikMhM0Gkadrbse_Z9Crje0A%3A1571252117989&ei=lWenXeL7O8q1ggfJu5T4BQ&q=md5&oq=md5&gs_l=psy-ab.3..35i39j0i67j0i273l2j0i67l6.123101.123101..123350...0.1..0.108.108.0j1......0....1..gws-wiz.......0i71.jCSImc0bx9Y&ved=0ahUKEwiimuGiuqHlAhXKmuAKHckdBV8Q4dUDCAs&uact=5")).to.equal(true);
    });
});

describe('validURL', function () {
    it("input an invalid long url alsdkfasldfk", function () {
        document = "";
        expect(validURL("alsdkfasldfk")).to.equal(false);
    });
});

describe('validURL', function () {
    it("input an invalid long url null", function () {
        document = "";
        expect(validURL("")).to.equal(false);
    });
});