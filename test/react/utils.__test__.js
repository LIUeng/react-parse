function testStringCoercion(value) {
  return '' + value;
}

function checkKeyStringCoercion(value) {
  try {
    testStringCoercion(value);
    var JSCompiler_inline_result = !1;
  } catch (e) {
    JSCompiler_inline_result = !0;
  }
  if (JSCompiler_inline_result) {
    JSCompiler_inline_result = console;
    var JSCompiler_temp_const = JSCompiler_inline_result.error;
    var JSCompiler_inline_result$jscomp$0 =
      ('function' === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag]) ||
      value.constructor.name ||
      'Object';
    JSCompiler_temp_const.call(
      JSCompiler_inline_result,
      'The provided key is an unsupported type %s. This value must be coerced to a string before using it here.',
      JSCompiler_inline_result$jscomp$0
    );
    return testStringCoercion(value);
  }
}

console.log('' + [1, 2, 3]);
console.log(checkKeyStringCoercion(Symbol('sf')));
