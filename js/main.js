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
        minWidth: 60,
        maxWidth: 160,
        minHeight: 60,
        maxHeight: 90,
        columns: columnsArray,
        gutter: 15
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

	layoutInVarMode();
	//layoutInFixedMode();
    function layoutInVarMode() {
        //how many colums per row with maxWidth?
        var columnsPerRow = Math.ceil($_container.width() / options.maxWidth);
        var yGutterWidthTotal = (columnsPerRow-1) * options.gutter;
        var yGutterWidthPerColumn = yGutterWidthTotal/columnsPerRow;
        columnsPerRow = Math.ceil($_container.width() / (options.maxWidth + yGutterWidthPerColumn));


        var width = ($_container.width() / columnsPerRow) - yGutterWidthPerColumn;


        console.log(yGutterWidthPerColumn);

        console.log((columnsPerRow*width + yGutterWidthTotal)-$_container.width());


        if (((columnsPerRow*width + yGutterWidthTotal)-$_container.width()) !== 0) {
            yGutterWidthPerColumn = yGutterWidthTotal/columnsPerRow;
            columnsPerRow = Math.ceil($_container.width() / (options.maxWidth + yGutterWidthPerColumn));
            width = ($_container.width() / (columnsPerRow+0)) - yGutterWidthPerColumn;
        }

        if (options.maxWidth * $_items.length < $_container.width()) {
            width = options.maxWidth;
        }

        $_items.each(function(index, el) {

            $el = $(el);
            //DEBUG ONLY
            $el.css('background-color', $(el).data('cat'));

            var row = Math.ceil((index + 1) / columnsPerRow) - 1;
            var column = index - (row * columnsPerRow);
            $el.html("row: " + row + " \ncolumn: " + column + "\nwidth: " + Math.ceil(width));

            moveItem(row, column, width);
        });
    }

    function layoutInFixedMode() {
		return;
    }
}

function moveItem(row, column, _width) {
    $el.width(_width).height(_width);
    $el.css('left', column * _width + column*options.gutter + "px");
    $el.css('top', row * _width + row*options.gutter+  "px");
}