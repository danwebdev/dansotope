dansotope
=========

dansotope will become a jquery plugin for layouting and rendering grid-layouts.
It will especially come in handy for portfolio-type parts of websites.

Currently the grid only works with one-size grid items (all items share the same width). This will change in future.

dansotope creates full-width grids.
There will be 2(3?) layout-modes available:

 * 'fixed-item-width'
 * 'fixed-gutter-width' (currently implemented)
 * 'fixed-columns' ? (implies sth. like breakpoints..)


 Options:

 * item_selector (String) - The selector which tagets the individual items with the container. Default: 'dansotopy-item'

 * build-animation (String) - The animation used after initializing the widget.
 	Possible Values:
 	- fade
 	- fade_per_row
 	- fade_per_item

* resorting-animation (String) - The animation used when collection is resorted by resort().
 	Possible Values:
 	- linear_reflow
 	- all build-animations.




 *