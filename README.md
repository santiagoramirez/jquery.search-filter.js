# jquery.search-filter.js
Simple jQuery plugin for creating powerful search filters.

## Options

### Request

**url**

A string containing the URL to which the request is sent.

See jQuery documentation for more info http://api.jquery.com/jquery.ajax/

```
default : ''
options : string
```

**data**

Data to be sent to the server.

See jQuery documentation for more info http://api.jquery.com/jquery.ajax/

```
default : {}
options : object
```

**dataType**

The type of data that you're expecting back from the server.

See jQuery documentation for more info http://api.jquery.com/jquery.ajax/

```
default : 'json'
options : 'json', 'html'
```

### Filter Settings

**autoUpdate**

Automatically send request whenever a user changes an input, select or list.
```
default : true
options : boolean (true / false)
```

**rememberSearch**

Remember the user's search.

```
default : false
options : boolean (true / false)
```

### Controls

**nextSelector**

Set the selector to use for the 'next' button.

```
default : $(this).selector . ' .sf-next',
options : jQuery selector
```

**prevSelector**

Set the selector to use for the 'previous' button.

```
default : $(this).selector + ' .sf-prev',
options : jQuery selector
```

**clearAllSelector**

Set the selector to use for the 'clear all' button

```
default : $(this).selector + ' .sf-clear-all',
options : jQuery selector
```

**loadMoreSelector**

Set the selector to use for the 'load more' button

```
default : $(this).selector + ' .sf-load-more',
options : jQuery selector
```

### Templating

**template**

An element containing the Mustache template you'd like to use.

Mustache can be downloaded from https://github.com/janl/mustache.js

```
default : false
options : jQuery selector
```

### Callbacks

**before**

A function to be called before the request is sent.

```
default : function() {},
options : function(data) { /* your code here */ }
```

**success**

A function to be called if the request succeeds.

See jQuery documentation for more info http://api.jquery.com/jquery.ajax/

```
default : function() {},
options : function(data, textStatus, request) { /* your code here */ }
```

**error**

A function to be called if the request fails.

See jQuery documentation for more info http://api.jquery.com/jquery.ajax/

```
default : function() {},
options : function(jqXHR, textStatus, error) { /* your code here */ }
```
