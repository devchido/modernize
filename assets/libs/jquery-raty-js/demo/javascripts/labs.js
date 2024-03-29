var AntiBOT = {
    init: function (t) {
      (this.form = $(t)),
        (this.field = this.form.find(".not-human input")),
        (this.bot = $("#bot")),
        (this.label = this.form.find(".not-human label")),
        (this.submit = this.form.find(":submit")),
        this.binds(),
        this.lock();
    },
    binds: function () {
      var t = this;
      t.field.on("change", function () {
        t.field.is(":checked")
          ? (t.label.text("S\xe9rio?"), t.lock())
          : t.unlock();
      });
    },
    lock: function () {
      var t = this;
      t.bot.val(!0),
        t.submit.on("click", function (e) {
          e.preventDefault(),
            t.label.text("Hey! Me desmarque."),
            t.field.focus();
        });
    },
    unlock: function () {
      var t = this;
      t.submit.off("click"),
        t.bot.removeAttr("value"),
        t.label.text("Humanos! <3");
    },
  },
  CommentResponder = {
    init: function () {
      (this.body = $("#comment_body")),
        (this.comments = $(".comments")),
        (this.parent = $("#comment_parent_id")),
        (this.cancel = $("#replying-cancel")),
        (this.replying = $("#replying-to")),
        this.binds();
    },
    binds: function () {
      var t = this;
      t.comments.on("click", ".reply", function () {
        var e = $(this),
          i = e.data("id"),
          n = e.data("name");
        t.setParent(i),
          t.write(n + ",\n\n"),
          t.showReplying(i, n),
          t.showCancel(),
          t.focuz();
      }),
        t.cancel.on("click", function () {
          t.replying.css("visibility", "hidden"),
            t.body.val(""),
            t.cancel.css("visibility", "hidden"),
            t.parent.removeAttr("value"),
            t.focuz();
        });
    },
    focuz: function () {
      this.body.blur().focus();
    },
    setParent: function (t) {
      this.parent.val(t);
    },
    showCancel: function () {
      this.cancel.css("visibility", "visible");
    },
    showReplying: function (t, e) {
      var i = "#comment-" + t,
        n = "#" + t;
      this.replying
        .css("visibility", "visible")
        .children("strong")
        .html('<a href="' + i + '">' + n + "</a> " + e);
    },
    write: function (t) {
      this.body.val(t);
    },
  };
