/* bender-tags: editor */
/* bender-ckeditor-plugins: dialog,button,forms,htmlwriter,toolbar */
/* bender-include: _helpers/tools.js */
/* global formsTools */

var assertRequiredAttribute = formsTools.assertRequiredAttribute;

bender.editor = {
  config: {
    autoParagraph: false,
  },
};

bender.test({
  "test fill fields": function () {
    var bot = this.editorBot;

    bot.dialog("checkbox", function (dialog) {
      dialog.setValueOf("info", "txtName", "name");
      dialog.setValueOf("info", "txtValue", "value");
      dialog.setValueOf("info", "cmbSelected", "checked");
      dialog.setValueOf("info", "required", "checked");

      dialog.getButton("ok").click();

      assert.areSame(
        '<input checked="checked" name="name" required="required" type="checkbox" value="value" />',
        bot.getData(false, true)
      );
    });
  },

  "test empty fields": function () {
    var bot = this.editorBot;

    bot.setHtmlWithSelection(
      '[<input checked="checked" name="name" required="required" type="checkbox" value="value" />]'
    );

    bot.dialog("checkbox", function (dialog) {
      assert.areSame("name", dialog.getValueOf("info", "txtName"));
      assert.areSame("value", dialog.getValueOf("info", "txtValue"));
      assert.areSame(true, dialog.getValueOf("info", "cmbSelected"));
      assert.areSame(true, dialog.getValueOf("info", "required"));

      dialog.setValueOf("info", "txtName", "");
      dialog.setValueOf("info", "txtValue", "");
      dialog.setValueOf("info", "cmbSelected", "");
      dialog.setValueOf("info", "required", "");

      dialog.getButton("ok").click();

      assert.areSame('<input type="checkbox" />', bot.getData(false, true));
    });
  },

  "test required attribute collapsed": assertRequiredAttribute({
    html: '[<input type="checkbox" required />]',
    type: "checkbox",
    expected: true,
  }),

  "test required attribute without value": assertRequiredAttribute({
    html: '[<input type="checkbox" required="" />]',
    type: "checkbox",
    expected: true,
  }),

  "test required attribute with value `required`": assertRequiredAttribute({
    html: '[<input type="checkbox" required="required" />]',
    type: "checkbox",
    expected: true,
  }),

  "test required attribute absent": assertRequiredAttribute({
    html: '[<input type="checkbox" />]',
    type: "checkbox",
    expected: false,
  }),

  "test required attribute with invalid value": assertRequiredAttribute({
    html: '[<input type="checkbox" required="any value other than empty string or required" />]',
    type: "checkbox",
    expected: true,
  }),
});
