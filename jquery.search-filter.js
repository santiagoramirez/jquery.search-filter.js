/*!
 * Plugin Name: searchFilter
 * Plugin Version: 0.1.0
 * Author Santiago Ramirez
 */
jQuery.fn.searchFilter = function(options) {

    var defaults = {

        // SETTINGS
        url : '',
        data : {},
        dataType : 'json',
        autoUpdate : true,
        rememberSearch : false,

        // CONTROLS
        nextSelector : jQuery(this).selector + " .s-next",
        prevSelector : jQuery(this).selector + " .s-prev",
        clearAllSelector : jQuery(this).selector + " .s-clear-all",
        loadMoreSelector : jQuery(this).selector + " .s-load-more",
        submitSelector : jQuery(this).selector + " .s-submit",

        // PAGINATION
        pageVar : 'page',
        perPageVar : 'per_page',
        offsetVar : 'offset',

        // CALLBACKS
        before : false,
        success : false,
        error : false,
    };

    for (option in defaults) {
        if (typeof options[option] === 'undefined') {
            options[option] = defaults[option];
        }
    }

    // Allow debugging
    var debug = true;

    // Set a reference for our filter
    var element = {};

    // Save default data for later use
    var defaultData = jQuery.extend({}, options.data);

    // Current page
    var page;

    ////////////////////////////////////////////////////////////////////////////
    // Private Functions
    ////////////////////////////////////////////////////////////////////////////

    var init = function() {
        jQuery(this).find("ul.filter-list li").click(handleListItem);
        jQuery(this).find("input.filter-input").doneTyping(handleInput, 500);
        jQuery(this).find("select.filter-select").change(handleInput);

        // Set clear all selector
        if (options.clearAllSelector) {
            jQuery(options.clearAllSelector).click(element.clearAll);
        }

        // Set load more selector
        if (options.loadMoreSelector) {
            jQuery(options.loadMoreSelector).click(element.loadMore);
        }

        // Set submit selector
        if (options.submitSelector) {
            jQuery(options.submitSelector).click(element.submit);
        }

        // Allow data to be stored locally
        if (options.rememberSearch === true) {
            var storedData = getStoredData();
            if (storedData) {
                options.data = storedData;
            }
        }

        // Set page
        if (options.pageVar) {
            if (!options.data[options.pageVar]) {
                options.data[options.pageVar] = 1;
            }
        }

        // Set default per page
        if (options.perPageVar) {
            if (!options.data[options.perPageVar]) {
                options.data[options.perPageVar] = 10;
            }
        }

        // Populate data
        populateData();
    }.bind(this);

    /**
     * Handle data from input/select
     */
    var handleInput = function() {
        var key = jQuery(this).attr("name");
        var value = jQuery(this).val();
        setParam(key, value);
        setPage(1);
        if (options.autoUpdate === true) {
            element.submit();
        }
    }

    /**
     * Handle data from list item.
     */
    var handleListItem = function() {
        var parent = jQuery(this).closest("ul[data-name]");
        var key = parent.attr("data-name");
        var value = jQuery(this).attr("data-value");
        var isSelected = jQuery(this).hasClass("selected");
        var multiSelectEnabled = jQuery(this).closest("ul[data-name]").hasClass("multi-select");

        if (isSelected) {
            if (multiSelectEnabled) {
                // Remove the value from the array
            } else {
                deleteParam(key);
            }
            jQuery(this).removeClass("selected");
        } else {
            if (multiSelectEnabled) {
                // Push the value to the array
            } else {
                parent.find("li").removeClass("selected");
                setParam(key, value);
            }
            jQuery(this).addClass("selected");
        }

        setPage(1);

        if (options.autoUpdate === true) {
            element.submit();
        }
    }

    /**
     * Set page
     */
    var setPage = function(page) {
        if (options.pageVar) {
            options.data[options.pageVar] = page;
        }
    }

    /**
     * Set data value
     */
    var setParam = function(key, value) {
        if (value != "") {
            options.data[key] = value;
            if (options.rememberSearch === true) {
                storeData();
            }
        } else {
            deleteParam(key);
        }
    }

    /**
     * Delete data value
     */
    var deleteParam = function(key) {
        delete options.data[key];
        if (options.rememberSearch === true) {
            storeData();
        }
    }

    /**
     * Store data locally
     */
    var storeData = function() {
        var pathname = window.location.pathname.replace(/([\W]+)/g, '');
        localStorage.setItem("search_filter_" + pathname, JSON.stringify(options.data));
    }

    /**
     * Get data stored locally
     */
    var getStoredData = function() {
        var pathname = window.location.pathname.replace(/([\W]+)/g, '');
        var storedData = JSON.parse(localStorage.getItem("search_filter_" + pathname));
        return storedData;
    }

    /**
     * Populate data from options.data into the appropriate input fields
     */
    var populateData = function() {
        // Reset values
        jQuery(this).find("ul.filter-list li").removeClass("selected");
        jQuery(this).find("input.filter-input").val("");
        jQuery(this).find("select.filter-select").val("");

        // Set new values
        for (key in options.data) {
            if (typeof options.data[key] === 'string' || options.data[key] instanceof String) {
                var listItemElement = jQuery(this).find("ul.filter-list[data-name=\"" + key + "\"] li[data-value=\"" + options.data[key] +  "\"]");
                var inputElement = jQuery(this).find("[name=\"" + key + "\"]");
                if (listItemElement.length) {
                    listItemElement.addClass("selected");
                } else if (inputElement.length) {
                    inputElement.val(options.data[key]);
                }
            } else if (typeof options.data[key] === 'array' || options.data[key] instanceof Array) {
                // Hanlde list item multi select
            }
        }
    }.bind(this);

    ////////////////////////////////////////////////////////////////////////////
    // Public Functions
    ////////////////////////////////////////////////////////////////////////////

    /**
     * Restore default data
     */
    element.clearAll = function() {
        options.data = defaultData;
        storeData();
        populateData();
        element.submit();
    }

    /**
     * Load previous page
     */
    element.prev = function() {
        if (options.data[options.pageVar]) {
            options.data[options.pageVar]--;
            storeData();
        }
        element.submit();
    }

    /**
     * Load next page
     */
    element.next = function() {
        if (options.data[options.pageVar]) {
            options.data[options.pageVar]++;
            storeData();
        }
        element.submit();
    }

    /**
     * Load more results
     */
    element.loadMore = function() {
        element.next();
    }

    /**
     * Submit data to url
     */
    element.submit = function() {
        if (options.before) {
            options.before(options.data);
        }
        jQuery.ajax({
            url: options.url,
            data: options.data,
            dataType: options.dataType,
            success: function(data, textStatus, request) {
                if (options.success) {
                    options.success(data, textStatus, request);
                }
            },
            error: function(error) {
                if (options.error) {
                    options.error(error);
                }
            }
        });
    }

    init();

    jQuery(element).data("searchFilter", this);

    // return current jQuery object
    return this;
}

/**
 * Author: Santiago Ramirez
 * Plugin Name: doneTyping
 * Plugin Version: 0.0.0
 *
 * Run a callback function after a defined time interval. This interval
 * is used to determine rather or not the user appears to be
 * "finished."
 */
jQuery.fn.doneTyping = function(callback, interval) {

    var timer;

    /**
     * Start timer as soon as the user appears to be "done."
     */
    jQuery(this).keyup(function() {
        clearTimeout(timer);
        timer = setTimeout(callback.bind(this), interval);
    });

    /**
     * Clear the timer once the user begins to type again.
     */
    jQuery(this).keydown(function() {
        clearTimeout(timer);
    });
}
