// curry functions with up to 2 arguments
function cTwo(fn) {
  return x => {
    return y => {
      return fn(x, y)
    }
  }
}

function cThree(fn) {
  return function(x) {
    return function(y) {
      return function(z) {
        return fn(x, y, z)
      }
    }
  }
}

// But, how can I make a function return 2 functions?

function returnTwo(a, b) {
  return function a() {
    return function a() {
      console.log('blah')
    }
  }
}

// okay, now what about make a function return as many functions as we want?

function nFunc(n) {
  if (n == 1) {
    return function(x) {
      console.log('blah')
    }
  } else {
    return function(a) {
      return nFunc(n-1)
    }
  }
}

// great, now we can do fancy things like:
// 
// var rtn = nFunc(3)
// 
// ƒ (a) {
//   return nFunc(n-1)
// }

// and can be used as:
// rtn()()() // 'blah'

// now that we know how to return multiple functions, how can we curry a function
// using this knowledge?

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
  try {
    if (fn.length == 0) {
      throw new Error('target function must take at least 1 argument')
    }
    return nest(fn, fn.length, [])
  } catch (err) {
    console.log(err)
  }
}

var add = (a1, a2) => {
  return a1 + a2
}

var add3 = (a1, a2, a3) => {
  return a1 + a2 + a3
}

var add0 = function() {
  return 42
}

// now 'addCurried' is add curried, the 2 represents the 
// number of arguments the original function accepts

// var addCurried = curry(add, 2)

// let's make this more approachable and use `add.length` instead of
// parametrizing the arg count for depth control; also, let's decouple
// it from the curry function, as this information goes with the first
// argument

var addCurried = curry(add)
var add3Curried = curry(add3)
// var add0Curried = curry(add0) // should throw an error

console.log(addCurried(3)(4)) // 7
console.log(add3Curried(3)(4)(1)) // 8