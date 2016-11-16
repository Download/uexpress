// simplified version of `extend` that does not do deep cloning, but does 
// accept an optional array of key names to skip as it's first argument. 
module.exports = function extend() {
	var args = [].splice.call(arguments, []), except, out = args.shift()
	if (Array.isArray(out)) {except = out; out = args.shift()}
  for (var i=0,src; i<args.length; i++) {
		src = args[i]
    if (src !== undefined && src !== null) {
      for (var key in src) {
				if (Array.isArray(except) && except.indexOf(key) !== -1) continue
				out[key] = src[key]
			}
    }
  }
  return out;
}
