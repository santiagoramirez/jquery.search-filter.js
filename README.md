# jquery.search-filter.js
Simple jQuery plugin for creating powerful search filters.

## Options

### Request

**url**

The url to send the request.
```
default : ''
options : string
```

**data**

URL query string values.
```
default : {}
options : object
```

**dataType**

Response data type.
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

Point to an element which contains the Mustache template you'd like to use. Mustache can be downloaded from https://github.com/janl/mustache.js

```
default : false
options : jQuery selector
```

### Callbacks

**before**

Executes before request is sent.

```
default : function() {},
options : function(data) { /* your code here */ }
```

**success**

Executes if request is successful.

```
default : function() {},
options : function(data, textStatus, request) { /* your code here */ }
```
