var view = require('../../lib/view');
var Make = require('../../lib/make');
var utils = require('../../lib/utils');

var colorGroups = [
    '#333444',
    '#FC5D5E',
    '#FEE444',
    '#1CB0B4',
    '#31ABDF'
];

module.exports = view.extend({
    id: 'color-picker',
    template: require('./index.html'),
    created: function () {
        var self = this;
        var $data = self.$data;
        var id = self.$parent.$data.params.id;
        make = new Make(id);
        $data.blockIndex = self.$parent.$data.params.index;
        $data.block = make.meta.blocks[$data.blockIndex];
        var attrs = $data.block.attributes;
        $data.selectedColor = $data.block.attributes.color.value;
        $data.colors.forEach(function (arr, i) {
            arr.forEach(function (color) {
                if (color === $data.selectedColor) {
                    $data.selectedGroup =  i;
                }
            });
            $data.selectedGroup = $data.selectedGroup || 0;
        });
    },
    data: {
        back: true,
        title: 'Select Color',
        onSelect: function (color) {
            var $data = this.$data;
            var attrs = $data.block.attributes;
            $data.selectedColor = color;
            attrs.color.value = $data.selectedColor;
            make.update($data.blockIndex, attrs);
        },
        onGroupSelect: function (i) {
            this.$data.selectedGroup = i;
        },
        colorGroups: colorGroups,
        colors: colorGroups.map(function (base) {
            var tints = [];
            for (var i = -5; i < 10; i++) {
                tints.push(utils.shadeColor(base, i * 6));
            }
            return tints;
        })
    }
});
