;(function ( $, window, document, undefined ) {

    // define your widget under a namespace of your choice
    //  with additional parameters e.g.
    // $.widget( "namespace.widgetname", (optional) - an
    // existing widget prototype to inherit from, an object
    // literal to become the widget's prototype );

    $.widget( "xy.dansotope" , {

        //Options to be used as defaults
        options: {
            someValue: null
        },

        //Setup widget (eg. element creation, apply theming
        // , bind events etc.)
        _create: function () {

            // _create will automatically run the first time
            // this widget is called. Put the initial widget
            // setup code here, then you can access the element
            // on which the widget was called via this.element.
            // The options defined above can be accessed
            // via this.options this.element.addStuff();
            init(this);
            console.log("dansotope created!");
        },

        // Destroy an instantiated plugin and clean up
        // modifications the widget has made to the DOM
        destroy: function () {

            // this.element.removeStuff();
            // For UI 1.8, destroy must be invoked from the
            // base widget
            $.Widget.prototype.destroy.call(this);
            // For UI 1.9, define _destroy instead and don't
            // worry about
            // calling the base widget
        },

        methodB: function ( event ) {
            //_trigger dispatches callbacks the plugin user
            // can subscribe to
            // signature: _trigger( "callbackName" , [eventObject],
            // [uiObject] )
            // eg. this._trigger( "hover", e /*where e.type ==
            // "mouseenter"*/, { hovered: $(e.target)});
            console.log("methodB called");
        },

        methodA: function ( event ) {
            this._trigger("dataChanged", event, {
                key: "someValue"
            });
        },

        // Respond to any changes the user makes to the
        // option method
        _setOption: function ( key, value ) {
            switch (key) {
            case "someValue":
                //this.options.someValue = doSomethingWith( value );
                break;
            default:
                //this.options[ key ] = value;
                break;
            }

            // For UI 1.8, _setOption must be manually invoked
            // from the base widget
            $.Widget.prototype._setOption.apply( this, arguments );
            // For UI 1.9 the _super method can be used instead
            // this._super( "_setOption", key, value );
        }
    });

})( jQuery, window, document );


function init(self) {
    var columnsArray = [{
        'value': 1400,
        'columns': 6
    }, {
        'value': 800,
        'columns': 4
    }, {
        'value': 400,
        'columns': 2
    }, ];
    options = {
        maxWidth: 200,
        columns: columnsArray,
        gutter: -0.5
    };

    var $container = self.element;
    var $items = $container.children('.dansotope-item');


    layoutItemsInContainer($items, $container);


    //resize with debounce
    var timer;
    $(window).resize(function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            layoutItemsInContainer($items, $container);
        }, 300);

    });
}

function layoutItemsInContainer($_items, $_container) {
    containerWidth = $_container.width();

    layoutInVarMode();
    //layoutInFixedMode();

    /*In this mode the grid always occupies the container's full width.
    The maxWidth parameter determines how large the items will be at max.

    */

    function layoutInVarMode() {

        /*  how many columns are possible with max_width items + gutter?
            (implementend by recursion, because calculating worked, but had unresolvable issues.)
        */
        var columns = (function() {
            var i = 0,
                tWidth = 0;

            function walk() {
                tWidth += options.maxWidth;
                i++;
                if (0 !== i && 1 !== i) {
                    tWidth += options.gutter;
                }
                if (tWidth <= containerWidth) {

                    return walk();
                } else {
                    return i - 1;
                }
            }
            return walk();
        })();
        columns++;

        var yGutterWidthTotal = (columns - 1) * options.gutter,
            yGutterWidthPerColumn = yGutterWidthTotal / columns,
            width = ($_container.width() / columns) - yGutterWidthPerColumn;

        console.log(columns);

        $_items.each(function(index, el) {

            $el = $(el);
            //DEBUG ONLY
            $el.css('background-color', $(el).data('cat'));

            var row = Math.ceil((index + 1) / columns) - 1;
            var column = index - (row * columns);

            //$el.html("row: " + row + " \ncolumn: " + column + "\nwidth: " + Math.ceil(width));

            positionItem(row, column, width);
        });

    }

    function layoutInFixedMode() {
        return;
    }
}

function positionItem(row, column, _width) {

    var left = column * _width + column * options.gutter;
    var top = row * _width + row * options.gutter;

    console.log(_width);
    console.log(top);

    $el.width(_width).height(_width);
    $el.css('left', left + "px");
    $el.css('top', top + "px");
}