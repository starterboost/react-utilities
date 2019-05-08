# A set of JavaScript Utilities, targeted but not limited to React Developement

## Styles

A set of functions to help format Class Names and Styles

### ClassNames
Takes a collection of values and formats them as a single string with space delimiter, as expected by DOM element class attribute.
```
ClassName('a','b',null,'c') == 'a b c'
```

This is useful for complex className definitions as null values are removed:
```
ClassName(
	'button',
	'small',
	isSelected ? 'selected' : null
)
```