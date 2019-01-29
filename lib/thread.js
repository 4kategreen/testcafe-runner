export let thread = async function() { // a la clojure thread first `->` macro
  var args = Array.prototype.slice.call(arguments)
  var value = args.shift()
  while (args.length) {
    var arg = args.shift()
    if (arg instanceof Array) {
      var func = arg.shift()
      arg.unshift(value)
      value = await func.apply(this, arg)
    } else {
      value = await arg(value)
    }
  }
  return value
}
