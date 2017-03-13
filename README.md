# jquery.search-filter.js
Simple jQuery plugin for creating powerful search filters.

## Options

### General

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
default : $(this).selector . ' .s-next',
options : jQuery selector
```

**prevSelector**

Set the selector to use for the 'previous' button.

```
default : $(this).selector + ' .s-prev',
options : jQuery selector
```

**clearAllSelector**

Set the selector to use for the 'clear all' button

```
default : $(this).selector + ' .s-clear-all',
options : jQuery selector
```

**loadMoreSelector**

Set the selector to use for the 'load more' button

```
default : $(this).selector + ' .s-load-more',
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
