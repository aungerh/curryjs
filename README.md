## What?

How to do curry in js.

```js
function nest(fn, n_args, args) {
  if (n_args == 1) {
    return function(a) {
      args.push(a)
      return fn(...args)
    }
  } else {
    return function(a) {
      args.push(a)
      return nest(fn, n_args-1, args)
    }
  }
}

function curry(fn) {
  return nest(fn, fn.length, [])
}
```
