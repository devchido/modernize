/**
 * UglifUI
 * by Alex Sexton
 *
 * UglifyJS
 * by Mihai Bazon, BSD license
 *
 * Underscore.js
 * by Brad Dunbar
 *
 */
(function () {})(),
  (function () {
    var a = this,
      b = a._,
      c = {},
      d = Array.prototype,
      e = Object.prototype,
      f = d.slice,
      g = d.unshift,
      h = e.toString,
      i = e.hasOwnProperty,
      j = d.forEach,
      k = d.map,
      l = d.reduce,
      m = d.reduceRight,
      n = d.filter,
      o = d.every,
      p = d.some,
      q = d.indexOf,
      r = d.lastIndexOf;
    e = Array.isArray;
    var s = Object.keys,
      t = function (a) {
        return new y(a);
      };
    typeof module != "undefined" && module.exports
      ? ((module.exports = t), (t._ = t))
      : (a._ = t),
      (t.VERSION = "1.1.4");
    var u =
      (t.each =
      t.forEach =
        function (a, b, d) {
          if (a != null)
            if (j && a.forEach === j) a.forEach(b, d);
            else if (t.isNumber(a.length)) {
              for (var e = 0, f = a.length; e < f; e++)
                if (b.call(d, a[e], e, a) === c) break;
            } else
              for (e in a)
                if (i.call(a, e) && b.call(d, a[e], e, a) === c) break;
        });
    (t.map = function (a, b, c) {
      var d = [];
      return a == null
        ? d
        : k && a.map === k
          ? a.map(b, c)
          : (u(a, function (a, e, f) {
              d[d.length] = b.call(c, a, e, f);
            }),
            d);
    }),
      (t.reduce =
        t.foldl =
        t.inject =
          function (a, b, c, d) {
            var e = c !== void 0;
            a == null && (a = []);
            if (l && a.reduce === l)
              return d && (b = t.bind(b, d)), e ? a.reduce(b, c) : a.reduce(b);
            u(a, function (a, f, g) {
              !e && f === 0 ? ((c = a), (e = !0)) : (c = b.call(d, c, a, f, g));
            });
            if (!e)
              throw new TypeError(
                "Reduce of empty array with no initial value"
              );
            return c;
          }),
      (t.reduceRight = t.foldr =
        function (a, b, c, d) {
          return (
            a == null && (a = []),
            m && a.reduceRight === m
              ? (d && (b = t.bind(b, d)),
                c !== void 0 ? a.reduceRight(b, c) : a.reduceRight(b))
              : ((a = (t.isArray(a) ? a.slice() : t.toArray(a)).reverse()),
                t.reduce(a, b, c, d))
          );
        }),
      (t.find = t.detect =
        function (a, b, c) {
          var d;
          return (
            v(a, function (a, e, f) {
              if (b.call(c, a, e, f)) return (d = a), !0;
            }),
            d
          );
        }),
      (t.filter = t.select =
        function (a, b, c) {
          var d = [];
          return a == null
            ? d
            : n && a.filter === n
              ? a.filter(b, c)
              : (u(a, function (a, e, f) {
                  b.call(c, a, e, f) && (d[d.length] = a);
                }),
                d);
        }),
      (t.reject = function (a, b, c) {
        var d = [];
        return a == null
          ? d
          : (u(a, function (a, e, f) {
              b.call(c, a, e, f) || (d[d.length] = a);
            }),
            d);
      }),
      (t.every = t.all =
        function (a, b, d) {
          b = b || t.identity;
          var e = !0;
          return a == null
            ? e
            : o && a.every === o
              ? a.every(b, d)
              : (u(a, function (a, f, g) {
                  if (!(e = e && b.call(d, a, f, g))) return c;
                }),
                e);
        });
    var v =
      (t.some =
      t.any =
        function (a, b, d) {
          b = b || t.identity;
          var e = !1;
          return a == null
            ? e
            : p && a.some === p
              ? a.some(b, d)
              : (u(a, function (a, f, g) {
                  if ((e = b.call(d, a, f, g))) return c;
                }),
                e);
        });
    (t.include = t.contains =
      function (a, b) {
        var c = !1;
        return a == null
          ? c
          : q && a.indexOf === q
            ? a.indexOf(b) != -1
            : (v(a, function (a) {
                if ((c = a === b)) return !0;
              }),
              c);
      }),
      (t.invoke = function (a, b) {
        var c = f.call(arguments, 2);
        return t.map(a, function (a) {
          return (b ? a[b] : a).apply(a, c);
        });
      }),
      (t.pluck = function (a, b) {
        return t.map(a, function (a) {
          return a[b];
        });
      }),
      (t.max = function (a, b, c) {
        if (!b && t.isArray(a)) return Math.max.apply(Math, a);
        var d = { computed: -Infinity };
        return (
          u(a, function (a, e, f) {
            (e = b ? b.call(c, a, e, f) : a),
              e >= d.computed && (d = { value: a, computed: e });
          }),
          d.value
        );
      }),
      (t.min = function (a, b, c) {
        if (!b && t.isArray(a)) return Math.min.apply(Math, a);
        var d = { computed: Infinity };
        return (
          u(a, function (a, e, f) {
            (e = b ? b.call(c, a, e, f) : a),
              e < d.computed && (d = { value: a, computed: e });
          }),
          d.value
        );
      }),
      (t.sortBy = function (a, b, c) {
        return t.pluck(
          t
            .map(a, function (a, d, e) {
              return { value: a, criteria: b.call(c, a, d, e) };
            })
            .sort(function (a, b) {
              var c = a.criteria,
                d = b.criteria;
              return c < d ? -1 : c > d ? 1 : 0;
            }),
          "value"
        );
      }),
      (t.sortedIndex = function (a, b, c) {
        c = c || t.identity;
        for (var d = 0, e = a.length; d < e; ) {
          var f = (d + e) >> 1;
          c(a[f]) < c(b) ? (d = f + 1) : (e = f);
        }
        return d;
      }),
      (t.toArray = function (a) {
        return a
          ? a.toArray
            ? a.toArray()
            : t.isArray(a)
              ? a
              : t.isArguments(a)
                ? f.call(a)
                : t.values(a)
          : [];
      }),
      (t.size = function (a) {
        return t.toArray(a).length;
      }),
      (t.first = t.head =
        function (a, b, c) {
          return b && !c ? f.call(a, 0, b) : a[0];
        }),
      (t.rest = t.tail =
        function (a, b, c) {
          return f.call(a, t.isUndefined(b) || c ? 1 : b);
        }),
      (t.last = function (a) {
        return a[a.length - 1];
      }),
      (t.compact = function (a) {
        return t.filter(a, function (a) {
          return !!a;
        });
      }),
      (t.flatten = function (a) {
        return t.reduce(
          a,
          function (a, b) {
            return t.isArray(b)
              ? a.concat(t.flatten(b))
              : ((a[a.length] = b), a);
          },
          []
        );
      }),
      (t.without = function (a) {
        var b = f.call(arguments, 1);
        return t.filter(a, function (a) {
          return !t.include(b, a);
        });
      }),
      (t.uniq = t.unique =
        function (a, b) {
          return t.reduce(
            a,
            function (a, c, d) {
              if (0 == d || (b === !0 ? t.last(a) != c : !t.include(a, c)))
                a[a.length] = c;
              return a;
            },
            []
          );
        }),
      (t.intersect = function (a) {
        var b = f.call(arguments, 1);
        return t.filter(t.uniq(a), function (a) {
          return t.every(b, function (b) {
            return t.indexOf(b, a) >= 0;
          });
        });
      }),
      (t.zip = function () {
        for (
          var a = f.call(arguments),
            b = t.max(t.pluck(a, "length")),
            c = Array(b),
            d = 0;
          d < b;
          d++
        )
          c[d] = t.pluck(a, "" + d);
        return c;
      }),
      (t.indexOf = function (a, b, c) {
        if (a == null) return -1;
        if (c) return (c = t.sortedIndex(a, b)), a[c] === b ? c : -1;
        if (q && a.indexOf === q) return a.indexOf(b);
        c = 0;
        for (var d = a.length; c < d; c++) if (a[c] === b) return c;
        return -1;
      }),
      (t.lastIndexOf = function (a, b) {
        if (a == null) return -1;
        if (r && a.lastIndexOf === r) return a.lastIndexOf(b);
        for (var c = a.length; c--; ) if (a[c] === b) return c;
        return -1;
      }),
      (t.range = function (a, b, c) {
        var d = f.call(arguments),
          e = d.length <= 1;
        (a = e ? 0 : d[0]),
          (b = e ? d[0] : d[1]),
          (c = d[2] || 1),
          (d = Math.max(Math.ceil((b - a) / c), 0)),
          (e = 0);
        for (var g = Array(d); e < d; ) (g[e++] = a), (a += c);
        return g;
      }),
      (t.bind = function (a, b) {
        var c = f.call(arguments, 2);
        return function () {
          return a.apply(b || {}, c.concat(f.call(arguments)));
        };
      }),
      (t.bindAll = function (a) {
        var b = f.call(arguments, 1);
        return (
          b.length == 0 && (b = t.functions(a)),
          u(b, function (b) {
            a[b] = t.bind(a[b], a);
          }),
          a
        );
      }),
      (t.memoize = function (a, b) {
        var c = {};
        return (
          (b = b || t.identity),
          function () {
            var d = b.apply(this, arguments);
            return d in c ? c[d] : (c[d] = a.apply(this, arguments));
          }
        );
      }),
      (t.delay = function (a, b) {
        var c = f.call(arguments, 2);
        return setTimeout(function () {
          return a.apply(a, c);
        }, b);
      }),
      (t.defer = function (a) {
        return t.delay.apply(t, [a, 1].concat(f.call(arguments, 1)));
      });
    var w = function (a, b, c) {
      var d;
      return function () {
        var e = this,
          f = arguments,
          g = function () {
            (d = null), a.apply(e, f);
          };
        c && clearTimeout(d);
        if (c || !d) d = setTimeout(g, b);
      };
    };
    (t.throttle = function (a, b) {
      return w(a, b, !1);
    }),
      (t.debounce = function (a, b) {
        return w(a, b, !0);
      }),
      (t.wrap = function (a, b) {
        return function () {
          var c = [a].concat(f.call(arguments));
          return b.apply(this, c);
        };
      }),
      (t.compose = function () {
        var a = f.call(arguments);
        return function () {
          for (var b = f.call(arguments), c = a.length - 1; c >= 0; c--)
            b = [a[c].apply(this, b)];
          return b[0];
        };
      }),
      (t.keys =
        s ||
        function (a) {
          if (t.isArray(a)) return t.range(0, a.length);
          var b = [],
            c;
          for (c in a) i.call(a, c) && (b[b.length] = c);
          return b;
        }),
      (t.values = function (a) {
        return t.map(a, t.identity);
      }),
      (t.functions = t.methods =
        function (a) {
          return t
            .filter(t.keys(a), function (b) {
              return t.isFunction(a[b]);
            })
            .sort();
        }),
      (t.extend = function (a) {
        return (
          u(f.call(arguments, 1), function (b) {
            for (var c in b) a[c] = b[c];
          }),
          a
        );
      }),
      (t.clone = function (a) {
        return t.isArray(a) ? a.slice() : t.extend({}, a);
      }),
      (t.tap = function (a, b) {
        return b(a), a;
      }),
      (t.isEqual = function (a, b) {
        if (a === b) return !0;
        var c = typeof a;
        if (c != typeof b) return !1;
        if (a == b) return !0;
        if ((!a && b) || (a && !b)) return !1;
        a._chain && (a = a._wrapped), b._chain && (b = b._wrapped);
        if (a.isEqual) return a.isEqual(b);
        if (t.isDate(a) && t.isDate(b)) return a.getTime() === b.getTime();
        if (t.isNaN(a) && t.isNaN(b)) return !1;
        if (t.isRegExp(a) && t.isRegExp(b))
          return (
            a.source === b.source &&
            a.global === b.global &&
            a.ignoreCase === b.ignoreCase &&
            a.multiline === b.multiline
          );
        if (c !== "object") return !1;
        if (a.length && a.length !== b.length) return !1;
        c = t.keys(a);
        var d = t.keys(b);
        if (c.length != d.length) return !1;
        for (var e in a) if (!(e in b) || !t.isEqual(a[e], b[e])) return !1;
        return !0;
      }),
      (t.isEmpty = function (a) {
        if (t.isArray(a) || t.isString(a)) return a.length === 0;
        for (var b in a) if (i.call(a, b)) return !1;
        return !0;
      }),
      (t.isElement = function (a) {
        return !!a && a.nodeType == 1;
      }),
      (t.isArray =
        e ||
        function (a) {
          return h.call(a) === "[object Array]";
        }),
      (t.isArguments = function (a) {
        return !!a && !!i.call(a, "callee");
      }),
      (t.isFunction = function (a) {
        return !!(a && a.constructor && a.call && a.apply);
      }),
      (t.isString = function (a) {
        return !!(a === "" || (a && a.charCodeAt && a.substr));
      }),
      (t.isNumber = function (a) {
        return !!(a === 0 || (a && a.toExponential && a.toFixed));
      }),
      (t.isNaN = function (a) {
        return a !== a;
      }),
      (t.isBoolean = function (a) {
        return a === !0 || a === !1;
      }),
      (t.isDate = function (a) {
        return !!(a && a.getTimezoneOffset && a.setUTCFullYear);
      }),
      (t.isRegExp = function (a) {
        return !(
          !(a && a.test && a.exec) ||
          (!a.ignoreCase && a.ignoreCase !== !1)
        );
      }),
      (t.isNull = function (a) {
        return a === null;
      }),
      (t.isUndefined = function (a) {
        return a === void 0;
      }),
      (t.noConflict = function () {
        return (a._ = b), this;
      }),
      (t.identity = function (a) {
        return a;
      }),
      (t.times = function (a, b, c) {
        for (var d = 0; d < a; d++) b.call(c, d);
      }),
      (t.mixin = function (a) {
        u(t.functions(a), function (b) {
          A(b, (t[b] = a[b]));
        });
      });
    var x = 0;
    (t.uniqueId = function (a) {
      var b = x++;
      return a ? a + b : b;
    }),
      (t.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
      }),
      (t.template = function (a, b) {
        var c = t.templateSettings;
        return (
          (c =
            "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" +
            a
              .replace(/\\/g, "\\\\")
              .replace(/'/g, "\\'")
              .replace(c.interpolate, function (a, b) {
                return "'," + b.replace(/\\'/g, "'") + ",'";
              })
              .replace(c.evaluate || null, function (a, b) {
                return (
                  "');" +
                  b.replace(/\\'/g, "'").replace(/[\r\n\t]/g, " ") +
                  "__p.push('"
                );
              })
              .replace(/\r/g, "\\r")
              .replace(/\n/g, "\\n")
              .replace(/\t/g, "\\t") +
            "');}return __p.join('');"),
          (c = Function("obj", c)),
          b ? c(b) : c
        );
      });
    var y = function (a) {
      this._wrapped = a;
    };
    t.prototype = y.prototype;
    var z = function (a, b) {
        return b ? t(a).chain() : a;
      },
      A = function (a, b) {
        y.prototype[a] = function () {
          var a = f.call(arguments);
          return g.call(a, this._wrapped), z(b.apply(t, a), this._chain);
        };
      };
    t.mixin(t),
      u(
        ["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
        function (a) {
          var b = d[a];
          y.prototype[a] = function () {
            return (
              b.apply(this._wrapped, arguments), z(this._wrapped, this._chain)
            );
          };
        }
      ),
      u(["concat", "join", "slice"], function (a) {
        var b = d[a];
        y.prototype[a] = function () {
          return z(b.apply(this._wrapped, arguments), this._chain);
        };
      }),
      (y.prototype.chain = function () {
        return (this._chain = !0), this;
      }),
      (y.prototype.value = function () {
        return this._wrapped;
      });
  })(),
  (function (a) {
    function b(a) {
      return J.letter.test(a);
    }
    function c(a) {
      return (a = a.charCodeAt(0)), a >= 48 && a <= 57;
    }
    function d(a) {
      return c(a) || b(a);
    }
    function e(a) {
      return J.non_spacing_mark.test(a) || J.space_combining_mark.test(a);
    }
    function f(a) {
      return J.connector_punctuation.test(a);
    }
    function g(a) {
      return a == "$" || a == "_" || b(a);
    }
    function h(a) {
      return g(a) || e(a) || c(a) || f(a) || a == "‌" || a == "‍";
    }
    function i(a) {
      if (B.test(a)) return parseInt(a.substr(2), 16);
      if (C.test(a)) return parseInt(a.substr(1), 8);
      if (D.test(a)) return parseFloat(a);
    }
    function j(a, b, c, d) {
      (this.message = a),
        (this.line = b + 1),
        (this.col = c + 1),
        (this.pos = d + 1),
        (this.stack = Error().stack);
    }
    function k(a, b, c, d) {}
    function l(a, b, c) {
      return a.type == b && (c == null || a.value == c);
    }
    function m(a) {
      function b() {
        return P.text.charAt(P.pos);
      }
      function e(a, b) {
        var c = P.text.charAt(P.pos++);
        if (a && !c) throw K;
        return (
          c == "\n"
            ? ((P.newline_before = P.newline_before || !b),
              ++P.line,
              (P.col = 0))
            : ++P.col,
          c
        );
      }
      function f() {
        return !P.peek();
      }
      function j(a, b) {
        var c = P.text.indexOf(a, P.pos);
        if (b && c == -1) throw K;
        return c;
      }
      function l() {
        (P.tokline = P.line), (P.tokcol = P.col), (P.tokpos = P.pos);
      }
      function m(a, b, c) {
        P.regex_allowed =
          (a == "operator" && !v(M, b)) ||
          (a == "keyword" && v(y, b)) ||
          (a == "punc" && v(G, b));
        var d = {
          type: a,
          value: b,
          line: P.tokline,
          col: P.tokcol,
          pos: P.tokpos,
          endpos: P.pos,
          nlb: P.newline_before,
        };
        return (
          c ||
            ((d.comments_before = P.comments_before), (P.comments_before = [])),
          (P.newline_before = !1),
          d
        );
      }
      function n() {
        while (v(F, b())) e();
      }
      function o(a) {
        var c = "",
          d = b(),
          f = 0;
        while (d && a(d, f++)) (c += e()), (d = b());
        return c;
      }
      function p(a) {
        k(a, P.tokline, P.tokcol, P.tokpos);
      }
      function q(a) {
        var b = !1,
          c = !1,
          e = !1,
          f = a == ".",
          g = o(function (g, h) {
            return g == "x" || g == "X"
              ? e
                ? !1
                : (e = !0)
              : !!e || (g != "E" && g != "e")
                ? g == "-"
                  ? c || (h == 0 && !a)
                    ? !0
                    : !1
                  : g == "+"
                    ? c
                    : ((c = !1), g == "." ? (!f && !e ? (f = !0) : !1) : d(g))
                : b
                  ? !1
                  : (b = c = !0);
          });
        a && (g = a + g);
        var h = i(g);
        if (!isNaN(h)) return m("num", h);
        p("Invalid syntax: " + g);
      }
      function r(a) {
        var b = e(!0, a);
        switch (b) {
          case "n":
            return "\n";
          case "r":
            return "\r";
          case "t":
            return "\t";
          case "b":
            return "\b";
          case "v":
            return "";
          case "f":
            return "\f";
          case "0":
            return "\0";
          case "x":
            return String.fromCharCode(s(2));
          case "u":
            return String.fromCharCode(s(4));
          case "\n":
            return "";
          default:
            return b;
        }
      }
      function s(a) {
        var b = 0;
        for (; a > 0; --a) {
          var c = parseInt(e(!0), 16);
          isNaN(c) && p("Invalid hex-character pattern in string"),
            (b = (b << 4) | c);
        }
        return b;
      }
      function t() {
        return N("Unterminated string constant", function () {
          var a = e(),
            b = "";
          for (;;) {
            var c = e(!0);
            if (c == "\\") {
              var d = 0,
                f = null;
              (c = o(function (a) {
                if (a >= "0" && a <= "7") {
                  if (!f) return (f = a), ++d;
                  if (f <= "3" && d <= 2) return ++d;
                  if (f >= "4" && d <= 1) return ++d;
                }
                return !1;
              })),
                d > 0 ? (c = String.fromCharCode(parseInt(c, 8))) : (c = r(!0));
            } else if (c == a) break;
            b += c;
          }
          return m("string", b);
        });
      }
      function u() {
        e();
        var a = j("\n"),
          b;
        return (
          a == -1
            ? ((b = P.text.substr(P.pos)), (P.pos = P.text.length))
            : ((b = P.text.substring(P.pos, a)), (P.pos = a)),
          m("comment1", b, !0)
        );
      }
      function x() {
        return (
          e(),
          N("Unterminated multiline comment", function () {
            var a = j("*/", !0),
              b = P.text.substring(P.pos, a);
            return (
              (P.pos = a + 2),
              (P.line += b.split("\n").length - 1),
              (P.newline_before = b.indexOf("\n") >= 0),
              /^@cc_on/i.test(b) &&
                (R("WARNING: at line " + P.line),
                R('*** Found "conditional comment": ' + b),
                R(
                  "*** UglifyJS DISCARDS ALL COMMENTS.  This means your code might no longer work properly in Internet Explorer."
                )),
              m("comment2", b, !0)
            );
          })
        );
      }
      function B() {
        var a = !1,
          c = "",
          d;
        while ((d = b()) != null)
          if (!a)
            if (d == "\\") (a = !0), e();
            else {
              if (!h(d)) break;
              c += e();
            }
          else
            d != "u" && p("Expecting UnicodeEscapeSequence -- uXXXX"),
              (d = r()),
              h(d) ||
                p(
                  "Unicode char: " +
                    d.charCodeAt(0) +
                    " is not valid in identifier"
                ),
              (c += d),
              (a = !1);
        return c;
      }
      function C(a) {
        return N("Unterminated regular expression", function () {
          var b = !1,
            c,
            d = !1;
          while ((c = e(!0)))
            if (b) (a += "\\" + c), (b = !1);
            else if (c == "[") (d = !0), (a += c);
            else if (c == "]" && d) (d = !1), (a += c);
            else {
              if (c == "/" && !d) break;
              c == "\\" ? (b = !0) : (a += c);
            }
          var f = B();
          return m("regexp", [a, f]);
        });
      }
      function D(a) {
        function c(a) {
          if (!b()) return a;
          var d = a + b();
          return v(E, d) ? (e(), c(d)) : a;
        }
        return m("operator", c(a || e()));
      }
      function I() {
        e();
        var a = P.regex_allowed;
        switch (b()) {
          case "/":
            return P.comments_before.push(u()), (P.regex_allowed = a), O();
          case "*":
            return P.comments_before.push(x()), (P.regex_allowed = a), O();
        }
        return P.regex_allowed ? C("") : D("/");
      }
      function J() {
        return e(), c(b()) ? q(".") : m("punc", ".");
      }
      function L() {
        var a = B();
        return v(w, a)
          ? v(E, a)
            ? m("operator", a)
            : v(z, a)
              ? m("atom", a)
              : m("keyword", a)
          : m("name", a);
      }
      function N(a, b) {
        try {
          return b();
        } catch (c) {
          if (c !== K) throw c;
          p(a);
        }
      }
      function O(a) {
        if (a != null) return C(a);
        n(), l();
        var d = b();
        if (!d) return m("eof");
        if (c(d)) return q();
        if (d == '"' || d == "'") return t();
        if (v(H, d)) return m("punc", e());
        if (d == ".") return J();
        if (d == "/") return I();
        if (v(A, d)) return D();
        if (d == "\\" || g(d)) return L();
        p("Unexpected character '" + d + "'");
      }
      var P = {
        text: a.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/^\uFEFF/, ""),
        pos: 0,
        tokpos: 0,
        line: 0,
        tokline: 0,
        col: 0,
        tokcol: 0,
        newline_before: !1,
        regex_allowed: !1,
        comments_before: [],
      };
      return (
        (O.context = function (a) {
          return a && (P = a), P;
        }),
        O
      );
    }
    function n(a, b, c) {
      (this.name = a), (this.start = b), (this.end = c);
    }
    function o(a, b, c) {
      function d(a, b) {
        return l(jb.token, a, b);
      }
      function e() {
        return jb.peeked || (jb.peeked = jb.input());
      }
      function f() {
        return (
          (jb.prev = jb.token),
          jb.peeked
            ? ((jb.token = jb.peeked), (jb.peeked = null))
            : (jb.token = jb.input()),
          jb.token
        );
      }
      function g() {
        return jb.prev;
      }
      function h(a, b, c, d) {
        var e = jb.input.context();
        k(
          a,
          b != null ? b : e.tokline,
          c != null ? c : e.tokcol,
          d != null ? d : e.tokpos
        );
      }
      function i(a, b) {
        h(b, a.line, a.col);
      }
      function j(a) {
        a == null && (a = jb.token),
          i(a, "Unexpected token: " + a.type + " (" + a.value + ")");
      }
      function o(a, b) {
        if (d(a, b)) return f();
        i(jb.token, "Unexpected token " + jb.token.type + ", expected " + a);
      }
      function r(a) {
        return o("punc", a);
      }
      function t() {
        return !b && (jb.token.nlb || d("eof") || d("punc", "}"));
      }
      function w() {
        d("punc", ";") ? f() : t() || j();
      }
      function x() {
        return s(arguments);
      }
      function y() {
        r("(");
        var a = ob();
        return r(")"), a;
      }
      function z(a, b, c) {
        return a instanceof n ? a : new n(a, b, c);
      }
      function A(a) {
        return c
          ? function () {
              var b = jb.token,
                c = a.apply(this, arguments);
              return (c[0] = z(c[0], b, g())), c;
            }
          : a;
      }
      function B(a) {
        jb.labels.push(a);
        var c = jb.token,
          d = kb();
        return b && !v(P, d[0]) && j(c), jb.labels.pop(), x("label", a, d);
      }
      function C() {
        return x("stat", q(ob, w));
      }
      function D(a) {
        var b;
        return (
          t() || (b = d("name") ? jb.token.value : null),
          b != null
            ? (f(),
              u(b, jb.labels) ||
                h("Label " + b + " without matching loop or statement"))
            : jb.in_loop == 0 && h(a + " not inside a loop or switch"),
          w(),
          x(a, b)
        );
      }
      function E() {
        r("(");
        var a = null;
        if (!d("punc", ";")) {
          a = d("keyword", "var") ? (f(), R(!0)) : ob(!0, !0);
          if (d("operator", "in"))
            return (
              a[0] == "var" &&
                a[1].length > 1 &&
                h("Only one variable declaration allowed in for..in loop"),
              G(a)
            );
        }
        return F(a);
      }
      function F(a) {
        r(";");
        var b = d("punc", ";") ? null : ob();
        r(";");
        var c = d("punc", ")") ? null : ob();
        return r(")"), x("for", a, b, c, ib(kb));
      }
      function G(a) {
        var b = a[0] == "var" ? x("name", a[1][0]) : a;
        f();
        var c = ob();
        return r(")"), x("for-in", a, b, c, ib(kb));
      }
      function H() {
        var a = y(),
          b = kb(),
          c;
        return d("keyword", "else") && (f(), (c = kb())), x("if", a, b, c);
      }
      function I() {
        r("{");
        var a = [];
        while (!d("punc", "}")) d("eof") && j(), a.push(kb());
        return f(), a;
      }
      function J() {
        var a = I(),
          b,
          c;
        if (d("keyword", "catch")) {
          f(), r("("), d("name") || h("Name expected");
          var e = jb.token.value;
          f(), r(")"), (b = [e, I()]);
        }
        return (
          d("keyword", "finally") && (f(), (c = I())),
          !b && !c && h("Missing catch/finally blocks"),
          x("try", a, b, c)
        );
      }
      function K(a) {
        var b = [];
        for (;;) {
          d("name") || j();
          var c = jb.token.value;
          f(), d("operator", "=") ? (f(), b.push([c, ob(!1, a)])) : b.push([c]);
          if (!d("punc", ",")) break;
          f();
        }
        return b;
      }
      function R(a) {
        return x("var", K(a));
      }
      function S() {
        return x("const", K());
      }
      function V() {
        var a = nb(!1),
          b;
        return (
          d("punc", "(") ? (f(), (b = W(")"))) : (b = []),
          ab(x("new", a, b), !0)
        );
      }
      function W(a, b, c) {
        var e = !0,
          g = [];
        while (!d("punc", a)) {
          e ? (e = !1) : r(",");
          if (b && d("punc", a)) break;
          d("punc", ",") && c ? g.push(["atom", "undefined"]) : g.push(ob(!1));
        }
        return f(), g;
      }
      function X() {
        return x("array", W("]", !b, !0));
      }
      function Y() {
        var a = !0,
          c = [];
        while (!d("punc", "}")) {
          a ? (a = !1) : r(",");
          if (!b && d("punc", "}")) break;
          var e = jb.token.type,
            g = Z();
          e != "name" || (g != "get" && g != "set") || !!d("punc", ":")
            ? (r(":"), c.push([g, ob(!1)]))
            : c.push([$(), lb(!1), g]);
        }
        return f(), x("object", c);
      }
      function Z() {
        switch (jb.token.type) {
          case "num":
          case "string":
            return q(jb.token.value, f);
        }
        return $();
      }
      function $() {
        switch (jb.token.type) {
          case "name":
          case "operator":
          case "keyword":
          case "atom":
            return q(jb.token.value, f);
          default:
            j();
        }
      }
      function ab(a, b) {
        return d("punc", ".")
          ? (f(), ab(x("dot", a, $()), b))
          : d("punc", "[")
            ? (f(), ab(x("sub", a, q(ob, p(r, "]"))), b))
            : b && d("punc", "(")
              ? (f(), ab(x("call", a, W(")")), !0))
              : a;
      }
      function bb(a) {
        if (d("operator") && v(L, jb.token.value))
          return cb("unary-prefix", q(jb.token.value, f), bb(a));
        var b = nb(a);
        while (d("operator") && v(M, jb.token.value) && !jb.token.nlb)
          (b = cb("unary-postfix", jb.token.value, b)), f();
        return b;
      }
      function cb(a, b, c) {
        return (
          (b == "++" || b == "--") &&
            !gb(c) &&
            h("Invalid use of " + b + " operator"),
          x(a, b, c)
        );
      }
      function db(a, b, c) {
        var e = d("operator") ? jb.token.value : null;
        e && e == "in" && c && (e = null);
        var g = e != null ? O[e] : null;
        if (g != null && g > b) {
          f();
          var h = db(bb(!0), g, c);
          return db(x("binary", e, a, h), b, c);
        }
        return a;
      }
      function eb(a) {
        return db(bb(!0), 0, a);
      }
      function fb(a) {
        var b = eb(a);
        if (d("operator", "?")) {
          f();
          var c = ob(!1);
          return r(":"), x("conditional", b, c, ob(!1, a));
        }
        return b;
      }
      function gb(a) {
        if (!b) return !0;
        switch (a[0] + "") {
          case "dot":
          case "sub":
          case "new":
          case "call":
            return !0;
          case "name":
            return a[1] != "this";
        }
      }
      function hb(a) {
        var b = fb(a),
          c = jb.token.value;
        if (d("operator") && v(N, c)) {
          if (gb(b)) return f(), x("assign", N[c], b, hb(a));
          h("Invalid assignment");
        }
        return b;
      }
      function ib(a) {
        try {
          return ++jb.in_loop, a();
        } catch (b) {
        } finally {
          --jb.in_loop;
        }
      }
      var jb = {
        input: typeof a == "string" ? m(a, !0) : a,
        token: null,
        prev: null,
        peeked: null,
        in_function: 0,
        in_loop: 0,
        labels: [],
      };
      jb.token = f();
      var kb = A(function () {
          if (d("operator", "/") || d("operator", "/="))
            (jb.peeked = null), (jb.token = jb.input(jb.token.value.substr(1)));
          switch (jb.token.type) {
            case "num":
            case "string":
            case "regexp":
            case "operator":
            case "atom":
              return C();
            case "name":
              return l(e(), "punc", ":") ? B(q(jb.token.value, f, f)) : C();
            case "punc":
              switch (jb.token.value) {
                case "{":
                  return x("block", I());
                case "[":
                case "(":
                  return C();
                case ";":
                  return f(), x("block");
                default:
                  j();
              }
            case "keyword":
              switch (q(jb.token.value, f)) {
                case "break":
                  return D("break");
                case "continue":
                  return D("continue");
                case "debugger":
                  return w(), x("debugger");
                case "do":
                  return (function (a) {
                    return o("keyword", "while"), x("do", q(y, w), a);
                  })(ib(kb));
                case "for":
                  return E();
                case "function":
                  return lb(!0);
                case "if":
                  return H();
                case "return":
                  return (
                    jb.in_function == 0 && h("'return' outside of function"),
                    x(
                      "return",
                      d("punc", ";") ? (f(), null) : t() ? null : q(ob, w)
                    )
                  );
                case "switch":
                  return x("switch", y(), mb());
                case "throw":
                  return (
                    jb.token.nlb && h("Illegal newline after 'throw'"),
                    x("throw", q(ob, w))
                  );
                case "try":
                  return J();
                case "var":
                  return q(R, w);
                case "const":
                  return q(S, w);
                case "while":
                  return x("while", y(), ib(kb));
                case "with":
                  return x("with", y(), kb());
                default:
                  j();
              }
          }
        }),
        lb = function (a) {
          var b = d("name") ? q(jb.token.value, f) : null;
          return (
            a && !b && j(),
            r("("),
            x(
              a ? "defun" : "function",
              b,
              (function (a, b) {
                while (!d("punc", ")"))
                  a ? (a = !1) : r(","),
                    d("name") || j(),
                    b.push(jb.token.value),
                    f();
                return f(), b;
              })(!0, []),
              (function () {
                ++jb.in_function;
                var a = jb.in_loop;
                jb.in_loop = 0;
                var b = I();
                return --jb.in_function, (jb.in_loop = a), b;
              })()
            )
          );
        },
        mb = p(ib, function () {
          r("{");
          var a = [],
            b = null;
          while (!d("punc", "}"))
            d("eof") && j(),
              d("keyword", "case")
                ? (f(), (b = []), a.push([ob(), b]), r(":"))
                : d("keyword", "default")
                  ? (f(), r(":"), (b = []), a.push([null, b]))
                  : (b || j(), b.push(kb()));
          return f(), a;
        }),
        nb = A(function (a) {
          if (d("operator", "new")) return f(), V();
          if (d("punc")) {
            switch (jb.token.value) {
              case "(":
                return f(), ab(q(ob, p(r, ")")), a);
              case "[":
                return f(), ab(X(), a);
              case "{":
                return f(), ab(Y(), a);
            }
            j();
          }
          if (d("keyword", "function")) return f(), ab(lb(!1), a);
          if (v(Q, jb.token.type)) {
            var b =
              jb.token.type == "regexp"
                ? x("regexp", jb.token.value[0], jb.token.value[1])
                : x(jb.token.type, jb.token.value);
            return ab(q(b, f), a);
          }
          j();
        }),
        ob = A(function (a, b) {
          arguments.length == 0 && (a = !0);
          var c = hb(b);
          return a && d("punc", ",") ? (f(), x("seq", c, ob(!0, b))) : c;
        });
      return x(
        "toplevel",
        (function (a) {
          while (!d("eof")) a.push(kb());
          return a;
        })([])
      );
    }
    function p(a) {
      var b = s(arguments, 1);
      return function () {
        return a.apply(this, b.concat(s(arguments)));
      };
    }
    function q(a) {
      a instanceof Function && (a = a());
      for (var b = 1, c = arguments.length; --c > 0; ++b) arguments[b]();
      return a;
    }
    function r(a) {
      var b = {};
      for (var c = 0; c < a.length; ++c) b[a[c]] = !0;
      return b;
    }
    function s(a, b) {
      return Array.prototype.slice.call(a, b || 0);
    }
    function t(a) {
      return a.split("");
    }
    function u(a, b) {
      for (var c = b.length; --c >= 0; ) if (b[c] == a) return !0;
      return !1;
    }
    function v(a, b) {
      return Object.prototype.hasOwnProperty.call(a, b);
    }
    var w = r([
        "break",
        "case",
        "catch",
        "const",
        "continue",
        "debugger",
        "default",
        "delete",
        "do",
        "else",
        "finally",
        "for",
        "function",
        "if",
        "in",
        "instanceof",
        "new",
        "return",
        "switch",
        "throw",
        "try",
        "typeof",
        "var",
        "void",
        "while",
        "with",
      ]),
      x = r([
        "abstract",
        "boolean",
        "byte",
        "char",
        "class",
        "double",
        "enum",
        "export",
        "extends",
        "final",
        "float",
        "goto",
        "implements",
        "import",
        "int",
        "interface",
        "long",
        "native",
        "package",
        "private",
        "protected",
        "public",
        "short",
        "static",
        "super",
        "synchronized",
        "throws",
        "transient",
        "volatile",
      ]),
      y = r(["return", "new", "delete", "throw", "else", "case"]),
      z = r(["false", "null", "true", "undefined"]),
      A = r(t("+-*&%=<>!?|~^")),
      B = /^0x[0-9a-f]+$/i,
      C = /^0[0-7]+$/,
      D = /^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i,
      E = r([
        "in",
        "instanceof",
        "typeof",
        "new",
        "void",
        "delete",
        "++",
        "--",
        "+",
        "-",
        "!",
        "~",
        "&",
        "|",
        "^",
        "*",
        "/",
        "%",
        ">>",
        "<<",
        ">>>",
        "<",
        ">",
        "<=",
        ">=",
        "==",
        "===",
        "!=",
        "!==",
        "?",
        "=",
        "+=",
        "-=",
        "/=",
        "*=",
        "%=",
        ">>=",
        "<<=",
        ">>>=",
        "|=",
        "^=",
        "&=",
        "&&",
        "||",
      ]),
      F = r(t("  \n\r\t\f​᠎             　")),
      G = r(t("[{}(,.;:")),
      H = r(t("[]{}(),;:")),
      I = r(t("gmsiy")),
      J = {
        letter: RegExp(
          "[\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u0523\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0621-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971\\u0972\\u097B-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D28\\u0D2A-\\u0D39\\u0D3D\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC\\u0EDD\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8B\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10D0-\\u10FA\\u10FC\\u1100-\\u1159\\u115F-\\u11A2\\u11A8-\\u11F9\\u1200-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u1676\\u1681-\\u169A\\u16A0-\\u16EA\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19A9\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u2094\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2183\\u2184\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2C6F\\u2C71-\\u2C7D\\u2C80-\\u2CE4\\u2D00-\\u2D25\\u2D30-\\u2D65\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005\\u3006\\u3031-\\u3035\\u303B\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31B7\\u31F0-\\u31FF\\u3400\\u4DB5\\u4E00\\u9FC3\\uA000-\\uA48C\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA65F\\uA662-\\uA66E\\uA67F-\\uA697\\uA717-\\uA71F\\uA722-\\uA788\\uA78B\\uA78C\\uA7FB-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA90A-\\uA925\\uA930-\\uA946\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAC00\\uD7A3\\uF900-\\uFA2D\\uFA30-\\uFA6A\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"
        ),
        non_spacing_mark: RegExp(
          "[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065E\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0900-\\u0902\\u093C\\u0941-\\u0948\\u094D\\u0951-\\u0955\\u0962\\u0963\\u0981\\u09BC\\u09C1-\\u09C4\\u09CD\\u09E2\\u09E3\\u0A01\\u0A02\\u0A3C\\u0A41\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81\\u0A82\\u0ABC\\u0AC1-\\u0AC5\\u0AC7\\u0AC8\\u0ACD\\u0AE2\\u0AE3\\u0B01\\u0B3C\\u0B3F\\u0B41-\\u0B44\\u0B4D\\u0B56\\u0B62\\u0B63\\u0B82\\u0BC0\\u0BCD\\u0C3E-\\u0C40\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0CBC\\u0CBF\\u0CC6\\u0CCC\\u0CCD\\u0CE2\\u0CE3\\u0D41-\\u0D44\\u0D4D\\u0D62\\u0D63\\u0DCA\\u0DD2-\\u0DD4\\u0DD6\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F71-\\u0F7E\\u0F80-\\u0F84\\u0F86\\u0F87\\u0F90-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102D-\\u1030\\u1032-\\u1037\\u1039\\u103A\\u103D\\u103E\\u1058\\u1059\\u105E-\\u1060\\u1071-\\u1074\\u1082\\u1085\\u1086\\u108D\\u109D\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B7-\\u17BD\\u17C6\\u17C9-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u1922\\u1927\\u1928\\u1932\\u1939-\\u193B\\u1A17\\u1A18\\u1A56\\u1A58-\\u1A5E\\u1A60\\u1A62\\u1A65-\\u1A6C\\u1A73-\\u1A7C\\u1A7F\\u1B00-\\u1B03\\u1B34\\u1B36-\\u1B3A\\u1B3C\\u1B42\\u1B6B-\\u1B73\\u1B80\\u1B81\\u1BA2-\\u1BA5\\u1BA8\\u1BA9\\u1C2C-\\u1C33\\u1C36\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE0\\u1CE2-\\u1CE8\\u1CED\\u1DC0-\\u1DE6\\u1DFD-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2DE0-\\u2DFF\\u302A-\\u302F\\u3099\\u309A\\uA66F\\uA67C\\uA67D\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA825\\uA826\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA951\\uA980-\\uA982\\uA9B3\\uA9B6-\\uA9B9\\uA9BC\\uAA29-\\uAA2E\\uAA31\\uAA32\\uAA35\\uAA36\\uAA43\\uAA4C\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uABE5\\uABE8\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE26]"
        ),
        space_combining_mark: RegExp(
          "[\\u0903\\u093E-\\u0940\\u0949-\\u094C\\u094E\\u0982\\u0983\\u09BE-\\u09C0\\u09C7\\u09C8\\u09CB\\u09CC\\u09D7\\u0A03\\u0A3E-\\u0A40\\u0A83\\u0ABE-\\u0AC0\\u0AC9\\u0ACB\\u0ACC\\u0B02\\u0B03\\u0B3E\\u0B40\\u0B47\\u0B48\\u0B4B\\u0B4C\\u0B57\\u0BBE\\u0BBF\\u0BC1\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCC\\u0BD7\\u0C01-\\u0C03\\u0C41-\\u0C44\\u0C82\\u0C83\\u0CBE\\u0CC0-\\u0CC4\\u0CC7\\u0CC8\\u0CCA\\u0CCB\\u0CD5\\u0CD6\\u0D02\\u0D03\\u0D3E-\\u0D40\\u0D46-\\u0D48\\u0D4A-\\u0D4C\\u0D57\\u0D82\\u0D83\\u0DCF-\\u0DD1\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0F3E\\u0F3F\\u0F7F\\u102B\\u102C\\u1031\\u1038\\u103B\\u103C\\u1056\\u1057\\u1062-\\u1064\\u1067-\\u106D\\u1083\\u1084\\u1087-\\u108C\\u108F\\u109A-\\u109C\\u17B6\\u17BE-\\u17C5\\u17C7\\u17C8\\u1923-\\u1926\\u1929-\\u192B\\u1930\\u1931\\u1933-\\u1938\\u19B0-\\u19C0\\u19C8\\u19C9\\u1A19-\\u1A1B\\u1A55\\u1A57\\u1A61\\u1A63\\u1A64\\u1A6D-\\u1A72\\u1B04\\u1B35\\u1B3B\\u1B3D-\\u1B41\\u1B43\\u1B44\\u1B82\\u1BA1\\u1BA6\\u1BA7\\u1BAA\\u1C24-\\u1C2B\\u1C34\\u1C35\\u1CE1\\u1CF2\\uA823\\uA824\\uA827\\uA880\\uA881\\uA8B4-\\uA8C3\\uA952\\uA953\\uA983\\uA9B4\\uA9B5\\uA9BA\\uA9BB\\uA9BD-\\uA9C0\\uAA2F\\uAA30\\uAA33\\uAA34\\uAA4D\\uAA7B\\uABE3\\uABE4\\uABE6\\uABE7\\uABE9\\uABEA\\uABEC]"
        ),
        connector_punctuation: RegExp(
          "[\\u005F\\u203F\\u2040\\u2054\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFF3F]"
        ),
      };
    j.prototype.toString = function () {
      return (
        this.message +
        " (line: " +
        this.line +
        ", col: " +
        this.col +
        ", pos: " +
        this.pos +
        ")" +
        "\n\n" +
        this.stack
      );
    };
    var K = {},
      L = r(["typeof", "void", "delete", "--", "++", "!", "~", "-", "+"]),
      M = r(["--", "++"]),
      N = (function (a, b, c) {
        while (c < a.length) (b[a[c]] = a[c].substr(0, a[c].length - 1)), c++;
        return b;
      })(
        ["+=", "-=", "/=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&="],
        { "=": !0 },
        0
      ),
      O = (function (a, b) {
        for (var c = 0, d = 1; c < a.length; ++c, ++d) {
          var e = a[c];
          for (var f = 0; f < e.length; ++f) b[e[f]] = d;
        }
        return b;
      })(
        [
          ["||"],
          ["&&"],
          ["|"],
          ["^"],
          ["&"],
          ["==", "===", "!=", "!=="],
          ["<", ">", "<=", ">=", "in", "instanceof"],
          [">>", "<<", ">>>"],
          ["+", "-"],
          ["*", "/", "%"],
        ],
        {}
      ),
      P = r(["for", "do", "while", "switch"]),
      Q = r(["atom", "num", "string", "regexp", "name"]);
    n.prototype.toString = function () {
      return this.name;
    };
    var R = function () {},
      S = {};
    (function (a) {
      (a.tokenizer = m),
        (a.parse = o),
        (a.slice = s),
        (a.curry = p),
        (a.member = u),
        (a.array_to_hash = r),
        (a.PRECEDENCE = O),
        (a.KEYWORDS_ATOM = z),
        (a.RESERVED_WORDS = x),
        (a.KEYWORDS = w),
        (a.ATOMIC_START_TOKEN = Q),
        (a.OPERATORS = E),
        (a.is_alphanumeric_char = d),
        (a.set_logger = function (a) {
          R = a;
        });
    })(S),
      (a.parsejs = S);
  })(this),
  (function (a) {
    function b() {
      function a(a) {
        return [
          this[0],
          I(a, function (a) {
            var b = [a[0]];
            return a.length > 1 && (b[1] = c(a[1])), b;
          }),
        ];
      }
      function b(a) {
        var b = [this[0]];
        return a != null && b.push(I(a, c)), b;
      }
      function c(a) {
        if (a == null) return null;
        try {
          h.push(a);
          var b = a[0],
            c = g[b];
          if (c) {
            var d = c.apply(a, a.slice(1));
            if (d != null) return d;
          }
          return (c = f[b]), c.apply(a, a.slice(1));
        } catch (e) {
        } finally {
          h.pop();
        }
      }
      function d(a) {
        if (a == null) return null;
        try {
          return h.push(a), f[a[0]].apply(a, a.slice(1));
        } catch (b) {
        } finally {
          h.pop();
        }
      }
      function e(a, b) {
        var c = {},
          d;
        for (d in a) x(a, d) && ((c[d] = g[d]), (g[d] = a[d]));
        var e = b();
        for (d in c) x(c, d) && (c[d] ? (g[d] = c[d]) : delete g[d]);
        return e;
      }
      var f = {
          string: function (a) {
            return [this[0], a];
          },
          num: function (a) {
            return [this[0], a];
          },
          name: function (a) {
            return [this[0], a];
          },
          toplevel: function (a) {
            return [this[0], I(a, c)];
          },
          block: b,
          splice: b,
          var: a,
          const: a,
          try: function (a, b, d) {
            return [
              this[0],
              I(a, c),
              b != null ? [b[0], I(b[1], c)] : null,
              d != null ? I(d, c) : null,
            ];
          },
          throw: function (a) {
            return [this[0], c(a)];
          },
          new: function (a, b) {
            return [this[0], c(a), I(b, c)];
          },
          switch: function (a, b) {
            return [
              this[0],
              c(a),
              I(b, function (a) {
                return [a[0] ? c(a[0]) : null, I(a[1], c)];
              }),
            ];
          },
          break: function (a) {
            return [this[0], a];
          },
          continue: function (a) {
            return [this[0], a];
          },
          conditional: function (a, b, d) {
            return [this[0], c(a), c(b), c(d)];
          },
          assign: function (a, b, d) {
            return [this[0], a, c(b), c(d)];
          },
          dot: function (a) {
            return [this[0], c(a)].concat(z(arguments, 1));
          },
          call: function (a, b) {
            return [this[0], c(a), I(b, c)];
          },
          function: function (a, b, d) {
            return [this[0], a, b.slice(), I(d, c)];
          },
          debugger: function () {
            return [this[0]];
          },
          defun: function (a, b, d) {
            return [this[0], a, b.slice(), I(d, c)];
          },
          if: function (a, b, d) {
            return [this[0], c(a), c(b), c(d)];
          },
          for: function (a, b, d, e) {
            return [this[0], c(a), c(b), c(d), c(e)];
          },
          "for-in": function (a, b, d, e) {
            return [this[0], c(a), c(b), c(d), c(e)];
          },
          while: function (a, b) {
            return [this[0], c(a), c(b)];
          },
          do: function (a, b) {
            return [this[0], c(a), c(b)];
          },
          return: function (a) {
            return [this[0], c(a)];
          },
          binary: function (a, b, d) {
            return [this[0], a, c(b), c(d)];
          },
          "unary-prefix": function (a, b) {
            return [this[0], a, c(b)];
          },
          "unary-postfix": function (a, b) {
            return [this[0], a, c(b)];
          },
          sub: function (a, b) {
            return [this[0], c(a), c(b)];
          },
          object: function (a) {
            return [
              this[0],
              I(a, function (a) {
                return a.length == 2 ? [a[0], c(a[1])] : [a[0], c(a[1]), a[2]];
              }),
            ];
          },
          regexp: function (a, b) {
            return [this[0], a, b];
          },
          array: function (a) {
            return [this[0], I(a, c)];
          },
          stat: function (a) {
            return [this[0], c(a)];
          },
          seq: function () {
            return [this[0]].concat(I(z(arguments), c));
          },
          label: function (a, b) {
            return [this[0], a, c(b)];
          },
          with: function (a, b) {
            return [this[0], c(a), c(b)];
          },
          atom: function (a) {
            return [this[0], a];
          },
        },
        g = {},
        h = [];
      return {
        walk: c,
        dive: d,
        with_walkers: e,
        parent: function () {
          return h[h.length - 2];
        },
        stack: function () {
          return h;
        },
      };
    }
    function c(a) {
      (this.names = {}),
        (this.mangled = {}),
        (this.rev_mangled = {}),
        (this.cname = -1),
        (this.refs = {}),
        (this.uses_with = !1),
        (this.uses_eval = !1),
        (this.parent = a),
        (this.children = []),
        a
          ? ((this.level = a.level + 1), a.children.push(this))
          : (this.level = 0);
    }
    function d(a) {
      function d(a) {
        (j = new c(j)), (j.labels = new c());
        var b = (j.body = a());
        return (b.scope = j), (j = j.parent), b;
      }
      function e(a, b) {
        return j.define(a, b);
      }
      function f(a) {
        j.refs[a] = !0;
      }
      function g(a, b, c) {
        var f = this[0] == "defun";
        return [
          this[0],
          f ? e(a, "defun") : a,
          b,
          d(function () {
            return (
              f || e(a, "lambda"),
              I(b, function (a) {
                e(a, "arg");
              }),
              I(c, l)
            );
          }),
        ];
      }
      function h(a) {
        return function (b) {
          I(b, function (b) {
            e(b[0], a), b[1] && f(b[0]);
          });
        };
      }
      function i(a) {
        a && (j.labels.refs[a] = !0);
      }
      var j = null,
        k = b(),
        l = k.walk,
        m = [];
      return d(function () {
        function b(a, c) {
          for (c = a.children.length; --c >= 0; ) b(a.children[c]);
          for (c in a.refs)
            if (x(a.refs, c))
              for (var d = a.has(c), e = a; e; e = e.parent) {
                e.refs[c] = d;
                if (e === d) break;
              }
        }
        var c = k.with_walkers(
          {
            function: g,
            defun: g,
            label: function (a, b) {
              j.labels.define(a);
            },
            break: i,
            continue: i,
            with: function (a, b) {
              for (var c = j; c; c = c.parent) c.uses_with = !0;
            },
            var: h("var"),
            const: h("const"),
            try: function (a, b, c) {
              if (b != null)
                return [
                  this[0],
                  I(a, l),
                  [e(b[0], "catch"), I(b[1], l)],
                  c != null ? I(c, l) : null,
                ];
            },
            name: function (a) {
              a == "eval" && m.push(j), f(a);
            },
          },
          function () {
            return l(a);
          }
        );
        return (
          I(m, function (a) {
            if (!a.has("eval")) while (a) (a.uses_eval = !0), (a = a.parent);
          }),
          b(j),
          c
        );
      });
    }
    function e(a, c) {
      function e(a, b) {
        return !c.toplevel && !m.parent
          ? a
          : c.except && A(a, c.except)
            ? a
            : m.get_mangled(a, b);
      }
      function f(a) {
        if (c.defines)
          return !m.has(a) && x(c.defines, a) ? c.defines[a] : null;
      }
      function g(a, b, d) {
        if (!c.no_functions) {
          var f = this[0] == "defun",
            g;
          a &&
            (f
              ? (a = e(a))
              : d.scope.references(a)
                ? ((g = {}),
                  !m.uses_eval && !m.uses_with
                    ? (a = g[a] = m.next_mangled())
                    : (g[a] = a))
                : (a = null));
        }
        return (
          (d = h(
            d.scope,
            function () {
              return (
                (b = I(b, function (a) {
                  return e(a);
                })),
                I(d, l)
              );
            },
            g
          )),
          [this[0], a, b, d]
        );
      }
      function h(a, b, c) {
        var d = m;
        m = a;
        if (c) for (var f in c) x(c, f) && a.set_mangle(f, c[f]);
        for (var f in a.names) x(a.names, f) && e(f, !0);
        var g = b();
        return (g.scope = a), (m = d), g;
      }
      function i(a) {
        return [
          this[0],
          I(a, function (a) {
            return [e(a[0]), l(a[1])];
          }),
        ];
      }
      function j(a) {
        if (a) return [this[0], m.labels.get_mangled(a)];
      }
      var k = b(),
        l = k.walk,
        m;
      return (
        (c = c || {}),
        k.with_walkers(
          {
            function: g,
            defun: function () {
              var a = g.apply(this, arguments);
              switch (k.parent()[0]) {
                case "toplevel":
                case "function":
                case "defun":
                  return I.at_top(a);
              }
              return a;
            },
            label: function (a, b) {
              return m.labels.refs[a]
                ? [this[0], m.labels.get_mangled(a, !0), l(b)]
                : l(b);
            },
            break: j,
            continue: j,
            var: i,
            const: i,
            name: function (a) {
              return f(a) || [this[0], e(a)];
            },
            try: function (a, b, c) {
              return [
                this[0],
                I(a, l),
                b != null ? [e(b[0]), I(b[1], l)] : null,
                c != null ? I(c, l) : null,
              ];
            },
            toplevel: function (a) {
              var b = this;
              return h(b.scope, function () {
                return [b[0], I(a, l)];
              });
            },
          },
          function () {
            return l(d(a));
          }
        )
      );
    }
    function f(a, b) {
      return s(a).length > s(b[0] == "stat" ? b[1] : b).length ? b : a;
    }
    function g(a) {
      return a[0] == "block" && a[1] && a[1].length > 0
        ? a[1][a[1].length - 1]
        : a;
    }
    function h(a) {
      if (a)
        switch (g(a)[0]) {
          case "return":
          case "break":
          case "continue":
          case "throw":
            return !0;
        }
    }
    function i(a) {
      return (
        (a[0] == "unary-prefix" && A(a[1], ["!", "delete"])) ||
        (a[0] == "binary" &&
          A(a[1], [
            "in",
            "instanceof",
            "==",
            "!=",
            "===",
            "!==",
            "<",
            "<=",
            ">=",
            ">",
          ])) ||
        (a[0] == "binary" && A(a[1], ["&&", "||"]) && i(a[2]) && i(a[3])) ||
        (a[0] == "conditional" && i(a[2]) && i(a[3])) ||
        (a[0] == "assign" && a[1] === !0 && i(a[3])) ||
        (a[0] == "seq" && i(a[a.length - 1]))
      );
    }
    function j(a) {
      return !a || (a[0] == "block" && (!a[1] || a[1].length == 0));
    }
    function k(a) {
      return (
        a[0] == "string" ||
        (a[0] == "unary-prefix" && a[1] == "typeof") ||
        (a[0] == "binary" && a[1] == "+" && (k(a[2]) || k(a[3])))
      );
    }
    function l(a) {
      j(a) || E("Dropping unreachable code: " + s(a, !0));
    }
    function m(a) {
      function c(a) {
        a = I(a, g);
        for (var b = 0; b < a.length; ++b) {
          var d = a[b];
          if (d[0] != "if") continue;
          if (d[3] && g(d[3])) continue;
          var e = g(d[2]);
          if (!h(e)) continue;
          var f = g(d[1]),
            i = c(a.slice(b + 1)),
            j = i.length == 1 ? i[0] : ["block", i];
          return a.slice(0, b).concat([[d[0], f, e, j]]);
        }
        return a;
      }
      function d(a, b, d) {
        return (d = c(d)), [this[0], a, b, d];
      }
      function e(a) {
        return [this[0], a != null ? c(a) : null];
      }
      var f = b(),
        g = f.walk;
      return f.with_walkers(
        {
          defun: d,
          function: d,
          block: e,
          splice: e,
          toplevel: function (a) {
            return [this[0], c(a)];
          },
          try: function (a, b, d) {
            return [
              this[0],
              c(a),
              b != null ? [b[0], c(b[1])] : null,
              d != null ? c(d) : null,
            ];
          },
        },
        function () {
          return g(a);
        }
      );
    }
    function n(a, c) {
      function d() {
        throw j;
      }
      function e() {
        throw k;
      }
      function f() {
        return c.call(this, this, h, d, e);
      }
      function g(a) {
        if (a == "++" || a == "--") return f.apply(this, arguments);
      }
      var h = b(),
        i = h.walk,
        j = {},
        k = {};
      return h.with_walkers(
        {
          try: f,
          throw: f,
          return: f,
          new: f,
          switch: f,
          break: f,
          continue: f,
          assign: f,
          call: f,
          if: f,
          for: f,
          "for-in": f,
          while: f,
          do: f,
          return: f,
          "unary-prefix": g,
          "unary-postfix": g,
          defun: f,
        },
        function () {
          for (;;)
            try {
              i(a);
              break;
            } catch (b) {
              if (b === j) break;
              if (b === k) continue;
              throw b;
            }
        }
      );
    }
    function o(a) {
      function c(a, b) {
        var c = i;
        (i = b), (a = I(a, h));
        var d = {},
          e = I(b.names, function (a, c) {
            return a != "var"
              ? I.skip
              : b.references(c)
                ? ((d[c] = !0), [c])
                : I.skip;
          });
        return (
          e.length > 0 &&
            (n(["block", a], function (a, b, c, f) {
              if (
                a[0] == "assign" &&
                a[1] === !0 &&
                a[2][0] == "name" &&
                x(d, a[2][1])
              ) {
                for (var g = e.length; --g >= 0; )
                  if (e[g][0] == a[2][1]) {
                    e[g][1] && c(), (e[g][1] = a[3]), e.push(e.splice(g, 1)[0]);
                    break;
                  }
                var h = b.parent();
                if (h[0] == "seq") {
                  var i = h[2];
                  i.unshift(0, h.length), h.splice.apply(h, i);
                } else h[0] == "stat" ? h.splice(0, h.length, "block") : c();
                f();
              }
              c();
            }),
            a.unshift(["var", e])),
          (i = c),
          a
        );
      }
      function e(a) {
        var b = null;
        for (var c = a.length; --c >= 0; ) {
          var d = a[c];
          if (!d[1]) continue;
          (d = ["assign", !0, ["name", d[0]], d[1]]),
            b == null ? (b = d) : (b = ["seq", d, b]);
        }
        return b == null
          ? g.parent()[0] == "for-in"
            ? ["name", a[0][0]]
            : I.skip
          : ["stat", b];
      }
      function f(a) {
        return [this[0], c(a, this.scope)];
      }
      var g = b(),
        h = g.walk,
        i;
      return g.with_walkers(
        {
          function: function (a, b, d) {
            for (var e = b.length; --e >= 0 && !d.scope.references(b[e]); )
              b.pop();
            return (
              d.scope.references(a) || (a = null),
              [this[0], a, b, c(d, d.scope)]
            );
          },
          defun: function (a, b, d) {
            if (!i.references(a)) return I.skip;
            for (var e = b.length; --e >= 0 && !d.scope.references(b[e]); )
              b.pop();
            return [this[0], a, b, c(d, d.scope)];
          },
          var: e,
          toplevel: f,
        },
        function () {
          return h(d(a));
        }
      );
    }
    function p(a, c) {
      function d(a) {
        var b = ["unary-prefix", "!", a];
        switch (a[0]) {
          case "unary-prefix":
            return a[1] == "!" && i(a[2]) ? a[2] : b;
          case "seq":
            return (a = z(a)), (a[a.length - 1] = d(a[a.length - 1])), a;
          case "conditional":
            return f(b, ["conditional", a[1], d(a[2]), d(a[3])]);
          case "binary":
            var e = a[1],
              g = a[2],
              h = a[3];
            if (!c.keep_comps)
              switch (e) {
                case "<=":
                  return ["binary", ">", g, h];
                case "<":
                  return ["binary", ">=", g, h];
                case ">=":
                  return ["binary", "<", g, h];
                case ">":
                  return ["binary", "<=", g, h];
              }
            switch (e) {
              case "==":
                return ["binary", "!=", g, h];
              case "!=":
                return ["binary", "==", g, h];
              case "===":
                return ["binary", "!==", g, h];
              case "!==":
                return ["binary", "===", g, h];
              case "&&":
                return f(b, ["binary", "||", d(g), d(h)]);
              case "||":
                return f(b, ["binary", "&&", d(g), d(h)]);
            }
        }
        return b;
      }
      function e(a, b, c) {
        var e = function () {
          return a[0] == "unary-prefix" && a[1] == "!"
            ? c
              ? ["conditional", a[2], c, b]
              : ["binary", "||", a[2], b]
            : c
              ? f(["conditional", a, b, c], ["conditional", d(a), c, b])
              : ["binary", "&&", a, b];
        };
        return F(
          a,
          function (a, d) {
            return l(d ? c : b), d ? b : c;
          },
          e
        );
      }
      function g(a) {
        return (
          a != null &&
            a[0] == "block" &&
            a[1] &&
            (a[1].length == 1
              ? (a = a[1][0])
              : a[1].length == 0 && (a = ["block"])),
          a
        );
      }
      function k(a, b, c) {
        return [this[0], a, b, n(c, "lambda")];
      }
      function n(a, b) {
        return (
          (a = I(a, u)),
          (a = _(a).reduce(function (a, b) {
            return (
              b[0] == "block" ? b[1] && a.push.apply(a, b[1]) : a.push(b), a
            );
          }, [])),
          (a = (function (b, c) {
            return (
              _(a).forEach(function (a) {
                c &&
                ((a[0] == "var" && c[0] == "var") ||
                  (a[0] == "const" && c[0] == "const"))
                  ? (c[1] = c[1].concat(a[1]))
                  : (b.push(a), (c = a));
              }),
              b
            );
          })([])),
          c.dead_code &&
            (a = (function (b, d) {
              return (
                _(a).forEach(function (a) {
                  d
                    ? a[0] == "function" || a[0] == "defun"
                      ? b.push(a)
                      : a[0] == "var" || a[0] == "const"
                        ? (c.no_warnings ||
                            E("Variables declared in unreachable code"),
                          (a[1] = I(a[1], function (a) {
                            return (
                              a[1] &&
                                !c.no_warnings &&
                                l(["assign", !0, ["name", a[0]], a[1]]),
                              [a[0]]
                            );
                          })),
                          b.push(a))
                        : c.no_warnings || l(a)
                    : (b.push(a),
                      A(a[0], ["return", "throw", "break", "continue"]) &&
                        (d = !0));
                }),
                b
              );
            })([])),
          c.make_seqs &&
            (a = (function (b, c) {
              return (
                _(a).forEach(function (a) {
                  c && c[0] == "stat" && a[0] == "stat"
                    ? (c[1] = ["seq", c[1], a[1]])
                    : (b.push(a), (c = a));
                }),
                b.length >= 2 &&
                  b[b.length - 2][0] == "stat" &&
                  (b[b.length - 1][0] == "return" ||
                    b[b.length - 1][0] == "throw") &&
                  b[b.length - 1][1] &&
                  b.splice(b.length - 2, 2, [
                    b[b.length - 1][0],
                    ["seq", b[b.length - 2][1], b[b.length - 1][1]],
                  ]),
                b
              );
            })([])),
          a
        );
      }
      function o(a, b, c) {
        return F(
          a,
          function (a, d) {
            return d
              ? ((b = u(b)), l(c), b || ["block"])
              : ((c = u(c)), l(b), c || ["block"]);
          },
          function () {
            return q(a, b, c);
          }
        );
      }
      function p(a, b, c) {
        var e = [["if", d(a), c]];
        return (
          b[0] == "block" ? b[1] && (e = e.concat(b[1])) : e.push(b),
          u(["block", e])
        );
      }
      function q(a, b, c) {
        (a = u(a)),
          (b = u(b)),
          (c = u(c)),
          j(b)
            ? ((a = d(a)), (b = c), (c = null))
            : j(c)
              ? (c = null)
              : (function () {
                  var e = s(a),
                    f = d(a),
                    g = s(f);
                  if (g.length < e.length) {
                    var h = b;
                    (b = c), (c = h), (a = f);
                  }
                })();
        if (j(c) && j(b)) return ["stat", a];
        var g = ["if", a, b, c];
        return (
          b[0] == "if" && j(b[3]) && j(c)
            ? (g = f(g, u(["if", ["binary", "&&", a, b[1]], b[2]])))
            : b[0] == "stat"
              ? c
                ? c[0] == "stat"
                  ? (g = f(g, ["stat", e(a, b[1], c[1])]))
                  : h(c) && (g = p(a, b, c))
                : (g = f(g, ["stat", e(a, b[1])]))
              : c &&
                  b[0] == c[0] &&
                  (b[0] == "return" || b[0] == "throw") &&
                  b[1] &&
                  c[1]
                ? (g = f(g, [b[0], e(a, b[1], c[1])]))
                : c && h(b)
                  ? ((g = [["if", a, b]]),
                    c[0] == "block" ? c[1] && (g = g.concat(c[1])) : g.push(c),
                    (g = u(["block", g])))
                  : b && h(c) && (g = p(a, b, c)),
          g
        );
      }
      function r(a, b) {
        return F(a, function (a, c) {
          return c ? ["for", null, null, null, u(b)] : (l(b), ["block"]);
        });
      }
      c = v(c, {
        make_seqs: !0,
        dead_code: !0,
        no_warnings: !1,
        keep_comps: !0,
      });
      var t = b(),
        u = t.walk;
      return t.with_walkers(
        {
          sub: function (a, b) {
            if (b[0] == "string") {
              var c = b[1];
              if (w(c)) return ["dot", u(a), c];
              if (/^[1-9][0-9]*$/.test(c) || c === "0")
                return ["sub", u(a), ["num", parseInt(c, 10)]];
            }
          },
          if: o,
          toplevel: function (a) {
            return ["toplevel", n(a)];
          },
          switch: function (a, b) {
            var c = b.length - 1;
            return [
              "switch",
              u(a),
              I(b, function (a, b) {
                var d = n(a[1]);
                if (b == c && d.length > 0) {
                  var e = d[d.length - 1];
                  e[0] == "break" && !e[1] && d.pop();
                }
                return [a[0] ? u(a[0]) : null, d];
              }),
            ];
          },
          function: k,
          defun: k,
          block: function (a) {
            if (a) return g(["block", n(a)]);
          },
          binary: function (a, b, c) {
            return F(
              ["binary", a, u(b), u(c)],
              function (a) {
                return f(u(a), this);
              },
              function () {
                return (
                  (function () {
                    if (a != "==" && a != "!=") return;
                    var d = u(b),
                      e = u(c);
                    return (
                      d &&
                      d[0] == "unary-prefix" &&
                      d[1] == "!" &&
                      d[2][0] == "num"
                        ? (b = ["num", +!d[2][1]])
                        : e &&
                          e[0] == "unary-prefix" &&
                          e[1] == "!" &&
                          e[2][0] == "num" &&
                          (c = ["num", +!e[2][1]]),
                      ["binary", a, b, c]
                    );
                  })() || this
                );
              }
            );
          },
          conditional: function (a, b, c) {
            return e(u(a), u(b), u(c));
          },
          try: function (a, b, c) {
            return [
              "try",
              n(a),
              b != null ? [b[0], n(b[1])] : null,
              c != null ? n(c) : null,
            ];
          },
          "unary-prefix": function (a, b) {
            b = u(b);
            var c = ["unary-prefix", a, b];
            return (
              a == "!" && (c = f(c, d(b))),
              F(
                c,
                function (a, b) {
                  return u(a);
                },
                function () {
                  return c;
                }
              )
            );
          },
          name: function (a) {
            switch (a) {
              case "true":
                return ["unary-prefix", "!", ["num", 0]];
              case "false":
                return ["unary-prefix", "!", ["num", 1]];
            }
          },
          while: r,
          assign: function (a, b, c) {
            (b = u(b)), (c = u(c));
            var d = ["+", "-", "/", "*", "%", ">>", "<<", ">>>", "|", "^", "&"];
            return a === !0 &&
              b[0] === "name" &&
              c[0] === "binary" &&
              ~d.indexOf(c[1]) &&
              c[2][0] === "name" &&
              c[2][1] === b[1]
              ? [this[0], c[1], b, c[3]]
              : [this[0], a, b, c];
          },
        },
        function () {
          for (var b = 0; b < 2; ++b) (a = m(a)), (a = u(a));
          return a;
        }
      );
    }
    function q(a, b) {
      var c = 0,
        d = 0;
      return (
        (a = a.replace(/[\\\b\f\n\r\t\x22\x27\u2028\u2029\0]/g, function (a) {
          switch (a) {
            case "\\":
              return "\\\\";
            case "\b":
              return "\\b";
            case "\f":
              return "\\f";
            case "\n":
              return "\\n";
            case "\r":
              return "\\r";
            case "\t":
              return "\\t";
            case "\u2028":
              return "\\u2028";
            case "\u2029":
              return "\\u2029";
            case '"':
              return ++c, '"';
            case "'":
              return ++d, "'";
            case "\0":
              return "\\0";
          }
          return a;
        })),
        b && (a = r(a)),
        c > d
          ? "'" + a.replace(/\x27/g, "\\'") + "'"
          : '"' + a.replace(/\x22/g, '\\"') + '"'
      );
    }
    function r(a) {
      return a.replace(/[\u0080-\uffff]/g, function (a) {
        var b = a.charCodeAt(0).toString(16);
        while (b.length < 4) b = "0" + b;
        return "\\u" + b;
      });
    }
    function s(a, c) {
      function d(a) {
        var b = q(a, c.ascii_only);
        return (
          c.inline_script &&
            (b = b.replace(/<\x2fscript([>\/\t\n\f\r ])/gi, "<\\/script$1")),
          b
        );
      }
      function e(a) {
        return (a += ""), c.ascii_only && (a = r(a)), a;
      }
      function f(a) {
        return (
          a == null && (a = ""),
          J && (a = u(" ", c.indent_start + K * c.indent_level) + a),
          a
        );
      }
      function g(a, b) {
        b == null && (b = 1), (K += b);
        try {
          return a.apply(null, z(arguments, 1));
        } catch (c) {
        } finally {
          K -= b;
        }
      }
      function h(a) {
        if (J) return a.join(" ");
        var b = [];
        for (var c = 0; c < a.length; ++c) {
          var d = a[c + 1];
          b.push(a[c]),
            d &&
              ((/[a-z0-9_\x24]$/i.test(a[c] + "") &&
                /^[a-z0-9_\x24]/i.test(d + "")) ||
                (/[\+\-]$/.test(a[c] + "") && /^[\+\-]/.test(d + ""))) &&
              b.push(" ");
        }
        return b.join("");
      }
      function i(a) {
        return a.join("," + Q);
      }
      function k(a) {
        var b = S(a);
        for (var c = 1; c < arguments.length; ++c) {
          var d = arguments[c];
          if ((d instanceof Function && d(a)) || a[0] == d)
            return "(" + b + ")";
        }
        return b;
      }
      function l(a) {
        if (a.length == 1) return a[0];
        if (a.length == 2) {
          var b = a[1];
          return (a = a[0]), a.length > b.length ? b : a;
        }
        return l([a[0], l(a.slice(1))]);
      }
      function m(a) {
        if (a[0] == "function" || a[0] == "object") {
          var b = z(R.stack()),
            c = b.pop(),
            d = b.pop();
          while (d) {
            if (d[0] == "stat") return !0;
            if (
              ((d[0] != "seq" &&
                d[0] != "call" &&
                d[0] != "dot" &&
                d[0] != "sub" &&
                d[0] != "conditional") ||
                d[1] !== c) &&
              ((d[0] != "binary" &&
                d[0] != "assign" &&
                d[0] != "unary-postfix") ||
                d[2] !== c)
            )
              return !1;
            (c = d), (d = b.pop());
          }
        }
        return !x(G, a[0]);
      }
      function n(a) {
        var b = a.toString(10),
          c = [b.replace(/^0\./, ".")],
          d;
        return (
          Math.floor(a) === a
            ? (a < 0
                ? c.push(
                    "-0x" + (-a).toString(16).toLowerCase(),
                    "-0" + (-a).toString(8)
                  )
                : c.push(
                    "0x" + a.toString(16).toLowerCase(),
                    "0" + a.toString(8)
                  ),
              (d = /^(.*?)(0+)$/.exec(a)) && c.push(d[1] + "e" + d[2].length))
            : (d = /^0?\.(0+)(.*)$/.exec(a)) &&
              c.push(
                d[2] + "e-" + (d[1].length + d[2].length),
                b.substr(b.indexOf("."))
              ),
          l(c)
        );
      }
      function o(a) {
        if (a == null) return ";";
        if (a[0] == "do") return E([a]);
        var b = a;
        for (;;) {
          var c = b[0];
          if (c == "if") {
            if (!b[3]) return S(["block", [a]]);
            b = b[3];
          } else if (c == "while" || c == "do") b = b[2];
          else {
            if (c != "for" && c != "for-in") break;
            b = b[4];
          }
        }
        return S(a);
      }
      function p(a, b, c, d, f) {
        var g = d || "function";
        return (
          a && (g += " " + e(a)),
          (g += "(" + i(I(b, e)) + ")"),
          (g = h([g, E(c)])),
          !f && m(this) ? "(" + g + ")" : g
        );
      }
      function s(a) {
        switch (a[0]) {
          case "with":
          case "while":
            return j(a[2]);
          case "for":
          case "for-in":
            return j(a[4]);
          case "if":
            if (j(a[2]) && !a[3]) return !0;
            if (a[3]) return j(a[3]) ? !0 : s(a[3]);
            return s(a[2]);
        }
      }
      function t(a, b) {
        for (var c = [], d = a.length - 1, e = 0; e <= d; ++e) {
          var g = a[e],
            h = S(g);
          h != ";" &&
            (!J && e == d && !s(g) && (h = h.replace(/;+\s*$/, "")), c.push(h));
        }
        return b ? c : I(c, f);
      }
      function D(a) {
        var b = a.length;
        return b == 0
          ? "{}"
          : "{" +
              L +
              I(a, function (a, c) {
                var d = a[1].length > 0,
                  e =
                    g(function () {
                      return f(a[0] ? h(["case", S(a[0]) + ":"]) : "default:");
                    }, 0.5) +
                    (d
                      ? L +
                        g(function () {
                          return t(a[1]).join(L);
                        })
                      : "");
                return !J && d && c < b - 1 && (e += ";"), e;
              }).join(L) +
              L +
              f("}");
      }
      function E(a) {
        return a
          ? a.length == 0
            ? "{}"
            : "{" +
              L +
              g(function () {
                return t(a).join(L);
              }) +
              L +
              f("}")
          : ";";
      }
      function F(a) {
        var b = a[0],
          c = a[1];
        return c != null && (b = h([e(b), "=", k(c, "seq")])), b;
      }
      c = v(c, {
        indent_start: 0,
        indent_level: 4,
        quote_keys: !1,
        space_colon: !1,
        beautify: !1,
        ascii_only: !1,
        inline_script: !1,
      });
      var J = !!c.beautify,
        K = 0,
        L = J ? "\n" : "",
        Q = J ? " " : "",
        R = b(),
        S = R.walk;
      return R.with_walkers(
        {
          string: d,
          num: n,
          name: e,
          debugger: function () {
            return "debugger";
          },
          toplevel: function (a) {
            return t(a).join(L + L);
          },
          splice: function (a) {
            var b = R.parent();
            return x(H, b)
              ? E.apply(this, arguments)
              : I(t(a, !0), function (a, b) {
                  return b > 0 ? f(a) : a;
                }).join(L);
          },
          block: E,
          var: function (a) {
            return "var " + i(I(a, F)) + ";";
          },
          const: function (a) {
            return "const " + i(I(a, F)) + ";";
          },
          try: function (a, b, c) {
            var d = ["try", E(a)];
            return (
              b && d.push("catch", "(" + b[0] + ")", E(b[1])),
              c && d.push("finally", E(c)),
              h(d)
            );
          },
          throw: function (a) {
            return h(["throw", S(a)]) + ";";
          },
          new: function (a, c) {
            return (
              (c =
                c.length > 0
                  ? "(" +
                    i(
                      I(c, function (a) {
                        return k(a, "seq");
                      })
                    ) +
                    ")"
                  : ""),
              h([
                "new",
                k(a, "seq", "binary", "conditional", "assign", function (a) {
                  var c = b(),
                    d = {};
                  try {
                    c.with_walkers(
                      {
                        call: function () {
                          throw d;
                        },
                        function: function () {
                          return this;
                        },
                      },
                      function () {
                        c.walk(a);
                      }
                    );
                  } catch (e) {
                    if (e === d) return !0;
                    throw e;
                  }
                }) + c,
              ])
            );
          },
          switch: function (a, b) {
            return h(["switch", "(" + S(a) + ")", D(b)]);
          },
          break: function (a) {
            var b = "break";
            return a != null && (b += " " + e(a)), b + ";";
          },
          continue: function (a) {
            var b = "continue";
            return a != null && (b += " " + e(a)), b + ";";
          },
          conditional: function (a, b, c) {
            return h([
              k(a, "assign", "seq", "conditional"),
              "?",
              k(b, "seq"),
              ":",
              k(c, "seq"),
            ]);
          },
          assign: function (a, b, c) {
            return (
              a && a !== !0 ? (a += "=") : (a = "="), h([S(b), a, k(c, "seq")])
            );
          },
          dot: function (a) {
            var b = S(a),
              c = 1;
            a[0] == "num"
              ? /\./.test(a[1]) || (b += ".")
              : m(a) && (b = "(" + b + ")");
            while (c < arguments.length) b += "." + e(arguments[c++]);
            return b;
          },
          call: function (a, b) {
            var c = S(a);
            return (
              c.charAt(0) != "(" && m(a) && (c = "(" + c + ")"),
              c +
                "(" +
                i(
                  I(b, function (a) {
                    return k(a, "seq");
                  })
                ) +
                ")"
            );
          },
          function: p,
          defun: p,
          if: function (a, b, c) {
            var d = ["if", "(" + S(a) + ")", c ? o(b) : S(b)];
            return c && d.push("else", S(c)), h(d);
          },
          for: function (a, b, c, d) {
            var e = ["for"];
            (a = (a != null ? S(a) : "").replace(/;*\s*$/, ";" + Q)),
              (b = (b != null ? S(b) : "").replace(/;*\s*$/, ";" + Q)),
              (c = (c != null ? S(c) : "").replace(/;*\s*$/, ""));
            var f = a + b + c;
            return f == "; ; " && (f = ";;"), e.push("(" + f + ")", S(d)), h(e);
          },
          "for-in": function (a, b, c, d) {
            return h([
              "for",
              "(" + (a ? S(a).replace(/;+$/, "") : S(b)),
              "in",
              S(c) + ")",
              S(d),
            ]);
          },
          while: function (a, b) {
            return h(["while", "(" + S(a) + ")", S(b)]);
          },
          do: function (a, b) {
            return h(["do", S(b), "while", "(" + S(a) + ")"]) + ";";
          },
          return: function (a) {
            var b = ["return"];
            return a != null && b.push(S(a)), h(b) + ";";
          },
          binary: function (a, b, d) {
            var e = S(b),
              f = S(d);
            if (
              A(b[0], ["assign", "conditional", "seq"]) ||
              (b[0] == "binary" && B[a] > B[b[1]]) ||
              (b[0] == "function" && m(this))
            )
              e = "(" + e + ")";
            return (
              A(d[0], ["assign", "conditional", "seq"]) ||
              (d[0] == "binary" &&
                B[a] >= B[d[1]] &&
                (d[1] != a || !A(a, ["&&", "||", "*"])))
                ? (f = "(" + f + ")")
                : !J &&
                  c.inline_script &&
                  (a == "<" || a == "<<") &&
                  d[0] == "regexp" &&
                  /^script/i.test(d[1]) &&
                  (f = " " + f),
              h([e, a, f])
            );
          },
          "unary-prefix": function (a, b) {
            var c = S(b);
            return (
              b[0] == "num" ||
                (b[0] == "unary-prefix" && !x(C, a + b[1])) ||
                !m(b) ||
                (c = "(" + c + ")"),
              a + (y.is_alphanumeric_char(a.charAt(0)) ? " " : "") + c
            );
          },
          "unary-postfix": function (a, b) {
            var c = S(b);
            return (
              b[0] == "num" ||
                (b[0] == "unary-postfix" && !x(C, a + b[1])) ||
                !m(b) ||
                (c = "(" + c + ")"),
              c + a
            );
          },
          sub: function (a, b) {
            var c = S(a);
            return m(a) && (c = "(" + c + ")"), c + "[" + S(b) + "]";
          },
          object: function (a) {
            var b = m(this);
            if (a.length == 0) return b ? "({})" : "{}";
            var e =
              "{" +
              L +
              g(function () {
                return I(a, function (a) {
                  if (a.length == 3)
                    return f(p(a[0], a[1][2], a[1][3], a[2], !0));
                  var b = a[0],
                    e = k(a[1], "seq");
                  return (
                    c.quote_keys
                      ? (b = d(b))
                      : (typeof b == "number" || (!J && +b + "" == b)) &&
                          parseFloat(b) >= 0
                        ? (b = n(+b))
                        : w(b) || (b = d(b)),
                    f(h(J && c.space_colon ? [b, ":", e] : [b + ":", e]))
                  );
                }).join("," + L);
              }) +
              L +
              f("}");
            return b ? "(" + e + ")" : e;
          },
          regexp: function (a, b) {
            return "/" + a + "/" + b;
          },
          array: function (a) {
            return a.length == 0
              ? "[]"
              : h([
                  "[",
                  i(
                    I(a, function (b, c) {
                      return !J && b[0] == "atom" && b[1] == "undefined"
                        ? c === a.length - 1
                          ? ","
                          : ""
                        : k(b, "seq");
                    })
                  ),
                  "]",
                ]);
          },
          stat: function (a) {
            return S(a).replace(/;*\s*$/, ";");
          },
          seq: function () {
            return i(I(z(arguments), S));
          },
          label: function (a, b) {
            return h([e(a), ":", S(b)]);
          },
          with: function (a, b) {
            return h(["with", "(" + S(a) + ")", S(b)]);
          },
          atom: function (a) {
            return e(a);
          },
        },
        function () {
          return S(a);
        }
      );
    }
    function t(a, b) {
      var c = [0];
      return (
        y.parse(
          (function () {
            function d(a) {
              return a.pos - h;
            }
            function e(a) {
              (h = a.pos), c.push(h);
            }
            function f() {
              var a = g.apply(this, arguments);
              a: {
                if (i && i.type == "keyword") break a;
                if (d(a) > b)
                  switch (a.type) {
                    case "keyword":
                    case "atom":
                    case "name":
                    case "punc":
                      e(a);
                      break a;
                  }
              }
              return (i = a), a;
            }
            var g = y.tokenizer(a),
              h = 0,
              i;
            return (
              (f.context = function () {
                return g.context.apply(this, arguments);
              }),
              f
            );
          })()
        ),
        c
          .map(function (b, d) {
            return a.substring(b, c[d + 1] || a.length);
          })
          .join("\n")
      );
    }
    function u(a, b) {
      if (b > 0) {
        if (b == 1) return a;
        var c = u(a, b >> 1);
        return (c += c), b & 1 && (c += a), c;
      }
      return "";
    }
    function v(a, b) {
      var c = {};
      a === !0 && (a = {});
      for (var d in b) x(b, d) && (c[d] = a && x(a, d) ? a[d] : b[d]);
      return c;
    }
    function w(a) {
      return (
        /^[a-z_$][a-z0-9_$]*$/i.test(a) &&
        a != "this" &&
        !x(y.KEYWORDS_ATOM, a) &&
        !x(y.RESERVED_WORDS, a) &&
        !x(y.KEYWORDS, a)
      );
    }
    function x(a, b) {
      return Object.prototype.hasOwnProperty.call(a, b);
    }
    var y = a.parsejs,
      z = y.slice,
      A = y.member,
      B = y.PRECEDENCE,
      C = y.OPERATORS,
      D = (function () {
        var a =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_0123456789";
        return function (b) {
          var c = "",
            d = 54;
          do (c += a.charAt(b % d)), (b = Math.floor(b / d)), (d = 64);
          while (b > 0);
          return c;
        };
      })();
    c.prototype = {
      has: function (a) {
        for (var b = this; b; b = b.parent) if (x(b.names, a)) return b;
      },
      has_mangled: function (a) {
        for (var b = this; b; b = b.parent) if (x(b.rev_mangled, a)) return b;
      },
      toJSON: function () {
        return {
          names: this.names,
          uses_eval: this.uses_eval,
          uses_with: this.uses_with,
        };
      },
      next_mangled: function () {
        for (;;) {
          var a = D(++this.cname),
            b;
          b = this.has_mangled(a);
          if (b && this.refs[b.rev_mangled[a]] === b) continue;
          b = this.has(a);
          if (b && b !== this && this.refs[a] === b && !b.has_mangled(a))
            continue;
          if (x(this.refs, a) && this.refs[a] == null) continue;
          if (!w(a)) continue;
          return a;
        }
      },
      set_mangle: function (a, b) {
        return (this.rev_mangled[b] = a), (this.mangled[a] = b);
      },
      get_mangled: function (a, b) {
        if (this.uses_eval || this.uses_with) return a;
        var c = this.has(a);
        return c
          ? x(c.mangled, a)
            ? c.mangled[a]
            : b
              ? c.set_mangle(a, c.next_mangled())
              : a
          : a;
      },
      references: function (a) {
        return (
          (a && !this.parent) ||
          this.uses_with ||
          this.uses_eval ||
          this.refs[a]
        );
      },
      define: function (a, b) {
        if (a != null) {
          if (b == "var" || !x(this.names, a)) this.names[a] = b || "var";
          return a;
        }
      },
    };
    var E = function () {},
      F = (function () {
        function a(c) {
          switch (c[0]) {
            case "string":
            case "num":
              return c[1];
            case "name":
            case "atom":
              switch (c[1]) {
                case "true":
                  return !0;
                case "false":
                  return !1;
                case "null":
                  return null;
              }
              break;
            case "unary-prefix":
              switch (c[1]) {
                case "!":
                  return !a(c[2]);
                case "typeof":
                  return typeof a(c[2]);
                case "~":
                  return ~a(c[2]);
                case "-":
                  return -a(c[2]);
                case "+":
                  return +a(c[2]);
              }
              break;
            case "binary":
              var d = c[2],
                e = c[3];
              switch (c[1]) {
                case "&&":
                  return a(d) && a(e);
                case "||":
                  return a(d) || a(e);
                case "|":
                  return a(d) | a(e);
                case "&":
                  return a(d) & a(e);
                case "^":
                  return a(d) ^ a(e);
                case "+":
                  return a(d) + a(e);
                case "*":
                  return a(d) * a(e);
                case "/":
                  return a(d) / a(e);
                case "%":
                  return a(d) % a(e);
                case "-":
                  return a(d) - a(e);
                case "<<":
                  return a(d) << a(e);
                case ">>":
                  return a(d) >> a(e);
                case ">>>":
                  return a(d) >>> a(e);
                case "==":
                  return a(d) == a(e);
                case "===":
                  return a(d) === a(e);
                case "!=":
                  return a(d) != a(e);
                case "!==":
                  return a(d) !== a(e);
                case "<":
                  return a(d) < a(e);
                case "<=":
                  return a(d) <= a(e);
                case ">":
                  return a(d) > a(e);
                case ">=":
                  return a(d) >= a(e);
                case "in":
                  return a(d) in a(e);
                case "instanceof":
                  return a(d) instanceof a(e);
              }
          }
          throw b;
        }
        var b = {};
        return function (c, d, e) {
          try {
            var f = a(c),
              g;
            switch (typeof f) {
              case "string":
                g = ["string", f];
                break;
              case "number":
                g = ["num", f];
                break;
              case "boolean":
                g = ["name", f + ""];
                break;
              default:
                if (f === null) {
                  g = ["atom", "null"];
                  break;
                }
                throw Error("Can't handle constant of type: " + typeof f);
            }
            return d.call(c, g, f);
          } catch (h) {
            if (h === b) {
              if (
                c[0] != "binary" ||
                (c[1] != "===" && c[1] != "!==") ||
                !((k(c[2]) && k(c[3])) || (i(c[2]) && i(c[3])))
              ) {
                if (e && c[0] == "binary" && (c[1] == "||" || c[1] == "&&"))
                  try {
                    var j = a(c[2]);
                    c =
                      (c[1] == "&&" && (j ? c[3] : j)) ||
                      (c[1] == "||" && (j ? j : c[3])) ||
                      c;
                  } catch (l) {}
              } else c[1] = c[1].substr(0, 2);
              return e ? e.call(c, c) : null;
            }
            throw h;
          }
        };
      })(),
      G = y.array_to_hash([
        "name",
        "array",
        "object",
        "string",
        "dot",
        "sub",
        "call",
        "regexp",
        "defun",
      ]),
      H = y.array_to_hash(["if", "while", "do", "for", "for-in", "with"]),
      I;
    (function () {
      function a(a) {
        this.v = a;
      }
      function b(a) {
        this.v = a;
      }
      (I = function (d, e, f) {
        function g() {
          var g = e.call(f, d[j], j);
          g instanceof a
            ? ((g = g.v), g instanceof b ? i.push.apply(i, g.v) : i.push(g))
            : g != c && (g instanceof b ? h.push.apply(h, g.v) : h.push(g));
        }
        var h = [],
          i = [],
          j;
        if (d instanceof Array) for (j = 0; j < d.length; ++j) g();
        else for (j in d) x(d, j) && g();
        return i.concat(h);
      }),
        (I.at_top = function (b) {
          return new a(b);
        }),
        (I.splice = function (a) {
          return new b(a);
        });
      var c = (I.skip = {});
    })();
    var J = {};
    (function (a) {
      (a.ast_walker = b),
        (a.ast_mangle = e),
        (a.ast_squeeze = p),
        (a.ast_lift_variables = o),
        (a.gen_code = s),
        (a.ast_add_scope = d),
        (a.set_logger = function (a) {
          E = a;
        }),
        (a.make_string = q),
        (a.split_lines = t),
        (a.MAP = I);
    })(J),
      (a.process = J);
  })(this),
  (function (a) {
    function b(a) {
      function b(a, b) {
        var c = i,
          d;
        return (i = a), (d = b()), (i = c), d;
      }
      function c(a, c, d) {
        return [this[0], a, c, b(d.scope, g(h, d, f))];
      }
      var e = d.ast_walker(),
        f = e.walk,
        i;
      return e.with_walkers(
        {
          toplevel: function (a) {
            return [this[0], b(this.scope, g(h, a, f))];
          },
          function: c,
          defun: c,
          new: function (a, b) {
            if (a[0] == "name") {
              if (a[1] == "Array" && !i.has("Array"))
                return b.length != 1
                  ? ["array", b]
                  : f(["call", ["name", "Array"], b]);
              if (a[1] == "Object" && !i.has("Object"))
                return b.length
                  ? f(["call", ["name", "Object"], b])
                  : ["object", []];
              if (
                (a[1] == "RegExp" || a[1] == "Function" || a[1] == "Error") &&
                !i.has(a[1])
              )
                return f(["call", ["name", a[1]], b]);
            }
          },
          call: function (a, b) {
            if (a[0] == "dot" && a[2] == "toString" && b.length == 0)
              return ["binary", "+", a[1], ["string", ""]];
            if (a[0] == "name") {
              if (a[1] == "Array" && b.length != 1 && !i.has("Array"))
                return ["array", b];
              if (a[1] == "Object" && !b.length && !i.has("Object"))
                return ["object", []];
              if (a[1] == "String" && !i.has("String"))
                return ["binary", "+", b[0], ["string", ""]];
            }
          },
        },
        function () {
          return f(d.ast_add_scope(a));
        }
      );
    }
    var c = a.parsejs,
      d = a.process,
      e = c.slice,
      f = c.member,
      g = c.curry,
      h = d.MAP,
      i = c.PRECEDENCE,
      j = c.OPERATORS,
      k = {};
    (function (a) {
      a.ast_squeeze_more = b;
    })(k),
      (a.process.ast_squeeze_more = k.ast_squeeze_more);
  })(this),
  (function (a) {
    a.uglify = function (b, c) {
      function d(a) {
        var b = "";
        for (var c = 0; c < a.length; ++c) {
          var d = a[c];
          d.type == "comment1"
            ? (b += "//" + d.value + "\n")
            : (b += "/*" + d.value + "*/");
        }
        return b;
      }
      function f(a) {
        var b = "";
        if (k.show_copyright) {
          var c = [],
            e = i.tokenizer(a, !1),
            f;
          f = e();
          var h = null;
          while (/^comment/.test(f.type) && (!h || h == f.type))
            c.push(f), (h = f.type), (f = e());
          b += d(c);
        }
        var l = g("parse", function () {
          return i.parse(a);
        });
        return (
          k.mangle &&
            (l = g("mangle", function () {
              return j.ast_mangle(l, k.mangle_toplevel);
            })),
          k.squeeze &&
            (l = g("squeeze", function () {
              return (
                (l = j.ast_squeeze(l, {
                  make_seqs: k.make_seqs,
                  dead_code: k.dead_code,
                  extra: k.extra,
                })),
                k.unsafe && (l = j.ast_squeeze_more(l)),
                l
              );
            })),
          k.ast
            ? sys.inspect(l, null, null)
            : ((b += g("generate", function () {
                return j.gen_code(l, k.beautify && k.beautify_options);
              })),
              !k.beautify &&
                k.max_line_length &&
                (b = g("split", function () {
                  return j.split_lines(b, k.max_line_length);
                })),
              b)
        );
      }
      function g(a, b) {
        if (!k.verbose) return b();
        var c = new Date().getTime();
        try {
          return b();
        } catch (d) {}
      }
      var h = { parser: a.parsejs, uglify: a.process },
        i = h.parser,
        j = h.uglify;
      j.set_logger(function (a) {});
      var k = {
          ast: !1,
          mangle: !0,
          mangle_toplevel: !1,
          squeeze: !0,
          make_seqs: !0,
          dead_code: !0,
          beautify: !1,
          verbose: !1,
          show_copyright: !0,
          out_same_file: !1,
          max_line_length: 32768,
          extra: !1,
          unsafe: !1,
          beautify_options: {
            indent_level: 4,
            indent_start: 0,
            quote_keys: !1,
            space_colon: !1,
          },
          output: !0,
        },
        l = c,
        m;
      a: while (l.length > 0) {
        var n = l.shift();
        switch (n) {
          case "-b":
          case "--beautify":
            k.beautify = !0;
            break;
          case "-i":
          case "--indent":
            k.beautify_options.indent_level = l.shift();
            break;
          case "-q":
          case "--quote-keys":
            k.beautify_options.quote_keys = !0;
            break;
          case "-mt":
          case "--mangle-toplevel":
            k.mangle_toplevel = !0;
            break;
          case "--no-mangle":
          case "-nm":
            k.mangle = !1;
            break;
          case "--no-squeeze":
          case "-ns":
            k.squeeze = !1;
            break;
          case "--no-seqs":
            k.make_seqs = !1;
            break;
          case "--no-dead-code":
            k.dead_code = !1;
            break;
          case "--no-copyright":
          case "-nc":
            k.show_copyright = !1;
            break;
          case "-o":
          case "--output":
            k.output = l.shift();
            break;
          case "--overwrite":
            k.out_same_file = !0;
            break;
          case "-v":
          case "--verbose":
            k.verbose = !0;
            break;
          case "--ast":
            k.ast = !0;
            break;
          case "--extra":
            k.extra = !0;
            break;
          case "--unsafe":
            k.unsafe = !0;
            break;
          case "--max-line-len":
            k.max_line_length = l.shift();
            break;
          default:
            m = n;
            break a;
        }
      }
      return f(b);
    };
  })(this);
