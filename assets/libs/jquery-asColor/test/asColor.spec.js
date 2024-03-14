"use strict";

import AsColor from "../src/asColor";

describe("AsColor", () => {
  const colorForm = {
    rgb: "rgb(0, 0, 0)",
    rgba: "rgba(0, 0, 0, 1)",
    hex: "#000",
    hsl: "hsl(0, 100%, 50%)",
    hsla: "hsla(0, 100%, 50%, 1)",
    transparent: "transparent",
  };

  describe("matchString()", () => {
    it("should match hex", () => {
      expect(AsColor.matchString("")).to.be.equal(false);
      expect(AsColor.matchString("#")).to.be.equal(false);
      expect(AsColor.matchString("#3")).to.be.equal(false);
      expect(AsColor.matchString("#33")).to.be.equal(false);
      expect(AsColor.matchString("#333")).to.be.equal(true);
      expect(AsColor.matchString("#3333")).to.be.equal(false);
      expect(AsColor.matchString("#33333")).to.be.equal(false);
      expect(AsColor.matchString("#333333")).to.be.equal(true);
      expect(AsColor.matchString("#333333 ")).to.be.equal(true);
      expect(AsColor.matchString("#3333333")).to.be.equal(false);
    });

    it("should match rgb", () => {
      expect(AsColor.matchString("R")).to.be.equal(false);
      expect(AsColor.matchString("RG")).to.be.equal(false);
      expect(AsColor.matchString("RGB")).to.be.equal(false);
      expect(AsColor.matchString("RGB(")).to.be.equal(false);
      expect(AsColor.matchString("RGB(6")).to.be.equal(false);
      expect(AsColor.matchString("RGB(60,")).to.be.equal(false);
      expect(AsColor.matchString("RGB(60,6")).to.be.equal(false);
      expect(AsColor.matchString("RGB(60,60,")).to.be.equal(false);
      expect(AsColor.matchString("RGB(60,60,6")).to.be.equal(false);
      expect(AsColor.matchString("RGB(60,60,60")).to.be.equal(false);
      expect(AsColor.matchString("RGB(60,60,60)")).to.be.equal(true);
      expect(AsColor.matchString("RGB(60,60,60) ")).to.be.equal(true);
      expect(AsColor.matchString("RGB(60,60,60),")).to.be.equal(false);
    });

    it("should match rgba", () => {
      expect(AsColor.matchString("R")).to.be.equal(false);
      expect(AsColor.matchString("RG")).to.be.equal(false);
      expect(AsColor.matchString("RGB")).to.be.equal(false);
      expect(AsColor.matchString("RGBA(")).to.be.equal(false);
      expect(AsColor.matchString("RGBA(6")).to.be.equal(false);
      expect(AsColor.matchString("RGBA(60,")).to.be.equal(false);
      expect(AsColor.matchString("RGBA(60,6")).to.be.equal(false);
      expect(AsColor.matchString("RGBA(60,60,")).to.be.equal(false);
      expect(AsColor.matchString("RGBA(60,60,6")).to.be.equal(false);
      expect(AsColor.matchString("RGBA(60,60,60")).to.be.equal(false);
      expect(AsColor.matchString("RGBA(60,60,60,")).to.be.equal(false);
      expect(AsColor.matchString("RGBA(60,60,60,1")).to.be.equal(false);
      expect(AsColor.matchString("RGBA(60,60,60,1)")).to.be.equal(true);
      expect(AsColor.matchString("RGBA(60,60,60,1) ")).to.be.equal(true);
      expect(AsColor.matchString("RGBA(60,60,60,1),")).to.be.equal(false);
    });

    it("should match hsl", () => {
      expect(AsColor.matchString("H")).to.be.equal(false);
      expect(AsColor.matchString("HS")).to.be.equal(false);
      expect(AsColor.matchString("HSL")).to.be.equal(false);
      expect(AsColor.matchString("HSL(")).to.be.equal(false);
      expect(AsColor.matchString("HSL(0")).to.be.equal(false);
      expect(AsColor.matchString("HSL(0,")).to.be.equal(false);
      expect(AsColor.matchString("HSL(0,10")).to.be.equal(false);
      expect(AsColor.matchString("HSL(0,100")).to.be.equal(false);
      expect(AsColor.matchString("HSL(0,100%,")).to.be.equal(false);
      expect(AsColor.matchString("HSL(0,100%,50")).to.be.equal(false);
      expect(AsColor.matchString("HSL(0,100%,50%")).to.be.equal(false);
      expect(AsColor.matchString("HSL(0,100%,50%)")).to.be.equal(true);
      expect(AsColor.matchString("HSL(0,100%,50%) ")).to.be.equal(true);
      expect(AsColor.matchString("HSL(0,100%,50%),")).to.be.equal(false);
    });

    it("should match rgba", () => {
      expect(AsColor.matchString("H")).to.be.equal(false);
      expect(AsColor.matchString("HS")).to.be.equal(false);
      expect(AsColor.matchString("HSL")).to.be.equal(false);
      expect(AsColor.matchString("HSLA(")).to.be.equal(false);
      expect(AsColor.matchString("HSLA(0")).to.be.equal(false);
      expect(AsColor.matchString("HSLA(0,")).to.be.equal(false);
      expect(AsColor.matchString("HSLA(0,1")).to.be.equal(false);
      expect(AsColor.matchString("HSLA(0,10")).to.be.equal(false);
      expect(AsColor.matchString("HSLA(0,100")).to.be.equal(false);
      expect(AsColor.matchString("HSLA(0,100%")).to.be.equal(false);
      expect(AsColor.matchString("HSLA(0,100%,")).to.be.equal(false);
      expect(AsColor.matchString("HSLA(0,100%,5")).to.be.equal(false);
      expect(AsColor.matchString("HSLA(0,100%,50")).to.be.equal(false);
      expect(AsColor.matchString("HSLA(0,100%,50%")).to.be.equal(false);
      expect(AsColor.matchString("HSLA(0,100%,50%,")).to.be.equal(false);
      expect(AsColor.matchString("HSLA(0,100%,50%,1")).to.be.equal(false);
      expect(AsColor.matchString("HSLA(0,100%,50%,1)")).to.be.equal(true);
      expect(AsColor.matchString("HSLA(0,100%,50%,1) ")).to.be.equal(true);
      expect(AsColor.matchString("HSLA(0,100%,50%,1),")).to.be.equal(false);
    });

    it("should match transparent", () => {
      expect(AsColor.matchString("trans")).to.be.equal(false);
      expect(AsColor.matchString("transparent")).to.be.equal(true);
    });

    it("should match name", () => {
      expect(AsColor.matchString("w")).to.be.equal(false);
      expect(AsColor.matchString("wh")).to.be.equal(false);
      expect(AsColor.matchString("whi")).to.be.equal(false);
      expect(AsColor.matchString("whit")).to.be.equal(false);
      expect(AsColor.matchString("white")).to.be.equal(true);
      expect(AsColor.matchString("whitea")).to.be.equal(false);

      expect(AsColor.matchString("r")).to.be.equal(false);
      expect(AsColor.matchString("re")).to.be.equal(false);
      expect(AsColor.matchString("red")).to.be.equal(true);
      expect(AsColor.matchString("reda")).to.be.equal(false);
    });

    it("should call with instance", () => {
      var color = new AsColor("", "HEX");

      expect(color.matchString("red")).to.be.equal(true);
    });
  });

  describe("toString()", () => {
    it("should to string correctly", () => {
      let color = new AsColor({
        format: false,
        alphaConvert: false,
      });

      color.val("#123456");
      expect(color.toString()).to.be.equal("#123456");
      color.val("rgb(255,255,255)");
      expect(color.toString()).to.be.equal("rgb(255, 255, 255)");
      color.val("rgba(255,255,255,0.8)");
      expect(color.toString()).to.be.equal("rgba(255, 255, 255, 0.8)");
      color.val("hsl(0,0%,50%)");
      expect(color.toString()).to.be.equal("hsl(0, 0%, 50%)");
      color.val("hsla(0,0%,50%,0.8)");
      expect(color.toString()).to.be.equal("hsla(0, 0%, 50%, 0.8)");
      color.val("white");
      expect(color.toString()).to.be.equal("white");

      color.format("rgba");
      color.val("#123456");
      expect(color.toString()).to.be.equal("rgba(18, 52, 86, 1)");

      color.val("white");
      expect(color.toString()).to.be.equal("rgba(255, 255, 255, 1)");

      color.format("rgb");
      color.val("rgba(255,255,255,0.8)");
      expect(color.toString()).to.be.equal("rgb(255, 255, 255)");
    });

    it("should convent to alphaConvert if alpha is defined", () => {
      let color = new AsColor({
        format: false,
        alphaConvert: false,
      });

      color.format("rgb");
      color.val("rgba(255,255,255,0.8)");
      expect(color.toString()).to.be.equal("rgb(255, 255, 255)");

      color = new AsColor({
        format: false,
        alphaConvert: "RGBA",
      });

      color.format("rgb");
      color.val("rgba(255,255,255,0.8)");
      expect(color.toString()).to.be.equal("rgba(255, 255, 255, 0.8)");

      color = new AsColor({
        format: false,
        alphaConvert: {
          RGB: "RGBA",
          HSL: "HSLA",
          HEX: "RGBA",
          NAME: "RGBA",
        },
      });

      color.format("rgb");
      color.val("rgba(255,255,255,0.8)");
      expect(color.toString()).to.be.equal("rgba(255, 255, 255, 0.8)");

      color.val("white");
      expect(color.toString()).to.be.equal("rgb(255, 255, 255)");
      color.alpha(0.8);
      expect(color.toString()).to.be.equal("rgba(255, 255, 255, 0.8)");

      color.val("#fff");
      expect(color.toString()).to.be.equal("rgb(255, 255, 255)");
      color.alpha(0.8);
      expect(color.toString()).to.be.equal("rgba(255, 255, 255, 0.8)");
    });

    it("should work with upper strings", () => {
      let color = new AsColor("#000000", "HEX");

      expect(color.val("RGB(60,60,60)").toString()).to.be.equal("#3c3c3c");

      expect(color.val("RGBA(60,60,60,1)").toString()).to.be.equal("#3c3c3c");

      expect(color.val("HSL(0, 0%, 24%)").toString()).to.be.equal(
        "#3d3d3d"
      ); /* ! */

      expect(color.val("HSLA(0, 0%, 24%, 1)").toString()).to.be.equal(
        "#3d3d3d"
      ); /* ! */

      expect(color.val("TRANSPARENT").toString()).to.be.equal("transparent");
    });
  });

  it("should return #000000 if no value defined", () => {
    let color = new AsColor();

    expect(color.val()).to.be.equal("#000000");
    expect(color.get()).to.be.eql({
      r: 0,
      g: 0,
      b: 0,
      h: 0,
      s: 0,
      v: 0,
      a: 1,
    });
    expect(color.format()).to.be.equal("HEX");
    expect(color.toString()).to.be.equal("#000000");
  });

  describe("options", () => {
    describe("nameDegradation", () => {
      it("should degradation to the format with options.nameDegradation if color dont have a name", () => {
        let color = new AsColor("#126782", {
          format: "name",
        });

        expect(color.format()).to.be.equal("NAME");
        expect(color.toString()).to.be.equal("#126782");

        color = new AsColor("#126782", {
          format: "name",
          nameDegradation: "rgb",
        });

        expect(color.format()).to.be.equal("NAME");
        expect(color.toString()).to.be.equal("rgb(18, 103, 130)");
      });
    });

    describe("hexUseName", () => {
      it("should use name when from hex color", () => {
        let color = new AsColor("#8fbc8f", {
          hexUseName: false,
        });
        expect(color.format()).to.be.equal("HEX");
        expect(color.toString()).to.be.equal("#8fbc8f");

        color = new AsColor("#8fbc8f", {
          hexUseName: true,
        });
        expect(color.format()).to.be.equal("HEX");
        expect(color.toString()).to.be.equal("darkseagreen");
      });
    });

    describe("shortenHex", () => {
      it("should use short hex", () => {
        let color = new AsColor("#fff");
        expect(color.toString()).to.be.equal("#ffffff");

        color = new AsColor("#fff", {
          shortenHex: true,
        });

        expect(color.format()).to.be.equal("HEX");
        expect(color.toString()).to.be.equal("#fff");
      });
    });

    describe("invalidValue", () => {
      it("should return the color when invalid", () => {
        let color = new AsColor("hello world", {
          invalidValue: "",
        });
        expect(color.toString()).to.be.equal("");

        color = new AsColor("hello world", {
          invalidValue: {
            r: 0,
            g: 0,
            b: 0,
            a: 1,
          },
        });
        expect(color.toString()).to.be.equal("#000000");
      });
    });

    describe("reduceAlpha", () => {
      it("should reduce alpha", () => {
        let color = new AsColor("rgba(255,255,255,1)", {
          reduceAlpha: false,
        });
        expect(color.toString()).to.be.equal("rgba(255, 255, 255, 1)");

        color = new AsColor("rgba(255,255,255,1)", {
          reduceAlpha: true,
        });
        expect(color.toString()).to.be.equal("rgb(255, 255, 255)");

        color = new AsColor("hsla(0,0%,50%,1)", {
          reduceAlpha: false,
        });
        expect(color.toString()).to.be.equal("hsla(0, 0%, 50%, 1)");

        color = new AsColor("hsla(0,0%,50%,1)", {
          reduceAlpha: true,
        });
        expect(color.toString()).to.be.equal("hsl(0, 0%, 50%)");
      });
    });

    describe("zeroAlphaAsTransparent", () => {
      it("should use transparent when alpha equal zero", () => {
        let color = new AsColor("rgba(255,255,255,0)", {
          zeroAlphaAsTransparent: false,
        });

        expect(color.toString()).to.be.equal("rgba(255, 255, 255, 0)");

        color = new AsColor("rgba(255,255,255,0)", {
          zeroAlphaAsTransparent: true,
        });

        expect(color.toString()).to.be.equal("transparent");
      });
    });

    describe("instance", () => {
      it("val()", () => {
        let color = new AsColor("#000000", "HEX");

        expect(color.val()).to.be.equal("#000000");

        expect(color.val("rgb(66, 50, 50)").toString()).to.be.equal("#423232");

        expect(color.val("rgba(66, 50, 50, 1)").toString()).to.be.equal(
          "#423232"
        );

        expect(color.val("hsl(0, 14%, 23%)").toString()).to.be.equal(
          "#433232"
        ); /* ! */

        expect(color.val("hsla(0, 14%, 23%, 1)").toString()).to.be.equal(
          "#433232"
        ); /* ! */

        expect(color.val("transparent").toString()).to.be.equal("transparent");
      });

      it("isValid()", () => {
        let color = new AsColor();
        color.val("#fff");

        expect(color.isValid()).to.be.equal(true);

        color.val("fff");

        expect(color.isValid()).to.be.equal(false);

        color.val("its not valid");

        expect(color.isValid()).to.be.equal(false);
      });

      it("format()", () => {
        let color = new AsColor();
        expect(color.format()).to.be.equal("HEX");

        color = new AsColor("#000000");
        expect(color.format()).to.be.equal("HEX");

        color = new AsColor("rgb(0, 0, 0)");
        expect(color.format()).to.be.equal("RGB");

        color = new AsColor("rgba(0, 0, 0, 1)");
        expect(color.format()).to.be.equal("RGBA");

        color = new AsColor("hsl(59, 100%, 50%)");
        expect(color.format()).to.be.equal("HSL");

        color = new AsColor("hsla(59, 100%, 50%, 1)");
        expect(color.format()).to.be.equal("HSLA");

        color = new AsColor("#000000", "rgba");
        expect(color.format()).to.be.equal("RGBA");

        color.format("rgb");
        expect(color.format()).to.be.equal("RGB");

        color.format("rgba");
        expect(color.format()).to.be.equal("RGBA");

        color.format("hsl");
        expect(color.format()).to.be.equal("HSL");

        color.format("hsla");
        expect(color.format()).to.be.equal("HSLA");

        color.format("hex");
        expect(color.format()).to.be.equal("HEX");
      });

      it("set()", () => {
        let color = new AsColor();
        color.set({
          r: 255,
          g: 255,
          b: 255,
        });
        expect(color.toHEX()).to.be.equal("#ffffff");

        color.set({
          r: 255,
          g: 255,
          b: 255,
          a: 0.5,
        });
        expect(color.toRGB()).to.be.equal("rgb(255, 255, 255)");
        expect(color.toRGBA()).to.be.equal("rgba(255, 255, 255, 0.5)");
        expect(color.toHSLA()).to.be.equal("hsla(0, 0%, 100%, 0.5)");

        color.set({
          h: 0,
          s: 0,
          v: 1,
          a: 0.5,
        });
        expect(color.toRGBA()).to.be.equal("rgba(255, 255, 255, 0.5)");
        expect(color.toHSLA()).to.be.equal("hsla(0, 0%, 100%, 0.5)");

        color.set({
          h: 1,
          s: 0,
          v: 1,
          a: 0.5,
        });
        expect(color.toRGBA()).to.be.equal("rgba(255, 255, 255, 0.5)");
        expect(color.toHSLA()).to.be.equal("hsla(0, 0%, 100%, 0.5)");
      });

      it("get()", () => {
        let color = new AsColor("rgba(0, 0, 0, 1)");
        expect(color.get()).to.be.eql({
          r: 0,
          g: 0,
          b: 0,
          h: 0,
          s: 0,
          v: 0,
          a: 1,
        });

        color.val("hsla(0, 0%, 100%, 0.5)");
        expect(color.get()).to.be.eql({
          r: 255,
          g: 255,
          b: 255,
          h: 0,
          s: 0,
          v: 1,
          a: 0.5,
        });

        color.val("#fff600");
        color.alpha(1);
        expect(color.get()).to.be.eql({
          r: 255,
          g: 246,
          b: 0,
          h: 58,
          s: 1,
          v: 1,
          a: 1,
        });
      });

      it("alpha()", () => {
        let color = new AsColor("#8c9cdf", "rgba");

        expect(color.alpha()).to.be.equal(1);
        expect(color.toRGBA()).to.be.equal("rgba(140, 156, 223, 1)");
        expect(color.toHSLA()).to.be.equal("hsla(228, 56%, 71%, 1)");

        color.alpha(0.5);
        expect(color.alpha()).to.be.equal(0.5);
        expect(color.toRGBA()).to.be.equal("rgba(140, 156, 223, 0.5)");
        expect(color.toHSLA()).to.be.equal("hsla(228, 56%, 71%, 0.5)");

        color.alpha(5);
        expect(color.alpha()).to.be.equal(1);

        color.alpha(-5);
        expect(color.alpha()).to.be.equal(0);

        color.alpha("1");
        expect(color.alpha()).to.be.equal(1);

        color.alpha("abc");
        expect(color.alpha()).to.be.equal(1);
      });

      it("to()", () => {
        let color = new AsColor("rgba(255, 128, 36, 0.5)");

        expect(color.toRGBA()).to.be.equal("rgba(255, 128, 36, 0.5)");
        expect(color.to("rgba")).to.be.equal("rgba(255, 128, 36, 0.5)");

        expect(color.toRGB()).to.be.equal("rgb(255, 128, 36)");
        expect(color.to("rgb")).to.be.equal("rgb(255, 128, 36)");

        expect(color.toHSLA()).to.be.equal("hsla(25, 100%, 57%, 0.5)");
        expect(color.to("hsla")).to.be.equal("hsla(25, 100%, 57%, 0.5)");

        expect(color.toHEX()).to.be.equal("#ff8024");
        expect(color.to("hex")).to.be.equal("#ff8024");

        expect(color.to("name")).to.be.equal("#ff8024");

        color.val("#fff");
        expect(color.to("name")).to.be.equal("white");
      });

      it("from rgb", () => {
        let color = new AsColor(colorForm.rgb);
        expect(color.toRGBA()).to.be.equal("rgba(0, 0, 0, 1)");
        expect(color.toRGB()).to.be.equal("rgb(0, 0, 0)");
        expect(color.toHSLA()).to.be.equal("hsla(0, 0%, 0%, 1)");
        expect(color.toHEX()).to.be.equal("#000000");
        expect(color.toString()).to.be.equal("rgb(0, 0, 0)");
      });

      it("from name", () => {
        let color = new AsColor("red");

        expect(color.isValid()).to.be.equal(true);
        expect(color.toHEX()).to.be.equal("#ff0000");
        expect(color.format()).to.be.equal("NAME");
        expect(color.toString()).to.be.equal("red");
      });

      it("from transparent", () => {
        let color = new AsColor("transparent");

        expect(color.format()).to.be.equal("HEX");
        expect(color.toRGB()).to.be.equal("rgb(0, 0, 0)");
        expect(color.toRGBA()).to.be.equal("rgba(0, 0, 0, 0)");
        expect(color.toHSL()).to.be.equal("hsl(0, 0%, 0%)");
        expect(color.toHSLA()).to.be.equal("hsla(0, 0%, 0%, 0)");
        expect(color.toHEX()).to.be.equal("#000000");
        expect(color.toString()).to.be.equal("transparent");
      });

      it("from hex", () => {
        let color = new AsColor("#000000");

        expect(color.toRGBA()).to.be.equal("rgba(0, 0, 0, 1)");
        expect(color.toRGB()).to.be.equal("rgb(0, 0, 0)");
        expect(color.toHSLA()).to.be.equal("hsla(0, 0%, 0%, 1)");
        expect(color.toHEX()).to.be.equal("#000000");
        expect(color.toString()).to.be.equal("#000000");

        color.val("#fff");
        expect(color.toHEX()).to.be.equal("#ffffff");

        color.val("#323");
        expect(color.toHEX()).to.be.equal("#332233");
      });

      it("from hsl", () => {
        let color = new AsColor();

        color.val("#bada55");
        expect(color.toHSL()).to.be.equal("hsl(74, 64%, 59%)");

        color.val("#bad954");
        expect(color.toHSL()).to.be.equal("hsl(74, 64%, 59%)");

        color.val("hsl(74, 64%, 59%)");
        expect(color.toHEX()).to.be.equal("#bad954");

        color.val("#3d3d3d");
        expect(color.toHSL()).to.be.equal("hsl(0, 0%, 24%)");

        color.val("#3c3c3c");
        expect(color.toHSL()).to.be.equal("hsl(0, 0%, 24%)");

        color.val("#3d3d3d");
        expect(color.toHSL()).to.be.equal("hsl(0, 0%, 24%)");

        color.val("hsl(0, 0%, 24%)");
        expect(color.toHEX()).to.be.equal("#3d3d3d");

        color.val("rgb(75, 96, 6)");
        expect(color.toHSL()).to.be.equal("hsl(74, 88%, 20%)");

        color.val("hsl(74, 88%, 20%)");
        expect(color.toRGB()).to.be.equal("rgb(75, 96, 6)");

        color.val("rgba(117, 149, 9, 0.65)");
        expect(color.toHSLA()).to.be.equal("hsla(74, 89%, 31%, 0.65)");

        color.val("hsla(74, 89%, 31%, 0.65)");
        expect(color.toRGBA()).to.be.equal("rgba(117, 149, 9, 0.65)");

        color.val("rgb(35, 22, 204)");
        expect(color.toHSL()).to.be.equal("hsl(244, 81%, 44%)");

        color.val("rgb(33, 21, 203)");
        expect(color.toHSL()).to.be.equal("hsl(244, 81%, 44%)");

        color.val("hsl(244, 81%, 44%)");
        expect(color.toRGB()).to.be.equal("rgb(33, 21, 203)");
      });

      it("from #4fb9ee", () => {
        let color = new AsColor("#4fb9ee");

        expect(color.toRGB()).to.be.equal("rgb(79, 185, 238)");
        expect(color.toRGBA()).to.be.equal("rgba(79, 185, 238, 1)");
        expect(color.toHSL()).to.be.equal("hsl(200, 82%, 62%)");
        expect(color.toHSLA()).to.be.equal("hsla(200, 82%, 62%, 1)");
        expect(color.toHEX()).to.be.equal("#4fb9ee");
        expect(color.toString()).to.be.equal("#4fb9ee");
      });

      it("color #000000", () => {
        let color = new AsColor("#000000");

        expect(color.toRGB()).to.be.equal("rgb(0, 0, 0)");
        expect(color.toRGBA()).to.be.equal("rgba(0, 0, 0, 1)");
        expect(color.toHSL()).to.be.equal("hsl(0, 0%, 0%)");
        expect(color.toHSLA()).to.be.equal("hsla(0, 0%, 0%, 1)");
        expect(color.toHEX()).to.be.equal("#000000");
        expect(color.toString()).to.be.equal("#000000");
      });

      it("color #ffffff", () => {
        let color = new AsColor("#ffffff");

        expect(color.toRGB()).to.be.equal("rgb(255, 255, 255)");
        expect(color.toRGBA()).to.be.equal("rgba(255, 255, 255, 1)");
        expect(color.toHSL()).to.be.equal("hsl(0, 0%, 100%)");
        expect(color.toHSLA()).to.be.equal("hsla(0, 0%, 100%, 1)");
        expect(color.toHEX()).to.be.equal("#ffffff");
        expect(color.toString()).to.be.equal("#ffffff");
      });

      it("color rgb(255, 0, 6)", () => {
        let color = new AsColor("rgb(255, 0, 6)");

        expect(color.toRGB()).to.be.equal("rgb(255, 0, 6)");
        expect(color.toRGBA()).to.be.equal("rgba(255, 0, 6, 1)");
        expect(color.toHSL()).to.be.equal("hsl(359, 100%, 50%)");
        expect(color.toHSLA()).to.be.equal("hsla(359, 100%, 50%, 1)");
        expect(color.toHEX()).to.be.equal("#ff0006");
        expect(color.toString()).to.be.equal("rgb(255, 0, 6)");
      });

      it("color rgb(238, 79, 185)", () => {
        let color = new AsColor("rgb(238, 79, 185)");

        expect(color.toRGB()).to.be.equal("rgb(238, 79, 185)");
        expect(color.toRGBA()).to.be.equal("rgba(238, 79, 185, 1)");
        expect(color.toHSL()).to.be.equal("hsl(320, 82%, 62%)");
        expect(color.toHSLA()).to.be.equal("hsla(320, 82%, 62%, 1)");
        expect(color.toHEX()).to.be.equal("#ee4fb9");
        expect(color.toString()).to.be.equal("rgb(238, 79, 185)");
      });

      it("color hsl(244, 81%, 44%)", () => {
        let color = new AsColor("hsl(244, 81%, 44%)");

        expect(color.toRGB()).to.be.equal("rgb(33, 21, 203)");
        expect(color.toRGBA()).to.be.equal("rgba(33, 21, 203, 1)");
        expect(color.toHSL()).to.be.equal("hsl(244, 81%, 44%)");
        expect(color.toHSLA()).to.be.equal("hsla(244, 81%, 44%, 1)");
        expect(color.toHEX()).to.be.equal("#2115cb");
        expect(color.toString()).to.be.equal("hsl(244, 81%, 44%)");
      });
    });
  });
});
