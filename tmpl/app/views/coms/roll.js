/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
Magix.applyStyle('@roll.css');
module.exports = Magix.View.extend({
    tmpl: '@roll.html',
    tmplData: '@roll.html:data',
    render: function() {
        var me = this;
        me.$updater.digest();
    }
});