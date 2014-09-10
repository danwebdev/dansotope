//DANSOTOPE

$(document).ready(function() {

    var options;
    init();



});


function init() {
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
        maxWidth: 160,
        columns: columnsArray,
        gutter: 5
    };

    var $container = $(".dansotope-container").eq(0);
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

            $el.html("row: " + row + " \ncolumn: " + column + "\nwidth: " + Math.ceil(width));

            positionItem(row, column, width);
        });

    }

    function layoutInFixedMode() {
        return;
    }
}

function positionItem(row, column, _width) {

    $el.width(_width).height(_width);
    $el.css('left', column * _width + column * options.gutter + "px");
    $el.css('top', row * _width + row * options.gutter + "px");
}