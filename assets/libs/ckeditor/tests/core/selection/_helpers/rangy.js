/*
 Rangy, a cross-browser JavaScript range and selection library
 http://code.google.com/p/rangy/

 Copyright 2011, Tim Down
 Licensed under the MIT license.
 Version: 1.2.2
 Build date: 13 November 2011
*/
window.rangy = (function () {
  function k(p, u) {
    var w = typeof p[u];
    return w == "function" || !!(w == "object" && p[u]) || w == "unknown";
  }
  function L(p, u) {
    return !!(typeof p[u] == "object" && p[u]);
  }
  function J(p, u) {
    return typeof p[u] != "undefined";
  }
  function K(p) {
    return function (u, w) {
      for (var B = w.length; B--; ) if (!p(u, w[B])) return false;
      return true;
    };
  }
  function z(p) {
    return p && A(p, x) && v(p, t);
  }
  function C(p) {
    window.alert("Rangy not supported in your browser. Reason: " + p);
    c.initialized = true;
    c.supported = false;
  }
  function N() {
    if (!c.initialized) {
      var p,
        u = false,
        w = false;
      if (k(document, "createRange")) {
        p = document.createRange();
        if (A(p, n) && v(p, g)) u = true;
        p.detach();
      }
      if (
        (p = L(document, "body")
          ? document.body
          : document.getElementsByTagName("body")[0]) &&
        k(p, "createTextRange")
      ) {
        p = p.createTextRange();
        if (z(p)) w = true;
      }
      !u && !w && C("Neither Range nor TextRange are implemented");
      c.initialized = true;
      c.features = { implementsDomRange: u, implementsTextRange: w };
      u = j.concat(f);
      w = 0;
      for (p = u.length; w < p; ++w)
        try {
          u[w](c);
        } catch (B) {
          L(window, "console") &&
            k(window.console, "log") &&
            window.console.log(
              "Init listener threw an exception. Continuing.",
              B
            );
        }
    }
  }
  function O(p) {
    this.name = p;
    this.supported = this.initialized = false;
  }
  var g = [
      "startContainer",
      "startOffset",
      "endContainer",
      "endOffset",
      "collapsed",
      "commonAncestorContainer",
      "START_TO_START",
      "START_TO_END",
      "END_TO_START",
      "END_TO_END",
    ],
    n = [
      "setStart",
      "setStartBefore",
      "setStartAfter",
      "setEnd",
      "setEndBefore",
      "setEndAfter",
      "collapse",
      "selectNode",
      "selectNodeContents",
      "compareBoundaryPoints",
      "deleteContents",
      "extractContents",
      "cloneContents",
      "insertNode",
      "surroundContents",
      "cloneRange",
      "toString",
      "detach",
    ],
    t = [
      "boundingHeight",
      "boundingLeft",
      "boundingTop",
      "boundingWidth",
      "htmlText",
      "text",
    ],
    x = [
      "collapse",
      "compareEndPoints",
      "duplicate",
      "getBookmark",
      "moveToBookmark",
      "moveToElementText",
      "parentElement",
      "pasteHTML",
      "select",
      "setEndPoint",
      "getBoundingClientRect",
    ],
    A = K(k),
    q = K(L),
    v = K(J),
    c = {
      version: "1.2.2",
      initialized: false,
      supported: true,
      util: {
        isHostMethod: k,
        isHostObject: L,
        isHostProperty: J,
        areHostMethods: A,
        areHostObjects: q,
        areHostProperties: v,
        isTextRange: z,
      },
      features: {},
      modules: {},
      config: { alertOnWarn: false, preferTextRange: false },
    };
  c.fail = C;
  c.warn = function (p) {
    p = "Rangy warning: " + p;
    if (c.config.alertOnWarn) window.alert(p);
    else
      typeof window.console != "undefined" &&
        typeof window.console.log != "undefined" &&
        window.console.log(p);
  };
  if ({}.hasOwnProperty)
    c.util.extend = function (p, u) {
      for (var w in u) if (u.hasOwnProperty(w)) p[w] = u[w];
    };
  else C("hasOwnProperty not supported");
  var f = [],
    j = [];
  c.init = N;
  c.addInitListener = function (p) {
    c.initialized ? p(c) : f.push(p);
  };
  var r = [];
  c.addCreateMissingNativeApiListener = function (p) {
    r.push(p);
  };
  c.createMissingNativeApi = function (p) {
    p = p || window;
    N();
    for (var u = 0, w = r.length; u < w; ++u) r[u](p);
  };
  O.prototype.fail = function (p) {
    this.initialized = true;
    this.supported = false;
    throw Error("Module '" + this.name + "' failed to load: " + p);
  };
  O.prototype.warn = function (p) {
    c.warn("Module " + this.name + ": " + p);
  };
  O.prototype.createError = function (p) {
    return Error("Error in Rangy " + this.name + " module: " + p);
  };
  c.createModule = function (p, u) {
    var w = new O(p);
    c.modules[p] = w;
    j.push(function (B) {
      u(B, w);
      w.initialized = true;
      w.supported = true;
    });
  };
  c.requireModules = function (p) {
    for (var u = 0, w = p.length, B, F; u < w; ++u) {
      F = p[u];
      B = c.modules[F];
      if (!B || !(B instanceof O)) throw Error("Module '" + F + "' not found");
      if (!B.supported) throw Error("Module '" + F + "' not supported");
    }
  };
  var M = false;
  q = function () {
    if (!M) {
      M = true;
      c.initialized || N();
    }
  };
  if (typeof window == "undefined") C("No window found");
  else if (typeof document == "undefined") C("No document found");
  else {
    k(document, "addEventListener") &&
      document.addEventListener("DOMContentLoaded", q, false);
    if (k(window, "addEventListener"))
      window.addEventListener("load", q, false);
    else
      k(window, "attachEvent")
        ? window.attachEvent("onload", q)
        : C(
            "Window does not have required addEventListener or attachEvent method"
          );
    return c;
  }
})();
rangy.createModule("DomUtil", function (k, L) {
  function J(c) {
    for (var f = 0; (c = c.previousSibling); ) f++;
    return f;
  }
  function K(c, f) {
    var j = [],
      r;
    for (r = c; r; r = r.parentNode) j.push(r);
    for (r = f; r; r = r.parentNode) if (v(j, r)) return r;
    return null;
  }
  function z(c, f, j) {
    for (j = j ? c : c.parentNode; j; ) {
      c = j.parentNode;
      if (c === f) return j;
      j = c;
    }
    return null;
  }
  function C(c) {
    c = c.nodeType;
    return c == 3 || c == 4 || c == 8;
  }
  function N(c, f) {
    var j = f.nextSibling,
      r = f.parentNode;
    j ? r.insertBefore(c, j) : r.appendChild(c);
    return c;
  }
  function O(c) {
    if (c.nodeType == 9) return c;
    else if (typeof c.ownerDocument != "undefined") return c.ownerDocument;
    else if (typeof c.document != "undefined") return c.document;
    else if (c.parentNode) return O(c.parentNode);
    else throw Error("getDocument: no document found for node");
  }
  function g(c) {
    if (!c) return "[No node]";
    return C(c)
      ? '"' + c.data + '"'
      : c.nodeType == 1
        ? "<" +
          c.nodeName +
          (c.id ? ' id="' + c.id + '"' : "") +
          ">[" +
          c.childNodes.length +
          "]"
        : c.nodeName;
  }
  function n(c) {
    this._next = this.root = c;
  }
  function t(c, f) {
    this.node = c;
    this.offset = f;
  }
  function x(c) {
    this.code = this[c];
    this.codeName = c;
    this.message = "DOMException: " + this.codeName;
  }
  var A = k.util;
  A.areHostMethods(document, [
    "createDocumentFragment",
    "createElement",
    "createTextNode",
  ]) || L.fail("document missing a Node creation method");
  A.isHostMethod(document, "getElementsByTagName") ||
    L.fail("document missing getElementsByTagName method");
  var q = document.createElement("div");
  A.areHostMethods(q, ["insertBefore", "appendChild", "cloneNode"]) ||
    L.fail("Incomplete Element implementation");
  A.isHostProperty(q, "innerHTML") ||
    L.fail("Element is missing innerHTML property");
  q = document.createTextNode("test");
  A.areHostMethods(q, [
    "splitText",
    "deleteData",
    "insertData",
    "appendData",
    "cloneNode",
  ]) || L.fail("Incomplete Text Node implementation");
  var v = function (c, f) {
    for (var j = c.length; j--; ) if (c[j] === f) return true;
    return false;
  };
  n.prototype = {
    _current: null,
    hasNext: function () {
      return !!this._next;
    },
    next: function () {
      var c = (this._current = this._next),
        f;
      if (this._current)
        if ((f = c.firstChild)) this._next = f;
        else {
          for (f = null; c !== this.root && !(f = c.nextSibling); )
            c = c.parentNode;
          this._next = f;
        }
      return this._current;
    },
    detach: function () {
      this._current = this._next = this.root = null;
    },
  };
  t.prototype = {
    equals: function (c) {
      return (this.node === c.node) & (this.offset == c.offset);
    },
    inspect: function () {
      return "[DomPosition(" + g(this.node) + ":" + this.offset + ")]";
    },
  };
  x.prototype = {
    INDEX_SIZE_ERR: 1,
    HIERARCHY_REQUEST_ERR: 3,
    WRONG_DOCUMENT_ERR: 4,
    NO_MODIFICATION_ALLOWED_ERR: 7,
    NOT_FOUND_ERR: 8,
    NOT_SUPPORTED_ERR: 9,
    INVALID_STATE_ERR: 11,
  };
  x.prototype.toString = function () {
    return this.message;
  };
  k.dom = {
    arrayContains: v,
    isHtmlNamespace: function (c) {
      var f;
      return (
        typeof c.namespaceURI == "undefined" ||
        (f = c.namespaceURI) === null ||
        f == "http://www.w3.org/1999/xhtml"
      );
    },
    parentElement: function (c) {
      c = c.parentNode;
      return c.nodeType == 1 ? c : null;
    },
    getNodeIndex: J,
    getNodeLength: function (c) {
      var f;
      return C(c) ? c.length : (f = c.childNodes) ? f.length : 0;
    },
    getCommonAncestor: K,
    isAncestorOf: function (c, f, j) {
      for (f = j ? f : f.parentNode; f; )
        if (f === c) return true;
        else f = f.parentNode;
      return false;
    },
    getClosestAncestorIn: z,
    isCharacterDataNode: C,
    insertAfter: N,
    splitDataNode: function (c, f) {
      var j = c.cloneNode(false);
      j.deleteData(0, f);
      c.deleteData(f, c.length - f);
      N(j, c);
      return j;
    },
    getDocument: O,
    getWindow: function (c) {
      c = O(c);
      if (typeof c.defaultView != "undefined") return c.defaultView;
      else if (typeof c.parentWindow != "undefined") return c.parentWindow;
      else throw Error("Cannot get a window object for node");
    },
    getIframeWindow: function (c) {
      if (typeof c.contentWindow != "undefined") return c.contentWindow;
      else if (typeof c.contentDocument != "undefined")
        return c.contentDocument.defaultView;
      else
        throw Error(
          "getIframeWindow: No Window object found for iframe element"
        );
    },
    getIframeDocument: function (c) {
      if (typeof c.contentDocument != "undefined") return c.contentDocument;
      else if (typeof c.contentWindow != "undefined")
        return c.contentWindow.document;
      else
        throw Error(
          "getIframeWindow: No Document object found for iframe element"
        );
    },
    getBody: function (c) {
      return A.isHostObject(c, "body")
        ? c.body
        : c.getElementsByTagName("body")[0];
    },
    getRootContainer: function (c) {
      for (var f; (f = c.parentNode); ) c = f;
      return c;
    },
    comparePoints: function (c, f, j, r) {
      var M;
      if (c == j) return f === r ? 0 : f < r ? -1 : 1;
      else if ((M = z(j, c, true))) return f <= J(M) ? -1 : 1;
      else if ((M = z(c, j, true))) return J(M) < r ? -1 : 1;
      else {
        f = K(c, j);
        c = c === f ? f : z(c, f, true);
        j = j === f ? f : z(j, f, true);
        if (c === j)
          throw Error(
            "comparePoints got to case 4 and childA and childB are the same!"
          );
        else {
          for (f = f.firstChild; f; ) {
            if (f === c) return -1;
            else if (f === j) return 1;
            f = f.nextSibling;
          }
          throw Error("Should not be here!");
        }
      }
    },
    inspectNode: g,
    fragmentFromNodeChildren: function (c) {
      for (var f = O(c).createDocumentFragment(), j; (j = c.firstChild); )
        f.appendChild(j);
      return f;
    },
    createIterator: function (c) {
      return new n(c);
    },
    DomPosition: t,
  };
  k.DOMException = x;
});
rangy.createModule("DomRange", function (k) {
  function L(a, d) {
    return (
      a.nodeType != 3 &&
      (l.isAncestorOf(a, d.startContainer, true) ||
        l.isAncestorOf(a, d.endContainer, true))
    );
  }
  function J(a) {
    return l.getDocument(a.startContainer);
  }
  function K(a, d, h) {
    if ((d = a._listeners[d]))
      for (var o = 0, G = d.length; o < G; ++o)
        d[o].call(a, { target: a, args: h });
  }
  function z(a) {
    return new D(a.parentNode, l.getNodeIndex(a));
  }
  function C(a) {
    return new D(a.parentNode, l.getNodeIndex(a) + 1);
  }
  function N(a, d, h) {
    var o = a.nodeType == 11 ? a.firstChild : a;
    if (l.isCharacterDataNode(d))
      h == d.length
        ? l.insertAfter(a, d)
        : d.parentNode.insertBefore(a, h == 0 ? d : l.splitDataNode(d, h));
    else
      h >= d.childNodes.length
        ? d.appendChild(a)
        : d.insertBefore(a, d.childNodes[h]);
    return o;
  }
  function O(a) {
    for (var d, h, o = J(a.range).createDocumentFragment(); (h = a.next()); ) {
      d = a.isPartiallySelectedSubtree();
      h = h.cloneNode(!d);
      if (d) {
        d = a.getSubtreeIterator();
        h.appendChild(O(d));
        d.detach(true);
      }
      if (h.nodeType == 10) throw new Q("HIERARCHY_REQUEST_ERR");
      o.appendChild(h);
    }
    return o;
  }
  function g(a, d, h) {
    var o, G;
    for (h = h || { stop: false }; (o = a.next()); )
      if (a.isPartiallySelectedSubtree())
        if (d(o) === false) {
          h.stop = true;
          return;
        } else {
          o = a.getSubtreeIterator();
          g(o, d, h);
          o.detach(true);
          if (h.stop) return;
        }
      else
        for (o = l.createIterator(o); (G = o.next()); )
          if (d(G) === false) {
            h.stop = true;
            return;
          }
  }
  function n(a) {
    for (var d; a.next(); )
      if (a.isPartiallySelectedSubtree()) {
        d = a.getSubtreeIterator();
        n(d);
        d.detach(true);
      } else a.remove();
  }
  function t(a) {
    for (var d, h = J(a.range).createDocumentFragment(), o; (d = a.next()); ) {
      if (a.isPartiallySelectedSubtree()) {
        d = d.cloneNode(false);
        o = a.getSubtreeIterator();
        d.appendChild(t(o));
        o.detach(true);
      } else a.remove();
      if (d.nodeType == 10) throw new Q("HIERARCHY_REQUEST_ERR");
      h.appendChild(d);
    }
    return h;
  }
  function x(a, d, h) {
    var o = !!(d && d.length),
      G,
      U = !!h;
    if (o) G = RegExp("^(" + d.join("|") + ")$");
    var m = [];
    g(new q(a, false), function (s) {
      if ((!o || G.test(s.nodeType)) && (!U || h(s))) m.push(s);
    });
    return m;
  }
  function A(a) {
    return (
      "[" +
      (typeof a.getName == "undefined" ? "Range" : a.getName()) +
      "(" +
      l.inspectNode(a.startContainer) +
      ":" +
      a.startOffset +
      ", " +
      l.inspectNode(a.endContainer) +
      ":" +
      a.endOffset +
      ")]"
    );
  }
  function q(a, d) {
    this.range = a;
    this.clonePartiallySelectedTextNodes = d;
    if (!a.collapsed) {
      this.sc = a.startContainer;
      this.so = a.startOffset;
      this.ec = a.endContainer;
      this.eo = a.endOffset;
      var h = a.commonAncestorContainer;
      if (this.sc === this.ec && l.isCharacterDataNode(this.sc)) {
        this.isSingleCharacterDataNode = true;
        this._first = this._last = this._next = this.sc;
      } else {
        this._first = this._next =
          this.sc === h && !l.isCharacterDataNode(this.sc)
            ? this.sc.childNodes[this.so]
            : l.getClosestAncestorIn(this.sc, h, true);
        this._last =
          this.ec === h && !l.isCharacterDataNode(this.ec)
            ? this.ec.childNodes[this.eo - 1]
            : l.getClosestAncestorIn(this.ec, h, true);
      }
    }
  }
  function v(a) {
    this.code = this[a];
    this.codeName = a;
    this.message = "RangeException: " + this.codeName;
  }
  function c(a, d, h) {
    this.nodes = x(a, d, h);
    this._next = this.nodes[0];
    this._position = 0;
  }
  function f(a) {
    return function (d, h) {
      for (var o, G = h ? d : d.parentNode; G; ) {
        o = G.nodeType;
        if (l.arrayContains(a, o)) return G;
        G = G.parentNode;
      }
      return null;
    };
  }
  function j(a, d) {
    if (E(a, d)) throw new v("INVALID_NODE_TYPE_ERR");
  }
  function r(a) {
    if (!a.startContainer) throw new Q("INVALID_STATE_ERR");
  }
  function M(a, d) {
    if (!l.arrayContains(d, a.nodeType)) throw new v("INVALID_NODE_TYPE_ERR");
  }
  function p(a, d) {
    if (
      d < 0 ||
      d > (l.isCharacterDataNode(a) ? a.length : a.childNodes.length)
    )
      throw new Q("INDEX_SIZE_ERR");
  }
  function u(a, d) {
    if (e(a, true) !== e(d, true)) throw new Q("WRONG_DOCUMENT_ERR");
  }
  function w(a) {
    if (i(a, true)) throw new Q("NO_MODIFICATION_ALLOWED_ERR");
  }
  function B(a, d) {
    if (!a) throw new Q(d);
  }
  function F(a) {
    r(a);
    if (
      (!l.arrayContains(Y, a.startContainer.nodeType) &&
        !e(a.startContainer, true)) ||
      (!l.arrayContains(Y, a.endContainer.nodeType) &&
        !e(a.endContainer, true)) ||
      !(
        a.startOffset <=
        (l.isCharacterDataNode(a.startContainer)
          ? a.startContainer.length
          : a.startContainer.childNodes.length)
      ) ||
      !(
        a.endOffset <=
        (l.isCharacterDataNode(a.endContainer)
          ? a.endContainer.length
          : a.endContainer.childNodes.length)
      )
    )
      throw Error(
        "Range error: Range is no longer valid after DOM mutation (" +
          a.inspect() +
          ")"
      );
  }
  function W() {}
  function da(a) {
    a.START_TO_START = ja;
    a.START_TO_END = la;
    a.END_TO_END = ra;
    a.END_TO_START = ma;
    a.NODE_BEFORE = na;
    a.NODE_AFTER = oa;
    a.NODE_BEFORE_AND_AFTER = pa;
    a.NODE_INSIDE = ka;
  }
  function Z(a) {
    da(a);
    da(a.prototype);
  }
  function X(a, d) {
    return function () {
      F(this);
      var h = this.startContainer,
        o = this.startOffset,
        G = this.commonAncestorContainer,
        U = new q(this, true);
      if (h !== G) {
        h = l.getClosestAncestorIn(h, G, true);
        o = C(h);
        h = o.node;
        o = o.offset;
      }
      g(U, w);
      U.reset();
      G = a(U);
      U.detach();
      d(this, h, o, h, o);
      return G;
    };
  }
  function aa(a, d, h) {
    function o(m, s) {
      return function (y) {
        r(this);
        M(y, ea);
        M(b(y), Y);
        y = (m ? z : C)(y);
        (s ? G : U)(this, y.node, y.offset);
      };
    }
    function G(m, s, y) {
      var H = m.endContainer,
        R = m.endOffset;
      if (s !== m.startContainer || y !== m.startOffset) {
        if (b(s) != b(H) || l.comparePoints(s, y, H, R) == 1) {
          H = s;
          R = y;
        }
        d(m, s, y, H, R);
      }
    }
    function U(m, s, y) {
      var H = m.startContainer,
        R = m.startOffset;
      if (s !== m.endContainer || y !== m.endOffset) {
        if (b(s) != b(H) || l.comparePoints(s, y, H, R) == -1) {
          H = s;
          R = y;
        }
        d(m, H, R, s, y);
      }
    }
    a.prototype = new W();
    k.util.extend(a.prototype, {
      setStart: function (m, s) {
        r(this);
        j(m, true);
        p(m, s);
        G(this, m, s);
      },
      setEnd: function (m, s) {
        r(this);
        j(m, true);
        p(m, s);
        U(this, m, s);
      },
      setStartBefore: o(true, true),
      setStartAfter: o(false, true),
      setEndBefore: o(true, false),
      setEndAfter: o(false, false),
      collapse: function (m) {
        F(this);
        m
          ? d(
              this,
              this.startContainer,
              this.startOffset,
              this.startContainer,
              this.startOffset
            )
          : d(
              this,
              this.endContainer,
              this.endOffset,
              this.endContainer,
              this.endOffset
            );
      },
      selectNodeContents: function (m) {
        r(this);
        j(m, true);
        d(this, m, 0, m, l.getNodeLength(m));
      },
      selectNode: function (m) {
        r(this);
        j(m, false);
        M(m, ea);
        var s = z(m);
        m = C(m);
        d(this, s.node, s.offset, m.node, m.offset);
      },
      extractContents: X(t, d),
      deleteContents: X(n, d),
      canSurroundContents: function () {
        F(this);
        w(this.startContainer);
        w(this.endContainer);
        var m = new q(this, true),
          s = (m._first && L(m._first, this)) || (m._last && L(m._last, this));
        m.detach();
        return !s;
      },
      detach: function () {
        h(this);
      },
      splitBoundaries: function () {
        F(this);
        var m = this.startContainer,
          s = this.startOffset,
          y = this.endContainer,
          H = this.endOffset,
          R = m === y;
        l.isCharacterDataNode(y) &&
          H > 0 &&
          H < y.length &&
          l.splitDataNode(y, H);
        if (l.isCharacterDataNode(m) && s > 0 && s < m.length) {
          m = l.splitDataNode(m, s);
          if (R) {
            H -= s;
            y = m;
          } else y == m.parentNode && H >= l.getNodeIndex(m) && H++;
          s = 0;
        }
        d(this, m, s, y, H);
      },
      normalizeBoundaries: function () {
        F(this);
        var m = this.startContainer,
          s = this.startOffset,
          y = this.endContainer,
          H = this.endOffset,
          R = function (V) {
            var S = V.nextSibling;
            if (S && S.nodeType == V.nodeType) {
              y = V;
              H = V.length;
              V.appendData(S.data);
              S.parentNode.removeChild(S);
            }
          },
          qa = function (V) {
            var S = V.previousSibling;
            if (S && S.nodeType == V.nodeType) {
              m = V;
              var sa = V.length;
              s = S.length;
              V.insertData(0, S.data);
              S.parentNode.removeChild(S);
              if (m == y) {
                H += s;
                y = m;
              } else if (y == V.parentNode) {
                S = l.getNodeIndex(V);
                if (H == S) {
                  y = V;
                  H = sa;
                } else H > S && H--;
              }
            }
          },
          fa = true;
        if (l.isCharacterDataNode(y)) y.length == H && R(y);
        else {
          if (H > 0)
            (fa = y.childNodes[H - 1]) && l.isCharacterDataNode(fa) && R(fa);
          fa = !this.collapsed;
        }
        if (fa)
          if (l.isCharacterDataNode(m)) s == 0 && qa(m);
          else {
            if (s < m.childNodes.length)
              (R = m.childNodes[s]) && l.isCharacterDataNode(R) && qa(R);
          }
        else {
          m = y;
          s = H;
        }
        d(this, m, s, y, H);
      },
      collapseToPoint: function (m, s) {
        r(this);
        j(m, true);
        p(m, s);
        if (
          m !== this.startContainer ||
          s !== this.startOffset ||
          m !== this.endContainer ||
          s !== this.endOffset
        )
          d(this, m, s, m, s);
      },
    });
    Z(a);
  }
  function ga(a) {
    a.collapsed =
      a.startContainer === a.endContainer && a.startOffset === a.endOffset;
    a.commonAncestorContainer = a.collapsed
      ? a.startContainer
      : l.getCommonAncestor(a.startContainer, a.endContainer);
  }
  function ba(a, d, h, o, G) {
    var U = a.startContainer !== d || a.startOffset !== h,
      m = a.endContainer !== o || a.endOffset !== G;
    a.startContainer = d;
    a.startOffset = h;
    a.endContainer = o;
    a.endOffset = G;
    ga(a);
    K(a, "boundarychange", { startMoved: U, endMoved: m });
  }
  function T(a) {
    this.startContainer = a;
    this.startOffset = 0;
    this.endContainer = a;
    this.endOffset = 0;
    this._listeners = { boundarychange: [], detach: [] };
    ga(this);
  }
  k.requireModules(["DomUtil"]);
  var l = k.dom,
    D = l.DomPosition,
    Q = k.DOMException;
  q.prototype = {
    _current: null,
    _next: null,
    _first: null,
    _last: null,
    isSingleCharacterDataNode: false,
    reset: function () {
      this._current = null;
      this._next = this._first;
    },
    hasNext: function () {
      return !!this._next;
    },
    next: function () {
      var a = (this._current = this._next);
      if (a) {
        this._next = a !== this._last ? a.nextSibling : null;
        if (l.isCharacterDataNode(a) && this.clonePartiallySelectedTextNodes) {
          if (a === this.ec)
            (a = a.cloneNode(true)).deleteData(this.eo, a.length - this.eo);
          if (this._current === this.sc)
            (a = a.cloneNode(true)).deleteData(0, this.so);
        }
      }
      return a;
    },
    remove: function () {
      var a = this._current,
        d,
        h;
      if (l.isCharacterDataNode(a) && (a === this.sc || a === this.ec)) {
        d = a === this.sc ? this.so : 0;
        h = a === this.ec ? this.eo : a.length;
        d != h && a.deleteData(d, h - d);
      } else a.parentNode && a.parentNode.removeChild(a);
    },
    isPartiallySelectedSubtree: function () {
      return L(this._current, this.range);
    },
    getSubtreeIterator: function () {
      var a;
      if (this.isSingleCharacterDataNode) {
        a = this.range.cloneRange();
        a.collapse();
      } else {
        a = new T(J(this.range));
        var d = this._current,
          h = d,
          o = 0,
          G = d,
          U = l.getNodeLength(d);
        if (l.isAncestorOf(d, this.sc, true)) {
          h = this.sc;
          o = this.so;
        }
        if (l.isAncestorOf(d, this.ec, true)) {
          G = this.ec;
          U = this.eo;
        }
        ba(a, h, o, G, U);
      }
      return new q(a, this.clonePartiallySelectedTextNodes);
    },
    detach: function (a) {
      a && this.range.detach();
      this.range =
        this._current =
        this._next =
        this._first =
        this._last =
        this.sc =
        this.so =
        this.ec =
        this.eo =
          null;
    },
  };
  v.prototype = { BAD_BOUNDARYPOINTS_ERR: 1, INVALID_NODE_TYPE_ERR: 2 };
  v.prototype.toString = function () {
    return this.message;
  };
  c.prototype = {
    _current: null,
    hasNext: function () {
      return !!this._next;
    },
    next: function () {
      this._current = this._next;
      this._next = this.nodes[++this._position];
      return this._current;
    },
    detach: function () {
      this._current = this._next = this.nodes = null;
    },
  };
  var ea = [1, 3, 4, 5, 7, 8, 10],
    Y = [2, 9, 11],
    ha = [1, 3, 4, 5, 7, 8, 10, 11],
    $ = [1, 3, 4, 5, 7, 8],
    b = l.getRootContainer,
    e = f([9, 11]),
    i = f([5, 6, 10, 12]),
    E = f([6, 10, 12]),
    I = document.createElement("style"),
    P = false;
  try {
    I.innerHTML = "<b>x</b>";
    P = I.firstChild.nodeType == 3;
  } catch (ca) {}
  k.features.htmlParsingConforms = P;
  var ia = [
      "startContainer",
      "startOffset",
      "endContainer",
      "endOffset",
      "collapsed",
      "commonAncestorContainer",
    ],
    ja = 0,
    la = 1,
    ra = 2,
    ma = 3,
    na = 0,
    oa = 1,
    pa = 2,
    ka = 3;
  W.prototype = {
    attachListener: function (a, d) {
      this._listeners[a].push(d);
    },
    compareBoundaryPoints: function (a, d) {
      F(this);
      u(this.startContainer, d.startContainer);
      var h = a == ma || a == ja ? "start" : "end",
        o = a == la || a == ja ? "start" : "end";
      return l.comparePoints(
        this[h + "Container"],
        this[h + "Offset"],
        d[o + "Container"],
        d[o + "Offset"]
      );
    },
    insertNode: function (a) {
      F(this);
      M(a, ha);
      w(this.startContainer);
      if (l.isAncestorOf(a, this.startContainer, true))
        throw new Q("HIERARCHY_REQUEST_ERR");
      this.setStartBefore(N(a, this.startContainer, this.startOffset));
    },
    cloneContents: function () {
      F(this);
      var a, d;
      if (this.collapsed) return J(this).createDocumentFragment();
      else {
        if (
          this.startContainer === this.endContainer &&
          l.isCharacterDataNode(this.startContainer)
        ) {
          a = this.startContainer.cloneNode(true);
          a.data = a.data.slice(this.startOffset, this.endOffset);
          d = J(this).createDocumentFragment();
          d.appendChild(a);
          return d;
        } else {
          d = new q(this, true);
          a = O(d);
          d.detach();
        }
        return a;
      }
    },
    canSurroundContents: function () {
      F(this);
      w(this.startContainer);
      w(this.endContainer);
      var a = new q(this, true),
        d = (a._first && L(a._first, this)) || (a._last && L(a._last, this));
      a.detach();
      return !d;
    },
    surroundContents: function (a) {
      M(a, $);
      if (!this.canSurroundContents()) throw new v("BAD_BOUNDARYPOINTS_ERR");
      var d = this.extractContents();
      if (a.hasChildNodes()) for (; a.lastChild; ) a.removeChild(a.lastChild);
      N(a, this.startContainer, this.startOffset);
      a.appendChild(d);
      this.selectNode(a);
    },
    cloneRange: function () {
      F(this);
      for (var a = new T(J(this)), d = ia.length, h; d--; ) {
        h = ia[d];
        a[h] = this[h];
      }
      return a;
    },
    toString: function () {
      F(this);
      var a = this.startContainer;
      if (a === this.endContainer && l.isCharacterDataNode(a))
        return a.nodeType == 3 || a.nodeType == 4
          ? a.data.slice(this.startOffset, this.endOffset)
          : "";
      else {
        var d = [];
        a = new q(this, true);
        g(a, function (h) {
          if (h.nodeType == 3 || h.nodeType == 4) d.push(h.data);
        });
        a.detach();
        return d.join("");
      }
    },
    compareNode: function (a) {
      F(this);
      var d = a.parentNode,
        h = l.getNodeIndex(a);
      if (!d) throw new Q("NOT_FOUND_ERR");
      a = this.comparePoint(d, h);
      d = this.comparePoint(d, h + 1);
      return a < 0 ? (d > 0 ? pa : na) : d > 0 ? oa : ka;
    },
    comparePoint: function (a, d) {
      F(this);
      B(a, "HIERARCHY_REQUEST_ERR");
      u(a, this.startContainer);
      if (l.comparePoints(a, d, this.startContainer, this.startOffset) < 0)
        return -1;
      else if (l.comparePoints(a, d, this.endContainer, this.endOffset) > 0)
        return 1;
      return 0;
    },
    createContextualFragment: P
      ? function (a) {
          var d = this.startContainer,
            h = l.getDocument(d);
          if (!d) throw new Q("INVALID_STATE_ERR");
          var o = null;
          if (d.nodeType == 1) o = d;
          else if (l.isCharacterDataNode(d)) o = l.parentElement(d);
          o =
            o === null ||
            (o.nodeName == "HTML" &&
              l.isHtmlNamespace(l.getDocument(o).documentElement) &&
              l.isHtmlNamespace(o))
              ? h.createElement("body")
              : o.cloneNode(false);
          o.innerHTML = a;
          return l.fragmentFromNodeChildren(o);
        }
      : function (a) {
          r(this);
          var d = J(this).createElement("body");
          d.innerHTML = a;
          return l.fragmentFromNodeChildren(d);
        },
    toHtml: function () {
      F(this);
      var a = J(this).createElement("div");
      a.appendChild(this.cloneContents());
      return a.innerHTML;
    },
    intersectsNode: function (a, d) {
      F(this);
      B(a, "NOT_FOUND_ERR");
      if (l.getDocument(a) !== J(this)) return false;
      var h = a.parentNode,
        o = l.getNodeIndex(a);
      B(h, "NOT_FOUND_ERR");
      var G = l.comparePoints(h, o, this.endContainer, this.endOffset);
      h = l.comparePoints(h, o + 1, this.startContainer, this.startOffset);
      return d ? G <= 0 && h >= 0 : G < 0 && h > 0;
    },
    isPointInRange: function (a, d) {
      F(this);
      B(a, "HIERARCHY_REQUEST_ERR");
      u(a, this.startContainer);
      return (
        l.comparePoints(a, d, this.startContainer, this.startOffset) >= 0 &&
        l.comparePoints(a, d, this.endContainer, this.endOffset) <= 0
      );
    },
    intersectsRange: function (a, d) {
      F(this);
      if (J(a) != J(this)) throw new Q("WRONG_DOCUMENT_ERR");
      var h = l.comparePoints(
          this.startContainer,
          this.startOffset,
          a.endContainer,
          a.endOffset
        ),
        o = l.comparePoints(
          this.endContainer,
          this.endOffset,
          a.startContainer,
          a.startOffset
        );
      return d ? h <= 0 && o >= 0 : h < 0 && o > 0;
    },
    intersection: function (a) {
      if (this.intersectsRange(a)) {
        var d = l.comparePoints(
            this.startContainer,
            this.startOffset,
            a.startContainer,
            a.startOffset
          ),
          h = l.comparePoints(
            this.endContainer,
            this.endOffset,
            a.endContainer,
            a.endOffset
          ),
          o = this.cloneRange();
        d == -1 && o.setStart(a.startContainer, a.startOffset);
        h == 1 && o.setEnd(a.endContainer, a.endOffset);
        return o;
      }
      return null;
    },
    union: function (a) {
      if (this.intersectsRange(a, true)) {
        var d = this.cloneRange();
        l.comparePoints(
          a.startContainer,
          a.startOffset,
          this.startContainer,
          this.startOffset
        ) == -1 && d.setStart(a.startContainer, a.startOffset);
        l.comparePoints(
          a.endContainer,
          a.endOffset,
          this.endContainer,
          this.endOffset
        ) == 1 && d.setEnd(a.endContainer, a.endOffset);
        return d;
      } else throw new v("Ranges do not intersect");
    },
    containsNode: function (a, d) {
      return d ? this.intersectsNode(a, false) : this.compareNode(a) == ka;
    },
    containsNodeContents: function (a) {
      return (
        this.comparePoint(a, 0) >= 0 &&
        this.comparePoint(a, l.getNodeLength(a)) <= 0
      );
    },
    containsRange: function (a) {
      return this.intersection(a).equals(a);
    },
    containsNodeText: function (a) {
      var d = this.cloneRange();
      d.selectNode(a);
      var h = d.getNodes([3]);
      if (h.length > 0) {
        d.setStart(h[0], 0);
        a = h.pop();
        d.setEnd(a, a.length);
        a = this.containsRange(d);
        d.detach();
        return a;
      } else return this.containsNodeContents(a);
    },
    createNodeIterator: function (a, d) {
      F(this);
      return new c(this, a, d);
    },
    getNodes: function (a, d) {
      F(this);
      return x(this, a, d);
    },
    getDocument: function () {
      return J(this);
    },
    collapseBefore: function (a) {
      r(this);
      this.setEndBefore(a);
      this.collapse(false);
    },
    collapseAfter: function (a) {
      r(this);
      this.setStartAfter(a);
      this.collapse(true);
    },
    getName: function () {
      return "DomRange";
    },
    equals: function (a) {
      return T.rangesEqual(this, a);
    },
    inspect: function () {
      return A(this);
    },
  };
  aa(T, ba, function (a) {
    r(a);
    a.startContainer = a.startOffset = a.endContainer = a.endOffset = null;
    a.collapsed = a.commonAncestorContainer = null;
    K(a, "detach", null);
    a._listeners = null;
  });
  k.rangePrototype = W.prototype;
  T.rangeProperties = ia;
  T.RangeIterator = q;
  T.copyComparisonConstants = Z;
  T.createPrototypeRange = aa;
  T.inspect = A;
  T.getRangeDocument = J;
  T.rangesEqual = function (a, d) {
    return (
      a.startContainer === d.startContainer &&
      a.startOffset === d.startOffset &&
      a.endContainer === d.endContainer &&
      a.endOffset === d.endOffset
    );
  };
  k.DomRange = T;
  k.RangeException = v;
});
rangy.createModule("WrappedRange", function (k) {
  function L(g, n, t, x) {
    var A = g.duplicate();
    A.collapse(t);
    var q = A.parentElement();
    z.isAncestorOf(n, q, true) || (q = n);
    if (!q.canHaveHTML) return new C(q.parentNode, z.getNodeIndex(q));
    n = z.getDocument(q).createElement("span");
    var v,
      c = t ? "StartToStart" : "StartToEnd";
    do {
      q.insertBefore(n, n.previousSibling);
      A.moveToElementText(n);
    } while ((v = A.compareEndPoints(c, g)) > 0 && n.previousSibling);
    c = n.nextSibling;
    if (v == -1 && c && z.isCharacterDataNode(c)) {
      A.setEndPoint(t ? "EndToStart" : "EndToEnd", g);
      if (/[\r\n]/.test(c.data)) {
        q = A.duplicate();
        t = q.text.replace(/\r\n/g, "\r").length;
        for (
          t = q.moveStart("character", t);
          q.compareEndPoints("StartToEnd", q) == -1;

        ) {
          t++;
          q.moveStart("character", 1);
        }
      } else t = A.text.length;
      q = new C(c, t);
    } else {
      c = (x || !t) && n.previousSibling;
      q =
        (t = (x || t) && n.nextSibling) && z.isCharacterDataNode(t)
          ? new C(t, 0)
          : c && z.isCharacterDataNode(c)
            ? new C(c, c.length)
            : new C(q, z.getNodeIndex(n));
    }
    n.parentNode.removeChild(n);
    return q;
  }
  function J(g, n) {
    var t,
      x,
      A = g.offset,
      q = z.getDocument(g.node),
      v = q.body.createTextRange(),
      c = z.isCharacterDataNode(g.node);
    if (c) {
      t = g.node;
      x = t.parentNode;
    } else {
      t = g.node.childNodes;
      t = A < t.length ? t[A] : null;
      x = g.node;
    }
    q = q.createElement("span");
    q.innerHTML = "&#feff;";
    t ? x.insertBefore(q, t) : x.appendChild(q);
    v.moveToElementText(q);
    v.collapse(!n);
    x.removeChild(q);
    if (c) v[n ? "moveStart" : "moveEnd"]("character", A);
    return v;
  }
  k.requireModules(["DomUtil", "DomRange"]);
  var K,
    z = k.dom,
    C = z.DomPosition,
    N = k.DomRange;
  if (
    k.features.implementsDomRange &&
    (!k.features.implementsTextRange || !k.config.preferTextRange)
  ) {
    (function () {
      function g(f) {
        for (var j = t.length, r; j--; ) {
          r = t[j];
          f[r] = f.nativeRange[r];
        }
      }
      var n,
        t = N.rangeProperties,
        x,
        A;
      K = function (f) {
        if (!f) throw Error("Range must be specified");
        this.nativeRange = f;
        g(this);
      };
      N.createPrototypeRange(
        K,
        function (f, j, r, M, p) {
          var u = f.endContainer !== M || f.endOffset != p;
          if (f.startContainer !== j || f.startOffset != r || u) {
            f.setEnd(M, p);
            f.setStart(j, r);
          }
        },
        function (f) {
          f.nativeRange.detach();
          f.detached = true;
          for (var j = t.length, r; j--; ) {
            r = t[j];
            f[r] = null;
          }
        }
      );
      n = K.prototype;
      n.selectNode = function (f) {
        this.nativeRange.selectNode(f);
        g(this);
      };
      n.deleteContents = function () {
        this.nativeRange.deleteContents();
        g(this);
      };
      n.extractContents = function () {
        var f = this.nativeRange.extractContents();
        g(this);
        return f;
      };
      n.cloneContents = function () {
        return this.nativeRange.cloneContents();
      };
      n.surroundContents = function (f) {
        this.nativeRange.surroundContents(f);
        g(this);
      };
      n.collapse = function (f) {
        this.nativeRange.collapse(f);
        g(this);
      };
      n.cloneRange = function () {
        return new K(this.nativeRange.cloneRange());
      };
      n.refresh = function () {
        g(this);
      };
      n.toString = function () {
        return this.nativeRange.toString();
      };
      var q = document.createTextNode("test");
      z.getBody(document).appendChild(q);
      var v = document.createRange();
      v.setStart(q, 0);
      v.setEnd(q, 0);
      try {
        v.setStart(q, 1);
        x = true;
        n.setStart = function (f, j) {
          this.nativeRange.setStart(f, j);
          g(this);
        };
        n.setEnd = function (f, j) {
          this.nativeRange.setEnd(f, j);
          g(this);
        };
        A = function (f) {
          return function (j) {
            this.nativeRange[f](j);
            g(this);
          };
        };
      } catch (c) {
        x = false;
        n.setStart = function (f, j) {
          try {
            this.nativeRange.setStart(f, j);
          } catch (r) {
            this.nativeRange.setEnd(f, j);
            this.nativeRange.setStart(f, j);
          }
          g(this);
        };
        n.setEnd = function (f, j) {
          try {
            this.nativeRange.setEnd(f, j);
          } catch (r) {
            this.nativeRange.setStart(f, j);
            this.nativeRange.setEnd(f, j);
          }
          g(this);
        };
        A = function (f, j) {
          return function (r) {
            try {
              this.nativeRange[f](r);
            } catch (M) {
              this.nativeRange[j](r);
              this.nativeRange[f](r);
            }
            g(this);
          };
        };
      }
      n.setStartBefore = A("setStartBefore", "setEndBefore");
      n.setStartAfter = A("setStartAfter", "setEndAfter");
      n.setEndBefore = A("setEndBefore", "setStartBefore");
      n.setEndAfter = A("setEndAfter", "setStartAfter");
      v.selectNodeContents(q);
      n.selectNodeContents =
        v.startContainer == q &&
        v.endContainer == q &&
        v.startOffset == 0 &&
        v.endOffset == q.length
          ? function (f) {
              this.nativeRange.selectNodeContents(f);
              g(this);
            }
          : function (f) {
              this.setStart(f, 0);
              this.setEnd(f, N.getEndOffset(f));
            };
      v.selectNodeContents(q);
      v.setEnd(q, 3);
      x = document.createRange();
      x.selectNodeContents(q);
      x.setEnd(q, 4);
      x.setStart(q, 2);
      n.compareBoundaryPoints =
        (v.compareBoundaryPoints(v.START_TO_END, x) == -1) &
        (v.compareBoundaryPoints(v.END_TO_START, x) == 1)
          ? function (f, j) {
              j = j.nativeRange || j;
              if (f == j.START_TO_END) f = j.END_TO_START;
              else if (f == j.END_TO_START) f = j.START_TO_END;
              return this.nativeRange.compareBoundaryPoints(f, j);
            }
          : function (f, j) {
              return this.nativeRange.compareBoundaryPoints(
                f,
                j.nativeRange || j
              );
            };
      if (k.util.isHostMethod(v, "createContextualFragment"))
        n.createContextualFragment = function (f) {
          return this.nativeRange.createContextualFragment(f);
        };
      z.getBody(document).removeChild(q);
      v.detach();
      x.detach();
    })();
    k.createNativeRange = function (g) {
      g = g || document;
      return g.createRange();
    };
  } else if (k.features.implementsTextRange) {
    K = function (g) {
      this.textRange = g;
      this.refresh();
    };
    K.prototype = new N(document);
    K.prototype.refresh = function () {
      var g,
        n,
        t = this.textRange;
      g = t.parentElement();
      var x = t.duplicate();
      x.collapse(true);
      n = x.parentElement();
      x = t.duplicate();
      x.collapse(false);
      t = x.parentElement();
      n = n == t ? n : z.getCommonAncestor(n, t);
      n = n == g ? n : z.getCommonAncestor(g, n);
      if (this.textRange.compareEndPoints("StartToEnd", this.textRange) == 0)
        n = g = L(this.textRange, n, true, true);
      else {
        g = L(this.textRange, n, true, false);
        n = L(this.textRange, n, false, false);
      }
      this.setStart(g.node, g.offset);
      this.setEnd(n.node, n.offset);
    };
    N.copyComparisonConstants(K);
    var O = (function () {
      return this;
    })();
    if (typeof O.Range == "undefined") O.Range = K;
    k.createNativeRange = function (g) {
      g = g || document;
      return g.body.createTextRange();
    };
  }
  if (k.features.implementsTextRange)
    K.rangeToTextRange = function (g) {
      if (g.collapsed) return J(new C(g.startContainer, g.startOffset), true);
      else {
        var n = J(new C(g.startContainer, g.startOffset), true),
          t = J(new C(g.endContainer, g.endOffset), false);
        g = z.getDocument(g.startContainer).body.createTextRange();
        g.setEndPoint("StartToStart", n);
        g.setEndPoint("EndToEnd", t);
        return g;
      }
    };
  K.prototype.getName = function () {
    return "WrappedRange";
  };
  k.WrappedRange = K;
  k.createRange = function (g) {
    g = g || document;
    return new K(k.createNativeRange(g));
  };
  k.createRangyRange = function (g) {
    g = g || document;
    return new N(g);
  };
  k.createIframeRange = function (g) {
    return k.createRange(z.getIframeDocument(g));
  };
  k.createIframeRangyRange = function (g) {
    return k.createRangyRange(z.getIframeDocument(g));
  };
  k.addCreateMissingNativeApiListener(function (g) {
    g = g.document;
    if (typeof g.createRange == "undefined")
      g.createRange = function () {
        return k.createRange(this);
      };
    g = g = null;
  });
});
rangy.createModule("WrappedSelection", function (k, L) {
  function J(b) {
    return (b || window).getSelection();
  }
  function K(b) {
    return (b || window).document.selection;
  }
  function z(b, e, i) {
    var E = i ? "end" : "start";
    i = i ? "start" : "end";
    b.anchorNode = e[E + "Container"];
    b.anchorOffset = e[E + "Offset"];
    b.focusNode = e[i + "Container"];
    b.focusOffset = e[i + "Offset"];
  }
  function C(b) {
    b.anchorNode = b.focusNode = null;
    b.anchorOffset = b.focusOffset = 0;
    b.rangeCount = 0;
    b.isCollapsed = true;
    b._ranges.length = 0;
  }
  function N(b) {
    var e;
    if (b instanceof j) {
      e = b._selectionNativeRange;
      if (!e) {
        e = k.createNativeRange(c.getDocument(b.startContainer));
        e.setEnd(b.endContainer, b.endOffset);
        e.setStart(b.startContainer, b.startOffset);
        b._selectionNativeRange = e;
        b.attachListener("detach", function () {
          this._selectionNativeRange = null;
        });
      }
    } else if (b instanceof r) e = b.nativeRange;
    else if (
      k.features.implementsDomRange &&
      b instanceof c.getWindow(b.startContainer).Range
    )
      e = b;
    return e;
  }
  function O(b) {
    var e = b.getNodes(),
      i;
    a: if (!e.length || e[0].nodeType != 1) i = false;
    else {
      i = 1;
      for (var E = e.length; i < E; ++i)
        if (!c.isAncestorOf(e[0], e[i])) {
          i = false;
          break a;
        }
      i = true;
    }
    if (!i)
      throw Error(
        "getSingleElementFromRange: range " +
          b.inspect() +
          " did not consist of a single element"
      );
    return e[0];
  }
  function g(b, e) {
    var i = new r(e);
    b._ranges = [i];
    z(b, i, false);
    b.rangeCount = 1;
    b.isCollapsed = i.collapsed;
  }
  function n(b) {
    b._ranges.length = 0;
    if (b.docSelection.type == "None") C(b);
    else {
      var e = b.docSelection.createRange();
      if (e && typeof e.text != "undefined") g(b, e);
      else {
        b.rangeCount = e.length;
        for (
          var i, E = c.getDocument(e.item(0)), I = 0;
          I < b.rangeCount;
          ++I
        ) {
          i = k.createRange(E);
          i.selectNode(e.item(I));
          b._ranges.push(i);
        }
        b.isCollapsed = b.rangeCount == 1 && b._ranges[0].collapsed;
        z(b, b._ranges[b.rangeCount - 1], false);
      }
    }
  }
  function t(b, e) {
    var i = b.docSelection.createRange(),
      E = O(e),
      I = c.getDocument(i.item(0));
    I = c.getBody(I).createControlRange();
    for (var P = 0, ca = i.length; P < ca; ++P) I.add(i.item(P));
    try {
      I.add(E);
    } catch (ia) {
      throw Error(
        "addRange(): Element within the specified Range could not be added to control selection (does it have layout?)"
      );
    }
    I.select();
    n(b);
  }
  function x(b, e, i) {
    this.nativeSelection = b;
    this.docSelection = e;
    this._ranges = [];
    this.win = i;
    this.refresh();
  }
  function A(b, e) {
    var i = c.getDocument(e[0].startContainer);
    i = c.getBody(i).createControlRange();
    for (var E = 0, I; E < rangeCount; ++E) {
      I = O(e[E]);
      try {
        i.add(I);
      } catch (P) {
        throw Error(
          "setRanges(): Element within the one of the specified Ranges could not be added to control selection (does it have layout?)"
        );
      }
    }
    i.select();
    n(b);
  }
  function q(b, e) {
    if (b.anchorNode && c.getDocument(b.anchorNode) !== c.getDocument(e))
      throw new M("WRONG_DOCUMENT_ERR");
  }
  function v(b) {
    var e = [],
      i = new p(b.anchorNode, b.anchorOffset),
      E = new p(b.focusNode, b.focusOffset),
      I = typeof b.getName == "function" ? b.getName() : "Selection";
    if (typeof b.rangeCount != "undefined")
      for (var P = 0, ca = b.rangeCount; P < ca; ++P)
        e[P] = j.inspect(b.getRangeAt(P));
    return (
      "[" +
      I +
      "(Ranges: " +
      e.join(", ") +
      ")(anchor: " +
      i.inspect() +
      ", focus: " +
      E.inspect() +
      "]"
    );
  }
  k.requireModules(["DomUtil", "DomRange", "WrappedRange"]);
  k.config.checkSelectionRanges = true;
  var c = k.dom,
    f = k.util,
    j = k.DomRange,
    r = k.WrappedRange,
    M = k.DOMException,
    p = c.DomPosition,
    u,
    w,
    B = k.util.isHostMethod(window, "getSelection"),
    F = k.util.isHostObject(document, "selection"),
    W = F && (!B || k.config.preferTextRange);
  if (W) {
    u = K;
    k.isSelectionValid = function (b) {
      b = (b || window).document;
      var e = b.selection;
      return (
        e.type != "None" || c.getDocument(e.createRange().parentElement()) == b
      );
    };
  } else if (B) {
    u = J;
    k.isSelectionValid = function () {
      return true;
    };
  } else
    L.fail("Neither document.selection or window.getSelection() detected.");
  k.getNativeSelection = u;
  B = u();
  var da = k.createNativeRange(document),
    Z = c.getBody(document),
    X = f.areHostObjects(
      B,
      f.areHostProperties(B, ["anchorOffset", "focusOffset"])
    );
  k.features.selectionHasAnchorAndFocus = X;
  var aa = f.isHostMethod(B, "extend");
  k.features.selectionHasExtend = aa;
  var ga = typeof B.rangeCount == "number";
  k.features.selectionHasRangeCount = ga;
  var ba = false,
    T = true;
  f.areHostMethods(B, ["addRange", "getRangeAt", "removeAllRanges"]) &&
    typeof B.rangeCount == "number" &&
    k.features.implementsDomRange &&
    (function () {
      var b = document.createElement("iframe");
      Z.appendChild(b);
      var e = c.getIframeDocument(b);
      e.open();
      e.write("<html><head></head><body>12</body></html>");
      e.close();
      var i = c.getIframeWindow(b).getSelection(),
        E = e.documentElement.lastChild.firstChild;
      e = e.createRange();
      e.setStart(E, 1);
      e.collapse(true);
      i.addRange(e);
      T = i.rangeCount == 1;
      i.removeAllRanges();
      var I = e.cloneRange();
      e.setStart(E, 0);
      I.setEnd(E, 2);
      i.addRange(e);
      i.addRange(I);
      ba = i.rangeCount == 2;
      e.detach();
      I.detach();
      Z.removeChild(b);
    })();
  k.features.selectionSupportsMultipleRanges = ba;
  k.features.collapsedNonEditableSelectionsSupported = T;
  var l = false,
    D;
  if (Z && f.isHostMethod(Z, "createControlRange")) {
    D = Z.createControlRange();
    if (f.areHostProperties(D, ["item", "add"])) l = true;
  }
  k.features.implementsControlRange = l;
  w = X
    ? function (b) {
        return b.anchorNode === b.focusNode && b.anchorOffset === b.focusOffset;
      }
    : function (b) {
        return b.rangeCount ? b.getRangeAt(b.rangeCount - 1).collapsed : false;
      };
  var Q;
  if (f.isHostMethod(B, "getRangeAt"))
    Q = function (b, e) {
      try {
        return b.getRangeAt(e);
      } catch (i) {
        return null;
      }
    };
  else if (X)
    Q = function (b) {
      var e = c.getDocument(b.anchorNode);
      e = k.createRange(e);
      e.setStart(b.anchorNode, b.anchorOffset);
      e.setEnd(b.focusNode, b.focusOffset);
      if (e.collapsed !== this.isCollapsed) {
        e.setStart(b.focusNode, b.focusOffset);
        e.setEnd(b.anchorNode, b.anchorOffset);
      }
      return e;
    };
  k.getSelection = function (b) {
    b = b || window;
    var e = b._rangySelection,
      i = u(b),
      E = F ? K(b) : null;
    if (e) {
      e.nativeSelection = i;
      e.docSelection = E;
      e.refresh(b);
    } else {
      e = new x(i, E, b);
      b._rangySelection = e;
    }
    return e;
  };
  k.getIframeSelection = function (b) {
    return k.getSelection(c.getIframeWindow(b));
  };
  D = x.prototype;
  if (!W && X && f.areHostMethods(B, ["removeAllRanges", "addRange"])) {
    D.removeAllRanges = function () {
      this.nativeSelection.removeAllRanges();
      C(this);
    };
    var ea = function (b, e) {
      var i = j.getRangeDocument(e);
      i = k.createRange(i);
      i.collapseToPoint(e.endContainer, e.endOffset);
      b.nativeSelection.addRange(N(i));
      b.nativeSelection.extend(e.startContainer, e.startOffset);
      b.refresh();
    };
    D.addRange = ga
      ? function (b, e) {
          if (l && F && this.docSelection.type == "Control") t(this, b);
          else if (e && aa) ea(this, b);
          else {
            var i;
            if (ba) i = this.rangeCount;
            else {
              this.removeAllRanges();
              i = 0;
            }
            this.nativeSelection.addRange(N(b));
            this.rangeCount = this.nativeSelection.rangeCount;
            if (this.rangeCount == i + 1) {
              if (k.config.checkSelectionRanges)
                if (
                  (i = Q(this.nativeSelection, this.rangeCount - 1)) &&
                  !j.rangesEqual(i, b)
                )
                  b = new r(i);
              this._ranges[this.rangeCount - 1] = b;
              z(this, b, $(this.nativeSelection));
              this.isCollapsed = w(this);
            } else this.refresh();
          }
        }
      : function (b, e) {
          if (e && aa) ea(this, b);
          else {
            this.nativeSelection.addRange(N(b));
            this.refresh();
          }
        };
    D.setRanges = function (b) {
      if (l && b.length > 1) A(this, b);
      else {
        this.removeAllRanges();
        for (var e = 0, i = b.length; e < i; ++e) this.addRange(b[e]);
      }
    };
  } else if (
    f.isHostMethod(B, "empty") &&
    f.isHostMethod(da, "select") &&
    l &&
    W
  ) {
    D.removeAllRanges = function () {
      try {
        this.docSelection.empty();
        if (this.docSelection.type != "None") {
          var b;
          if (this.anchorNode) b = c.getDocument(this.anchorNode);
          else if (this.docSelection.type == "Control") {
            var e = this.docSelection.createRange();
            if (e.length) b = c.getDocument(e.item(0)).body.createTextRange();
          }
          if (b) {
            b.body.createTextRange().select();
            this.docSelection.empty();
          }
        }
      } catch (i) {}
      C(this);
    };
    D.addRange = function (b) {
      if (this.docSelection.type == "Control") t(this, b);
      else {
        r.rangeToTextRange(b).select();
        this._ranges[0] = b;
        this.rangeCount = 1;
        this.isCollapsed = this._ranges[0].collapsed;
        z(this, b, false);
      }
    };
    D.setRanges = function (b) {
      this.removeAllRanges();
      var e = b.length;
      if (e > 1) A(this, b);
      else e && this.addRange(b[0]);
    };
  } else {
    L.fail("No means of selecting a Range or TextRange was found");
    return false;
  }
  D.getRangeAt = function (b) {
    if (b < 0 || b >= this.rangeCount) throw new M("INDEX_SIZE_ERR");
    else return this._ranges[b];
  };
  var Y;
  if (W)
    Y = function (b) {
      var e;
      if (k.isSelectionValid(b.win)) e = b.docSelection.createRange();
      else {
        e = c.getBody(b.win.document).createTextRange();
        e.collapse(true);
      }
      if (b.docSelection.type == "Control") n(b);
      else e && typeof e.text != "undefined" ? g(b, e) : C(b);
    };
  else if (f.isHostMethod(B, "getRangeAt") && typeof B.rangeCount == "number")
    Y = function (b) {
      if (l && F && b.docSelection.type == "Control") n(b);
      else {
        b._ranges.length = b.rangeCount = b.nativeSelection.rangeCount;
        if (b.rangeCount) {
          for (var e = 0, i = b.rangeCount; e < i; ++e)
            b._ranges[e] = new k.WrappedRange(b.nativeSelection.getRangeAt(e));
          z(b, b._ranges[b.rangeCount - 1], $(b.nativeSelection));
          b.isCollapsed = w(b);
        } else C(b);
      }
    };
  else if (
    X &&
    typeof B.isCollapsed == "boolean" &&
    typeof da.collapsed == "boolean" &&
    k.features.implementsDomRange
  )
    Y = function (b) {
      var e;
      e = b.nativeSelection;
      if (e.anchorNode) {
        e = Q(e, 0);
        b._ranges = [e];
        b.rangeCount = 1;
        e = b.nativeSelection;
        b.anchorNode = e.anchorNode;
        b.anchorOffset = e.anchorOffset;
        b.focusNode = e.focusNode;
        b.focusOffset = e.focusOffset;
        b.isCollapsed = w(b);
      } else C(b);
    };
  else {
    L.fail(
      "No means of obtaining a Range or TextRange from the user's selection was found"
    );
    return false;
  }
  D.refresh = function (b) {
    var e = b ? this._ranges.slice(0) : null;
    Y(this);
    if (b) {
      b = e.length;
      if (b != this._ranges.length) return false;
      for (; b--; ) if (!j.rangesEqual(e[b], this._ranges[b])) return false;
      return true;
    }
  };
  var ha = function (b, e) {
    var i = b.getAllRanges(),
      E = false;
    b.removeAllRanges();
    for (var I = 0, P = i.length; I < P; ++I)
      if (E || e !== i[I]) b.addRange(i[I]);
      else E = true;
    b.rangeCount || C(b);
  };
  D.removeRange = l
    ? function (b) {
        if (this.docSelection.type == "Control") {
          var e = this.docSelection.createRange();
          b = O(b);
          var i = c.getDocument(e.item(0));
          i = c.getBody(i).createControlRange();
          for (var E, I = false, P = 0, ca = e.length; P < ca; ++P) {
            E = e.item(P);
            if (E !== b || I) i.add(e.item(P));
            else I = true;
          }
          i.select();
          n(this);
        } else ha(this, b);
      }
    : function (b) {
        ha(this, b);
      };
  var $;
  if (!W && X && k.features.implementsDomRange) {
    $ = function (b) {
      var e = false;
      if (b.anchorNode)
        e =
          c.comparePoints(
            b.anchorNode,
            b.anchorOffset,
            b.focusNode,
            b.focusOffset
          ) == 1;
      return e;
    };
    D.isBackwards = function () {
      return $(this);
    };
  } else
    $ = D.isBackwards = function () {
      return false;
    };
  D.toString = function () {
    for (var b = [], e = 0, i = this.rangeCount; e < i; ++e)
      b[e] = "" + this._ranges[e];
    return b.join("");
  };
  D.collapse = function (b, e) {
    q(this, b);
    var i = k.createRange(c.getDocument(b));
    i.collapseToPoint(b, e);
    this.removeAllRanges();
    this.addRange(i);
    this.isCollapsed = true;
  };
  D.collapseToStart = function () {
    if (this.rangeCount) {
      var b = this._ranges[0];
      this.collapse(b.startContainer, b.startOffset);
    } else throw new M("INVALID_STATE_ERR");
  };
  D.collapseToEnd = function () {
    if (this.rangeCount) {
      var b = this._ranges[this.rangeCount - 1];
      this.collapse(b.endContainer, b.endOffset);
    } else throw new M("INVALID_STATE_ERR");
  };
  D.selectAllChildren = function (b) {
    q(this, b);
    var e = k.createRange(c.getDocument(b));
    e.selectNodeContents(b);
    this.removeAllRanges();
    this.addRange(e);
  };
  D.deleteFromDocument = function () {
    if (l && F && this.docSelection.type == "Control") {
      for (var b = this.docSelection.createRange(), e; b.length; ) {
        e = b.item(0);
        b.remove(e);
        e.parentNode.removeChild(e);
      }
      this.refresh();
    } else if (this.rangeCount) {
      b = this.getAllRanges();
      this.removeAllRanges();
      e = 0;
      for (var i = b.length; e < i; ++e) b[e].deleteContents();
      this.addRange(b[i - 1]);
    }
  };
  D.getAllRanges = function () {
    return this._ranges.slice(0);
  };
  D.setSingleRange = function (b) {
    this.setRanges([b]);
  };
  D.containsNode = function (b, e) {
    for (var i = 0, E = this._ranges.length; i < E; ++i)
      if (this._ranges[i].containsNode(b, e)) return true;
    return false;
  };
  D.toHtml = function () {
    var b = "";
    if (this.rangeCount) {
      b = j.getRangeDocument(this._ranges[0]).createElement("div");
      for (var e = 0, i = this._ranges.length; e < i; ++e)
        b.appendChild(this._ranges[e].cloneContents());
      b = b.innerHTML;
    }
    return b;
  };
  D.getName = function () {
    return "WrappedSelection";
  };
  D.inspect = function () {
    return v(this);
  };
  D.detach = function () {
    this.win =
      this.anchorNode =
      this.focusNode =
      this.win._rangySelection =
        null;
  };
  x.inspect = v;
  k.Selection = x;
  k.selectionPrototype = D;
  k.addCreateMissingNativeApiListener(function (b) {
    if (typeof b.getSelection == "undefined")
      b.getSelection = function () {
        return k.getSelection(this);
      };
    b = null;
  });
});