$(function () {
  var t = $("#donations");
  $(".i-heart").on("click", function () {
    t.slideToggle("fast");
  });
}),
  (function (t) {
    var e = {
      init: function (i) {
        return this.each(function () {
          this.opt = t.extend({}, t.fn.taby.defaults, i);
          var n = t(this).off(".taby");
          e._adjustTab.call(this),
            e._bind.call(this),
            n.data({ settings: this.opt, taby: !0 });
        });
      },
      _adjustTab: function () {
        this.opt.tab = "";
        for (var t = 0; t < this.opt.space; t++) this.opt.tab += " ";
      },
      _backspace: function () {
        var e = t(this).data("settings"),
          i = this.selectionStart;
        e.backspace &&
          this.value.slice(i - e.tab.length, i) == e.tab &&
          (this.evt.preventDefault(),
          (this.value =
            this.value.slice(0, i - e.tab.length) + this.value.slice(i)),
          (this.selectionStart = i - e.tab.length),
          (this.selectionEnd = i - e.tab.length));
      },
      _bind: function () {
        t(this).on(e._eventName(), function (t) {
          var i = t.keyCode || t.which;
          t.metaKey ||
            ((this.evt = t),
            9 == i
              ? t.shiftKey
                ? e._shiftTab.call(this)
                : e._tab.call(this)
              : 8 == i
                ? e._backspace.call(this)
                : 46 == i
                  ? e._del.call(this)
                  : 37 == i
                    ? e._left.call(this)
                    : 39 == i && e._right.call(this));
        });
      },
      _del: function () {
        var e = t(this).data("settings"),
          i = this.selectionStart,
          n = this.selectionEnd;
        e.del &&
          this.value.slice(i, i + e.tab.length) == e.tab &&
          (this.evt.preventDefault(),
          (this.value =
            this.value.slice(0, i) + this.value.slice(i + e.tab.length)),
          (this.selectionStart = i),
          (this.selectionEnd = n));
      },
      _eventName: function () {
        return e._isFirefox() ? "keypress.taby" : "keydown.taby";
      },
      _isFirefox: function () {
        return /firefox/.test(navigator.userAgent.toLowerCase());
      },
      _left: function () {
        var e = t(this).data("settings"),
          i = this.selectionStart,
          n = this.selectionEnd;
        if (
          (this.evt.shiftKey || (i = n),
          e.left === !0 && this.value.slice(i - e.tab.length, i) == e.tab)
        ) {
          this.evt.preventDefault();
          var s = e.tab.length,
            l = e.tab.length;
          this.evt.shiftKey && (l = 0),
            (this.selectionStart = i - s),
            (this.selectionEnd = n - l);
        }
      },
      _right: function () {
        var e = t(this).data("settings"),
          i = this.selectionStart,
          n = this.selectionEnd;
        this.evt.shiftKey || (n = i),
          e.right === !0 &&
            this.value.slice(n, n + e.tab.length) == e.tab &&
            (this.evt.preventDefault(),
            (this.selectionStart = i + (this.evt.shiftKey ? 0 : e.tab.length)),
            (this.selectionEnd = n + e.tab.length));
      },
      _shiftTab: function () {
        this.evt.preventDefault();
        var e = t(this).data("settings"),
          i = this.selectionStart,
          n = this.selectionEnd;
        if (
          ((preselection = this.value.slice(0, i)),
          (selection = this.value.slice(i, n)),
          (postselection = this.value.slice(n)),
          (isMultipleLine = selection.indexOf("\n") >= 0),
          (lineStart = preselection.lastIndexOf("\n")),
          (lineEnd = n + postselection.indexOf("\n")),
          (isFirst = 0 == i),
          (previousCharacter = isFirst ? "" : this.value.slice(i - 1, i)),
          0 > lineStart ? (lineStart = 0) : lineStart++,
          0 > lineEnd && (lineEnd = this.value.length),
          isMultipleLine)
        ) {
          selection.lastIndexOf("\n") == selection.length - 1 &&
            ((lineEnd = n - 1), (postselection = "\n" + postselection));
          var s = this.value.slice(lineStart, lineEnd),
            l = s;
          if (
            ((l = l
              .replace(new RegExp("^" + e.tab), "")
              .replace(new RegExp("\n" + e.tab, "g"), "\n")),
            s == l)
          )
            return;
          this.value =
            this.value.slice(0, lineStart) + l + this.value.slice(lineEnd);
          var a = s.length - l.length,
            h = i,
            c = n - a;
          isFirst || "\n" == previousCharacter || (h -= e.tab.length),
            lineStart > h && (h = lineStart);
          var o = 0 > h ? 0 : h,
            r = 0 > c ? 0 : c;
          (this.selectionStart = o), (this.selectionEnd = r);
        } else {
          var s = this.value.slice(lineStart, lineEnd),
            l = s;
          if ((0 == s.indexOf(e.tab) && (l = s.slice(e.tab.length)), s == l))
            return;
          this.value =
            this.value.slice(0, lineStart) + l + this.value.slice(lineEnd);
          var u = (takedEnd = e.tab.length);
          i - lineStart < e.tab.length &&
            ((u = i - lineStart), i == n && (takedEnd = u)),
            (this.selectionStart = i - u),
            (this.selectionEnd = n - takedEnd);
        }
      },
      _tab: function () {
        this.evt.preventDefault();
        var e = t(this).data("settings"),
          i = this.selectionStart,
          n = this.selectionEnd,
          s = this.value.slice(0, i),
          l = this.value.slice(i, n),
          a = this.value.slice(n),
          h = s.lastIndexOf("\n"),
          c = n + a.indexOf("\n"),
          o = 0 == i,
          r = n == this.value.length,
          u = o ? "" : this.value.slice(i - 1, i),
          f = r ? "" : this.value.slice(n, n + 1);
        if (
          (0 > h ? (h = 0) : h++,
          0 > c && (c = this.value.length),
          l.indexOf("\n") >= 0)
        ) {
          l.lastIndexOf("\n") == l.length - 1 && ((c = n - 1), (a = "\n" + a));
          var v = this.value.slice(h, c),
            d = v;
          if (
            ((d = e.tab + d.replace(new RegExp("\n", "g"), "\n" + e.tab)),
            v == d)
          )
            return;
          this.value = this.value.slice(0, h) + d + this.value.slice(c);
          var b = d.length - v.length,
            g = i,
            p = n + b;
          o || "\n" == u || (g += e.tab.length),
            (this.selectionStart = g),
            (this.selectionEnd = p);
        } else if ((!o && "\n" != u) || (!r && "\n" != f) || "" == l)
          (this.value = s + e.tab + a),
            (this.selectionStart = i + e.tab.length),
            (this.selectionEnd = i + e.tab.length);
        else {
          var v = this.value.slice(h, c);
          (this.value = s + e.tab + v + a),
            (this.selectionStart = i),
            (this.selectionEnd = n + e.tab.length);
        }
      },
      goTo: function (t) {
        return this.each(function () {
          this.focus(), (this.selectionStart = t), (this.selectionEnd = t);
        });
      },
      select: function (t, e) {
        return this.each(function () {
          this.focus(),
            (this.selectionStart = t),
            (this.selectionEnd = void 0 === e ? this.value.length : e);
        });
      },
      set: function (e) {
        return this.each(function () {
          var i = t(this),
            n = i.data("settings"),
            s = t.extend({}, n, e);
          i.taby(s);
        });
      },
    };
    (t.fn.taby = function (i) {
      return e[i]
        ? e[i].apply(this, Array.prototype.slice.call(arguments, 1))
        : "object" != typeof i && i
          ? void t.error("Method " + i + " does not exist!")
          : e.init.apply(this, arguments);
    }),
      (t.fn.taby.defaults = {
        backspace: !0,
        del: !0,
        left: !0,
        right: !0,
        space: 2,
      });
  })(jQuery);
