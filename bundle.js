(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // (disabled):crypto
  var require_crypto = __commonJS({
    "(disabled):crypto"() {
    }
  });

  // (disabled):node_modules/node-fetch/src/index.js
  var require_src = __commonJS({
    "(disabled):node_modules/node-fetch/src/index.js"() {
    }
  });

  // (disabled):https
  var require_https = __commonJS({
    "(disabled):https"() {
    }
  });

  // (disabled):fs
  var require_fs = __commonJS({
    "(disabled):fs"() {
    }
  });

  // (disabled):node_modules/openapi-enforcer/index.js
  var require_openapi_enforcer = __commonJS({
    "(disabled):node_modules/openapi-enforcer/index.js"() {
    }
  });

  // (disabled):net
  var require_net = __commonJS({
    "(disabled):net"() {
    }
  });

  // (disabled):events
  var require_events = __commonJS({
    "(disabled):events"() {
    }
  });

  // node_modules/has-symbols/shams.js
  var require_shams = __commonJS({
    "node_modules/has-symbols/shams.js"(exports2, module2) {
      "use strict";
      module2.exports = function hasSymbols() {
        if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
          return false;
        }
        if (typeof Symbol.iterator === "symbol") {
          return true;
        }
        var obj = {};
        var sym = Symbol("test");
        var symObj = Object(sym);
        if (typeof sym === "string") {
          return false;
        }
        if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
          return false;
        }
        if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
          return false;
        }
        var symVal = 42;
        obj[sym] = symVal;
        for (var _ in obj) {
          return false;
        }
        if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
          return false;
        }
        if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
          return false;
        }
        var syms = Object.getOwnPropertySymbols(obj);
        if (syms.length !== 1 || syms[0] !== sym) {
          return false;
        }
        if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
          return false;
        }
        if (typeof Object.getOwnPropertyDescriptor === "function") {
          var descriptor = (
            /** @type {PropertyDescriptor} */
            Object.getOwnPropertyDescriptor(obj, sym)
          );
          if (descriptor.value !== symVal || descriptor.enumerable !== true) {
            return false;
          }
        }
        return true;
      };
    }
  });

  // node_modules/has-tostringtag/shams.js
  var require_shams2 = __commonJS({
    "node_modules/has-tostringtag/shams.js"(exports2, module2) {
      "use strict";
      var hasSymbols = require_shams();
      module2.exports = function hasToStringTagShams() {
        return hasSymbols() && !!Symbol.toStringTag;
      };
    }
  });

  // node_modules/es-object-atoms/index.js
  var require_es_object_atoms = __commonJS({
    "node_modules/es-object-atoms/index.js"(exports2, module2) {
      "use strict";
      module2.exports = Object;
    }
  });

  // node_modules/es-errors/index.js
  var require_es_errors = __commonJS({
    "node_modules/es-errors/index.js"(exports2, module2) {
      "use strict";
      module2.exports = Error;
    }
  });

  // node_modules/es-errors/eval.js
  var require_eval = __commonJS({
    "node_modules/es-errors/eval.js"(exports2, module2) {
      "use strict";
      module2.exports = EvalError;
    }
  });

  // node_modules/es-errors/range.js
  var require_range = __commonJS({
    "node_modules/es-errors/range.js"(exports2, module2) {
      "use strict";
      module2.exports = RangeError;
    }
  });

  // node_modules/es-errors/ref.js
  var require_ref = __commonJS({
    "node_modules/es-errors/ref.js"(exports2, module2) {
      "use strict";
      module2.exports = ReferenceError;
    }
  });

  // node_modules/es-errors/syntax.js
  var require_syntax = __commonJS({
    "node_modules/es-errors/syntax.js"(exports2, module2) {
      "use strict";
      module2.exports = SyntaxError;
    }
  });

  // node_modules/es-errors/type.js
  var require_type = __commonJS({
    "node_modules/es-errors/type.js"(exports2, module2) {
      "use strict";
      module2.exports = TypeError;
    }
  });

  // node_modules/es-errors/uri.js
  var require_uri = __commonJS({
    "node_modules/es-errors/uri.js"(exports2, module2) {
      "use strict";
      module2.exports = URIError;
    }
  });

  // node_modules/math-intrinsics/abs.js
  var require_abs = __commonJS({
    "node_modules/math-intrinsics/abs.js"(exports2, module2) {
      "use strict";
      module2.exports = Math.abs;
    }
  });

  // node_modules/math-intrinsics/floor.js
  var require_floor = __commonJS({
    "node_modules/math-intrinsics/floor.js"(exports2, module2) {
      "use strict";
      module2.exports = Math.floor;
    }
  });

  // node_modules/math-intrinsics/max.js
  var require_max = __commonJS({
    "node_modules/math-intrinsics/max.js"(exports2, module2) {
      "use strict";
      module2.exports = Math.max;
    }
  });

  // node_modules/math-intrinsics/min.js
  var require_min = __commonJS({
    "node_modules/math-intrinsics/min.js"(exports2, module2) {
      "use strict";
      module2.exports = Math.min;
    }
  });

  // node_modules/math-intrinsics/pow.js
  var require_pow = __commonJS({
    "node_modules/math-intrinsics/pow.js"(exports2, module2) {
      "use strict";
      module2.exports = Math.pow;
    }
  });

  // node_modules/math-intrinsics/round.js
  var require_round = __commonJS({
    "node_modules/math-intrinsics/round.js"(exports2, module2) {
      "use strict";
      module2.exports = Math.round;
    }
  });

  // node_modules/math-intrinsics/isNaN.js
  var require_isNaN = __commonJS({
    "node_modules/math-intrinsics/isNaN.js"(exports2, module2) {
      "use strict";
      module2.exports = Number.isNaN || function isNaN2(a) {
        return a !== a;
      };
    }
  });

  // node_modules/math-intrinsics/sign.js
  var require_sign = __commonJS({
    "node_modules/math-intrinsics/sign.js"(exports2, module2) {
      "use strict";
      var $isNaN = require_isNaN();
      module2.exports = function sign2(number) {
        if ($isNaN(number) || number === 0) {
          return number;
        }
        return number < 0 ? -1 : 1;
      };
    }
  });

  // node_modules/gopd/gOPD.js
  var require_gOPD = __commonJS({
    "node_modules/gopd/gOPD.js"(exports2, module2) {
      "use strict";
      module2.exports = Object.getOwnPropertyDescriptor;
    }
  });

  // node_modules/gopd/index.js
  var require_gopd = __commonJS({
    "node_modules/gopd/index.js"(exports2, module2) {
      "use strict";
      var $gOPD = require_gOPD();
      if ($gOPD) {
        try {
          $gOPD([], "length");
        } catch (e) {
          $gOPD = null;
        }
      }
      module2.exports = $gOPD;
    }
  });

  // node_modules/es-define-property/index.js
  var require_es_define_property = __commonJS({
    "node_modules/es-define-property/index.js"(exports2, module2) {
      "use strict";
      var $defineProperty = Object.defineProperty || false;
      if ($defineProperty) {
        try {
          $defineProperty({}, "a", { value: 1 });
        } catch (e) {
          $defineProperty = false;
        }
      }
      module2.exports = $defineProperty;
    }
  });

  // node_modules/has-symbols/index.js
  var require_has_symbols = __commonJS({
    "node_modules/has-symbols/index.js"(exports2, module2) {
      "use strict";
      var origSymbol = typeof Symbol !== "undefined" && Symbol;
      var hasSymbolSham = require_shams();
      module2.exports = function hasNativeSymbols() {
        if (typeof origSymbol !== "function") {
          return false;
        }
        if (typeof Symbol !== "function") {
          return false;
        }
        if (typeof origSymbol("foo") !== "symbol") {
          return false;
        }
        if (typeof Symbol("bar") !== "symbol") {
          return false;
        }
        return hasSymbolSham();
      };
    }
  });

  // node_modules/get-proto/Reflect.getPrototypeOf.js
  var require_Reflect_getPrototypeOf = __commonJS({
    "node_modules/get-proto/Reflect.getPrototypeOf.js"(exports2, module2) {
      "use strict";
      module2.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
    }
  });

  // node_modules/get-proto/Object.getPrototypeOf.js
  var require_Object_getPrototypeOf = __commonJS({
    "node_modules/get-proto/Object.getPrototypeOf.js"(exports2, module2) {
      "use strict";
      var $Object = require_es_object_atoms();
      module2.exports = $Object.getPrototypeOf || null;
    }
  });

  // node_modules/function-bind/implementation.js
  var require_implementation = __commonJS({
    "node_modules/function-bind/implementation.js"(exports2, module2) {
      "use strict";
      var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
      var toStr = Object.prototype.toString;
      var max = Math.max;
      var funcType = "[object Function]";
      var concatty = function concatty2(a, b) {
        var arr = [];
        for (var i = 0; i < a.length; i += 1) {
          arr[i] = a[i];
        }
        for (var j = 0; j < b.length; j += 1) {
          arr[j + a.length] = b[j];
        }
        return arr;
      };
      var slicy = function slicy2(arrLike, offset) {
        var arr = [];
        for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
          arr[j] = arrLike[i];
        }
        return arr;
      };
      var joiny = function(arr, joiner) {
        var str = "";
        for (var i = 0; i < arr.length; i += 1) {
          str += arr[i];
          if (i + 1 < arr.length) {
            str += joiner;
          }
        }
        return str;
      };
      module2.exports = function bind(that) {
        var target = this;
        if (typeof target !== "function" || toStr.apply(target) !== funcType) {
          throw new TypeError(ERROR_MESSAGE + target);
        }
        var args = slicy(arguments, 1);
        var bound;
        var binder = function() {
          if (this instanceof bound) {
            var result = target.apply(
              this,
              concatty(args, arguments)
            );
            if (Object(result) === result) {
              return result;
            }
            return this;
          }
          return target.apply(
            that,
            concatty(args, arguments)
          );
        };
        var boundLength = max(0, target.length - args.length);
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
          boundArgs[i] = "$" + i;
        }
        bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
        if (target.prototype) {
          var Empty = function Empty2() {
          };
          Empty.prototype = target.prototype;
          bound.prototype = new Empty();
          Empty.prototype = null;
        }
        return bound;
      };
    }
  });

  // node_modules/function-bind/index.js
  var require_function_bind = __commonJS({
    "node_modules/function-bind/index.js"(exports2, module2) {
      "use strict";
      var implementation = require_implementation();
      module2.exports = Function.prototype.bind || implementation;
    }
  });

  // node_modules/call-bind-apply-helpers/functionCall.js
  var require_functionCall = __commonJS({
    "node_modules/call-bind-apply-helpers/functionCall.js"(exports2, module2) {
      "use strict";
      module2.exports = Function.prototype.call;
    }
  });

  // node_modules/call-bind-apply-helpers/functionApply.js
  var require_functionApply = __commonJS({
    "node_modules/call-bind-apply-helpers/functionApply.js"(exports2, module2) {
      "use strict";
      module2.exports = Function.prototype.apply;
    }
  });

  // node_modules/call-bind-apply-helpers/reflectApply.js
  var require_reflectApply = __commonJS({
    "node_modules/call-bind-apply-helpers/reflectApply.js"(exports2, module2) {
      "use strict";
      module2.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
    }
  });

  // node_modules/call-bind-apply-helpers/actualApply.js
  var require_actualApply = __commonJS({
    "node_modules/call-bind-apply-helpers/actualApply.js"(exports2, module2) {
      "use strict";
      var bind = require_function_bind();
      var $apply = require_functionApply();
      var $call = require_functionCall();
      var $reflectApply = require_reflectApply();
      module2.exports = $reflectApply || bind.call($call, $apply);
    }
  });

  // node_modules/call-bind-apply-helpers/index.js
  var require_call_bind_apply_helpers = __commonJS({
    "node_modules/call-bind-apply-helpers/index.js"(exports2, module2) {
      "use strict";
      var bind = require_function_bind();
      var $TypeError = require_type();
      var $call = require_functionCall();
      var $actualApply = require_actualApply();
      module2.exports = function callBindBasic(args) {
        if (args.length < 1 || typeof args[0] !== "function") {
          throw new $TypeError("a function is required");
        }
        return $actualApply(bind, $call, args);
      };
    }
  });

  // node_modules/dunder-proto/get.js
  var require_get = __commonJS({
    "node_modules/dunder-proto/get.js"(exports2, module2) {
      "use strict";
      var callBind = require_call_bind_apply_helpers();
      var gOPD = require_gopd();
      var hasProtoAccessor;
      try {
        hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
        [].__proto__ === Array.prototype;
      } catch (e) {
        if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") {
          throw e;
        }
      }
      var desc = !!hasProtoAccessor && gOPD && gOPD(
        Object.prototype,
        /** @type {keyof typeof Object.prototype} */
        "__proto__"
      );
      var $Object = Object;
      var $getPrototypeOf = $Object.getPrototypeOf;
      module2.exports = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? (
        /** @type {import('./get')} */
        function getDunder(value) {
          return $getPrototypeOf(value == null ? value : $Object(value));
        }
      ) : false;
    }
  });

  // node_modules/get-proto/index.js
  var require_get_proto = __commonJS({
    "node_modules/get-proto/index.js"(exports2, module2) {
      "use strict";
      var reflectGetProto = require_Reflect_getPrototypeOf();
      var originalGetProto = require_Object_getPrototypeOf();
      var getDunderProto = require_get();
      module2.exports = reflectGetProto ? function getProto(O) {
        return reflectGetProto(O);
      } : originalGetProto ? function getProto(O) {
        if (!O || typeof O !== "object" && typeof O !== "function") {
          throw new TypeError("getProto: not an object");
        }
        return originalGetProto(O);
      } : getDunderProto ? function getProto(O) {
        return getDunderProto(O);
      } : null;
    }
  });

  // node_modules/hasown/index.js
  var require_hasown = __commonJS({
    "node_modules/hasown/index.js"(exports2, module2) {
      "use strict";
      var call = Function.prototype.call;
      var $hasOwn = Object.prototype.hasOwnProperty;
      var bind = require_function_bind();
      module2.exports = bind.call(call, $hasOwn);
    }
  });

  // node_modules/get-intrinsic/index.js
  var require_get_intrinsic = __commonJS({
    "node_modules/get-intrinsic/index.js"(exports2, module2) {
      "use strict";
      var undefined2;
      var $Object = require_es_object_atoms();
      var $Error = require_es_errors();
      var $EvalError = require_eval();
      var $RangeError = require_range();
      var $ReferenceError = require_ref();
      var $SyntaxError = require_syntax();
      var $TypeError = require_type();
      var $URIError = require_uri();
      var abs = require_abs();
      var floor = require_floor();
      var max = require_max();
      var min = require_min();
      var pow = require_pow();
      var round = require_round();
      var sign2 = require_sign();
      var $Function = Function;
      var getEvalledConstructor = function(expressionSyntax) {
        try {
          return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
        } catch (e) {
        }
      };
      var $gOPD = require_gopd();
      var $defineProperty = require_es_define_property();
      var throwTypeError = function() {
        throw new $TypeError();
      };
      var ThrowTypeError = $gOPD ? function() {
        try {
          arguments.callee;
          return throwTypeError;
        } catch (calleeThrows) {
          try {
            return $gOPD(arguments, "callee").get;
          } catch (gOPDthrows) {
            return throwTypeError;
          }
        }
      }() : throwTypeError;
      var hasSymbols = require_has_symbols()();
      var getProto = require_get_proto();
      var $ObjectGPO = require_Object_getPrototypeOf();
      var $ReflectGPO = require_Reflect_getPrototypeOf();
      var $apply = require_functionApply();
      var $call = require_functionCall();
      var needsEval = {};
      var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
      var INTRINSICS = {
        __proto__: null,
        "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
        "%Array%": Array,
        "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
        "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
        "%AsyncFromSyncIteratorPrototype%": undefined2,
        "%AsyncFunction%": needsEval,
        "%AsyncGenerator%": needsEval,
        "%AsyncGeneratorFunction%": needsEval,
        "%AsyncIteratorPrototype%": needsEval,
        "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
        "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
        "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
        "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
        "%Boolean%": Boolean,
        "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
        "%Date%": Date,
        "%decodeURI%": decodeURI,
        "%decodeURIComponent%": decodeURIComponent,
        "%encodeURI%": encodeURI,
        "%encodeURIComponent%": encodeURIComponent,
        "%Error%": $Error,
        "%eval%": eval,
        // eslint-disable-line no-eval
        "%EvalError%": $EvalError,
        "%Float16Array%": typeof Float16Array === "undefined" ? undefined2 : Float16Array,
        "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
        "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
        "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
        "%Function%": $Function,
        "%GeneratorFunction%": needsEval,
        "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
        "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
        "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
        "%isFinite%": isFinite,
        "%isNaN%": isNaN,
        "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
        "%JSON%": typeof JSON === "object" ? JSON : undefined2,
        "%Map%": typeof Map === "undefined" ? undefined2 : Map,
        "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
        "%Math%": Math,
        "%Number%": Number,
        "%Object%": $Object,
        "%Object.getOwnPropertyDescriptor%": $gOPD,
        "%parseFloat%": parseFloat,
        "%parseInt%": parseInt,
        "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
        "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
        "%RangeError%": $RangeError,
        "%ReferenceError%": $ReferenceError,
        "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
        "%RegExp%": RegExp,
        "%Set%": typeof Set === "undefined" ? undefined2 : Set,
        "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
        "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
        "%String%": String,
        "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
        "%Symbol%": hasSymbols ? Symbol : undefined2,
        "%SyntaxError%": $SyntaxError,
        "%ThrowTypeError%": ThrowTypeError,
        "%TypedArray%": TypedArray,
        "%TypeError%": $TypeError,
        "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
        "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
        "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
        "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
        "%URIError%": $URIError,
        "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
        "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
        "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
        "%Function.prototype.call%": $call,
        "%Function.prototype.apply%": $apply,
        "%Object.defineProperty%": $defineProperty,
        "%Object.getPrototypeOf%": $ObjectGPO,
        "%Math.abs%": abs,
        "%Math.floor%": floor,
        "%Math.max%": max,
        "%Math.min%": min,
        "%Math.pow%": pow,
        "%Math.round%": round,
        "%Math.sign%": sign2,
        "%Reflect.getPrototypeOf%": $ReflectGPO
      };
      if (getProto) {
        try {
          null.error;
        } catch (e) {
          errorProto = getProto(getProto(e));
          INTRINSICS["%Error.prototype%"] = errorProto;
        }
      }
      var errorProto;
      var doEval = function doEval2(name) {
        var value;
        if (name === "%AsyncFunction%") {
          value = getEvalledConstructor("async function () {}");
        } else if (name === "%GeneratorFunction%") {
          value = getEvalledConstructor("function* () {}");
        } else if (name === "%AsyncGeneratorFunction%") {
          value = getEvalledConstructor("async function* () {}");
        } else if (name === "%AsyncGenerator%") {
          var fn = doEval2("%AsyncGeneratorFunction%");
          if (fn) {
            value = fn.prototype;
          }
        } else if (name === "%AsyncIteratorPrototype%") {
          var gen = doEval2("%AsyncGenerator%");
          if (gen && getProto) {
            value = getProto(gen.prototype);
          }
        }
        INTRINSICS[name] = value;
        return value;
      };
      var LEGACY_ALIASES = {
        __proto__: null,
        "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
        "%ArrayPrototype%": ["Array", "prototype"],
        "%ArrayProto_entries%": ["Array", "prototype", "entries"],
        "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
        "%ArrayProto_keys%": ["Array", "prototype", "keys"],
        "%ArrayProto_values%": ["Array", "prototype", "values"],
        "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
        "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
        "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
        "%BooleanPrototype%": ["Boolean", "prototype"],
        "%DataViewPrototype%": ["DataView", "prototype"],
        "%DatePrototype%": ["Date", "prototype"],
        "%ErrorPrototype%": ["Error", "prototype"],
        "%EvalErrorPrototype%": ["EvalError", "prototype"],
        "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
        "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
        "%FunctionPrototype%": ["Function", "prototype"],
        "%Generator%": ["GeneratorFunction", "prototype"],
        "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
        "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
        "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
        "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
        "%JSONParse%": ["JSON", "parse"],
        "%JSONStringify%": ["JSON", "stringify"],
        "%MapPrototype%": ["Map", "prototype"],
        "%NumberPrototype%": ["Number", "prototype"],
        "%ObjectPrototype%": ["Object", "prototype"],
        "%ObjProto_toString%": ["Object", "prototype", "toString"],
        "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
        "%PromisePrototype%": ["Promise", "prototype"],
        "%PromiseProto_then%": ["Promise", "prototype", "then"],
        "%Promise_all%": ["Promise", "all"],
        "%Promise_reject%": ["Promise", "reject"],
        "%Promise_resolve%": ["Promise", "resolve"],
        "%RangeErrorPrototype%": ["RangeError", "prototype"],
        "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
        "%RegExpPrototype%": ["RegExp", "prototype"],
        "%SetPrototype%": ["Set", "prototype"],
        "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
        "%StringPrototype%": ["String", "prototype"],
        "%SymbolPrototype%": ["Symbol", "prototype"],
        "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
        "%TypedArrayPrototype%": ["TypedArray", "prototype"],
        "%TypeErrorPrototype%": ["TypeError", "prototype"],
        "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
        "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
        "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
        "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
        "%URIErrorPrototype%": ["URIError", "prototype"],
        "%WeakMapPrototype%": ["WeakMap", "prototype"],
        "%WeakSetPrototype%": ["WeakSet", "prototype"]
      };
      var bind = require_function_bind();
      var hasOwn = require_hasown();
      var $concat = bind.call($call, Array.prototype.concat);
      var $spliceApply = bind.call($apply, Array.prototype.splice);
      var $replace = bind.call($call, String.prototype.replace);
      var $strSlice = bind.call($call, String.prototype.slice);
      var $exec = bind.call($call, RegExp.prototype.exec);
      var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
      var reEscapeChar = /\\(\\)?/g;
      var stringToPath = function stringToPath2(string) {
        var first = $strSlice(string, 0, 1);
        var last = $strSlice(string, -1);
        if (first === "%" && last !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
        } else if (last === "%" && first !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
        }
        var result = [];
        $replace(string, rePropName, function(match, number, quote, subString) {
          result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
        });
        return result;
      };
      var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
        var intrinsicName = name;
        var alias;
        if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
          alias = LEGACY_ALIASES[intrinsicName];
          intrinsicName = "%" + alias[0] + "%";
        }
        if (hasOwn(INTRINSICS, intrinsicName)) {
          var value = INTRINSICS[intrinsicName];
          if (value === needsEval) {
            value = doEval(intrinsicName);
          }
          if (typeof value === "undefined" && !allowMissing) {
            throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
          }
          return {
            alias,
            name: intrinsicName,
            value
          };
        }
        throw new $SyntaxError("intrinsic " + name + " does not exist!");
      };
      module2.exports = function GetIntrinsic(name, allowMissing) {
        if (typeof name !== "string" || name.length === 0) {
          throw new $TypeError("intrinsic name must be a non-empty string");
        }
        if (arguments.length > 1 && typeof allowMissing !== "boolean") {
          throw new $TypeError('"allowMissing" argument must be a boolean');
        }
        if ($exec(/^%?[^%]*%?$/, name) === null) {
          throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
        }
        var parts = stringToPath(name);
        var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
        var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
        var intrinsicRealName = intrinsic.name;
        var value = intrinsic.value;
        var skipFurtherCaching = false;
        var alias = intrinsic.alias;
        if (alias) {
          intrinsicBaseName = alias[0];
          $spliceApply(parts, $concat([0, 1], alias));
        }
        for (var i = 1, isOwn = true; i < parts.length; i += 1) {
          var part = parts[i];
          var first = $strSlice(part, 0, 1);
          var last = $strSlice(part, -1);
          if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
            throw new $SyntaxError("property names with quotes must have matching quotes");
          }
          if (part === "constructor" || !isOwn) {
            skipFurtherCaching = true;
          }
          intrinsicBaseName += "." + part;
          intrinsicRealName = "%" + intrinsicBaseName + "%";
          if (hasOwn(INTRINSICS, intrinsicRealName)) {
            value = INTRINSICS[intrinsicRealName];
          } else if (value != null) {
            if (!(part in value)) {
              if (!allowMissing) {
                throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
              }
              return void undefined2;
            }
            if ($gOPD && i + 1 >= parts.length) {
              var desc = $gOPD(value, part);
              isOwn = !!desc;
              if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
                value = desc.get;
              } else {
                value = value[part];
              }
            } else {
              isOwn = hasOwn(value, part);
              value = value[part];
            }
            if (isOwn && !skipFurtherCaching) {
              INTRINSICS[intrinsicRealName] = value;
            }
          }
        }
        return value;
      };
    }
  });

  // node_modules/call-bound/index.js
  var require_call_bound = __commonJS({
    "node_modules/call-bound/index.js"(exports2, module2) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBindBasic = require_call_bind_apply_helpers();
      var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
      module2.exports = function callBoundIntrinsic(name, allowMissing) {
        var intrinsic = (
          /** @type {(this: unknown, ...args: unknown[]) => unknown} */
          GetIntrinsic(name, !!allowMissing)
        );
        if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
          return callBindBasic(
            /** @type {const} */
            [intrinsic]
          );
        }
        return intrinsic;
      };
    }
  });

  // node_modules/is-arguments/index.js
  var require_is_arguments = __commonJS({
    "node_modules/is-arguments/index.js"(exports2, module2) {
      "use strict";
      var hasToStringTag = require_shams2()();
      var callBound = require_call_bound();
      var $toString = callBound("Object.prototype.toString");
      var isStandardArguments = function isArguments(value) {
        if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) {
          return false;
        }
        return $toString(value) === "[object Arguments]";
      };
      var isLegacyArguments = function isArguments(value) {
        if (isStandardArguments(value)) {
          return true;
        }
        return value !== null && typeof value === "object" && "length" in value && typeof value.length === "number" && value.length >= 0 && $toString(value) !== "[object Array]" && "callee" in value && $toString(value.callee) === "[object Function]";
      };
      var supportsStandardArguments = function() {
        return isStandardArguments(arguments);
      }();
      isStandardArguments.isLegacyArguments = isLegacyArguments;
      module2.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
    }
  });

  // node_modules/is-regex/index.js
  var require_is_regex = __commonJS({
    "node_modules/is-regex/index.js"(exports2, module2) {
      "use strict";
      var callBound = require_call_bound();
      var hasToStringTag = require_shams2()();
      var hasOwn = require_hasown();
      var gOPD = require_gopd();
      var fn;
      if (hasToStringTag) {
        $exec = callBound("RegExp.prototype.exec");
        isRegexMarker = {};
        throwRegexMarker = function() {
          throw isRegexMarker;
        };
        badStringifier = {
          toString: throwRegexMarker,
          valueOf: throwRegexMarker
        };
        if (typeof Symbol.toPrimitive === "symbol") {
          badStringifier[Symbol.toPrimitive] = throwRegexMarker;
        }
        fn = function isRegex(value) {
          if (!value || typeof value !== "object") {
            return false;
          }
          var descriptor = (
            /** @type {NonNullable<typeof gOPD>} */
            gOPD(
              /** @type {{ lastIndex?: unknown }} */
              value,
              "lastIndex"
            )
          );
          var hasLastIndexDataProperty = descriptor && hasOwn(descriptor, "value");
          if (!hasLastIndexDataProperty) {
            return false;
          }
          try {
            $exec(
              value,
              /** @type {string} */
              /** @type {unknown} */
              badStringifier
            );
          } catch (e) {
            return e === isRegexMarker;
          }
        };
      } else {
        $toString = callBound("Object.prototype.toString");
        regexClass = "[object RegExp]";
        fn = function isRegex(value) {
          if (!value || typeof value !== "object" && typeof value !== "function") {
            return false;
          }
          return $toString(value) === regexClass;
        };
      }
      var $exec;
      var isRegexMarker;
      var throwRegexMarker;
      var badStringifier;
      var $toString;
      var regexClass;
      module2.exports = fn;
    }
  });

  // node_modules/safe-regex-test/index.js
  var require_safe_regex_test = __commonJS({
    "node_modules/safe-regex-test/index.js"(exports2, module2) {
      "use strict";
      var callBound = require_call_bound();
      var isRegex = require_is_regex();
      var $exec = callBound("RegExp.prototype.exec");
      var $TypeError = require_type();
      module2.exports = function regexTester(regex) {
        if (!isRegex(regex)) {
          throw new $TypeError("`regex` must be a RegExp");
        }
        return function test(s) {
          return $exec(regex, s) !== null;
        };
      };
    }
  });

  // node_modules/is-generator-function/index.js
  var require_is_generator_function = __commonJS({
    "node_modules/is-generator-function/index.js"(exports2, module2) {
      "use strict";
      var callBound = require_call_bound();
      var safeRegexTest = require_safe_regex_test();
      var isFnRegex = safeRegexTest(/^\s*(?:function)?\*/);
      var hasToStringTag = require_shams2()();
      var getProto = require_get_proto();
      var toStr = callBound("Object.prototype.toString");
      var fnToStr = callBound("Function.prototype.toString");
      var getGeneratorFunc = function() {
        if (!hasToStringTag) {
          return false;
        }
        try {
          return Function("return function*() {}")();
        } catch (e) {
        }
      };
      var GeneratorFunction;
      module2.exports = function isGeneratorFunction(fn) {
        if (typeof fn !== "function") {
          return false;
        }
        if (isFnRegex(fnToStr(fn))) {
          return true;
        }
        if (!hasToStringTag) {
          var str = toStr(fn);
          return str === "[object GeneratorFunction]";
        }
        if (!getProto) {
          return false;
        }
        if (typeof GeneratorFunction === "undefined") {
          var generatorFunc = getGeneratorFunc();
          GeneratorFunction = generatorFunc ? (
            /** @type {GeneratorFunctionConstructor} */
            getProto(generatorFunc)
          ) : false;
        }
        return getProto(fn) === GeneratorFunction;
      };
    }
  });

  // node_modules/is-callable/index.js
  var require_is_callable = __commonJS({
    "node_modules/is-callable/index.js"(exports2, module2) {
      "use strict";
      var fnToStr = Function.prototype.toString;
      var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
      var badArrayLike;
      var isCallableMarker;
      if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
        try {
          badArrayLike = Object.defineProperty({}, "length", {
            get: function() {
              throw isCallableMarker;
            }
          });
          isCallableMarker = {};
          reflectApply(function() {
            throw 42;
          }, null, badArrayLike);
        } catch (_) {
          if (_ !== isCallableMarker) {
            reflectApply = null;
          }
        }
      } else {
        reflectApply = null;
      }
      var constructorRegex = /^\s*class\b/;
      var isES6ClassFn = function isES6ClassFunction(value) {
        try {
          var fnStr = fnToStr.call(value);
          return constructorRegex.test(fnStr);
        } catch (e) {
          return false;
        }
      };
      var tryFunctionObject = function tryFunctionToStr(value) {
        try {
          if (isES6ClassFn(value)) {
            return false;
          }
          fnToStr.call(value);
          return true;
        } catch (e) {
          return false;
        }
      };
      var toStr = Object.prototype.toString;
      var objectClass = "[object Object]";
      var fnClass = "[object Function]";
      var genClass = "[object GeneratorFunction]";
      var ddaClass = "[object HTMLAllCollection]";
      var ddaClass2 = "[object HTML document.all class]";
      var ddaClass3 = "[object HTMLCollection]";
      var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
      var isIE68 = !(0 in [,]);
      var isDDA = function isDocumentDotAll() {
        return false;
      };
      if (typeof document === "object") {
        all = document.all;
        if (toStr.call(all) === toStr.call(document.all)) {
          isDDA = function isDocumentDotAll(value) {
            if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
              try {
                var str = toStr.call(value);
                return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
              } catch (e) {
              }
            }
            return false;
          };
        }
      }
      var all;
      module2.exports = reflectApply ? function isCallable(value) {
        if (isDDA(value)) {
          return true;
        }
        if (!value) {
          return false;
        }
        if (typeof value !== "function" && typeof value !== "object") {
          return false;
        }
        try {
          reflectApply(value, null, badArrayLike);
        } catch (e) {
          if (e !== isCallableMarker) {
            return false;
          }
        }
        return !isES6ClassFn(value) && tryFunctionObject(value);
      } : function isCallable(value) {
        if (isDDA(value)) {
          return true;
        }
        if (!value) {
          return false;
        }
        if (typeof value !== "function" && typeof value !== "object") {
          return false;
        }
        if (hasToStringTag) {
          return tryFunctionObject(value);
        }
        if (isES6ClassFn(value)) {
          return false;
        }
        var strClass = toStr.call(value);
        if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
          return false;
        }
        return tryFunctionObject(value);
      };
    }
  });

  // node_modules/for-each/index.js
  var require_for_each = __commonJS({
    "node_modules/for-each/index.js"(exports2, module2) {
      "use strict";
      var isCallable = require_is_callable();
      var toStr = Object.prototype.toString;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var forEachArray = function forEachArray2(array, iterator, receiver) {
        for (var i = 0, len = array.length; i < len; i++) {
          if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
              iterator(array[i], i, array);
            } else {
              iterator.call(receiver, array[i], i, array);
            }
          }
        }
      };
      var forEachString = function forEachString2(string, iterator, receiver) {
        for (var i = 0, len = string.length; i < len; i++) {
          if (receiver == null) {
            iterator(string.charAt(i), i, string);
          } else {
            iterator.call(receiver, string.charAt(i), i, string);
          }
        }
      };
      var forEachObject = function forEachObject2(object, iterator, receiver) {
        for (var k in object) {
          if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
              iterator(object[k], k, object);
            } else {
              iterator.call(receiver, object[k], k, object);
            }
          }
        }
      };
      function isArray(x) {
        return toStr.call(x) === "[object Array]";
      }
      module2.exports = function forEach(list, iterator, thisArg) {
        if (!isCallable(iterator)) {
          throw new TypeError("iterator must be a function");
        }
        var receiver;
        if (arguments.length >= 3) {
          receiver = thisArg;
        }
        if (isArray(list)) {
          forEachArray(list, iterator, receiver);
        } else if (typeof list === "string") {
          forEachString(list, iterator, receiver);
        } else {
          forEachObject(list, iterator, receiver);
        }
      };
    }
  });

  // node_modules/possible-typed-array-names/index.js
  var require_possible_typed_array_names = __commonJS({
    "node_modules/possible-typed-array-names/index.js"(exports2, module2) {
      "use strict";
      module2.exports = [
        "Float16Array",
        "Float32Array",
        "Float64Array",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "BigInt64Array",
        "BigUint64Array"
      ];
    }
  });

  // node_modules/available-typed-arrays/index.js
  var require_available_typed_arrays = __commonJS({
    "node_modules/available-typed-arrays/index.js"(exports2, module2) {
      "use strict";
      var possibleNames = require_possible_typed_array_names();
      var g = typeof globalThis === "undefined" ? global : globalThis;
      module2.exports = function availableTypedArrays() {
        var out = [];
        for (var i = 0; i < possibleNames.length; i++) {
          if (typeof g[possibleNames[i]] === "function") {
            out[out.length] = possibleNames[i];
          }
        }
        return out;
      };
    }
  });

  // node_modules/define-data-property/index.js
  var require_define_data_property = __commonJS({
    "node_modules/define-data-property/index.js"(exports2, module2) {
      "use strict";
      var $defineProperty = require_es_define_property();
      var $SyntaxError = require_syntax();
      var $TypeError = require_type();
      var gopd = require_gopd();
      module2.exports = function defineDataProperty(obj, property, value) {
        if (!obj || typeof obj !== "object" && typeof obj !== "function") {
          throw new $TypeError("`obj` must be an object or a function`");
        }
        if (typeof property !== "string" && typeof property !== "symbol") {
          throw new $TypeError("`property` must be a string or a symbol`");
        }
        if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
          throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
        }
        if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
          throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
        }
        if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
          throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
        }
        if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
          throw new $TypeError("`loose`, if provided, must be a boolean");
        }
        var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
        var nonWritable = arguments.length > 4 ? arguments[4] : null;
        var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
        var loose = arguments.length > 6 ? arguments[6] : false;
        var desc = !!gopd && gopd(obj, property);
        if ($defineProperty) {
          $defineProperty(obj, property, {
            configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
            enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
            value,
            writable: nonWritable === null && desc ? desc.writable : !nonWritable
          });
        } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
          obj[property] = value;
        } else {
          throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
        }
      };
    }
  });

  // node_modules/has-property-descriptors/index.js
  var require_has_property_descriptors = __commonJS({
    "node_modules/has-property-descriptors/index.js"(exports2, module2) {
      "use strict";
      var $defineProperty = require_es_define_property();
      var hasPropertyDescriptors = function hasPropertyDescriptors2() {
        return !!$defineProperty;
      };
      hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
        if (!$defineProperty) {
          return null;
        }
        try {
          return $defineProperty([], "length", { value: 1 }).length !== 1;
        } catch (e) {
          return true;
        }
      };
      module2.exports = hasPropertyDescriptors;
    }
  });

  // node_modules/set-function-length/index.js
  var require_set_function_length = __commonJS({
    "node_modules/set-function-length/index.js"(exports2, module2) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var define2 = require_define_data_property();
      var hasDescriptors = require_has_property_descriptors()();
      var gOPD = require_gopd();
      var $TypeError = require_type();
      var $floor = GetIntrinsic("%Math.floor%");
      module2.exports = function setFunctionLength(fn, length) {
        if (typeof fn !== "function") {
          throw new $TypeError("`fn` is not a function");
        }
        if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) {
          throw new $TypeError("`length` must be a positive 32-bit integer");
        }
        var loose = arguments.length > 2 && !!arguments[2];
        var functionLengthIsConfigurable = true;
        var functionLengthIsWritable = true;
        if ("length" in fn && gOPD) {
          var desc = gOPD(fn, "length");
          if (desc && !desc.configurable) {
            functionLengthIsConfigurable = false;
          }
          if (desc && !desc.writable) {
            functionLengthIsWritable = false;
          }
        }
        if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
          if (hasDescriptors) {
            define2(
              /** @type {Parameters<define>[0]} */
              fn,
              "length",
              length,
              true,
              true
            );
          } else {
            define2(
              /** @type {Parameters<define>[0]} */
              fn,
              "length",
              length
            );
          }
        }
        return fn;
      };
    }
  });

  // node_modules/call-bind-apply-helpers/applyBind.js
  var require_applyBind = __commonJS({
    "node_modules/call-bind-apply-helpers/applyBind.js"(exports2, module2) {
      "use strict";
      var bind = require_function_bind();
      var $apply = require_functionApply();
      var actualApply = require_actualApply();
      module2.exports = function applyBind() {
        return actualApply(bind, $apply, arguments);
      };
    }
  });

  // node_modules/call-bind/index.js
  var require_call_bind = __commonJS({
    "node_modules/call-bind/index.js"(exports2, module2) {
      "use strict";
      var setFunctionLength = require_set_function_length();
      var $defineProperty = require_es_define_property();
      var callBindBasic = require_call_bind_apply_helpers();
      var applyBind = require_applyBind();
      module2.exports = function callBind(originalFunction) {
        var func = callBindBasic(arguments);
        var adjustedLength = originalFunction.length - (arguments.length - 1);
        return setFunctionLength(
          func,
          1 + (adjustedLength > 0 ? adjustedLength : 0),
          true
        );
      };
      if ($defineProperty) {
        $defineProperty(module2.exports, "apply", { value: applyBind });
      } else {
        module2.exports.apply = applyBind;
      }
    }
  });

  // node_modules/which-typed-array/index.js
  var require_which_typed_array = __commonJS({
    "node_modules/which-typed-array/index.js"(exports2, module2) {
      "use strict";
      var forEach = require_for_each();
      var availableTypedArrays = require_available_typed_arrays();
      var callBind = require_call_bind();
      var callBound = require_call_bound();
      var gOPD = require_gopd();
      var getProto = require_get_proto();
      var $toString = callBound("Object.prototype.toString");
      var hasToStringTag = require_shams2()();
      var g = typeof globalThis === "undefined" ? global : globalThis;
      var typedArrays = availableTypedArrays();
      var $slice = callBound("String.prototype.slice");
      var $indexOf = callBound("Array.prototype.indexOf", true) || function indexOf(array, value) {
        for (var i = 0; i < array.length; i += 1) {
          if (array[i] === value) {
            return i;
          }
        }
        return -1;
      };
      var cache = { __proto__: null };
      if (hasToStringTag && gOPD && getProto) {
        forEach(typedArrays, function(typedArray) {
          var arr = new g[typedArray]();
          if (Symbol.toStringTag in arr && getProto) {
            var proto = getProto(arr);
            var descriptor = gOPD(proto, Symbol.toStringTag);
            if (!descriptor && proto) {
              var superProto = getProto(proto);
              descriptor = gOPD(superProto, Symbol.toStringTag);
            }
            cache["$" + typedArray] = callBind(descriptor.get);
          }
        });
      } else {
        forEach(typedArrays, function(typedArray) {
          var arr = new g[typedArray]();
          var fn = arr.slice || arr.set;
          if (fn) {
            cache[
              /** @type {`$${import('.').TypedArrayName}`} */
              "$" + typedArray
            ] = /** @type {import('./types').BoundSlice | import('./types').BoundSet} */
            // @ts-expect-error TODO FIXME
            callBind(fn);
          }
        });
      }
      var tryTypedArrays = function tryAllTypedArrays(value) {
        var found = false;
        forEach(
          /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
          cache,
          /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
          function(getter, typedArray) {
            if (!found) {
              try {
                if ("$" + getter(value) === typedArray) {
                  found = /** @type {import('.').TypedArrayName} */
                  $slice(typedArray, 1);
                }
              } catch (e) {
              }
            }
          }
        );
        return found;
      };
      var trySlices = function tryAllSlices(value) {
        var found = false;
        forEach(
          /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
          cache,
          /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
          function(getter, name) {
            if (!found) {
              try {
                getter(value);
                found = /** @type {import('.').TypedArrayName} */
                $slice(name, 1);
              } catch (e) {
              }
            }
          }
        );
        return found;
      };
      module2.exports = function whichTypedArray(value) {
        if (!value || typeof value !== "object") {
          return false;
        }
        if (!hasToStringTag) {
          var tag = $slice($toString(value), 8, -1);
          if ($indexOf(typedArrays, tag) > -1) {
            return tag;
          }
          if (tag !== "Object") {
            return false;
          }
          return trySlices(value);
        }
        if (!gOPD) {
          return null;
        }
        return tryTypedArrays(value);
      };
    }
  });

  // node_modules/is-typed-array/index.js
  var require_is_typed_array = __commonJS({
    "node_modules/is-typed-array/index.js"(exports2, module2) {
      "use strict";
      var whichTypedArray = require_which_typed_array();
      module2.exports = function isTypedArray(value) {
        return !!whichTypedArray(value);
      };
    }
  });

  // node_modules/util/support/types.js
  var require_types = __commonJS({
    "node_modules/util/support/types.js"(exports2) {
      "use strict";
      var isArgumentsObject = require_is_arguments();
      var isGeneratorFunction = require_is_generator_function();
      var whichTypedArray = require_which_typed_array();
      var isTypedArray = require_is_typed_array();
      function uncurryThis(f) {
        return f.call.bind(f);
      }
      var BigIntSupported = typeof BigInt !== "undefined";
      var SymbolSupported = typeof Symbol !== "undefined";
      var ObjectToString = uncurryThis(Object.prototype.toString);
      var numberValue = uncurryThis(Number.prototype.valueOf);
      var stringValue = uncurryThis(String.prototype.valueOf);
      var booleanValue = uncurryThis(Boolean.prototype.valueOf);
      if (BigIntSupported) {
        bigIntValue = uncurryThis(BigInt.prototype.valueOf);
      }
      var bigIntValue;
      if (SymbolSupported) {
        symbolValue = uncurryThis(Symbol.prototype.valueOf);
      }
      var symbolValue;
      function checkBoxedPrimitive(value, prototypeValueOf) {
        if (typeof value !== "object") {
          return false;
        }
        try {
          prototypeValueOf(value);
          return true;
        } catch (e) {
          return false;
        }
      }
      exports2.isArgumentsObject = isArgumentsObject;
      exports2.isGeneratorFunction = isGeneratorFunction;
      exports2.isTypedArray = isTypedArray;
      function isPromise(input) {
        return typeof Promise !== "undefined" && input instanceof Promise || input !== null && typeof input === "object" && typeof input.then === "function" && typeof input.catch === "function";
      }
      exports2.isPromise = isPromise;
      function isArrayBufferView(value) {
        if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
          return ArrayBuffer.isView(value);
        }
        return isTypedArray(value) || isDataView(value);
      }
      exports2.isArrayBufferView = isArrayBufferView;
      function isUint8Array(value) {
        return whichTypedArray(value) === "Uint8Array";
      }
      exports2.isUint8Array = isUint8Array;
      function isUint8ClampedArray(value) {
        return whichTypedArray(value) === "Uint8ClampedArray";
      }
      exports2.isUint8ClampedArray = isUint8ClampedArray;
      function isUint16Array(value) {
        return whichTypedArray(value) === "Uint16Array";
      }
      exports2.isUint16Array = isUint16Array;
      function isUint32Array(value) {
        return whichTypedArray(value) === "Uint32Array";
      }
      exports2.isUint32Array = isUint32Array;
      function isInt8Array(value) {
        return whichTypedArray(value) === "Int8Array";
      }
      exports2.isInt8Array = isInt8Array;
      function isInt16Array(value) {
        return whichTypedArray(value) === "Int16Array";
      }
      exports2.isInt16Array = isInt16Array;
      function isInt32Array(value) {
        return whichTypedArray(value) === "Int32Array";
      }
      exports2.isInt32Array = isInt32Array;
      function isFloat32Array(value) {
        return whichTypedArray(value) === "Float32Array";
      }
      exports2.isFloat32Array = isFloat32Array;
      function isFloat64Array(value) {
        return whichTypedArray(value) === "Float64Array";
      }
      exports2.isFloat64Array = isFloat64Array;
      function isBigInt64Array(value) {
        return whichTypedArray(value) === "BigInt64Array";
      }
      exports2.isBigInt64Array = isBigInt64Array;
      function isBigUint64Array(value) {
        return whichTypedArray(value) === "BigUint64Array";
      }
      exports2.isBigUint64Array = isBigUint64Array;
      function isMapToString(value) {
        return ObjectToString(value) === "[object Map]";
      }
      isMapToString.working = typeof Map !== "undefined" && isMapToString(/* @__PURE__ */ new Map());
      function isMap(value) {
        if (typeof Map === "undefined") {
          return false;
        }
        return isMapToString.working ? isMapToString(value) : value instanceof Map;
      }
      exports2.isMap = isMap;
      function isSetToString(value) {
        return ObjectToString(value) === "[object Set]";
      }
      isSetToString.working = typeof Set !== "undefined" && isSetToString(/* @__PURE__ */ new Set());
      function isSet(value) {
        if (typeof Set === "undefined") {
          return false;
        }
        return isSetToString.working ? isSetToString(value) : value instanceof Set;
      }
      exports2.isSet = isSet;
      function isWeakMapToString(value) {
        return ObjectToString(value) === "[object WeakMap]";
      }
      isWeakMapToString.working = typeof WeakMap !== "undefined" && isWeakMapToString(/* @__PURE__ */ new WeakMap());
      function isWeakMap(value) {
        if (typeof WeakMap === "undefined") {
          return false;
        }
        return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
      }
      exports2.isWeakMap = isWeakMap;
      function isWeakSetToString(value) {
        return ObjectToString(value) === "[object WeakSet]";
      }
      isWeakSetToString.working = typeof WeakSet !== "undefined" && isWeakSetToString(/* @__PURE__ */ new WeakSet());
      function isWeakSet(value) {
        return isWeakSetToString(value);
      }
      exports2.isWeakSet = isWeakSet;
      function isArrayBufferToString(value) {
        return ObjectToString(value) === "[object ArrayBuffer]";
      }
      isArrayBufferToString.working = typeof ArrayBuffer !== "undefined" && isArrayBufferToString(new ArrayBuffer());
      function isArrayBuffer(value) {
        if (typeof ArrayBuffer === "undefined") {
          return false;
        }
        return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
      }
      exports2.isArrayBuffer = isArrayBuffer;
      function isDataViewToString(value) {
        return ObjectToString(value) === "[object DataView]";
      }
      isDataViewToString.working = typeof ArrayBuffer !== "undefined" && typeof DataView !== "undefined" && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
      function isDataView(value) {
        if (typeof DataView === "undefined") {
          return false;
        }
        return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
      }
      exports2.isDataView = isDataView;
      var SharedArrayBufferCopy = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : void 0;
      function isSharedArrayBufferToString(value) {
        return ObjectToString(value) === "[object SharedArrayBuffer]";
      }
      function isSharedArrayBuffer(value) {
        if (typeof SharedArrayBufferCopy === "undefined") {
          return false;
        }
        if (typeof isSharedArrayBufferToString.working === "undefined") {
          isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
        }
        return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBufferCopy;
      }
      exports2.isSharedArrayBuffer = isSharedArrayBuffer;
      function isAsyncFunction(value) {
        return ObjectToString(value) === "[object AsyncFunction]";
      }
      exports2.isAsyncFunction = isAsyncFunction;
      function isMapIterator(value) {
        return ObjectToString(value) === "[object Map Iterator]";
      }
      exports2.isMapIterator = isMapIterator;
      function isSetIterator(value) {
        return ObjectToString(value) === "[object Set Iterator]";
      }
      exports2.isSetIterator = isSetIterator;
      function isGeneratorObject(value) {
        return ObjectToString(value) === "[object Generator]";
      }
      exports2.isGeneratorObject = isGeneratorObject;
      function isWebAssemblyCompiledModule(value) {
        return ObjectToString(value) === "[object WebAssembly.Module]";
      }
      exports2.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
      function isNumberObject(value) {
        return checkBoxedPrimitive(value, numberValue);
      }
      exports2.isNumberObject = isNumberObject;
      function isStringObject(value) {
        return checkBoxedPrimitive(value, stringValue);
      }
      exports2.isStringObject = isStringObject;
      function isBooleanObject(value) {
        return checkBoxedPrimitive(value, booleanValue);
      }
      exports2.isBooleanObject = isBooleanObject;
      function isBigIntObject(value) {
        return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
      }
      exports2.isBigIntObject = isBigIntObject;
      function isSymbolObject(value) {
        return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
      }
      exports2.isSymbolObject = isSymbolObject;
      function isBoxedPrimitive(value) {
        return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
      }
      exports2.isBoxedPrimitive = isBoxedPrimitive;
      function isAnyArrayBuffer(value) {
        return typeof Uint8Array !== "undefined" && (isArrayBuffer(value) || isSharedArrayBuffer(value));
      }
      exports2.isAnyArrayBuffer = isAnyArrayBuffer;
      ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(method2) {
        Object.defineProperty(exports2, method2, {
          enumerable: false,
          value: function() {
            throw new Error(method2 + " is not supported in userland");
          }
        });
      });
    }
  });

  // node_modules/util/support/isBufferBrowser.js
  var require_isBufferBrowser = __commonJS({
    "node_modules/util/support/isBufferBrowser.js"(exports2, module2) {
      module2.exports = function isBuffer(arg) {
        return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
      };
    }
  });

  // node_modules/inherits/inherits_browser.js
  var require_inherits_browser = __commonJS({
    "node_modules/inherits/inherits_browser.js"(exports2, module2) {
      if (typeof Object.create === "function") {
        module2.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          }
        };
      } else {
        module2.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {
            };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }
        };
      }
    }
  });

  // node_modules/util/util.js
  var require_util = __commonJS({
    "node_modules/util/util.js"(exports2) {
      var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(obj) {
        var keys = Object.keys(obj);
        var descriptors = {};
        for (var i = 0; i < keys.length; i++) {
          descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
        }
        return descriptors;
      };
      var formatRegExp = /%[sdj%]/g;
      exports2.format = function(f) {
        if (!isString(f)) {
          var objects = [];
          for (var i = 0; i < arguments.length; i++) {
            objects.push(inspect(arguments[i]));
          }
          return objects.join(" ");
        }
        var i = 1;
        var args = arguments;
        var len = args.length;
        var str = String(f).replace(formatRegExp, function(x2) {
          if (x2 === "%%") return "%";
          if (i >= len) return x2;
          switch (x2) {
            case "%s":
              return String(args[i++]);
            case "%d":
              return Number(args[i++]);
            case "%j":
              try {
                return JSON.stringify(args[i++]);
              } catch (_) {
                return "[Circular]";
              }
            default:
              return x2;
          }
        });
        for (var x = args[i]; i < len; x = args[++i]) {
          if (isNull(x) || !isObject(x)) {
            str += " " + x;
          } else {
            str += " " + inspect(x);
          }
        }
        return str;
      };
      exports2.deprecate = function(fn, msg) {
        if (typeof process !== "undefined" && process.noDeprecation === true) {
          return fn;
        }
        if (typeof process === "undefined") {
          return function() {
            return exports2.deprecate(fn, msg).apply(this, arguments);
          };
        }
        var warned = false;
        function deprecated() {
          if (!warned) {
            if (process.throwDeprecation) {
              throw new Error(msg);
            } else if (process.traceDeprecation) {
              console.trace(msg);
            } else {
              console.error(msg);
            }
            warned = true;
          }
          return fn.apply(this, arguments);
        }
        return deprecated;
      };
      var debugs = {};
      var debugEnvRegex = /^$/;
      if (process.env.NODE_DEBUG) {
        debugEnv = process.env.NODE_DEBUG;
        debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
        debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
      }
      var debugEnv;
      exports2.debuglog = function(set) {
        set = set.toUpperCase();
        if (!debugs[set]) {
          if (debugEnvRegex.test(set)) {
            var pid = process.pid;
            debugs[set] = function() {
              var msg = exports2.format.apply(exports2, arguments);
              console.error("%s %d: %s", set, pid, msg);
            };
          } else {
            debugs[set] = function() {
            };
          }
        }
        return debugs[set];
      };
      function inspect(obj, opts) {
        var ctx = {
          seen: [],
          stylize: stylizeNoColor
        };
        if (arguments.length >= 3) ctx.depth = arguments[2];
        if (arguments.length >= 4) ctx.colors = arguments[3];
        if (isBoolean(opts)) {
          ctx.showHidden = opts;
        } else if (opts) {
          exports2._extend(ctx, opts);
        }
        if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
        if (isUndefined(ctx.depth)) ctx.depth = 2;
        if (isUndefined(ctx.colors)) ctx.colors = false;
        if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
        if (ctx.colors) ctx.stylize = stylizeWithColor;
        return formatValue(ctx, obj, ctx.depth);
      }
      exports2.inspect = inspect;
      inspect.colors = {
        "bold": [1, 22],
        "italic": [3, 23],
        "underline": [4, 24],
        "inverse": [7, 27],
        "white": [37, 39],
        "grey": [90, 39],
        "black": [30, 39],
        "blue": [34, 39],
        "cyan": [36, 39],
        "green": [32, 39],
        "magenta": [35, 39],
        "red": [31, 39],
        "yellow": [33, 39]
      };
      inspect.styles = {
        "special": "cyan",
        "number": "yellow",
        "boolean": "yellow",
        "undefined": "grey",
        "null": "bold",
        "string": "green",
        "date": "magenta",
        // "name": intentionally not styling
        "regexp": "red"
      };
      function stylizeWithColor(str, styleType) {
        var style = inspect.styles[styleType];
        if (style) {
          return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
        } else {
          return str;
        }
      }
      function stylizeNoColor(str, styleType) {
        return str;
      }
      function arrayToHash(array) {
        var hash2 = {};
        array.forEach(function(val, idx) {
          hash2[val] = true;
        });
        return hash2;
      }
      function formatValue(ctx, value, recurseTimes) {
        if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
        value.inspect !== exports2.inspect && // Also filter out any prototype objects using the circular check.
        !(value.constructor && value.constructor.prototype === value)) {
          var ret = value.inspect(recurseTimes, ctx);
          if (!isString(ret)) {
            ret = formatValue(ctx, ret, recurseTimes);
          }
          return ret;
        }
        var primitive = formatPrimitive(ctx, value);
        if (primitive) {
          return primitive;
        }
        var keys = Object.keys(value);
        var visibleKeys = arrayToHash(keys);
        if (ctx.showHidden) {
          keys = Object.getOwnPropertyNames(value);
        }
        if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
          return formatError(value);
        }
        if (keys.length === 0) {
          if (isFunction(value)) {
            var name = value.name ? ": " + value.name : "";
            return ctx.stylize("[Function" + name + "]", "special");
          }
          if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
          }
          if (isDate(value)) {
            return ctx.stylize(Date.prototype.toString.call(value), "date");
          }
          if (isError(value)) {
            return formatError(value);
          }
        }
        var base = "", array = false, braces = ["{", "}"];
        if (isArray(value)) {
          array = true;
          braces = ["[", "]"];
        }
        if (isFunction(value)) {
          var n2 = value.name ? ": " + value.name : "";
          base = " [Function" + n2 + "]";
        }
        if (isRegExp(value)) {
          base = " " + RegExp.prototype.toString.call(value);
        }
        if (isDate(value)) {
          base = " " + Date.prototype.toUTCString.call(value);
        }
        if (isError(value)) {
          base = " " + formatError(value);
        }
        if (keys.length === 0 && (!array || value.length == 0)) {
          return braces[0] + base + braces[1];
        }
        if (recurseTimes < 0) {
          if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
          } else {
            return ctx.stylize("[Object]", "special");
          }
        }
        ctx.seen.push(value);
        var output;
        if (array) {
          output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
        } else {
          output = keys.map(function(key) {
            return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
          });
        }
        ctx.seen.pop();
        return reduceToSingleString(output, base, braces);
      }
      function formatPrimitive(ctx, value) {
        if (isUndefined(value))
          return ctx.stylize("undefined", "undefined");
        if (isString(value)) {
          var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
          return ctx.stylize(simple, "string");
        }
        if (isNumber(value))
          return ctx.stylize("" + value, "number");
        if (isBoolean(value))
          return ctx.stylize("" + value, "boolean");
        if (isNull(value))
          return ctx.stylize("null", "null");
      }
      function formatError(value) {
        return "[" + Error.prototype.toString.call(value) + "]";
      }
      function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
        var output = [];
        for (var i = 0, l = value.length; i < l; ++i) {
          if (hasOwnProperty(value, String(i))) {
            output.push(formatProperty(
              ctx,
              value,
              recurseTimes,
              visibleKeys,
              String(i),
              true
            ));
          } else {
            output.push("");
          }
        }
        keys.forEach(function(key) {
          if (!key.match(/^\d+$/)) {
            output.push(formatProperty(
              ctx,
              value,
              recurseTimes,
              visibleKeys,
              key,
              true
            ));
          }
        });
        return output;
      }
      function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
        var name, str, desc;
        desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
        if (desc.get) {
          if (desc.set) {
            str = ctx.stylize("[Getter/Setter]", "special");
          } else {
            str = ctx.stylize("[Getter]", "special");
          }
        } else {
          if (desc.set) {
            str = ctx.stylize("[Setter]", "special");
          }
        }
        if (!hasOwnProperty(visibleKeys, key)) {
          name = "[" + key + "]";
        }
        if (!str) {
          if (ctx.seen.indexOf(desc.value) < 0) {
            if (isNull(recurseTimes)) {
              str = formatValue(ctx, desc.value, null);
            } else {
              str = formatValue(ctx, desc.value, recurseTimes - 1);
            }
            if (str.indexOf("\n") > -1) {
              if (array) {
                str = str.split("\n").map(function(line) {
                  return "  " + line;
                }).join("\n").slice(2);
              } else {
                str = "\n" + str.split("\n").map(function(line) {
                  return "   " + line;
                }).join("\n");
              }
            }
          } else {
            str = ctx.stylize("[Circular]", "special");
          }
        }
        if (isUndefined(name)) {
          if (array && key.match(/^\d+$/)) {
            return str;
          }
          name = JSON.stringify("" + key);
          if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
            name = name.slice(1, -1);
            name = ctx.stylize(name, "name");
          } else {
            name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
            name = ctx.stylize(name, "string");
          }
        }
        return name + ": " + str;
      }
      function reduceToSingleString(output, base, braces) {
        var numLinesEst = 0;
        var length = output.reduce(function(prev, cur) {
          numLinesEst++;
          if (cur.indexOf("\n") >= 0) numLinesEst++;
          return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
        }, 0);
        if (length > 60) {
          return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
        }
        return braces[0] + base + " " + output.join(", ") + " " + braces[1];
      }
      exports2.types = require_types();
      function isArray(ar) {
        return Array.isArray(ar);
      }
      exports2.isArray = isArray;
      function isBoolean(arg) {
        return typeof arg === "boolean";
      }
      exports2.isBoolean = isBoolean;
      function isNull(arg) {
        return arg === null;
      }
      exports2.isNull = isNull;
      function isNullOrUndefined(arg) {
        return arg == null;
      }
      exports2.isNullOrUndefined = isNullOrUndefined;
      function isNumber(arg) {
        return typeof arg === "number";
      }
      exports2.isNumber = isNumber;
      function isString(arg) {
        return typeof arg === "string";
      }
      exports2.isString = isString;
      function isSymbol(arg) {
        return typeof arg === "symbol";
      }
      exports2.isSymbol = isSymbol;
      function isUndefined(arg) {
        return arg === void 0;
      }
      exports2.isUndefined = isUndefined;
      function isRegExp(re) {
        return isObject(re) && objectToString(re) === "[object RegExp]";
      }
      exports2.isRegExp = isRegExp;
      exports2.types.isRegExp = isRegExp;
      function isObject(arg) {
        return typeof arg === "object" && arg !== null;
      }
      exports2.isObject = isObject;
      function isDate(d) {
        return isObject(d) && objectToString(d) === "[object Date]";
      }
      exports2.isDate = isDate;
      exports2.types.isDate = isDate;
      function isError(e) {
        return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
      }
      exports2.isError = isError;
      exports2.types.isNativeError = isError;
      function isFunction(arg) {
        return typeof arg === "function";
      }
      exports2.isFunction = isFunction;
      function isPrimitive(arg) {
        return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
        typeof arg === "undefined";
      }
      exports2.isPrimitive = isPrimitive;
      exports2.isBuffer = require_isBufferBrowser();
      function objectToString(o) {
        return Object.prototype.toString.call(o);
      }
      function pad(n2) {
        return n2 < 10 ? "0" + n2.toString(10) : n2.toString(10);
      }
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      function timestamp() {
        var d = /* @__PURE__ */ new Date();
        var time = [
          pad(d.getHours()),
          pad(d.getMinutes()),
          pad(d.getSeconds())
        ].join(":");
        return [d.getDate(), months[d.getMonth()], time].join(" ");
      }
      exports2.log = function() {
        console.log("%s - %s", timestamp(), exports2.format.apply(exports2, arguments));
      };
      exports2.inherits = require_inherits_browser();
      exports2._extend = function(origin, add) {
        if (!add || !isObject(add)) return origin;
        var keys = Object.keys(add);
        var i = keys.length;
        while (i--) {
          origin[keys[i]] = add[keys[i]];
        }
        return origin;
      };
      function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
      var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : void 0;
      exports2.promisify = function promisify(original) {
        if (typeof original !== "function")
          throw new TypeError('The "original" argument must be of type Function');
        if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
          var fn = original[kCustomPromisifiedSymbol];
          if (typeof fn !== "function") {
            throw new TypeError('The "util.promisify.custom" argument must be of type Function');
          }
          Object.defineProperty(fn, kCustomPromisifiedSymbol, {
            value: fn,
            enumerable: false,
            writable: false,
            configurable: true
          });
          return fn;
        }
        function fn() {
          var promiseResolve, promiseReject;
          var promise = new Promise(function(resolve, reject) {
            promiseResolve = resolve;
            promiseReject = reject;
          });
          var args = [];
          for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
          }
          args.push(function(err, value) {
            if (err) {
              promiseReject(err);
            } else {
              promiseResolve(value);
            }
          });
          try {
            original.apply(this, args);
          } catch (err) {
            promiseReject(err);
          }
          return promise;
        }
        Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
        if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true
        });
        return Object.defineProperties(
          fn,
          getOwnPropertyDescriptors(original)
        );
      };
      exports2.promisify.custom = kCustomPromisifiedSymbol;
      function callbackifyOnRejected(reason, cb) {
        if (!reason) {
          var newReason = new Error("Promise was rejected with a falsy value");
          newReason.reason = reason;
          reason = newReason;
        }
        return cb(reason);
      }
      function callbackify(original) {
        if (typeof original !== "function") {
          throw new TypeError('The "original" argument must be of type Function');
        }
        function callbackified() {
          var args = [];
          for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
          }
          var maybeCb = args.pop();
          if (typeof maybeCb !== "function") {
            throw new TypeError("The last argument must be of type Function");
          }
          var self2 = this;
          var cb = function() {
            return maybeCb.apply(self2, arguments);
          };
          original.apply(this, args).then(
            function(ret) {
              process.nextTick(cb.bind(null, null, ret));
            },
            function(rej) {
              process.nextTick(callbackifyOnRejected.bind(null, rej, cb));
            }
          );
        }
        Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
        Object.defineProperties(
          callbackified,
          getOwnPropertyDescriptors(original)
        );
        return callbackified;
      }
      exports2.callbackify = callbackify;
    }
  });

  // node_modules/convert-hex/convert-hex.js
  var require_convert_hex = __commonJS({
    "node_modules/convert-hex/convert-hex.js"(exports2, module2) {
      !function(globals) {
        "use strict";
        var convertHex = {
          bytesToHex: function(bytes) {
            return arrBytesToHex(bytes);
          },
          hexToBytes: function(hex) {
            if (hex.length % 2 === 1) throw new Error("hexToBytes can't have a string with an odd number of characters.");
            if (hex.indexOf("0x") === 0) hex = hex.slice(2);
            return hex.match(/../g).map(function(x) {
              return parseInt(x, 16);
            });
          }
        };
        function arrBytesToHex(bytes) {
          return bytes.map(function(x) {
            return padLeft(x.toString(16), 2);
          }).join("");
        }
        function padLeft(orig, len) {
          if (orig.length > len) return orig;
          return Array(len - orig.length + 1).join("0") + orig;
        }
        if (typeof module2 !== "undefined" && module2.exports) {
          module2.exports = convertHex;
        } else {
          globals.convertHex = convertHex;
        }
      }(exports2);
    }
  });

  // node_modules/convert-string/convert-string.js
  var require_convert_string = __commonJS({
    "node_modules/convert-string/convert-string.js"(exports2, module2) {
      !function(globals) {
        "use strict";
        var convertString = {
          bytesToString: function(bytes) {
            return bytes.map(function(x) {
              return String.fromCharCode(x);
            }).join("");
          },
          stringToBytes: function(str) {
            return str.split("").map(function(x) {
              return x.charCodeAt(0);
            });
          }
        };
        convertString.UTF8 = {
          bytesToString: function(bytes) {
            return decodeURIComponent(escape(convertString.bytesToString(bytes)));
          },
          stringToBytes: function(str) {
            return convertString.stringToBytes(unescape(encodeURIComponent(str)));
          }
        };
        if (typeof module2 !== "undefined" && module2.exports) {
          module2.exports = convertString;
        } else {
          globals.convertString = convertString;
        }
      }(exports2);
    }
  });

  // node_modules/sha256/lib/sha256.js
  var require_sha256 = __commonJS({
    "node_modules/sha256/lib/sha256.js"(exports2, module2) {
      !function(globals) {
        "use strict";
        var _imports = {};
        if (typeof module2 !== "undefined" && module2.exports) {
          if (typeof process !== "undefined" && process.pid) {
            module2.exports = sha256_node;
          } else {
            _imports.bytesToHex = require_convert_hex().bytesToHex;
            _imports.convertString = require_convert_string();
            module2.exports = sha256;
          }
        } else {
          _imports.bytesToHex = globals.convertHex.bytesToHex;
          _imports.convertString = globals.convertString;
          globals.sha256 = sha256;
        }
        function sha256_node(message, options) {
          var crypto3 = require_crypto();
          var c = crypto3.createHash("sha256");
          if (Buffer.isBuffer(message)) {
            c.update(message);
          } else if (Array.isArray(message)) {
            c.update(new Buffer(message));
          } else {
            c.update(new Buffer(message, "binary"));
          }
          var buf = c.digest();
          if (options && options.asBytes) {
            var a = [];
            for (var i = 0; i < buf.length; i++) {
              a.push(buf[i]);
            }
            return a;
          } else if (options && options.asString) {
            return buf.toString("binary");
          } else {
            return buf.toString("hex");
          }
        }
        sha256_node.x2 = function(message, options) {
          return sha256_node(sha256_node(message, { asBytes: true }), options);
        };
        var K2 = [];
        !function() {
          function isPrime(n3) {
            var sqrtN = Math.sqrt(n3);
            for (var factor = 2; factor <= sqrtN; factor++) {
              if (!(n3 % factor)) return false;
            }
            return true;
          }
          function getFractionalBits(n3) {
            return (n3 - (n3 | 0)) * 4294967296 | 0;
          }
          var n2 = 2;
          var nPrime = 0;
          while (nPrime < 64) {
            if (isPrime(n2)) {
              K2[nPrime] = getFractionalBits(Math.pow(n2, 1 / 3));
              nPrime++;
            }
            n2++;
          }
        }();
        var bytesToWords = function(bytes) {
          var words = [];
          for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
            words[b >>> 5] |= bytes[i] << 24 - b % 32;
          }
          return words;
        };
        var wordsToBytes = function(words) {
          var bytes = [];
          for (var b = 0; b < words.length * 32; b += 8) {
            bytes.push(words[b >>> 5] >>> 24 - b % 32 & 255);
          }
          return bytes;
        };
        var W = [];
        var processBlock = function(H, M, offset) {
          var a = H[0], b = H[1], c = H[2], d = H[3];
          var e = H[4], f = H[5], g = H[6], h = H[7];
          for (var i = 0; i < 64; i++) {
            if (i < 16) {
              W[i] = M[offset + i] | 0;
            } else {
              var gamma0x = W[i - 15];
              var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
              var gamma1x = W[i - 2];
              var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
              W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
            }
            var ch = e & f ^ ~e & g;
            var maj = a & b ^ a & c ^ b & c;
            var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
            var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
            var t1 = h + sigma1 + ch + K2[i] + W[i];
            var t2 = sigma0 + maj;
            h = g;
            g = f;
            f = e;
            e = d + t1 | 0;
            d = c;
            c = b;
            b = a;
            a = t1 + t2 | 0;
          }
          H[0] = H[0] + a | 0;
          H[1] = H[1] + b | 0;
          H[2] = H[2] + c | 0;
          H[3] = H[3] + d | 0;
          H[4] = H[4] + e | 0;
          H[5] = H[5] + f | 0;
          H[6] = H[6] + g | 0;
          H[7] = H[7] + h | 0;
        };
        function sha256(message, options) {
          ;
          if (message.constructor === String) {
            message = _imports.convertString.UTF8.stringToBytes(message);
          }
          var H = [
            1779033703,
            3144134277,
            1013904242,
            2773480762,
            1359893119,
            2600822924,
            528734635,
            1541459225
          ];
          var m = bytesToWords(message);
          var l = message.length * 8;
          m[l >> 5] |= 128 << 24 - l % 32;
          m[(l + 64 >> 9 << 4) + 15] = l;
          for (var i = 0; i < m.length; i += 16) {
            processBlock(H, m, i);
          }
          var digestbytes = wordsToBytes(H);
          return options && options.asBytes ? digestbytes : options && options.asString ? _imports.convertString.bytesToString(digestbytes) : _imports.bytesToHex(digestbytes);
        }
        sha256.x2 = function(message, options) {
          return sha256(sha256(message, { asBytes: true }), options);
        };
      }(exports2);
    }
  });

  // node_modules/p2p-node/lib/Peer.js
  var require_Peer = __commonJS({
    "node_modules/p2p-node/lib/Peer.js"(exports2) {
      var net3 = require_net();
      var events = require_events();
      var util = require_util();
      var sha256 = require_sha256();
      var Host = function Host2(host, port) {
        var _host = false, _port = false, _version = false;
        Object.defineProperties(this, {
          "host": {
            get: function() {
              return _host;
            },
            enumerable: true
          },
          "port": {
            get: function() {
              return _port;
            },
            enumerable: true
          },
          "version": {
            get: function() {
              return _version;
            },
            enumerable: true
          }
        });
        if (Array.isArray(host)) {
          host = new Buffer(host);
        }
        _port = +port || this.defaultPort;
        if (typeof host === "undefined") {
          _host = "localhost";
          _version = 4;
          return this;
        } else if (typeof host === "number") {
          var buf = new Buffer(4);
          buf.writeInt32LE(host, 0);
          _host = Array.prototype.join.apply(buf, ["."]);
          _version = 4;
          return this;
        } else if (typeof host === "string") {
          _host = host;
          _version = net3.isIP(host);
          if (_version == 0) {
            if (_host.indexOf(":") !== -1) {
              var pieces = _host.split(":");
              _host = pieces[0];
              _port = pieces[1];
              _version = net3.isIP(_host);
              if (_version == 0) {
              }
            }
          }
          return this;
        } else if (Buffer.isBuffer(host)) {
          if (host.length == 4) {
            _host = Array.prototype.join.apply(host, ["."]);
            _version = 4;
            return this;
          } else if (host.slice(0, 12).toString("hex") != Host2.IPV6_IPV4_PADDING.toString("hex")) {
            _host = host.toString("hex").match(/(.{1,4})/g).join(":").replace(/\:(0{2,4})/g, ":0").replace(/^(0{2,4})/g, ":0");
            _version = 6;
            return this;
          } else {
            _host = Array.prototype.join.apply(host.slice(12), ["."]);
            _version = 4;
            return this;
          }
        } else {
          throw new Error("Cound not instantiate peer; invalid parameter type: " + typeof host);
        }
      };
      Host.prototype.IPV6_IPV4_PADDING = new Buffer([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255]);
      Host.prototype.defaultPort = 8333;
      var Peer2 = exports2.Peer = function Peer3(host, port, magic) {
        events.EventEmitter.call(this);
        this.state = "new";
        this.lastSeen = false;
        if (!(host instanceof Host)) {
          host = new Host(host, port);
        }
        Object.defineProperty(this, "host", {
          enumerable: true,
          configurable: false,
          writable: false,
          value: host
        });
        if (typeof magic !== "undefined") this.magicBytes = magic;
        return this;
      };
      util.inherits(Peer2, events.EventEmitter);
      Peer2.prototype.MAX_RECEIVE_BUFFER = 1024 * 1024 * 10;
      Peer2.prototype.magicBytes = 3652501241;
      Peer2.prototype.connect = function connect(socket) {
        this._changeState("connecting");
        this.inbound = new Buffer(this.MAX_RECEIVE_BUFFER);
        this.inboundCursor = 0;
        if (typeof socket === "undefined" || !(socket instanceof net3.Socket)) {
          socket = net3.createConnection(this.host.port, this.host.host, this.handleConnect.bind(this));
        } else {
          this._changeState("connected");
        }
        Object.defineProperty(this, "socket", {
          enumerable: false,
          configurable: false,
          writable: false,
          value: socket
        });
        this.socket.on("error", this.handleError.bind(this));
        this.socket.on("data", this.handleData.bind(this));
        this.socket.on("end", this.handleEnd.bind(this));
        this.socket.on("close", this.handleClose.bind(this));
        return this.socket;
      };
      Peer2.prototype.disconnect = function disconnect() {
        this._changeState("disconnecting");
        this.socket.end();
      };
      Peer2.prototype.destroy = function destroy() {
        this.socket.destroy();
      };
      Peer2.prototype.getUUID = function getUUID() {
        return this.host.host + "~" + this.host.port;
      };
      Peer2.prototype.handleConnect = function handleConnect() {
        this._changeState("connected");
        this.emit("connect", {
          peer: this
        });
      };
      Peer2.prototype.handleEnd = function handleEnd() {
        this.emit("end", {
          peer: this
        });
      };
      Peer2.prototype.handleError = function handleError(data) {
        this.emit("error", {
          peer: this,
          error: data
        });
      };
      Peer2.prototype.handleClose = function handleClose(had_error) {
        this._changeState("closed");
        this.emit("close", {
          peer: this,
          had_error
        });
      };
      Peer2.prototype.messageChecksum = function(msg) {
        return new Buffer(sha256.x2(msg, { asBytes: true })).slice(0, 4);
      };
      Peer2.prototype.send = function send(command, data, callback) {
        if (typeof data == "undefined") {
          data = new Buffer(0);
        } else if (Array.isArray(data)) {
          data = new Buffer(data);
        }
        var out = new Buffer(data.length + 24);
        out.writeUInt32LE(this.magicBytes, 0);
        for (var i = 0; i < 12; i++) {
          var num = i >= command.length ? 0 : command.charCodeAt(i);
          out.writeUInt8(num, 4 + i);
        }
        out.writeUInt32LE(data.length, 16);
        var checksum = this.messageChecksum(data);
        checksum.copy(out, 20);
        data.copy(out, 24);
        this.socket.write(out, null, callback);
      };
      Peer2.prototype.handleData = function handleData(data) {
        this.lastSeen = /* @__PURE__ */ new Date();
        if (data.length + this.inboundCursor > this.inbound.length) {
          this.emit("error", "Peer exceeded max receiving buffer");
          this.inboundCursor = this.inbound.length + 1;
          return;
        }
        data.copy(this.inbound, this.inboundCursor);
        this.inboundCursor += data.length;
        if (this.inboundCursor < 20) return;
        var i = 0, endPoint = 0;
        while (i < this.inboundCursor) {
          if (this.inbound.readUInt32LE(i) == this.magicBytes) {
            var msgStart = i;
            if (this.inboundCursor > msgStart + 16) {
              var msgLen = this.inbound.readUInt32LE(msgStart + 16);
              if (this.inboundCursor >= msgStart + msgLen + 24) {
                this.handleMessage(this.inbound.slice(msgStart, msgStart + msgLen + 24));
                endPoint = msgStart + msgLen + 24;
              }
              i += msgLen + 24;
            } else {
              i = this.inboundCursor;
            }
          } else {
            i++;
          }
        }
        if (endPoint > 0) {
          this.inbound.copy(this.inbound, 0, endPoint, this.inboundCursor);
          this.inboundCursor -= endPoint;
        }
      };
      Peer2.prototype.handleMessage = function handleMessage(msg) {
        var msgLen = msg.readUInt32LE(16);
        var cmd = [];
        for (var j = 0; j < 12; j++) {
          var s = msg[4 + j];
          if (s > 0) {
            cmd.push(String.fromCharCode(s));
          }
        }
        cmd = cmd.join("");
        var checksum = msg.readUInt32BE(20);
        if (msgLen > 0) {
          var payload = new Buffer(msgLen);
          msg.copy(payload, 0, 24);
          var checksumCalc = new Buffer(sha256.x2(payload, { asBytes: true }));
          if (checksum != checksumCalc.readUInt32BE(0)) {
            console.log("Supplied checksum of " + checksum.toString("hex") + " does not match calculated checksum of " + checksumCalc.toString("hex"));
          }
        } else {
          var payload = new Buffer(0);
        }
        this.emit("message", {
          peer: this,
          command: cmd,
          data: payload
        });
        this.emit(cmd + "Message", {
          peer: this,
          data: payload
        });
      };
      Peer2.prototype._changeState = function changeState(newState) {
        var oldState = this.state;
        this.state = newState;
        this.emit("stateChange", { new: newState, old: oldState });
      };
    }
  });

  // node_modules/bigi/package.json
  var require_package = __commonJS({
    "node_modules/bigi/package.json"(exports2, module2) {
      module2.exports = {
        name: "bigi",
        version: "1.4.2",
        description: "Big integers.",
        keywords: [
          "cryptography",
          "math",
          "bitcoin",
          "arbitrary",
          "precision",
          "arithmetic",
          "big",
          "integer",
          "int",
          "number",
          "biginteger",
          "bigint",
          "bignumber",
          "decimal",
          "float"
        ],
        devDependencies: {
          coveralls: "^2.11.2",
          istanbul: "^0.3.5",
          jshint: "^2.5.1",
          mocha: "^2.1.0",
          mochify: "^2.1.0"
        },
        repository: {
          url: "https://github.com/cryptocoinjs/bigi",
          type: "git"
        },
        main: "./lib/index.js",
        scripts: {
          "browser-test": "./node_modules/.bin/mochify --wd -R spec",
          test: "./node_modules/.bin/_mocha -- test/*.js",
          jshint: "./node_modules/.bin/jshint --config jshint.json lib/*.js ; true",
          unit: "./node_modules/.bin/mocha",
          coverage: "./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- --reporter list test/*.js",
          coveralls: "npm run-script coverage && node ./node_modules/.bin/coveralls < coverage/lcov.info"
        },
        dependencies: {},
        testling: {
          files: "test/*.js",
          harness: "mocha",
          browsers: [
            "ie/9..latest",
            "firefox/latest",
            "chrome/latest",
            "safari/6.0..latest",
            "iphone/6.0..latest",
            "android-browser/4.2..latest"
          ]
        }
      };
    }
  });

  // node_modules/bigi/lib/bigi.js
  var require_bigi = __commonJS({
    "node_modules/bigi/lib/bigi.js"(exports2, module2) {
      function BigInteger2(a, b, c) {
        if (!(this instanceof BigInteger2))
          return new BigInteger2(a, b, c);
        if (a != null) {
          if ("number" == typeof a) this.fromNumber(a, b, c);
          else if (b == null && "string" != typeof a) this.fromString(a, 256);
          else this.fromString(a, b);
        }
      }
      var proto = BigInteger2.prototype;
      proto.__bigi = require_package().version;
      BigInteger2.isBigInteger = function(obj, check_ver) {
        return obj && obj.__bigi && (!check_ver || obj.__bigi === proto.__bigi);
      };
      var dbits;
      function am1(i, x, w, j, c, n2) {
        while (--n2 >= 0) {
          var v = x * this[i++] + w[j] + c;
          c = Math.floor(v / 67108864);
          w[j++] = v & 67108863;
        }
        return c;
      }
      BigInteger2.prototype.am = am1;
      dbits = 26;
      BigInteger2.prototype.DB = dbits;
      BigInteger2.prototype.DM = (1 << dbits) - 1;
      var DV = BigInteger2.prototype.DV = 1 << dbits;
      var BI_FP = 52;
      BigInteger2.prototype.FV = Math.pow(2, BI_FP);
      BigInteger2.prototype.F1 = BI_FP - dbits;
      BigInteger2.prototype.F2 = 2 * dbits - BI_FP;
      var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
      var BI_RC = new Array();
      var rr;
      var vv;
      rr = "0".charCodeAt(0);
      for (vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
      rr = "a".charCodeAt(0);
      for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
      rr = "A".charCodeAt(0);
      for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
      function int2char(n2) {
        return BI_RM.charAt(n2);
      }
      function intAt(s, i) {
        var c = BI_RC[s.charCodeAt(i)];
        return c == null ? -1 : c;
      }
      function bnpCopyTo(r) {
        for (var i = this.t - 1; i >= 0; --i) r[i] = this[i];
        r.t = this.t;
        r.s = this.s;
      }
      function bnpFromInt(x) {
        this.t = 1;
        this.s = x < 0 ? -1 : 0;
        if (x > 0) this[0] = x;
        else if (x < -1) this[0] = x + DV;
        else this.t = 0;
      }
      function nbv(i) {
        var r = new BigInteger2();
        r.fromInt(i);
        return r;
      }
      function bnpFromString(s, b) {
        var self2 = this;
        var k;
        if (b == 16) k = 4;
        else if (b == 8) k = 3;
        else if (b == 256) k = 8;
        else if (b == 2) k = 1;
        else if (b == 32) k = 5;
        else if (b == 4) k = 2;
        else {
          self2.fromRadix(s, b);
          return;
        }
        self2.t = 0;
        self2.s = 0;
        var i = s.length, mi = false, sh = 0;
        while (--i >= 0) {
          var x = k == 8 ? s[i] & 255 : intAt(s, i);
          if (x < 0) {
            if (s.charAt(i) == "-") mi = true;
            continue;
          }
          mi = false;
          if (sh == 0)
            self2[self2.t++] = x;
          else if (sh + k > self2.DB) {
            self2[self2.t - 1] |= (x & (1 << self2.DB - sh) - 1) << sh;
            self2[self2.t++] = x >> self2.DB - sh;
          } else
            self2[self2.t - 1] |= x << sh;
          sh += k;
          if (sh >= self2.DB) sh -= self2.DB;
        }
        if (k == 8 && (s[0] & 128) != 0) {
          self2.s = -1;
          if (sh > 0) self2[self2.t - 1] |= (1 << self2.DB - sh) - 1 << sh;
        }
        self2.clamp();
        if (mi) BigInteger2.ZERO.subTo(self2, self2);
      }
      function bnpClamp() {
        var c = this.s & this.DM;
        while (this.t > 0 && this[this.t - 1] == c) --this.t;
      }
      function bnToString(b) {
        var self2 = this;
        if (self2.s < 0) return "-" + self2.negate().toString(b);
        var k;
        if (b == 16) k = 4;
        else if (b == 8) k = 3;
        else if (b == 2) k = 1;
        else if (b == 32) k = 5;
        else if (b == 4) k = 2;
        else return self2.toRadix(b);
        var km = (1 << k) - 1, d, m = false, r = "", i = self2.t;
        var p = self2.DB - i * self2.DB % k;
        if (i-- > 0) {
          if (p < self2.DB && (d = self2[i] >> p) > 0) {
            m = true;
            r = int2char(d);
          }
          while (i >= 0) {
            if (p < k) {
              d = (self2[i] & (1 << p) - 1) << k - p;
              d |= self2[--i] >> (p += self2.DB - k);
            } else {
              d = self2[i] >> (p -= k) & km;
              if (p <= 0) {
                p += self2.DB;
                --i;
              }
            }
            if (d > 0) m = true;
            if (m) r += int2char(d);
          }
        }
        return m ? r : "0";
      }
      function bnNegate() {
        var r = new BigInteger2();
        BigInteger2.ZERO.subTo(this, r);
        return r;
      }
      function bnAbs() {
        return this.s < 0 ? this.negate() : this;
      }
      function bnCompareTo(a) {
        var r = this.s - a.s;
        if (r != 0) return r;
        var i = this.t;
        r = i - a.t;
        if (r != 0) return this.s < 0 ? -r : r;
        while (--i >= 0)
          if ((r = this[i] - a[i]) != 0) return r;
        return 0;
      }
      function nbits(x) {
        var r = 1, t;
        if ((t = x >>> 16) != 0) {
          x = t;
          r += 16;
        }
        if ((t = x >> 8) != 0) {
          x = t;
          r += 8;
        }
        if ((t = x >> 4) != 0) {
          x = t;
          r += 4;
        }
        if ((t = x >> 2) != 0) {
          x = t;
          r += 2;
        }
        if ((t = x >> 1) != 0) {
          x = t;
          r += 1;
        }
        return r;
      }
      function bnBitLength() {
        if (this.t <= 0) return 0;
        return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
      }
      function bnByteLength() {
        return this.bitLength() >> 3;
      }
      function bnpDLShiftTo(n2, r) {
        var i;
        for (i = this.t - 1; i >= 0; --i) r[i + n2] = this[i];
        for (i = n2 - 1; i >= 0; --i) r[i] = 0;
        r.t = this.t + n2;
        r.s = this.s;
      }
      function bnpDRShiftTo(n2, r) {
        for (var i = n2; i < this.t; ++i) r[i - n2] = this[i];
        r.t = Math.max(this.t - n2, 0);
        r.s = this.s;
      }
      function bnpLShiftTo(n2, r) {
        var self2 = this;
        var bs = n2 % self2.DB;
        var cbs = self2.DB - bs;
        var bm = (1 << cbs) - 1;
        var ds = Math.floor(n2 / self2.DB), c = self2.s << bs & self2.DM, i;
        for (i = self2.t - 1; i >= 0; --i) {
          r[i + ds + 1] = self2[i] >> cbs | c;
          c = (self2[i] & bm) << bs;
        }
        for (i = ds - 1; i >= 0; --i) r[i] = 0;
        r[ds] = c;
        r.t = self2.t + ds + 1;
        r.s = self2.s;
        r.clamp();
      }
      function bnpRShiftTo(n2, r) {
        var self2 = this;
        r.s = self2.s;
        var ds = Math.floor(n2 / self2.DB);
        if (ds >= self2.t) {
          r.t = 0;
          return;
        }
        var bs = n2 % self2.DB;
        var cbs = self2.DB - bs;
        var bm = (1 << bs) - 1;
        r[0] = self2[ds] >> bs;
        for (var i = ds + 1; i < self2.t; ++i) {
          r[i - ds - 1] |= (self2[i] & bm) << cbs;
          r[i - ds] = self2[i] >> bs;
        }
        if (bs > 0) r[self2.t - ds - 1] |= (self2.s & bm) << cbs;
        r.t = self2.t - ds;
        r.clamp();
      }
      function bnpSubTo(a, r) {
        var self2 = this;
        var i = 0, c = 0, m = Math.min(a.t, self2.t);
        while (i < m) {
          c += self2[i] - a[i];
          r[i++] = c & self2.DM;
          c >>= self2.DB;
        }
        if (a.t < self2.t) {
          c -= a.s;
          while (i < self2.t) {
            c += self2[i];
            r[i++] = c & self2.DM;
            c >>= self2.DB;
          }
          c += self2.s;
        } else {
          c += self2.s;
          while (i < a.t) {
            c -= a[i];
            r[i++] = c & self2.DM;
            c >>= self2.DB;
          }
          c -= a.s;
        }
        r.s = c < 0 ? -1 : 0;
        if (c < -1) r[i++] = self2.DV + c;
        else if (c > 0) r[i++] = c;
        r.t = i;
        r.clamp();
      }
      function bnpMultiplyTo(a, r) {
        var x = this.abs(), y = a.abs();
        var i = x.t;
        r.t = i + y.t;
        while (--i >= 0) r[i] = 0;
        for (i = 0; i < y.t; ++i) r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
        r.s = 0;
        r.clamp();
        if (this.s != a.s) BigInteger2.ZERO.subTo(r, r);
      }
      function bnpSquareTo(r) {
        var x = this.abs();
        var i = r.t = 2 * x.t;
        while (--i >= 0) r[i] = 0;
        for (i = 0; i < x.t - 1; ++i) {
          var c = x.am(i, x[i], r, 2 * i, 0, 1);
          if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
            r[i + x.t] -= x.DV;
            r[i + x.t + 1] = 1;
          }
        }
        if (r.t > 0) r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
        r.s = 0;
        r.clamp();
      }
      function bnpDivRemTo(m, q, r) {
        var self2 = this;
        var pm = m.abs();
        if (pm.t <= 0) return;
        var pt = self2.abs();
        if (pt.t < pm.t) {
          if (q != null) q.fromInt(0);
          if (r != null) self2.copyTo(r);
          return;
        }
        if (r == null) r = new BigInteger2();
        var y = new BigInteger2(), ts = self2.s, ms = m.s;
        var nsh = self2.DB - nbits(pm[pm.t - 1]);
        if (nsh > 0) {
          pm.lShiftTo(nsh, y);
          pt.lShiftTo(nsh, r);
        } else {
          pm.copyTo(y);
          pt.copyTo(r);
        }
        var ys = y.t;
        var y0 = y[ys - 1];
        if (y0 == 0) return;
        var yt = y0 * (1 << self2.F1) + (ys > 1 ? y[ys - 2] >> self2.F2 : 0);
        var d1 = self2.FV / yt, d2 = (1 << self2.F1) / yt, e = 1 << self2.F2;
        var i = r.t, j = i - ys, t = q == null ? new BigInteger2() : q;
        y.dlShiftTo(j, t);
        if (r.compareTo(t) >= 0) {
          r[r.t++] = 1;
          r.subTo(t, r);
        }
        BigInteger2.ONE.dlShiftTo(ys, t);
        t.subTo(y, y);
        while (y.t < ys) y[y.t++] = 0;
        while (--j >= 0) {
          var qd = r[--i] == y0 ? self2.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
          if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
            y.dlShiftTo(j, t);
            r.subTo(t, r);
            while (r[i] < --qd) r.subTo(t, r);
          }
        }
        if (q != null) {
          r.drShiftTo(ys, q);
          if (ts != ms) BigInteger2.ZERO.subTo(q, q);
        }
        r.t = ys;
        r.clamp();
        if (nsh > 0) r.rShiftTo(nsh, r);
        if (ts < 0) BigInteger2.ZERO.subTo(r, r);
      }
      function bnMod(a) {
        var r = new BigInteger2();
        this.abs().divRemTo(a, null, r);
        if (this.s < 0 && r.compareTo(BigInteger2.ZERO) > 0) a.subTo(r, r);
        return r;
      }
      function Classic(m) {
        this.m = m;
      }
      function cConvert(x) {
        if (x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
        else return x;
      }
      function cRevert(x) {
        return x;
      }
      function cReduce(x) {
        x.divRemTo(this.m, null, x);
      }
      function cMulTo(x, y, r) {
        x.multiplyTo(y, r);
        this.reduce(r);
      }
      function cSqrTo(x, r) {
        x.squareTo(r);
        this.reduce(r);
      }
      Classic.prototype.convert = cConvert;
      Classic.prototype.revert = cRevert;
      Classic.prototype.reduce = cReduce;
      Classic.prototype.mulTo = cMulTo;
      Classic.prototype.sqrTo = cSqrTo;
      function bnpInvDigit() {
        if (this.t < 1) return 0;
        var x = this[0];
        if ((x & 1) == 0) return 0;
        var y = x & 3;
        y = y * (2 - (x & 15) * y) & 15;
        y = y * (2 - (x & 255) * y) & 255;
        y = y * (2 - ((x & 65535) * y & 65535)) & 65535;
        y = y * (2 - x * y % this.DV) % this.DV;
        return y > 0 ? this.DV - y : -y;
      }
      function Montgomery(m) {
        this.m = m;
        this.mp = m.invDigit();
        this.mpl = this.mp & 32767;
        this.mph = this.mp >> 15;
        this.um = (1 << m.DB - 15) - 1;
        this.mt2 = 2 * m.t;
      }
      function montConvert(x) {
        var r = new BigInteger2();
        x.abs().dlShiftTo(this.m.t, r);
        r.divRemTo(this.m, null, r);
        if (x.s < 0 && r.compareTo(BigInteger2.ZERO) > 0) this.m.subTo(r, r);
        return r;
      }
      function montRevert(x) {
        var r = new BigInteger2();
        x.copyTo(r);
        this.reduce(r);
        return r;
      }
      function montReduce(x) {
        while (x.t <= this.mt2)
          x[x.t++] = 0;
        for (var i = 0; i < this.m.t; ++i) {
          var j = x[i] & 32767;
          var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM;
          j = i + this.m.t;
          x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
          while (x[j] >= x.DV) {
            x[j] -= x.DV;
            x[++j]++;
          }
        }
        x.clamp();
        x.drShiftTo(this.m.t, x);
        if (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
      }
      function montSqrTo(x, r) {
        x.squareTo(r);
        this.reduce(r);
      }
      function montMulTo(x, y, r) {
        x.multiplyTo(y, r);
        this.reduce(r);
      }
      Montgomery.prototype.convert = montConvert;
      Montgomery.prototype.revert = montRevert;
      Montgomery.prototype.reduce = montReduce;
      Montgomery.prototype.mulTo = montMulTo;
      Montgomery.prototype.sqrTo = montSqrTo;
      function bnpIsEven() {
        return (this.t > 0 ? this[0] & 1 : this.s) == 0;
      }
      function bnpExp(e, z) {
        if (e > 4294967295 || e < 1) return BigInteger2.ONE;
        var r = new BigInteger2(), r2 = new BigInteger2(), g = z.convert(this), i = nbits(e) - 1;
        g.copyTo(r);
        while (--i >= 0) {
          z.sqrTo(r, r2);
          if ((e & 1 << i) > 0) z.mulTo(r2, g, r);
          else {
            var t = r;
            r = r2;
            r2 = t;
          }
        }
        return z.revert(r);
      }
      function bnModPowInt(e, m) {
        var z;
        if (e < 256 || m.isEven()) z = new Classic(m);
        else z = new Montgomery(m);
        return this.exp(e, z);
      }
      proto.copyTo = bnpCopyTo;
      proto.fromInt = bnpFromInt;
      proto.fromString = bnpFromString;
      proto.clamp = bnpClamp;
      proto.dlShiftTo = bnpDLShiftTo;
      proto.drShiftTo = bnpDRShiftTo;
      proto.lShiftTo = bnpLShiftTo;
      proto.rShiftTo = bnpRShiftTo;
      proto.subTo = bnpSubTo;
      proto.multiplyTo = bnpMultiplyTo;
      proto.squareTo = bnpSquareTo;
      proto.divRemTo = bnpDivRemTo;
      proto.invDigit = bnpInvDigit;
      proto.isEven = bnpIsEven;
      proto.exp = bnpExp;
      proto.toString = bnToString;
      proto.negate = bnNegate;
      proto.abs = bnAbs;
      proto.compareTo = bnCompareTo;
      proto.bitLength = bnBitLength;
      proto.byteLength = bnByteLength;
      proto.mod = bnMod;
      proto.modPowInt = bnModPowInt;
      function bnClone() {
        var r = new BigInteger2();
        this.copyTo(r);
        return r;
      }
      function bnIntValue() {
        if (this.s < 0) {
          if (this.t == 1) return this[0] - this.DV;
          else if (this.t == 0) return -1;
        } else if (this.t == 1) return this[0];
        else if (this.t == 0) return 0;
        return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
      }
      function bnByteValue() {
        return this.t == 0 ? this.s : this[0] << 24 >> 24;
      }
      function bnShortValue() {
        return this.t == 0 ? this.s : this[0] << 16 >> 16;
      }
      function bnpChunkSize(r) {
        return Math.floor(Math.LN2 * this.DB / Math.log(r));
      }
      function bnSigNum() {
        if (this.s < 0) return -1;
        else if (this.t <= 0 || this.t == 1 && this[0] <= 0) return 0;
        else return 1;
      }
      function bnpToRadix(b) {
        if (b == null) b = 10;
        if (this.signum() == 0 || b < 2 || b > 36) return "0";
        var cs = this.chunkSize(b);
        var a = Math.pow(b, cs);
        var d = nbv(a), y = new BigInteger2(), z = new BigInteger2(), r = "";
        this.divRemTo(d, y, z);
        while (y.signum() > 0) {
          r = (a + z.intValue()).toString(b).substr(1) + r;
          y.divRemTo(d, y, z);
        }
        return z.intValue().toString(b) + r;
      }
      function bnpFromRadix(s, b) {
        var self2 = this;
        self2.fromInt(0);
        if (b == null) b = 10;
        var cs = self2.chunkSize(b);
        var d = Math.pow(b, cs), mi = false, j = 0, w = 0;
        for (var i = 0; i < s.length; ++i) {
          var x = intAt(s, i);
          if (x < 0) {
            if (s.charAt(i) == "-" && self2.signum() == 0) mi = true;
            continue;
          }
          w = b * w + x;
          if (++j >= cs) {
            self2.dMultiply(d);
            self2.dAddOffset(w, 0);
            j = 0;
            w = 0;
          }
        }
        if (j > 0) {
          self2.dMultiply(Math.pow(b, j));
          self2.dAddOffset(w, 0);
        }
        if (mi) BigInteger2.ZERO.subTo(self2, self2);
      }
      function bnpFromNumber(a, b, c) {
        var self2 = this;
        if ("number" == typeof b) {
          if (a < 2) self2.fromInt(1);
          else {
            self2.fromNumber(a, c);
            if (!self2.testBit(a - 1))
              self2.bitwiseTo(BigInteger2.ONE.shiftLeft(a - 1), op_or, self2);
            if (self2.isEven()) self2.dAddOffset(1, 0);
            while (!self2.isProbablePrime(b)) {
              self2.dAddOffset(2, 0);
              if (self2.bitLength() > a) self2.subTo(BigInteger2.ONE.shiftLeft(a - 1), self2);
            }
          }
        } else {
          var x = new Array(), t = a & 7;
          x.length = (a >> 3) + 1;
          b.nextBytes(x);
          if (t > 0) x[0] &= (1 << t) - 1;
          else x[0] = 0;
          self2.fromString(x, 256);
        }
      }
      function bnToByteArray() {
        var self2 = this;
        var i = self2.t, r = new Array();
        r[0] = self2.s;
        var p = self2.DB - i * self2.DB % 8, d, k = 0;
        if (i-- > 0) {
          if (p < self2.DB && (d = self2[i] >> p) != (self2.s & self2.DM) >> p)
            r[k++] = d | self2.s << self2.DB - p;
          while (i >= 0) {
            if (p < 8) {
              d = (self2[i] & (1 << p) - 1) << 8 - p;
              d |= self2[--i] >> (p += self2.DB - 8);
            } else {
              d = self2[i] >> (p -= 8) & 255;
              if (p <= 0) {
                p += self2.DB;
                --i;
              }
            }
            if ((d & 128) != 0) d |= -256;
            if (k === 0 && (self2.s & 128) != (d & 128)) ++k;
            if (k > 0 || d != self2.s) r[k++] = d;
          }
        }
        return r;
      }
      function bnEquals(a) {
        return this.compareTo(a) == 0;
      }
      function bnMin(a) {
        return this.compareTo(a) < 0 ? this : a;
      }
      function bnMax(a) {
        return this.compareTo(a) > 0 ? this : a;
      }
      function bnpBitwiseTo(a, op, r) {
        var self2 = this;
        var i, f, m = Math.min(a.t, self2.t);
        for (i = 0; i < m; ++i) r[i] = op(self2[i], a[i]);
        if (a.t < self2.t) {
          f = a.s & self2.DM;
          for (i = m; i < self2.t; ++i) r[i] = op(self2[i], f);
          r.t = self2.t;
        } else {
          f = self2.s & self2.DM;
          for (i = m; i < a.t; ++i) r[i] = op(f, a[i]);
          r.t = a.t;
        }
        r.s = op(self2.s, a.s);
        r.clamp();
      }
      function op_and(x, y) {
        return x & y;
      }
      function bnAnd(a) {
        var r = new BigInteger2();
        this.bitwiseTo(a, op_and, r);
        return r;
      }
      function op_or(x, y) {
        return x | y;
      }
      function bnOr(a) {
        var r = new BigInteger2();
        this.bitwiseTo(a, op_or, r);
        return r;
      }
      function op_xor(x, y) {
        return x ^ y;
      }
      function bnXor(a) {
        var r = new BigInteger2();
        this.bitwiseTo(a, op_xor, r);
        return r;
      }
      function op_andnot(x, y) {
        return x & ~y;
      }
      function bnAndNot(a) {
        var r = new BigInteger2();
        this.bitwiseTo(a, op_andnot, r);
        return r;
      }
      function bnNot() {
        var r = new BigInteger2();
        for (var i = 0; i < this.t; ++i) r[i] = this.DM & ~this[i];
        r.t = this.t;
        r.s = ~this.s;
        return r;
      }
      function bnShiftLeft(n2) {
        var r = new BigInteger2();
        if (n2 < 0) this.rShiftTo(-n2, r);
        else this.lShiftTo(n2, r);
        return r;
      }
      function bnShiftRight(n2) {
        var r = new BigInteger2();
        if (n2 < 0) this.lShiftTo(-n2, r);
        else this.rShiftTo(n2, r);
        return r;
      }
      function lbit(x) {
        if (x == 0) return -1;
        var r = 0;
        if ((x & 65535) == 0) {
          x >>= 16;
          r += 16;
        }
        if ((x & 255) == 0) {
          x >>= 8;
          r += 8;
        }
        if ((x & 15) == 0) {
          x >>= 4;
          r += 4;
        }
        if ((x & 3) == 0) {
          x >>= 2;
          r += 2;
        }
        if ((x & 1) == 0) ++r;
        return r;
      }
      function bnGetLowestSetBit() {
        for (var i = 0; i < this.t; ++i)
          if (this[i] != 0) return i * this.DB + lbit(this[i]);
        if (this.s < 0) return this.t * this.DB;
        return -1;
      }
      function cbit(x) {
        var r = 0;
        while (x != 0) {
          x &= x - 1;
          ++r;
        }
        return r;
      }
      function bnBitCount() {
        var r = 0, x = this.s & this.DM;
        for (var i = 0; i < this.t; ++i) r += cbit(this[i] ^ x);
        return r;
      }
      function bnTestBit(n2) {
        var j = Math.floor(n2 / this.DB);
        if (j >= this.t) return this.s != 0;
        return (this[j] & 1 << n2 % this.DB) != 0;
      }
      function bnpChangeBit(n2, op) {
        var r = BigInteger2.ONE.shiftLeft(n2);
        this.bitwiseTo(r, op, r);
        return r;
      }
      function bnSetBit(n2) {
        return this.changeBit(n2, op_or);
      }
      function bnClearBit(n2) {
        return this.changeBit(n2, op_andnot);
      }
      function bnFlipBit(n2) {
        return this.changeBit(n2, op_xor);
      }
      function bnpAddTo(a, r) {
        var self2 = this;
        var i = 0, c = 0, m = Math.min(a.t, self2.t);
        while (i < m) {
          c += self2[i] + a[i];
          r[i++] = c & self2.DM;
          c >>= self2.DB;
        }
        if (a.t < self2.t) {
          c += a.s;
          while (i < self2.t) {
            c += self2[i];
            r[i++] = c & self2.DM;
            c >>= self2.DB;
          }
          c += self2.s;
        } else {
          c += self2.s;
          while (i < a.t) {
            c += a[i];
            r[i++] = c & self2.DM;
            c >>= self2.DB;
          }
          c += a.s;
        }
        r.s = c < 0 ? -1 : 0;
        if (c > 0) r[i++] = c;
        else if (c < -1) r[i++] = self2.DV + c;
        r.t = i;
        r.clamp();
      }
      function bnAdd(a) {
        var r = new BigInteger2();
        this.addTo(a, r);
        return r;
      }
      function bnSubtract(a) {
        var r = new BigInteger2();
        this.subTo(a, r);
        return r;
      }
      function bnMultiply(a) {
        var r = new BigInteger2();
        this.multiplyTo(a, r);
        return r;
      }
      function bnSquare() {
        var r = new BigInteger2();
        this.squareTo(r);
        return r;
      }
      function bnDivide(a) {
        var r = new BigInteger2();
        this.divRemTo(a, r, null);
        return r;
      }
      function bnRemainder(a) {
        var r = new BigInteger2();
        this.divRemTo(a, null, r);
        return r;
      }
      function bnDivideAndRemainder(a) {
        var q = new BigInteger2(), r = new BigInteger2();
        this.divRemTo(a, q, r);
        return new Array(q, r);
      }
      function bnpDMultiply(n2) {
        this[this.t] = this.am(0, n2 - 1, this, 0, 0, this.t);
        ++this.t;
        this.clamp();
      }
      function bnpDAddOffset(n2, w) {
        if (n2 == 0) return;
        while (this.t <= w) this[this.t++] = 0;
        this[w] += n2;
        while (this[w] >= this.DV) {
          this[w] -= this.DV;
          if (++w >= this.t) this[this.t++] = 0;
          ++this[w];
        }
      }
      function NullExp() {
      }
      function nNop(x) {
        return x;
      }
      function nMulTo(x, y, r) {
        x.multiplyTo(y, r);
      }
      function nSqrTo(x, r) {
        x.squareTo(r);
      }
      NullExp.prototype.convert = nNop;
      NullExp.prototype.revert = nNop;
      NullExp.prototype.mulTo = nMulTo;
      NullExp.prototype.sqrTo = nSqrTo;
      function bnPow(e) {
        return this.exp(e, new NullExp());
      }
      function bnpMultiplyLowerTo(a, n2, r) {
        var i = Math.min(this.t + a.t, n2);
        r.s = 0;
        r.t = i;
        while (i > 0) r[--i] = 0;
        var j;
        for (j = r.t - this.t; i < j; ++i) r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
        for (j = Math.min(a.t, n2); i < j; ++i) this.am(0, a[i], r, i, 0, n2 - i);
        r.clamp();
      }
      function bnpMultiplyUpperTo(a, n2, r) {
        --n2;
        var i = r.t = this.t + a.t - n2;
        r.s = 0;
        while (--i >= 0) r[i] = 0;
        for (i = Math.max(n2 - this.t, 0); i < a.t; ++i)
          r[this.t + i - n2] = this.am(n2 - i, a[i], r, 0, 0, this.t + i - n2);
        r.clamp();
        r.drShiftTo(1, r);
      }
      function Barrett(m) {
        this.r2 = new BigInteger2();
        this.q3 = new BigInteger2();
        BigInteger2.ONE.dlShiftTo(2 * m.t, this.r2);
        this.mu = this.r2.divide(m);
        this.m = m;
      }
      function barrettConvert(x) {
        if (x.s < 0 || x.t > 2 * this.m.t) return x.mod(this.m);
        else if (x.compareTo(this.m) < 0) return x;
        else {
          var r = new BigInteger2();
          x.copyTo(r);
          this.reduce(r);
          return r;
        }
      }
      function barrettRevert(x) {
        return x;
      }
      function barrettReduce(x) {
        var self2 = this;
        x.drShiftTo(self2.m.t - 1, self2.r2);
        if (x.t > self2.m.t + 1) {
          x.t = self2.m.t + 1;
          x.clamp();
        }
        self2.mu.multiplyUpperTo(self2.r2, self2.m.t + 1, self2.q3);
        self2.m.multiplyLowerTo(self2.q3, self2.m.t + 1, self2.r2);
        while (x.compareTo(self2.r2) < 0) x.dAddOffset(1, self2.m.t + 1);
        x.subTo(self2.r2, x);
        while (x.compareTo(self2.m) >= 0) x.subTo(self2.m, x);
      }
      function barrettSqrTo(x, r) {
        x.squareTo(r);
        this.reduce(r);
      }
      function barrettMulTo(x, y, r) {
        x.multiplyTo(y, r);
        this.reduce(r);
      }
      Barrett.prototype.convert = barrettConvert;
      Barrett.prototype.revert = barrettRevert;
      Barrett.prototype.reduce = barrettReduce;
      Barrett.prototype.mulTo = barrettMulTo;
      Barrett.prototype.sqrTo = barrettSqrTo;
      function bnModPow(e, m) {
        var i = e.bitLength(), k, r = nbv(1), z;
        if (i <= 0) return r;
        else if (i < 18) k = 1;
        else if (i < 48) k = 3;
        else if (i < 144) k = 4;
        else if (i < 768) k = 5;
        else k = 6;
        if (i < 8)
          z = new Classic(m);
        else if (m.isEven())
          z = new Barrett(m);
        else
          z = new Montgomery(m);
        var g = new Array(), n2 = 3, k1 = k - 1, km = (1 << k) - 1;
        g[1] = z.convert(this);
        if (k > 1) {
          var g2 = new BigInteger2();
          z.sqrTo(g[1], g2);
          while (n2 <= km) {
            g[n2] = new BigInteger2();
            z.mulTo(g2, g[n2 - 2], g[n2]);
            n2 += 2;
          }
        }
        var j = e.t - 1, w, is1 = true, r2 = new BigInteger2(), t;
        i = nbits(e[j]) - 1;
        while (j >= 0) {
          if (i >= k1) w = e[j] >> i - k1 & km;
          else {
            w = (e[j] & (1 << i + 1) - 1) << k1 - i;
            if (j > 0) w |= e[j - 1] >> this.DB + i - k1;
          }
          n2 = k;
          while ((w & 1) == 0) {
            w >>= 1;
            --n2;
          }
          if ((i -= n2) < 0) {
            i += this.DB;
            --j;
          }
          if (is1) {
            g[w].copyTo(r);
            is1 = false;
          } else {
            while (n2 > 1) {
              z.sqrTo(r, r2);
              z.sqrTo(r2, r);
              n2 -= 2;
            }
            if (n2 > 0) z.sqrTo(r, r2);
            else {
              t = r;
              r = r2;
              r2 = t;
            }
            z.mulTo(r2, g[w], r);
          }
          while (j >= 0 && (e[j] & 1 << i) == 0) {
            z.sqrTo(r, r2);
            t = r;
            r = r2;
            r2 = t;
            if (--i < 0) {
              i = this.DB - 1;
              --j;
            }
          }
        }
        return z.revert(r);
      }
      function bnGCD(a) {
        var x = this.s < 0 ? this.negate() : this.clone();
        var y = a.s < 0 ? a.negate() : a.clone();
        if (x.compareTo(y) < 0) {
          var t = x;
          x = y;
          y = t;
        }
        var i = x.getLowestSetBit(), g = y.getLowestSetBit();
        if (g < 0) return x;
        if (i < g) g = i;
        if (g > 0) {
          x.rShiftTo(g, x);
          y.rShiftTo(g, y);
        }
        while (x.signum() > 0) {
          if ((i = x.getLowestSetBit()) > 0) x.rShiftTo(i, x);
          if ((i = y.getLowestSetBit()) > 0) y.rShiftTo(i, y);
          if (x.compareTo(y) >= 0) {
            x.subTo(y, x);
            x.rShiftTo(1, x);
          } else {
            y.subTo(x, y);
            y.rShiftTo(1, y);
          }
        }
        if (g > 0) y.lShiftTo(g, y);
        return y;
      }
      function bnpModInt(n2) {
        if (n2 <= 0) return 0;
        var d = this.DV % n2, r = this.s < 0 ? n2 - 1 : 0;
        if (this.t > 0)
          if (d == 0) r = this[0] % n2;
          else
            for (var i = this.t - 1; i >= 0; --i) r = (d * r + this[i]) % n2;
        return r;
      }
      function bnModInverse(m) {
        var ac = m.isEven();
        if (this.signum() === 0) throw new Error("division by zero");
        if (this.isEven() && ac || m.signum() == 0) return BigInteger2.ZERO;
        var u = m.clone(), v = this.clone();
        var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
        while (u.signum() != 0) {
          while (u.isEven()) {
            u.rShiftTo(1, u);
            if (ac) {
              if (!a.isEven() || !b.isEven()) {
                a.addTo(this, a);
                b.subTo(m, b);
              }
              a.rShiftTo(1, a);
            } else if (!b.isEven()) b.subTo(m, b);
            b.rShiftTo(1, b);
          }
          while (v.isEven()) {
            v.rShiftTo(1, v);
            if (ac) {
              if (!c.isEven() || !d.isEven()) {
                c.addTo(this, c);
                d.subTo(m, d);
              }
              c.rShiftTo(1, c);
            } else if (!d.isEven()) d.subTo(m, d);
            d.rShiftTo(1, d);
          }
          if (u.compareTo(v) >= 0) {
            u.subTo(v, u);
            if (ac) a.subTo(c, a);
            b.subTo(d, b);
          } else {
            v.subTo(u, v);
            if (ac) c.subTo(a, c);
            d.subTo(b, d);
          }
        }
        if (v.compareTo(BigInteger2.ONE) != 0) return BigInteger2.ZERO;
        while (d.compareTo(m) >= 0) d.subTo(m, d);
        while (d.signum() < 0) d.addTo(m, d);
        return d;
      }
      var lowprimes = [
        2,
        3,
        5,
        7,
        11,
        13,
        17,
        19,
        23,
        29,
        31,
        37,
        41,
        43,
        47,
        53,
        59,
        61,
        67,
        71,
        73,
        79,
        83,
        89,
        97,
        101,
        103,
        107,
        109,
        113,
        127,
        131,
        137,
        139,
        149,
        151,
        157,
        163,
        167,
        173,
        179,
        181,
        191,
        193,
        197,
        199,
        211,
        223,
        227,
        229,
        233,
        239,
        241,
        251,
        257,
        263,
        269,
        271,
        277,
        281,
        283,
        293,
        307,
        311,
        313,
        317,
        331,
        337,
        347,
        349,
        353,
        359,
        367,
        373,
        379,
        383,
        389,
        397,
        401,
        409,
        419,
        421,
        431,
        433,
        439,
        443,
        449,
        457,
        461,
        463,
        467,
        479,
        487,
        491,
        499,
        503,
        509,
        521,
        523,
        541,
        547,
        557,
        563,
        569,
        571,
        577,
        587,
        593,
        599,
        601,
        607,
        613,
        617,
        619,
        631,
        641,
        643,
        647,
        653,
        659,
        661,
        673,
        677,
        683,
        691,
        701,
        709,
        719,
        727,
        733,
        739,
        743,
        751,
        757,
        761,
        769,
        773,
        787,
        797,
        809,
        811,
        821,
        823,
        827,
        829,
        839,
        853,
        857,
        859,
        863,
        877,
        881,
        883,
        887,
        907,
        911,
        919,
        929,
        937,
        941,
        947,
        953,
        967,
        971,
        977,
        983,
        991,
        997
      ];
      var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
      function bnIsProbablePrime(t) {
        var i, x = this.abs();
        if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
          for (i = 0; i < lowprimes.length; ++i)
            if (x[0] == lowprimes[i]) return true;
          return false;
        }
        if (x.isEven()) return false;
        i = 1;
        while (i < lowprimes.length) {
          var m = lowprimes[i], j = i + 1;
          while (j < lowprimes.length && m < lplim) m *= lowprimes[j++];
          m = x.modInt(m);
          while (i < j) if (m % lowprimes[i++] == 0) return false;
        }
        return x.millerRabin(t);
      }
      function bnpMillerRabin(t) {
        var n1 = this.subtract(BigInteger2.ONE);
        var k = n1.getLowestSetBit();
        if (k <= 0) return false;
        var r = n1.shiftRight(k);
        t = t + 1 >> 1;
        if (t > lowprimes.length) t = lowprimes.length;
        var a = new BigInteger2(null);
        var j, bases = [];
        for (var i = 0; i < t; ++i) {
          for (; ; ) {
            j = lowprimes[Math.floor(Math.random() * lowprimes.length)];
            if (bases.indexOf(j) == -1) break;
          }
          bases.push(j);
          a.fromInt(j);
          var y = a.modPow(r, this);
          if (y.compareTo(BigInteger2.ONE) != 0 && y.compareTo(n1) != 0) {
            var j = 1;
            while (j++ < k && y.compareTo(n1) != 0) {
              y = y.modPowInt(2, this);
              if (y.compareTo(BigInteger2.ONE) == 0) return false;
            }
            if (y.compareTo(n1) != 0) return false;
          }
        }
        return true;
      }
      proto.chunkSize = bnpChunkSize;
      proto.toRadix = bnpToRadix;
      proto.fromRadix = bnpFromRadix;
      proto.fromNumber = bnpFromNumber;
      proto.bitwiseTo = bnpBitwiseTo;
      proto.changeBit = bnpChangeBit;
      proto.addTo = bnpAddTo;
      proto.dMultiply = bnpDMultiply;
      proto.dAddOffset = bnpDAddOffset;
      proto.multiplyLowerTo = bnpMultiplyLowerTo;
      proto.multiplyUpperTo = bnpMultiplyUpperTo;
      proto.modInt = bnpModInt;
      proto.millerRabin = bnpMillerRabin;
      proto.clone = bnClone;
      proto.intValue = bnIntValue;
      proto.byteValue = bnByteValue;
      proto.shortValue = bnShortValue;
      proto.signum = bnSigNum;
      proto.toByteArray = bnToByteArray;
      proto.equals = bnEquals;
      proto.min = bnMin;
      proto.max = bnMax;
      proto.and = bnAnd;
      proto.or = bnOr;
      proto.xor = bnXor;
      proto.andNot = bnAndNot;
      proto.not = bnNot;
      proto.shiftLeft = bnShiftLeft;
      proto.shiftRight = bnShiftRight;
      proto.getLowestSetBit = bnGetLowestSetBit;
      proto.bitCount = bnBitCount;
      proto.testBit = bnTestBit;
      proto.setBit = bnSetBit;
      proto.clearBit = bnClearBit;
      proto.flipBit = bnFlipBit;
      proto.add = bnAdd;
      proto.subtract = bnSubtract;
      proto.multiply = bnMultiply;
      proto.divide = bnDivide;
      proto.remainder = bnRemainder;
      proto.divideAndRemainder = bnDivideAndRemainder;
      proto.modPow = bnModPow;
      proto.modInverse = bnModInverse;
      proto.pow = bnPow;
      proto.gcd = bnGCD;
      proto.isProbablePrime = bnIsProbablePrime;
      proto.square = bnSquare;
      BigInteger2.ZERO = nbv(0);
      BigInteger2.ONE = nbv(1);
      BigInteger2.valueOf = nbv;
      module2.exports = BigInteger2;
    }
  });

  // node_modules/assert/build/internal/errors.js
  var require_errors = __commonJS({
    "node_modules/assert/build/internal/errors.js"(exports2, module2) {
      "use strict";
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", { writable: false });
        return Constructor;
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return _typeof(key) === "symbol" ? key : String(key);
      }
      function _toPrimitive(input, hint) {
        if (_typeof(input) !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (_typeof(res) !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        Object.defineProperty(subClass, "prototype", { writable: false });
        if (superClass) _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        } else if (call !== void 0) {
          throw new TypeError("Derived constructors may only return object or undefined");
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var codes = {};
      var assert;
      var util;
      function createErrorType(code, message, Base) {
        if (!Base) {
          Base = Error;
        }
        function getMessage(arg1, arg2, arg3) {
          if (typeof message === "string") {
            return message;
          } else {
            return message(arg1, arg2, arg3);
          }
        }
        var NodeError = /* @__PURE__ */ function(_Base) {
          _inherits(NodeError2, _Base);
          var _super = _createSuper(NodeError2);
          function NodeError2(arg1, arg2, arg3) {
            var _this;
            _classCallCheck(this, NodeError2);
            _this = _super.call(this, getMessage(arg1, arg2, arg3));
            _this.code = code;
            return _this;
          }
          return _createClass(NodeError2);
        }(Base);
        codes[code] = NodeError;
      }
      function oneOf(expected, thing) {
        if (Array.isArray(expected)) {
          var len = expected.length;
          expected = expected.map(function(i) {
            return String(i);
          });
          if (len > 2) {
            return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
          } else if (len === 2) {
            return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
          } else {
            return "of ".concat(thing, " ").concat(expected[0]);
          }
        } else {
          return "of ".concat(thing, " ").concat(String(expected));
        }
      }
      function startsWith(str, search, pos) {
        return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
      }
      function endsWith(str, search, this_len) {
        if (this_len === void 0 || this_len > str.length) {
          this_len = str.length;
        }
        return str.substring(this_len - search.length, this_len) === search;
      }
      function includes(str, search, start) {
        if (typeof start !== "number") {
          start = 0;
        }
        if (start + search.length > str.length) {
          return false;
        } else {
          return str.indexOf(search, start) !== -1;
        }
      }
      createErrorType("ERR_AMBIGUOUS_ARGUMENT", 'The "%s" argument is ambiguous. %s', TypeError);
      createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
        if (assert === void 0) assert = require_assert();
        assert(typeof name === "string", "'name' must be a string");
        var determiner;
        if (typeof expected === "string" && startsWith(expected, "not ")) {
          determiner = "must not be";
          expected = expected.replace(/^not /, "");
        } else {
          determiner = "must be";
        }
        var msg;
        if (endsWith(name, " argument")) {
          msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
        } else {
          var type = includes(name, ".") ? "property" : "argument";
          msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
        }
        msg += ". Received type ".concat(_typeof(actual));
        return msg;
      }, TypeError);
      createErrorType("ERR_INVALID_ARG_VALUE", function(name, value) {
        var reason = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "is invalid";
        if (util === void 0) util = require_util();
        var inspected = util.inspect(value);
        if (inspected.length > 128) {
          inspected = "".concat(inspected.slice(0, 128), "...");
        }
        return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
      }, TypeError, RangeError);
      createErrorType("ERR_INVALID_RETURN_VALUE", function(input, name, value) {
        var type;
        if (value && value.constructor && value.constructor.name) {
          type = "instance of ".concat(value.constructor.name);
        } else {
          type = "type ".concat(_typeof(value));
        }
        return "Expected ".concat(input, ' to be returned from the "').concat(name, '"') + " function but got ".concat(type, ".");
      }, TypeError);
      createErrorType("ERR_MISSING_ARGS", function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (assert === void 0) assert = require_assert();
        assert(args.length > 0, "At least one arg needs to be specified");
        var msg = "The ";
        var len = args.length;
        args = args.map(function(a) {
          return '"'.concat(a, '"');
        });
        switch (len) {
          case 1:
            msg += "".concat(args[0], " argument");
            break;
          case 2:
            msg += "".concat(args[0], " and ").concat(args[1], " arguments");
            break;
          default:
            msg += args.slice(0, len - 1).join(", ");
            msg += ", and ".concat(args[len - 1], " arguments");
            break;
        }
        return "".concat(msg, " must be specified");
      }, TypeError);
      module2.exports.codes = codes;
    }
  });

  // node_modules/assert/build/internal/assert/assertion_error.js
  var require_assertion_error = __commonJS({
    "node_modules/assert/build/internal/assert/assertion_error.js"(exports2, module2) {
      "use strict";
      function ownKeys(e, r) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          r && (o = o.filter(function(r2) {
            return Object.getOwnPropertyDescriptor(e, r2).enumerable;
          })), t.push.apply(t, o);
        }
        return t;
      }
      function _objectSpread(e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = null != arguments[r] ? arguments[r] : {};
          r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
            _defineProperty(e, r2, t[r2]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
            Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
          });
        }
        return e;
      }
      function _defineProperty(obj, key, value) {
        key = _toPropertyKey(key);
        if (key in obj) {
          Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", { writable: false });
        return Constructor;
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return _typeof(key) === "symbol" ? key : String(key);
      }
      function _toPrimitive(input, hint) {
        if (_typeof(input) !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (_typeof(res) !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        Object.defineProperty(subClass, "prototype", { writable: false });
        if (superClass) _setPrototypeOf(subClass, superClass);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        } else if (call !== void 0) {
          throw new TypeError("Derived constructors may only return object or undefined");
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _wrapNativeSuper(Class) {
        var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
        _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
          if (Class2 === null || !_isNativeFunction(Class2)) return Class2;
          if (typeof Class2 !== "function") {
            throw new TypeError("Super expression must either be null or a function");
          }
          if (typeof _cache !== "undefined") {
            if (_cache.has(Class2)) return _cache.get(Class2);
            _cache.set(Class2, Wrapper);
          }
          function Wrapper() {
            return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
          }
          Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
          return _setPrototypeOf(Wrapper, Class2);
        };
        return _wrapNativeSuper(Class);
      }
      function _construct(Parent, args, Class) {
        if (_isNativeReflectConstruct()) {
          _construct = Reflect.construct.bind();
        } else {
          _construct = function _construct2(Parent2, args2, Class2) {
            var a = [null];
            a.push.apply(a, args2);
            var Constructor = Function.bind.apply(Parent2, a);
            var instance = new Constructor();
            if (Class2) _setPrototypeOf(instance, Class2.prototype);
            return instance;
          };
        }
        return _construct.apply(null, arguments);
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _isNativeFunction(fn) {
        return Function.toString.call(fn).indexOf("[native code]") !== -1;
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      var _require = require_util();
      var inspect = _require.inspect;
      var _require2 = require_errors();
      var ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE;
      function endsWith(str, search, this_len) {
        if (this_len === void 0 || this_len > str.length) {
          this_len = str.length;
        }
        return str.substring(this_len - search.length, this_len) === search;
      }
      function repeat(str, count) {
        count = Math.floor(count);
        if (str.length == 0 || count == 0) return "";
        var maxCount = str.length * count;
        count = Math.floor(Math.log(count) / Math.log(2));
        while (count) {
          str += str;
          count--;
        }
        str += str.substring(0, maxCount - str.length);
        return str;
      }
      var blue = "";
      var green = "";
      var red = "";
      var white = "";
      var kReadableOperator = {
        deepStrictEqual: "Expected values to be strictly deep-equal:",
        strictEqual: "Expected values to be strictly equal:",
        strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
        deepEqual: "Expected values to be loosely deep-equal:",
        equal: "Expected values to be loosely equal:",
        notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
        notStrictEqual: 'Expected "actual" to be strictly unequal to:',
        notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
        notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
        notEqual: 'Expected "actual" to be loosely unequal to:',
        notIdentical: "Values identical but not reference-equal:"
      };
      var kMaxShortLength = 10;
      function copyError(source) {
        var keys = Object.keys(source);
        var target = Object.create(Object.getPrototypeOf(source));
        keys.forEach(function(key) {
          target[key] = source[key];
        });
        Object.defineProperty(target, "message", {
          value: source.message
        });
        return target;
      }
      function inspectValue(val) {
        return inspect(val, {
          compact: false,
          customInspect: false,
          depth: 1e3,
          maxArrayLength: Infinity,
          // Assert compares only enumerable properties (with a few exceptions).
          showHidden: false,
          // Having a long line as error is better than wrapping the line for
          // comparison for now.
          // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
          // have meta information about the inspected properties (i.e., know where
          // in what line the property starts and ends).
          breakLength: Infinity,
          // Assert does not detect proxies currently.
          showProxy: false,
          sorted: true,
          // Inspect getters as we also check them when comparing entries.
          getters: true
        });
      }
      function createErrDiff(actual, expected, operator) {
        var other = "";
        var res = "";
        var lastPos = 0;
        var end = "";
        var skipped = false;
        var actualInspected = inspectValue(actual);
        var actualLines = actualInspected.split("\n");
        var expectedLines = inspectValue(expected).split("\n");
        var i = 0;
        var indicator = "";
        if (operator === "strictEqual" && _typeof(actual) === "object" && _typeof(expected) === "object" && actual !== null && expected !== null) {
          operator = "strictEqualObject";
        }
        if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
          var inputLength = actualLines[0].length + expectedLines[0].length;
          if (inputLength <= kMaxShortLength) {
            if ((_typeof(actual) !== "object" || actual === null) && (_typeof(expected) !== "object" || expected === null) && (actual !== 0 || expected !== 0)) {
              return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
            }
          } else if (operator !== "strictEqualObject") {
            var maxLength = process.stderr && process.stderr.isTTY ? process.stderr.columns : 80;
            if (inputLength < maxLength) {
              while (actualLines[0][i] === expectedLines[0][i]) {
                i++;
              }
              if (i > 2) {
                indicator = "\n  ".concat(repeat(" ", i), "^");
                i = 0;
              }
            }
          }
        }
        var a = actualLines[actualLines.length - 1];
        var b = expectedLines[expectedLines.length - 1];
        while (a === b) {
          if (i++ < 2) {
            end = "\n  ".concat(a).concat(end);
          } else {
            other = a;
          }
          actualLines.pop();
          expectedLines.pop();
          if (actualLines.length === 0 || expectedLines.length === 0) break;
          a = actualLines[actualLines.length - 1];
          b = expectedLines[expectedLines.length - 1];
        }
        var maxLines = Math.max(actualLines.length, expectedLines.length);
        if (maxLines === 0) {
          var _actualLines = actualInspected.split("\n");
          if (_actualLines.length > 30) {
            _actualLines[26] = "".concat(blue, "...").concat(white);
            while (_actualLines.length > 27) {
              _actualLines.pop();
            }
          }
          return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join("\n"), "\n");
        }
        if (i > 3) {
          end = "\n".concat(blue, "...").concat(white).concat(end);
          skipped = true;
        }
        if (other !== "") {
          end = "\n  ".concat(other).concat(end);
          other = "";
        }
        var printedLines = 0;
        var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
        var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");
        for (i = 0; i < maxLines; i++) {
          var cur = i - lastPos;
          if (actualLines.length < i + 1) {
            if (cur > 1 && i > 2) {
              if (cur > 4) {
                res += "\n".concat(blue, "...").concat(white);
                skipped = true;
              } else if (cur > 3) {
                res += "\n  ".concat(expectedLines[i - 2]);
                printedLines++;
              }
              res += "\n  ".concat(expectedLines[i - 1]);
              printedLines++;
            }
            lastPos = i;
            other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
            printedLines++;
          } else if (expectedLines.length < i + 1) {
            if (cur > 1 && i > 2) {
              if (cur > 4) {
                res += "\n".concat(blue, "...").concat(white);
                skipped = true;
              } else if (cur > 3) {
                res += "\n  ".concat(actualLines[i - 2]);
                printedLines++;
              }
              res += "\n  ".concat(actualLines[i - 1]);
              printedLines++;
            }
            lastPos = i;
            res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
            printedLines++;
          } else {
            var expectedLine = expectedLines[i];
            var actualLine = actualLines[i];
            var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ",") || actualLine.slice(0, -1) !== expectedLine);
            if (divergingLines && endsWith(expectedLine, ",") && expectedLine.slice(0, -1) === actualLine) {
              divergingLines = false;
              actualLine += ",";
            }
            if (divergingLines) {
              if (cur > 1 && i > 2) {
                if (cur > 4) {
                  res += "\n".concat(blue, "...").concat(white);
                  skipped = true;
                } else if (cur > 3) {
                  res += "\n  ".concat(actualLines[i - 2]);
                  printedLines++;
                }
                res += "\n  ".concat(actualLines[i - 1]);
                printedLines++;
              }
              lastPos = i;
              res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
              other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
              printedLines += 2;
            } else {
              res += other;
              other = "";
              if (cur === 1 || i === 0) {
                res += "\n  ".concat(actualLine);
                printedLines++;
              }
            }
          }
          if (printedLines > 20 && i < maxLines - 2) {
            return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
          }
        }
        return "".concat(msg).concat(skipped ? skippedMsg : "", "\n").concat(res).concat(other).concat(end).concat(indicator);
      }
      var AssertionError = /* @__PURE__ */ function(_Error, _inspect$custom) {
        _inherits(AssertionError2, _Error);
        var _super = _createSuper(AssertionError2);
        function AssertionError2(options) {
          var _this;
          _classCallCheck(this, AssertionError2);
          if (_typeof(options) !== "object" || options === null) {
            throw new ERR_INVALID_ARG_TYPE("options", "Object", options);
          }
          var message = options.message, operator = options.operator, stackStartFn = options.stackStartFn;
          var actual = options.actual, expected = options.expected;
          var limit = Error.stackTraceLimit;
          Error.stackTraceLimit = 0;
          if (message != null) {
            _this = _super.call(this, String(message));
          } else {
            if (process.stderr && process.stderr.isTTY) {
              if (process.stderr && process.stderr.getColorDepth && process.stderr.getColorDepth() !== 1) {
                blue = "\x1B[34m";
                green = "\x1B[32m";
                white = "\x1B[39m";
                red = "\x1B[31m";
              } else {
                blue = "";
                green = "";
                white = "";
                red = "";
              }
            }
            if (_typeof(actual) === "object" && actual !== null && _typeof(expected) === "object" && expected !== null && "stack" in actual && actual instanceof Error && "stack" in expected && expected instanceof Error) {
              actual = copyError(actual);
              expected = copyError(expected);
            }
            if (operator === "deepStrictEqual" || operator === "strictEqual") {
              _this = _super.call(this, createErrDiff(actual, expected, operator));
            } else if (operator === "notDeepStrictEqual" || operator === "notStrictEqual") {
              var base = kReadableOperator[operator];
              var res = inspectValue(actual).split("\n");
              if (operator === "notStrictEqual" && _typeof(actual) === "object" && actual !== null) {
                base = kReadableOperator.notStrictEqualObject;
              }
              if (res.length > 30) {
                res[26] = "".concat(blue, "...").concat(white);
                while (res.length > 27) {
                  res.pop();
                }
              }
              if (res.length === 1) {
                _this = _super.call(this, "".concat(base, " ").concat(res[0]));
              } else {
                _this = _super.call(this, "".concat(base, "\n\n").concat(res.join("\n"), "\n"));
              }
            } else {
              var _res = inspectValue(actual);
              var other = "";
              var knownOperators = kReadableOperator[operator];
              if (operator === "notDeepEqual" || operator === "notEqual") {
                _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);
                if (_res.length > 1024) {
                  _res = "".concat(_res.slice(0, 1021), "...");
                }
              } else {
                other = "".concat(inspectValue(expected));
                if (_res.length > 512) {
                  _res = "".concat(_res.slice(0, 509), "...");
                }
                if (other.length > 512) {
                  other = "".concat(other.slice(0, 509), "...");
                }
                if (operator === "deepEqual" || operator === "equal") {
                  _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
                } else {
                  other = " ".concat(operator, " ").concat(other);
                }
              }
              _this = _super.call(this, "".concat(_res).concat(other));
            }
          }
          Error.stackTraceLimit = limit;
          _this.generatedMessage = !message;
          Object.defineProperty(_assertThisInitialized(_this), "name", {
            value: "AssertionError [ERR_ASSERTION]",
            enumerable: false,
            writable: true,
            configurable: true
          });
          _this.code = "ERR_ASSERTION";
          _this.actual = actual;
          _this.expected = expected;
          _this.operator = operator;
          if (Error.captureStackTrace) {
            Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
          }
          _this.stack;
          _this.name = "AssertionError";
          return _possibleConstructorReturn(_this);
        }
        _createClass(AssertionError2, [{
          key: "toString",
          value: function toString() {
            return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
          }
        }, {
          key: _inspect$custom,
          value: function value(recurseTimes, ctx) {
            return inspect(this, _objectSpread(_objectSpread({}, ctx), {}, {
              customInspect: false,
              depth: 0
            }));
          }
        }]);
        return AssertionError2;
      }(/* @__PURE__ */ _wrapNativeSuper(Error), inspect.custom);
      module2.exports = AssertionError;
    }
  });

  // node_modules/object-keys/isArguments.js
  var require_isArguments = __commonJS({
    "node_modules/object-keys/isArguments.js"(exports2, module2) {
      "use strict";
      var toStr = Object.prototype.toString;
      module2.exports = function isArguments(value) {
        var str = toStr.call(value);
        var isArgs = str === "[object Arguments]";
        if (!isArgs) {
          isArgs = str !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr.call(value.callee) === "[object Function]";
        }
        return isArgs;
      };
    }
  });

  // node_modules/object-keys/implementation.js
  var require_implementation2 = __commonJS({
    "node_modules/object-keys/implementation.js"(exports2, module2) {
      "use strict";
      var keysShim;
      if (!Object.keys) {
        has = Object.prototype.hasOwnProperty;
        toStr = Object.prototype.toString;
        isArgs = require_isArguments();
        isEnumerable = Object.prototype.propertyIsEnumerable;
        hasDontEnumBug = !isEnumerable.call({ toString: null }, "toString");
        hasProtoEnumBug = isEnumerable.call(function() {
        }, "prototype");
        dontEnums = [
          "toString",
          "toLocaleString",
          "valueOf",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "constructor"
        ];
        equalsConstructorPrototype = function(o) {
          var ctor = o.constructor;
          return ctor && ctor.prototype === o;
        };
        excludedKeys = {
          $applicationCache: true,
          $console: true,
          $external: true,
          $frame: true,
          $frameElement: true,
          $frames: true,
          $innerHeight: true,
          $innerWidth: true,
          $onmozfullscreenchange: true,
          $onmozfullscreenerror: true,
          $outerHeight: true,
          $outerWidth: true,
          $pageXOffset: true,
          $pageYOffset: true,
          $parent: true,
          $scrollLeft: true,
          $scrollTop: true,
          $scrollX: true,
          $scrollY: true,
          $self: true,
          $webkitIndexedDB: true,
          $webkitStorageInfo: true,
          $window: true
        };
        hasAutomationEqualityBug = function() {
          if (typeof window === "undefined") {
            return false;
          }
          for (var k in window) {
            try {
              if (!excludedKeys["$" + k] && has.call(window, k) && window[k] !== null && typeof window[k] === "object") {
                try {
                  equalsConstructorPrototype(window[k]);
                } catch (e) {
                  return true;
                }
              }
            } catch (e) {
              return true;
            }
          }
          return false;
        }();
        equalsConstructorPrototypeIfNotBuggy = function(o) {
          if (typeof window === "undefined" || !hasAutomationEqualityBug) {
            return equalsConstructorPrototype(o);
          }
          try {
            return equalsConstructorPrototype(o);
          } catch (e) {
            return false;
          }
        };
        keysShim = function keys(object) {
          var isObject = object !== null && typeof object === "object";
          var isFunction = toStr.call(object) === "[object Function]";
          var isArguments = isArgs(object);
          var isString = isObject && toStr.call(object) === "[object String]";
          var theKeys = [];
          if (!isObject && !isFunction && !isArguments) {
            throw new TypeError("Object.keys called on a non-object");
          }
          var skipProto = hasProtoEnumBug && isFunction;
          if (isString && object.length > 0 && !has.call(object, 0)) {
            for (var i = 0; i < object.length; ++i) {
              theKeys.push(String(i));
            }
          }
          if (isArguments && object.length > 0) {
            for (var j = 0; j < object.length; ++j) {
              theKeys.push(String(j));
            }
          } else {
            for (var name in object) {
              if (!(skipProto && name === "prototype") && has.call(object, name)) {
                theKeys.push(String(name));
              }
            }
          }
          if (hasDontEnumBug) {
            var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
            for (var k = 0; k < dontEnums.length; ++k) {
              if (!(skipConstructor && dontEnums[k] === "constructor") && has.call(object, dontEnums[k])) {
                theKeys.push(dontEnums[k]);
              }
            }
          }
          return theKeys;
        };
      }
      var has;
      var toStr;
      var isArgs;
      var isEnumerable;
      var hasDontEnumBug;
      var hasProtoEnumBug;
      var dontEnums;
      var equalsConstructorPrototype;
      var excludedKeys;
      var hasAutomationEqualityBug;
      var equalsConstructorPrototypeIfNotBuggy;
      module2.exports = keysShim;
    }
  });

  // node_modules/object-keys/index.js
  var require_object_keys = __commonJS({
    "node_modules/object-keys/index.js"(exports2, module2) {
      "use strict";
      var slice = Array.prototype.slice;
      var isArgs = require_isArguments();
      var origKeys = Object.keys;
      var keysShim = origKeys ? function keys(o) {
        return origKeys(o);
      } : require_implementation2();
      var originalKeys = Object.keys;
      keysShim.shim = function shimObjectKeys() {
        if (Object.keys) {
          var keysWorksWithArguments = function() {
            var args = Object.keys(arguments);
            return args && args.length === arguments.length;
          }(1, 2);
          if (!keysWorksWithArguments) {
            Object.keys = function keys(object) {
              if (isArgs(object)) {
                return originalKeys(slice.call(object));
              }
              return originalKeys(object);
            };
          }
        } else {
          Object.keys = keysShim;
        }
        return Object.keys || keysShim;
      };
      module2.exports = keysShim;
    }
  });

  // node_modules/object.assign/implementation.js
  var require_implementation3 = __commonJS({
    "node_modules/object.assign/implementation.js"(exports2, module2) {
      "use strict";
      var objectKeys = require_object_keys();
      var hasSymbols = require_shams()();
      var callBound = require_call_bound();
      var $Object = require_es_object_atoms();
      var $push = callBound("Array.prototype.push");
      var $propIsEnumerable = callBound("Object.prototype.propertyIsEnumerable");
      var originalGetSymbols = hasSymbols ? $Object.getOwnPropertySymbols : null;
      module2.exports = function assign(target, source1) {
        if (target == null) {
          throw new TypeError("target must be an object");
        }
        var to = $Object(target);
        if (arguments.length === 1) {
          return to;
        }
        for (var s = 1; s < arguments.length; ++s) {
          var from = $Object(arguments[s]);
          var keys = objectKeys(from);
          var getSymbols = hasSymbols && ($Object.getOwnPropertySymbols || originalGetSymbols);
          if (getSymbols) {
            var syms = getSymbols(from);
            for (var j = 0; j < syms.length; ++j) {
              var key = syms[j];
              if ($propIsEnumerable(from, key)) {
                $push(keys, key);
              }
            }
          }
          for (var i = 0; i < keys.length; ++i) {
            var nextKey = keys[i];
            if ($propIsEnumerable(from, nextKey)) {
              var propValue = from[nextKey];
              to[nextKey] = propValue;
            }
          }
        }
        return to;
      };
    }
  });

  // node_modules/object.assign/polyfill.js
  var require_polyfill = __commonJS({
    "node_modules/object.assign/polyfill.js"(exports2, module2) {
      "use strict";
      var implementation = require_implementation3();
      var lacksProperEnumerationOrder = function() {
        if (!Object.assign) {
          return false;
        }
        var str = "abcdefghijklmnopqrst";
        var letters = str.split("");
        var map = {};
        for (var i = 0; i < letters.length; ++i) {
          map[letters[i]] = letters[i];
        }
        var obj = Object.assign({}, map);
        var actual = "";
        for (var k in obj) {
          actual += k;
        }
        return str !== actual;
      };
      var assignHasPendingExceptions = function() {
        if (!Object.assign || !Object.preventExtensions) {
          return false;
        }
        var thrower = Object.preventExtensions({ 1: 2 });
        try {
          Object.assign(thrower, "xy");
        } catch (e) {
          return thrower[1] === "y";
        }
        return false;
      };
      module2.exports = function getPolyfill() {
        if (!Object.assign) {
          return implementation;
        }
        if (lacksProperEnumerationOrder()) {
          return implementation;
        }
        if (assignHasPendingExceptions()) {
          return implementation;
        }
        return Object.assign;
      };
    }
  });

  // node_modules/object-is/implementation.js
  var require_implementation4 = __commonJS({
    "node_modules/object-is/implementation.js"(exports2, module2) {
      "use strict";
      var numberIsNaN = function(value) {
        return value !== value;
      };
      module2.exports = function is(a, b) {
        if (a === 0 && b === 0) {
          return 1 / a === 1 / b;
        }
        if (a === b) {
          return true;
        }
        if (numberIsNaN(a) && numberIsNaN(b)) {
          return true;
        }
        return false;
      };
    }
  });

  // node_modules/object-is/polyfill.js
  var require_polyfill2 = __commonJS({
    "node_modules/object-is/polyfill.js"(exports2, module2) {
      "use strict";
      var implementation = require_implementation4();
      module2.exports = function getPolyfill() {
        return typeof Object.is === "function" ? Object.is : implementation;
      };
    }
  });

  // node_modules/call-bind/callBound.js
  var require_callBound = __commonJS({
    "node_modules/call-bind/callBound.js"(exports2, module2) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBind = require_call_bind();
      var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
      module2.exports = function callBoundIntrinsic(name, allowMissing) {
        var intrinsic = GetIntrinsic(name, !!allowMissing);
        if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
          return callBind(intrinsic);
        }
        return intrinsic;
      };
    }
  });

  // node_modules/define-properties/index.js
  var require_define_properties = __commonJS({
    "node_modules/define-properties/index.js"(exports2, module2) {
      "use strict";
      var keys = require_object_keys();
      var hasSymbols = typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
      var toStr = Object.prototype.toString;
      var concat2 = Array.prototype.concat;
      var defineDataProperty = require_define_data_property();
      var isFunction = function(fn) {
        return typeof fn === "function" && toStr.call(fn) === "[object Function]";
      };
      var supportsDescriptors = require_has_property_descriptors()();
      var defineProperty = function(object, name, value, predicate) {
        if (name in object) {
          if (predicate === true) {
            if (object[name] === value) {
              return;
            }
          } else if (!isFunction(predicate) || !predicate()) {
            return;
          }
        }
        if (supportsDescriptors) {
          defineDataProperty(object, name, value, true);
        } else {
          defineDataProperty(object, name, value);
        }
      };
      var defineProperties = function(object, map) {
        var predicates = arguments.length > 2 ? arguments[2] : {};
        var props = keys(map);
        if (hasSymbols) {
          props = concat2.call(props, Object.getOwnPropertySymbols(map));
        }
        for (var i = 0; i < props.length; i += 1) {
          defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
        }
      };
      defineProperties.supportsDescriptors = !!supportsDescriptors;
      module2.exports = defineProperties;
    }
  });

  // node_modules/object-is/shim.js
  var require_shim = __commonJS({
    "node_modules/object-is/shim.js"(exports2, module2) {
      "use strict";
      var getPolyfill = require_polyfill2();
      var define2 = require_define_properties();
      module2.exports = function shimObjectIs() {
        var polyfill = getPolyfill();
        define2(Object, { is: polyfill }, {
          is: function testObjectIs() {
            return Object.is !== polyfill;
          }
        });
        return polyfill;
      };
    }
  });

  // node_modules/object-is/index.js
  var require_object_is = __commonJS({
    "node_modules/object-is/index.js"(exports2, module2) {
      "use strict";
      var define2 = require_define_properties();
      var callBind = require_call_bind();
      var implementation = require_implementation4();
      var getPolyfill = require_polyfill2();
      var shim = require_shim();
      var polyfill = callBind(getPolyfill(), Object);
      define2(polyfill, {
        getPolyfill,
        implementation,
        shim
      });
      module2.exports = polyfill;
    }
  });

  // node_modules/is-nan/implementation.js
  var require_implementation5 = __commonJS({
    "node_modules/is-nan/implementation.js"(exports2, module2) {
      "use strict";
      module2.exports = function isNaN2(value) {
        return value !== value;
      };
    }
  });

  // node_modules/is-nan/polyfill.js
  var require_polyfill3 = __commonJS({
    "node_modules/is-nan/polyfill.js"(exports2, module2) {
      "use strict";
      var implementation = require_implementation5();
      module2.exports = function getPolyfill() {
        if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN("a")) {
          return Number.isNaN;
        }
        return implementation;
      };
    }
  });

  // node_modules/is-nan/shim.js
  var require_shim2 = __commonJS({
    "node_modules/is-nan/shim.js"(exports2, module2) {
      "use strict";
      var define2 = require_define_properties();
      var getPolyfill = require_polyfill3();
      module2.exports = function shimNumberIsNaN() {
        var polyfill = getPolyfill();
        define2(Number, { isNaN: polyfill }, {
          isNaN: function testIsNaN() {
            return Number.isNaN !== polyfill;
          }
        });
        return polyfill;
      };
    }
  });

  // node_modules/is-nan/index.js
  var require_is_nan = __commonJS({
    "node_modules/is-nan/index.js"(exports2, module2) {
      "use strict";
      var callBind = require_call_bind();
      var define2 = require_define_properties();
      var implementation = require_implementation5();
      var getPolyfill = require_polyfill3();
      var shim = require_shim2();
      var polyfill = callBind(getPolyfill(), Number);
      define2(polyfill, {
        getPolyfill,
        implementation,
        shim
      });
      module2.exports = polyfill;
    }
  });

  // node_modules/assert/build/internal/util/comparisons.js
  var require_comparisons = __commonJS({
    "node_modules/assert/build/internal/util/comparisons.js"(exports2, module2) {
      "use strict";
      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n2 = Object.prototype.toString.call(o).slice(8, -1);
        if (n2 === "Object" && o.constructor) n2 = o.constructor.name;
        if (n2 === "Map" || n2 === "Set") return Array.from(o);
        if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2)) return _arrayLikeToArray(o, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
      }
      function _iterableToArrayLimit(r, l) {
        var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (null != t) {
          var e, n2, i, u, a = [], f = true, o = false;
          try {
            if (i = (t = t.call(r)).next, 0 === l) {
              if (Object(t) !== t) return;
              f = false;
            } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
          } catch (r2) {
            o = true, n2 = r2;
          } finally {
            try {
              if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
            } finally {
              if (o) throw n2;
            }
          }
          return a;
        }
      }
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
      }
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      var regexFlagsSupported = /a/g.flags !== void 0;
      var arrayFromSet = function arrayFromSet2(set) {
        var array = [];
        set.forEach(function(value) {
          return array.push(value);
        });
        return array;
      };
      var arrayFromMap = function arrayFromMap2(map) {
        var array = [];
        map.forEach(function(value, key) {
          return array.push([key, value]);
        });
        return array;
      };
      var objectIs = Object.is ? Object.is : require_object_is();
      var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function() {
        return [];
      };
      var numberIsNaN = Number.isNaN ? Number.isNaN : require_is_nan();
      function uncurryThis(f) {
        return f.call.bind(f);
      }
      var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
      var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
      var objectToString = uncurryThis(Object.prototype.toString);
      var _require$types = require_util().types;
      var isAnyArrayBuffer = _require$types.isAnyArrayBuffer;
      var isArrayBufferView = _require$types.isArrayBufferView;
      var isDate = _require$types.isDate;
      var isMap = _require$types.isMap;
      var isRegExp = _require$types.isRegExp;
      var isSet = _require$types.isSet;
      var isNativeError = _require$types.isNativeError;
      var isBoxedPrimitive = _require$types.isBoxedPrimitive;
      var isNumberObject = _require$types.isNumberObject;
      var isStringObject = _require$types.isStringObject;
      var isBooleanObject = _require$types.isBooleanObject;
      var isBigIntObject = _require$types.isBigIntObject;
      var isSymbolObject = _require$types.isSymbolObject;
      var isFloat32Array = _require$types.isFloat32Array;
      var isFloat64Array = _require$types.isFloat64Array;
      function isNonIndex(key) {
        if (key.length === 0 || key.length > 10) return true;
        for (var i = 0; i < key.length; i++) {
          var code = key.charCodeAt(i);
          if (code < 48 || code > 57) return true;
        }
        return key.length === 10 && key >= Math.pow(2, 32);
      }
      function getOwnNonIndexProperties(value) {
        return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
      }
      function compare(a, b) {
        if (a === b) {
          return 0;
        }
        var x = a.length;
        var y = b.length;
        for (var i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y) {
          return -1;
        }
        if (y < x) {
          return 1;
        }
        return 0;
      }
      var ONLY_ENUMERABLE = void 0;
      var kStrict = true;
      var kLoose = false;
      var kNoIterator = 0;
      var kIsArray = 1;
      var kIsSet = 2;
      var kIsMap = 3;
      function areSimilarRegExps(a, b) {
        return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
      }
      function areSimilarFloatArrays(a, b) {
        if (a.byteLength !== b.byteLength) {
          return false;
        }
        for (var offset = 0; offset < a.byteLength; offset++) {
          if (a[offset] !== b[offset]) {
            return false;
          }
        }
        return true;
      }
      function areSimilarTypedArrays(a, b) {
        if (a.byteLength !== b.byteLength) {
          return false;
        }
        return compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
      }
      function areEqualArrayBuffers(buf1, buf2) {
        return buf1.byteLength === buf2.byteLength && compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
      }
      function isEqualBoxedPrimitive(val1, val2) {
        if (isNumberObject(val1)) {
          return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
        }
        if (isStringObject(val1)) {
          return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
        }
        if (isBooleanObject(val1)) {
          return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
        }
        if (isBigIntObject(val1)) {
          return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
        }
        return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
      }
      function innerDeepEqual(val1, val2, strict, memos) {
        if (val1 === val2) {
          if (val1 !== 0) return true;
          return strict ? objectIs(val1, val2) : true;
        }
        if (strict) {
          if (_typeof(val1) !== "object") {
            return typeof val1 === "number" && numberIsNaN(val1) && numberIsNaN(val2);
          }
          if (_typeof(val2) !== "object" || val1 === null || val2 === null) {
            return false;
          }
          if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
            return false;
          }
        } else {
          if (val1 === null || _typeof(val1) !== "object") {
            if (val2 === null || _typeof(val2) !== "object") {
              return val1 == val2;
            }
            return false;
          }
          if (val2 === null || _typeof(val2) !== "object") {
            return false;
          }
        }
        var val1Tag = objectToString(val1);
        var val2Tag = objectToString(val2);
        if (val1Tag !== val2Tag) {
          return false;
        }
        if (Array.isArray(val1)) {
          if (val1.length !== val2.length) {
            return false;
          }
          var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
          var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
          if (keys1.length !== keys2.length) {
            return false;
          }
          return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
        }
        if (val1Tag === "[object Object]") {
          if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) {
            return false;
          }
        }
        if (isDate(val1)) {
          if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
            return false;
          }
        } else if (isRegExp(val1)) {
          if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
            return false;
          }
        } else if (isNativeError(val1) || val1 instanceof Error) {
          if (val1.message !== val2.message || val1.name !== val2.name) {
            return false;
          }
        } else if (isArrayBufferView(val1)) {
          if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
            if (!areSimilarFloatArrays(val1, val2)) {
              return false;
            }
          } else if (!areSimilarTypedArrays(val1, val2)) {
            return false;
          }
          var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
          var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
          if (_keys.length !== _keys2.length) {
            return false;
          }
          return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
        } else if (isSet(val1)) {
          if (!isSet(val2) || val1.size !== val2.size) {
            return false;
          }
          return keyCheck(val1, val2, strict, memos, kIsSet);
        } else if (isMap(val1)) {
          if (!isMap(val2) || val1.size !== val2.size) {
            return false;
          }
          return keyCheck(val1, val2, strict, memos, kIsMap);
        } else if (isAnyArrayBuffer(val1)) {
          if (!areEqualArrayBuffers(val1, val2)) {
            return false;
          }
        } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
          return false;
        }
        return keyCheck(val1, val2, strict, memos, kNoIterator);
      }
      function getEnumerables(val, keys) {
        return keys.filter(function(k) {
          return propertyIsEnumerable(val, k);
        });
      }
      function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
        if (arguments.length === 5) {
          aKeys = Object.keys(val1);
          var bKeys = Object.keys(val2);
          if (aKeys.length !== bKeys.length) {
            return false;
          }
        }
        var i = 0;
        for (; i < aKeys.length; i++) {
          if (!hasOwnProperty(val2, aKeys[i])) {
            return false;
          }
        }
        if (strict && arguments.length === 5) {
          var symbolKeysA = objectGetOwnPropertySymbols(val1);
          if (symbolKeysA.length !== 0) {
            var count = 0;
            for (i = 0; i < symbolKeysA.length; i++) {
              var key = symbolKeysA[i];
              if (propertyIsEnumerable(val1, key)) {
                if (!propertyIsEnumerable(val2, key)) {
                  return false;
                }
                aKeys.push(key);
                count++;
              } else if (propertyIsEnumerable(val2, key)) {
                return false;
              }
            }
            var symbolKeysB = objectGetOwnPropertySymbols(val2);
            if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
              return false;
            }
          } else {
            var _symbolKeysB = objectGetOwnPropertySymbols(val2);
            if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
              return false;
            }
          }
        }
        if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
          return true;
        }
        if (memos === void 0) {
          memos = {
            val1: /* @__PURE__ */ new Map(),
            val2: /* @__PURE__ */ new Map(),
            position: 0
          };
        } else {
          var val2MemoA = memos.val1.get(val1);
          if (val2MemoA !== void 0) {
            var val2MemoB = memos.val2.get(val2);
            if (val2MemoB !== void 0) {
              return val2MemoA === val2MemoB;
            }
          }
          memos.position++;
        }
        memos.val1.set(val1, memos.position);
        memos.val2.set(val2, memos.position);
        var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
        memos.val1.delete(val1);
        memos.val2.delete(val2);
        return areEq;
      }
      function setHasEqualElement(set, val1, strict, memo) {
        var setValues = arrayFromSet(set);
        for (var i = 0; i < setValues.length; i++) {
          var val2 = setValues[i];
          if (innerDeepEqual(val1, val2, strict, memo)) {
            set.delete(val2);
            return true;
          }
        }
        return false;
      }
      function findLooseMatchingPrimitives(prim) {
        switch (_typeof(prim)) {
          case "undefined":
            return null;
          case "object":
            return void 0;
          case "symbol":
            return false;
          case "string":
            prim = +prim;
          // Loose equal entries exist only if the string is possible to convert to
          // a regular number and not NaN.
          // Fall through
          case "number":
            if (numberIsNaN(prim)) {
              return false;
            }
        }
        return true;
      }
      function setMightHaveLoosePrim(a, b, prim) {
        var altValue = findLooseMatchingPrimitives(prim);
        if (altValue != null) return altValue;
        return b.has(altValue) && !a.has(altValue);
      }
      function mapMightHaveLoosePrim(a, b, prim, item, memo) {
        var altValue = findLooseMatchingPrimitives(prim);
        if (altValue != null) {
          return altValue;
        }
        var curB = b.get(altValue);
        if (curB === void 0 && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
          return false;
        }
        return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
      }
      function setEquiv(a, b, strict, memo) {
        var set = null;
        var aValues = arrayFromSet(a);
        for (var i = 0; i < aValues.length; i++) {
          var val = aValues[i];
          if (_typeof(val) === "object" && val !== null) {
            if (set === null) {
              set = /* @__PURE__ */ new Set();
            }
            set.add(val);
          } else if (!b.has(val)) {
            if (strict) return false;
            if (!setMightHaveLoosePrim(a, b, val)) {
              return false;
            }
            if (set === null) {
              set = /* @__PURE__ */ new Set();
            }
            set.add(val);
          }
        }
        if (set !== null) {
          var bValues = arrayFromSet(b);
          for (var _i = 0; _i < bValues.length; _i++) {
            var _val = bValues[_i];
            if (_typeof(_val) === "object" && _val !== null) {
              if (!setHasEqualElement(set, _val, strict, memo)) return false;
            } else if (!strict && !a.has(_val) && !setHasEqualElement(set, _val, strict, memo)) {
              return false;
            }
          }
          return set.size === 0;
        }
        return true;
      }
      function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
        var setValues = arrayFromSet(set);
        for (var i = 0; i < setValues.length; i++) {
          var key2 = setValues[i];
          if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
            set.delete(key2);
            return true;
          }
        }
        return false;
      }
      function mapEquiv(a, b, strict, memo) {
        var set = null;
        var aEntries = arrayFromMap(a);
        for (var i = 0; i < aEntries.length; i++) {
          var _aEntries$i = _slicedToArray(aEntries[i], 2), key = _aEntries$i[0], item1 = _aEntries$i[1];
          if (_typeof(key) === "object" && key !== null) {
            if (set === null) {
              set = /* @__PURE__ */ new Set();
            }
            set.add(key);
          } else {
            var item2 = b.get(key);
            if (item2 === void 0 && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
              if (strict) return false;
              if (!mapMightHaveLoosePrim(a, b, key, item1, memo)) return false;
              if (set === null) {
                set = /* @__PURE__ */ new Set();
              }
              set.add(key);
            }
          }
        }
        if (set !== null) {
          var bEntries = arrayFromMap(b);
          for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
            var _bEntries$_i = _slicedToArray(bEntries[_i2], 2), _key = _bEntries$_i[0], item = _bEntries$_i[1];
            if (_typeof(_key) === "object" && _key !== null) {
              if (!mapHasEqualEntry(set, a, _key, item, strict, memo)) return false;
            } else if (!strict && (!a.has(_key) || !innerDeepEqual(a.get(_key), item, false, memo)) && !mapHasEqualEntry(set, a, _key, item, false, memo)) {
              return false;
            }
          }
          return set.size === 0;
        }
        return true;
      }
      function objEquiv(a, b, strict, keys, memos, iterationType) {
        var i = 0;
        if (iterationType === kIsSet) {
          if (!setEquiv(a, b, strict, memos)) {
            return false;
          }
        } else if (iterationType === kIsMap) {
          if (!mapEquiv(a, b, strict, memos)) {
            return false;
          }
        } else if (iterationType === kIsArray) {
          for (; i < a.length; i++) {
            if (hasOwnProperty(a, i)) {
              if (!hasOwnProperty(b, i) || !innerDeepEqual(a[i], b[i], strict, memos)) {
                return false;
              }
            } else if (hasOwnProperty(b, i)) {
              return false;
            } else {
              var keysA = Object.keys(a);
              for (; i < keysA.length; i++) {
                var key = keysA[i];
                if (!hasOwnProperty(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) {
                  return false;
                }
              }
              if (keysA.length !== Object.keys(b).length) {
                return false;
              }
              return true;
            }
          }
        }
        for (i = 0; i < keys.length; i++) {
          var _key2 = keys[i];
          if (!innerDeepEqual(a[_key2], b[_key2], strict, memos)) {
            return false;
          }
        }
        return true;
      }
      function isDeepEqual(val1, val2) {
        return innerDeepEqual(val1, val2, kLoose);
      }
      function isDeepStrictEqual(val1, val2) {
        return innerDeepEqual(val1, val2, kStrict);
      }
      module2.exports = {
        isDeepEqual,
        isDeepStrictEqual
      };
    }
  });

  // node_modules/assert/build/assert.js
  var require_assert = __commonJS({
    "node_modules/assert/build/assert.js"(exports2, module2) {
      "use strict";
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", { writable: false });
        return Constructor;
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return _typeof(key) === "symbol" ? key : String(key);
      }
      function _toPrimitive(input, hint) {
        if (_typeof(input) !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (_typeof(res) !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      var _require = require_errors();
      var _require$codes = _require.codes;
      var ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT;
      var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
      var ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE;
      var ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE;
      var ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
      var AssertionError = require_assertion_error();
      var _require2 = require_util();
      var inspect = _require2.inspect;
      var _require$types = require_util().types;
      var isPromise = _require$types.isPromise;
      var isRegExp = _require$types.isRegExp;
      var objectAssign = require_polyfill()();
      var objectIs = require_polyfill2()();
      var RegExpPrototypeTest = require_callBound()("RegExp.prototype.test");
      var isDeepEqual;
      var isDeepStrictEqual;
      function lazyLoadComparison() {
        var comparison = require_comparisons();
        isDeepEqual = comparison.isDeepEqual;
        isDeepStrictEqual = comparison.isDeepStrictEqual;
      }
      var warned = false;
      var assert = module2.exports = ok;
      var NO_EXCEPTION_SENTINEL = {};
      function innerFail(obj) {
        if (obj.message instanceof Error) throw obj.message;
        throw new AssertionError(obj);
      }
      function fail(actual, expected, message, operator, stackStartFn) {
        var argsLen = arguments.length;
        var internalMessage;
        if (argsLen === 0) {
          internalMessage = "Failed";
        } else if (argsLen === 1) {
          message = actual;
          actual = void 0;
        } else {
          if (warned === false) {
            warned = true;
            var warn = process.emitWarning ? process.emitWarning : console.warn.bind(console);
            warn("assert.fail() with more than one argument is deprecated. Please use assert.strictEqual() instead or only pass a message.", "DeprecationWarning", "DEP0094");
          }
          if (argsLen === 2) operator = "!=";
        }
        if (message instanceof Error) throw message;
        var errArgs = {
          actual,
          expected,
          operator: operator === void 0 ? "fail" : operator,
          stackStartFn: stackStartFn || fail
        };
        if (message !== void 0) {
          errArgs.message = message;
        }
        var err = new AssertionError(errArgs);
        if (internalMessage) {
          err.message = internalMessage;
          err.generatedMessage = true;
        }
        throw err;
      }
      assert.fail = fail;
      assert.AssertionError = AssertionError;
      function innerOk(fn, argLen, value, message) {
        if (!value) {
          var generatedMessage = false;
          if (argLen === 0) {
            generatedMessage = true;
            message = "No value argument passed to `assert.ok()`";
          } else if (message instanceof Error) {
            throw message;
          }
          var err = new AssertionError({
            actual: value,
            expected: true,
            message,
            operator: "==",
            stackStartFn: fn
          });
          err.generatedMessage = generatedMessage;
          throw err;
        }
      }
      function ok() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        innerOk.apply(void 0, [ok, args.length].concat(args));
      }
      assert.ok = ok;
      assert.equal = function equal(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (actual != expected) {
          innerFail({
            actual,
            expected,
            message,
            operator: "==",
            stackStartFn: equal
          });
        }
      };
      assert.notEqual = function notEqual(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (actual == expected) {
          innerFail({
            actual,
            expected,
            message,
            operator: "!=",
            stackStartFn: notEqual
          });
        }
      };
      assert.deepEqual = function deepEqual(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (isDeepEqual === void 0) lazyLoadComparison();
        if (!isDeepEqual(actual, expected)) {
          innerFail({
            actual,
            expected,
            message,
            operator: "deepEqual",
            stackStartFn: deepEqual
          });
        }
      };
      assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (isDeepEqual === void 0) lazyLoadComparison();
        if (isDeepEqual(actual, expected)) {
          innerFail({
            actual,
            expected,
            message,
            operator: "notDeepEqual",
            stackStartFn: notDeepEqual
          });
        }
      };
      assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (isDeepEqual === void 0) lazyLoadComparison();
        if (!isDeepStrictEqual(actual, expected)) {
          innerFail({
            actual,
            expected,
            message,
            operator: "deepStrictEqual",
            stackStartFn: deepStrictEqual
          });
        }
      };
      assert.notDeepStrictEqual = notDeepStrictEqual;
      function notDeepStrictEqual(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (isDeepEqual === void 0) lazyLoadComparison();
        if (isDeepStrictEqual(actual, expected)) {
          innerFail({
            actual,
            expected,
            message,
            operator: "notDeepStrictEqual",
            stackStartFn: notDeepStrictEqual
          });
        }
      }
      assert.strictEqual = function strictEqual(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (!objectIs(actual, expected)) {
          innerFail({
            actual,
            expected,
            message,
            operator: "strictEqual",
            stackStartFn: strictEqual
          });
        }
      };
      assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (objectIs(actual, expected)) {
          innerFail({
            actual,
            expected,
            message,
            operator: "notStrictEqual",
            stackStartFn: notStrictEqual
          });
        }
      };
      var Comparison = /* @__PURE__ */ _createClass(function Comparison2(obj, keys, actual) {
        var _this = this;
        _classCallCheck(this, Comparison2);
        keys.forEach(function(key) {
          if (key in obj) {
            if (actual !== void 0 && typeof actual[key] === "string" && isRegExp(obj[key]) && RegExpPrototypeTest(obj[key], actual[key])) {
              _this[key] = actual[key];
            } else {
              _this[key] = obj[key];
            }
          }
        });
      });
      function compareExceptionKey(actual, expected, key, message, keys, fn) {
        if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
          if (!message) {
            var a = new Comparison(actual, keys);
            var b = new Comparison(expected, keys, actual);
            var err = new AssertionError({
              actual: a,
              expected: b,
              operator: "deepStrictEqual",
              stackStartFn: fn
            });
            err.actual = actual;
            err.expected = expected;
            err.operator = fn.name;
            throw err;
          }
          innerFail({
            actual,
            expected,
            message,
            operator: fn.name,
            stackStartFn: fn
          });
        }
      }
      function expectedException(actual, expected, msg, fn) {
        if (typeof expected !== "function") {
          if (isRegExp(expected)) return RegExpPrototypeTest(expected, actual);
          if (arguments.length === 2) {
            throw new ERR_INVALID_ARG_TYPE("expected", ["Function", "RegExp"], expected);
          }
          if (_typeof(actual) !== "object" || actual === null) {
            var err = new AssertionError({
              actual,
              expected,
              message: msg,
              operator: "deepStrictEqual",
              stackStartFn: fn
            });
            err.operator = fn.name;
            throw err;
          }
          var keys = Object.keys(expected);
          if (expected instanceof Error) {
            keys.push("name", "message");
          } else if (keys.length === 0) {
            throw new ERR_INVALID_ARG_VALUE("error", expected, "may not be an empty object");
          }
          if (isDeepEqual === void 0) lazyLoadComparison();
          keys.forEach(function(key) {
            if (typeof actual[key] === "string" && isRegExp(expected[key]) && RegExpPrototypeTest(expected[key], actual[key])) {
              return;
            }
            compareExceptionKey(actual, expected, key, msg, keys, fn);
          });
          return true;
        }
        if (expected.prototype !== void 0 && actual instanceof expected) {
          return true;
        }
        if (Error.isPrototypeOf(expected)) {
          return false;
        }
        return expected.call({}, actual) === true;
      }
      function getActual(fn) {
        if (typeof fn !== "function") {
          throw new ERR_INVALID_ARG_TYPE("fn", "Function", fn);
        }
        try {
          fn();
        } catch (e) {
          return e;
        }
        return NO_EXCEPTION_SENTINEL;
      }
      function checkIsPromise(obj) {
        return isPromise(obj) || obj !== null && _typeof(obj) === "object" && typeof obj.then === "function" && typeof obj.catch === "function";
      }
      function waitForActual(promiseFn) {
        return Promise.resolve().then(function() {
          var resultPromise;
          if (typeof promiseFn === "function") {
            resultPromise = promiseFn();
            if (!checkIsPromise(resultPromise)) {
              throw new ERR_INVALID_RETURN_VALUE("instance of Promise", "promiseFn", resultPromise);
            }
          } else if (checkIsPromise(promiseFn)) {
            resultPromise = promiseFn;
          } else {
            throw new ERR_INVALID_ARG_TYPE("promiseFn", ["Function", "Promise"], promiseFn);
          }
          return Promise.resolve().then(function() {
            return resultPromise;
          }).then(function() {
            return NO_EXCEPTION_SENTINEL;
          }).catch(function(e) {
            return e;
          });
        });
      }
      function expectsError(stackStartFn, actual, error, message) {
        if (typeof error === "string") {
          if (arguments.length === 4) {
            throw new ERR_INVALID_ARG_TYPE("error", ["Object", "Error", "Function", "RegExp"], error);
          }
          if (_typeof(actual) === "object" && actual !== null) {
            if (actual.message === error) {
              throw new ERR_AMBIGUOUS_ARGUMENT("error/message", 'The error message "'.concat(actual.message, '" is identical to the message.'));
            }
          } else if (actual === error) {
            throw new ERR_AMBIGUOUS_ARGUMENT("error/message", 'The error "'.concat(actual, '" is identical to the message.'));
          }
          message = error;
          error = void 0;
        } else if (error != null && _typeof(error) !== "object" && typeof error !== "function") {
          throw new ERR_INVALID_ARG_TYPE("error", ["Object", "Error", "Function", "RegExp"], error);
        }
        if (actual === NO_EXCEPTION_SENTINEL) {
          var details = "";
          if (error && error.name) {
            details += " (".concat(error.name, ")");
          }
          details += message ? ": ".concat(message) : ".";
          var fnType = stackStartFn.name === "rejects" ? "rejection" : "exception";
          innerFail({
            actual: void 0,
            expected: error,
            operator: stackStartFn.name,
            message: "Missing expected ".concat(fnType).concat(details),
            stackStartFn
          });
        }
        if (error && !expectedException(actual, error, message, stackStartFn)) {
          throw actual;
        }
      }
      function expectsNoError(stackStartFn, actual, error, message) {
        if (actual === NO_EXCEPTION_SENTINEL) return;
        if (typeof error === "string") {
          message = error;
          error = void 0;
        }
        if (!error || expectedException(actual, error)) {
          var details = message ? ": ".concat(message) : ".";
          var fnType = stackStartFn.name === "doesNotReject" ? "rejection" : "exception";
          innerFail({
            actual,
            expected: error,
            operator: stackStartFn.name,
            message: "Got unwanted ".concat(fnType).concat(details, "\n") + 'Actual message: "'.concat(actual && actual.message, '"'),
            stackStartFn
          });
        }
        throw actual;
      }
      assert.throws = function throws(promiseFn) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }
        expectsError.apply(void 0, [throws, getActual(promiseFn)].concat(args));
      };
      assert.rejects = function rejects(promiseFn) {
        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }
        return waitForActual(promiseFn).then(function(result) {
          return expectsError.apply(void 0, [rejects, result].concat(args));
        });
      };
      assert.doesNotThrow = function doesNotThrow(fn) {
        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }
        expectsNoError.apply(void 0, [doesNotThrow, getActual(fn)].concat(args));
      };
      assert.doesNotReject = function doesNotReject(fn) {
        for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          args[_key5 - 1] = arguments[_key5];
        }
        return waitForActual(fn).then(function(result) {
          return expectsNoError.apply(void 0, [doesNotReject, result].concat(args));
        });
      };
      assert.ifError = function ifError(err) {
        if (err !== null && err !== void 0) {
          var message = "ifError got unwanted exception: ";
          if (_typeof(err) === "object" && typeof err.message === "string") {
            if (err.message.length === 0 && err.constructor) {
              message += err.constructor.name;
            } else {
              message += err.message;
            }
          } else {
            message += inspect(err);
          }
          var newErr = new AssertionError({
            actual: err,
            expected: null,
            operator: "ifError",
            message,
            stackStartFn: ifError
          });
          var origStack = err.stack;
          if (typeof origStack === "string") {
            var tmp2 = origStack.split("\n");
            tmp2.shift();
            var tmp1 = newErr.stack.split("\n");
            for (var i = 0; i < tmp2.length; i++) {
              var pos = tmp1.indexOf(tmp2[i]);
              if (pos !== -1) {
                tmp1 = tmp1.slice(0, pos);
                break;
              }
            }
            newErr.stack = "".concat(tmp1.join("\n"), "\n").concat(tmp2.join("\n"));
          }
          throw newErr;
        }
      };
      function internalMatch(string, regexp, message, fn, fnName) {
        if (!isRegExp(regexp)) {
          throw new ERR_INVALID_ARG_TYPE("regexp", "RegExp", regexp);
        }
        var match = fnName === "match";
        if (typeof string !== "string" || RegExpPrototypeTest(regexp, string) !== match) {
          if (message instanceof Error) {
            throw message;
          }
          var generatedMessage = !message;
          message = message || (typeof string !== "string" ? 'The "string" argument must be of type string. Received type ' + "".concat(_typeof(string), " (").concat(inspect(string), ")") : (match ? "The input did not match the regular expression " : "The input was expected to not match the regular expression ") + "".concat(inspect(regexp), ". Input:\n\n").concat(inspect(string), "\n"));
          var err = new AssertionError({
            actual: string,
            expected: regexp,
            message,
            operator: fnName,
            stackStartFn: fn
          });
          err.generatedMessage = generatedMessage;
          throw err;
        }
      }
      assert.match = function match(string, regexp, message) {
        internalMatch(string, regexp, message, match, "match");
      };
      assert.doesNotMatch = function doesNotMatch(string, regexp, message) {
        internalMatch(string, regexp, message, doesNotMatch, "doesNotMatch");
      };
      function strict() {
        for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          args[_key6] = arguments[_key6];
        }
        innerOk.apply(void 0, [strict, args.length].concat(args));
      }
      assert.strict = objectAssign(strict, assert, {
        equal: assert.strictEqual,
        deepEqual: assert.deepStrictEqual,
        notEqual: assert.notStrictEqual,
        notDeepEqual: assert.notDeepStrictEqual
      });
      assert.strict.strict = assert.strict;
    }
  });

  // node_modules/bigi/lib/convert.js
  var require_convert = __commonJS({
    "node_modules/bigi/lib/convert.js"() {
      var assert = require_assert();
      var BigInteger2 = require_bigi();
      BigInteger2.fromByteArrayUnsigned = function(byteArray) {
        if (byteArray[0] & 128) {
          return new BigInteger2([0].concat(byteArray));
        }
        return new BigInteger2(byteArray);
      };
      BigInteger2.prototype.toByteArrayUnsigned = function() {
        var byteArray = this.toByteArray();
        return byteArray[0] === 0 ? byteArray.slice(1) : byteArray;
      };
      BigInteger2.fromDERInteger = function(byteArray) {
        return new BigInteger2(byteArray);
      };
      BigInteger2.prototype.toDERInteger = BigInteger2.prototype.toByteArray;
      BigInteger2.fromBuffer = function(buffer) {
        if (buffer[0] & 128) {
          var byteArray = Array.prototype.slice.call(buffer);
          return new BigInteger2([0].concat(byteArray));
        }
        return new BigInteger2(buffer);
      };
      BigInteger2.fromHex = function(hex) {
        if (hex === "") return BigInteger2.ZERO;
        assert.equal(hex, hex.match(/^[A-Fa-f0-9]+/), "Invalid hex string");
        assert.equal(hex.length % 2, 0, "Incomplete hex");
        return new BigInteger2(hex, 16);
      };
      BigInteger2.prototype.toBuffer = function(size) {
        var byteArray = this.toByteArrayUnsigned();
        var zeros = [];
        var padding = size - byteArray.length;
        while (zeros.length < padding) zeros.push(0);
        return new Buffer(zeros.concat(byteArray));
      };
      BigInteger2.prototype.toHex = function(size) {
        return this.toBuffer(size).toString("hex");
      };
    }
  });

  // node_modules/bigi/lib/index.js
  var require_lib = __commonJS({
    "node_modules/bigi/lib/index.js"(exports2, module2) {
      var BigInteger2 = require_bigi();
      require_convert();
      module2.exports = BigInteger2;
    }
  });

  // ../node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "../node_modules/base64-js/index.js"(exports2) {
      "use strict";
      exports2.byteLength = byteLength;
      exports2.toByteArray = toByteArray;
      exports2.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      var i;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1) validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }
  });

  // ../node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "../node_modules/ieee754/index.js"(exports2) {
      exports2.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports2.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }
  });

  // ../node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "../node_modules/buffer/index.js"(exports2) {
      "use strict";
      var base64 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports2.Buffer = Buffer2;
      exports2.SlowBuffer = SlowBuffer;
      exports2.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports2.kMaxLength = K_MAX_LENGTH;
      Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          const arr = new Uint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Object.defineProperty(Buffer2.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer2.isBuffer(this)) return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer2.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer2.isBuffer(this)) return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer2.prototype);
        return buf;
      }
      function Buffer2(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer2.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer2.from(valueOf, encodingOrOffset, length);
        }
        const b = fromObject(value);
        if (b) return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer2.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer2, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer2.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer2.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer2.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length = byteLength(string, encoding) | 0;
        let buf = createBuffer(length);
        const actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        const length = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf = createBuffer(length);
        for (let i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          const copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer2.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer2.isBuffer(obj)) {
          const len = checked(obj.length) | 0;
          const buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer2.alloc(+length);
      }
      Buffer2.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer2.prototype;
      };
      Buffer2.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array)) a = Buffer2.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array)) b = Buffer2.from(b, b.offset, b.byteLength);
        if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a === b) return 0;
        let x = a.length;
        let y = b.length;
        for (let i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      Buffer2.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer2.concat = function concat2(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer2.alloc(0);
        }
        let i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        const buffer = Buffer2.allocUnsafe(length);
        let pos = 0;
        for (i = 0; i < list.length; ++i) {
          let buf = list[i];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              if (!Buffer2.isBuffer(buf)) buf = Buffer2.from(buf);
              buf.copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(
                buffer,
                buf,
                pos
              );
            }
          } else if (!Buffer2.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer2.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
          );
        }
        const len = string.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0) return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer2.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        let loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding) encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer2.prototype._isBuffer = true;
      function swap(b, n2, m) {
        const i = b[n2];
        b[n2] = b[m];
        b[m] = i;
      }
      Buffer2.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer2.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer2.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer2.prototype.toString = function toString() {
        const length = this.length;
        if (length === 0) return "";
        if (arguments.length === 0) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
      Buffer2.prototype.equals = function equals(b) {
        if (!Buffer2.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return Buffer2.compare(this, b) === 0;
      };
      Buffer2.prototype.inspect = function inspect() {
        let str = "";
        const max = exports2.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max) str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
      }
      Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer2.from(target, target.offset, target.byteLength);
        }
        if (!Buffer2.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        let x = thisEnd - thisStart;
        let y = end - start;
        const len = Math.min(x, y);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start, end);
        for (let i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0) return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          else byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0;
          else return -1;
        }
        if (typeof val === "string") {
          val = Buffer2.from(val, encoding);
        }
        if (Buffer2.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        let i;
        if (dir) {
          let foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1) foundIndex = i;
              if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1) i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            let found = true;
            for (let j = 0; j < valLength; j++) {
              if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
              }
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        const remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        const strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        let i;
        for (i = 0; i < length; ++i) {
          const parsed = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer2.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0) encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        const remaining = this.length - offset;
        if (length === void 0 || length > remaining) length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding) encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer2.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        const res = [];
        let i = start;
        while (i < end) {
          const firstByte = buf[i];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        const len = buf.length;
        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;
        let out = "";
        for (let i = start; i < end; ++i) {
          out += hexSliceLookupTable[buf[i]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        const bytes = buf.slice(start, end);
        let res = "";
        for (let i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer2.prototype.slice = function slice(start, end) {
        const len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0) start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0) end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start) end = start;
        const newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer2.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val = this[offset + --byteLength2];
        let mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
        const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let i = byteLength2;
        let mul = 1;
        let val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128)) return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
        return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
      });
      Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = (first << 24) + // Overflow
        this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
      });
      Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul = 1;
        let i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function wrtBigUInt64LE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        return offset;
      }
      function wrtBigUInt64BE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset + 7] = lo;
        lo = lo >> 8;
        buf[offset + 6] = lo;
        lo = lo >> 8;
        buf[offset + 5] = lo;
        lo = lo >> 8;
        buf[offset + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset + 3] = hi;
        hi = hi >> 8;
        buf[offset + 2] = hi;
        hi = hi >> 8;
        buf[offset + 1] = hi;
        hi = hi >> 8;
        buf[offset] = hi;
        return offset + 8;
      }
      Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = 0;
        let mul = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        let sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
        if (value < 0) value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0) value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer2.isBuffer(target)) throw new TypeError("argument should be a Buffer");
        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (targetStart >= target.length) targetStart = target.length;
        if (!targetStart) targetStart = 0;
        if (end > 0 && end < start) end = start;
        if (end === start) return 0;
        if (target.length === 0 || this.length === 0) return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        if (end > this.length) end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        const len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          );
        }
        return len;
      };
      Buffer2.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val) val = 0;
        let i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
          const len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      var errors = {};
      function E(sym, getMessage, Base) {
        errors[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(name) {
          if (name) {
            return `${name} is outside of buffer bounds`;
          }
          return "Attempt to access memory outside buffer bounds";
        },
        RangeError
      );
      E(
        "ERR_INVALID_ARG_TYPE",
        function(name, actual) {
          return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
        },
        TypeError
      );
      E(
        "ERR_OUT_OF_RANGE",
        function(str, range, input) {
          let msg = `The value of "${str}" is out of range.`;
          let received = input;
          if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          }
          msg += ` It must be ${range}. Received ${received}`;
          return msg;
        },
        RangeError
      );
      function addNumericalSeparator(val) {
        let res = "";
        let i = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i >= start + 4; i -= 3) {
          res = `_${val.slice(i - 3, i)}${res}`;
        }
        return `${val.slice(0, i)}${res}`;
      }
      function checkBounds(buf, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
          boundsError(offset, buf.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max, buf, offset, byteLength2) {
        if (value > max || value < min) {
          const n2 = typeof min === "bigint" ? "n" : "";
          let range;
          if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n2} and < 2${n2} ** ${(byteLength2 + 1) * 8}${n2}`;
            } else {
              range = `>= -(2${n2} ** ${(byteLength2 + 1) * 8 - 1}${n2}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n2}`;
            }
          } else {
            range = `>= ${min}${n2} and <= ${max}${n2}`;
          }
          throw new errors.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf, offset, byteLength2);
      }
      function validateNumber(value, name) {
        if (typeof value !== "number") {
          throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
        }
      }
      function boundsError(value, length, type) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type);
          throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
        }
        if (length < 0) {
          throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors.ERR_OUT_OF_RANGE(
          type || "offset",
          `>= ${type ? 1 : 0} and <= ${length}`,
          value
        );
      }
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        let codePoint;
        const length = string.length;
        let leadSurrogate = null;
        const bytes = [];
        for (let i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c, hi, lo;
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        let i;
        for (i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i = 0; i < 16; ++i) {
          const i16 = i * 16;
          for (let j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
          }
        }
        return table;
      }();
      function defineBigIntMethod(fn) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    }
  });

  // node_modules/safe-buffer/index.js
  var require_safe_buffer = __commonJS({
    "node_modules/safe-buffer/index.js"(exports2, module2) {
      var buffer = require_buffer();
      var Buffer2 = buffer.Buffer;
      function copyProps(src, dst) {
        for (var key in src) {
          dst[key] = src[key];
        }
      }
      if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
        module2.exports = buffer;
      } else {
        copyProps(buffer, exports2);
        exports2.Buffer = SafeBuffer;
      }
      function SafeBuffer(arg, encodingOrOffset, length) {
        return Buffer2(arg, encodingOrOffset, length);
      }
      SafeBuffer.prototype = Object.create(Buffer2.prototype);
      copyProps(Buffer2, SafeBuffer);
      SafeBuffer.from = function(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          throw new TypeError("Argument must not be a number");
        }
        return Buffer2(arg, encodingOrOffset, length);
      };
      SafeBuffer.alloc = function(size, fill, encoding) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        var buf = Buffer2(size);
        if (fill !== void 0) {
          if (typeof encoding === "string") {
            buf.fill(fill, encoding);
          } else {
            buf.fill(fill);
          }
        } else {
          buf.fill(0);
        }
        return buf;
      };
      SafeBuffer.allocUnsafe = function(size) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return Buffer2(size);
      };
      SafeBuffer.allocUnsafeSlow = function(size) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return buffer.SlowBuffer(size);
      };
    }
  });

  // node_modules/ecurve/lib/point.js
  var require_point = __commonJS({
    "node_modules/ecurve/lib/point.js"(exports2, module2) {
      var assert = require_assert();
      var Buffer2 = require_safe_buffer().Buffer;
      var BigInteger2 = require_lib();
      var THREE = BigInteger2.valueOf(3);
      function Point(curve2, x, y, z) {
        assert.notStrictEqual(z, void 0, "Missing Z coordinate");
        this.curve = curve2;
        this.x = x;
        this.y = y;
        this.z = z;
        this._zInv = null;
        this.compressed = true;
      }
      Object.defineProperty(Point.prototype, "zInv", {
        get: function() {
          if (this._zInv === null) {
            this._zInv = this.z.modInverse(this.curve.p);
          }
          return this._zInv;
        }
      });
      Object.defineProperty(Point.prototype, "affineX", {
        get: function() {
          return this.x.multiply(this.zInv).mod(this.curve.p);
        }
      });
      Object.defineProperty(Point.prototype, "affineY", {
        get: function() {
          return this.y.multiply(this.zInv).mod(this.curve.p);
        }
      });
      Point.fromAffine = function(curve2, x, y) {
        return new Point(curve2, x, y, BigInteger2.ONE);
      };
      Point.prototype.equals = function(other) {
        if (other === this) return true;
        if (this.curve.isInfinity(this)) return this.curve.isInfinity(other);
        if (this.curve.isInfinity(other)) return this.curve.isInfinity(this);
        var u = other.y.multiply(this.z).subtract(this.y.multiply(other.z)).mod(this.curve.p);
        if (u.signum() !== 0) return false;
        var v = other.x.multiply(this.z).subtract(this.x.multiply(other.z)).mod(this.curve.p);
        return v.signum() === 0;
      };
      Point.prototype.negate = function() {
        var y = this.curve.p.subtract(this.y);
        return new Point(this.curve, this.x, y, this.z);
      };
      Point.prototype.add = function(b) {
        if (this.curve.isInfinity(this)) return b;
        if (this.curve.isInfinity(b)) return this;
        var x1 = this.x;
        var y1 = this.y;
        var x2 = b.x;
        var y2 = b.y;
        var u = y2.multiply(this.z).subtract(y1.multiply(b.z)).mod(this.curve.p);
        var v = x2.multiply(this.z).subtract(x1.multiply(b.z)).mod(this.curve.p);
        if (v.signum() === 0) {
          if (u.signum() === 0) {
            return this.twice();
          }
          return this.curve.infinity;
        }
        var v2 = v.square();
        var v3 = v2.multiply(v);
        var x1v2 = x1.multiply(v2);
        var zu2 = u.square().multiply(this.z);
        var x3 = zu2.subtract(x1v2.shiftLeft(1)).multiply(b.z).subtract(v3).multiply(v).mod(this.curve.p);
        var y3 = x1v2.multiply(THREE).multiply(u).subtract(y1.multiply(v3)).subtract(zu2.multiply(u)).multiply(b.z).add(u.multiply(v3)).mod(this.curve.p);
        var z3 = v3.multiply(this.z).multiply(b.z).mod(this.curve.p);
        return new Point(this.curve, x3, y3, z3);
      };
      Point.prototype.twice = function() {
        if (this.curve.isInfinity(this)) return this;
        if (this.y.signum() === 0) return this.curve.infinity;
        var x1 = this.x;
        var y1 = this.y;
        var y1z1 = y1.multiply(this.z).mod(this.curve.p);
        var y1sqz1 = y1z1.multiply(y1).mod(this.curve.p);
        var a = this.curve.a;
        var w = x1.square().multiply(THREE);
        if (a.signum() !== 0) {
          w = w.add(this.z.square().multiply(a));
        }
        w = w.mod(this.curve.p);
        var x3 = w.square().subtract(x1.shiftLeft(3).multiply(y1sqz1)).shiftLeft(1).multiply(y1z1).mod(this.curve.p);
        var y3 = w.multiply(THREE).multiply(x1).subtract(y1sqz1.shiftLeft(1)).shiftLeft(2).multiply(y1sqz1).subtract(w.pow(3)).mod(this.curve.p);
        var z3 = y1z1.pow(3).shiftLeft(3).mod(this.curve.p);
        return new Point(this.curve, x3, y3, z3);
      };
      Point.prototype.multiply = function(k) {
        if (this.curve.isInfinity(this)) return this;
        if (k.signum() === 0) return this.curve.infinity;
        var e = k;
        var h = e.multiply(THREE);
        var neg = this.negate();
        var R = this;
        for (var i = h.bitLength() - 2; i > 0; --i) {
          var hBit = h.testBit(i);
          var eBit = e.testBit(i);
          R = R.twice();
          if (hBit !== eBit) {
            R = R.add(hBit ? this : neg);
          }
        }
        return R;
      };
      Point.prototype.multiplyTwo = function(j, x, k) {
        var i = Math.max(j.bitLength(), k.bitLength()) - 1;
        var R = this.curve.infinity;
        var both = this.add(x);
        while (i >= 0) {
          var jBit = j.testBit(i);
          var kBit = k.testBit(i);
          R = R.twice();
          if (jBit) {
            if (kBit) {
              R = R.add(both);
            } else {
              R = R.add(this);
            }
          } else if (kBit) {
            R = R.add(x);
          }
          --i;
        }
        return R;
      };
      Point.prototype.getEncoded = function(compressed) {
        if (compressed == null) compressed = this.compressed;
        if (this.curve.isInfinity(this)) return Buffer2.alloc(1, 0);
        var x = this.affineX;
        var y = this.affineY;
        var byteLength = this.curve.pLength;
        var buffer;
        if (compressed) {
          buffer = Buffer2.allocUnsafe(1 + byteLength);
          buffer.writeUInt8(y.isEven() ? 2 : 3, 0);
        } else {
          buffer = Buffer2.allocUnsafe(1 + byteLength + byteLength);
          buffer.writeUInt8(4, 0);
          y.toBuffer(byteLength).copy(buffer, 1 + byteLength);
        }
        x.toBuffer(byteLength).copy(buffer, 1);
        return buffer;
      };
      Point.decodeFrom = function(curve2, buffer) {
        var type = buffer.readUInt8(0);
        var compressed = type !== 4;
        var byteLength = Math.floor((curve2.p.bitLength() + 7) / 8);
        var x = BigInteger2.fromBuffer(buffer.slice(1, 1 + byteLength));
        var Q;
        if (compressed) {
          assert.equal(buffer.length, byteLength + 1, "Invalid sequence length");
          assert(type === 2 || type === 3, "Invalid sequence tag");
          var isOdd = type === 3;
          Q = curve2.pointFromX(isOdd, x);
        } else {
          assert.equal(buffer.length, 1 + byteLength + byteLength, "Invalid sequence length");
          var y = BigInteger2.fromBuffer(buffer.slice(1 + byteLength));
          Q = Point.fromAffine(curve2, x, y);
        }
        Q.compressed = compressed;
        return Q;
      };
      Point.prototype.toString = function() {
        if (this.curve.isInfinity(this)) return "(INFINITY)";
        return "(" + this.affineX.toString() + "," + this.affineY.toString() + ")";
      };
      module2.exports = Point;
    }
  });

  // node_modules/ecurve/lib/curve.js
  var require_curve = __commonJS({
    "node_modules/ecurve/lib/curve.js"(exports2, module2) {
      var assert = require_assert();
      var BigInteger2 = require_lib();
      var Point = require_point();
      function Curve(p, a, b, Gx, Gy, n2, h) {
        this.p = p;
        this.a = a;
        this.b = b;
        this.G = Point.fromAffine(this, Gx, Gy);
        this.n = n2;
        this.h = h;
        this.infinity = new Point(this, null, null, BigInteger2.ZERO);
        this.pOverFour = p.add(BigInteger2.ONE).shiftRight(2);
        this.pLength = Math.floor((this.p.bitLength() + 7) / 8);
      }
      Curve.prototype.pointFromX = function(isOdd, x) {
        var alpha = x.pow(3).add(this.a.multiply(x)).add(this.b).mod(this.p);
        var beta = alpha.modPow(this.pOverFour, this.p);
        var y = beta;
        if (beta.isEven() ^ !isOdd) {
          y = this.p.subtract(y);
        }
        return Point.fromAffine(this, x, y);
      };
      Curve.prototype.isInfinity = function(Q) {
        if (Q === this.infinity) return true;
        return Q.z.signum() === 0 && Q.y.signum() !== 0;
      };
      Curve.prototype.isOnCurve = function(Q) {
        if (this.isInfinity(Q)) return true;
        var x = Q.affineX;
        var y = Q.affineY;
        var a = this.a;
        var b = this.b;
        var p = this.p;
        if (x.signum() < 0 || x.compareTo(p) >= 0) return false;
        if (y.signum() < 0 || y.compareTo(p) >= 0) return false;
        var lhs = y.square().mod(p);
        var rhs = x.pow(3).add(a.multiply(x)).add(b).mod(p);
        return lhs.equals(rhs);
      };
      Curve.prototype.validate = function(Q) {
        assert(!this.isInfinity(Q), "Point is at infinity");
        assert(this.isOnCurve(Q), "Point is not on the curve");
        var nQ = Q.multiply(this.n);
        assert(this.isInfinity(nQ), "Point is not a scalar multiple of G");
        return true;
      };
      module2.exports = Curve;
    }
  });

  // node_modules/ecurve/lib/curves.json
  var require_curves = __commonJS({
    "node_modules/ecurve/lib/curves.json"(exports2, module2) {
      module2.exports = {
        secp128r1: {
          p: "fffffffdffffffffffffffffffffffff",
          a: "fffffffdfffffffffffffffffffffffc",
          b: "e87579c11079f43dd824993c2cee5ed3",
          n: "fffffffe0000000075a30d1b9038a115",
          h: "01",
          Gx: "161ff7528b899b2d0c28607ca52c5b86",
          Gy: "cf5ac8395bafeb13c02da292dded7a83"
        },
        secp160k1: {
          p: "fffffffffffffffffffffffffffffffeffffac73",
          a: "00",
          b: "07",
          n: "0100000000000000000001b8fa16dfab9aca16b6b3",
          h: "01",
          Gx: "3b4c382ce37aa192a4019e763036f4f5dd4d7ebb",
          Gy: "938cf935318fdced6bc28286531733c3f03c4fee"
        },
        secp160r1: {
          p: "ffffffffffffffffffffffffffffffff7fffffff",
          a: "ffffffffffffffffffffffffffffffff7ffffffc",
          b: "1c97befc54bd7a8b65acf89f81d4d4adc565fa45",
          n: "0100000000000000000001f4c8f927aed3ca752257",
          h: "01",
          Gx: "4a96b5688ef573284664698968c38bb913cbfc82",
          Gy: "23a628553168947d59dcc912042351377ac5fb32"
        },
        secp192k1: {
          p: "fffffffffffffffffffffffffffffffffffffffeffffee37",
          a: "00",
          b: "03",
          n: "fffffffffffffffffffffffe26f2fc170f69466a74defd8d",
          h: "01",
          Gx: "db4ff10ec057e9ae26b07d0280b7f4341da5d1b1eae06c7d",
          Gy: "9b2f2f6d9c5628a7844163d015be86344082aa88d95e2f9d"
        },
        secp192r1: {
          p: "fffffffffffffffffffffffffffffffeffffffffffffffff",
          a: "fffffffffffffffffffffffffffffffefffffffffffffffc",
          b: "64210519e59c80e70fa7e9ab72243049feb8deecc146b9b1",
          n: "ffffffffffffffffffffffff99def836146bc9b1b4d22831",
          h: "01",
          Gx: "188da80eb03090f67cbf20eb43a18800f4ff0afd82ff1012",
          Gy: "07192b95ffc8da78631011ed6b24cdd573f977a11e794811"
        },
        secp256k1: {
          p: "fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f",
          a: "00",
          b: "07",
          n: "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141",
          h: "01",
          Gx: "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
          Gy: "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8"
        },
        secp256r1: {
          p: "ffffffff00000001000000000000000000000000ffffffffffffffffffffffff",
          a: "ffffffff00000001000000000000000000000000fffffffffffffffffffffffc",
          b: "5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b",
          n: "ffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551",
          h: "01",
          Gx: "6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296",
          Gy: "4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"
        }
      };
    }
  });

  // node_modules/ecurve/lib/names.js
  var require_names = __commonJS({
    "node_modules/ecurve/lib/names.js"(exports2, module2) {
      var BigInteger2 = require_lib();
      var curves = require_curves();
      var Curve = require_curve();
      function getCurveByName(name) {
        var curve2 = curves[name];
        if (!curve2) return null;
        var p = new BigInteger2(curve2.p, 16);
        var a = new BigInteger2(curve2.a, 16);
        var b = new BigInteger2(curve2.b, 16);
        var n2 = new BigInteger2(curve2.n, 16);
        var h = new BigInteger2(curve2.h, 16);
        var Gx = new BigInteger2(curve2.Gx, 16);
        var Gy = new BigInteger2(curve2.Gy, 16);
        return new Curve(p, a, b, Gx, Gy, n2, h);
      }
      module2.exports = getCurveByName;
    }
  });

  // node_modules/ecurve/lib/index.js
  var require_lib2 = __commonJS({
    "node_modules/ecurve/lib/index.js"(exports2, module2) {
      var Point = require_point();
      var Curve = require_curve();
      var getCurveByName = require_names();
      module2.exports = {
        Curve,
        Point,
        getCurveByName
      };
    }
  });

  // node_modules/randombytes/browser.js
  var require_browser = __commonJS({
    "node_modules/randombytes/browser.js"(exports2, module2) {
      "use strict";
      var MAX_BYTES = 65536;
      var MAX_UINT32 = 4294967295;
      function oldBrowser() {
        throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11");
      }
      var Buffer2 = require_safe_buffer().Buffer;
      var crypto3 = global.crypto || global.msCrypto;
      if (crypto3 && crypto3.getRandomValues) {
        module2.exports = randomBytes;
      } else {
        module2.exports = oldBrowser;
      }
      function randomBytes(size, cb) {
        if (size > MAX_UINT32) throw new RangeError("requested too many random bytes");
        var bytes = Buffer2.allocUnsafe(size);
        if (size > 0) {
          if (size > MAX_BYTES) {
            for (var generated = 0; generated < size; generated += MAX_BYTES) {
              crypto3.getRandomValues(bytes.slice(generated, generated + MAX_BYTES));
            }
          } else {
            crypto3.getRandomValues(bytes);
          }
        }
        if (typeof cb === "function") {
          return process.nextTick(function() {
            cb(null, bytes);
          });
        }
        return bytes;
      }
    }
  });

  // node_modules/bip-schnorr/src/check.js
  var require_check = __commonJS({
    "node_modules/bip-schnorr/src/check.js"(exports2, module2) {
      var BigInteger2 = require_lib();
      var Buffer2 = require_safe_buffer().Buffer;
      var ecurve2 = require_lib2();
      var curve2 = ecurve2.getCurveByName("secp256k1");
      var one = BigInteger2.ONE;
      var n2 = curve2.n;
      var p = curve2.p;
      function checkBuffer(name, buf, len, idx) {
        const idxStr = idx !== void 0 ? "[" + idx + "]" : "";
        if (!Buffer2.isBuffer(buf)) {
          throw new Error(name + idxStr + " must be a Buffer");
        }
        if (buf.length !== len) {
          throw new Error(name + idxStr + " must be " + len + " bytes long");
        }
      }
      function checkArray(name, arr) {
        if (!arr || !arr.length) {
          throw new Error(name + " must be an array with one or more elements");
        }
      }
      function checkPubKeyArr(pubKeys) {
        checkArray("pubKeys", pubKeys);
        for (let i = 0; i < pubKeys.length; i++) {
          checkBuffer("pubKey", pubKeys[i], 32, i);
        }
      }
      function checkMessageArr(messages) {
        checkArray("messages", messages);
        for (let i = 0; i < messages.length; i++) {
          checkBuffer("message", messages[i], 32, i);
        }
      }
      function checkSignatureArr(signatures) {
        checkArray("signatures", signatures);
        for (let i = 0; i < signatures.length; i++) {
          checkBuffer("signature", signatures[i], 64, i);
        }
      }
      function checkNonceArr(nonces) {
        checkArray("nonces", nonces);
        for (let i = 0; i < nonces.length; i++) {
          checkBuffer("nonce", nonces[i], 32, i);
        }
      }
      function checkPrivateKey(privateKey, idx) {
        const idxStr = idx !== void 0 ? "[" + idx + "]" : "";
        if (!BigInteger2.isBigInteger(privateKey) && !(typeof privateKey == "string")) {
          throw new Error("privateKey" + idxStr + " must be a BigInteger or valid hex string");
        }
        if (typeof privateKey == "string") {
          if (privateKey.match(/[^a-f^A-F^0-9]+/)) {
            throw new Error("privateKey must be a BigInteger or valid hex string");
          }
          checkRange("privateKey", BigInteger2.fromHex(privateKey));
          return;
        }
        checkRange("privateKey", privateKey);
      }
      function checkSignParams(privateKey, message) {
        checkPrivateKey(privateKey);
        checkBuffer("message", message, 32);
      }
      function checkVerifyParams(pubKey, message, signature) {
        checkBuffer("pubKey", pubKey, 32);
        checkBuffer("message", message, 32);
        checkBuffer("signature", signature, 64);
      }
      function checkBatchVerifyParams(pubKeys, messages, signatures) {
        checkPubKeyArr(pubKeys);
        checkMessageArr(messages);
        checkSignatureArr(signatures);
        if (pubKeys.length !== messages.length || messages.length !== signatures.length) {
          throw new Error("all parameters must be an array with the same length");
        }
      }
      function checkSessionParams(sessionId, privateKey, message, pubKeyCombined, ell) {
        checkSignParams(privateKey, message);
        checkBuffer("sessionId", sessionId, 32);
        checkBuffer("pubKeyCombined", pubKeyCombined, 32);
        checkBuffer("ell", ell, 32);
      }
      function checkRange(name, scalar) {
        if (scalar.compareTo(one) < 0 || scalar.compareTo(n2.subtract(one)) > 0) {
          throw new Error(name + " must be an integer in the range 1..n-1");
        }
      }
      function checkSignatureInput(r, s) {
        if (r.compareTo(p) >= 0) {
          throw new Error("r is larger than or equal to field size");
        }
        if (s.compareTo(n2) >= 0) {
          throw new Error("s is larger than or equal to curve order");
        }
      }
      function checkPointExists(pubKeyEven, P) {
        if (P.curve.isInfinity(P)) {
          throw new Error("point is at infinity");
        }
        const pEven = P.affineY.isEven();
        if (pubKeyEven !== pEven) {
          throw new Error("point does not exist");
        }
      }
      function checkAux(aux) {
        if (aux.length !== 32) {
          throw new Error("aux must be 32 bytes");
        }
      }
      module2.exports = {
        checkSessionParams,
        checkSignParams,
        checkVerifyParams,
        checkBatchVerifyParams,
        checkRange,
        checkSignatureInput,
        checkPointExists,
        checkPubKeyArr,
        checkArray,
        checkNonceArr,
        checkAux
      };
    }
  });

  // node_modules/js-sha256/src/sha256.js
  var require_sha2562 = __commonJS({
    "node_modules/js-sha256/src/sha256.js"(exports, module) {
      (function() {
        "use strict";
        var ERROR = "input is invalid type";
        var WINDOW = typeof window === "object";
        var root = WINDOW ? window : {};
        if (root.JS_SHA256_NO_WINDOW) {
          WINDOW = false;
        }
        var WEB_WORKER = !WINDOW && typeof self === "object";
        var NODE_JS = !root.JS_SHA256_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
        if (NODE_JS) {
          root = global;
        } else if (WEB_WORKER) {
          root = self;
        }
        var COMMON_JS = !root.JS_SHA256_NO_COMMON_JS && typeof module === "object" && module.exports;
        var AMD = typeof define === "function" && define.amd;
        var ARRAY_BUFFER = !root.JS_SHA256_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined";
        var HEX_CHARS = "0123456789abcdef".split("");
        var EXTRA = [-2147483648, 8388608, 32768, 128];
        var SHIFT = [24, 16, 8, 0];
        var K = [
          1116352408,
          1899447441,
          3049323471,
          3921009573,
          961987163,
          1508970993,
          2453635748,
          2870763221,
          3624381080,
          310598401,
          607225278,
          1426881987,
          1925078388,
          2162078206,
          2614888103,
          3248222580,
          3835390401,
          4022224774,
          264347078,
          604807628,
          770255983,
          1249150122,
          1555081692,
          1996064986,
          2554220882,
          2821834349,
          2952996808,
          3210313671,
          3336571891,
          3584528711,
          113926993,
          338241895,
          666307205,
          773529912,
          1294757372,
          1396182291,
          1695183700,
          1986661051,
          2177026350,
          2456956037,
          2730485921,
          2820302411,
          3259730800,
          3345764771,
          3516065817,
          3600352804,
          4094571909,
          275423344,
          430227734,
          506948616,
          659060556,
          883997877,
          958139571,
          1322822218,
          1537002063,
          1747873779,
          1955562222,
          2024104815,
          2227730452,
          2361852424,
          2428436474,
          2756734187,
          3204031479,
          3329325298
        ];
        var OUTPUT_TYPES = ["hex", "array", "digest", "arrayBuffer"];
        var blocks = [];
        if (root.JS_SHA256_NO_NODE_JS || !Array.isArray) {
          Array.isArray = function(obj) {
            return Object.prototype.toString.call(obj) === "[object Array]";
          };
        }
        if (ARRAY_BUFFER && (root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
          ArrayBuffer.isView = function(obj) {
            return typeof obj === "object" && obj.buffer && obj.buffer.constructor === ArrayBuffer;
          };
        }
        var createOutputMethod = function(outputType, is2242) {
          return function(message) {
            return new Sha256(is2242, true).update(message)[outputType]();
          };
        };
        var createMethod = function(is2242) {
          var method2 = createOutputMethod("hex", is2242);
          if (NODE_JS) {
            method2 = nodeWrap(method2, is2242);
          }
          method2.create = function() {
            return new Sha256(is2242);
          };
          method2.update = function(message) {
            return method2.create().update(message);
          };
          for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
            var type = OUTPUT_TYPES[i];
            method2[type] = createOutputMethod(type, is2242);
          }
          return method2;
        };
        var nodeWrap = function(method, is224) {
          var crypto = eval("require('crypto')");
          var Buffer = eval("require('buffer').Buffer");
          var algorithm = is224 ? "sha224" : "sha256";
          var nodeMethod = function(message) {
            if (typeof message === "string") {
              return crypto.createHash(algorithm).update(message, "utf8").digest("hex");
            } else {
              if (message === null || message === void 0) {
                throw new Error(ERROR);
              } else if (message.constructor === ArrayBuffer) {
                message = new Uint8Array(message);
              }
            }
            if (Array.isArray(message) || ArrayBuffer.isView(message) || message.constructor === Buffer) {
              return crypto.createHash(algorithm).update(new Buffer(message)).digest("hex");
            } else {
              return method(message);
            }
          };
          return nodeMethod;
        };
        var createHmacOutputMethod = function(outputType, is2242) {
          return function(key, message) {
            return new HmacSha256(key, is2242, true).update(message)[outputType]();
          };
        };
        var createHmacMethod = function(is2242) {
          var method2 = createHmacOutputMethod("hex", is2242);
          method2.create = function(key) {
            return new HmacSha256(key, is2242);
          };
          method2.update = function(key, message) {
            return method2.create(key).update(message);
          };
          for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
            var type = OUTPUT_TYPES[i];
            method2[type] = createHmacOutputMethod(type, is2242);
          }
          return method2;
        };
        function Sha256(is2242, sharedMemory) {
          if (sharedMemory) {
            blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
            this.blocks = blocks;
          } else {
            this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          }
          if (is2242) {
            this.h0 = 3238371032;
            this.h1 = 914150663;
            this.h2 = 812702999;
            this.h3 = 4144912697;
            this.h4 = 4290775857;
            this.h5 = 1750603025;
            this.h6 = 1694076839;
            this.h7 = 3204075428;
          } else {
            this.h0 = 1779033703;
            this.h1 = 3144134277;
            this.h2 = 1013904242;
            this.h3 = 2773480762;
            this.h4 = 1359893119;
            this.h5 = 2600822924;
            this.h6 = 528734635;
            this.h7 = 1541459225;
          }
          this.block = this.start = this.bytes = this.hBytes = 0;
          this.finalized = this.hashed = false;
          this.first = true;
          this.is224 = is2242;
        }
        Sha256.prototype.update = function(message) {
          if (this.finalized) {
            return;
          }
          var notString, type = typeof message;
          if (type !== "string") {
            if (type === "object") {
              if (message === null) {
                throw new Error(ERROR);
              } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
                message = new Uint8Array(message);
              } else if (!Array.isArray(message)) {
                if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
                  throw new Error(ERROR);
                }
              }
            } else {
              throw new Error(ERROR);
            }
            notString = true;
          }
          var code, index = 0, i, length = message.length, blocks2 = this.blocks;
          while (index < length) {
            if (this.hashed) {
              this.hashed = false;
              blocks2[0] = this.block;
              blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
            }
            if (notString) {
              for (i = this.start; index < length && i < 64; ++index) {
                blocks2[i >> 2] |= message[index] << SHIFT[i++ & 3];
              }
            } else {
              for (i = this.start; index < length && i < 64; ++index) {
                code = message.charCodeAt(index);
                if (code < 128) {
                  blocks2[i >> 2] |= code << SHIFT[i++ & 3];
                } else if (code < 2048) {
                  blocks2[i >> 2] |= (192 | code >> 6) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
                } else if (code < 55296 || code >= 57344) {
                  blocks2[i >> 2] |= (224 | code >> 12) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
                } else {
                  code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023);
                  blocks2[i >> 2] |= (240 | code >> 18) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code >> 12 & 63) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
                }
              }
            }
            this.lastByteIndex = i;
            this.bytes += i - this.start;
            if (i >= 64) {
              this.block = blocks2[16];
              this.start = i - 64;
              this.hash();
              this.hashed = true;
            } else {
              this.start = i;
            }
          }
          if (this.bytes > 4294967295) {
            this.hBytes += this.bytes / 4294967296 << 0;
            this.bytes = this.bytes % 4294967296;
          }
          return this;
        };
        Sha256.prototype.finalize = function() {
          if (this.finalized) {
            return;
          }
          this.finalized = true;
          var blocks2 = this.blocks, i = this.lastByteIndex;
          blocks2[16] = this.block;
          blocks2[i >> 2] |= EXTRA[i & 3];
          this.block = blocks2[16];
          if (i >= 56) {
            if (!this.hashed) {
              this.hash();
            }
            blocks2[0] = this.block;
            blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
          }
          blocks2[14] = this.hBytes << 3 | this.bytes >>> 29;
          blocks2[15] = this.bytes << 3;
          this.hash();
        };
        Sha256.prototype.hash = function() {
          var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4, f = this.h5, g = this.h6, h = this.h7, blocks2 = this.blocks, j, s0, s1, maj, t1, t2, ch, ab, da, cd, bc;
          for (j = 16; j < 64; ++j) {
            t1 = blocks2[j - 15];
            s0 = (t1 >>> 7 | t1 << 25) ^ (t1 >>> 18 | t1 << 14) ^ t1 >>> 3;
            t1 = blocks2[j - 2];
            s1 = (t1 >>> 17 | t1 << 15) ^ (t1 >>> 19 | t1 << 13) ^ t1 >>> 10;
            blocks2[j] = blocks2[j - 16] + s0 + blocks2[j - 7] + s1 << 0;
          }
          bc = b & c;
          for (j = 0; j < 64; j += 4) {
            if (this.first) {
              if (this.is224) {
                ab = 300032;
                t1 = blocks2[0] - 1413257819;
                h = t1 - 150054599 << 0;
                d = t1 + 24177077 << 0;
              } else {
                ab = 704751109;
                t1 = blocks2[0] - 210244248;
                h = t1 - 1521486534 << 0;
                d = t1 + 143694565 << 0;
              }
              this.first = false;
            } else {
              s0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
              s1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
              ab = a & b;
              maj = ab ^ a & c ^ bc;
              ch = e & f ^ ~e & g;
              t1 = h + s1 + ch + K[j] + blocks2[j];
              t2 = s0 + maj;
              h = d + t1 << 0;
              d = t1 + t2 << 0;
            }
            s0 = (d >>> 2 | d << 30) ^ (d >>> 13 | d << 19) ^ (d >>> 22 | d << 10);
            s1 = (h >>> 6 | h << 26) ^ (h >>> 11 | h << 21) ^ (h >>> 25 | h << 7);
            da = d & a;
            maj = da ^ d & b ^ ab;
            ch = h & e ^ ~h & f;
            t1 = g + s1 + ch + K[j + 1] + blocks2[j + 1];
            t2 = s0 + maj;
            g = c + t1 << 0;
            c = t1 + t2 << 0;
            s0 = (c >>> 2 | c << 30) ^ (c >>> 13 | c << 19) ^ (c >>> 22 | c << 10);
            s1 = (g >>> 6 | g << 26) ^ (g >>> 11 | g << 21) ^ (g >>> 25 | g << 7);
            cd = c & d;
            maj = cd ^ c & a ^ da;
            ch = g & h ^ ~g & e;
            t1 = f + s1 + ch + K[j + 2] + blocks2[j + 2];
            t2 = s0 + maj;
            f = b + t1 << 0;
            b = t1 + t2 << 0;
            s0 = (b >>> 2 | b << 30) ^ (b >>> 13 | b << 19) ^ (b >>> 22 | b << 10);
            s1 = (f >>> 6 | f << 26) ^ (f >>> 11 | f << 21) ^ (f >>> 25 | f << 7);
            bc = b & c;
            maj = bc ^ b & d ^ cd;
            ch = f & g ^ ~f & h;
            t1 = e + s1 + ch + K[j + 3] + blocks2[j + 3];
            t2 = s0 + maj;
            e = a + t1 << 0;
            a = t1 + t2 << 0;
          }
          this.h0 = this.h0 + a << 0;
          this.h1 = this.h1 + b << 0;
          this.h2 = this.h2 + c << 0;
          this.h3 = this.h3 + d << 0;
          this.h4 = this.h4 + e << 0;
          this.h5 = this.h5 + f << 0;
          this.h6 = this.h6 + g << 0;
          this.h7 = this.h7 + h << 0;
        };
        Sha256.prototype.hex = function() {
          this.finalize();
          var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5, h6 = this.h6, h7 = this.h7;
          var hex = HEX_CHARS[h0 >> 28 & 15] + HEX_CHARS[h0 >> 24 & 15] + HEX_CHARS[h0 >> 20 & 15] + HEX_CHARS[h0 >> 16 & 15] + HEX_CHARS[h0 >> 12 & 15] + HEX_CHARS[h0 >> 8 & 15] + HEX_CHARS[h0 >> 4 & 15] + HEX_CHARS[h0 & 15] + HEX_CHARS[h1 >> 28 & 15] + HEX_CHARS[h1 >> 24 & 15] + HEX_CHARS[h1 >> 20 & 15] + HEX_CHARS[h1 >> 16 & 15] + HEX_CHARS[h1 >> 12 & 15] + HEX_CHARS[h1 >> 8 & 15] + HEX_CHARS[h1 >> 4 & 15] + HEX_CHARS[h1 & 15] + HEX_CHARS[h2 >> 28 & 15] + HEX_CHARS[h2 >> 24 & 15] + HEX_CHARS[h2 >> 20 & 15] + HEX_CHARS[h2 >> 16 & 15] + HEX_CHARS[h2 >> 12 & 15] + HEX_CHARS[h2 >> 8 & 15] + HEX_CHARS[h2 >> 4 & 15] + HEX_CHARS[h2 & 15] + HEX_CHARS[h3 >> 28 & 15] + HEX_CHARS[h3 >> 24 & 15] + HEX_CHARS[h3 >> 20 & 15] + HEX_CHARS[h3 >> 16 & 15] + HEX_CHARS[h3 >> 12 & 15] + HEX_CHARS[h3 >> 8 & 15] + HEX_CHARS[h3 >> 4 & 15] + HEX_CHARS[h3 & 15] + HEX_CHARS[h4 >> 28 & 15] + HEX_CHARS[h4 >> 24 & 15] + HEX_CHARS[h4 >> 20 & 15] + HEX_CHARS[h4 >> 16 & 15] + HEX_CHARS[h4 >> 12 & 15] + HEX_CHARS[h4 >> 8 & 15] + HEX_CHARS[h4 >> 4 & 15] + HEX_CHARS[h4 & 15] + HEX_CHARS[h5 >> 28 & 15] + HEX_CHARS[h5 >> 24 & 15] + HEX_CHARS[h5 >> 20 & 15] + HEX_CHARS[h5 >> 16 & 15] + HEX_CHARS[h5 >> 12 & 15] + HEX_CHARS[h5 >> 8 & 15] + HEX_CHARS[h5 >> 4 & 15] + HEX_CHARS[h5 & 15] + HEX_CHARS[h6 >> 28 & 15] + HEX_CHARS[h6 >> 24 & 15] + HEX_CHARS[h6 >> 20 & 15] + HEX_CHARS[h6 >> 16 & 15] + HEX_CHARS[h6 >> 12 & 15] + HEX_CHARS[h6 >> 8 & 15] + HEX_CHARS[h6 >> 4 & 15] + HEX_CHARS[h6 & 15];
          if (!this.is224) {
            hex += HEX_CHARS[h7 >> 28 & 15] + HEX_CHARS[h7 >> 24 & 15] + HEX_CHARS[h7 >> 20 & 15] + HEX_CHARS[h7 >> 16 & 15] + HEX_CHARS[h7 >> 12 & 15] + HEX_CHARS[h7 >> 8 & 15] + HEX_CHARS[h7 >> 4 & 15] + HEX_CHARS[h7 & 15];
          }
          return hex;
        };
        Sha256.prototype.toString = Sha256.prototype.hex;
        Sha256.prototype.digest = function() {
          this.finalize();
          var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5, h6 = this.h6, h7 = this.h7;
          var arr = [
            h0 >> 24 & 255,
            h0 >> 16 & 255,
            h0 >> 8 & 255,
            h0 & 255,
            h1 >> 24 & 255,
            h1 >> 16 & 255,
            h1 >> 8 & 255,
            h1 & 255,
            h2 >> 24 & 255,
            h2 >> 16 & 255,
            h2 >> 8 & 255,
            h2 & 255,
            h3 >> 24 & 255,
            h3 >> 16 & 255,
            h3 >> 8 & 255,
            h3 & 255,
            h4 >> 24 & 255,
            h4 >> 16 & 255,
            h4 >> 8 & 255,
            h4 & 255,
            h5 >> 24 & 255,
            h5 >> 16 & 255,
            h5 >> 8 & 255,
            h5 & 255,
            h6 >> 24 & 255,
            h6 >> 16 & 255,
            h6 >> 8 & 255,
            h6 & 255
          ];
          if (!this.is224) {
            arr.push(h7 >> 24 & 255, h7 >> 16 & 255, h7 >> 8 & 255, h7 & 255);
          }
          return arr;
        };
        Sha256.prototype.array = Sha256.prototype.digest;
        Sha256.prototype.arrayBuffer = function() {
          this.finalize();
          var buffer = new ArrayBuffer(this.is224 ? 28 : 32);
          var dataView = new DataView(buffer);
          dataView.setUint32(0, this.h0);
          dataView.setUint32(4, this.h1);
          dataView.setUint32(8, this.h2);
          dataView.setUint32(12, this.h3);
          dataView.setUint32(16, this.h4);
          dataView.setUint32(20, this.h5);
          dataView.setUint32(24, this.h6);
          if (!this.is224) {
            dataView.setUint32(28, this.h7);
          }
          return buffer;
        };
        function HmacSha256(key, is2242, sharedMemory) {
          var i, type = typeof key;
          if (type === "string") {
            var bytes = [], length = key.length, index = 0, code;
            for (i = 0; i < length; ++i) {
              code = key.charCodeAt(i);
              if (code < 128) {
                bytes[index++] = code;
              } else if (code < 2048) {
                bytes[index++] = 192 | code >> 6;
                bytes[index++] = 128 | code & 63;
              } else if (code < 55296 || code >= 57344) {
                bytes[index++] = 224 | code >> 12;
                bytes[index++] = 128 | code >> 6 & 63;
                bytes[index++] = 128 | code & 63;
              } else {
                code = 65536 + ((code & 1023) << 10 | key.charCodeAt(++i) & 1023);
                bytes[index++] = 240 | code >> 18;
                bytes[index++] = 128 | code >> 12 & 63;
                bytes[index++] = 128 | code >> 6 & 63;
                bytes[index++] = 128 | code & 63;
              }
            }
            key = bytes;
          } else {
            if (type === "object") {
              if (key === null) {
                throw new Error(ERROR);
              } else if (ARRAY_BUFFER && key.constructor === ArrayBuffer) {
                key = new Uint8Array(key);
              } else if (!Array.isArray(key)) {
                if (!ARRAY_BUFFER || !ArrayBuffer.isView(key)) {
                  throw new Error(ERROR);
                }
              }
            } else {
              throw new Error(ERROR);
            }
          }
          if (key.length > 64) {
            key = new Sha256(is2242, true).update(key).array();
          }
          var oKeyPad = [], iKeyPad = [];
          for (i = 0; i < 64; ++i) {
            var b = key[i] || 0;
            oKeyPad[i] = 92 ^ b;
            iKeyPad[i] = 54 ^ b;
          }
          Sha256.call(this, is2242, sharedMemory);
          this.update(iKeyPad);
          this.oKeyPad = oKeyPad;
          this.inner = true;
          this.sharedMemory = sharedMemory;
        }
        HmacSha256.prototype = new Sha256();
        HmacSha256.prototype.finalize = function() {
          Sha256.prototype.finalize.call(this);
          if (this.inner) {
            this.inner = false;
            var innerHash = this.array();
            Sha256.call(this, this.is224, this.sharedMemory);
            this.update(this.oKeyPad);
            this.update(innerHash);
            Sha256.prototype.finalize.call(this);
          }
        };
        var exports = createMethod();
        exports.sha256 = exports;
        exports.sha224 = createMethod(true);
        exports.sha256.hmac = createHmacMethod();
        exports.sha224.hmac = createHmacMethod(true);
        if (COMMON_JS) {
          module.exports = exports;
        } else {
          root.sha256 = exports.sha256;
          root.sha224 = exports.sha224;
          if (AMD) {
            define(function() {
              return exports;
            });
          }
        }
      })();
    }
  });

  // node_modules/bip-schnorr/src/convert.js
  var require_convert2 = __commonJS({
    "node_modules/bip-schnorr/src/convert.js"(exports2, module2) {
      var BigInteger2 = require_lib();
      var Buffer2 = require_safe_buffer().Buffer;
      var sha256 = require_sha2562();
      function bufferToInt(buffer) {
        return BigInteger2.fromBuffer(buffer);
      }
      function intToBuffer(bigInteger) {
        return bigInteger.toBuffer(32);
      }
      function hash2(buffer) {
        return Buffer2.from(sha256.create().update(buffer).array());
      }
      module2.exports = {
        bufferToInt,
        intToBuffer,
        hash: hash2
      };
    }
  });

  // node_modules/bip-schnorr/src/math.js
  var require_math = __commonJS({
    "node_modules/bip-schnorr/src/math.js"(exports2, module2) {
      var BigInteger2 = require_lib();
      var Buffer2 = require_safe_buffer().Buffer;
      var ecurve2 = require_lib2();
      var randomBytes = require_browser();
      var curve2 = ecurve2.getCurveByName("secp256k1");
      var check = require_check();
      var convert3 = require_convert2();
      var concat2 = Buffer2.concat;
      var G2 = curve2.G;
      var p = curve2.p;
      var n2 = curve2.n;
      var zero = BigInteger2.ZERO;
      var one = BigInteger2.ONE;
      var two = BigInteger2.valueOf(2);
      var three = BigInteger2.valueOf(3);
      var four = BigInteger2.valueOf(4);
      var seven = BigInteger2.valueOf(7);
      function deterministicGetK0(privateKey, publicKey, message) {
        check.checkSignParams(privateKey, message);
        const h = taggedHash("BIP0340/nonce", concat2([convert3.intToBuffer(privateKey), publicKey, message]));
        const i = convert3.bufferToInt(h);
        return i.mod(n2);
      }
      function isEven(pubKey) {
        return pubKey.affineY.mod(two).equals(zero);
      }
      function getEvenKey(pubKey, privateKey) {
        if (isEven(pubKey)) {
          return privateKey.clone();
        }
        return n2.subtract(privateKey);
      }
      function getE(Rx, Px, m) {
        const hash2 = taggedHash("BIP0340/challenge", concat2([Rx, Px, m]));
        return convert3.bufferToInt(hash2).mod(n2);
      }
      function getR(s, e, P) {
        const sG = G2.multiply(s);
        const eP = P.multiply(e);
        return sG.add(eP.negate());
      }
      function taggedHash(tag, msg) {
        const tagHash = convert3.hash(tag);
        return convert3.hash(concat2([tagHash, tagHash, Buffer2.from(msg)]));
      }
      function liftX(Px) {
        const x = convert3.bufferToInt(Px);
        const c = x.pow(three).add(seven).mod(p);
        const y = c.modPow(p.add(one).divide(four), p);
        if (c.compareTo(y.modPow(two, p)) !== 0) {
          throw new Error("c is not equal to y^2");
        }
        let P = ecurve2.Point.fromAffine(curve2, x, y);
        if (!isEven(P)) {
          P = ecurve2.Point.fromAffine(curve2, x, p.subtract(y));
        }
        check.checkPointExists(true, P);
        return P;
      }
      function randomA() {
        let a = null;
        for (; ; ) {
          a = convert3.bufferToInt(Buffer2.from(randomBytes(32)));
          try {
            check.checkRange("a", a);
            return a;
          } catch (e) {
          }
        }
      }
      module2.exports = {
        deterministicGetK0,
        isEven,
        getEvenKey,
        getE,
        getR,
        taggedHash,
        liftX,
        randomA
      };
    }
  });

  // node_modules/bip-schnorr/src/schnorr.js
  var require_schnorr = __commonJS({
    "node_modules/bip-schnorr/src/schnorr.js"(exports2, module2) {
      var BigInteger2 = require_lib();
      var Buffer2 = require_safe_buffer().Buffer;
      var ecurve2 = require_lib2();
      var curve2 = ecurve2.getCurveByName("secp256k1");
      var math2 = require_math();
      var check = require_check();
      var convert3 = require_convert2();
      var concat2 = Buffer2.concat;
      var G2 = curve2.G;
      var p = curve2.p;
      var n2 = curve2.n;
      var zero = BigInteger2.ZERO;
      function sign2(privateKey, message, aux) {
        check.checkSignParams(privateKey, message);
        privateKey = typeof privateKey == "string" ? BigInteger2.fromHex(privateKey) : privateKey;
        const P = G2.multiply(privateKey);
        const Px = convert3.intToBuffer(P.affineX);
        const d = math2.getEvenKey(P, privateKey);
        let kPrime;
        if (aux) {
          check.checkAux(aux);
          const t = convert3.intToBuffer(d.xor(convert3.bufferToInt(math2.taggedHash("BIP0340/aux", aux))));
          const rand = math2.taggedHash("BIP0340/nonce", concat2([t, Px, message]));
          kPrime = convert3.bufferToInt(rand).mod(n2);
        } else {
          kPrime = math2.deterministicGetK0(d, Px, message);
        }
        if (kPrime.signum() === 0) {
          throw new Error("kPrime is zero");
        }
        const R = G2.multiply(kPrime);
        const k = math2.getEvenKey(R, kPrime);
        const Rx = convert3.intToBuffer(R.affineX);
        const e = math2.getE(Rx, Px, message);
        return concat2([Rx, convert3.intToBuffer(k.add(e.multiply(d)).mod(n2))]);
      }
      function verify(pubKey, message, signature) {
        check.checkVerifyParams(pubKey, message, signature);
        const P = math2.liftX(pubKey);
        const Px = convert3.intToBuffer(P.affineX);
        const r = convert3.bufferToInt(signature.slice(0, 32));
        const s = convert3.bufferToInt(signature.slice(32, 64));
        check.checkSignatureInput(r, s);
        const e = math2.getE(convert3.intToBuffer(r), Px, message);
        const R = math2.getR(s, e, P);
        if (R.curve.isInfinity(R) || !math2.isEven(R) || !R.affineX.equals(r)) {
          throw new Error("signature verification failed");
        }
      }
      function batchVerify(pubKeys, messages, signatures) {
        check.checkBatchVerifyParams(pubKeys, messages, signatures);
        let leftSide = zero;
        let rightSide = null;
        for (let i = 0; i < pubKeys.length; i++) {
          const P = math2.liftX(pubKeys[i]);
          const Px = convert3.intToBuffer(P.affineX);
          const r = convert3.bufferToInt(signatures[i].slice(0, 32));
          const s = convert3.bufferToInt(signatures[i].slice(32, 64));
          check.checkSignatureInput(r, s);
          const e = math2.getE(convert3.intToBuffer(r), Px, messages[i]);
          const R = math2.liftX(signatures[i].slice(0, 32));
          if (i === 0) {
            leftSide = leftSide.add(s);
            rightSide = R;
            rightSide = rightSide.add(P.multiply(e));
          } else {
            const a = math2.randomA();
            leftSide = leftSide.add(a.multiply(s));
            rightSide = rightSide.add(R.multiply(a));
            rightSide = rightSide.add(P.multiply(a.multiply(e)));
          }
        }
        if (!G2.multiply(leftSide).equals(rightSide)) {
          throw new Error("signature verification failed");
        }
      }
      module2.exports = {
        sign: sign2,
        verify,
        batchVerify
      };
    }
  });

  // node_modules/bip-schnorr/src/mu-sig.js
  var require_mu_sig = __commonJS({
    "node_modules/bip-schnorr/src/mu-sig.js"(exports2, module2) {
      var Buffer2 = require_safe_buffer().Buffer;
      var ecurve2 = require_lib2();
      var curve2 = ecurve2.getCurveByName("secp256k1");
      var math2 = require_math();
      var check = require_check();
      var convert3 = require_convert2();
      var concat2 = Buffer2.concat;
      var G2 = curve2.G;
      var n2 = curve2.n;
      var MUSIG_TAG = convert3.hash(Buffer2.from("MuSig coefficient"));
      function computeEll(pubKeys) {
        check.checkPubKeyArr(pubKeys);
        return convert3.hash(concat2(pubKeys));
      }
      function computeCoefficient(ell, idx) {
        const idxBuf = Buffer2.alloc(4);
        idxBuf.writeUInt32LE(idx);
        const data = concat2([MUSIG_TAG, MUSIG_TAG, ell, idxBuf]);
        return convert3.bufferToInt(convert3.hash(data)).mod(n2);
      }
      function pubKeyCombine(pubKeys, pubKeyHash) {
        const ell = pubKeyHash || computeEll(pubKeys);
        let X = null;
        for (let i = 0; i < pubKeys.length; i++) {
          const Xi = math2.liftX(pubKeys[i]);
          const coefficient = computeCoefficient(ell, i);
          const summand = Xi.multiply(coefficient);
          if (X === null) {
            X = summand;
          } else {
            X = X.add(summand);
          }
        }
        return X;
      }
      function sessionInitialize(sessionId, privateKey, message, pubKeyCombined, pkParity, ell, idx) {
        check.checkSessionParams(sessionId, privateKey, message, pubKeyCombined, ell);
        const session = {
          sessionId,
          message,
          pubKeyCombined,
          pkParity,
          ell,
          idx
        };
        const coefficient = computeCoefficient(ell, idx);
        session.secretKey = privateKey.multiply(coefficient).mod(n2);
        session.ownKeyParity = math2.isEven(G2.multiply(privateKey));
        if (session.pkParity !== session.ownKeyParity) {
          session.secretKey = n2.subtract(session.secretKey);
        }
        const nonceData = concat2([sessionId, message, session.pubKeyCombined, convert3.intToBuffer(privateKey)]);
        session.secretNonce = convert3.bufferToInt(convert3.hash(nonceData));
        check.checkRange("secretNonce", session.secretNonce);
        const R = G2.multiply(session.secretNonce);
        session.nonce = convert3.intToBuffer(R.affineX);
        session.nonceParity = math2.isEven(R);
        session.commitment = convert3.hash(session.nonce);
        return session;
      }
      function sessionNonceCombine(session, nonces) {
        check.checkNonceArr(nonces);
        let R = math2.liftX(nonces[0]);
        for (let i = 1; i < nonces.length; i++) {
          R = R.add(math2.liftX(nonces[i]));
        }
        session.combinedNonceParity = math2.isEven(R);
        return convert3.intToBuffer(R.affineX);
      }
      function partialSign(session, message, nonceCombined, pubKeyCombined) {
        const e = math2.getE(nonceCombined, pubKeyCombined, message);
        const sk = session.secretKey;
        let k = session.secretNonce;
        if (session.nonceParity !== session.combinedNonceParity) {
          k = n2.subtract(k);
        }
        return sk.multiply(e).add(k).mod(n2);
      }
      function partialSigVerify(session, partialSig, nonceCombined, idx, pubKey, nonce) {
        let e = math2.getE(nonceCombined, session.pubKeyCombined, session.message);
        const coefficient = computeCoefficient(session.ell, idx);
        const Pj = math2.liftX(pubKey);
        const Ri = math2.liftX(nonce);
        if (!session.pkParity) {
          e = n2.subtract(e);
        }
        let RP = math2.getR(partialSig, e.multiply(coefficient).mod(n2), Pj);
        if (session.combinedNonceParity) {
          RP = RP.negate();
        }
        const sum = RP.add(Ri);
        if (!sum.curve.isInfinity(sum)) {
          throw new Error("partial signature verification failed");
        }
      }
      function partialSigCombine(nonceCombined, partialSigs) {
        const R = math2.liftX(nonceCombined);
        check.checkArray("partialSigs", partialSigs);
        const Rx = convert3.intToBuffer(R.affineX);
        let s = partialSigs[0];
        for (let i = 1; i < partialSigs.length; i++) {
          s = s.add(partialSigs[i]).mod(n2);
        }
        return concat2([Rx, convert3.intToBuffer(s)]);
      }
      module2.exports = {
        computeEll,
        computeCoefficient,
        pubKeyCombine,
        sessionInitialize,
        sessionNonceCombine,
        partialSign,
        partialSigVerify,
        partialSigCombine
      };
    }
  });

  // node_modules/bip-schnorr/src/taproot.js
  var require_taproot = __commonJS({
    "node_modules/bip-schnorr/src/taproot.js"(exports2, module2) {
      var Buffer2 = require_safe_buffer().Buffer;
      var ecurve2 = require_lib2();
      var curve2 = ecurve2.getCurveByName("secp256k1");
      var math2 = require_math();
      var convert3 = require_convert2();
      var concat2 = Buffer2.concat;
      var G2 = curve2.G;
      function taprootConstruct(pubKey, merkleRoot) {
        if (!merkleRoot || merkleRoot.length === 0) {
          merkleRoot = Buffer2.alloc(0, 0);
        }
        const Px = convert3.intToBuffer(pubKey.affineX);
        const P = math2.liftX(Px);
        const tweak = convert3.bufferToInt(math2.taggedHash("TapTweak", concat2([Px, merkleRoot])));
        const Q = P.add(G2.multiply(tweak));
        return convert3.intToBuffer(Q.affineX);
      }
      module2.exports = {
        taprootConstruct
      };
    }
  });

  // node_modules/bip-schnorr/src/index.js
  var require_src2 = __commonJS({
    "node_modules/bip-schnorr/src/index.js"(exports2, module2) {
      var schnorr3 = require_schnorr();
      schnorr3.check = require_check();
      schnorr3.convert = require_convert2();
      schnorr3.math = require_math();
      schnorr3.muSig = require_mu_sig();
      schnorr3.taproot = require_taproot();
      module2.exports = schnorr3;
    }
  });

  // node_modules/schnorr-adaptor-points/src/check.js
  var require_check2 = __commonJS({
    "node_modules/schnorr-adaptor-points/src/check.js"(exports2, module2) {
      var { check } = require_src2();
      var BigInteger2 = require_lib();
      var Buffer2 = require_safe_buffer().Buffer;
      var ecurve2 = require_lib2();
      var curve2 = ecurve2.getCurveByName("secp256k1");
      var one = BigInteger2.ONE;
      var n2 = curve2.n;
      var p = curve2.p;
      function checkBuffer(name, buf, len, idx) {
        const idxStr = idx !== void 0 ? "[" + idx + "]" : "";
        if (!Buffer2.isBuffer(buf)) {
          throw new Error(name + idxStr + " must be a Buffer");
        }
        if (buf.length !== len) {
          throw new Error(name + idxStr + " must be " + len + " bytes long");
        }
      }
      function checkSecretArr(secrets) {
        check.checkArray("secrets", secrets);
        for (let i = 0; i < secrets.length; i++) {
          checkBuffer("secrets", secrets[i], 32, i);
        }
      }
      function checkMessageArr(messages) {
        check.checkArray("messages", messages);
        for (let i = 0; i < messages.length; i++) {
          checkBuffer("message", messages[i], 32, i);
        }
      }
      function checkPrivateKey(privateKey, idx) {
        const idxStr = idx !== void 0 ? "[" + idx + "]" : "";
        if (!BigInteger2.isBigInteger(privateKey)) {
          throw new Error("privateKey" + idxStr + " must be a BigInteger");
        }
        check.checkRange("privateKey", privateKey);
      }
      function checkPrivateKeyArr(privateKeys) {
        check.checkArray("privateKeys", privateKeys);
        for (let i = 0; i < privateKeys.length; i++) {
          checkPrivateKey(privateKeys[i]);
        }
      }
      function checkKValue(privateKey, idx) {
        const idxStr = idx !== void 0 ? "[" + idx + "]" : "";
        if (!BigInteger2.isBigInteger(privateKey)) {
          throw new Error("kValue" + idxStr + " must be a BigInteger");
        }
        check.checkRange("kValue", privateKey);
      }
      function checkKValueArr(kValues) {
        check.checkArray("KValues", kValues);
        for (let i = 0; i < kValues.length; i++) {
          checkKValue(kValues[i]);
        }
      }
      function checkCreateAdaptorPointParams(pubKeys, messages, rValues) {
        check.checkPubKeyArr(pubKeys);
        checkMessageArr(messages);
        check.checkNonceArr(rValues);
        if (pubKeys.length !== messages.length || messages.length !== rValues.length) {
          throw new Error("all parameters must be an array with the same length");
        }
      }
      function checkCreateAdaptorSecretParams(privKeys, messages, kValues) {
        checkPrivateKeyArr(privKeys);
        checkMessageArr(messages);
        checkKValueArr(kValues);
        if (privKeys.length !== messages.length || messages.length !== kValues.length) {
          throw new Error("all parameters must be an array with the same length");
        }
      }
      module2.exports = {
        checkCreateAdaptorPointParams,
        checkCreateAdaptorSecretParams,
        checkSecretArr
      };
    }
  });

  // node_modules/schnorr-adaptor-points/src/adaptor.js
  var require_adaptor = __commonJS({
    "node_modules/schnorr-adaptor-points/src/adaptor.js"(exports2, module2) {
      var BigInteger2 = require_lib();
      var Buffer2 = require_safe_buffer().Buffer;
      var ecurve2 = require_lib2();
      var curve2 = ecurve2.getCurveByName("secp256k1");
      var { math: math2, convert: convert3 } = require_src2();
      var check = require_check2();
      var concat2 = Buffer2.concat;
      var G2 = curve2.G;
      var p = curve2.p;
      var n2 = curve2.n;
      var zero = BigInteger2.ZERO;
      function createAdaptorPoint(pubKeys, messages, rValues) {
        check.checkCreateAdaptorPointParams(pubKeys, messages, rValues);
        let sG = null;
        for (let i = 0; i < pubKeys.length; i++) {
          const P = math2.liftX(pubKeys[i]);
          const Px = convert3.intToBuffer(P.affineX);
          const r = convert3.bufferToInt(rValues[i]);
          const e = math2.getE(convert3.intToBuffer(r), Px, messages[i]);
          const R = math2.liftX(rValues[i]);
          if (i === 0) {
            sG = R;
          } else {
            sG = sG.add(R);
          }
          sG = sG.add(P.multiply(e));
        }
        return convert3.intToBuffer(sG.affineX);
      }
      function createAdaptorSecret(privKeys, messages, kValues) {
        check.checkCreateAdaptorSecretParams(privKeys, messages, kValues);
        let s = null;
        for (let i = 0; i < kValues.length; i++) {
          const privateKey = privKeys[i];
          const P = G2.multiply(privateKey);
          const Px = convert3.intToBuffer(P.affineX);
          const d = math2.getEvenKey(P, privateKey);
          const message = messages[i];
          const kPrime = kValues[i];
          const R = G2.multiply(kPrime);
          const k = math2.getEvenKey(R, kPrime);
          const Rx = convert3.intToBuffer(R.affineX);
          const e = math2.getE(Rx, Px, message);
          if (s === null) {
            s = k;
          } else {
            s = s.add(k);
          }
          s = s.add(e.multiply(d));
        }
        return convert3.intToBuffer(s.mod(n2));
      }
      function combineSecrets(secrets) {
        check.checkSecretArr(secrets);
        let s = convert3.bufferToInt(secrets[0]);
        for (let i = 1; i < secrets.length; i++) {
          s = s.add(convert3.bufferToInt(secrets[i])).mod(n2);
        }
        return convert3.intToBuffer(s);
      }
      module2.exports = {
        createAdaptorPoint,
        createAdaptorSecret,
        combineSecrets
      };
    }
  });

  // node_modules/bitcoinjs-lib/src/networks.js
  var require_networks = __commonJS({
    "node_modules/bitcoinjs-lib/src/networks.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.testnet = exports2.regtest = exports2.bitcoin = void 0;
      exports2.bitcoin = {
        /**
         * The message prefix used for signing Bitcoin messages.
         */
        messagePrefix: "Bitcoin Signed Message:\n",
        /**
         * The Bech32 prefix used for Bitcoin addresses.
         */
        bech32: "bc",
        /**
         * The BIP32 key prefixes for Bitcoin.
         */
        bip32: {
          /**
           * The public key prefix for BIP32 extended public keys.
           */
          public: 76067358,
          /**
           * The private key prefix for BIP32 extended private keys.
           */
          private: 76066276
        },
        /**
         * The prefix for Bitcoin public key hashes.
         */
        pubKeyHash: 0,
        /**
         * The prefix for Bitcoin script hashes.
         */
        scriptHash: 5,
        /**
         * The prefix for Bitcoin Wallet Import Format (WIF) private keys.
         */
        wif: 128
      };
      exports2.regtest = {
        messagePrefix: "Bitcoin Signed Message:\n",
        bech32: "bcrt",
        bip32: {
          public: 70617039,
          private: 70615956
        },
        pubKeyHash: 111,
        scriptHash: 196,
        wif: 239
      };
      exports2.testnet = {
        messagePrefix: "Bitcoin Signed Message:\n",
        bech32: "tb",
        bip32: {
          public: 70617039,
          private: 70615956
        },
        pubKeyHash: 111,
        scriptHash: 196,
        wif: 239
      };
    }
  });

  // node_modules/bitcoinjs-lib/src/bip66.js
  var require_bip66 = __commonJS({
    "node_modules/bitcoinjs-lib/src/bip66.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.encode = exports2.decode = exports2.check = void 0;
      function check(buffer) {
        if (buffer.length < 8) return false;
        if (buffer.length > 72) return false;
        if (buffer[0] !== 48) return false;
        if (buffer[1] !== buffer.length - 2) return false;
        if (buffer[2] !== 2) return false;
        const lenR = buffer[3];
        if (lenR === 0) return false;
        if (5 + lenR >= buffer.length) return false;
        if (buffer[4 + lenR] !== 2) return false;
        const lenS = buffer[5 + lenR];
        if (lenS === 0) return false;
        if (6 + lenR + lenS !== buffer.length) return false;
        if (buffer[4] & 128) return false;
        if (lenR > 1 && buffer[4] === 0 && !(buffer[5] & 128)) return false;
        if (buffer[lenR + 6] & 128) return false;
        if (lenS > 1 && buffer[lenR + 6] === 0 && !(buffer[lenR + 7] & 128))
          return false;
        return true;
      }
      exports2.check = check;
      function decode(buffer) {
        if (buffer.length < 8) throw new Error("DER sequence length is too short");
        if (buffer.length > 72) throw new Error("DER sequence length is too long");
        if (buffer[0] !== 48) throw new Error("Expected DER sequence");
        if (buffer[1] !== buffer.length - 2)
          throw new Error("DER sequence length is invalid");
        if (buffer[2] !== 2) throw new Error("Expected DER integer");
        const lenR = buffer[3];
        if (lenR === 0) throw new Error("R length is zero");
        if (5 + lenR >= buffer.length) throw new Error("R length is too long");
        if (buffer[4 + lenR] !== 2) throw new Error("Expected DER integer (2)");
        const lenS = buffer[5 + lenR];
        if (lenS === 0) throw new Error("S length is zero");
        if (6 + lenR + lenS !== buffer.length) throw new Error("S length is invalid");
        if (buffer[4] & 128) throw new Error("R value is negative");
        if (lenR > 1 && buffer[4] === 0 && !(buffer[5] & 128))
          throw new Error("R value excessively padded");
        if (buffer[lenR + 6] & 128) throw new Error("S value is negative");
        if (lenS > 1 && buffer[lenR + 6] === 0 && !(buffer[lenR + 7] & 128))
          throw new Error("S value excessively padded");
        return {
          r: buffer.slice(4, 4 + lenR),
          s: buffer.slice(6 + lenR)
        };
      }
      exports2.decode = decode;
      function encode(r, s) {
        const lenR = r.length;
        const lenS = s.length;
        if (lenR === 0) throw new Error("R length is zero");
        if (lenS === 0) throw new Error("S length is zero");
        if (lenR > 33) throw new Error("R length is too long");
        if (lenS > 33) throw new Error("S length is too long");
        if (r[0] & 128) throw new Error("R value is negative");
        if (s[0] & 128) throw new Error("S value is negative");
        if (lenR > 1 && r[0] === 0 && !(r[1] & 128))
          throw new Error("R value excessively padded");
        if (lenS > 1 && s[0] === 0 && !(s[1] & 128))
          throw new Error("S value excessively padded");
        const signature = Buffer.allocUnsafe(6 + lenR + lenS);
        signature[0] = 48;
        signature[1] = signature.length - 2;
        signature[2] = 2;
        signature[3] = r.length;
        r.copy(signature, 4);
        signature[4 + lenR] = 2;
        signature[5 + lenR] = s.length;
        s.copy(signature, 6 + lenR);
        return signature;
      }
      exports2.encode = encode;
    }
  });

  // node_modules/bitcoinjs-lib/src/ops.js
  var require_ops = __commonJS({
    "node_modules/bitcoinjs-lib/src/ops.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.REVERSE_OPS = exports2.OPS = void 0;
      var OPS = {
        OP_FALSE: 0,
        OP_0: 0,
        OP_PUSHDATA1: 76,
        OP_PUSHDATA2: 77,
        OP_PUSHDATA4: 78,
        OP_1NEGATE: 79,
        OP_RESERVED: 80,
        OP_TRUE: 81,
        OP_1: 81,
        OP_2: 82,
        OP_3: 83,
        OP_4: 84,
        OP_5: 85,
        OP_6: 86,
        OP_7: 87,
        OP_8: 88,
        OP_9: 89,
        OP_10: 90,
        OP_11: 91,
        OP_12: 92,
        OP_13: 93,
        OP_14: 94,
        OP_15: 95,
        OP_16: 96,
        OP_NOP: 97,
        OP_VER: 98,
        OP_IF: 99,
        OP_NOTIF: 100,
        OP_VERIF: 101,
        OP_VERNOTIF: 102,
        OP_ELSE: 103,
        OP_ENDIF: 104,
        OP_VERIFY: 105,
        OP_RETURN: 106,
        OP_TOALTSTACK: 107,
        OP_FROMALTSTACK: 108,
        OP_2DROP: 109,
        OP_2DUP: 110,
        OP_3DUP: 111,
        OP_2OVER: 112,
        OP_2ROT: 113,
        OP_2SWAP: 114,
        OP_IFDUP: 115,
        OP_DEPTH: 116,
        OP_DROP: 117,
        OP_DUP: 118,
        OP_NIP: 119,
        OP_OVER: 120,
        OP_PICK: 121,
        OP_ROLL: 122,
        OP_ROT: 123,
        OP_SWAP: 124,
        OP_TUCK: 125,
        OP_CAT: 126,
        OP_SUBSTR: 127,
        OP_LEFT: 128,
        OP_RIGHT: 129,
        OP_SIZE: 130,
        OP_INVERT: 131,
        OP_AND: 132,
        OP_OR: 133,
        OP_XOR: 134,
        OP_EQUAL: 135,
        OP_EQUALVERIFY: 136,
        OP_RESERVED1: 137,
        OP_RESERVED2: 138,
        OP_1ADD: 139,
        OP_1SUB: 140,
        OP_2MUL: 141,
        OP_2DIV: 142,
        OP_NEGATE: 143,
        OP_ABS: 144,
        OP_NOT: 145,
        OP_0NOTEQUAL: 146,
        OP_ADD: 147,
        OP_SUB: 148,
        OP_MUL: 149,
        OP_DIV: 150,
        OP_MOD: 151,
        OP_LSHIFT: 152,
        OP_RSHIFT: 153,
        OP_BOOLAND: 154,
        OP_BOOLOR: 155,
        OP_NUMEQUAL: 156,
        OP_NUMEQUALVERIFY: 157,
        OP_NUMNOTEQUAL: 158,
        OP_LESSTHAN: 159,
        OP_GREATERTHAN: 160,
        OP_LESSTHANOREQUAL: 161,
        OP_GREATERTHANOREQUAL: 162,
        OP_MIN: 163,
        OP_MAX: 164,
        OP_WITHIN: 165,
        OP_RIPEMD160: 166,
        OP_SHA1: 167,
        OP_SHA256: 168,
        OP_HASH160: 169,
        OP_HASH256: 170,
        OP_CODESEPARATOR: 171,
        OP_CHECKSIG: 172,
        OP_CHECKSIGVERIFY: 173,
        OP_CHECKMULTISIG: 174,
        OP_CHECKMULTISIGVERIFY: 175,
        OP_NOP1: 176,
        OP_NOP2: 177,
        OP_CHECKLOCKTIMEVERIFY: 177,
        OP_NOP3: 178,
        OP_CHECKSEQUENCEVERIFY: 178,
        OP_NOP4: 179,
        OP_NOP5: 180,
        OP_NOP6: 181,
        OP_NOP7: 182,
        OP_NOP8: 183,
        OP_NOP9: 184,
        OP_NOP10: 185,
        OP_CHECKSIGADD: 186,
        OP_PUBKEYHASH: 253,
        OP_PUBKEY: 254,
        OP_INVALIDOPCODE: 255
      };
      exports2.OPS = OPS;
      var REVERSE_OPS = {};
      exports2.REVERSE_OPS = REVERSE_OPS;
      for (const op of Object.keys(OPS)) {
        const code = OPS[op];
        REVERSE_OPS[code] = op;
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/push_data.js
  var require_push_data = __commonJS({
    "node_modules/bitcoinjs-lib/src/push_data.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.decode = exports2.encode = exports2.encodingLength = void 0;
      var ops_1 = require_ops();
      function encodingLength(i) {
        return i < ops_1.OPS.OP_PUSHDATA1 ? 1 : i <= 255 ? 2 : i <= 65535 ? 3 : 5;
      }
      exports2.encodingLength = encodingLength;
      function encode(buffer, num, offset) {
        const size = encodingLength(num);
        if (size === 1) {
          buffer.writeUInt8(num, offset);
        } else if (size === 2) {
          buffer.writeUInt8(ops_1.OPS.OP_PUSHDATA1, offset);
          buffer.writeUInt8(num, offset + 1);
        } else if (size === 3) {
          buffer.writeUInt8(ops_1.OPS.OP_PUSHDATA2, offset);
          buffer.writeUInt16LE(num, offset + 1);
        } else {
          buffer.writeUInt8(ops_1.OPS.OP_PUSHDATA4, offset);
          buffer.writeUInt32LE(num, offset + 1);
        }
        return size;
      }
      exports2.encode = encode;
      function decode(buffer, offset) {
        const opcode = buffer.readUInt8(offset);
        let num;
        let size;
        if (opcode < ops_1.OPS.OP_PUSHDATA1) {
          num = opcode;
          size = 1;
        } else if (opcode === ops_1.OPS.OP_PUSHDATA1) {
          if (offset + 2 > buffer.length) return null;
          num = buffer.readUInt8(offset + 1);
          size = 2;
        } else if (opcode === ops_1.OPS.OP_PUSHDATA2) {
          if (offset + 3 > buffer.length) return null;
          num = buffer.readUInt16LE(offset + 1);
          size = 3;
        } else {
          if (offset + 5 > buffer.length) return null;
          if (opcode !== ops_1.OPS.OP_PUSHDATA4) throw new Error("Unexpected opcode");
          num = buffer.readUInt32LE(offset + 1);
          size = 5;
        }
        return {
          opcode,
          number: num,
          size
        };
      }
      exports2.decode = decode;
    }
  });

  // node_modules/bitcoinjs-lib/src/script_number.js
  var require_script_number = __commonJS({
    "node_modules/bitcoinjs-lib/src/script_number.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.encode = exports2.decode = void 0;
      function decode(buffer, maxLength, minimal) {
        maxLength = maxLength || 4;
        minimal = minimal === void 0 ? true : minimal;
        const length = buffer.length;
        if (length === 0) return 0;
        if (length > maxLength) throw new TypeError("Script number overflow");
        if (minimal) {
          if ((buffer[length - 1] & 127) === 0) {
            if (length <= 1 || (buffer[length - 2] & 128) === 0)
              throw new Error("Non-minimally encoded script number");
          }
        }
        if (length === 5) {
          const a = buffer.readUInt32LE(0);
          const b = buffer.readUInt8(4);
          if (b & 128) return -((b & ~128) * 4294967296 + a);
          return b * 4294967296 + a;
        }
        let result = 0;
        for (let i = 0; i < length; ++i) {
          result |= buffer[i] << 8 * i;
        }
        if (buffer[length - 1] & 128)
          return -(result & ~(128 << 8 * (length - 1)));
        return result;
      }
      exports2.decode = decode;
      function scriptNumSize(i) {
        return i > 2147483647 ? 5 : i > 8388607 ? 4 : i > 32767 ? 3 : i > 127 ? 2 : i > 0 ? 1 : 0;
      }
      function encode(_number) {
        let value = Math.abs(_number);
        const size = scriptNumSize(value);
        const buffer = Buffer.allocUnsafe(size);
        const negative = _number < 0;
        for (let i = 0; i < size; ++i) {
          buffer.writeUInt8(value & 255, i);
          value >>= 8;
        }
        if (buffer[size - 1] & 128) {
          buffer.writeUInt8(negative ? 128 : 0, size - 1);
        } else if (negative) {
          buffer[size - 1] |= 128;
        }
        return buffer;
      }
      exports2.encode = encode;
    }
  });

  // node_modules/typeforce/native.js
  var require_native = __commonJS({
    "node_modules/typeforce/native.js"(exports2, module2) {
      var types = {
        Array: function(value) {
          return value !== null && value !== void 0 && value.constructor === Array;
        },
        Boolean: function(value) {
          return typeof value === "boolean";
        },
        Function: function(value) {
          return typeof value === "function";
        },
        Nil: function(value) {
          return value === void 0 || value === null;
        },
        Number: function(value) {
          return typeof value === "number";
        },
        Object: function(value) {
          return typeof value === "object";
        },
        String: function(value) {
          return typeof value === "string";
        },
        "": function() {
          return true;
        }
      };
      types.Null = types.Nil;
      for (typeName in types) {
        types[typeName].toJSON = function(t) {
          return t;
        }.bind(null, typeName);
      }
      var typeName;
      module2.exports = types;
    }
  });

  // node_modules/typeforce/errors.js
  var require_errors2 = __commonJS({
    "node_modules/typeforce/errors.js"(exports2, module2) {
      var native = require_native();
      function getTypeName(fn) {
        return fn.name || fn.toString().match(/function (.*?)\s*\(/)[1];
      }
      function getValueTypeName(value) {
        return native.Nil(value) ? "" : getTypeName(value.constructor);
      }
      function getValue(value) {
        if (native.Function(value)) return "";
        if (native.String(value)) return JSON.stringify(value);
        if (value && native.Object(value)) return "";
        return value;
      }
      function captureStackTrace(e, t) {
        if (Error.captureStackTrace) {
          Error.captureStackTrace(e, t);
        }
      }
      function tfJSON(type) {
        if (native.Function(type)) return type.toJSON ? type.toJSON() : getTypeName(type);
        if (native.Array(type)) return "Array";
        if (type && native.Object(type)) return "Object";
        return type !== void 0 ? type : "";
      }
      function tfErrorString(type, value, valueTypeName) {
        var valueJson = getValue(value);
        return "Expected " + tfJSON(type) + ", got" + (valueTypeName !== "" ? " " + valueTypeName : "") + (valueJson !== "" ? " " + valueJson : "");
      }
      function TfTypeError(type, value, valueTypeName) {
        valueTypeName = valueTypeName || getValueTypeName(value);
        this.message = tfErrorString(type, value, valueTypeName);
        captureStackTrace(this, TfTypeError);
        this.__type = type;
        this.__value = value;
        this.__valueTypeName = valueTypeName;
      }
      TfTypeError.prototype = Object.create(Error.prototype);
      TfTypeError.prototype.constructor = TfTypeError;
      function tfPropertyErrorString(type, label, name, value, valueTypeName) {
        var description = '" of type ';
        if (label === "key") description = '" with key type ';
        return tfErrorString('property "' + tfJSON(name) + description + tfJSON(type), value, valueTypeName);
      }
      function TfPropertyTypeError(type, property, label, value, valueTypeName) {
        if (type) {
          valueTypeName = valueTypeName || getValueTypeName(value);
          this.message = tfPropertyErrorString(type, label, property, value, valueTypeName);
        } else {
          this.message = 'Unexpected property "' + property + '"';
        }
        captureStackTrace(this, TfTypeError);
        this.__label = label;
        this.__property = property;
        this.__type = type;
        this.__value = value;
        this.__valueTypeName = valueTypeName;
      }
      TfPropertyTypeError.prototype = Object.create(Error.prototype);
      TfPropertyTypeError.prototype.constructor = TfTypeError;
      function tfCustomError(expected, actual) {
        return new TfTypeError(expected, {}, actual);
      }
      function tfSubError(e, property, label) {
        if (e instanceof TfPropertyTypeError) {
          property = property + "." + e.__property;
          e = new TfPropertyTypeError(
            e.__type,
            property,
            e.__label,
            e.__value,
            e.__valueTypeName
          );
        } else if (e instanceof TfTypeError) {
          e = new TfPropertyTypeError(
            e.__type,
            property,
            label,
            e.__value,
            e.__valueTypeName
          );
        }
        captureStackTrace(e);
        return e;
      }
      module2.exports = {
        TfTypeError,
        TfPropertyTypeError,
        tfCustomError,
        tfSubError,
        tfJSON,
        getValueTypeName
      };
    }
  });

  // node_modules/typeforce/extra.js
  var require_extra = __commonJS({
    "node_modules/typeforce/extra.js"(exports2, module2) {
      var NATIVE = require_native();
      var ERRORS = require_errors2();
      function _Buffer(value) {
        return Buffer.isBuffer(value);
      }
      function Hex(value) {
        return typeof value === "string" && /^([0-9a-f]{2})+$/i.test(value);
      }
      function _LengthN(type, length) {
        var name = type.toJSON();
        function Length(value) {
          if (!type(value)) return false;
          if (value.length === length) return true;
          throw ERRORS.tfCustomError(name + "(Length: " + length + ")", name + "(Length: " + value.length + ")");
        }
        Length.toJSON = function() {
          return name;
        };
        return Length;
      }
      var _ArrayN = _LengthN.bind(null, NATIVE.Array);
      var _BufferN = _LengthN.bind(null, _Buffer);
      var _HexN = _LengthN.bind(null, Hex);
      var _StringN = _LengthN.bind(null, NATIVE.String);
      function Range(a, b, f) {
        f = f || NATIVE.Number;
        function _range(value, strict) {
          return f(value, strict) && value > a && value < b;
        }
        _range.toJSON = function() {
          return `${f.toJSON()} between [${a}, ${b}]`;
        };
        return _range;
      }
      var INT53_MAX = Math.pow(2, 53) - 1;
      function Finite(value) {
        return typeof value === "number" && isFinite(value);
      }
      function Int8(value) {
        return value << 24 >> 24 === value;
      }
      function Int16(value) {
        return value << 16 >> 16 === value;
      }
      function Int32(value) {
        return (value | 0) === value;
      }
      function Int53(value) {
        return typeof value === "number" && value >= -INT53_MAX && value <= INT53_MAX && Math.floor(value) === value;
      }
      function UInt8(value) {
        return (value & 255) === value;
      }
      function UInt16(value) {
        return (value & 65535) === value;
      }
      function UInt32(value) {
        return value >>> 0 === value;
      }
      function UInt53(value) {
        return typeof value === "number" && value >= 0 && value <= INT53_MAX && Math.floor(value) === value;
      }
      var types = {
        ArrayN: _ArrayN,
        Buffer: _Buffer,
        BufferN: _BufferN,
        Finite,
        Hex,
        HexN: _HexN,
        Int8,
        Int16,
        Int32,
        Int53,
        Range,
        StringN: _StringN,
        UInt8,
        UInt16,
        UInt32,
        UInt53
      };
      for (typeName in types) {
        types[typeName].toJSON = function(t) {
          return t;
        }.bind(null, typeName);
      }
      var typeName;
      module2.exports = types;
    }
  });

  // node_modules/typeforce/index.js
  var require_typeforce = __commonJS({
    "node_modules/typeforce/index.js"(exports2, module2) {
      var ERRORS = require_errors2();
      var NATIVE = require_native();
      var tfJSON = ERRORS.tfJSON;
      var TfTypeError = ERRORS.TfTypeError;
      var TfPropertyTypeError = ERRORS.TfPropertyTypeError;
      var tfSubError = ERRORS.tfSubError;
      var getValueTypeName = ERRORS.getValueTypeName;
      var TYPES = {
        arrayOf: function arrayOf(type, options) {
          type = compile(type);
          options = options || {};
          function _arrayOf(array, strict) {
            if (!NATIVE.Array(array)) return false;
            if (NATIVE.Nil(array)) return false;
            if (options.minLength !== void 0 && array.length < options.minLength) return false;
            if (options.maxLength !== void 0 && array.length > options.maxLength) return false;
            if (options.length !== void 0 && array.length !== options.length) return false;
            return array.every(function(value, i) {
              try {
                return typeforce(type, value, strict);
              } catch (e) {
                throw tfSubError(e, i);
              }
            });
          }
          _arrayOf.toJSON = function() {
            var str = "[" + tfJSON(type) + "]";
            if (options.length !== void 0) {
              str += "{" + options.length + "}";
            } else if (options.minLength !== void 0 || options.maxLength !== void 0) {
              str += "{" + (options.minLength === void 0 ? 0 : options.minLength) + "," + (options.maxLength === void 0 ? Infinity : options.maxLength) + "}";
            }
            return str;
          };
          return _arrayOf;
        },
        maybe: function maybe(type) {
          type = compile(type);
          function _maybe(value, strict) {
            return NATIVE.Nil(value) || type(value, strict, maybe);
          }
          _maybe.toJSON = function() {
            return "?" + tfJSON(type);
          };
          return _maybe;
        },
        map: function map(propertyType, propertyKeyType) {
          propertyType = compile(propertyType);
          if (propertyKeyType) propertyKeyType = compile(propertyKeyType);
          function _map(value, strict) {
            if (!NATIVE.Object(value)) return false;
            if (NATIVE.Nil(value)) return false;
            for (var propertyName in value) {
              try {
                if (propertyKeyType) {
                  typeforce(propertyKeyType, propertyName, strict);
                }
              } catch (e) {
                throw tfSubError(e, propertyName, "key");
              }
              try {
                var propertyValue = value[propertyName];
                typeforce(propertyType, propertyValue, strict);
              } catch (e) {
                throw tfSubError(e, propertyName);
              }
            }
            return true;
          }
          if (propertyKeyType) {
            _map.toJSON = function() {
              return "{" + tfJSON(propertyKeyType) + ": " + tfJSON(propertyType) + "}";
            };
          } else {
            _map.toJSON = function() {
              return "{" + tfJSON(propertyType) + "}";
            };
          }
          return _map;
        },
        object: function object(uncompiled) {
          var type = {};
          for (var typePropertyName in uncompiled) {
            type[typePropertyName] = compile(uncompiled[typePropertyName]);
          }
          function _object(value, strict) {
            if (!NATIVE.Object(value)) return false;
            if (NATIVE.Nil(value)) return false;
            var propertyName;
            try {
              for (propertyName in type) {
                var propertyType = type[propertyName];
                var propertyValue = value[propertyName];
                typeforce(propertyType, propertyValue, strict);
              }
            } catch (e) {
              throw tfSubError(e, propertyName);
            }
            if (strict) {
              for (propertyName in value) {
                if (type[propertyName]) continue;
                throw new TfPropertyTypeError(void 0, propertyName);
              }
            }
            return true;
          }
          _object.toJSON = function() {
            return tfJSON(type);
          };
          return _object;
        },
        anyOf: function anyOf() {
          var types = [].slice.call(arguments).map(compile);
          function _anyOf(value, strict) {
            return types.some(function(type) {
              try {
                return typeforce(type, value, strict);
              } catch (e) {
                return false;
              }
            });
          }
          _anyOf.toJSON = function() {
            return types.map(tfJSON).join("|");
          };
          return _anyOf;
        },
        allOf: function allOf() {
          var types = [].slice.call(arguments).map(compile);
          function _allOf(value, strict) {
            return types.every(function(type) {
              try {
                return typeforce(type, value, strict);
              } catch (e) {
                return false;
              }
            });
          }
          _allOf.toJSON = function() {
            return types.map(tfJSON).join(" & ");
          };
          return _allOf;
        },
        quacksLike: function quacksLike(type) {
          function _quacksLike(value) {
            return type === getValueTypeName(value);
          }
          _quacksLike.toJSON = function() {
            return type;
          };
          return _quacksLike;
        },
        tuple: function tuple() {
          var types = [].slice.call(arguments).map(compile);
          function _tuple(values, strict) {
            if (NATIVE.Nil(values)) return false;
            if (NATIVE.Nil(values.length)) return false;
            if (strict && values.length !== types.length) return false;
            return types.every(function(type, i) {
              try {
                return typeforce(type, values[i], strict);
              } catch (e) {
                throw tfSubError(e, i);
              }
            });
          }
          _tuple.toJSON = function() {
            return "(" + types.map(tfJSON).join(", ") + ")";
          };
          return _tuple;
        },
        value: function value(expected) {
          function _value(actual) {
            return actual === expected;
          }
          _value.toJSON = function() {
            return expected;
          };
          return _value;
        }
      };
      TYPES.oneOf = TYPES.anyOf;
      function compile(type) {
        if (NATIVE.String(type)) {
          if (type[0] === "?") return TYPES.maybe(type.slice(1));
          return NATIVE[type] || TYPES.quacksLike(type);
        } else if (type && NATIVE.Object(type)) {
          if (NATIVE.Array(type)) {
            if (type.length !== 1) throw new TypeError("Expected compile() parameter of type Array of length 1");
            return TYPES.arrayOf(type[0]);
          }
          return TYPES.object(type);
        } else if (NATIVE.Function(type)) {
          return type;
        }
        return TYPES.value(type);
      }
      function typeforce(type, value, strict, surrogate) {
        if (NATIVE.Function(type)) {
          if (type(value, strict)) return true;
          throw new TfTypeError(surrogate || type, value);
        }
        return typeforce(compile(type), value, strict);
      }
      for (typeName in NATIVE) {
        typeforce[typeName] = NATIVE[typeName];
      }
      var typeName;
      for (typeName in TYPES) {
        typeforce[typeName] = TYPES[typeName];
      }
      var EXTRA2 = require_extra();
      for (typeName in EXTRA2) {
        typeforce[typeName] = EXTRA2[typeName];
      }
      typeforce.compile = compile;
      typeforce.TfTypeError = TfTypeError;
      typeforce.TfPropertyTypeError = TfPropertyTypeError;
      module2.exports = typeforce;
    }
  });

  // node_modules/bitcoinjs-lib/src/types.js
  var require_types2 = __commonJS({
    "node_modules/bitcoinjs-lib/src/types.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.oneOf = exports2.Null = exports2.BufferN = exports2.Function = exports2.UInt32 = exports2.UInt8 = exports2.tuple = exports2.maybe = exports2.Hex = exports2.Buffer = exports2.String = exports2.Boolean = exports2.Array = exports2.Number = exports2.Hash256bit = exports2.Hash160bit = exports2.Buffer256bit = exports2.isTaptree = exports2.isTapleaf = exports2.TAPLEAF_VERSION_MASK = exports2.Satoshi = exports2.isPoint = exports2.stacksEqual = exports2.typeforce = void 0;
      var buffer_1 = require_buffer();
      exports2.typeforce = require_typeforce();
      var ZERO32 = buffer_1.Buffer.alloc(32, 0);
      var EC_P = buffer_1.Buffer.from(
        "fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f",
        "hex"
      );
      function stacksEqual(a, b) {
        if (a.length !== b.length) return false;
        return a.every((x, i) => {
          return x.equals(b[i]);
        });
      }
      exports2.stacksEqual = stacksEqual;
      function isPoint(p) {
        if (!buffer_1.Buffer.isBuffer(p)) return false;
        if (p.length < 33) return false;
        const t = p[0];
        const x = p.slice(1, 33);
        if (x.compare(ZERO32) === 0) return false;
        if (x.compare(EC_P) >= 0) return false;
        if ((t === 2 || t === 3) && p.length === 33) {
          return true;
        }
        const y = p.slice(33);
        if (y.compare(ZERO32) === 0) return false;
        if (y.compare(EC_P) >= 0) return false;
        if (t === 4 && p.length === 65) return true;
        return false;
      }
      exports2.isPoint = isPoint;
      var SATOSHI_MAX = 21 * 1e14;
      function Satoshi(value) {
        return exports2.typeforce.UInt53(value) && value <= SATOSHI_MAX;
      }
      exports2.Satoshi = Satoshi;
      exports2.TAPLEAF_VERSION_MASK = 254;
      function isTapleaf(o) {
        if (!o || !("output" in o)) return false;
        if (!buffer_1.Buffer.isBuffer(o.output)) return false;
        if (o.version !== void 0)
          return (o.version & exports2.TAPLEAF_VERSION_MASK) === o.version;
        return true;
      }
      exports2.isTapleaf = isTapleaf;
      function isTaptree(scriptTree) {
        if (!(0, exports2.Array)(scriptTree)) return isTapleaf(scriptTree);
        if (scriptTree.length !== 2) return false;
        return scriptTree.every((t) => isTaptree(t));
      }
      exports2.isTaptree = isTaptree;
      exports2.Buffer256bit = exports2.typeforce.BufferN(32);
      exports2.Hash160bit = exports2.typeforce.BufferN(20);
      exports2.Hash256bit = exports2.typeforce.BufferN(32);
      exports2.Number = exports2.typeforce.Number;
      exports2.Array = exports2.typeforce.Array;
      exports2.Boolean = exports2.typeforce.Boolean;
      exports2.String = exports2.typeforce.String;
      exports2.Buffer = exports2.typeforce.Buffer;
      exports2.Hex = exports2.typeforce.Hex;
      exports2.maybe = exports2.typeforce.maybe;
      exports2.tuple = exports2.typeforce.tuple;
      exports2.UInt8 = exports2.typeforce.UInt8;
      exports2.UInt32 = exports2.typeforce.UInt32;
      exports2.Function = exports2.typeforce.Function;
      exports2.BufferN = exports2.typeforce.BufferN;
      exports2.Null = exports2.typeforce.Null;
      exports2.oneOf = exports2.typeforce.oneOf;
    }
  });

  // node_modules/bitcoinjs-lib/src/script_signature.js
  var require_script_signature = __commonJS({
    "node_modules/bitcoinjs-lib/src/script_signature.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.encode = exports2.decode = void 0;
      var bip66 = require_bip66();
      var script_1 = require_script();
      var types = require_types2();
      var { typeforce } = types;
      var ZERO = Buffer.alloc(1, 0);
      function toDER(x) {
        let i = 0;
        while (x[i] === 0) ++i;
        if (i === x.length) return ZERO;
        x = x.slice(i);
        if (x[0] & 128) return Buffer.concat([ZERO, x], 1 + x.length);
        return x;
      }
      function fromDER(x) {
        if (x[0] === 0) x = x.slice(1);
        const buffer = Buffer.alloc(32, 0);
        const bstart = Math.max(0, 32 - x.length);
        x.copy(buffer, bstart);
        return buffer;
      }
      function decode(buffer) {
        const hashType = buffer.readUInt8(buffer.length - 1);
        if (!(0, script_1.isDefinedHashType)(hashType)) {
          throw new Error("Invalid hashType " + hashType);
        }
        const decoded = bip66.decode(buffer.slice(0, -1));
        const r = fromDER(decoded.r);
        const s = fromDER(decoded.s);
        const signature = Buffer.concat([r, s], 64);
        return { signature, hashType };
      }
      exports2.decode = decode;
      function encode(signature, hashType) {
        typeforce(
          {
            signature: types.BufferN(64),
            hashType: types.UInt8
          },
          { signature, hashType }
        );
        if (!(0, script_1.isDefinedHashType)(hashType)) {
          throw new Error("Invalid hashType " + hashType);
        }
        const hashTypeBuffer = Buffer.allocUnsafe(1);
        hashTypeBuffer.writeUInt8(hashType, 0);
        const r = toDER(signature.slice(0, 32));
        const s = toDER(signature.slice(32, 64));
        return Buffer.concat([bip66.encode(r, s), hashTypeBuffer]);
      }
      exports2.encode = encode;
    }
  });

  // node_modules/bitcoinjs-lib/src/script.js
  var require_script = __commonJS({
    "node_modules/bitcoinjs-lib/src/script.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.signature = exports2.number = exports2.isCanonicalScriptSignature = exports2.isDefinedHashType = exports2.isCanonicalPubKey = exports2.toStack = exports2.fromASM = exports2.toASM = exports2.decompile = exports2.compile = exports2.countNonPushOnlyOPs = exports2.isPushOnly = exports2.OPS = void 0;
      var bip66 = require_bip66();
      var ops_1 = require_ops();
      Object.defineProperty(exports2, "OPS", {
        enumerable: true,
        get: function() {
          return ops_1.OPS;
        }
      });
      var pushdata = require_push_data();
      var scriptNumber = require_script_number();
      var scriptSignature = require_script_signature();
      var types = require_types2();
      var { typeforce } = types;
      var OP_INT_BASE = ops_1.OPS.OP_RESERVED;
      function isOPInt(value) {
        return types.Number(value) && (value === ops_1.OPS.OP_0 || value >= ops_1.OPS.OP_1 && value <= ops_1.OPS.OP_16 || value === ops_1.OPS.OP_1NEGATE);
      }
      function isPushOnlyChunk(value) {
        return types.Buffer(value) || isOPInt(value);
      }
      function isPushOnly(value) {
        return types.Array(value) && value.every(isPushOnlyChunk);
      }
      exports2.isPushOnly = isPushOnly;
      function countNonPushOnlyOPs(value) {
        return value.length - value.filter(isPushOnlyChunk).length;
      }
      exports2.countNonPushOnlyOPs = countNonPushOnlyOPs;
      function asMinimalOP(buffer) {
        if (buffer.length === 0) return ops_1.OPS.OP_0;
        if (buffer.length !== 1) return;
        if (buffer[0] >= 1 && buffer[0] <= 16) return OP_INT_BASE + buffer[0];
        if (buffer[0] === 129) return ops_1.OPS.OP_1NEGATE;
      }
      function chunksIsBuffer(buf) {
        return Buffer.isBuffer(buf);
      }
      function chunksIsArray(buf) {
        return types.Array(buf);
      }
      function singleChunkIsBuffer(buf) {
        return Buffer.isBuffer(buf);
      }
      function compile(chunks) {
        if (chunksIsBuffer(chunks)) return chunks;
        typeforce(types.Array, chunks);
        const bufferSize = chunks.reduce((accum, chunk) => {
          if (singleChunkIsBuffer(chunk)) {
            if (chunk.length === 1 && asMinimalOP(chunk) !== void 0) {
              return accum + 1;
            }
            return accum + pushdata.encodingLength(chunk.length) + chunk.length;
          }
          return accum + 1;
        }, 0);
        const buffer = Buffer.allocUnsafe(bufferSize);
        let offset = 0;
        chunks.forEach((chunk) => {
          if (singleChunkIsBuffer(chunk)) {
            const opcode = asMinimalOP(chunk);
            if (opcode !== void 0) {
              buffer.writeUInt8(opcode, offset);
              offset += 1;
              return;
            }
            offset += pushdata.encode(buffer, chunk.length, offset);
            chunk.copy(buffer, offset);
            offset += chunk.length;
          } else {
            buffer.writeUInt8(chunk, offset);
            offset += 1;
          }
        });
        if (offset !== buffer.length) throw new Error("Could not decode chunks");
        return buffer;
      }
      exports2.compile = compile;
      function decompile(buffer) {
        if (chunksIsArray(buffer)) return buffer;
        typeforce(types.Buffer, buffer);
        const chunks = [];
        let i = 0;
        while (i < buffer.length) {
          const opcode = buffer[i];
          if (opcode > ops_1.OPS.OP_0 && opcode <= ops_1.OPS.OP_PUSHDATA4) {
            const d = pushdata.decode(buffer, i);
            if (d === null) return null;
            i += d.size;
            if (i + d.number > buffer.length) return null;
            const data = buffer.slice(i, i + d.number);
            i += d.number;
            const op = asMinimalOP(data);
            if (op !== void 0) {
              chunks.push(op);
            } else {
              chunks.push(data);
            }
          } else {
            chunks.push(opcode);
            i += 1;
          }
        }
        return chunks;
      }
      exports2.decompile = decompile;
      function toASM(chunks) {
        if (chunksIsBuffer(chunks)) {
          chunks = decompile(chunks);
        }
        if (!chunks) {
          throw new Error("Could not convert invalid chunks to ASM");
        }
        return chunks.map((chunk) => {
          if (singleChunkIsBuffer(chunk)) {
            const op = asMinimalOP(chunk);
            if (op === void 0) return chunk.toString("hex");
            chunk = op;
          }
          return ops_1.REVERSE_OPS[chunk];
        }).join(" ");
      }
      exports2.toASM = toASM;
      function fromASM(asm) {
        typeforce(types.String, asm);
        return compile(
          asm.split(" ").map((chunkStr) => {
            if (ops_1.OPS[chunkStr] !== void 0) return ops_1.OPS[chunkStr];
            typeforce(types.Hex, chunkStr);
            return Buffer.from(chunkStr, "hex");
          })
        );
      }
      exports2.fromASM = fromASM;
      function toStack(chunks) {
        chunks = decompile(chunks);
        typeforce(isPushOnly, chunks);
        return chunks.map((op) => {
          if (singleChunkIsBuffer(op)) return op;
          if (op === ops_1.OPS.OP_0) return Buffer.allocUnsafe(0);
          return scriptNumber.encode(op - OP_INT_BASE);
        });
      }
      exports2.toStack = toStack;
      function isCanonicalPubKey(buffer) {
        return types.isPoint(buffer);
      }
      exports2.isCanonicalPubKey = isCanonicalPubKey;
      function isDefinedHashType(hashType) {
        const hashTypeMod = hashType & ~128;
        return hashTypeMod > 0 && hashTypeMod < 4;
      }
      exports2.isDefinedHashType = isDefinedHashType;
      function isCanonicalScriptSignature(buffer) {
        if (!Buffer.isBuffer(buffer)) return false;
        if (!isDefinedHashType(buffer[buffer.length - 1])) return false;
        return bip66.check(buffer.slice(0, -1));
      }
      exports2.isCanonicalScriptSignature = isCanonicalScriptSignature;
      exports2.number = scriptNumber;
      exports2.signature = scriptSignature;
    }
  });

  // node_modules/bitcoinjs-lib/src/payments/lazy.js
  var require_lazy = __commonJS({
    "node_modules/bitcoinjs-lib/src/payments/lazy.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.value = exports2.prop = void 0;
      function prop(object, name, f) {
        Object.defineProperty(object, name, {
          configurable: true,
          enumerable: true,
          get() {
            const _value = f.call(this);
            this[name] = _value;
            return _value;
          },
          set(_value) {
            Object.defineProperty(this, name, {
              configurable: true,
              enumerable: true,
              value: _value,
              writable: true
            });
          }
        });
      }
      exports2.prop = prop;
      function value(f) {
        let _value;
        return () => {
          if (_value !== void 0) return _value;
          _value = f();
          return _value;
        };
      }
      exports2.value = value;
    }
  });

  // node_modules/bitcoinjs-lib/src/payments/embed.js
  var require_embed = __commonJS({
    "node_modules/bitcoinjs-lib/src/payments/embed.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.p2data = void 0;
      var networks_1 = require_networks();
      var bscript = require_script();
      var types_1 = require_types2();
      var lazy = require_lazy();
      var OPS = bscript.OPS;
      function p2data(a, opts) {
        if (!a.data && !a.output) throw new TypeError("Not enough data");
        opts = Object.assign({ validate: true }, opts || {});
        (0, types_1.typeforce)(
          {
            network: types_1.typeforce.maybe(types_1.typeforce.Object),
            output: types_1.typeforce.maybe(types_1.typeforce.Buffer),
            data: types_1.typeforce.maybe(
              types_1.typeforce.arrayOf(types_1.typeforce.Buffer)
            )
          },
          a
        );
        const network = a.network || networks_1.bitcoin;
        const o = { name: "embed", network };
        lazy.prop(o, "output", () => {
          if (!a.data) return;
          return bscript.compile([OPS.OP_RETURN].concat(a.data));
        });
        lazy.prop(o, "data", () => {
          if (!a.output) return;
          return bscript.decompile(a.output).slice(1);
        });
        if (opts.validate) {
          if (a.output) {
            const chunks = bscript.decompile(a.output);
            if (chunks[0] !== OPS.OP_RETURN) throw new TypeError("Output is invalid");
            if (!chunks.slice(1).every(types_1.typeforce.Buffer))
              throw new TypeError("Output is invalid");
            if (a.data && !(0, types_1.stacksEqual)(a.data, o.data))
              throw new TypeError("Data mismatch");
          }
        }
        return Object.assign(o, a);
      }
      exports2.p2data = p2data;
    }
  });

  // node_modules/bitcoinjs-lib/src/payments/p2ms.js
  var require_p2ms = __commonJS({
    "node_modules/bitcoinjs-lib/src/payments/p2ms.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.p2ms = void 0;
      var networks_1 = require_networks();
      var bscript = require_script();
      var types_1 = require_types2();
      var lazy = require_lazy();
      var OPS = bscript.OPS;
      var OP_INT_BASE = OPS.OP_RESERVED;
      function p2ms(a, opts) {
        if (!a.input && !a.output && !(a.pubkeys && a.m !== void 0) && !a.signatures)
          throw new TypeError("Not enough data");
        opts = Object.assign({ validate: true }, opts || {});
        function isAcceptableSignature(x) {
          return bscript.isCanonicalScriptSignature(x) || (opts.allowIncomplete && x === OPS.OP_0) !== void 0;
        }
        (0, types_1.typeforce)(
          {
            network: types_1.typeforce.maybe(types_1.typeforce.Object),
            m: types_1.typeforce.maybe(types_1.typeforce.Number),
            n: types_1.typeforce.maybe(types_1.typeforce.Number),
            output: types_1.typeforce.maybe(types_1.typeforce.Buffer),
            pubkeys: types_1.typeforce.maybe(
              types_1.typeforce.arrayOf(types_1.isPoint)
            ),
            signatures: types_1.typeforce.maybe(
              types_1.typeforce.arrayOf(isAcceptableSignature)
            ),
            input: types_1.typeforce.maybe(types_1.typeforce.Buffer)
          },
          a
        );
        const network = a.network || networks_1.bitcoin;
        const o = { network };
        let chunks = [];
        let decoded = false;
        function decode(output) {
          if (decoded) return;
          decoded = true;
          chunks = bscript.decompile(output);
          o.m = chunks[0] - OP_INT_BASE;
          o.n = chunks[chunks.length - 2] - OP_INT_BASE;
          o.pubkeys = chunks.slice(1, -2);
        }
        lazy.prop(o, "output", () => {
          if (!a.m) return;
          if (!o.n) return;
          if (!a.pubkeys) return;
          return bscript.compile(
            [].concat(
              OP_INT_BASE + a.m,
              a.pubkeys,
              OP_INT_BASE + o.n,
              OPS.OP_CHECKMULTISIG
            )
          );
        });
        lazy.prop(o, "m", () => {
          if (!o.output) return;
          decode(o.output);
          return o.m;
        });
        lazy.prop(o, "n", () => {
          if (!o.pubkeys) return;
          return o.pubkeys.length;
        });
        lazy.prop(o, "pubkeys", () => {
          if (!a.output) return;
          decode(a.output);
          return o.pubkeys;
        });
        lazy.prop(o, "signatures", () => {
          if (!a.input) return;
          return bscript.decompile(a.input).slice(1);
        });
        lazy.prop(o, "input", () => {
          if (!a.signatures) return;
          return bscript.compile([OPS.OP_0].concat(a.signatures));
        });
        lazy.prop(o, "witness", () => {
          if (!o.input) return;
          return [];
        });
        lazy.prop(o, "name", () => {
          if (!o.m || !o.n) return;
          return `p2ms(${o.m} of ${o.n})`;
        });
        if (opts.validate) {
          if (a.output) {
            decode(a.output);
            if (!types_1.typeforce.Number(chunks[0]))
              throw new TypeError("Output is invalid");
            if (!types_1.typeforce.Number(chunks[chunks.length - 2]))
              throw new TypeError("Output is invalid");
            if (chunks[chunks.length - 1] !== OPS.OP_CHECKMULTISIG)
              throw new TypeError("Output is invalid");
            if (o.m <= 0 || o.n > 16 || o.m > o.n || o.n !== chunks.length - 3)
              throw new TypeError("Output is invalid");
            if (!o.pubkeys.every((x) => (0, types_1.isPoint)(x)))
              throw new TypeError("Output is invalid");
            if (a.m !== void 0 && a.m !== o.m) throw new TypeError("m mismatch");
            if (a.n !== void 0 && a.n !== o.n) throw new TypeError("n mismatch");
            if (a.pubkeys && !(0, types_1.stacksEqual)(a.pubkeys, o.pubkeys))
              throw new TypeError("Pubkeys mismatch");
          }
          if (a.pubkeys) {
            if (a.n !== void 0 && a.n !== a.pubkeys.length)
              throw new TypeError("Pubkey count mismatch");
            o.n = a.pubkeys.length;
            if (o.n < o.m) throw new TypeError("Pubkey count cannot be less than m");
          }
          if (a.signatures) {
            if (a.signatures.length < o.m)
              throw new TypeError("Not enough signatures provided");
            if (a.signatures.length > o.m)
              throw new TypeError("Too many signatures provided");
          }
          if (a.input) {
            if (a.input[0] !== OPS.OP_0) throw new TypeError("Input is invalid");
            if (o.signatures.length === 0 || !o.signatures.every(isAcceptableSignature))
              throw new TypeError("Input has invalid signature(s)");
            if (a.signatures && !(0, types_1.stacksEqual)(a.signatures, o.signatures))
              throw new TypeError("Signature mismatch");
            if (a.m !== void 0 && a.m !== a.signatures.length)
              throw new TypeError("Signature count mismatch");
          }
        }
        return Object.assign(o, a);
      }
      exports2.p2ms = p2ms;
    }
  });

  // node_modules/bitcoinjs-lib/src/payments/p2pk.js
  var require_p2pk = __commonJS({
    "node_modules/bitcoinjs-lib/src/payments/p2pk.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.p2pk = void 0;
      var networks_1 = require_networks();
      var bscript = require_script();
      var types_1 = require_types2();
      var lazy = require_lazy();
      var OPS = bscript.OPS;
      function p2pk(a, opts) {
        if (!a.input && !a.output && !a.pubkey && !a.input && !a.signature)
          throw new TypeError("Not enough data");
        opts = Object.assign({ validate: true }, opts || {});
        (0, types_1.typeforce)(
          {
            network: types_1.typeforce.maybe(types_1.typeforce.Object),
            output: types_1.typeforce.maybe(types_1.typeforce.Buffer),
            pubkey: types_1.typeforce.maybe(types_1.isPoint),
            signature: types_1.typeforce.maybe(bscript.isCanonicalScriptSignature),
            input: types_1.typeforce.maybe(types_1.typeforce.Buffer)
          },
          a
        );
        const _chunks = lazy.value(() => {
          return bscript.decompile(a.input);
        });
        const network = a.network || networks_1.bitcoin;
        const o = { name: "p2pk", network };
        lazy.prop(o, "output", () => {
          if (!a.pubkey) return;
          return bscript.compile([a.pubkey, OPS.OP_CHECKSIG]);
        });
        lazy.prop(o, "pubkey", () => {
          if (!a.output) return;
          return a.output.slice(1, -1);
        });
        lazy.prop(o, "signature", () => {
          if (!a.input) return;
          return _chunks()[0];
        });
        lazy.prop(o, "input", () => {
          if (!a.signature) return;
          return bscript.compile([a.signature]);
        });
        lazy.prop(o, "witness", () => {
          if (!o.input) return;
          return [];
        });
        if (opts.validate) {
          if (a.output) {
            if (a.output[a.output.length - 1] !== OPS.OP_CHECKSIG)
              throw new TypeError("Output is invalid");
            if (!(0, types_1.isPoint)(o.pubkey))
              throw new TypeError("Output pubkey is invalid");
            if (a.pubkey && !a.pubkey.equals(o.pubkey))
              throw new TypeError("Pubkey mismatch");
          }
          if (a.signature) {
            if (a.input && !a.input.equals(o.input))
              throw new TypeError("Signature mismatch");
          }
          if (a.input) {
            if (_chunks().length !== 1) throw new TypeError("Input is invalid");
            if (!bscript.isCanonicalScriptSignature(o.signature))
              throw new TypeError("Input has invalid signature");
          }
        }
        return Object.assign(o, a);
      }
      exports2.p2pk = p2pk;
    }
  });

  // node_modules/@noble/hashes/crypto.js
  var require_crypto2 = __commonJS({
    "node_modules/@noble/hashes/crypto.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.crypto = void 0;
      exports2.crypto = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
    }
  });

  // node_modules/@noble/hashes/utils.js
  var require_utils = __commonJS({
    "node_modules/@noble/hashes/utils.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.wrapXOFConstructorWithOpts = exports2.wrapConstructorWithOpts = exports2.wrapConstructor = exports2.Hash = exports2.nextTick = exports2.swap32IfBE = exports2.byteSwapIfBE = exports2.swap8IfBE = exports2.isLE = void 0;
      exports2.isBytes = isBytes;
      exports2.anumber = anumber;
      exports2.abytes = abytes;
      exports2.ahash = ahash;
      exports2.aexists = aexists;
      exports2.aoutput = aoutput;
      exports2.u8 = u8;
      exports2.u32 = u32;
      exports2.clean = clean;
      exports2.createView = createView;
      exports2.rotr = rotr;
      exports2.rotl = rotl;
      exports2.byteSwap = byteSwap;
      exports2.byteSwap32 = byteSwap32;
      exports2.bytesToHex = bytesToHex;
      exports2.hexToBytes = hexToBytes;
      exports2.asyncLoop = asyncLoop;
      exports2.utf8ToBytes = utf8ToBytes;
      exports2.bytesToUtf8 = bytesToUtf8;
      exports2.toBytes = toBytes;
      exports2.kdfInputToBytes = kdfInputToBytes;
      exports2.concatBytes = concatBytes;
      exports2.checkOpts = checkOpts;
      exports2.createHasher = createHasher;
      exports2.createOptHasher = createOptHasher;
      exports2.createXOFer = createXOFer;
      exports2.randomBytes = randomBytes;
      var crypto_1 = require_crypto2();
      function isBytes(a) {
        return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
      }
      function anumber(n2) {
        if (!Number.isSafeInteger(n2) || n2 < 0)
          throw new Error("positive integer expected, got " + n2);
      }
      function abytes(b, ...lengths) {
        if (!isBytes(b))
          throw new Error("Uint8Array expected");
        if (lengths.length > 0 && !lengths.includes(b.length))
          throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
      }
      function ahash(h) {
        if (typeof h !== "function" || typeof h.create !== "function")
          throw new Error("Hash should be wrapped by utils.createHasher");
        anumber(h.outputLen);
        anumber(h.blockLen);
      }
      function aexists(instance, checkFinished = true) {
        if (instance.destroyed)
          throw new Error("Hash instance has been destroyed");
        if (checkFinished && instance.finished)
          throw new Error("Hash#digest() has already been called");
      }
      function aoutput(out, instance) {
        abytes(out);
        const min = instance.outputLen;
        if (out.length < min) {
          throw new Error("digestInto() expects output buffer of length at least " + min);
        }
      }
      function u8(arr) {
        return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
      }
      function u32(arr) {
        return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
      }
      function clean(...arrays) {
        for (let i = 0; i < arrays.length; i++) {
          arrays[i].fill(0);
        }
      }
      function createView(arr) {
        return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
      }
      function rotr(word, shift) {
        return word << 32 - shift | word >>> shift;
      }
      function rotl(word, shift) {
        return word << shift | word >>> 32 - shift >>> 0;
      }
      exports2.isLE = (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
      function byteSwap(word) {
        return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
      }
      exports2.swap8IfBE = exports2.isLE ? (n2) => n2 : (n2) => byteSwap(n2);
      exports2.byteSwapIfBE = exports2.swap8IfBE;
      function byteSwap32(arr) {
        for (let i = 0; i < arr.length; i++) {
          arr[i] = byteSwap(arr[i]);
        }
        return arr;
      }
      exports2.swap32IfBE = exports2.isLE ? (u) => u : byteSwap32;
      var hasHexBuiltin = /* @__PURE__ */ (() => (
        // @ts-ignore
        typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
      ))();
      var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
      function bytesToHex(bytes) {
        abytes(bytes);
        if (hasHexBuiltin)
          return bytes.toHex();
        let hex = "";
        for (let i = 0; i < bytes.length; i++) {
          hex += hexes[bytes[i]];
        }
        return hex;
      }
      var asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
      function asciiToBase16(ch) {
        if (ch >= asciis._0 && ch <= asciis._9)
          return ch - asciis._0;
        if (ch >= asciis.A && ch <= asciis.F)
          return ch - (asciis.A - 10);
        if (ch >= asciis.a && ch <= asciis.f)
          return ch - (asciis.a - 10);
        return;
      }
      function hexToBytes(hex) {
        if (typeof hex !== "string")
          throw new Error("hex string expected, got " + typeof hex);
        if (hasHexBuiltin)
          return Uint8Array.fromHex(hex);
        const hl = hex.length;
        const al = hl / 2;
        if (hl % 2)
          throw new Error("hex string expected, got unpadded hex of length " + hl);
        const array = new Uint8Array(al);
        for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
          const n1 = asciiToBase16(hex.charCodeAt(hi));
          const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
          if (n1 === void 0 || n2 === void 0) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
          }
          array[ai] = n1 * 16 + n2;
        }
        return array;
      }
      var nextTick = async () => {
      };
      exports2.nextTick = nextTick;
      async function asyncLoop(iters, tick, cb) {
        let ts = Date.now();
        for (let i = 0; i < iters; i++) {
          cb(i);
          const diff = Date.now() - ts;
          if (diff >= 0 && diff < tick)
            continue;
          await (0, exports2.nextTick)();
          ts += diff;
        }
      }
      function utf8ToBytes(str) {
        if (typeof str !== "string")
          throw new Error("string expected");
        return new Uint8Array(new TextEncoder().encode(str));
      }
      function bytesToUtf8(bytes) {
        return new TextDecoder().decode(bytes);
      }
      function toBytes(data) {
        if (typeof data === "string")
          data = utf8ToBytes(data);
        abytes(data);
        return data;
      }
      function kdfInputToBytes(data) {
        if (typeof data === "string")
          data = utf8ToBytes(data);
        abytes(data);
        return data;
      }
      function concatBytes(...arrays) {
        let sum = 0;
        for (let i = 0; i < arrays.length; i++) {
          const a = arrays[i];
          abytes(a);
          sum += a.length;
        }
        const res = new Uint8Array(sum);
        for (let i = 0, pad = 0; i < arrays.length; i++) {
          const a = arrays[i];
          res.set(a, pad);
          pad += a.length;
        }
        return res;
      }
      function checkOpts(defaults, opts) {
        if (opts !== void 0 && {}.toString.call(opts) !== "[object Object]")
          throw new Error("options should be object or undefined");
        const merged = Object.assign(defaults, opts);
        return merged;
      }
      var Hash = class {
      };
      exports2.Hash = Hash;
      function createHasher(hashCons) {
        const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
        const tmp = hashCons();
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = () => hashCons();
        return hashC;
      }
      function createOptHasher(hashCons) {
        const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
        const tmp = hashCons({});
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = (opts) => hashCons(opts);
        return hashC;
      }
      function createXOFer(hashCons) {
        const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
        const tmp = hashCons({});
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = (opts) => hashCons(opts);
        return hashC;
      }
      exports2.wrapConstructor = createHasher;
      exports2.wrapConstructorWithOpts = createOptHasher;
      exports2.wrapXOFConstructorWithOpts = createXOFer;
      function randomBytes(bytesLength = 32) {
        if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
          return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
        }
        if (crypto_1.crypto && typeof crypto_1.crypto.randomBytes === "function") {
          return Uint8Array.from(crypto_1.crypto.randomBytes(bytesLength));
        }
        throw new Error("crypto.getRandomValues must be defined");
      }
    }
  });

  // node_modules/@noble/hashes/_md.js
  var require_md = __commonJS({
    "node_modules/@noble/hashes/_md.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.SHA512_IV = exports2.SHA384_IV = exports2.SHA224_IV = exports2.SHA256_IV = exports2.HashMD = void 0;
      exports2.setBigUint64 = setBigUint64;
      exports2.Chi = Chi;
      exports2.Maj = Maj;
      var utils_ts_1 = require_utils();
      function setBigUint64(view, byteOffset, value, isLE) {
        if (typeof view.setBigUint64 === "function")
          return view.setBigUint64(byteOffset, value, isLE);
        const _32n = BigInt(32);
        const _u32_max = BigInt(4294967295);
        const wh = Number(value >> _32n & _u32_max);
        const wl = Number(value & _u32_max);
        const h = isLE ? 4 : 0;
        const l = isLE ? 0 : 4;
        view.setUint32(byteOffset + h, wh, isLE);
        view.setUint32(byteOffset + l, wl, isLE);
      }
      function Chi(a, b, c) {
        return a & b ^ ~a & c;
      }
      function Maj(a, b, c) {
        return a & b ^ a & c ^ b & c;
      }
      var HashMD = class extends utils_ts_1.Hash {
        constructor(blockLen, outputLen, padOffset, isLE) {
          super();
          this.finished = false;
          this.length = 0;
          this.pos = 0;
          this.destroyed = false;
          this.blockLen = blockLen;
          this.outputLen = outputLen;
          this.padOffset = padOffset;
          this.isLE = isLE;
          this.buffer = new Uint8Array(blockLen);
          this.view = (0, utils_ts_1.createView)(this.buffer);
        }
        update(data) {
          (0, utils_ts_1.aexists)(this);
          data = (0, utils_ts_1.toBytes)(data);
          (0, utils_ts_1.abytes)(data);
          const { view, buffer, blockLen } = this;
          const len = data.length;
          for (let pos = 0; pos < len; ) {
            const take = Math.min(blockLen - this.pos, len - pos);
            if (take === blockLen) {
              const dataView = (0, utils_ts_1.createView)(data);
              for (; blockLen <= len - pos; pos += blockLen)
                this.process(dataView, pos);
              continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
              this.process(view, 0);
              this.pos = 0;
            }
          }
          this.length += data.length;
          this.roundClean();
          return this;
        }
        digestInto(out) {
          (0, utils_ts_1.aexists)(this);
          (0, utils_ts_1.aoutput)(out, this);
          this.finished = true;
          const { buffer, view, blockLen, isLE } = this;
          let { pos } = this;
          buffer[pos++] = 128;
          (0, utils_ts_1.clean)(this.buffer.subarray(pos));
          if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
          }
          for (let i = pos; i < blockLen; i++)
            buffer[i] = 0;
          setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
          this.process(view, 0);
          const oview = (0, utils_ts_1.createView)(out);
          const len = this.outputLen;
          if (len % 4)
            throw new Error("_sha2: outputLen should be aligned to 32bit");
          const outLen = len / 4;
          const state = this.get();
          if (outLen > state.length)
            throw new Error("_sha2: outputLen bigger than state");
          for (let i = 0; i < outLen; i++)
            oview.setUint32(4 * i, state[i], isLE);
        }
        digest() {
          const { buffer, outputLen } = this;
          this.digestInto(buffer);
          const res = buffer.slice(0, outputLen);
          this.destroy();
          return res;
        }
        _cloneInto(to) {
          to || (to = new this.constructor());
          to.set(...this.get());
          const { blockLen, buffer, length, finished, destroyed, pos } = this;
          to.destroyed = destroyed;
          to.finished = finished;
          to.length = length;
          to.pos = pos;
          if (length % blockLen)
            to.buffer.set(buffer);
          return to;
        }
        clone() {
          return this._cloneInto();
        }
      };
      exports2.HashMD = HashMD;
      exports2.SHA256_IV = Uint32Array.from([
        1779033703,
        3144134277,
        1013904242,
        2773480762,
        1359893119,
        2600822924,
        528734635,
        1541459225
      ]);
      exports2.SHA224_IV = Uint32Array.from([
        3238371032,
        914150663,
        812702999,
        4144912697,
        4290775857,
        1750603025,
        1694076839,
        3204075428
      ]);
      exports2.SHA384_IV = Uint32Array.from([
        3418070365,
        3238371032,
        1654270250,
        914150663,
        2438529370,
        812702999,
        355462360,
        4144912697,
        1731405415,
        4290775857,
        2394180231,
        1750603025,
        3675008525,
        1694076839,
        1203062813,
        3204075428
      ]);
      exports2.SHA512_IV = Uint32Array.from([
        1779033703,
        4089235720,
        3144134277,
        2227873595,
        1013904242,
        4271175723,
        2773480762,
        1595750129,
        1359893119,
        2917565137,
        2600822924,
        725511199,
        528734635,
        4215389547,
        1541459225,
        327033209
      ]);
    }
  });

  // node_modules/@noble/hashes/legacy.js
  var require_legacy = __commonJS({
    "node_modules/@noble/hashes/legacy.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.ripemd160 = exports2.RIPEMD160 = exports2.md5 = exports2.MD5 = exports2.sha1 = exports2.SHA1 = void 0;
      var _md_ts_1 = require_md();
      var utils_ts_1 = require_utils();
      var SHA1_IV = /* @__PURE__ */ Uint32Array.from([
        1732584193,
        4023233417,
        2562383102,
        271733878,
        3285377520
      ]);
      var SHA1_W = /* @__PURE__ */ new Uint32Array(80);
      var SHA1 = class extends _md_ts_1.HashMD {
        constructor() {
          super(64, 20, 8, false);
          this.A = SHA1_IV[0] | 0;
          this.B = SHA1_IV[1] | 0;
          this.C = SHA1_IV[2] | 0;
          this.D = SHA1_IV[3] | 0;
          this.E = SHA1_IV[4] | 0;
        }
        get() {
          const { A, B, C, D, E } = this;
          return [A, B, C, D, E];
        }
        set(A, B, C, D, E) {
          this.A = A | 0;
          this.B = B | 0;
          this.C = C | 0;
          this.D = D | 0;
          this.E = E | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4)
            SHA1_W[i] = view.getUint32(offset, false);
          for (let i = 16; i < 80; i++)
            SHA1_W[i] = (0, utils_ts_1.rotl)(SHA1_W[i - 3] ^ SHA1_W[i - 8] ^ SHA1_W[i - 14] ^ SHA1_W[i - 16], 1);
          let { A, B, C, D, E } = this;
          for (let i = 0; i < 80; i++) {
            let F, K3;
            if (i < 20) {
              F = (0, _md_ts_1.Chi)(B, C, D);
              K3 = 1518500249;
            } else if (i < 40) {
              F = B ^ C ^ D;
              K3 = 1859775393;
            } else if (i < 60) {
              F = (0, _md_ts_1.Maj)(B, C, D);
              K3 = 2400959708;
            } else {
              F = B ^ C ^ D;
              K3 = 3395469782;
            }
            const T = (0, utils_ts_1.rotl)(A, 5) + F + E + K3 + SHA1_W[i] | 0;
            E = D;
            D = C;
            C = (0, utils_ts_1.rotl)(B, 30);
            B = A;
            A = T;
          }
          A = A + this.A | 0;
          B = B + this.B | 0;
          C = C + this.C | 0;
          D = D + this.D | 0;
          E = E + this.E | 0;
          this.set(A, B, C, D, E);
        }
        roundClean() {
          (0, utils_ts_1.clean)(SHA1_W);
        }
        destroy() {
          this.set(0, 0, 0, 0, 0);
          (0, utils_ts_1.clean)(this.buffer);
        }
      };
      exports2.SHA1 = SHA1;
      exports2.sha1 = (0, utils_ts_1.createHasher)(() => new SHA1());
      var p32 = /* @__PURE__ */ Math.pow(2, 32);
      var K2 = /* @__PURE__ */ Array.from({ length: 64 }, (_, i) => Math.floor(p32 * Math.abs(Math.sin(i + 1))));
      var MD5_IV = /* @__PURE__ */ SHA1_IV.slice(0, 4);
      var MD5_W = /* @__PURE__ */ new Uint32Array(16);
      var MD5 = class extends _md_ts_1.HashMD {
        constructor() {
          super(64, 16, 8, true);
          this.A = MD5_IV[0] | 0;
          this.B = MD5_IV[1] | 0;
          this.C = MD5_IV[2] | 0;
          this.D = MD5_IV[3] | 0;
        }
        get() {
          const { A, B, C, D } = this;
          return [A, B, C, D];
        }
        set(A, B, C, D) {
          this.A = A | 0;
          this.B = B | 0;
          this.C = C | 0;
          this.D = D | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4)
            MD5_W[i] = view.getUint32(offset, true);
          let { A, B, C, D } = this;
          for (let i = 0; i < 64; i++) {
            let F, g, s;
            if (i < 16) {
              F = (0, _md_ts_1.Chi)(B, C, D);
              g = i;
              s = [7, 12, 17, 22];
            } else if (i < 32) {
              F = (0, _md_ts_1.Chi)(D, B, C);
              g = (5 * i + 1) % 16;
              s = [5, 9, 14, 20];
            } else if (i < 48) {
              F = B ^ C ^ D;
              g = (3 * i + 5) % 16;
              s = [4, 11, 16, 23];
            } else {
              F = C ^ (B | ~D);
              g = 7 * i % 16;
              s = [6, 10, 15, 21];
            }
            F = F + A + K2[i] + MD5_W[g];
            A = D;
            D = C;
            C = B;
            B = B + (0, utils_ts_1.rotl)(F, s[i % 4]);
          }
          A = A + this.A | 0;
          B = B + this.B | 0;
          C = C + this.C | 0;
          D = D + this.D | 0;
          this.set(A, B, C, D);
        }
        roundClean() {
          (0, utils_ts_1.clean)(MD5_W);
        }
        destroy() {
          this.set(0, 0, 0, 0);
          (0, utils_ts_1.clean)(this.buffer);
        }
      };
      exports2.MD5 = MD5;
      exports2.md5 = (0, utils_ts_1.createHasher)(() => new MD5());
      var Rho160 = /* @__PURE__ */ Uint8Array.from([
        7,
        4,
        13,
        1,
        10,
        6,
        15,
        3,
        12,
        0,
        9,
        5,
        2,
        14,
        11,
        8
      ]);
      var Id160 = /* @__PURE__ */ (() => Uint8Array.from(new Array(16).fill(0).map((_, i) => i)))();
      var Pi160 = /* @__PURE__ */ (() => Id160.map((i) => (9 * i + 5) % 16))();
      var idxLR = /* @__PURE__ */ (() => {
        const L = [Id160];
        const R = [Pi160];
        const res = [L, R];
        for (let i = 0; i < 4; i++)
          for (let j of res)
            j.push(j[i].map((k) => Rho160[k]));
        return res;
      })();
      var idxL = /* @__PURE__ */ (() => idxLR[0])();
      var idxR = /* @__PURE__ */ (() => idxLR[1])();
      var shifts160 = /* @__PURE__ */ [
        [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
        [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
        [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
        [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
        [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
      ].map((i) => Uint8Array.from(i));
      var shiftsL160 = /* @__PURE__ */ idxL.map((idx, i) => idx.map((j) => shifts160[i][j]));
      var shiftsR160 = /* @__PURE__ */ idxR.map((idx, i) => idx.map((j) => shifts160[i][j]));
      var Kl160 = /* @__PURE__ */ Uint32Array.from([
        0,
        1518500249,
        1859775393,
        2400959708,
        2840853838
      ]);
      var Kr160 = /* @__PURE__ */ Uint32Array.from([
        1352829926,
        1548603684,
        1836072691,
        2053994217,
        0
      ]);
      function ripemd_f(group, x, y, z) {
        if (group === 0)
          return x ^ y ^ z;
        if (group === 1)
          return x & y | ~x & z;
        if (group === 2)
          return (x | ~y) ^ z;
        if (group === 3)
          return x & z | y & ~z;
        return x ^ (y | ~z);
      }
      var BUF_160 = /* @__PURE__ */ new Uint32Array(16);
      var RIPEMD160 = class extends _md_ts_1.HashMD {
        constructor() {
          super(64, 20, 8, true);
          this.h0 = 1732584193 | 0;
          this.h1 = 4023233417 | 0;
          this.h2 = 2562383102 | 0;
          this.h3 = 271733878 | 0;
          this.h4 = 3285377520 | 0;
        }
        get() {
          const { h0, h1, h2, h3, h4 } = this;
          return [h0, h1, h2, h3, h4];
        }
        set(h0, h1, h2, h3, h4) {
          this.h0 = h0 | 0;
          this.h1 = h1 | 0;
          this.h2 = h2 | 0;
          this.h3 = h3 | 0;
          this.h4 = h4 | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4)
            BUF_160[i] = view.getUint32(offset, true);
          let al = this.h0 | 0, ar = al, bl = this.h1 | 0, br = bl, cl = this.h2 | 0, cr = cl, dl = this.h3 | 0, dr = dl, el = this.h4 | 0, er = el;
          for (let group = 0; group < 5; group++) {
            const rGroup = 4 - group;
            const hbl = Kl160[group], hbr = Kr160[group];
            const rl = idxL[group], rr = idxR[group];
            const sl = shiftsL160[group], sr = shiftsR160[group];
            for (let i = 0; i < 16; i++) {
              const tl = (0, utils_ts_1.rotl)(al + ripemd_f(group, bl, cl, dl) + BUF_160[rl[i]] + hbl, sl[i]) + el | 0;
              al = el, el = dl, dl = (0, utils_ts_1.rotl)(cl, 10) | 0, cl = bl, bl = tl;
            }
            for (let i = 0; i < 16; i++) {
              const tr = (0, utils_ts_1.rotl)(ar + ripemd_f(rGroup, br, cr, dr) + BUF_160[rr[i]] + hbr, sr[i]) + er | 0;
              ar = er, er = dr, dr = (0, utils_ts_1.rotl)(cr, 10) | 0, cr = br, br = tr;
            }
          }
          this.set(this.h1 + cl + dr | 0, this.h2 + dl + er | 0, this.h3 + el + ar | 0, this.h4 + al + br | 0, this.h0 + bl + cr | 0);
        }
        roundClean() {
          (0, utils_ts_1.clean)(BUF_160);
        }
        destroy() {
          this.destroyed = true;
          (0, utils_ts_1.clean)(this.buffer);
          this.set(0, 0, 0, 0, 0);
        }
      };
      exports2.RIPEMD160 = RIPEMD160;
      exports2.ripemd160 = (0, utils_ts_1.createHasher)(() => new RIPEMD160());
    }
  });

  // node_modules/@noble/hashes/ripemd160.js
  var require_ripemd160 = __commonJS({
    "node_modules/@noble/hashes/ripemd160.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.ripemd160 = exports2.RIPEMD160 = void 0;
      var legacy_ts_1 = require_legacy();
      exports2.RIPEMD160 = legacy_ts_1.RIPEMD160;
      exports2.ripemd160 = legacy_ts_1.ripemd160;
    }
  });

  // node_modules/@noble/hashes/sha1.js
  var require_sha1 = __commonJS({
    "node_modules/@noble/hashes/sha1.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.sha1 = exports2.SHA1 = void 0;
      var legacy_ts_1 = require_legacy();
      exports2.SHA1 = legacy_ts_1.SHA1;
      exports2.sha1 = legacy_ts_1.sha1;
    }
  });

  // node_modules/@noble/hashes/_u64.js
  var require_u64 = __commonJS({
    "node_modules/@noble/hashes/_u64.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.toBig = exports2.shrSL = exports2.shrSH = exports2.rotrSL = exports2.rotrSH = exports2.rotrBL = exports2.rotrBH = exports2.rotr32L = exports2.rotr32H = exports2.rotlSL = exports2.rotlSH = exports2.rotlBL = exports2.rotlBH = exports2.add5L = exports2.add5H = exports2.add4L = exports2.add4H = exports2.add3L = exports2.add3H = void 0;
      exports2.add = add;
      exports2.fromBig = fromBig;
      exports2.split = split;
      var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
      var _32n = /* @__PURE__ */ BigInt(32);
      function fromBig(n2, le = false) {
        if (le)
          return { h: Number(n2 & U32_MASK64), l: Number(n2 >> _32n & U32_MASK64) };
        return { h: Number(n2 >> _32n & U32_MASK64) | 0, l: Number(n2 & U32_MASK64) | 0 };
      }
      function split(lst, le = false) {
        const len = lst.length;
        let Ah = new Uint32Array(len);
        let Al = new Uint32Array(len);
        for (let i = 0; i < len; i++) {
          const { h, l } = fromBig(lst[i], le);
          [Ah[i], Al[i]] = [h, l];
        }
        return [Ah, Al];
      }
      var toBig = (h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
      exports2.toBig = toBig;
      var shrSH = (h, _l, s) => h >>> s;
      exports2.shrSH = shrSH;
      var shrSL = (h, l, s) => h << 32 - s | l >>> s;
      exports2.shrSL = shrSL;
      var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
      exports2.rotrSH = rotrSH;
      var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
      exports2.rotrSL = rotrSL;
      var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
      exports2.rotrBH = rotrBH;
      var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
      exports2.rotrBL = rotrBL;
      var rotr32H = (_h, l) => l;
      exports2.rotr32H = rotr32H;
      var rotr32L = (h, _l) => h;
      exports2.rotr32L = rotr32L;
      var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
      exports2.rotlSH = rotlSH;
      var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
      exports2.rotlSL = rotlSL;
      var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
      exports2.rotlBH = rotlBH;
      var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
      exports2.rotlBL = rotlBL;
      function add(Ah, Al, Bh, Bl) {
        const l = (Al >>> 0) + (Bl >>> 0);
        return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
      }
      var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
      exports2.add3L = add3L;
      var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
      exports2.add3H = add3H;
      var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
      exports2.add4L = add4L;
      var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
      exports2.add4H = add4H;
      var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
      exports2.add5L = add5L;
      var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
      exports2.add5H = add5H;
      var u64 = {
        fromBig,
        split,
        toBig,
        shrSH,
        shrSL,
        rotrSH,
        rotrSL,
        rotrBH,
        rotrBL,
        rotr32H,
        rotr32L,
        rotlSH,
        rotlSL,
        rotlBH,
        rotlBL,
        add,
        add3L,
        add3H,
        add4L,
        add4H,
        add5H,
        add5L
      };
      exports2.default = u64;
    }
  });

  // node_modules/@noble/hashes/sha2.js
  var require_sha2 = __commonJS({
    "node_modules/@noble/hashes/sha2.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.sha512_224 = exports2.sha512_256 = exports2.sha384 = exports2.sha512 = exports2.sha224 = exports2.sha256 = exports2.SHA512_256 = exports2.SHA512_224 = exports2.SHA384 = exports2.SHA512 = exports2.SHA224 = exports2.SHA256 = void 0;
      var _md_ts_1 = require_md();
      var u64 = require_u64();
      var utils_ts_1 = require_utils();
      var SHA256_K = /* @__PURE__ */ Uint32Array.from([
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ]);
      var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
      var SHA256 = class extends _md_ts_1.HashMD {
        constructor(outputLen = 32) {
          super(64, outputLen, 8, false);
          this.A = _md_ts_1.SHA256_IV[0] | 0;
          this.B = _md_ts_1.SHA256_IV[1] | 0;
          this.C = _md_ts_1.SHA256_IV[2] | 0;
          this.D = _md_ts_1.SHA256_IV[3] | 0;
          this.E = _md_ts_1.SHA256_IV[4] | 0;
          this.F = _md_ts_1.SHA256_IV[5] | 0;
          this.G = _md_ts_1.SHA256_IV[6] | 0;
          this.H = _md_ts_1.SHA256_IV[7] | 0;
        }
        get() {
          const { A, B, C, D, E, F, G: G2, H } = this;
          return [A, B, C, D, E, F, G2, H];
        }
        // prettier-ignore
        set(A, B, C, D, E, F, G2, H) {
          this.A = A | 0;
          this.B = B | 0;
          this.C = C | 0;
          this.D = D | 0;
          this.E = E | 0;
          this.F = F | 0;
          this.G = G2 | 0;
          this.H = H | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4)
            SHA256_W[i] = view.getUint32(offset, false);
          for (let i = 16; i < 64; i++) {
            const W15 = SHA256_W[i - 15];
            const W2 = SHA256_W[i - 2];
            const s0 = (0, utils_ts_1.rotr)(W15, 7) ^ (0, utils_ts_1.rotr)(W15, 18) ^ W15 >>> 3;
            const s1 = (0, utils_ts_1.rotr)(W2, 17) ^ (0, utils_ts_1.rotr)(W2, 19) ^ W2 >>> 10;
            SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
          }
          let { A, B, C, D, E, F, G: G2, H } = this;
          for (let i = 0; i < 64; i++) {
            const sigma1 = (0, utils_ts_1.rotr)(E, 6) ^ (0, utils_ts_1.rotr)(E, 11) ^ (0, utils_ts_1.rotr)(E, 25);
            const T1 = H + sigma1 + (0, _md_ts_1.Chi)(E, F, G2) + SHA256_K[i] + SHA256_W[i] | 0;
            const sigma0 = (0, utils_ts_1.rotr)(A, 2) ^ (0, utils_ts_1.rotr)(A, 13) ^ (0, utils_ts_1.rotr)(A, 22);
            const T2 = sigma0 + (0, _md_ts_1.Maj)(A, B, C) | 0;
            H = G2;
            G2 = F;
            F = E;
            E = D + T1 | 0;
            D = C;
            C = B;
            B = A;
            A = T1 + T2 | 0;
          }
          A = A + this.A | 0;
          B = B + this.B | 0;
          C = C + this.C | 0;
          D = D + this.D | 0;
          E = E + this.E | 0;
          F = F + this.F | 0;
          G2 = G2 + this.G | 0;
          H = H + this.H | 0;
          this.set(A, B, C, D, E, F, G2, H);
        }
        roundClean() {
          (0, utils_ts_1.clean)(SHA256_W);
        }
        destroy() {
          this.set(0, 0, 0, 0, 0, 0, 0, 0);
          (0, utils_ts_1.clean)(this.buffer);
        }
      };
      exports2.SHA256 = SHA256;
      var SHA224 = class extends SHA256 {
        constructor() {
          super(28);
          this.A = _md_ts_1.SHA224_IV[0] | 0;
          this.B = _md_ts_1.SHA224_IV[1] | 0;
          this.C = _md_ts_1.SHA224_IV[2] | 0;
          this.D = _md_ts_1.SHA224_IV[3] | 0;
          this.E = _md_ts_1.SHA224_IV[4] | 0;
          this.F = _md_ts_1.SHA224_IV[5] | 0;
          this.G = _md_ts_1.SHA224_IV[6] | 0;
          this.H = _md_ts_1.SHA224_IV[7] | 0;
        }
      };
      exports2.SHA224 = SHA224;
      var K512 = /* @__PURE__ */ (() => u64.split([
        "0x428a2f98d728ae22",
        "0x7137449123ef65cd",
        "0xb5c0fbcfec4d3b2f",
        "0xe9b5dba58189dbbc",
        "0x3956c25bf348b538",
        "0x59f111f1b605d019",
        "0x923f82a4af194f9b",
        "0xab1c5ed5da6d8118",
        "0xd807aa98a3030242",
        "0x12835b0145706fbe",
        "0x243185be4ee4b28c",
        "0x550c7dc3d5ffb4e2",
        "0x72be5d74f27b896f",
        "0x80deb1fe3b1696b1",
        "0x9bdc06a725c71235",
        "0xc19bf174cf692694",
        "0xe49b69c19ef14ad2",
        "0xefbe4786384f25e3",
        "0x0fc19dc68b8cd5b5",
        "0x240ca1cc77ac9c65",
        "0x2de92c6f592b0275",
        "0x4a7484aa6ea6e483",
        "0x5cb0a9dcbd41fbd4",
        "0x76f988da831153b5",
        "0x983e5152ee66dfab",
        "0xa831c66d2db43210",
        "0xb00327c898fb213f",
        "0xbf597fc7beef0ee4",
        "0xc6e00bf33da88fc2",
        "0xd5a79147930aa725",
        "0x06ca6351e003826f",
        "0x142929670a0e6e70",
        "0x27b70a8546d22ffc",
        "0x2e1b21385c26c926",
        "0x4d2c6dfc5ac42aed",
        "0x53380d139d95b3df",
        "0x650a73548baf63de",
        "0x766a0abb3c77b2a8",
        "0x81c2c92e47edaee6",
        "0x92722c851482353b",
        "0xa2bfe8a14cf10364",
        "0xa81a664bbc423001",
        "0xc24b8b70d0f89791",
        "0xc76c51a30654be30",
        "0xd192e819d6ef5218",
        "0xd69906245565a910",
        "0xf40e35855771202a",
        "0x106aa07032bbd1b8",
        "0x19a4c116b8d2d0c8",
        "0x1e376c085141ab53",
        "0x2748774cdf8eeb99",
        "0x34b0bcb5e19b48a8",
        "0x391c0cb3c5c95a63",
        "0x4ed8aa4ae3418acb",
        "0x5b9cca4f7763e373",
        "0x682e6ff3d6b2b8a3",
        "0x748f82ee5defb2fc",
        "0x78a5636f43172f60",
        "0x84c87814a1f0ab72",
        "0x8cc702081a6439ec",
        "0x90befffa23631e28",
        "0xa4506cebde82bde9",
        "0xbef9a3f7b2c67915",
        "0xc67178f2e372532b",
        "0xca273eceea26619c",
        "0xd186b8c721c0c207",
        "0xeada7dd6cde0eb1e",
        "0xf57d4f7fee6ed178",
        "0x06f067aa72176fba",
        "0x0a637dc5a2c898a6",
        "0x113f9804bef90dae",
        "0x1b710b35131c471b",
        "0x28db77f523047d84",
        "0x32caab7b40c72493",
        "0x3c9ebe0a15c9bebc",
        "0x431d67c49c100d4c",
        "0x4cc5d4becb3e42b6",
        "0x597f299cfc657e2a",
        "0x5fcb6fab3ad6faec",
        "0x6c44198c4a475817"
      ].map((n2) => BigInt(n2))))();
      var SHA512_Kh = /* @__PURE__ */ (() => K512[0])();
      var SHA512_Kl = /* @__PURE__ */ (() => K512[1])();
      var SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
      var SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
      var SHA512 = class extends _md_ts_1.HashMD {
        constructor(outputLen = 64) {
          super(128, outputLen, 16, false);
          this.Ah = _md_ts_1.SHA512_IV[0] | 0;
          this.Al = _md_ts_1.SHA512_IV[1] | 0;
          this.Bh = _md_ts_1.SHA512_IV[2] | 0;
          this.Bl = _md_ts_1.SHA512_IV[3] | 0;
          this.Ch = _md_ts_1.SHA512_IV[4] | 0;
          this.Cl = _md_ts_1.SHA512_IV[5] | 0;
          this.Dh = _md_ts_1.SHA512_IV[6] | 0;
          this.Dl = _md_ts_1.SHA512_IV[7] | 0;
          this.Eh = _md_ts_1.SHA512_IV[8] | 0;
          this.El = _md_ts_1.SHA512_IV[9] | 0;
          this.Fh = _md_ts_1.SHA512_IV[10] | 0;
          this.Fl = _md_ts_1.SHA512_IV[11] | 0;
          this.Gh = _md_ts_1.SHA512_IV[12] | 0;
          this.Gl = _md_ts_1.SHA512_IV[13] | 0;
          this.Hh = _md_ts_1.SHA512_IV[14] | 0;
          this.Hl = _md_ts_1.SHA512_IV[15] | 0;
        }
        // prettier-ignore
        get() {
          const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
          return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
        }
        // prettier-ignore
        set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
          this.Ah = Ah | 0;
          this.Al = Al | 0;
          this.Bh = Bh | 0;
          this.Bl = Bl | 0;
          this.Ch = Ch | 0;
          this.Cl = Cl | 0;
          this.Dh = Dh | 0;
          this.Dl = Dl | 0;
          this.Eh = Eh | 0;
          this.El = El | 0;
          this.Fh = Fh | 0;
          this.Fl = Fl | 0;
          this.Gh = Gh | 0;
          this.Gl = Gl | 0;
          this.Hh = Hh | 0;
          this.Hl = Hl | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4) {
            SHA512_W_H[i] = view.getUint32(offset);
            SHA512_W_L[i] = view.getUint32(offset += 4);
          }
          for (let i = 16; i < 80; i++) {
            const W15h = SHA512_W_H[i - 15] | 0;
            const W15l = SHA512_W_L[i - 15] | 0;
            const s0h = u64.rotrSH(W15h, W15l, 1) ^ u64.rotrSH(W15h, W15l, 8) ^ u64.shrSH(W15h, W15l, 7);
            const s0l = u64.rotrSL(W15h, W15l, 1) ^ u64.rotrSL(W15h, W15l, 8) ^ u64.shrSL(W15h, W15l, 7);
            const W2h = SHA512_W_H[i - 2] | 0;
            const W2l = SHA512_W_L[i - 2] | 0;
            const s1h = u64.rotrSH(W2h, W2l, 19) ^ u64.rotrBH(W2h, W2l, 61) ^ u64.shrSH(W2h, W2l, 6);
            const s1l = u64.rotrSL(W2h, W2l, 19) ^ u64.rotrBL(W2h, W2l, 61) ^ u64.shrSL(W2h, W2l, 6);
            const SUMl = u64.add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
            const SUMh = u64.add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
            SHA512_W_H[i] = SUMh | 0;
            SHA512_W_L[i] = SUMl | 0;
          }
          let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
          for (let i = 0; i < 80; i++) {
            const sigma1h = u64.rotrSH(Eh, El, 14) ^ u64.rotrSH(Eh, El, 18) ^ u64.rotrBH(Eh, El, 41);
            const sigma1l = u64.rotrSL(Eh, El, 14) ^ u64.rotrSL(Eh, El, 18) ^ u64.rotrBL(Eh, El, 41);
            const CHIh = Eh & Fh ^ ~Eh & Gh;
            const CHIl = El & Fl ^ ~El & Gl;
            const T1ll = u64.add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
            const T1h = u64.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
            const T1l = T1ll | 0;
            const sigma0h = u64.rotrSH(Ah, Al, 28) ^ u64.rotrBH(Ah, Al, 34) ^ u64.rotrBH(Ah, Al, 39);
            const sigma0l = u64.rotrSL(Ah, Al, 28) ^ u64.rotrBL(Ah, Al, 34) ^ u64.rotrBL(Ah, Al, 39);
            const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
            const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
            Hh = Gh | 0;
            Hl = Gl | 0;
            Gh = Fh | 0;
            Gl = Fl | 0;
            Fh = Eh | 0;
            Fl = El | 0;
            ({ h: Eh, l: El } = u64.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
            Dh = Ch | 0;
            Dl = Cl | 0;
            Ch = Bh | 0;
            Cl = Bl | 0;
            Bh = Ah | 0;
            Bl = Al | 0;
            const All = u64.add3L(T1l, sigma0l, MAJl);
            Ah = u64.add3H(All, T1h, sigma0h, MAJh);
            Al = All | 0;
          }
          ({ h: Ah, l: Al } = u64.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
          ({ h: Bh, l: Bl } = u64.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
          ({ h: Ch, l: Cl } = u64.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
          ({ h: Dh, l: Dl } = u64.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
          ({ h: Eh, l: El } = u64.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
          ({ h: Fh, l: Fl } = u64.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
          ({ h: Gh, l: Gl } = u64.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
          ({ h: Hh, l: Hl } = u64.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
          this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
        }
        roundClean() {
          (0, utils_ts_1.clean)(SHA512_W_H, SHA512_W_L);
        }
        destroy() {
          (0, utils_ts_1.clean)(this.buffer);
          this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }
      };
      exports2.SHA512 = SHA512;
      var SHA384 = class extends SHA512 {
        constructor() {
          super(48);
          this.Ah = _md_ts_1.SHA384_IV[0] | 0;
          this.Al = _md_ts_1.SHA384_IV[1] | 0;
          this.Bh = _md_ts_1.SHA384_IV[2] | 0;
          this.Bl = _md_ts_1.SHA384_IV[3] | 0;
          this.Ch = _md_ts_1.SHA384_IV[4] | 0;
          this.Cl = _md_ts_1.SHA384_IV[5] | 0;
          this.Dh = _md_ts_1.SHA384_IV[6] | 0;
          this.Dl = _md_ts_1.SHA384_IV[7] | 0;
          this.Eh = _md_ts_1.SHA384_IV[8] | 0;
          this.El = _md_ts_1.SHA384_IV[9] | 0;
          this.Fh = _md_ts_1.SHA384_IV[10] | 0;
          this.Fl = _md_ts_1.SHA384_IV[11] | 0;
          this.Gh = _md_ts_1.SHA384_IV[12] | 0;
          this.Gl = _md_ts_1.SHA384_IV[13] | 0;
          this.Hh = _md_ts_1.SHA384_IV[14] | 0;
          this.Hl = _md_ts_1.SHA384_IV[15] | 0;
        }
      };
      exports2.SHA384 = SHA384;
      var T224_IV = /* @__PURE__ */ Uint32Array.from([
        2352822216,
        424955298,
        1944164710,
        2312950998,
        502970286,
        855612546,
        1738396948,
        1479516111,
        258812777,
        2077511080,
        2011393907,
        79989058,
        1067287976,
        1780299464,
        286451373,
        2446758561
      ]);
      var T256_IV = /* @__PURE__ */ Uint32Array.from([
        573645204,
        4230739756,
        2673172387,
        3360449730,
        596883563,
        1867755857,
        2520282905,
        1497426621,
        2519219938,
        2827943907,
        3193839141,
        1401305490,
        721525244,
        746961066,
        246885852,
        2177182882
      ]);
      var SHA512_224 = class extends SHA512 {
        constructor() {
          super(28);
          this.Ah = T224_IV[0] | 0;
          this.Al = T224_IV[1] | 0;
          this.Bh = T224_IV[2] | 0;
          this.Bl = T224_IV[3] | 0;
          this.Ch = T224_IV[4] | 0;
          this.Cl = T224_IV[5] | 0;
          this.Dh = T224_IV[6] | 0;
          this.Dl = T224_IV[7] | 0;
          this.Eh = T224_IV[8] | 0;
          this.El = T224_IV[9] | 0;
          this.Fh = T224_IV[10] | 0;
          this.Fl = T224_IV[11] | 0;
          this.Gh = T224_IV[12] | 0;
          this.Gl = T224_IV[13] | 0;
          this.Hh = T224_IV[14] | 0;
          this.Hl = T224_IV[15] | 0;
        }
      };
      exports2.SHA512_224 = SHA512_224;
      var SHA512_256 = class extends SHA512 {
        constructor() {
          super(32);
          this.Ah = T256_IV[0] | 0;
          this.Al = T256_IV[1] | 0;
          this.Bh = T256_IV[2] | 0;
          this.Bl = T256_IV[3] | 0;
          this.Ch = T256_IV[4] | 0;
          this.Cl = T256_IV[5] | 0;
          this.Dh = T256_IV[6] | 0;
          this.Dl = T256_IV[7] | 0;
          this.Eh = T256_IV[8] | 0;
          this.El = T256_IV[9] | 0;
          this.Fh = T256_IV[10] | 0;
          this.Fl = T256_IV[11] | 0;
          this.Gh = T256_IV[12] | 0;
          this.Gl = T256_IV[13] | 0;
          this.Hh = T256_IV[14] | 0;
          this.Hl = T256_IV[15] | 0;
        }
      };
      exports2.SHA512_256 = SHA512_256;
      exports2.sha256 = (0, utils_ts_1.createHasher)(() => new SHA256());
      exports2.sha224 = (0, utils_ts_1.createHasher)(() => new SHA224());
      exports2.sha512 = (0, utils_ts_1.createHasher)(() => new SHA512());
      exports2.sha384 = (0, utils_ts_1.createHasher)(() => new SHA384());
      exports2.sha512_256 = (0, utils_ts_1.createHasher)(() => new SHA512_256());
      exports2.sha512_224 = (0, utils_ts_1.createHasher)(() => new SHA512_224());
    }
  });

  // node_modules/@noble/hashes/sha256.js
  var require_sha2563 = __commonJS({
    "node_modules/@noble/hashes/sha256.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.sha224 = exports2.SHA224 = exports2.sha256 = exports2.SHA256 = void 0;
      var sha2_ts_1 = require_sha2();
      exports2.SHA256 = sha2_ts_1.SHA256;
      exports2.sha256 = sha2_ts_1.sha256;
      exports2.SHA224 = sha2_ts_1.SHA224;
      exports2.sha224 = sha2_ts_1.sha224;
    }
  });

  // node_modules/bitcoinjs-lib/src/crypto.js
  var require_crypto3 = __commonJS({
    "node_modules/bitcoinjs-lib/src/crypto.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.taggedHash = exports2.TAGGED_HASH_PREFIXES = exports2.TAGS = exports2.hash256 = exports2.hash160 = exports2.sha256 = exports2.sha1 = exports2.ripemd160 = void 0;
      var ripemd160_1 = require_ripemd160();
      var sha1_1 = require_sha1();
      var sha256_1 = require_sha2563();
      function ripemd160(buffer) {
        return Buffer.from((0, ripemd160_1.ripemd160)(Uint8Array.from(buffer)));
      }
      exports2.ripemd160 = ripemd160;
      function sha1(buffer) {
        return Buffer.from((0, sha1_1.sha1)(Uint8Array.from(buffer)));
      }
      exports2.sha1 = sha1;
      function sha256(buffer) {
        return Buffer.from((0, sha256_1.sha256)(Uint8Array.from(buffer)));
      }
      exports2.sha256 = sha256;
      function hash160(buffer) {
        return Buffer.from(
          (0, ripemd160_1.ripemd160)((0, sha256_1.sha256)(Uint8Array.from(buffer)))
        );
      }
      exports2.hash160 = hash160;
      function hash256(buffer) {
        return Buffer.from(
          (0, sha256_1.sha256)((0, sha256_1.sha256)(Uint8Array.from(buffer)))
        );
      }
      exports2.hash256 = hash256;
      exports2.TAGS = [
        "BIP0340/challenge",
        "BIP0340/aux",
        "BIP0340/nonce",
        "TapLeaf",
        "TapBranch",
        "TapSighash",
        "TapTweak",
        "KeyAgg list",
        "KeyAgg coefficient"
      ];
      exports2.TAGGED_HASH_PREFIXES = {
        "BIP0340/challenge": Buffer.from([
          123,
          181,
          45,
          122,
          159,
          239,
          88,
          50,
          62,
          177,
          191,
          122,
          64,
          125,
          179,
          130,
          210,
          243,
          242,
          216,
          27,
          177,
          34,
          79,
          73,
          254,
          81,
          143,
          109,
          72,
          211,
          124,
          123,
          181,
          45,
          122,
          159,
          239,
          88,
          50,
          62,
          177,
          191,
          122,
          64,
          125,
          179,
          130,
          210,
          243,
          242,
          216,
          27,
          177,
          34,
          79,
          73,
          254,
          81,
          143,
          109,
          72,
          211,
          124
        ]),
        "BIP0340/aux": Buffer.from([
          241,
          239,
          78,
          94,
          192,
          99,
          202,
          218,
          109,
          148,
          202,
          250,
          157,
          152,
          126,
          160,
          105,
          38,
          88,
          57,
          236,
          193,
          31,
          151,
          45,
          119,
          165,
          46,
          216,
          193,
          204,
          144,
          241,
          239,
          78,
          94,
          192,
          99,
          202,
          218,
          109,
          148,
          202,
          250,
          157,
          152,
          126,
          160,
          105,
          38,
          88,
          57,
          236,
          193,
          31,
          151,
          45,
          119,
          165,
          46,
          216,
          193,
          204,
          144
        ]),
        "BIP0340/nonce": Buffer.from([
          7,
          73,
          119,
          52,
          167,
          155,
          203,
          53,
          91,
          155,
          140,
          125,
          3,
          79,
          18,
          28,
          244,
          52,
          215,
          62,
          247,
          45,
          218,
          25,
          135,
          0,
          97,
          251,
          82,
          191,
          235,
          47,
          7,
          73,
          119,
          52,
          167,
          155,
          203,
          53,
          91,
          155,
          140,
          125,
          3,
          79,
          18,
          28,
          244,
          52,
          215,
          62,
          247,
          45,
          218,
          25,
          135,
          0,
          97,
          251,
          82,
          191,
          235,
          47
        ]),
        TapLeaf: Buffer.from([
          174,
          234,
          143,
          220,
          66,
          8,
          152,
          49,
          5,
          115,
          75,
          88,
          8,
          29,
          30,
          38,
          56,
          211,
          95,
          28,
          181,
          64,
          8,
          212,
          211,
          87,
          202,
          3,
          190,
          120,
          233,
          238,
          174,
          234,
          143,
          220,
          66,
          8,
          152,
          49,
          5,
          115,
          75,
          88,
          8,
          29,
          30,
          38,
          56,
          211,
          95,
          28,
          181,
          64,
          8,
          212,
          211,
          87,
          202,
          3,
          190,
          120,
          233,
          238
        ]),
        TapBranch: Buffer.from([
          25,
          65,
          161,
          242,
          229,
          110,
          185,
          95,
          162,
          169,
          241,
          148,
          190,
          92,
          1,
          247,
          33,
          111,
          51,
          237,
          130,
          176,
          145,
          70,
          52,
          144,
          208,
          91,
          245,
          22,
          160,
          21,
          25,
          65,
          161,
          242,
          229,
          110,
          185,
          95,
          162,
          169,
          241,
          148,
          190,
          92,
          1,
          247,
          33,
          111,
          51,
          237,
          130,
          176,
          145,
          70,
          52,
          144,
          208,
          91,
          245,
          22,
          160,
          21
        ]),
        TapSighash: Buffer.from([
          244,
          10,
          72,
          223,
          75,
          42,
          112,
          200,
          180,
          146,
          75,
          242,
          101,
          70,
          97,
          237,
          61,
          149,
          253,
          102,
          163,
          19,
          235,
          135,
          35,
          117,
          151,
          198,
          40,
          228,
          160,
          49,
          244,
          10,
          72,
          223,
          75,
          42,
          112,
          200,
          180,
          146,
          75,
          242,
          101,
          70,
          97,
          237,
          61,
          149,
          253,
          102,
          163,
          19,
          235,
          135,
          35,
          117,
          151,
          198,
          40,
          228,
          160,
          49
        ]),
        TapTweak: Buffer.from([
          232,
          15,
          225,
          99,
          156,
          156,
          160,
          80,
          227,
          175,
          27,
          57,
          193,
          67,
          198,
          62,
          66,
          156,
          188,
          235,
          21,
          217,
          64,
          251,
          181,
          197,
          161,
          244,
          175,
          87,
          197,
          233,
          232,
          15,
          225,
          99,
          156,
          156,
          160,
          80,
          227,
          175,
          27,
          57,
          193,
          67,
          198,
          62,
          66,
          156,
          188,
          235,
          21,
          217,
          64,
          251,
          181,
          197,
          161,
          244,
          175,
          87,
          197,
          233
        ]),
        "KeyAgg list": Buffer.from([
          72,
          28,
          151,
          28,
          60,
          11,
          70,
          215,
          240,
          178,
          117,
          174,
          89,
          141,
          78,
          44,
          126,
          215,
          49,
          156,
          89,
          74,
          92,
          110,
          199,
          158,
          160,
          212,
          153,
          2,
          148,
          240,
          72,
          28,
          151,
          28,
          60,
          11,
          70,
          215,
          240,
          178,
          117,
          174,
          89,
          141,
          78,
          44,
          126,
          215,
          49,
          156,
          89,
          74,
          92,
          110,
          199,
          158,
          160,
          212,
          153,
          2,
          148,
          240
        ]),
        "KeyAgg coefficient": Buffer.from([
          191,
          201,
          4,
          3,
          77,
          28,
          136,
          232,
          200,
          14,
          34,
          229,
          61,
          36,
          86,
          109,
          100,
          130,
          78,
          214,
          66,
          114,
          129,
          192,
          145,
          0,
          249,
          77,
          205,
          82,
          201,
          129,
          191,
          201,
          4,
          3,
          77,
          28,
          136,
          232,
          200,
          14,
          34,
          229,
          61,
          36,
          86,
          109,
          100,
          130,
          78,
          214,
          66,
          114,
          129,
          192,
          145,
          0,
          249,
          77,
          205,
          82,
          201,
          129
        ])
      };
      function taggedHash(prefix, data) {
        return sha256(Buffer.concat([exports2.TAGGED_HASH_PREFIXES[prefix], data]));
      }
      exports2.taggedHash = taggedHash;
    }
  });

  // node_modules/bs58check/node_modules/base-x/src/index.js
  var require_src3 = __commonJS({
    "node_modules/bs58check/node_modules/base-x/src/index.js"(exports2, module2) {
      "use strict";
      function base(ALPHABET) {
        if (ALPHABET.length >= 255) {
          throw new TypeError("Alphabet too long");
        }
        var BASE_MAP = new Uint8Array(256);
        for (var j = 0; j < BASE_MAP.length; j++) {
          BASE_MAP[j] = 255;
        }
        for (var i = 0; i < ALPHABET.length; i++) {
          var x = ALPHABET.charAt(i);
          var xc = x.charCodeAt(0);
          if (BASE_MAP[xc] !== 255) {
            throw new TypeError(x + " is ambiguous");
          }
          BASE_MAP[xc] = i;
        }
        var BASE = ALPHABET.length;
        var LEADER = ALPHABET.charAt(0);
        var FACTOR = Math.log(BASE) / Math.log(256);
        var iFACTOR = Math.log(256) / Math.log(BASE);
        function encode(source) {
          if (source instanceof Uint8Array) {
          } else if (ArrayBuffer.isView(source)) {
            source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
          } else if (Array.isArray(source)) {
            source = Uint8Array.from(source);
          }
          if (!(source instanceof Uint8Array)) {
            throw new TypeError("Expected Uint8Array");
          }
          if (source.length === 0) {
            return "";
          }
          var zeroes = 0;
          var length = 0;
          var pbegin = 0;
          var pend = source.length;
          while (pbegin !== pend && source[pbegin] === 0) {
            pbegin++;
            zeroes++;
          }
          var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
          var b58 = new Uint8Array(size);
          while (pbegin !== pend) {
            var carry = source[pbegin];
            var i2 = 0;
            for (var it1 = size - 1; (carry !== 0 || i2 < length) && it1 !== -1; it1--, i2++) {
              carry += 256 * b58[it1] >>> 0;
              b58[it1] = carry % BASE >>> 0;
              carry = carry / BASE >>> 0;
            }
            if (carry !== 0) {
              throw new Error("Non-zero carry");
            }
            length = i2;
            pbegin++;
          }
          var it2 = size - length;
          while (it2 !== size && b58[it2] === 0) {
            it2++;
          }
          var str = LEADER.repeat(zeroes);
          for (; it2 < size; ++it2) {
            str += ALPHABET.charAt(b58[it2]);
          }
          return str;
        }
        function decodeUnsafe(source) {
          if (typeof source !== "string") {
            throw new TypeError("Expected String");
          }
          if (source.length === 0) {
            return new Uint8Array();
          }
          var psz = 0;
          var zeroes = 0;
          var length = 0;
          while (source[psz] === LEADER) {
            zeroes++;
            psz++;
          }
          var size = (source.length - psz) * FACTOR + 1 >>> 0;
          var b256 = new Uint8Array(size);
          while (source[psz]) {
            var charCode = source.charCodeAt(psz);
            if (charCode > 255) {
              return;
            }
            var carry = BASE_MAP[charCode];
            if (carry === 255) {
              return;
            }
            var i2 = 0;
            for (var it3 = size - 1; (carry !== 0 || i2 < length) && it3 !== -1; it3--, i2++) {
              carry += BASE * b256[it3] >>> 0;
              b256[it3] = carry % 256 >>> 0;
              carry = carry / 256 >>> 0;
            }
            if (carry !== 0) {
              throw new Error("Non-zero carry");
            }
            length = i2;
            psz++;
          }
          var it4 = size - length;
          while (it4 !== size && b256[it4] === 0) {
            it4++;
          }
          var vch = new Uint8Array(zeroes + (size - it4));
          var j2 = zeroes;
          while (it4 !== size) {
            vch[j2++] = b256[it4++];
          }
          return vch;
        }
        function decode(string) {
          var buffer = decodeUnsafe(string);
          if (buffer) {
            return buffer;
          }
          throw new Error("Non-base" + BASE + " character");
        }
        return {
          encode,
          decodeUnsafe,
          decode
        };
      }
      module2.exports = base;
    }
  });

  // node_modules/bs58check/node_modules/bs58/index.js
  var require_bs58 = __commonJS({
    "node_modules/bs58check/node_modules/bs58/index.js"(exports2, module2) {
      var basex = require_src3();
      var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
      module2.exports = basex(ALPHABET);
    }
  });

  // node_modules/bs58check/base.js
  var require_base = __commonJS({
    "node_modules/bs58check/base.js"(exports2, module2) {
      "use strict";
      var base58 = require_bs58();
      module2.exports = function(checksumFn) {
        function encode(payload) {
          var payloadU8 = Uint8Array.from(payload);
          var checksum = checksumFn(payloadU8);
          var length = payloadU8.length + 4;
          var both = new Uint8Array(length);
          both.set(payloadU8, 0);
          both.set(checksum.subarray(0, 4), payloadU8.length);
          return base58.encode(both, length);
        }
        function decodeRaw(buffer) {
          var payload = buffer.slice(0, -4);
          var checksum = buffer.slice(-4);
          var newChecksum = checksumFn(payload);
          if (checksum[0] ^ newChecksum[0] | checksum[1] ^ newChecksum[1] | checksum[2] ^ newChecksum[2] | checksum[3] ^ newChecksum[3]) return;
          return payload;
        }
        function decodeUnsafe(string) {
          var buffer = base58.decodeUnsafe(string);
          if (!buffer) return;
          return decodeRaw(buffer);
        }
        function decode(string) {
          var buffer = base58.decode(string);
          var payload = decodeRaw(buffer, checksumFn);
          if (!payload) throw new Error("Invalid checksum");
          return payload;
        }
        return {
          encode,
          decode,
          decodeUnsafe
        };
      };
    }
  });

  // node_modules/bs58check/index.js
  var require_bs58check = __commonJS({
    "node_modules/bs58check/index.js"(exports2, module2) {
      "use strict";
      var { sha256 } = require_sha2563();
      var bs58checkBase = require_base();
      function sha256x2(buffer) {
        return sha256(sha256(buffer));
      }
      module2.exports = bs58checkBase(sha256x2);
    }
  });

  // node_modules/bitcoinjs-lib/src/payments/p2pkh.js
  var require_p2pkh = __commonJS({
    "node_modules/bitcoinjs-lib/src/payments/p2pkh.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.p2pkh = void 0;
      var bcrypto = require_crypto3();
      var networks_1 = require_networks();
      var bscript = require_script();
      var types_1 = require_types2();
      var lazy = require_lazy();
      var bs58check = require_bs58check();
      var OPS = bscript.OPS;
      function p2pkh(a, opts) {
        if (!a.address && !a.hash && !a.output && !a.pubkey && !a.input)
          throw new TypeError("Not enough data");
        opts = Object.assign({ validate: true }, opts || {});
        (0, types_1.typeforce)(
          {
            network: types_1.typeforce.maybe(types_1.typeforce.Object),
            address: types_1.typeforce.maybe(types_1.typeforce.String),
            hash: types_1.typeforce.maybe(types_1.typeforce.BufferN(20)),
            output: types_1.typeforce.maybe(types_1.typeforce.BufferN(25)),
            pubkey: types_1.typeforce.maybe(types_1.isPoint),
            signature: types_1.typeforce.maybe(bscript.isCanonicalScriptSignature),
            input: types_1.typeforce.maybe(types_1.typeforce.Buffer)
          },
          a
        );
        const _address = lazy.value(() => {
          const payload = Buffer.from(bs58check.decode(a.address));
          const version = payload.readUInt8(0);
          const hash2 = payload.slice(1);
          return { version, hash: hash2 };
        });
        const _chunks = lazy.value(() => {
          return bscript.decompile(a.input);
        });
        const network = a.network || networks_1.bitcoin;
        const o = { name: "p2pkh", network };
        lazy.prop(o, "address", () => {
          if (!o.hash) return;
          const payload = Buffer.allocUnsafe(21);
          payload.writeUInt8(network.pubKeyHash, 0);
          o.hash.copy(payload, 1);
          return bs58check.encode(payload);
        });
        lazy.prop(o, "hash", () => {
          if (a.output) return a.output.slice(3, 23);
          if (a.address) return _address().hash;
          if (a.pubkey || o.pubkey) return bcrypto.hash160(a.pubkey || o.pubkey);
        });
        lazy.prop(o, "output", () => {
          if (!o.hash) return;
          return bscript.compile([
            OPS.OP_DUP,
            OPS.OP_HASH160,
            o.hash,
            OPS.OP_EQUALVERIFY,
            OPS.OP_CHECKSIG
          ]);
        });
        lazy.prop(o, "pubkey", () => {
          if (!a.input) return;
          return _chunks()[1];
        });
        lazy.prop(o, "signature", () => {
          if (!a.input) return;
          return _chunks()[0];
        });
        lazy.prop(o, "input", () => {
          if (!a.pubkey) return;
          if (!a.signature) return;
          return bscript.compile([a.signature, a.pubkey]);
        });
        lazy.prop(o, "witness", () => {
          if (!o.input) return;
          return [];
        });
        if (opts.validate) {
          let hash2 = Buffer.from([]);
          if (a.address) {
            if (_address().version !== network.pubKeyHash)
              throw new TypeError("Invalid version or Network mismatch");
            if (_address().hash.length !== 20) throw new TypeError("Invalid address");
            hash2 = _address().hash;
          }
          if (a.hash) {
            if (hash2.length > 0 && !hash2.equals(a.hash))
              throw new TypeError("Hash mismatch");
            else hash2 = a.hash;
          }
          if (a.output) {
            if (a.output.length !== 25 || a.output[0] !== OPS.OP_DUP || a.output[1] !== OPS.OP_HASH160 || a.output[2] !== 20 || a.output[23] !== OPS.OP_EQUALVERIFY || a.output[24] !== OPS.OP_CHECKSIG)
              throw new TypeError("Output is invalid");
            const hash22 = a.output.slice(3, 23);
            if (hash2.length > 0 && !hash2.equals(hash22))
              throw new TypeError("Hash mismatch");
            else hash2 = hash22;
          }
          if (a.pubkey) {
            const pkh = bcrypto.hash160(a.pubkey);
            if (hash2.length > 0 && !hash2.equals(pkh))
              throw new TypeError("Hash mismatch");
            else hash2 = pkh;
          }
          if (a.input) {
            const chunks = _chunks();
            if (chunks.length !== 2) throw new TypeError("Input is invalid");
            if (!bscript.isCanonicalScriptSignature(chunks[0]))
              throw new TypeError("Input has invalid signature");
            if (!(0, types_1.isPoint)(chunks[1]))
              throw new TypeError("Input has invalid pubkey");
            if (a.signature && !a.signature.equals(chunks[0]))
              throw new TypeError("Signature mismatch");
            if (a.pubkey && !a.pubkey.equals(chunks[1]))
              throw new TypeError("Pubkey mismatch");
            const pkh = bcrypto.hash160(chunks[1]);
            if (hash2.length > 0 && !hash2.equals(pkh))
              throw new TypeError("Hash mismatch");
          }
        }
        return Object.assign(o, a);
      }
      exports2.p2pkh = p2pkh;
    }
  });

  // node_modules/bitcoinjs-lib/src/payments/p2sh.js
  var require_p2sh = __commonJS({
    "node_modules/bitcoinjs-lib/src/payments/p2sh.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.p2sh = void 0;
      var bcrypto = require_crypto3();
      var networks_1 = require_networks();
      var bscript = require_script();
      var types_1 = require_types2();
      var lazy = require_lazy();
      var bs58check = require_bs58check();
      var OPS = bscript.OPS;
      function p2sh(a, opts) {
        if (!a.address && !a.hash && !a.output && !a.redeem && !a.input)
          throw new TypeError("Not enough data");
        opts = Object.assign({ validate: true }, opts || {});
        (0, types_1.typeforce)(
          {
            network: types_1.typeforce.maybe(types_1.typeforce.Object),
            address: types_1.typeforce.maybe(types_1.typeforce.String),
            hash: types_1.typeforce.maybe(types_1.typeforce.BufferN(20)),
            output: types_1.typeforce.maybe(types_1.typeforce.BufferN(23)),
            redeem: types_1.typeforce.maybe({
              network: types_1.typeforce.maybe(types_1.typeforce.Object),
              output: types_1.typeforce.maybe(types_1.typeforce.Buffer),
              input: types_1.typeforce.maybe(types_1.typeforce.Buffer),
              witness: types_1.typeforce.maybe(
                types_1.typeforce.arrayOf(types_1.typeforce.Buffer)
              )
            }),
            input: types_1.typeforce.maybe(types_1.typeforce.Buffer),
            witness: types_1.typeforce.maybe(
              types_1.typeforce.arrayOf(types_1.typeforce.Buffer)
            )
          },
          a
        );
        let network = a.network;
        if (!network) {
          network = a.redeem && a.redeem.network || networks_1.bitcoin;
        }
        const o = { network };
        const _address = lazy.value(() => {
          const payload = Buffer.from(bs58check.decode(a.address));
          const version = payload.readUInt8(0);
          const hash2 = payload.slice(1);
          return { version, hash: hash2 };
        });
        const _chunks = lazy.value(() => {
          return bscript.decompile(a.input);
        });
        const _redeem = lazy.value(() => {
          const chunks = _chunks();
          const lastChunk = chunks[chunks.length - 1];
          return {
            network,
            output: lastChunk === OPS.OP_FALSE ? Buffer.from([]) : lastChunk,
            input: bscript.compile(chunks.slice(0, -1)),
            witness: a.witness || []
          };
        });
        lazy.prop(o, "address", () => {
          if (!o.hash) return;
          const payload = Buffer.allocUnsafe(21);
          payload.writeUInt8(o.network.scriptHash, 0);
          o.hash.copy(payload, 1);
          return bs58check.encode(payload);
        });
        lazy.prop(o, "hash", () => {
          if (a.output) return a.output.slice(2, 22);
          if (a.address) return _address().hash;
          if (o.redeem && o.redeem.output) return bcrypto.hash160(o.redeem.output);
        });
        lazy.prop(o, "output", () => {
          if (!o.hash) return;
          return bscript.compile([OPS.OP_HASH160, o.hash, OPS.OP_EQUAL]);
        });
        lazy.prop(o, "redeem", () => {
          if (!a.input) return;
          return _redeem();
        });
        lazy.prop(o, "input", () => {
          if (!a.redeem || !a.redeem.input || !a.redeem.output) return;
          return bscript.compile(
            [].concat(bscript.decompile(a.redeem.input), a.redeem.output)
          );
        });
        lazy.prop(o, "witness", () => {
          if (o.redeem && o.redeem.witness) return o.redeem.witness;
          if (o.input) return [];
        });
        lazy.prop(o, "name", () => {
          const nameParts = ["p2sh"];
          if (o.redeem !== void 0 && o.redeem.name !== void 0)
            nameParts.push(o.redeem.name);
          return nameParts.join("-");
        });
        if (opts.validate) {
          let hash2 = Buffer.from([]);
          if (a.address) {
            if (_address().version !== network.scriptHash)
              throw new TypeError("Invalid version or Network mismatch");
            if (_address().hash.length !== 20) throw new TypeError("Invalid address");
            hash2 = _address().hash;
          }
          if (a.hash) {
            if (hash2.length > 0 && !hash2.equals(a.hash))
              throw new TypeError("Hash mismatch");
            else hash2 = a.hash;
          }
          if (a.output) {
            if (a.output.length !== 23 || a.output[0] !== OPS.OP_HASH160 || a.output[1] !== 20 || a.output[22] !== OPS.OP_EQUAL)
              throw new TypeError("Output is invalid");
            const hash22 = a.output.slice(2, 22);
            if (hash2.length > 0 && !hash2.equals(hash22))
              throw new TypeError("Hash mismatch");
            else hash2 = hash22;
          }
          const checkRedeem = (redeem) => {
            if (redeem.output) {
              const decompile = bscript.decompile(redeem.output);
              if (!decompile || decompile.length < 1)
                throw new TypeError("Redeem.output too short");
              if (redeem.output.byteLength > 520)
                throw new TypeError(
                  "Redeem.output unspendable if larger than 520 bytes"
                );
              if (bscript.countNonPushOnlyOPs(decompile) > 201)
                throw new TypeError(
                  "Redeem.output unspendable with more than 201 non-push ops"
                );
              const hash22 = bcrypto.hash160(redeem.output);
              if (hash2.length > 0 && !hash2.equals(hash22))
                throw new TypeError("Hash mismatch");
              else hash2 = hash22;
            }
            if (redeem.input) {
              const hasInput = redeem.input.length > 0;
              const hasWitness = redeem.witness && redeem.witness.length > 0;
              if (!hasInput && !hasWitness) throw new TypeError("Empty input");
              if (hasInput && hasWitness)
                throw new TypeError("Input and witness provided");
              if (hasInput) {
                const richunks = bscript.decompile(redeem.input);
                if (!bscript.isPushOnly(richunks))
                  throw new TypeError("Non push-only scriptSig");
              }
            }
          };
          if (a.input) {
            const chunks = _chunks();
            if (!chunks || chunks.length < 1) throw new TypeError("Input too short");
            if (!Buffer.isBuffer(_redeem().output))
              throw new TypeError("Input is invalid");
            checkRedeem(_redeem());
          }
          if (a.redeem) {
            if (a.redeem.network && a.redeem.network !== network)
              throw new TypeError("Network mismatch");
            if (a.input) {
              const redeem = _redeem();
              if (a.redeem.output && !a.redeem.output.equals(redeem.output))
                throw new TypeError("Redeem.output mismatch");
              if (a.redeem.input && !a.redeem.input.equals(redeem.input))
                throw new TypeError("Redeem.input mismatch");
            }
            checkRedeem(a.redeem);
          }
          if (a.witness) {
            if (a.redeem && a.redeem.witness && !(0, types_1.stacksEqual)(a.redeem.witness, a.witness))
              throw new TypeError("Witness and redeem.witness mismatch");
          }
        }
        return Object.assign(o, a);
      }
      exports2.p2sh = p2sh;
    }
  });

  // node_modules/bech32/dist/index.js
  var require_dist = __commonJS({
    "node_modules/bech32/dist/index.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.bech32m = exports2.bech32 = void 0;
      var ALPHABET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
      var ALPHABET_MAP = {};
      for (let z = 0; z < ALPHABET.length; z++) {
        const x = ALPHABET.charAt(z);
        ALPHABET_MAP[x] = z;
      }
      function polymodStep(pre) {
        const b = pre >> 25;
        return (pre & 33554431) << 5 ^ -(b >> 0 & 1) & 996825010 ^ -(b >> 1 & 1) & 642813549 ^ -(b >> 2 & 1) & 513874426 ^ -(b >> 3 & 1) & 1027748829 ^ -(b >> 4 & 1) & 705979059;
      }
      function prefixChk(prefix) {
        let chk = 1;
        for (let i = 0; i < prefix.length; ++i) {
          const c = prefix.charCodeAt(i);
          if (c < 33 || c > 126)
            return "Invalid prefix (" + prefix + ")";
          chk = polymodStep(chk) ^ c >> 5;
        }
        chk = polymodStep(chk);
        for (let i = 0; i < prefix.length; ++i) {
          const v = prefix.charCodeAt(i);
          chk = polymodStep(chk) ^ v & 31;
        }
        return chk;
      }
      function convert3(data, inBits, outBits, pad) {
        let value = 0;
        let bits = 0;
        const maxV = (1 << outBits) - 1;
        const result = [];
        for (let i = 0; i < data.length; ++i) {
          value = value << inBits | data[i];
          bits += inBits;
          while (bits >= outBits) {
            bits -= outBits;
            result.push(value >> bits & maxV);
          }
        }
        if (pad) {
          if (bits > 0) {
            result.push(value << outBits - bits & maxV);
          }
        } else {
          if (bits >= inBits)
            return "Excess padding";
          if (value << outBits - bits & maxV)
            return "Non-zero padding";
        }
        return result;
      }
      function toWords(bytes) {
        return convert3(bytes, 8, 5, true);
      }
      function fromWordsUnsafe(words) {
        const res = convert3(words, 5, 8, false);
        if (Array.isArray(res))
          return res;
      }
      function fromWords(words) {
        const res = convert3(words, 5, 8, false);
        if (Array.isArray(res))
          return res;
        throw new Error(res);
      }
      function getLibraryFromEncoding(encoding) {
        let ENCODING_CONST;
        if (encoding === "bech32") {
          ENCODING_CONST = 1;
        } else {
          ENCODING_CONST = 734539939;
        }
        function encode(prefix, words, LIMIT) {
          LIMIT = LIMIT || 90;
          if (prefix.length + 7 + words.length > LIMIT)
            throw new TypeError("Exceeds length limit");
          prefix = prefix.toLowerCase();
          let chk = prefixChk(prefix);
          if (typeof chk === "string")
            throw new Error(chk);
          let result = prefix + "1";
          for (let i = 0; i < words.length; ++i) {
            const x = words[i];
            if (x >> 5 !== 0)
              throw new Error("Non 5-bit word");
            chk = polymodStep(chk) ^ x;
            result += ALPHABET.charAt(x);
          }
          for (let i = 0; i < 6; ++i) {
            chk = polymodStep(chk);
          }
          chk ^= ENCODING_CONST;
          for (let i = 0; i < 6; ++i) {
            const v = chk >> (5 - i) * 5 & 31;
            result += ALPHABET.charAt(v);
          }
          return result;
        }
        function __decode(str, LIMIT) {
          LIMIT = LIMIT || 90;
          if (str.length < 8)
            return str + " too short";
          if (str.length > LIMIT)
            return "Exceeds length limit";
          const lowered = str.toLowerCase();
          const uppered = str.toUpperCase();
          if (str !== lowered && str !== uppered)
            return "Mixed-case string " + str;
          str = lowered;
          const split = str.lastIndexOf("1");
          if (split === -1)
            return "No separator character for " + str;
          if (split === 0)
            return "Missing prefix for " + str;
          const prefix = str.slice(0, split);
          const wordChars = str.slice(split + 1);
          if (wordChars.length < 6)
            return "Data too short";
          let chk = prefixChk(prefix);
          if (typeof chk === "string")
            return chk;
          const words = [];
          for (let i = 0; i < wordChars.length; ++i) {
            const c = wordChars.charAt(i);
            const v = ALPHABET_MAP[c];
            if (v === void 0)
              return "Unknown character " + c;
            chk = polymodStep(chk) ^ v;
            if (i + 6 >= wordChars.length)
              continue;
            words.push(v);
          }
          if (chk !== ENCODING_CONST)
            return "Invalid checksum for " + str;
          return { prefix, words };
        }
        function decodeUnsafe(str, LIMIT) {
          const res = __decode(str, LIMIT);
          if (typeof res === "object")
            return res;
        }
        function decode(str, LIMIT) {
          const res = __decode(str, LIMIT);
          if (typeof res === "object")
            return res;
          throw new Error(res);
        }
        return {
          decodeUnsafe,
          decode,
          encode,
          toWords,
          fromWordsUnsafe,
          fromWords
        };
      }
      exports2.bech32 = getLibraryFromEncoding("bech32");
      exports2.bech32m = getLibraryFromEncoding("bech32m");
    }
  });

  // node_modules/bitcoinjs-lib/src/payments/p2wpkh.js
  var require_p2wpkh = __commonJS({
    "node_modules/bitcoinjs-lib/src/payments/p2wpkh.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.p2wpkh = void 0;
      var bcrypto = require_crypto3();
      var networks_1 = require_networks();
      var bscript = require_script();
      var types_1 = require_types2();
      var lazy = require_lazy();
      var bech32_1 = require_dist();
      var OPS = bscript.OPS;
      var EMPTY_BUFFER = Buffer.alloc(0);
      function p2wpkh(a, opts) {
        if (!a.address && !a.hash && !a.output && !a.pubkey && !a.witness)
          throw new TypeError("Not enough data");
        opts = Object.assign({ validate: true }, opts || {});
        (0, types_1.typeforce)(
          {
            address: types_1.typeforce.maybe(types_1.typeforce.String),
            hash: types_1.typeforce.maybe(types_1.typeforce.BufferN(20)),
            input: types_1.typeforce.maybe(types_1.typeforce.BufferN(0)),
            network: types_1.typeforce.maybe(types_1.typeforce.Object),
            output: types_1.typeforce.maybe(types_1.typeforce.BufferN(22)),
            pubkey: types_1.typeforce.maybe(types_1.isPoint),
            signature: types_1.typeforce.maybe(bscript.isCanonicalScriptSignature),
            witness: types_1.typeforce.maybe(
              types_1.typeforce.arrayOf(types_1.typeforce.Buffer)
            )
          },
          a
        );
        const _address = lazy.value(() => {
          const result = bech32_1.bech32.decode(a.address);
          const version = result.words.shift();
          const data = bech32_1.bech32.fromWords(result.words);
          return {
            version,
            prefix: result.prefix,
            data: Buffer.from(data)
          };
        });
        const network = a.network || networks_1.bitcoin;
        const o = { name: "p2wpkh", network };
        lazy.prop(o, "address", () => {
          if (!o.hash) return;
          const words = bech32_1.bech32.toWords(o.hash);
          words.unshift(0);
          return bech32_1.bech32.encode(network.bech32, words);
        });
        lazy.prop(o, "hash", () => {
          if (a.output) return a.output.slice(2, 22);
          if (a.address) return _address().data;
          if (a.pubkey || o.pubkey) return bcrypto.hash160(a.pubkey || o.pubkey);
        });
        lazy.prop(o, "output", () => {
          if (!o.hash) return;
          return bscript.compile([OPS.OP_0, o.hash]);
        });
        lazy.prop(o, "pubkey", () => {
          if (a.pubkey) return a.pubkey;
          if (!a.witness) return;
          return a.witness[1];
        });
        lazy.prop(o, "signature", () => {
          if (!a.witness) return;
          return a.witness[0];
        });
        lazy.prop(o, "input", () => {
          if (!o.witness) return;
          return EMPTY_BUFFER;
        });
        lazy.prop(o, "witness", () => {
          if (!a.pubkey) return;
          if (!a.signature) return;
          return [a.signature, a.pubkey];
        });
        if (opts.validate) {
          let hash2 = Buffer.from([]);
          if (a.address) {
            if (network && network.bech32 !== _address().prefix)
              throw new TypeError("Invalid prefix or Network mismatch");
            if (_address().version !== 0)
              throw new TypeError("Invalid address version");
            if (_address().data.length !== 20)
              throw new TypeError("Invalid address data");
            hash2 = _address().data;
          }
          if (a.hash) {
            if (hash2.length > 0 && !hash2.equals(a.hash))
              throw new TypeError("Hash mismatch");
            else hash2 = a.hash;
          }
          if (a.output) {
            if (a.output.length !== 22 || a.output[0] !== OPS.OP_0 || a.output[1] !== 20)
              throw new TypeError("Output is invalid");
            if (hash2.length > 0 && !hash2.equals(a.output.slice(2)))
              throw new TypeError("Hash mismatch");
            else hash2 = a.output.slice(2);
          }
          if (a.pubkey) {
            const pkh = bcrypto.hash160(a.pubkey);
            if (hash2.length > 0 && !hash2.equals(pkh))
              throw new TypeError("Hash mismatch");
            else hash2 = pkh;
            if (!(0, types_1.isPoint)(a.pubkey) || a.pubkey.length !== 33)
              throw new TypeError("Invalid pubkey for p2wpkh");
          }
          if (a.witness) {
            if (a.witness.length !== 2) throw new TypeError("Witness is invalid");
            if (!bscript.isCanonicalScriptSignature(a.witness[0]))
              throw new TypeError("Witness has invalid signature");
            if (!(0, types_1.isPoint)(a.witness[1]) || a.witness[1].length !== 33)
              throw new TypeError("Witness has invalid pubkey");
            if (a.signature && !a.signature.equals(a.witness[0]))
              throw new TypeError("Signature mismatch");
            if (a.pubkey && !a.pubkey.equals(a.witness[1]))
              throw new TypeError("Pubkey mismatch");
            const pkh = bcrypto.hash160(a.witness[1]);
            if (hash2.length > 0 && !hash2.equals(pkh))
              throw new TypeError("Hash mismatch");
          }
        }
        return Object.assign(o, a);
      }
      exports2.p2wpkh = p2wpkh;
    }
  });

  // node_modules/bitcoinjs-lib/src/payments/p2wsh.js
  var require_p2wsh = __commonJS({
    "node_modules/bitcoinjs-lib/src/payments/p2wsh.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.p2wsh = void 0;
      var bcrypto = require_crypto3();
      var networks_1 = require_networks();
      var bscript = require_script();
      var types_1 = require_types2();
      var lazy = require_lazy();
      var bech32_1 = require_dist();
      var OPS = bscript.OPS;
      var EMPTY_BUFFER = Buffer.alloc(0);
      function chunkHasUncompressedPubkey(chunk) {
        if (Buffer.isBuffer(chunk) && chunk.length === 65 && chunk[0] === 4 && (0, types_1.isPoint)(chunk)) {
          return true;
        } else {
          return false;
        }
      }
      function p2wsh(a, opts) {
        if (!a.address && !a.hash && !a.output && !a.redeem && !a.witness)
          throw new TypeError("Not enough data");
        opts = Object.assign({ validate: true }, opts || {});
        (0, types_1.typeforce)(
          {
            network: types_1.typeforce.maybe(types_1.typeforce.Object),
            address: types_1.typeforce.maybe(types_1.typeforce.String),
            hash: types_1.typeforce.maybe(types_1.typeforce.BufferN(32)),
            output: types_1.typeforce.maybe(types_1.typeforce.BufferN(34)),
            redeem: types_1.typeforce.maybe({
              input: types_1.typeforce.maybe(types_1.typeforce.Buffer),
              network: types_1.typeforce.maybe(types_1.typeforce.Object),
              output: types_1.typeforce.maybe(types_1.typeforce.Buffer),
              witness: types_1.typeforce.maybe(
                types_1.typeforce.arrayOf(types_1.typeforce.Buffer)
              )
            }),
            input: types_1.typeforce.maybe(types_1.typeforce.BufferN(0)),
            witness: types_1.typeforce.maybe(
              types_1.typeforce.arrayOf(types_1.typeforce.Buffer)
            )
          },
          a
        );
        const _address = lazy.value(() => {
          const result = bech32_1.bech32.decode(a.address);
          const version = result.words.shift();
          const data = bech32_1.bech32.fromWords(result.words);
          return {
            version,
            prefix: result.prefix,
            data: Buffer.from(data)
          };
        });
        const _rchunks = lazy.value(() => {
          return bscript.decompile(a.redeem.input);
        });
        let network = a.network;
        if (!network) {
          network = a.redeem && a.redeem.network || networks_1.bitcoin;
        }
        const o = { network };
        lazy.prop(o, "address", () => {
          if (!o.hash) return;
          const words = bech32_1.bech32.toWords(o.hash);
          words.unshift(0);
          return bech32_1.bech32.encode(network.bech32, words);
        });
        lazy.prop(o, "hash", () => {
          if (a.output) return a.output.slice(2);
          if (a.address) return _address().data;
          if (o.redeem && o.redeem.output) return bcrypto.sha256(o.redeem.output);
        });
        lazy.prop(o, "output", () => {
          if (!o.hash) return;
          return bscript.compile([OPS.OP_0, o.hash]);
        });
        lazy.prop(o, "redeem", () => {
          if (!a.witness) return;
          return {
            output: a.witness[a.witness.length - 1],
            input: EMPTY_BUFFER,
            witness: a.witness.slice(0, -1)
          };
        });
        lazy.prop(o, "input", () => {
          if (!o.witness) return;
          return EMPTY_BUFFER;
        });
        lazy.prop(o, "witness", () => {
          if (a.redeem && a.redeem.input && a.redeem.input.length > 0 && a.redeem.output && a.redeem.output.length > 0) {
            const stack = bscript.toStack(_rchunks());
            o.redeem = Object.assign({ witness: stack }, a.redeem);
            o.redeem.input = EMPTY_BUFFER;
            return [].concat(stack, a.redeem.output);
          }
          if (!a.redeem) return;
          if (!a.redeem.output) return;
          if (!a.redeem.witness) return;
          return [].concat(a.redeem.witness, a.redeem.output);
        });
        lazy.prop(o, "name", () => {
          const nameParts = ["p2wsh"];
          if (o.redeem !== void 0 && o.redeem.name !== void 0)
            nameParts.push(o.redeem.name);
          return nameParts.join("-");
        });
        if (opts.validate) {
          let hash2 = Buffer.from([]);
          if (a.address) {
            if (_address().prefix !== network.bech32)
              throw new TypeError("Invalid prefix or Network mismatch");
            if (_address().version !== 0)
              throw new TypeError("Invalid address version");
            if (_address().data.length !== 32)
              throw new TypeError("Invalid address data");
            hash2 = _address().data;
          }
          if (a.hash) {
            if (hash2.length > 0 && !hash2.equals(a.hash))
              throw new TypeError("Hash mismatch");
            else hash2 = a.hash;
          }
          if (a.output) {
            if (a.output.length !== 34 || a.output[0] !== OPS.OP_0 || a.output[1] !== 32)
              throw new TypeError("Output is invalid");
            const hash22 = a.output.slice(2);
            if (hash2.length > 0 && !hash2.equals(hash22))
              throw new TypeError("Hash mismatch");
            else hash2 = hash22;
          }
          if (a.redeem) {
            if (a.redeem.network && a.redeem.network !== network)
              throw new TypeError("Network mismatch");
            if (a.redeem.input && a.redeem.input.length > 0 && a.redeem.witness && a.redeem.witness.length > 0)
              throw new TypeError("Ambiguous witness source");
            if (a.redeem.output) {
              const decompile = bscript.decompile(a.redeem.output);
              if (!decompile || decompile.length < 1)
                throw new TypeError("Redeem.output is invalid");
              if (a.redeem.output.byteLength > 3600)
                throw new TypeError(
                  "Redeem.output unspendable if larger than 3600 bytes"
                );
              if (bscript.countNonPushOnlyOPs(decompile) > 201)
                throw new TypeError(
                  "Redeem.output unspendable with more than 201 non-push ops"
                );
              const hash22 = bcrypto.sha256(a.redeem.output);
              if (hash2.length > 0 && !hash2.equals(hash22))
                throw new TypeError("Hash mismatch");
              else hash2 = hash22;
            }
            if (a.redeem.input && !bscript.isPushOnly(_rchunks()))
              throw new TypeError("Non push-only scriptSig");
            if (a.witness && a.redeem.witness && !(0, types_1.stacksEqual)(a.witness, a.redeem.witness))
              throw new TypeError("Witness and redeem.witness mismatch");
            if (a.redeem.input && _rchunks().some(chunkHasUncompressedPubkey) || a.redeem.output && (bscript.decompile(a.redeem.output) || []).some(
              chunkHasUncompressedPubkey
            )) {
              throw new TypeError(
                "redeem.input or redeem.output contains uncompressed pubkey"
              );
            }
          }
          if (a.witness && a.witness.length > 0) {
            const wScript = a.witness[a.witness.length - 1];
            if (a.redeem && a.redeem.output && !a.redeem.output.equals(wScript))
              throw new TypeError("Witness and redeem.output mismatch");
            if (a.witness.some(chunkHasUncompressedPubkey) || (bscript.decompile(wScript) || []).some(chunkHasUncompressedPubkey))
              throw new TypeError("Witness contains uncompressed pubkey");
          }
        }
        return Object.assign(o, a);
      }
      exports2.p2wsh = p2wsh;
    }
  });

  // node_modules/bitcoinjs-lib/src/ecc_lib.js
  var require_ecc_lib = __commonJS({
    "node_modules/bitcoinjs-lib/src/ecc_lib.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.getEccLib = exports2.initEccLib = void 0;
      var _ECCLIB_CACHE = {};
      function initEccLib2(eccLib, opts) {
        if (!eccLib) {
          _ECCLIB_CACHE.eccLib = eccLib;
        } else if (eccLib !== _ECCLIB_CACHE.eccLib) {
          if (!opts?.DANGER_DO_NOT_VERIFY_ECCLIB)
            verifyEcc(eccLib);
          _ECCLIB_CACHE.eccLib = eccLib;
        }
      }
      exports2.initEccLib = initEccLib2;
      function getEccLib() {
        if (!_ECCLIB_CACHE.eccLib)
          throw new Error(
            "No ECC Library provided. You must call initEccLib() with a valid TinySecp256k1Interface instance"
          );
        return _ECCLIB_CACHE.eccLib;
      }
      exports2.getEccLib = getEccLib;
      var h = (hex) => Buffer.from(hex, "hex");
      function verifyEcc(ecc2) {
        assert(typeof ecc2.isXOnlyPoint === "function");
        assert(
          ecc2.isXOnlyPoint(
            h("79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798")
          )
        );
        assert(
          ecc2.isXOnlyPoint(
            h("fffffffffffffffffffffffffffffffffffffffffffffffffffffffeeffffc2e")
          )
        );
        assert(
          ecc2.isXOnlyPoint(
            h("f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9")
          )
        );
        assert(
          ecc2.isXOnlyPoint(
            h("0000000000000000000000000000000000000000000000000000000000000001")
          )
        );
        assert(
          !ecc2.isXOnlyPoint(
            h("0000000000000000000000000000000000000000000000000000000000000000")
          )
        );
        assert(
          !ecc2.isXOnlyPoint(
            h("fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f")
          )
        );
        assert(typeof ecc2.xOnlyPointAddTweak === "function");
        tweakAddVectors.forEach((t) => {
          const r = ecc2.xOnlyPointAddTweak(h(t.pubkey), h(t.tweak));
          if (t.result === null) {
            assert(r === null);
          } else {
            assert(r !== null);
            assert(r.parity === t.parity);
            assert(Buffer.from(r.xOnlyPubkey).equals(h(t.result)));
          }
        });
      }
      function assert(bool) {
        if (!bool) throw new Error("ecc library invalid");
      }
      var tweakAddVectors = [
        {
          pubkey: "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
          tweak: "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140",
          parity: -1,
          result: null
        },
        {
          pubkey: "1617d38ed8d8657da4d4761e8057bc396ea9e4b9d29776d4be096016dbd2509b",
          tweak: "a8397a935f0dfceba6ba9618f6451ef4d80637abf4e6af2669fbc9de6a8fd2ac",
          parity: 1,
          result: "e478f99dab91052ab39a33ea35fd5e6e4933f4d28023cd597c9a1f6760346adf"
        },
        {
          pubkey: "2c0b7cf95324a07d05398b240174dc0c2be444d96b159aa6c7f7b1e668680991",
          tweak: "823c3cd2142744b075a87eade7e1b8678ba308d566226a0056ca2b7a76f86b47",
          parity: 0,
          result: "9534f8dc8c6deda2dc007655981c78b49c5d96c778fbf363462a11ec9dfd948c"
        }
      ];
    }
  });

  // node_modules/varuint-bitcoin/index.js
  var require_varuint_bitcoin = __commonJS({
    "node_modules/varuint-bitcoin/index.js"(exports2, module2) {
      "use strict";
      var Buffer2 = require_safe_buffer().Buffer;
      var MAX_SAFE_INTEGER = 9007199254740991;
      function checkUInt53(n2) {
        if (n2 < 0 || n2 > MAX_SAFE_INTEGER || n2 % 1 !== 0) throw new RangeError("value out of range");
      }
      function encode(number, buffer, offset) {
        checkUInt53(number);
        if (!buffer) buffer = Buffer2.allocUnsafe(encodingLength(number));
        if (!Buffer2.isBuffer(buffer)) throw new TypeError("buffer must be a Buffer instance");
        if (!offset) offset = 0;
        if (number < 253) {
          buffer.writeUInt8(number, offset);
          encode.bytes = 1;
        } else if (number <= 65535) {
          buffer.writeUInt8(253, offset);
          buffer.writeUInt16LE(number, offset + 1);
          encode.bytes = 3;
        } else if (number <= 4294967295) {
          buffer.writeUInt8(254, offset);
          buffer.writeUInt32LE(number, offset + 1);
          encode.bytes = 5;
        } else {
          buffer.writeUInt8(255, offset);
          buffer.writeUInt32LE(number >>> 0, offset + 1);
          buffer.writeUInt32LE(number / 4294967296 | 0, offset + 5);
          encode.bytes = 9;
        }
        return buffer;
      }
      function decode(buffer, offset) {
        if (!Buffer2.isBuffer(buffer)) throw new TypeError("buffer must be a Buffer instance");
        if (!offset) offset = 0;
        var first = buffer.readUInt8(offset);
        if (first < 253) {
          decode.bytes = 1;
          return first;
        } else if (first === 253) {
          decode.bytes = 3;
          return buffer.readUInt16LE(offset + 1);
        } else if (first === 254) {
          decode.bytes = 5;
          return buffer.readUInt32LE(offset + 1);
        } else {
          decode.bytes = 9;
          var lo = buffer.readUInt32LE(offset + 1);
          var hi = buffer.readUInt32LE(offset + 5);
          var number = hi * 4294967296 + lo;
          checkUInt53(number);
          return number;
        }
      }
      function encodingLength(number) {
        checkUInt53(number);
        return number < 253 ? 1 : number <= 65535 ? 3 : number <= 4294967295 ? 5 : 9;
      }
      module2.exports = { encode, decode, encodingLength };
    }
  });

  // node_modules/bitcoinjs-lib/src/bufferutils.js
  var require_bufferutils = __commonJS({
    "node_modules/bitcoinjs-lib/src/bufferutils.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.BufferReader = exports2.BufferWriter = exports2.cloneBuffer = exports2.reverseBuffer = exports2.writeUInt64LE = exports2.readUInt64LE = exports2.varuint = void 0;
      var types = require_types2();
      var { typeforce } = types;
      var varuint = require_varuint_bitcoin();
      exports2.varuint = varuint;
      function verifuint(value, max) {
        if (typeof value !== "number")
          throw new Error("cannot write a non-number as a number");
        if (value < 0)
          throw new Error("specified a negative value for writing an unsigned value");
        if (value > max) throw new Error("RangeError: value out of range");
        if (Math.floor(value) !== value)
          throw new Error("value has a fractional component");
      }
      function readUInt64LE(buffer, offset) {
        const a = buffer.readUInt32LE(offset);
        let b = buffer.readUInt32LE(offset + 4);
        b *= 4294967296;
        verifuint(b + a, 9007199254740991);
        return b + a;
      }
      exports2.readUInt64LE = readUInt64LE;
      function writeUInt64LE(buffer, value, offset) {
        verifuint(value, 9007199254740991);
        buffer.writeInt32LE(value & -1, offset);
        buffer.writeUInt32LE(Math.floor(value / 4294967296), offset + 4);
        return offset + 8;
      }
      exports2.writeUInt64LE = writeUInt64LE;
      function reverseBuffer(buffer) {
        if (buffer.length < 1) return buffer;
        let j = buffer.length - 1;
        let tmp = 0;
        for (let i = 0; i < buffer.length / 2; i++) {
          tmp = buffer[i];
          buffer[i] = buffer[j];
          buffer[j] = tmp;
          j--;
        }
        return buffer;
      }
      exports2.reverseBuffer = reverseBuffer;
      function cloneBuffer(buffer) {
        const clone = Buffer.allocUnsafe(buffer.length);
        buffer.copy(clone);
        return clone;
      }
      exports2.cloneBuffer = cloneBuffer;
      var BufferWriter = class _BufferWriter {
        static withCapacity(size) {
          return new _BufferWriter(Buffer.alloc(size));
        }
        constructor(buffer, offset = 0) {
          this.buffer = buffer;
          this.offset = offset;
          typeforce(types.tuple(types.Buffer, types.UInt32), [buffer, offset]);
        }
        writeUInt8(i) {
          this.offset = this.buffer.writeUInt8(i, this.offset);
        }
        writeInt32(i) {
          this.offset = this.buffer.writeInt32LE(i, this.offset);
        }
        writeUInt32(i) {
          this.offset = this.buffer.writeUInt32LE(i, this.offset);
        }
        writeUInt64(i) {
          this.offset = writeUInt64LE(this.buffer, i, this.offset);
        }
        writeVarInt(i) {
          varuint.encode(i, this.buffer, this.offset);
          this.offset += varuint.encode.bytes;
        }
        writeSlice(slice) {
          if (this.buffer.length < this.offset + slice.length) {
            throw new Error("Cannot write slice out of bounds");
          }
          this.offset += slice.copy(this.buffer, this.offset);
        }
        writeVarSlice(slice) {
          this.writeVarInt(slice.length);
          this.writeSlice(slice);
        }
        writeVector(vector) {
          this.writeVarInt(vector.length);
          vector.forEach((buf) => this.writeVarSlice(buf));
        }
        end() {
          if (this.buffer.length === this.offset) {
            return this.buffer;
          }
          throw new Error(`buffer size ${this.buffer.length}, offset ${this.offset}`);
        }
      };
      exports2.BufferWriter = BufferWriter;
      var BufferReader = class {
        constructor(buffer, offset = 0) {
          this.buffer = buffer;
          this.offset = offset;
          typeforce(types.tuple(types.Buffer, types.UInt32), [buffer, offset]);
        }
        readUInt8() {
          const result = this.buffer.readUInt8(this.offset);
          this.offset++;
          return result;
        }
        readInt32() {
          const result = this.buffer.readInt32LE(this.offset);
          this.offset += 4;
          return result;
        }
        readUInt32() {
          const result = this.buffer.readUInt32LE(this.offset);
          this.offset += 4;
          return result;
        }
        readUInt64() {
          const result = readUInt64LE(this.buffer, this.offset);
          this.offset += 8;
          return result;
        }
        readVarInt() {
          const vi = varuint.decode(this.buffer, this.offset);
          this.offset += varuint.decode.bytes;
          return vi;
        }
        readSlice(n2) {
          if (this.buffer.length < this.offset + n2) {
            throw new Error("Cannot read slice out of bounds");
          }
          const result = this.buffer.slice(this.offset, this.offset + n2);
          this.offset += n2;
          return result;
        }
        readVarSlice() {
          return this.readSlice(this.readVarInt());
        }
        readVector() {
          const count = this.readVarInt();
          const vector = [];
          for (let i = 0; i < count; i++) vector.push(this.readVarSlice());
          return vector;
        }
      };
      exports2.BufferReader = BufferReader;
    }
  });

  // node_modules/bitcoinjs-lib/src/payments/bip341.js
  var require_bip341 = __commonJS({
    "node_modules/bitcoinjs-lib/src/payments/bip341.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.tweakKey = exports2.tapTweakHash = exports2.tapleafHash = exports2.findScriptPath = exports2.toHashTree = exports2.rootHashFromPath = exports2.MAX_TAPTREE_DEPTH = exports2.LEAF_VERSION_TAPSCRIPT = void 0;
      var buffer_1 = require_buffer();
      var ecc_lib_1 = require_ecc_lib();
      var bcrypto = require_crypto3();
      var bufferutils_1 = require_bufferutils();
      var types_1 = require_types2();
      exports2.LEAF_VERSION_TAPSCRIPT = 192;
      exports2.MAX_TAPTREE_DEPTH = 128;
      var isHashBranch = (ht) => "left" in ht && "right" in ht;
      function rootHashFromPath(controlBlock, leafHash) {
        if (controlBlock.length < 33)
          throw new TypeError(
            `The control-block length is too small. Got ${controlBlock.length}, expected min 33.`
          );
        const m = (controlBlock.length - 33) / 32;
        let kj = leafHash;
        for (let j = 0; j < m; j++) {
          const ej = controlBlock.slice(33 + 32 * j, 65 + 32 * j);
          if (kj.compare(ej) < 0) {
            kj = tapBranchHash(kj, ej);
          } else {
            kj = tapBranchHash(ej, kj);
          }
        }
        return kj;
      }
      exports2.rootHashFromPath = rootHashFromPath;
      function toHashTree(scriptTree) {
        if ((0, types_1.isTapleaf)(scriptTree))
          return { hash: tapleafHash(scriptTree) };
        const hashes = [toHashTree(scriptTree[0]), toHashTree(scriptTree[1])];
        hashes.sort((a, b) => a.hash.compare(b.hash));
        const [left, right] = hashes;
        return {
          hash: tapBranchHash(left.hash, right.hash),
          left,
          right
        };
      }
      exports2.toHashTree = toHashTree;
      function findScriptPath(node, hash2) {
        if (isHashBranch(node)) {
          const leftPath = findScriptPath(node.left, hash2);
          if (leftPath !== void 0) return [...leftPath, node.right.hash];
          const rightPath = findScriptPath(node.right, hash2);
          if (rightPath !== void 0) return [...rightPath, node.left.hash];
        } else if (node.hash.equals(hash2)) {
          return [];
        }
        return void 0;
      }
      exports2.findScriptPath = findScriptPath;
      function tapleafHash(leaf) {
        const version = leaf.version || exports2.LEAF_VERSION_TAPSCRIPT;
        return bcrypto.taggedHash(
          "TapLeaf",
          buffer_1.Buffer.concat([
            buffer_1.Buffer.from([version]),
            serializeScript(leaf.output)
          ])
        );
      }
      exports2.tapleafHash = tapleafHash;
      function tapTweakHash(pubKey, h) {
        return bcrypto.taggedHash(
          "TapTweak",
          buffer_1.Buffer.concat(h ? [pubKey, h] : [pubKey])
        );
      }
      exports2.tapTweakHash = tapTweakHash;
      function tweakKey(pubKey, h) {
        if (!buffer_1.Buffer.isBuffer(pubKey)) return null;
        if (pubKey.length !== 32) return null;
        if (h && h.length !== 32) return null;
        const tweakHash = tapTweakHash(pubKey, h);
        const res = (0, ecc_lib_1.getEccLib)().xOnlyPointAddTweak(pubKey, tweakHash);
        if (!res || res.xOnlyPubkey === null) return null;
        return {
          parity: res.parity,
          x: buffer_1.Buffer.from(res.xOnlyPubkey)
        };
      }
      exports2.tweakKey = tweakKey;
      function tapBranchHash(a, b) {
        return bcrypto.taggedHash("TapBranch", buffer_1.Buffer.concat([a, b]));
      }
      function serializeScript(s) {
        const varintLen = bufferutils_1.varuint.encodingLength(s.length);
        const buffer = buffer_1.Buffer.allocUnsafe(varintLen);
        bufferutils_1.varuint.encode(s.length, buffer);
        return buffer_1.Buffer.concat([buffer, s]);
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/payments/p2tr.js
  var require_p2tr = __commonJS({
    "node_modules/bitcoinjs-lib/src/payments/p2tr.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.p2tr = void 0;
      var buffer_1 = require_buffer();
      var networks_1 = require_networks();
      var bscript = require_script();
      var types_1 = require_types2();
      var ecc_lib_1 = require_ecc_lib();
      var bip341_1 = require_bip341();
      var lazy = require_lazy();
      var bech32_1 = require_dist();
      var address_1 = require_address();
      var OPS = bscript.OPS;
      var TAPROOT_WITNESS_VERSION = 1;
      var ANNEX_PREFIX = 80;
      function p2tr(a, opts) {
        if (!a.address && !a.output && !a.pubkey && !a.internalPubkey && !(a.witness && a.witness.length > 1))
          throw new TypeError("Not enough data");
        opts = Object.assign({ validate: true }, opts || {});
        (0, types_1.typeforce)(
          {
            address: types_1.typeforce.maybe(types_1.typeforce.String),
            input: types_1.typeforce.maybe(types_1.typeforce.BufferN(0)),
            network: types_1.typeforce.maybe(types_1.typeforce.Object),
            output: types_1.typeforce.maybe(types_1.typeforce.BufferN(34)),
            internalPubkey: types_1.typeforce.maybe(types_1.typeforce.BufferN(32)),
            hash: types_1.typeforce.maybe(types_1.typeforce.BufferN(32)),
            pubkey: types_1.typeforce.maybe(types_1.typeforce.BufferN(32)),
            signature: types_1.typeforce.maybe(
              types_1.typeforce.anyOf(
                types_1.typeforce.BufferN(64),
                types_1.typeforce.BufferN(65)
              )
            ),
            witness: types_1.typeforce.maybe(
              types_1.typeforce.arrayOf(types_1.typeforce.Buffer)
            ),
            scriptTree: types_1.typeforce.maybe(types_1.isTaptree),
            redeem: types_1.typeforce.maybe({
              output: types_1.typeforce.maybe(types_1.typeforce.Buffer),
              redeemVersion: types_1.typeforce.maybe(types_1.typeforce.Number),
              witness: types_1.typeforce.maybe(
                types_1.typeforce.arrayOf(types_1.typeforce.Buffer)
              )
            }),
            redeemVersion: types_1.typeforce.maybe(types_1.typeforce.Number)
          },
          a
        );
        const _address = lazy.value(() => {
          return (0, address_1.fromBech32)(a.address);
        });
        const _witness = lazy.value(() => {
          if (!a.witness || !a.witness.length) return;
          if (a.witness.length >= 2 && a.witness[a.witness.length - 1][0] === ANNEX_PREFIX) {
            return a.witness.slice(0, -1);
          }
          return a.witness.slice();
        });
        const _hashTree = lazy.value(() => {
          if (a.scriptTree) return (0, bip341_1.toHashTree)(a.scriptTree);
          if (a.hash) return { hash: a.hash };
          return;
        });
        const network = a.network || networks_1.bitcoin;
        const o = { name: "p2tr", network };
        lazy.prop(o, "address", () => {
          if (!o.pubkey) return;
          const words = bech32_1.bech32m.toWords(o.pubkey);
          words.unshift(TAPROOT_WITNESS_VERSION);
          return bech32_1.bech32m.encode(network.bech32, words);
        });
        lazy.prop(o, "hash", () => {
          const hashTree = _hashTree();
          if (hashTree) return hashTree.hash;
          const w = _witness();
          if (w && w.length > 1) {
            const controlBlock = w[w.length - 1];
            const leafVersion = controlBlock[0] & types_1.TAPLEAF_VERSION_MASK;
            const script = w[w.length - 2];
            const leafHash = (0, bip341_1.tapleafHash)({
              output: script,
              version: leafVersion
            });
            return (0, bip341_1.rootHashFromPath)(controlBlock, leafHash);
          }
          return null;
        });
        lazy.prop(o, "output", () => {
          if (!o.pubkey) return;
          return bscript.compile([OPS.OP_1, o.pubkey]);
        });
        lazy.prop(o, "redeemVersion", () => {
          if (a.redeemVersion) return a.redeemVersion;
          if (a.redeem && a.redeem.redeemVersion !== void 0 && a.redeem.redeemVersion !== null) {
            return a.redeem.redeemVersion;
          }
          return bip341_1.LEAF_VERSION_TAPSCRIPT;
        });
        lazy.prop(o, "redeem", () => {
          const witness = _witness();
          if (!witness || witness.length < 2) return;
          return {
            output: witness[witness.length - 2],
            witness: witness.slice(0, -2),
            redeemVersion: witness[witness.length - 1][0] & types_1.TAPLEAF_VERSION_MASK
          };
        });
        lazy.prop(o, "pubkey", () => {
          if (a.pubkey) return a.pubkey;
          if (a.output) return a.output.slice(2);
          if (a.address) return _address().data;
          if (o.internalPubkey) {
            const tweakedKey = (0, bip341_1.tweakKey)(o.internalPubkey, o.hash);
            if (tweakedKey) return tweakedKey.x;
          }
        });
        lazy.prop(o, "internalPubkey", () => {
          if (a.internalPubkey) return a.internalPubkey;
          const witness = _witness();
          if (witness && witness.length > 1)
            return witness[witness.length - 1].slice(1, 33);
        });
        lazy.prop(o, "signature", () => {
          if (a.signature) return a.signature;
          const witness = _witness();
          if (!witness || witness.length !== 1) return;
          return witness[0];
        });
        lazy.prop(o, "witness", () => {
          if (a.witness) return a.witness;
          const hashTree = _hashTree();
          if (hashTree && a.redeem && a.redeem.output && a.internalPubkey) {
            const leafHash = (0, bip341_1.tapleafHash)({
              output: a.redeem.output,
              version: o.redeemVersion
            });
            const path = (0, bip341_1.findScriptPath)(hashTree, leafHash);
            if (!path) return;
            const outputKey = (0, bip341_1.tweakKey)(a.internalPubkey, hashTree.hash);
            if (!outputKey) return;
            const controlBock = buffer_1.Buffer.concat(
              [
                buffer_1.Buffer.from([o.redeemVersion | outputKey.parity]),
                a.internalPubkey
              ].concat(path)
            );
            return [a.redeem.output, controlBock];
          }
          if (a.signature) return [a.signature];
        });
        if (opts.validate) {
          let pubkey = buffer_1.Buffer.from([]);
          if (a.address) {
            if (network && network.bech32 !== _address().prefix)
              throw new TypeError("Invalid prefix or Network mismatch");
            if (_address().version !== TAPROOT_WITNESS_VERSION)
              throw new TypeError("Invalid address version");
            if (_address().data.length !== 32)
              throw new TypeError("Invalid address data");
            pubkey = _address().data;
          }
          if (a.pubkey) {
            if (pubkey.length > 0 && !pubkey.equals(a.pubkey))
              throw new TypeError("Pubkey mismatch");
            else pubkey = a.pubkey;
          }
          if (a.output) {
            if (a.output.length !== 34 || a.output[0] !== OPS.OP_1 || a.output[1] !== 32)
              throw new TypeError("Output is invalid");
            if (pubkey.length > 0 && !pubkey.equals(a.output.slice(2)))
              throw new TypeError("Pubkey mismatch");
            else pubkey = a.output.slice(2);
          }
          if (a.internalPubkey) {
            const tweakedKey = (0, bip341_1.tweakKey)(a.internalPubkey, o.hash);
            if (pubkey.length > 0 && !pubkey.equals(tweakedKey.x))
              throw new TypeError("Pubkey mismatch");
            else pubkey = tweakedKey.x;
          }
          if (pubkey && pubkey.length) {
            if (!(0, ecc_lib_1.getEccLib)().isXOnlyPoint(pubkey))
              throw new TypeError("Invalid pubkey for p2tr");
          }
          const hashTree = _hashTree();
          if (a.hash && hashTree) {
            if (!a.hash.equals(hashTree.hash)) throw new TypeError("Hash mismatch");
          }
          if (a.redeem && a.redeem.output && hashTree) {
            const leafHash = (0, bip341_1.tapleafHash)({
              output: a.redeem.output,
              version: o.redeemVersion
            });
            if (!(0, bip341_1.findScriptPath)(hashTree, leafHash))
              throw new TypeError("Redeem script not in tree");
          }
          const witness = _witness();
          if (a.redeem && o.redeem) {
            if (a.redeem.redeemVersion) {
              if (a.redeem.redeemVersion !== o.redeem.redeemVersion)
                throw new TypeError("Redeem.redeemVersion and witness mismatch");
            }
            if (a.redeem.output) {
              if (bscript.decompile(a.redeem.output).length === 0)
                throw new TypeError("Redeem.output is invalid");
              if (o.redeem.output && !a.redeem.output.equals(o.redeem.output))
                throw new TypeError("Redeem.output and witness mismatch");
            }
            if (a.redeem.witness) {
              if (o.redeem.witness && !(0, types_1.stacksEqual)(a.redeem.witness, o.redeem.witness))
                throw new TypeError("Redeem.witness and witness mismatch");
            }
          }
          if (witness && witness.length) {
            if (witness.length === 1) {
              if (a.signature && !a.signature.equals(witness[0]))
                throw new TypeError("Signature mismatch");
            } else {
              const controlBlock = witness[witness.length - 1];
              if (controlBlock.length < 33)
                throw new TypeError(
                  `The control-block length is too small. Got ${controlBlock.length}, expected min 33.`
                );
              if ((controlBlock.length - 33) % 32 !== 0)
                throw new TypeError(
                  `The control-block length of ${controlBlock.length} is incorrect!`
                );
              const m = (controlBlock.length - 33) / 32;
              if (m > 128)
                throw new TypeError(
                  `The script path is too long. Got ${m}, expected max 128.`
                );
              const internalPubkey = controlBlock.slice(1, 33);
              if (a.internalPubkey && !a.internalPubkey.equals(internalPubkey))
                throw new TypeError("Internal pubkey mismatch");
              if (!(0, ecc_lib_1.getEccLib)().isXOnlyPoint(internalPubkey))
                throw new TypeError("Invalid internalPubkey for p2tr witness");
              const leafVersion = controlBlock[0] & types_1.TAPLEAF_VERSION_MASK;
              const script = witness[witness.length - 2];
              const leafHash = (0, bip341_1.tapleafHash)({
                output: script,
                version: leafVersion
              });
              const hash2 = (0, bip341_1.rootHashFromPath)(controlBlock, leafHash);
              const outputKey = (0, bip341_1.tweakKey)(internalPubkey, hash2);
              if (!outputKey)
                throw new TypeError("Invalid outputKey for p2tr witness");
              if (pubkey.length && !pubkey.equals(outputKey.x))
                throw new TypeError("Pubkey mismatch for p2tr witness");
              if (outputKey.parity !== (controlBlock[0] & 1))
                throw new Error("Incorrect parity");
            }
          }
        }
        return Object.assign(o, a);
      }
      exports2.p2tr = p2tr;
    }
  });

  // node_modules/bitcoinjs-lib/src/payments/index.js
  var require_payments = __commonJS({
    "node_modules/bitcoinjs-lib/src/payments/index.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.p2tr = exports2.p2wsh = exports2.p2wpkh = exports2.p2sh = exports2.p2pkh = exports2.p2pk = exports2.p2ms = exports2.embed = void 0;
      var embed_1 = require_embed();
      Object.defineProperty(exports2, "embed", {
        enumerable: true,
        get: function() {
          return embed_1.p2data;
        }
      });
      var p2ms_1 = require_p2ms();
      Object.defineProperty(exports2, "p2ms", {
        enumerable: true,
        get: function() {
          return p2ms_1.p2ms;
        }
      });
      var p2pk_1 = require_p2pk();
      Object.defineProperty(exports2, "p2pk", {
        enumerable: true,
        get: function() {
          return p2pk_1.p2pk;
        }
      });
      var p2pkh_1 = require_p2pkh();
      Object.defineProperty(exports2, "p2pkh", {
        enumerable: true,
        get: function() {
          return p2pkh_1.p2pkh;
        }
      });
      var p2sh_1 = require_p2sh();
      Object.defineProperty(exports2, "p2sh", {
        enumerable: true,
        get: function() {
          return p2sh_1.p2sh;
        }
      });
      var p2wpkh_1 = require_p2wpkh();
      Object.defineProperty(exports2, "p2wpkh", {
        enumerable: true,
        get: function() {
          return p2wpkh_1.p2wpkh;
        }
      });
      var p2wsh_1 = require_p2wsh();
      Object.defineProperty(exports2, "p2wsh", {
        enumerable: true,
        get: function() {
          return p2wsh_1.p2wsh;
        }
      });
      var p2tr_1 = require_p2tr();
      Object.defineProperty(exports2, "p2tr", {
        enumerable: true,
        get: function() {
          return p2tr_1.p2tr;
        }
      });
    }
  });

  // node_modules/bitcoinjs-lib/src/address.js
  var require_address = __commonJS({
    "node_modules/bitcoinjs-lib/src/address.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.toOutputScript = exports2.fromOutputScript = exports2.toBech32 = exports2.toBase58Check = exports2.fromBech32 = exports2.fromBase58Check = void 0;
      var networks2 = require_networks();
      var payments2 = require_payments();
      var bscript = require_script();
      var types_1 = require_types2();
      var bech32_1 = require_dist();
      var bs58check = require_bs58check();
      var FUTURE_SEGWIT_MAX_SIZE = 40;
      var FUTURE_SEGWIT_MIN_SIZE = 2;
      var FUTURE_SEGWIT_MAX_VERSION = 16;
      var FUTURE_SEGWIT_MIN_VERSION = 2;
      var FUTURE_SEGWIT_VERSION_DIFF = 80;
      var FUTURE_SEGWIT_VERSION_WARNING = "WARNING: Sending to a future segwit version address can lead to loss of funds. End users MUST be warned carefully in the GUI and asked if they wish to proceed with caution. Wallets should verify the segwit version from the output of fromBech32, then decide when it is safe to use which version of segwit.";
      function _toFutureSegwitAddress(output, network) {
        const data = output.slice(2);
        if (data.length < FUTURE_SEGWIT_MIN_SIZE || data.length > FUTURE_SEGWIT_MAX_SIZE)
          throw new TypeError("Invalid program length for segwit address");
        const version = output[0] - FUTURE_SEGWIT_VERSION_DIFF;
        if (version < FUTURE_SEGWIT_MIN_VERSION || version > FUTURE_SEGWIT_MAX_VERSION)
          throw new TypeError("Invalid version for segwit address");
        if (output[1] !== data.length)
          throw new TypeError("Invalid script for segwit address");
        console.warn(FUTURE_SEGWIT_VERSION_WARNING);
        return toBech32(data, version, network.bech32);
      }
      function fromBase58Check(address) {
        const payload = Buffer.from(bs58check.decode(address));
        if (payload.length < 21) throw new TypeError(address + " is too short");
        if (payload.length > 21) throw new TypeError(address + " is too long");
        const version = payload.readUInt8(0);
        const hash2 = payload.slice(1);
        return { version, hash: hash2 };
      }
      exports2.fromBase58Check = fromBase58Check;
      function fromBech32(address) {
        let result;
        let version;
        try {
          result = bech32_1.bech32.decode(address);
        } catch (e) {
        }
        if (result) {
          version = result.words[0];
          if (version !== 0) throw new TypeError(address + " uses wrong encoding");
        } else {
          result = bech32_1.bech32m.decode(address);
          version = result.words[0];
          if (version === 0) throw new TypeError(address + " uses wrong encoding");
        }
        const data = bech32_1.bech32.fromWords(result.words.slice(1));
        return {
          version,
          prefix: result.prefix,
          data: Buffer.from(data)
        };
      }
      exports2.fromBech32 = fromBech32;
      function toBase58Check(hash2, version) {
        (0, types_1.typeforce)(
          (0, types_1.tuple)(types_1.Hash160bit, types_1.UInt8),
          arguments
        );
        const payload = Buffer.allocUnsafe(21);
        payload.writeUInt8(version, 0);
        hash2.copy(payload, 1);
        return bs58check.encode(payload);
      }
      exports2.toBase58Check = toBase58Check;
      function toBech32(data, version, prefix) {
        const words = bech32_1.bech32.toWords(data);
        words.unshift(version);
        return version === 0 ? bech32_1.bech32.encode(prefix, words) : bech32_1.bech32m.encode(prefix, words);
      }
      exports2.toBech32 = toBech32;
      function fromOutputScript(output, network) {
        network = network || networks2.bitcoin;
        try {
          return payments2.p2pkh({ output, network }).address;
        } catch (e) {
        }
        try {
          return payments2.p2sh({ output, network }).address;
        } catch (e) {
        }
        try {
          return payments2.p2wpkh({ output, network }).address;
        } catch (e) {
        }
        try {
          return payments2.p2wsh({ output, network }).address;
        } catch (e) {
        }
        try {
          return payments2.p2tr({ output, network }).address;
        } catch (e) {
        }
        try {
          return _toFutureSegwitAddress(output, network);
        } catch (e) {
        }
        throw new Error(bscript.toASM(output) + " has no matching Address");
      }
      exports2.fromOutputScript = fromOutputScript;
      function toOutputScript(address, network) {
        network = network || networks2.bitcoin;
        let decodeBase58;
        let decodeBech32;
        try {
          decodeBase58 = fromBase58Check(address);
        } catch (e) {
        }
        if (decodeBase58) {
          if (decodeBase58.version === network.pubKeyHash)
            return payments2.p2pkh({ hash: decodeBase58.hash }).output;
          if (decodeBase58.version === network.scriptHash)
            return payments2.p2sh({ hash: decodeBase58.hash }).output;
        } else {
          try {
            decodeBech32 = fromBech32(address);
          } catch (e) {
          }
          if (decodeBech32) {
            if (decodeBech32.prefix !== network.bech32)
              throw new Error(address + " has an invalid prefix");
            if (decodeBech32.version === 0) {
              if (decodeBech32.data.length === 20)
                return payments2.p2wpkh({ hash: decodeBech32.data }).output;
              if (decodeBech32.data.length === 32)
                return payments2.p2wsh({ hash: decodeBech32.data }).output;
            } else if (decodeBech32.version === 1) {
              if (decodeBech32.data.length === 32)
                return payments2.p2tr({ pubkey: decodeBech32.data }).output;
            } else if (decodeBech32.version >= FUTURE_SEGWIT_MIN_VERSION && decodeBech32.version <= FUTURE_SEGWIT_MAX_VERSION && decodeBech32.data.length >= FUTURE_SEGWIT_MIN_SIZE && decodeBech32.data.length <= FUTURE_SEGWIT_MAX_SIZE) {
              console.warn(FUTURE_SEGWIT_VERSION_WARNING);
              return bscript.compile([
                decodeBech32.version + FUTURE_SEGWIT_VERSION_DIFF,
                decodeBech32.data
              ]);
            }
          }
        }
        throw new Error(address + " has no matching Script");
      }
      exports2.toOutputScript = toOutputScript;
    }
  });

  // node_modules/bitcoinjs-lib/src/merkle.js
  var require_merkle = __commonJS({
    "node_modules/bitcoinjs-lib/src/merkle.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.fastMerkleRoot = void 0;
      function fastMerkleRoot(values, digestFn) {
        if (!Array.isArray(values)) throw TypeError("Expected values Array");
        if (typeof digestFn !== "function")
          throw TypeError("Expected digest Function");
        let length = values.length;
        const results = values.concat();
        while (length > 1) {
          let j = 0;
          for (let i = 0; i < length; i += 2, ++j) {
            const left = results[i];
            const right = i + 1 === length ? left : results[i + 1];
            const data = Buffer.concat([left, right]);
            results[j] = digestFn(data);
          }
          length = j;
        }
        return results[0];
      }
      exports2.fastMerkleRoot = fastMerkleRoot;
    }
  });

  // node_modules/bitcoinjs-lib/src/transaction.js
  var require_transaction = __commonJS({
    "node_modules/bitcoinjs-lib/src/transaction.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.Transaction = void 0;
      var bufferutils_1 = require_bufferutils();
      var bcrypto = require_crypto3();
      var bscript = require_script();
      var script_1 = require_script();
      var types = require_types2();
      var { typeforce } = types;
      function varSliceSize(someScript) {
        const length = someScript.length;
        return bufferutils_1.varuint.encodingLength(length) + length;
      }
      function vectorSize(someVector) {
        const length = someVector.length;
        return bufferutils_1.varuint.encodingLength(length) + someVector.reduce((sum, witness) => {
          return sum + varSliceSize(witness);
        }, 0);
      }
      var EMPTY_BUFFER = Buffer.allocUnsafe(0);
      var EMPTY_WITNESS = [];
      var ZERO = Buffer.from(
        "0000000000000000000000000000000000000000000000000000000000000000",
        "hex"
      );
      var ONE = Buffer.from(
        "0000000000000000000000000000000000000000000000000000000000000001",
        "hex"
      );
      var VALUE_UINT64_MAX = Buffer.from("ffffffffffffffff", "hex");
      var BLANK_OUTPUT = {
        script: EMPTY_BUFFER,
        valueBuffer: VALUE_UINT64_MAX
      };
      function isOutput(out) {
        return out.value !== void 0;
      }
      var Transaction = class _Transaction {
        constructor() {
          this.version = 1;
          this.locktime = 0;
          this.ins = [];
          this.outs = [];
        }
        static fromBuffer(buffer, _NO_STRICT) {
          const bufferReader = new bufferutils_1.BufferReader(buffer);
          const tx2 = new _Transaction();
          tx2.version = bufferReader.readInt32();
          const marker = bufferReader.readUInt8();
          const flag = bufferReader.readUInt8();
          let hasWitnesses = false;
          if (marker === _Transaction.ADVANCED_TRANSACTION_MARKER && flag === _Transaction.ADVANCED_TRANSACTION_FLAG) {
            hasWitnesses = true;
          } else {
            bufferReader.offset -= 2;
          }
          const vinLen = bufferReader.readVarInt();
          for (let i = 0; i < vinLen; ++i) {
            tx2.ins.push({
              hash: bufferReader.readSlice(32),
              index: bufferReader.readUInt32(),
              script: bufferReader.readVarSlice(),
              sequence: bufferReader.readUInt32(),
              witness: EMPTY_WITNESS
            });
          }
          const voutLen = bufferReader.readVarInt();
          for (let i = 0; i < voutLen; ++i) {
            tx2.outs.push({
              value: bufferReader.readUInt64(),
              script: bufferReader.readVarSlice()
            });
          }
          if (hasWitnesses) {
            for (let i = 0; i < vinLen; ++i) {
              tx2.ins[i].witness = bufferReader.readVector();
            }
            if (!tx2.hasWitnesses())
              throw new Error("Transaction has superfluous witness data");
          }
          tx2.locktime = bufferReader.readUInt32();
          if (_NO_STRICT) return tx2;
          if (bufferReader.offset !== buffer.length)
            throw new Error("Transaction has unexpected data");
          return tx2;
        }
        static fromHex(hex) {
          return _Transaction.fromBuffer(Buffer.from(hex, "hex"), false);
        }
        static isCoinbaseHash(buffer) {
          typeforce(types.Hash256bit, buffer);
          for (let i = 0; i < 32; ++i) {
            if (buffer[i] !== 0) return false;
          }
          return true;
        }
        isCoinbase() {
          return this.ins.length === 1 && _Transaction.isCoinbaseHash(this.ins[0].hash);
        }
        addInput(hash2, index, sequence, scriptSig) {
          typeforce(
            types.tuple(
              types.Hash256bit,
              types.UInt32,
              types.maybe(types.UInt32),
              types.maybe(types.Buffer)
            ),
            arguments
          );
          if (types.Null(sequence)) {
            sequence = _Transaction.DEFAULT_SEQUENCE;
          }
          return this.ins.push({
            hash: hash2,
            index,
            script: scriptSig || EMPTY_BUFFER,
            sequence,
            witness: EMPTY_WITNESS
          }) - 1;
        }
        addOutput(scriptPubKey, value) {
          typeforce(types.tuple(types.Buffer, types.Satoshi), arguments);
          return this.outs.push({
            script: scriptPubKey,
            value
          }) - 1;
        }
        hasWitnesses() {
          return this.ins.some((x) => {
            return x.witness.length !== 0;
          });
        }
        stripWitnesses() {
          this.ins.forEach((input) => {
            input.witness = EMPTY_WITNESS;
          });
        }
        weight() {
          const base = this.byteLength(false);
          const total = this.byteLength(true);
          return base * 3 + total;
        }
        virtualSize() {
          return Math.ceil(this.weight() / 4);
        }
        byteLength(_ALLOW_WITNESS = true) {
          const hasWitnesses = _ALLOW_WITNESS && this.hasWitnesses();
          return (hasWitnesses ? 10 : 8) + bufferutils_1.varuint.encodingLength(this.ins.length) + bufferutils_1.varuint.encodingLength(this.outs.length) + this.ins.reduce((sum, input) => {
            return sum + 40 + varSliceSize(input.script);
          }, 0) + this.outs.reduce((sum, output) => {
            return sum + 8 + varSliceSize(output.script);
          }, 0) + (hasWitnesses ? this.ins.reduce((sum, input) => {
            return sum + vectorSize(input.witness);
          }, 0) : 0);
        }
        clone() {
          const newTx = new _Transaction();
          newTx.version = this.version;
          newTx.locktime = this.locktime;
          newTx.ins = this.ins.map((txIn) => {
            return {
              hash: txIn.hash,
              index: txIn.index,
              script: txIn.script,
              sequence: txIn.sequence,
              witness: txIn.witness
            };
          });
          newTx.outs = this.outs.map((txOut) => {
            return {
              script: txOut.script,
              value: txOut.value
            };
          });
          return newTx;
        }
        /**
         * Hash transaction for signing a specific input.
         *
         * Bitcoin uses a different hash for each signed transaction input.
         * This method copies the transaction, makes the necessary changes based on the
         * hashType, and then hashes the result.
         * This hash can then be used to sign the provided transaction input.
         */
        hashForSignature(inIndex, prevOutScript, hashType) {
          typeforce(
            types.tuple(
              types.UInt32,
              types.Buffer,
              /* types.UInt8 */
              types.Number
            ),
            arguments
          );
          if (inIndex >= this.ins.length) return ONE;
          const ourScript = bscript.compile(
            bscript.decompile(prevOutScript).filter((x) => {
              return x !== script_1.OPS.OP_CODESEPARATOR;
            })
          );
          const txTmp = this.clone();
          if ((hashType & 31) === _Transaction.SIGHASH_NONE) {
            txTmp.outs = [];
            txTmp.ins.forEach((input, i) => {
              if (i === inIndex) return;
              input.sequence = 0;
            });
          } else if ((hashType & 31) === _Transaction.SIGHASH_SINGLE) {
            if (inIndex >= this.outs.length) return ONE;
            txTmp.outs.length = inIndex + 1;
            for (let i = 0; i < inIndex; i++) {
              txTmp.outs[i] = BLANK_OUTPUT;
            }
            txTmp.ins.forEach((input, y) => {
              if (y === inIndex) return;
              input.sequence = 0;
            });
          }
          if (hashType & _Transaction.SIGHASH_ANYONECANPAY) {
            txTmp.ins = [txTmp.ins[inIndex]];
            txTmp.ins[0].script = ourScript;
          } else {
            txTmp.ins.forEach((input) => {
              input.script = EMPTY_BUFFER;
            });
            txTmp.ins[inIndex].script = ourScript;
          }
          const buffer = Buffer.allocUnsafe(txTmp.byteLength(false) + 4);
          buffer.writeInt32LE(hashType, buffer.length - 4);
          txTmp.__toBuffer(buffer, 0, false);
          return bcrypto.hash256(buffer);
        }
        hashForWitnessV1(inIndex, prevOutScripts, values, hashType, leafHash, annex) {
          typeforce(
            types.tuple(
              types.UInt32,
              typeforce.arrayOf(types.Buffer),
              typeforce.arrayOf(types.Satoshi),
              types.UInt32
            ),
            arguments
          );
          if (values.length !== this.ins.length || prevOutScripts.length !== this.ins.length) {
            throw new Error("Must supply prevout script and value for all inputs");
          }
          const outputType = hashType === _Transaction.SIGHASH_DEFAULT ? _Transaction.SIGHASH_ALL : hashType & _Transaction.SIGHASH_OUTPUT_MASK;
          const inputType = hashType & _Transaction.SIGHASH_INPUT_MASK;
          const isAnyoneCanPay = inputType === _Transaction.SIGHASH_ANYONECANPAY;
          const isNone = outputType === _Transaction.SIGHASH_NONE;
          const isSingle = outputType === _Transaction.SIGHASH_SINGLE;
          let hashPrevouts = EMPTY_BUFFER;
          let hashAmounts = EMPTY_BUFFER;
          let hashScriptPubKeys = EMPTY_BUFFER;
          let hashSequences = EMPTY_BUFFER;
          let hashOutputs = EMPTY_BUFFER;
          if (!isAnyoneCanPay) {
            let bufferWriter = bufferutils_1.BufferWriter.withCapacity(
              36 * this.ins.length
            );
            this.ins.forEach((txIn) => {
              bufferWriter.writeSlice(txIn.hash);
              bufferWriter.writeUInt32(txIn.index);
            });
            hashPrevouts = bcrypto.sha256(bufferWriter.end());
            bufferWriter = bufferutils_1.BufferWriter.withCapacity(
              8 * this.ins.length
            );
            values.forEach((value) => bufferWriter.writeUInt64(value));
            hashAmounts = bcrypto.sha256(bufferWriter.end());
            bufferWriter = bufferutils_1.BufferWriter.withCapacity(
              prevOutScripts.map(varSliceSize).reduce((a, b) => a + b)
            );
            prevOutScripts.forEach(
              (prevOutScript) => bufferWriter.writeVarSlice(prevOutScript)
            );
            hashScriptPubKeys = bcrypto.sha256(bufferWriter.end());
            bufferWriter = bufferutils_1.BufferWriter.withCapacity(
              4 * this.ins.length
            );
            this.ins.forEach((txIn) => bufferWriter.writeUInt32(txIn.sequence));
            hashSequences = bcrypto.sha256(bufferWriter.end());
          }
          if (!(isNone || isSingle)) {
            const txOutsSize = this.outs.map((output) => 8 + varSliceSize(output.script)).reduce((a, b) => a + b);
            const bufferWriter = bufferutils_1.BufferWriter.withCapacity(txOutsSize);
            this.outs.forEach((out) => {
              bufferWriter.writeUInt64(out.value);
              bufferWriter.writeVarSlice(out.script);
            });
            hashOutputs = bcrypto.sha256(bufferWriter.end());
          } else if (isSingle && inIndex < this.outs.length) {
            const output = this.outs[inIndex];
            const bufferWriter = bufferutils_1.BufferWriter.withCapacity(
              8 + varSliceSize(output.script)
            );
            bufferWriter.writeUInt64(output.value);
            bufferWriter.writeVarSlice(output.script);
            hashOutputs = bcrypto.sha256(bufferWriter.end());
          }
          const spendType = (leafHash ? 2 : 0) + (annex ? 1 : 0);
          const sigMsgSize = 174 - (isAnyoneCanPay ? 49 : 0) - (isNone ? 32 : 0) + (annex ? 32 : 0) + (leafHash ? 37 : 0);
          const sigMsgWriter = bufferutils_1.BufferWriter.withCapacity(sigMsgSize);
          sigMsgWriter.writeUInt8(hashType);
          sigMsgWriter.writeInt32(this.version);
          sigMsgWriter.writeUInt32(this.locktime);
          sigMsgWriter.writeSlice(hashPrevouts);
          sigMsgWriter.writeSlice(hashAmounts);
          sigMsgWriter.writeSlice(hashScriptPubKeys);
          sigMsgWriter.writeSlice(hashSequences);
          if (!(isNone || isSingle)) {
            sigMsgWriter.writeSlice(hashOutputs);
          }
          sigMsgWriter.writeUInt8(spendType);
          if (isAnyoneCanPay) {
            const input = this.ins[inIndex];
            sigMsgWriter.writeSlice(input.hash);
            sigMsgWriter.writeUInt32(input.index);
            sigMsgWriter.writeUInt64(values[inIndex]);
            sigMsgWriter.writeVarSlice(prevOutScripts[inIndex]);
            sigMsgWriter.writeUInt32(input.sequence);
          } else {
            sigMsgWriter.writeUInt32(inIndex);
          }
          if (annex) {
            const bufferWriter = bufferutils_1.BufferWriter.withCapacity(
              varSliceSize(annex)
            );
            bufferWriter.writeVarSlice(annex);
            sigMsgWriter.writeSlice(bcrypto.sha256(bufferWriter.end()));
          }
          if (isSingle) {
            sigMsgWriter.writeSlice(hashOutputs);
          }
          if (leafHash) {
            sigMsgWriter.writeSlice(leafHash);
            sigMsgWriter.writeUInt8(0);
            sigMsgWriter.writeUInt32(4294967295);
          }
          return bcrypto.taggedHash(
            "TapSighash",
            Buffer.concat([Buffer.from([0]), sigMsgWriter.end()])
          );
        }
        hashForWitnessV0(inIndex, prevOutScript, value, hashType) {
          typeforce(
            types.tuple(types.UInt32, types.Buffer, types.Satoshi, types.UInt32),
            arguments
          );
          let tbuffer = Buffer.from([]);
          let bufferWriter;
          let hashOutputs = ZERO;
          let hashPrevouts = ZERO;
          let hashSequence = ZERO;
          if (!(hashType & _Transaction.SIGHASH_ANYONECANPAY)) {
            tbuffer = Buffer.allocUnsafe(36 * this.ins.length);
            bufferWriter = new bufferutils_1.BufferWriter(tbuffer, 0);
            this.ins.forEach((txIn) => {
              bufferWriter.writeSlice(txIn.hash);
              bufferWriter.writeUInt32(txIn.index);
            });
            hashPrevouts = bcrypto.hash256(tbuffer);
          }
          if (!(hashType & _Transaction.SIGHASH_ANYONECANPAY) && (hashType & 31) !== _Transaction.SIGHASH_SINGLE && (hashType & 31) !== _Transaction.SIGHASH_NONE) {
            tbuffer = Buffer.allocUnsafe(4 * this.ins.length);
            bufferWriter = new bufferutils_1.BufferWriter(tbuffer, 0);
            this.ins.forEach((txIn) => {
              bufferWriter.writeUInt32(txIn.sequence);
            });
            hashSequence = bcrypto.hash256(tbuffer);
          }
          if ((hashType & 31) !== _Transaction.SIGHASH_SINGLE && (hashType & 31) !== _Transaction.SIGHASH_NONE) {
            const txOutsSize = this.outs.reduce((sum, output) => {
              return sum + 8 + varSliceSize(output.script);
            }, 0);
            tbuffer = Buffer.allocUnsafe(txOutsSize);
            bufferWriter = new bufferutils_1.BufferWriter(tbuffer, 0);
            this.outs.forEach((out) => {
              bufferWriter.writeUInt64(out.value);
              bufferWriter.writeVarSlice(out.script);
            });
            hashOutputs = bcrypto.hash256(tbuffer);
          } else if ((hashType & 31) === _Transaction.SIGHASH_SINGLE && inIndex < this.outs.length) {
            const output = this.outs[inIndex];
            tbuffer = Buffer.allocUnsafe(8 + varSliceSize(output.script));
            bufferWriter = new bufferutils_1.BufferWriter(tbuffer, 0);
            bufferWriter.writeUInt64(output.value);
            bufferWriter.writeVarSlice(output.script);
            hashOutputs = bcrypto.hash256(tbuffer);
          }
          tbuffer = Buffer.allocUnsafe(156 + varSliceSize(prevOutScript));
          bufferWriter = new bufferutils_1.BufferWriter(tbuffer, 0);
          const input = this.ins[inIndex];
          bufferWriter.writeInt32(this.version);
          bufferWriter.writeSlice(hashPrevouts);
          bufferWriter.writeSlice(hashSequence);
          bufferWriter.writeSlice(input.hash);
          bufferWriter.writeUInt32(input.index);
          bufferWriter.writeVarSlice(prevOutScript);
          bufferWriter.writeUInt64(value);
          bufferWriter.writeUInt32(input.sequence);
          bufferWriter.writeSlice(hashOutputs);
          bufferWriter.writeUInt32(this.locktime);
          bufferWriter.writeUInt32(hashType);
          return bcrypto.hash256(tbuffer);
        }
        getHash(forWitness) {
          if (forWitness && this.isCoinbase()) return Buffer.alloc(32, 0);
          return bcrypto.hash256(this.__toBuffer(void 0, void 0, forWitness));
        }
        getId() {
          return (0, bufferutils_1.reverseBuffer)(this.getHash(false)).toString(
            "hex"
          );
        }
        toBuffer(buffer, initialOffset) {
          return this.__toBuffer(buffer, initialOffset, true);
        }
        toHex() {
          return this.toBuffer(void 0, void 0).toString("hex");
        }
        setInputScript(index, scriptSig) {
          typeforce(types.tuple(types.Number, types.Buffer), arguments);
          this.ins[index].script = scriptSig;
        }
        setWitness(index, witness) {
          typeforce(types.tuple(types.Number, [types.Buffer]), arguments);
          this.ins[index].witness = witness;
        }
        __toBuffer(buffer, initialOffset, _ALLOW_WITNESS = false) {
          if (!buffer) buffer = Buffer.allocUnsafe(this.byteLength(_ALLOW_WITNESS));
          const bufferWriter = new bufferutils_1.BufferWriter(
            buffer,
            initialOffset || 0
          );
          bufferWriter.writeInt32(this.version);
          const hasWitnesses = _ALLOW_WITNESS && this.hasWitnesses();
          if (hasWitnesses) {
            bufferWriter.writeUInt8(_Transaction.ADVANCED_TRANSACTION_MARKER);
            bufferWriter.writeUInt8(_Transaction.ADVANCED_TRANSACTION_FLAG);
          }
          bufferWriter.writeVarInt(this.ins.length);
          this.ins.forEach((txIn) => {
            bufferWriter.writeSlice(txIn.hash);
            bufferWriter.writeUInt32(txIn.index);
            bufferWriter.writeVarSlice(txIn.script);
            bufferWriter.writeUInt32(txIn.sequence);
          });
          bufferWriter.writeVarInt(this.outs.length);
          this.outs.forEach((txOut) => {
            if (isOutput(txOut)) {
              bufferWriter.writeUInt64(txOut.value);
            } else {
              bufferWriter.writeSlice(txOut.valueBuffer);
            }
            bufferWriter.writeVarSlice(txOut.script);
          });
          if (hasWitnesses) {
            this.ins.forEach((input) => {
              bufferWriter.writeVector(input.witness);
            });
          }
          bufferWriter.writeUInt32(this.locktime);
          if (initialOffset !== void 0)
            return buffer.slice(initialOffset, bufferWriter.offset);
          return buffer;
        }
      };
      exports2.Transaction = Transaction;
      Transaction.DEFAULT_SEQUENCE = 4294967295;
      Transaction.SIGHASH_DEFAULT = 0;
      Transaction.SIGHASH_ALL = 1;
      Transaction.SIGHASH_NONE = 2;
      Transaction.SIGHASH_SINGLE = 3;
      Transaction.SIGHASH_ANYONECANPAY = 128;
      Transaction.SIGHASH_OUTPUT_MASK = 3;
      Transaction.SIGHASH_INPUT_MASK = 128;
      Transaction.ADVANCED_TRANSACTION_MARKER = 0;
      Transaction.ADVANCED_TRANSACTION_FLAG = 1;
    }
  });

  // node_modules/bitcoinjs-lib/src/block.js
  var require_block = __commonJS({
    "node_modules/bitcoinjs-lib/src/block.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.Block = void 0;
      var bufferutils_1 = require_bufferutils();
      var bcrypto = require_crypto3();
      var merkle_1 = require_merkle();
      var transaction_1 = require_transaction();
      var types = require_types2();
      var { typeforce } = types;
      var errorMerkleNoTxes = new TypeError(
        "Cannot compute merkle root for zero transactions"
      );
      var errorWitnessNotSegwit = new TypeError(
        "Cannot compute witness commit for non-segwit block"
      );
      var Block = class _Block {
        constructor() {
          this.version = 1;
          this.prevHash = void 0;
          this.merkleRoot = void 0;
          this.timestamp = 0;
          this.witnessCommit = void 0;
          this.bits = 0;
          this.nonce = 0;
          this.transactions = void 0;
        }
        static fromBuffer(buffer) {
          if (buffer.length < 80) throw new Error("Buffer too small (< 80 bytes)");
          const bufferReader = new bufferutils_1.BufferReader(buffer);
          const block = new _Block();
          block.version = bufferReader.readInt32();
          block.prevHash = bufferReader.readSlice(32);
          block.merkleRoot = bufferReader.readSlice(32);
          block.timestamp = bufferReader.readUInt32();
          block.bits = bufferReader.readUInt32();
          block.nonce = bufferReader.readUInt32();
          if (buffer.length === 80) return block;
          const readTransaction = () => {
            const tx2 = transaction_1.Transaction.fromBuffer(
              bufferReader.buffer.slice(bufferReader.offset),
              true
            );
            bufferReader.offset += tx2.byteLength();
            return tx2;
          };
          const nTransactions = bufferReader.readVarInt();
          block.transactions = [];
          for (let i = 0; i < nTransactions; ++i) {
            const tx2 = readTransaction();
            block.transactions.push(tx2);
          }
          const witnessCommit = block.getWitnessCommit();
          if (witnessCommit) block.witnessCommit = witnessCommit;
          return block;
        }
        static fromHex(hex) {
          return _Block.fromBuffer(Buffer.from(hex, "hex"));
        }
        static calculateTarget(bits) {
          const exponent = ((bits & 4278190080) >> 24) - 3;
          const mantissa = bits & 8388607;
          const target = Buffer.alloc(32, 0);
          target.writeUIntBE(mantissa, 29 - exponent, 3);
          return target;
        }
        static calculateMerkleRoot(transactions, forWitness) {
          typeforce([{ getHash: types.Function }], transactions);
          if (transactions.length === 0) throw errorMerkleNoTxes;
          if (forWitness && !txesHaveWitnessCommit(transactions))
            throw errorWitnessNotSegwit;
          const hashes = transactions.map(
            (transaction) => transaction.getHash(forWitness)
          );
          const rootHash = (0, merkle_1.fastMerkleRoot)(hashes, bcrypto.hash256);
          return forWitness ? bcrypto.hash256(
            Buffer.concat([rootHash, transactions[0].ins[0].witness[0]])
          ) : rootHash;
        }
        getWitnessCommit() {
          if (!txesHaveWitnessCommit(this.transactions)) return null;
          const witnessCommits = this.transactions[0].outs.filter(
            (out) => out.script.slice(0, 6).equals(Buffer.from("6a24aa21a9ed", "hex"))
          ).map((out) => out.script.slice(6, 38));
          if (witnessCommits.length === 0) return null;
          const result = witnessCommits[witnessCommits.length - 1];
          if (!(result instanceof Buffer && result.length === 32)) return null;
          return result;
        }
        hasWitnessCommit() {
          if (this.witnessCommit instanceof Buffer && this.witnessCommit.length === 32)
            return true;
          if (this.getWitnessCommit() !== null) return true;
          return false;
        }
        hasWitness() {
          return anyTxHasWitness(this.transactions);
        }
        weight() {
          const base = this.byteLength(false, false);
          const total = this.byteLength(false, true);
          return base * 3 + total;
        }
        byteLength(headersOnly, allowWitness = true) {
          if (headersOnly || !this.transactions) return 80;
          return 80 + bufferutils_1.varuint.encodingLength(this.transactions.length) + this.transactions.reduce((a, x) => a + x.byteLength(allowWitness), 0);
        }
        getHash() {
          return bcrypto.hash256(this.toBuffer(true));
        }
        getId() {
          return (0, bufferutils_1.reverseBuffer)(this.getHash()).toString("hex");
        }
        getUTCDate() {
          const date = /* @__PURE__ */ new Date(0);
          date.setUTCSeconds(this.timestamp);
          return date;
        }
        // TODO: buffer, offset compatibility
        toBuffer(headersOnly) {
          const buffer = Buffer.allocUnsafe(this.byteLength(headersOnly));
          const bufferWriter = new bufferutils_1.BufferWriter(buffer);
          bufferWriter.writeInt32(this.version);
          bufferWriter.writeSlice(this.prevHash);
          bufferWriter.writeSlice(this.merkleRoot);
          bufferWriter.writeUInt32(this.timestamp);
          bufferWriter.writeUInt32(this.bits);
          bufferWriter.writeUInt32(this.nonce);
          if (headersOnly || !this.transactions) return buffer;
          bufferutils_1.varuint.encode(
            this.transactions.length,
            buffer,
            bufferWriter.offset
          );
          bufferWriter.offset += bufferutils_1.varuint.encode.bytes;
          this.transactions.forEach((tx2) => {
            const txSize = tx2.byteLength();
            tx2.toBuffer(buffer, bufferWriter.offset);
            bufferWriter.offset += txSize;
          });
          return buffer;
        }
        toHex(headersOnly) {
          return this.toBuffer(headersOnly).toString("hex");
        }
        checkTxRoots() {
          const hasWitnessCommit = this.hasWitnessCommit();
          if (!hasWitnessCommit && this.hasWitness()) return false;
          return this.__checkMerkleRoot() && (hasWitnessCommit ? this.__checkWitnessCommit() : true);
        }
        checkProofOfWork() {
          const hash2 = (0, bufferutils_1.reverseBuffer)(this.getHash());
          const target = _Block.calculateTarget(this.bits);
          return hash2.compare(target) <= 0;
        }
        __checkMerkleRoot() {
          if (!this.transactions) throw errorMerkleNoTxes;
          const actualMerkleRoot = _Block.calculateMerkleRoot(this.transactions);
          return this.merkleRoot.compare(actualMerkleRoot) === 0;
        }
        __checkWitnessCommit() {
          if (!this.transactions) throw errorMerkleNoTxes;
          if (!this.hasWitnessCommit()) throw errorWitnessNotSegwit;
          const actualWitnessCommit = _Block.calculateMerkleRoot(
            this.transactions,
            true
          );
          return this.witnessCommit.compare(actualWitnessCommit) === 0;
        }
      };
      exports2.Block = Block;
      function txesHaveWitnessCommit(transactions) {
        return transactions instanceof Array && transactions[0] && transactions[0].ins && transactions[0].ins instanceof Array && transactions[0].ins[0] && transactions[0].ins[0].witness && transactions[0].ins[0].witness instanceof Array && transactions[0].ins[0].witness.length > 0;
      }
      function anyTxHasWitness(transactions) {
        return transactions instanceof Array && transactions.some(
          (tx2) => typeof tx2 === "object" && tx2.ins instanceof Array && tx2.ins.some(
            (input) => typeof input === "object" && input.witness instanceof Array && input.witness.length > 0
          )
        );
      }
    }
  });

  // node_modules/bip174/src/lib/typeFields.js
  var require_typeFields = __commonJS({
    "node_modules/bip174/src/lib/typeFields.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var GlobalTypes;
      (function(GlobalTypes2) {
        GlobalTypes2[GlobalTypes2["UNSIGNED_TX"] = 0] = "UNSIGNED_TX";
        GlobalTypes2[GlobalTypes2["GLOBAL_XPUB"] = 1] = "GLOBAL_XPUB";
      })(GlobalTypes = exports2.GlobalTypes || (exports2.GlobalTypes = {}));
      exports2.GLOBAL_TYPE_NAMES = ["unsignedTx", "globalXpub"];
      var InputTypes;
      (function(InputTypes2) {
        InputTypes2[InputTypes2["NON_WITNESS_UTXO"] = 0] = "NON_WITNESS_UTXO";
        InputTypes2[InputTypes2["WITNESS_UTXO"] = 1] = "WITNESS_UTXO";
        InputTypes2[InputTypes2["PARTIAL_SIG"] = 2] = "PARTIAL_SIG";
        InputTypes2[InputTypes2["SIGHASH_TYPE"] = 3] = "SIGHASH_TYPE";
        InputTypes2[InputTypes2["REDEEM_SCRIPT"] = 4] = "REDEEM_SCRIPT";
        InputTypes2[InputTypes2["WITNESS_SCRIPT"] = 5] = "WITNESS_SCRIPT";
        InputTypes2[InputTypes2["BIP32_DERIVATION"] = 6] = "BIP32_DERIVATION";
        InputTypes2[InputTypes2["FINAL_SCRIPTSIG"] = 7] = "FINAL_SCRIPTSIG";
        InputTypes2[InputTypes2["FINAL_SCRIPTWITNESS"] = 8] = "FINAL_SCRIPTWITNESS";
        InputTypes2[InputTypes2["POR_COMMITMENT"] = 9] = "POR_COMMITMENT";
        InputTypes2[InputTypes2["TAP_KEY_SIG"] = 19] = "TAP_KEY_SIG";
        InputTypes2[InputTypes2["TAP_SCRIPT_SIG"] = 20] = "TAP_SCRIPT_SIG";
        InputTypes2[InputTypes2["TAP_LEAF_SCRIPT"] = 21] = "TAP_LEAF_SCRIPT";
        InputTypes2[InputTypes2["TAP_BIP32_DERIVATION"] = 22] = "TAP_BIP32_DERIVATION";
        InputTypes2[InputTypes2["TAP_INTERNAL_KEY"] = 23] = "TAP_INTERNAL_KEY";
        InputTypes2[InputTypes2["TAP_MERKLE_ROOT"] = 24] = "TAP_MERKLE_ROOT";
      })(InputTypes = exports2.InputTypes || (exports2.InputTypes = {}));
      exports2.INPUT_TYPE_NAMES = [
        "nonWitnessUtxo",
        "witnessUtxo",
        "partialSig",
        "sighashType",
        "redeemScript",
        "witnessScript",
        "bip32Derivation",
        "finalScriptSig",
        "finalScriptWitness",
        "porCommitment",
        "tapKeySig",
        "tapScriptSig",
        "tapLeafScript",
        "tapBip32Derivation",
        "tapInternalKey",
        "tapMerkleRoot"
      ];
      var OutputTypes;
      (function(OutputTypes2) {
        OutputTypes2[OutputTypes2["REDEEM_SCRIPT"] = 0] = "REDEEM_SCRIPT";
        OutputTypes2[OutputTypes2["WITNESS_SCRIPT"] = 1] = "WITNESS_SCRIPT";
        OutputTypes2[OutputTypes2["BIP32_DERIVATION"] = 2] = "BIP32_DERIVATION";
        OutputTypes2[OutputTypes2["TAP_INTERNAL_KEY"] = 5] = "TAP_INTERNAL_KEY";
        OutputTypes2[OutputTypes2["TAP_TREE"] = 6] = "TAP_TREE";
        OutputTypes2[OutputTypes2["TAP_BIP32_DERIVATION"] = 7] = "TAP_BIP32_DERIVATION";
      })(OutputTypes = exports2.OutputTypes || (exports2.OutputTypes = {}));
      exports2.OUTPUT_TYPE_NAMES = [
        "redeemScript",
        "witnessScript",
        "bip32Derivation",
        "tapInternalKey",
        "tapTree",
        "tapBip32Derivation"
      ];
    }
  });

  // node_modules/bip174/src/lib/converter/global/globalXpub.js
  var require_globalXpub = __commonJS({
    "node_modules/bip174/src/lib/converter/global/globalXpub.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var typeFields_1 = require_typeFields();
      var range = (n2) => [...Array(n2).keys()];
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_1.GlobalTypes.GLOBAL_XPUB) {
          throw new Error(
            "Decode Error: could not decode globalXpub with key 0x" + keyVal.key.toString("hex")
          );
        }
        if (keyVal.key.length !== 79 || ![2, 3].includes(keyVal.key[46])) {
          throw new Error(
            "Decode Error: globalXpub has invalid extended pubkey in key 0x" + keyVal.key.toString("hex")
          );
        }
        if (keyVal.value.length / 4 % 1 !== 0) {
          throw new Error(
            "Decode Error: Global GLOBAL_XPUB value length should be multiple of 4"
          );
        }
        const extendedPubkey = keyVal.key.slice(1);
        const data = {
          masterFingerprint: keyVal.value.slice(0, 4),
          extendedPubkey,
          path: "m"
        };
        for (const i of range(keyVal.value.length / 4 - 1)) {
          const val = keyVal.value.readUInt32LE(i * 4 + 4);
          const isHard = !!(val & 2147483648);
          const idx = val & 2147483647;
          data.path += "/" + idx.toString(10) + (isHard ? "'" : "");
        }
        return data;
      }
      exports2.decode = decode;
      function encode(data) {
        const head = Buffer.from([typeFields_1.GlobalTypes.GLOBAL_XPUB]);
        const key = Buffer.concat([head, data.extendedPubkey]);
        const splitPath = data.path.split("/");
        const value = Buffer.allocUnsafe(splitPath.length * 4);
        data.masterFingerprint.copy(value, 0);
        let offset = 4;
        splitPath.slice(1).forEach((level) => {
          const isHard = level.slice(-1) === "'";
          let num = 2147483647 & parseInt(isHard ? level.slice(0, -1) : level, 10);
          if (isHard) num += 2147483648;
          value.writeUInt32LE(num, offset);
          offset += 4;
        });
        return {
          key,
          value
        };
      }
      exports2.encode = encode;
      exports2.expected = "{ masterFingerprint: Buffer; extendedPubkey: Buffer; path: string; }";
      function check(data) {
        const epk = data.extendedPubkey;
        const mfp = data.masterFingerprint;
        const p = data.path;
        return Buffer.isBuffer(epk) && epk.length === 78 && [2, 3].indexOf(epk[45]) > -1 && Buffer.isBuffer(mfp) && mfp.length === 4 && typeof p === "string" && !!p.match(/^m(\/\d+'?)*$/);
      }
      exports2.check = check;
      function canAddToArray(array, item, dupeSet) {
        const dupeString = item.extendedPubkey.toString("hex");
        if (dupeSet.has(dupeString)) return false;
        dupeSet.add(dupeString);
        return array.filter((v) => v.extendedPubkey.equals(item.extendedPubkey)).length === 0;
      }
      exports2.canAddToArray = canAddToArray;
    }
  });

  // node_modules/bip174/src/lib/converter/global/unsignedTx.js
  var require_unsignedTx = __commonJS({
    "node_modules/bip174/src/lib/converter/global/unsignedTx.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var typeFields_1 = require_typeFields();
      function encode(data) {
        return {
          key: Buffer.from([typeFields_1.GlobalTypes.UNSIGNED_TX]),
          value: data.toBuffer()
        };
      }
      exports2.encode = encode;
    }
  });

  // node_modules/bip174/src/lib/converter/input/finalScriptSig.js
  var require_finalScriptSig = __commonJS({
    "node_modules/bip174/src/lib/converter/input/finalScriptSig.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var typeFields_1 = require_typeFields();
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_1.InputTypes.FINAL_SCRIPTSIG) {
          throw new Error(
            "Decode Error: could not decode finalScriptSig with key 0x" + keyVal.key.toString("hex")
          );
        }
        return keyVal.value;
      }
      exports2.decode = decode;
      function encode(data) {
        const key = Buffer.from([typeFields_1.InputTypes.FINAL_SCRIPTSIG]);
        return {
          key,
          value: data
        };
      }
      exports2.encode = encode;
      exports2.expected = "Buffer";
      function check(data) {
        return Buffer.isBuffer(data);
      }
      exports2.check = check;
      function canAdd(currentData, newData) {
        return !!currentData && !!newData && currentData.finalScriptSig === void 0;
      }
      exports2.canAdd = canAdd;
    }
  });

  // node_modules/bip174/src/lib/converter/input/finalScriptWitness.js
  var require_finalScriptWitness = __commonJS({
    "node_modules/bip174/src/lib/converter/input/finalScriptWitness.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var typeFields_1 = require_typeFields();
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_1.InputTypes.FINAL_SCRIPTWITNESS) {
          throw new Error(
            "Decode Error: could not decode finalScriptWitness with key 0x" + keyVal.key.toString("hex")
          );
        }
        return keyVal.value;
      }
      exports2.decode = decode;
      function encode(data) {
        const key = Buffer.from([typeFields_1.InputTypes.FINAL_SCRIPTWITNESS]);
        return {
          key,
          value: data
        };
      }
      exports2.encode = encode;
      exports2.expected = "Buffer";
      function check(data) {
        return Buffer.isBuffer(data);
      }
      exports2.check = check;
      function canAdd(currentData, newData) {
        return !!currentData && !!newData && currentData.finalScriptWitness === void 0;
      }
      exports2.canAdd = canAdd;
    }
  });

  // node_modules/bip174/src/lib/converter/input/nonWitnessUtxo.js
  var require_nonWitnessUtxo = __commonJS({
    "node_modules/bip174/src/lib/converter/input/nonWitnessUtxo.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var typeFields_1 = require_typeFields();
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_1.InputTypes.NON_WITNESS_UTXO) {
          throw new Error(
            "Decode Error: could not decode nonWitnessUtxo with key 0x" + keyVal.key.toString("hex")
          );
        }
        return keyVal.value;
      }
      exports2.decode = decode;
      function encode(data) {
        return {
          key: Buffer.from([typeFields_1.InputTypes.NON_WITNESS_UTXO]),
          value: data
        };
      }
      exports2.encode = encode;
      exports2.expected = "Buffer";
      function check(data) {
        return Buffer.isBuffer(data);
      }
      exports2.check = check;
      function canAdd(currentData, newData) {
        return !!currentData && !!newData && currentData.nonWitnessUtxo === void 0;
      }
      exports2.canAdd = canAdd;
    }
  });

  // node_modules/bip174/src/lib/converter/input/partialSig.js
  var require_partialSig = __commonJS({
    "node_modules/bip174/src/lib/converter/input/partialSig.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var typeFields_1 = require_typeFields();
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_1.InputTypes.PARTIAL_SIG) {
          throw new Error(
            "Decode Error: could not decode partialSig with key 0x" + keyVal.key.toString("hex")
          );
        }
        if (!(keyVal.key.length === 34 || keyVal.key.length === 66) || ![2, 3, 4].includes(keyVal.key[1])) {
          throw new Error(
            "Decode Error: partialSig has invalid pubkey in key 0x" + keyVal.key.toString("hex")
          );
        }
        const pubkey = keyVal.key.slice(1);
        return {
          pubkey,
          signature: keyVal.value
        };
      }
      exports2.decode = decode;
      function encode(pSig) {
        const head = Buffer.from([typeFields_1.InputTypes.PARTIAL_SIG]);
        return {
          key: Buffer.concat([head, pSig.pubkey]),
          value: pSig.signature
        };
      }
      exports2.encode = encode;
      exports2.expected = "{ pubkey: Buffer; signature: Buffer; }";
      function check(data) {
        return Buffer.isBuffer(data.pubkey) && Buffer.isBuffer(data.signature) && [33, 65].includes(data.pubkey.length) && [2, 3, 4].includes(data.pubkey[0]) && isDerSigWithSighash(data.signature);
      }
      exports2.check = check;
      function isDerSigWithSighash(buf) {
        if (!Buffer.isBuffer(buf) || buf.length < 9) return false;
        if (buf[0] !== 48) return false;
        if (buf.length !== buf[1] + 3) return false;
        if (buf[2] !== 2) return false;
        const rLen = buf[3];
        if (rLen > 33 || rLen < 1) return false;
        if (buf[3 + rLen + 1] !== 2) return false;
        const sLen = buf[3 + rLen + 2];
        if (sLen > 33 || sLen < 1) return false;
        if (buf.length !== 3 + rLen + 2 + sLen + 2) return false;
        return true;
      }
      function canAddToArray(array, item, dupeSet) {
        const dupeString = item.pubkey.toString("hex");
        if (dupeSet.has(dupeString)) return false;
        dupeSet.add(dupeString);
        return array.filter((v) => v.pubkey.equals(item.pubkey)).length === 0;
      }
      exports2.canAddToArray = canAddToArray;
    }
  });

  // node_modules/bip174/src/lib/converter/input/porCommitment.js
  var require_porCommitment = __commonJS({
    "node_modules/bip174/src/lib/converter/input/porCommitment.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var typeFields_1 = require_typeFields();
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_1.InputTypes.POR_COMMITMENT) {
          throw new Error(
            "Decode Error: could not decode porCommitment with key 0x" + keyVal.key.toString("hex")
          );
        }
        return keyVal.value.toString("utf8");
      }
      exports2.decode = decode;
      function encode(data) {
        const key = Buffer.from([typeFields_1.InputTypes.POR_COMMITMENT]);
        return {
          key,
          value: Buffer.from(data, "utf8")
        };
      }
      exports2.encode = encode;
      exports2.expected = "string";
      function check(data) {
        return typeof data === "string";
      }
      exports2.check = check;
      function canAdd(currentData, newData) {
        return !!currentData && !!newData && currentData.porCommitment === void 0;
      }
      exports2.canAdd = canAdd;
    }
  });

  // node_modules/bip174/src/lib/converter/input/sighashType.js
  var require_sighashType = __commonJS({
    "node_modules/bip174/src/lib/converter/input/sighashType.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var typeFields_1 = require_typeFields();
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_1.InputTypes.SIGHASH_TYPE) {
          throw new Error(
            "Decode Error: could not decode sighashType with key 0x" + keyVal.key.toString("hex")
          );
        }
        return keyVal.value.readUInt32LE(0);
      }
      exports2.decode = decode;
      function encode(data) {
        const key = Buffer.from([typeFields_1.InputTypes.SIGHASH_TYPE]);
        const value = Buffer.allocUnsafe(4);
        value.writeUInt32LE(data, 0);
        return {
          key,
          value
        };
      }
      exports2.encode = encode;
      exports2.expected = "number";
      function check(data) {
        return typeof data === "number";
      }
      exports2.check = check;
      function canAdd(currentData, newData) {
        return !!currentData && !!newData && currentData.sighashType === void 0;
      }
      exports2.canAdd = canAdd;
    }
  });

  // node_modules/bip174/src/lib/converter/input/tapKeySig.js
  var require_tapKeySig = __commonJS({
    "node_modules/bip174/src/lib/converter/input/tapKeySig.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var typeFields_1 = require_typeFields();
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_1.InputTypes.TAP_KEY_SIG || keyVal.key.length !== 1) {
          throw new Error(
            "Decode Error: could not decode tapKeySig with key 0x" + keyVal.key.toString("hex")
          );
        }
        if (!check(keyVal.value)) {
          throw new Error(
            "Decode Error: tapKeySig not a valid 64-65-byte BIP340 signature"
          );
        }
        return keyVal.value;
      }
      exports2.decode = decode;
      function encode(value) {
        const key = Buffer.from([typeFields_1.InputTypes.TAP_KEY_SIG]);
        return { key, value };
      }
      exports2.encode = encode;
      exports2.expected = "Buffer";
      function check(data) {
        return Buffer.isBuffer(data) && (data.length === 64 || data.length === 65);
      }
      exports2.check = check;
      function canAdd(currentData, newData) {
        return !!currentData && !!newData && currentData.tapKeySig === void 0;
      }
      exports2.canAdd = canAdd;
    }
  });

  // node_modules/bip174/src/lib/converter/input/tapLeafScript.js
  var require_tapLeafScript = __commonJS({
    "node_modules/bip174/src/lib/converter/input/tapLeafScript.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var typeFields_1 = require_typeFields();
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_1.InputTypes.TAP_LEAF_SCRIPT) {
          throw new Error(
            "Decode Error: could not decode tapLeafScript with key 0x" + keyVal.key.toString("hex")
          );
        }
        if ((keyVal.key.length - 2) % 32 !== 0) {
          throw new Error(
            "Decode Error: tapLeafScript has invalid control block in key 0x" + keyVal.key.toString("hex")
          );
        }
        const leafVersion = keyVal.value[keyVal.value.length - 1];
        if ((keyVal.key[1] & 254) !== leafVersion) {
          throw new Error(
            "Decode Error: tapLeafScript bad leaf version in key 0x" + keyVal.key.toString("hex")
          );
        }
        const script = keyVal.value.slice(0, -1);
        const controlBlock = keyVal.key.slice(1);
        return { controlBlock, script, leafVersion };
      }
      exports2.decode = decode;
      function encode(tScript) {
        const head = Buffer.from([typeFields_1.InputTypes.TAP_LEAF_SCRIPT]);
        const verBuf = Buffer.from([tScript.leafVersion]);
        return {
          key: Buffer.concat([head, tScript.controlBlock]),
          value: Buffer.concat([tScript.script, verBuf])
        };
      }
      exports2.encode = encode;
      exports2.expected = "{ controlBlock: Buffer; leafVersion: number, script: Buffer; }";
      function check(data) {
        return Buffer.isBuffer(data.controlBlock) && (data.controlBlock.length - 1) % 32 === 0 && (data.controlBlock[0] & 254) === data.leafVersion && Buffer.isBuffer(data.script);
      }
      exports2.check = check;
      function canAddToArray(array, item, dupeSet) {
        const dupeString = item.controlBlock.toString("hex");
        if (dupeSet.has(dupeString)) return false;
        dupeSet.add(dupeString);
        return array.filter((v) => v.controlBlock.equals(item.controlBlock)).length === 0;
      }
      exports2.canAddToArray = canAddToArray;
    }
  });

  // node_modules/bip174/src/lib/converter/input/tapMerkleRoot.js
  var require_tapMerkleRoot = __commonJS({
    "node_modules/bip174/src/lib/converter/input/tapMerkleRoot.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var typeFields_1 = require_typeFields();
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_1.InputTypes.TAP_MERKLE_ROOT || keyVal.key.length !== 1) {
          throw new Error(
            "Decode Error: could not decode tapMerkleRoot with key 0x" + keyVal.key.toString("hex")
          );
        }
        if (!check(keyVal.value)) {
          throw new Error("Decode Error: tapMerkleRoot not a 32-byte hash");
        }
        return keyVal.value;
      }
      exports2.decode = decode;
      function encode(value) {
        const key = Buffer.from([typeFields_1.InputTypes.TAP_MERKLE_ROOT]);
        return { key, value };
      }
      exports2.encode = encode;
      exports2.expected = "Buffer";
      function check(data) {
        return Buffer.isBuffer(data) && data.length === 32;
      }
      exports2.check = check;
      function canAdd(currentData, newData) {
        return !!currentData && !!newData && currentData.tapMerkleRoot === void 0;
      }
      exports2.canAdd = canAdd;
    }
  });

  // node_modules/bip174/src/lib/converter/input/tapScriptSig.js
  var require_tapScriptSig = __commonJS({
    "node_modules/bip174/src/lib/converter/input/tapScriptSig.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var typeFields_1 = require_typeFields();
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_1.InputTypes.TAP_SCRIPT_SIG) {
          throw new Error(
            "Decode Error: could not decode tapScriptSig with key 0x" + keyVal.key.toString("hex")
          );
        }
        if (keyVal.key.length !== 65) {
          throw new Error(
            "Decode Error: tapScriptSig has invalid key 0x" + keyVal.key.toString("hex")
          );
        }
        if (keyVal.value.length !== 64 && keyVal.value.length !== 65) {
          throw new Error(
            "Decode Error: tapScriptSig has invalid signature in key 0x" + keyVal.key.toString("hex")
          );
        }
        const pubkey = keyVal.key.slice(1, 33);
        const leafHash = keyVal.key.slice(33);
        return {
          pubkey,
          leafHash,
          signature: keyVal.value
        };
      }
      exports2.decode = decode;
      function encode(tSig) {
        const head = Buffer.from([typeFields_1.InputTypes.TAP_SCRIPT_SIG]);
        return {
          key: Buffer.concat([head, tSig.pubkey, tSig.leafHash]),
          value: tSig.signature
        };
      }
      exports2.encode = encode;
      exports2.expected = "{ pubkey: Buffer; leafHash: Buffer; signature: Buffer; }";
      function check(data) {
        return Buffer.isBuffer(data.pubkey) && Buffer.isBuffer(data.leafHash) && Buffer.isBuffer(data.signature) && data.pubkey.length === 32 && data.leafHash.length === 32 && (data.signature.length === 64 || data.signature.length === 65);
      }
      exports2.check = check;
      function canAddToArray(array, item, dupeSet) {
        const dupeString = item.pubkey.toString("hex") + item.leafHash.toString("hex");
        if (dupeSet.has(dupeString)) return false;
        dupeSet.add(dupeString);
        return array.filter(
          (v) => v.pubkey.equals(item.pubkey) && v.leafHash.equals(item.leafHash)
        ).length === 0;
      }
      exports2.canAddToArray = canAddToArray;
    }
  });

  // node_modules/bip174/src/lib/converter/varint.js
  var require_varint = __commonJS({
    "node_modules/bip174/src/lib/converter/varint.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var MAX_SAFE_INTEGER = 9007199254740991;
      function checkUInt53(n2) {
        if (n2 < 0 || n2 > MAX_SAFE_INTEGER || n2 % 1 !== 0)
          throw new RangeError("value out of range");
      }
      function encode(_number, buffer, offset) {
        checkUInt53(_number);
        if (!buffer) buffer = Buffer.allocUnsafe(encodingLength(_number));
        if (!Buffer.isBuffer(buffer))
          throw new TypeError("buffer must be a Buffer instance");
        if (!offset) offset = 0;
        if (_number < 253) {
          buffer.writeUInt8(_number, offset);
          Object.assign(encode, { bytes: 1 });
        } else if (_number <= 65535) {
          buffer.writeUInt8(253, offset);
          buffer.writeUInt16LE(_number, offset + 1);
          Object.assign(encode, { bytes: 3 });
        } else if (_number <= 4294967295) {
          buffer.writeUInt8(254, offset);
          buffer.writeUInt32LE(_number, offset + 1);
          Object.assign(encode, { bytes: 5 });
        } else {
          buffer.writeUInt8(255, offset);
          buffer.writeUInt32LE(_number >>> 0, offset + 1);
          buffer.writeUInt32LE(_number / 4294967296 | 0, offset + 5);
          Object.assign(encode, { bytes: 9 });
        }
        return buffer;
      }
      exports2.encode = encode;
      function decode(buffer, offset) {
        if (!Buffer.isBuffer(buffer))
          throw new TypeError("buffer must be a Buffer instance");
        if (!offset) offset = 0;
        const first = buffer.readUInt8(offset);
        if (first < 253) {
          Object.assign(decode, { bytes: 1 });
          return first;
        } else if (first === 253) {
          Object.assign(decode, { bytes: 3 });
          return buffer.readUInt16LE(offset + 1);
        } else if (first === 254) {
          Object.assign(decode, { bytes: 5 });
          return buffer.readUInt32LE(offset + 1);
        } else {
          Object.assign(decode, { bytes: 9 });
          const lo = buffer.readUInt32LE(offset + 1);
          const hi = buffer.readUInt32LE(offset + 5);
          const _number = hi * 4294967296 + lo;
          checkUInt53(_number);
          return _number;
        }
      }
      exports2.decode = decode;
      function encodingLength(_number) {
        checkUInt53(_number);
        return _number < 253 ? 1 : _number <= 65535 ? 3 : _number <= 4294967295 ? 5 : 9;
      }
      exports2.encodingLength = encodingLength;
    }
  });

  // node_modules/bip174/src/lib/converter/tools.js
  var require_tools = __commonJS({
    "node_modules/bip174/src/lib/converter/tools.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var varuint = require_varint();
      exports2.range = (n2) => [...Array(n2).keys()];
      function reverseBuffer(buffer) {
        if (buffer.length < 1) return buffer;
        let j = buffer.length - 1;
        let tmp = 0;
        for (let i = 0; i < buffer.length / 2; i++) {
          tmp = buffer[i];
          buffer[i] = buffer[j];
          buffer[j] = tmp;
          j--;
        }
        return buffer;
      }
      exports2.reverseBuffer = reverseBuffer;
      function keyValsToBuffer(keyVals) {
        const buffers = keyVals.map(keyValToBuffer);
        buffers.push(Buffer.from([0]));
        return Buffer.concat(buffers);
      }
      exports2.keyValsToBuffer = keyValsToBuffer;
      function keyValToBuffer(keyVal) {
        const keyLen = keyVal.key.length;
        const valLen = keyVal.value.length;
        const keyVarIntLen = varuint.encodingLength(keyLen);
        const valVarIntLen = varuint.encodingLength(valLen);
        const buffer = Buffer.allocUnsafe(
          keyVarIntLen + keyLen + valVarIntLen + valLen
        );
        varuint.encode(keyLen, buffer, 0);
        keyVal.key.copy(buffer, keyVarIntLen);
        varuint.encode(valLen, buffer, keyVarIntLen + keyLen);
        keyVal.value.copy(buffer, keyVarIntLen + keyLen + valVarIntLen);
        return buffer;
      }
      exports2.keyValToBuffer = keyValToBuffer;
      function verifuint(value, max) {
        if (typeof value !== "number")
          throw new Error("cannot write a non-number as a number");
        if (value < 0)
          throw new Error("specified a negative value for writing an unsigned value");
        if (value > max) throw new Error("RangeError: value out of range");
        if (Math.floor(value) !== value)
          throw new Error("value has a fractional component");
      }
      function readUInt64LE(buffer, offset) {
        const a = buffer.readUInt32LE(offset);
        let b = buffer.readUInt32LE(offset + 4);
        b *= 4294967296;
        verifuint(b + a, 9007199254740991);
        return b + a;
      }
      exports2.readUInt64LE = readUInt64LE;
      function writeUInt64LE(buffer, value, offset) {
        verifuint(value, 9007199254740991);
        buffer.writeInt32LE(value & -1, offset);
        buffer.writeUInt32LE(Math.floor(value / 4294967296), offset + 4);
        return offset + 8;
      }
      exports2.writeUInt64LE = writeUInt64LE;
    }
  });

  // node_modules/bip174/src/lib/converter/input/witnessUtxo.js
  var require_witnessUtxo = __commonJS({
    "node_modules/bip174/src/lib/converter/input/witnessUtxo.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var typeFields_1 = require_typeFields();
      var tools_1 = require_tools();
      var varuint = require_varint();
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_1.InputTypes.WITNESS_UTXO) {
          throw new Error(
            "Decode Error: could not decode witnessUtxo with key 0x" + keyVal.key.toString("hex")
          );
        }
        const value = tools_1.readUInt64LE(keyVal.value, 0);
        let _offset = 8;
        const scriptLen = varuint.decode(keyVal.value, _offset);
        _offset += varuint.encodingLength(scriptLen);
        const script = keyVal.value.slice(_offset);
        if (script.length !== scriptLen) {
          throw new Error("Decode Error: WITNESS_UTXO script is not proper length");
        }
        return {
          script,
          value
        };
      }
      exports2.decode = decode;
      function encode(data) {
        const { script, value } = data;
        const varintLen = varuint.encodingLength(script.length);
        const result = Buffer.allocUnsafe(8 + varintLen + script.length);
        tools_1.writeUInt64LE(result, value, 0);
        varuint.encode(script.length, result, 8);
        script.copy(result, 8 + varintLen);
        return {
          key: Buffer.from([typeFields_1.InputTypes.WITNESS_UTXO]),
          value: result
        };
      }
      exports2.encode = encode;
      exports2.expected = "{ script: Buffer; value: number; }";
      function check(data) {
        return Buffer.isBuffer(data.script) && typeof data.value === "number";
      }
      exports2.check = check;
      function canAdd(currentData, newData) {
        return !!currentData && !!newData && currentData.witnessUtxo === void 0;
      }
      exports2.canAdd = canAdd;
    }
  });

  // node_modules/bip174/src/lib/converter/output/tapTree.js
  var require_tapTree = __commonJS({
    "node_modules/bip174/src/lib/converter/output/tapTree.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var typeFields_1 = require_typeFields();
      var varuint = require_varint();
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_1.OutputTypes.TAP_TREE || keyVal.key.length !== 1) {
          throw new Error(
            "Decode Error: could not decode tapTree with key 0x" + keyVal.key.toString("hex")
          );
        }
        let _offset = 0;
        const data = [];
        while (_offset < keyVal.value.length) {
          const depth = keyVal.value[_offset++];
          const leafVersion = keyVal.value[_offset++];
          const scriptLen = varuint.decode(keyVal.value, _offset);
          _offset += varuint.encodingLength(scriptLen);
          data.push({
            depth,
            leafVersion,
            script: keyVal.value.slice(_offset, _offset + scriptLen)
          });
          _offset += scriptLen;
        }
        return { leaves: data };
      }
      exports2.decode = decode;
      function encode(tree) {
        const key = Buffer.from([typeFields_1.OutputTypes.TAP_TREE]);
        const bufs = [].concat(
          ...tree.leaves.map((tapLeaf) => [
            Buffer.of(tapLeaf.depth, tapLeaf.leafVersion),
            varuint.encode(tapLeaf.script.length),
            tapLeaf.script
          ])
        );
        return {
          key,
          value: Buffer.concat(bufs)
        };
      }
      exports2.encode = encode;
      exports2.expected = "{ leaves: [{ depth: number; leafVersion: number, script: Buffer; }] }";
      function check(data) {
        return Array.isArray(data.leaves) && data.leaves.every(
          (tapLeaf) => tapLeaf.depth >= 0 && tapLeaf.depth <= 128 && (tapLeaf.leafVersion & 254) === tapLeaf.leafVersion && Buffer.isBuffer(tapLeaf.script)
        );
      }
      exports2.check = check;
      function canAdd(currentData, newData) {
        return !!currentData && !!newData && currentData.tapTree === void 0;
      }
      exports2.canAdd = canAdd;
    }
  });

  // node_modules/bip174/src/lib/converter/shared/bip32Derivation.js
  var require_bip32Derivation = __commonJS({
    "node_modules/bip174/src/lib/converter/shared/bip32Derivation.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var range = (n2) => [...Array(n2).keys()];
      var isValidDERKey = (pubkey) => pubkey.length === 33 && [2, 3].includes(pubkey[0]) || pubkey.length === 65 && 4 === pubkey[0];
      function makeConverter(TYPE_BYTE, isValidPubkey = isValidDERKey) {
        function decode(keyVal) {
          if (keyVal.key[0] !== TYPE_BYTE) {
            throw new Error(
              "Decode Error: could not decode bip32Derivation with key 0x" + keyVal.key.toString("hex")
            );
          }
          const pubkey = keyVal.key.slice(1);
          if (!isValidPubkey(pubkey)) {
            throw new Error(
              "Decode Error: bip32Derivation has invalid pubkey in key 0x" + keyVal.key.toString("hex")
            );
          }
          if (keyVal.value.length / 4 % 1 !== 0) {
            throw new Error(
              "Decode Error: Input BIP32_DERIVATION value length should be multiple of 4"
            );
          }
          const data = {
            masterFingerprint: keyVal.value.slice(0, 4),
            pubkey,
            path: "m"
          };
          for (const i of range(keyVal.value.length / 4 - 1)) {
            const val = keyVal.value.readUInt32LE(i * 4 + 4);
            const isHard = !!(val & 2147483648);
            const idx = val & 2147483647;
            data.path += "/" + idx.toString(10) + (isHard ? "'" : "");
          }
          return data;
        }
        function encode(data) {
          const head = Buffer.from([TYPE_BYTE]);
          const key = Buffer.concat([head, data.pubkey]);
          const splitPath = data.path.split("/");
          const value = Buffer.allocUnsafe(splitPath.length * 4);
          data.masterFingerprint.copy(value, 0);
          let offset = 4;
          splitPath.slice(1).forEach((level) => {
            const isHard = level.slice(-1) === "'";
            let num = 2147483647 & parseInt(isHard ? level.slice(0, -1) : level, 10);
            if (isHard) num += 2147483648;
            value.writeUInt32LE(num, offset);
            offset += 4;
          });
          return {
            key,
            value
          };
        }
        const expected = "{ masterFingerprint: Buffer; pubkey: Buffer; path: string; }";
        function check(data) {
          return Buffer.isBuffer(data.pubkey) && Buffer.isBuffer(data.masterFingerprint) && typeof data.path === "string" && isValidPubkey(data.pubkey) && data.masterFingerprint.length === 4;
        }
        function canAddToArray(array, item, dupeSet) {
          const dupeString = item.pubkey.toString("hex");
          if (dupeSet.has(dupeString)) return false;
          dupeSet.add(dupeString);
          return array.filter((v) => v.pubkey.equals(item.pubkey)).length === 0;
        }
        return {
          decode,
          encode,
          check,
          expected,
          canAddToArray
        };
      }
      exports2.makeConverter = makeConverter;
    }
  });

  // node_modules/bip174/src/lib/converter/shared/checkPubkey.js
  var require_checkPubkey = __commonJS({
    "node_modules/bip174/src/lib/converter/shared/checkPubkey.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      function makeChecker(pubkeyTypes) {
        return checkPubkey;
        function checkPubkey(keyVal) {
          let pubkey;
          if (pubkeyTypes.includes(keyVal.key[0])) {
            pubkey = keyVal.key.slice(1);
            if (!(pubkey.length === 33 || pubkey.length === 65) || ![2, 3, 4].includes(pubkey[0])) {
              throw new Error(
                "Format Error: invalid pubkey in key 0x" + keyVal.key.toString("hex")
              );
            }
          }
          return pubkey;
        }
      }
      exports2.makeChecker = makeChecker;
    }
  });

  // node_modules/bip174/src/lib/converter/shared/redeemScript.js
  var require_redeemScript = __commonJS({
    "node_modules/bip174/src/lib/converter/shared/redeemScript.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      function makeConverter(TYPE_BYTE) {
        function decode(keyVal) {
          if (keyVal.key[0] !== TYPE_BYTE) {
            throw new Error(
              "Decode Error: could not decode redeemScript with key 0x" + keyVal.key.toString("hex")
            );
          }
          return keyVal.value;
        }
        function encode(data) {
          const key = Buffer.from([TYPE_BYTE]);
          return {
            key,
            value: data
          };
        }
        const expected = "Buffer";
        function check(data) {
          return Buffer.isBuffer(data);
        }
        function canAdd(currentData, newData) {
          return !!currentData && !!newData && currentData.redeemScript === void 0;
        }
        return {
          decode,
          encode,
          check,
          expected,
          canAdd
        };
      }
      exports2.makeConverter = makeConverter;
    }
  });

  // node_modules/bip174/src/lib/converter/shared/tapBip32Derivation.js
  var require_tapBip32Derivation = __commonJS({
    "node_modules/bip174/src/lib/converter/shared/tapBip32Derivation.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var varuint = require_varint();
      var bip32Derivation = require_bip32Derivation();
      var isValidBIP340Key = (pubkey) => pubkey.length === 32;
      function makeConverter(TYPE_BYTE) {
        const parent = bip32Derivation.makeConverter(TYPE_BYTE, isValidBIP340Key);
        function decode(keyVal) {
          const nHashes = varuint.decode(keyVal.value);
          const nHashesLen = varuint.encodingLength(nHashes);
          const base = parent.decode({
            key: keyVal.key,
            value: keyVal.value.slice(nHashesLen + nHashes * 32)
          });
          const leafHashes = new Array(nHashes);
          for (let i = 0, _offset = nHashesLen; i < nHashes; i++, _offset += 32) {
            leafHashes[i] = keyVal.value.slice(_offset, _offset + 32);
          }
          return Object.assign({}, base, { leafHashes });
        }
        function encode(data) {
          const base = parent.encode(data);
          const nHashesLen = varuint.encodingLength(data.leafHashes.length);
          const nHashesBuf = Buffer.allocUnsafe(nHashesLen);
          varuint.encode(data.leafHashes.length, nHashesBuf);
          const value = Buffer.concat([nHashesBuf, ...data.leafHashes, base.value]);
          return Object.assign({}, base, { value });
        }
        const expected = "{ masterFingerprint: Buffer; pubkey: Buffer; path: string; leafHashes: Buffer[]; }";
        function check(data) {
          return Array.isArray(data.leafHashes) && data.leafHashes.every(
            (leafHash) => Buffer.isBuffer(leafHash) && leafHash.length === 32
          ) && parent.check(data);
        }
        return {
          decode,
          encode,
          check,
          expected,
          canAddToArray: parent.canAddToArray
        };
      }
      exports2.makeConverter = makeConverter;
    }
  });

  // node_modules/bip174/src/lib/converter/shared/tapInternalKey.js
  var require_tapInternalKey = __commonJS({
    "node_modules/bip174/src/lib/converter/shared/tapInternalKey.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      function makeConverter(TYPE_BYTE) {
        function decode(keyVal) {
          if (keyVal.key[0] !== TYPE_BYTE || keyVal.key.length !== 1) {
            throw new Error(
              "Decode Error: could not decode tapInternalKey with key 0x" + keyVal.key.toString("hex")
            );
          }
          if (keyVal.value.length !== 32) {
            throw new Error(
              "Decode Error: tapInternalKey not a 32-byte x-only pubkey"
            );
          }
          return keyVal.value;
        }
        function encode(value) {
          const key = Buffer.from([TYPE_BYTE]);
          return { key, value };
        }
        const expected = "Buffer";
        function check(data) {
          return Buffer.isBuffer(data) && data.length === 32;
        }
        function canAdd(currentData, newData) {
          return !!currentData && !!newData && currentData.tapInternalKey === void 0;
        }
        return {
          decode,
          encode,
          check,
          expected,
          canAdd
        };
      }
      exports2.makeConverter = makeConverter;
    }
  });

  // node_modules/bip174/src/lib/converter/shared/witnessScript.js
  var require_witnessScript = __commonJS({
    "node_modules/bip174/src/lib/converter/shared/witnessScript.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      function makeConverter(TYPE_BYTE) {
        function decode(keyVal) {
          if (keyVal.key[0] !== TYPE_BYTE) {
            throw new Error(
              "Decode Error: could not decode witnessScript with key 0x" + keyVal.key.toString("hex")
            );
          }
          return keyVal.value;
        }
        function encode(data) {
          const key = Buffer.from([TYPE_BYTE]);
          return {
            key,
            value: data
          };
        }
        const expected = "Buffer";
        function check(data) {
          return Buffer.isBuffer(data);
        }
        function canAdd(currentData, newData) {
          return !!currentData && !!newData && currentData.witnessScript === void 0;
        }
        return {
          decode,
          encode,
          check,
          expected,
          canAdd
        };
      }
      exports2.makeConverter = makeConverter;
    }
  });

  // node_modules/bip174/src/lib/converter/index.js
  var require_converter = __commonJS({
    "node_modules/bip174/src/lib/converter/index.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var typeFields_1 = require_typeFields();
      var globalXpub = require_globalXpub();
      var unsignedTx = require_unsignedTx();
      var finalScriptSig = require_finalScriptSig();
      var finalScriptWitness = require_finalScriptWitness();
      var nonWitnessUtxo = require_nonWitnessUtxo();
      var partialSig = require_partialSig();
      var porCommitment = require_porCommitment();
      var sighashType = require_sighashType();
      var tapKeySig = require_tapKeySig();
      var tapLeafScript = require_tapLeafScript();
      var tapMerkleRoot = require_tapMerkleRoot();
      var tapScriptSig = require_tapScriptSig();
      var witnessUtxo = require_witnessUtxo();
      var tapTree = require_tapTree();
      var bip32Derivation = require_bip32Derivation();
      var checkPubkey = require_checkPubkey();
      var redeemScript = require_redeemScript();
      var tapBip32Derivation = require_tapBip32Derivation();
      var tapInternalKey = require_tapInternalKey();
      var witnessScript = require_witnessScript();
      var globals = {
        unsignedTx,
        globalXpub,
        // pass an Array of key bytes that require pubkey beside the key
        checkPubkey: checkPubkey.makeChecker([])
      };
      exports2.globals = globals;
      var inputs = {
        nonWitnessUtxo,
        partialSig,
        sighashType,
        finalScriptSig,
        finalScriptWitness,
        porCommitment,
        witnessUtxo,
        bip32Derivation: bip32Derivation.makeConverter(
          typeFields_1.InputTypes.BIP32_DERIVATION
        ),
        redeemScript: redeemScript.makeConverter(
          typeFields_1.InputTypes.REDEEM_SCRIPT
        ),
        witnessScript: witnessScript.makeConverter(
          typeFields_1.InputTypes.WITNESS_SCRIPT
        ),
        checkPubkey: checkPubkey.makeChecker([
          typeFields_1.InputTypes.PARTIAL_SIG,
          typeFields_1.InputTypes.BIP32_DERIVATION
        ]),
        tapKeySig,
        tapScriptSig,
        tapLeafScript,
        tapBip32Derivation: tapBip32Derivation.makeConverter(
          typeFields_1.InputTypes.TAP_BIP32_DERIVATION
        ),
        tapInternalKey: tapInternalKey.makeConverter(
          typeFields_1.InputTypes.TAP_INTERNAL_KEY
        ),
        tapMerkleRoot
      };
      exports2.inputs = inputs;
      var outputs = {
        bip32Derivation: bip32Derivation.makeConverter(
          typeFields_1.OutputTypes.BIP32_DERIVATION
        ),
        redeemScript: redeemScript.makeConverter(
          typeFields_1.OutputTypes.REDEEM_SCRIPT
        ),
        witnessScript: witnessScript.makeConverter(
          typeFields_1.OutputTypes.WITNESS_SCRIPT
        ),
        checkPubkey: checkPubkey.makeChecker([
          typeFields_1.OutputTypes.BIP32_DERIVATION
        ]),
        tapBip32Derivation: tapBip32Derivation.makeConverter(
          typeFields_1.OutputTypes.TAP_BIP32_DERIVATION
        ),
        tapTree,
        tapInternalKey: tapInternalKey.makeConverter(
          typeFields_1.OutputTypes.TAP_INTERNAL_KEY
        )
      };
      exports2.outputs = outputs;
    }
  });

  // node_modules/bip174/src/lib/parser/fromBuffer.js
  var require_fromBuffer = __commonJS({
    "node_modules/bip174/src/lib/parser/fromBuffer.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var convert3 = require_converter();
      var tools_1 = require_tools();
      var varuint = require_varint();
      var typeFields_1 = require_typeFields();
      function psbtFromBuffer(buffer, txGetter) {
        let offset = 0;
        function varSlice() {
          const keyLen = varuint.decode(buffer, offset);
          offset += varuint.encodingLength(keyLen);
          const key = buffer.slice(offset, offset + keyLen);
          offset += keyLen;
          return key;
        }
        function readUInt32BE() {
          const num = buffer.readUInt32BE(offset);
          offset += 4;
          return num;
        }
        function readUInt8() {
          const num = buffer.readUInt8(offset);
          offset += 1;
          return num;
        }
        function getKeyValue() {
          const key = varSlice();
          const value = varSlice();
          return {
            key,
            value
          };
        }
        function checkEndOfKeyValPairs() {
          if (offset >= buffer.length) {
            throw new Error("Format Error: Unexpected End of PSBT");
          }
          const isEnd = buffer.readUInt8(offset) === 0;
          if (isEnd) {
            offset++;
          }
          return isEnd;
        }
        if (readUInt32BE() !== 1886610036) {
          throw new Error("Format Error: Invalid Magic Number");
        }
        if (readUInt8() !== 255) {
          throw new Error(
            "Format Error: Magic Number must be followed by 0xff separator"
          );
        }
        const globalMapKeyVals = [];
        const globalKeyIndex = {};
        while (!checkEndOfKeyValPairs()) {
          const keyVal = getKeyValue();
          const hexKey = keyVal.key.toString("hex");
          if (globalKeyIndex[hexKey]) {
            throw new Error(
              "Format Error: Keys must be unique for global keymap: key " + hexKey
            );
          }
          globalKeyIndex[hexKey] = 1;
          globalMapKeyVals.push(keyVal);
        }
        const unsignedTxMaps = globalMapKeyVals.filter(
          (keyVal) => keyVal.key[0] === typeFields_1.GlobalTypes.UNSIGNED_TX
        );
        if (unsignedTxMaps.length !== 1) {
          throw new Error("Format Error: Only one UNSIGNED_TX allowed");
        }
        const unsignedTx = txGetter(unsignedTxMaps[0].value);
        const { inputCount, outputCount } = unsignedTx.getInputOutputCounts();
        const inputKeyVals = [];
        const outputKeyVals = [];
        for (const index of tools_1.range(inputCount)) {
          const inputKeyIndex = {};
          const input = [];
          while (!checkEndOfKeyValPairs()) {
            const keyVal = getKeyValue();
            const hexKey = keyVal.key.toString("hex");
            if (inputKeyIndex[hexKey]) {
              throw new Error(
                "Format Error: Keys must be unique for each input: input index " + index + " key " + hexKey
              );
            }
            inputKeyIndex[hexKey] = 1;
            input.push(keyVal);
          }
          inputKeyVals.push(input);
        }
        for (const index of tools_1.range(outputCount)) {
          const outputKeyIndex = {};
          const output = [];
          while (!checkEndOfKeyValPairs()) {
            const keyVal = getKeyValue();
            const hexKey = keyVal.key.toString("hex");
            if (outputKeyIndex[hexKey]) {
              throw new Error(
                "Format Error: Keys must be unique for each output: output index " + index + " key " + hexKey
              );
            }
            outputKeyIndex[hexKey] = 1;
            output.push(keyVal);
          }
          outputKeyVals.push(output);
        }
        return psbtFromKeyVals(unsignedTx, {
          globalMapKeyVals,
          inputKeyVals,
          outputKeyVals
        });
      }
      exports2.psbtFromBuffer = psbtFromBuffer;
      function checkKeyBuffer(type, keyBuf, keyNum) {
        if (!keyBuf.equals(Buffer.from([keyNum]))) {
          throw new Error(
            `Format Error: Invalid ${type} key: ${keyBuf.toString("hex")}`
          );
        }
      }
      exports2.checkKeyBuffer = checkKeyBuffer;
      function psbtFromKeyVals(unsignedTx, { globalMapKeyVals, inputKeyVals, outputKeyVals }) {
        const globalMap = {
          unsignedTx
        };
        let txCount = 0;
        for (const keyVal of globalMapKeyVals) {
          switch (keyVal.key[0]) {
            case typeFields_1.GlobalTypes.UNSIGNED_TX:
              checkKeyBuffer(
                "global",
                keyVal.key,
                typeFields_1.GlobalTypes.UNSIGNED_TX
              );
              if (txCount > 0) {
                throw new Error("Format Error: GlobalMap has multiple UNSIGNED_TX");
              }
              txCount++;
              break;
            case typeFields_1.GlobalTypes.GLOBAL_XPUB:
              if (globalMap.globalXpub === void 0) {
                globalMap.globalXpub = [];
              }
              globalMap.globalXpub.push(convert3.globals.globalXpub.decode(keyVal));
              break;
            default:
              if (!globalMap.unknownKeyVals) globalMap.unknownKeyVals = [];
              globalMap.unknownKeyVals.push(keyVal);
          }
        }
        const inputCount = inputKeyVals.length;
        const outputCount = outputKeyVals.length;
        const inputs = [];
        const outputs = [];
        for (const index of tools_1.range(inputCount)) {
          const input = {};
          for (const keyVal of inputKeyVals[index]) {
            convert3.inputs.checkPubkey(keyVal);
            switch (keyVal.key[0]) {
              case typeFields_1.InputTypes.NON_WITNESS_UTXO:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_1.InputTypes.NON_WITNESS_UTXO
                );
                if (input.nonWitnessUtxo !== void 0) {
                  throw new Error(
                    "Format Error: Input has multiple NON_WITNESS_UTXO"
                  );
                }
                input.nonWitnessUtxo = convert3.inputs.nonWitnessUtxo.decode(keyVal);
                break;
              case typeFields_1.InputTypes.WITNESS_UTXO:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_1.InputTypes.WITNESS_UTXO
                );
                if (input.witnessUtxo !== void 0) {
                  throw new Error("Format Error: Input has multiple WITNESS_UTXO");
                }
                input.witnessUtxo = convert3.inputs.witnessUtxo.decode(keyVal);
                break;
              case typeFields_1.InputTypes.PARTIAL_SIG:
                if (input.partialSig === void 0) {
                  input.partialSig = [];
                }
                input.partialSig.push(convert3.inputs.partialSig.decode(keyVal));
                break;
              case typeFields_1.InputTypes.SIGHASH_TYPE:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_1.InputTypes.SIGHASH_TYPE
                );
                if (input.sighashType !== void 0) {
                  throw new Error("Format Error: Input has multiple SIGHASH_TYPE");
                }
                input.sighashType = convert3.inputs.sighashType.decode(keyVal);
                break;
              case typeFields_1.InputTypes.REDEEM_SCRIPT:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_1.InputTypes.REDEEM_SCRIPT
                );
                if (input.redeemScript !== void 0) {
                  throw new Error("Format Error: Input has multiple REDEEM_SCRIPT");
                }
                input.redeemScript = convert3.inputs.redeemScript.decode(keyVal);
                break;
              case typeFields_1.InputTypes.WITNESS_SCRIPT:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_1.InputTypes.WITNESS_SCRIPT
                );
                if (input.witnessScript !== void 0) {
                  throw new Error("Format Error: Input has multiple WITNESS_SCRIPT");
                }
                input.witnessScript = convert3.inputs.witnessScript.decode(keyVal);
                break;
              case typeFields_1.InputTypes.BIP32_DERIVATION:
                if (input.bip32Derivation === void 0) {
                  input.bip32Derivation = [];
                }
                input.bip32Derivation.push(
                  convert3.inputs.bip32Derivation.decode(keyVal)
                );
                break;
              case typeFields_1.InputTypes.FINAL_SCRIPTSIG:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_1.InputTypes.FINAL_SCRIPTSIG
                );
                input.finalScriptSig = convert3.inputs.finalScriptSig.decode(keyVal);
                break;
              case typeFields_1.InputTypes.FINAL_SCRIPTWITNESS:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_1.InputTypes.FINAL_SCRIPTWITNESS
                );
                input.finalScriptWitness = convert3.inputs.finalScriptWitness.decode(
                  keyVal
                );
                break;
              case typeFields_1.InputTypes.POR_COMMITMENT:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_1.InputTypes.POR_COMMITMENT
                );
                input.porCommitment = convert3.inputs.porCommitment.decode(keyVal);
                break;
              case typeFields_1.InputTypes.TAP_KEY_SIG:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_1.InputTypes.TAP_KEY_SIG
                );
                input.tapKeySig = convert3.inputs.tapKeySig.decode(keyVal);
                break;
              case typeFields_1.InputTypes.TAP_SCRIPT_SIG:
                if (input.tapScriptSig === void 0) {
                  input.tapScriptSig = [];
                }
                input.tapScriptSig.push(convert3.inputs.tapScriptSig.decode(keyVal));
                break;
              case typeFields_1.InputTypes.TAP_LEAF_SCRIPT:
                if (input.tapLeafScript === void 0) {
                  input.tapLeafScript = [];
                }
                input.tapLeafScript.push(convert3.inputs.tapLeafScript.decode(keyVal));
                break;
              case typeFields_1.InputTypes.TAP_BIP32_DERIVATION:
                if (input.tapBip32Derivation === void 0) {
                  input.tapBip32Derivation = [];
                }
                input.tapBip32Derivation.push(
                  convert3.inputs.tapBip32Derivation.decode(keyVal)
                );
                break;
              case typeFields_1.InputTypes.TAP_INTERNAL_KEY:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_1.InputTypes.TAP_INTERNAL_KEY
                );
                input.tapInternalKey = convert3.inputs.tapInternalKey.decode(keyVal);
                break;
              case typeFields_1.InputTypes.TAP_MERKLE_ROOT:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_1.InputTypes.TAP_MERKLE_ROOT
                );
                input.tapMerkleRoot = convert3.inputs.tapMerkleRoot.decode(keyVal);
                break;
              default:
                if (!input.unknownKeyVals) input.unknownKeyVals = [];
                input.unknownKeyVals.push(keyVal);
            }
          }
          inputs.push(input);
        }
        for (const index of tools_1.range(outputCount)) {
          const output = {};
          for (const keyVal of outputKeyVals[index]) {
            convert3.outputs.checkPubkey(keyVal);
            switch (keyVal.key[0]) {
              case typeFields_1.OutputTypes.REDEEM_SCRIPT:
                checkKeyBuffer(
                  "output",
                  keyVal.key,
                  typeFields_1.OutputTypes.REDEEM_SCRIPT
                );
                if (output.redeemScript !== void 0) {
                  throw new Error("Format Error: Output has multiple REDEEM_SCRIPT");
                }
                output.redeemScript = convert3.outputs.redeemScript.decode(keyVal);
                break;
              case typeFields_1.OutputTypes.WITNESS_SCRIPT:
                checkKeyBuffer(
                  "output",
                  keyVal.key,
                  typeFields_1.OutputTypes.WITNESS_SCRIPT
                );
                if (output.witnessScript !== void 0) {
                  throw new Error("Format Error: Output has multiple WITNESS_SCRIPT");
                }
                output.witnessScript = convert3.outputs.witnessScript.decode(keyVal);
                break;
              case typeFields_1.OutputTypes.BIP32_DERIVATION:
                if (output.bip32Derivation === void 0) {
                  output.bip32Derivation = [];
                }
                output.bip32Derivation.push(
                  convert3.outputs.bip32Derivation.decode(keyVal)
                );
                break;
              case typeFields_1.OutputTypes.TAP_INTERNAL_KEY:
                checkKeyBuffer(
                  "output",
                  keyVal.key,
                  typeFields_1.OutputTypes.TAP_INTERNAL_KEY
                );
                output.tapInternalKey = convert3.outputs.tapInternalKey.decode(keyVal);
                break;
              case typeFields_1.OutputTypes.TAP_TREE:
                checkKeyBuffer(
                  "output",
                  keyVal.key,
                  typeFields_1.OutputTypes.TAP_TREE
                );
                output.tapTree = convert3.outputs.tapTree.decode(keyVal);
                break;
              case typeFields_1.OutputTypes.TAP_BIP32_DERIVATION:
                if (output.tapBip32Derivation === void 0) {
                  output.tapBip32Derivation = [];
                }
                output.tapBip32Derivation.push(
                  convert3.outputs.tapBip32Derivation.decode(keyVal)
                );
                break;
              default:
                if (!output.unknownKeyVals) output.unknownKeyVals = [];
                output.unknownKeyVals.push(keyVal);
            }
          }
          outputs.push(output);
        }
        return { globalMap, inputs, outputs };
      }
      exports2.psbtFromKeyVals = psbtFromKeyVals;
    }
  });

  // node_modules/bip174/src/lib/parser/toBuffer.js
  var require_toBuffer = __commonJS({
    "node_modules/bip174/src/lib/parser/toBuffer.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var convert3 = require_converter();
      var tools_1 = require_tools();
      function psbtToBuffer({ globalMap, inputs, outputs }) {
        const { globalKeyVals, inputKeyVals, outputKeyVals } = psbtToKeyVals({
          globalMap,
          inputs,
          outputs
        });
        const globalBuffer = tools_1.keyValsToBuffer(globalKeyVals);
        const keyValsOrEmptyToBuffer = (keyVals) => keyVals.length === 0 ? [Buffer.from([0])] : keyVals.map(tools_1.keyValsToBuffer);
        const inputBuffers = keyValsOrEmptyToBuffer(inputKeyVals);
        const outputBuffers = keyValsOrEmptyToBuffer(outputKeyVals);
        const header = Buffer.allocUnsafe(5);
        header.writeUIntBE(482972169471, 0, 5);
        return Buffer.concat(
          [header, globalBuffer].concat(inputBuffers, outputBuffers)
        );
      }
      exports2.psbtToBuffer = psbtToBuffer;
      var sortKeyVals = (a, b) => {
        return a.key.compare(b.key);
      };
      function keyValsFromMap(keyValMap, converterFactory) {
        const keyHexSet = /* @__PURE__ */ new Set();
        const keyVals = Object.entries(keyValMap).reduce((result, [key, value]) => {
          if (key === "unknownKeyVals") return result;
          const converter = converterFactory[key];
          if (converter === void 0) return result;
          const encodedKeyVals = (Array.isArray(value) ? value : [value]).map(
            converter.encode
          );
          const keyHexes = encodedKeyVals.map((kv) => kv.key.toString("hex"));
          keyHexes.forEach((hex) => {
            if (keyHexSet.has(hex))
              throw new Error("Serialize Error: Duplicate key: " + hex);
            keyHexSet.add(hex);
          });
          return result.concat(encodedKeyVals);
        }, []);
        const otherKeyVals = keyValMap.unknownKeyVals ? keyValMap.unknownKeyVals.filter((keyVal) => {
          return !keyHexSet.has(keyVal.key.toString("hex"));
        }) : [];
        return keyVals.concat(otherKeyVals).sort(sortKeyVals);
      }
      function psbtToKeyVals({ globalMap, inputs, outputs }) {
        return {
          globalKeyVals: keyValsFromMap(globalMap, convert3.globals),
          inputKeyVals: inputs.map((i) => keyValsFromMap(i, convert3.inputs)),
          outputKeyVals: outputs.map((o) => keyValsFromMap(o, convert3.outputs))
        };
      }
      exports2.psbtToKeyVals = psbtToKeyVals;
    }
  });

  // node_modules/bip174/src/lib/parser/index.js
  var require_parser = __commonJS({
    "node_modules/bip174/src/lib/parser/index.js"(exports2) {
      "use strict";
      function __export(m) {
        for (var p in m) if (!exports2.hasOwnProperty(p)) exports2[p] = m[p];
      }
      Object.defineProperty(exports2, "__esModule", { value: true });
      __export(require_fromBuffer());
      __export(require_toBuffer());
    }
  });

  // node_modules/bip174/src/lib/combiner/index.js
  var require_combiner = __commonJS({
    "node_modules/bip174/src/lib/combiner/index.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var parser_1 = require_parser();
      function combine(psbts) {
        const self2 = psbts[0];
        const selfKeyVals = parser_1.psbtToKeyVals(self2);
        const others = psbts.slice(1);
        if (others.length === 0) throw new Error("Combine: Nothing to combine");
        const selfTx = getTx(self2);
        if (selfTx === void 0) {
          throw new Error("Combine: Self missing transaction");
        }
        const selfGlobalSet = getKeySet(selfKeyVals.globalKeyVals);
        const selfInputSets = selfKeyVals.inputKeyVals.map(getKeySet);
        const selfOutputSets = selfKeyVals.outputKeyVals.map(getKeySet);
        for (const other of others) {
          const otherTx = getTx(other);
          if (otherTx === void 0 || !otherTx.toBuffer().equals(selfTx.toBuffer())) {
            throw new Error(
              "Combine: One of the Psbts does not have the same transaction."
            );
          }
          const otherKeyVals = parser_1.psbtToKeyVals(other);
          const otherGlobalSet = getKeySet(otherKeyVals.globalKeyVals);
          otherGlobalSet.forEach(
            keyPusher(
              selfGlobalSet,
              selfKeyVals.globalKeyVals,
              otherKeyVals.globalKeyVals
            )
          );
          const otherInputSets = otherKeyVals.inputKeyVals.map(getKeySet);
          otherInputSets.forEach(
            (inputSet, idx) => inputSet.forEach(
              keyPusher(
                selfInputSets[idx],
                selfKeyVals.inputKeyVals[idx],
                otherKeyVals.inputKeyVals[idx]
              )
            )
          );
          const otherOutputSets = otherKeyVals.outputKeyVals.map(getKeySet);
          otherOutputSets.forEach(
            (outputSet, idx) => outputSet.forEach(
              keyPusher(
                selfOutputSets[idx],
                selfKeyVals.outputKeyVals[idx],
                otherKeyVals.outputKeyVals[idx]
              )
            )
          );
        }
        return parser_1.psbtFromKeyVals(selfTx, {
          globalMapKeyVals: selfKeyVals.globalKeyVals,
          inputKeyVals: selfKeyVals.inputKeyVals,
          outputKeyVals: selfKeyVals.outputKeyVals
        });
      }
      exports2.combine = combine;
      function keyPusher(selfSet, selfKeyVals, otherKeyVals) {
        return (key) => {
          if (selfSet.has(key)) return;
          const newKv = otherKeyVals.filter((kv) => kv.key.toString("hex") === key)[0];
          selfKeyVals.push(newKv);
          selfSet.add(key);
        };
      }
      function getTx(psbt) {
        return psbt.globalMap.unsignedTx;
      }
      function getKeySet(keyVals) {
        const set = /* @__PURE__ */ new Set();
        keyVals.forEach((keyVal) => {
          const hex = keyVal.key.toString("hex");
          if (set.has(hex))
            throw new Error("Combine: KeyValue Map keys should be unique");
          set.add(hex);
        });
        return set;
      }
    }
  });

  // node_modules/bip174/src/lib/utils.js
  var require_utils2 = __commonJS({
    "node_modules/bip174/src/lib/utils.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var converter = require_converter();
      function checkForInput(inputs, inputIndex) {
        const input = inputs[inputIndex];
        if (input === void 0) throw new Error(`No input #${inputIndex}`);
        return input;
      }
      exports2.checkForInput = checkForInput;
      function checkForOutput(outputs, outputIndex) {
        const output = outputs[outputIndex];
        if (output === void 0) throw new Error(`No output #${outputIndex}`);
        return output;
      }
      exports2.checkForOutput = checkForOutput;
      function checkHasKey(checkKeyVal, keyVals, enumLength) {
        if (checkKeyVal.key[0] < enumLength) {
          throw new Error(
            `Use the method for your specific key instead of addUnknownKeyVal*`
          );
        }
        if (keyVals && keyVals.filter((kv) => kv.key.equals(checkKeyVal.key)).length !== 0) {
          throw new Error(`Duplicate Key: ${checkKeyVal.key.toString("hex")}`);
        }
      }
      exports2.checkHasKey = checkHasKey;
      function getEnumLength(myenum) {
        let count = 0;
        Object.keys(myenum).forEach((val) => {
          if (Number(isNaN(Number(val)))) {
            count++;
          }
        });
        return count;
      }
      exports2.getEnumLength = getEnumLength;
      function inputCheckUncleanFinalized(inputIndex, input) {
        let result = false;
        if (input.nonWitnessUtxo || input.witnessUtxo) {
          const needScriptSig = !!input.redeemScript;
          const needWitnessScript = !!input.witnessScript;
          const scriptSigOK = !needScriptSig || !!input.finalScriptSig;
          const witnessScriptOK = !needWitnessScript || !!input.finalScriptWitness;
          const hasOneFinal = !!input.finalScriptSig || !!input.finalScriptWitness;
          result = scriptSigOK && witnessScriptOK && hasOneFinal;
        }
        if (result === false) {
          throw new Error(
            `Input #${inputIndex} has too much or too little data to clean`
          );
        }
      }
      exports2.inputCheckUncleanFinalized = inputCheckUncleanFinalized;
      function throwForUpdateMaker(typeName, name, expected, data) {
        throw new Error(
          `Data for ${typeName} key ${name} is incorrect: Expected ${expected} and got ${JSON.stringify(data)}`
        );
      }
      function updateMaker(typeName) {
        return (updateData, mainData) => {
          for (const name of Object.keys(updateData)) {
            const data = updateData[name];
            const { canAdd, canAddToArray, check, expected } = (
              // @ts-ignore
              converter[typeName + "s"][name] || {}
            );
            const isArray = !!canAddToArray;
            if (check) {
              if (isArray) {
                if (!Array.isArray(data) || // @ts-ignore
                mainData[name] && !Array.isArray(mainData[name])) {
                  throw new Error(`Key type ${name} must be an array`);
                }
                if (!data.every(check)) {
                  throwForUpdateMaker(typeName, name, expected, data);
                }
                const arr = mainData[name] || [];
                const dupeCheckSet = /* @__PURE__ */ new Set();
                if (!data.every((v) => canAddToArray(arr, v, dupeCheckSet))) {
                  throw new Error("Can not add duplicate data to array");
                }
                mainData[name] = arr.concat(data);
              } else {
                if (!check(data)) {
                  throwForUpdateMaker(typeName, name, expected, data);
                }
                if (!canAdd(mainData, data)) {
                  throw new Error(`Can not add duplicate data to ${typeName}`);
                }
                mainData[name] = data;
              }
            }
          }
        };
      }
      exports2.updateGlobal = updateMaker("global");
      exports2.updateInput = updateMaker("input");
      exports2.updateOutput = updateMaker("output");
      function addInputAttributes(inputs, data) {
        const index = inputs.length - 1;
        const input = checkForInput(inputs, index);
        exports2.updateInput(data, input);
      }
      exports2.addInputAttributes = addInputAttributes;
      function addOutputAttributes(outputs, data) {
        const index = outputs.length - 1;
        const output = checkForOutput(outputs, index);
        exports2.updateOutput(data, output);
      }
      exports2.addOutputAttributes = addOutputAttributes;
      function defaultVersionSetter(version, txBuf) {
        if (!Buffer.isBuffer(txBuf) || txBuf.length < 4) {
          throw new Error("Set Version: Invalid Transaction");
        }
        txBuf.writeUInt32LE(version, 0);
        return txBuf;
      }
      exports2.defaultVersionSetter = defaultVersionSetter;
      function defaultLocktimeSetter(locktime, txBuf) {
        if (!Buffer.isBuffer(txBuf) || txBuf.length < 4) {
          throw new Error("Set Locktime: Invalid Transaction");
        }
        txBuf.writeUInt32LE(locktime, txBuf.length - 4);
        return txBuf;
      }
      exports2.defaultLocktimeSetter = defaultLocktimeSetter;
    }
  });

  // node_modules/bip174/src/lib/psbt.js
  var require_psbt = __commonJS({
    "node_modules/bip174/src/lib/psbt.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var combiner_1 = require_combiner();
      var parser_1 = require_parser();
      var typeFields_1 = require_typeFields();
      var utils_1 = require_utils2();
      var Psbt2 = class {
        constructor(tx2) {
          this.inputs = [];
          this.outputs = [];
          this.globalMap = {
            unsignedTx: tx2
          };
        }
        static fromBase64(data, txFromBuffer) {
          const buffer = Buffer.from(data, "base64");
          return this.fromBuffer(buffer, txFromBuffer);
        }
        static fromHex(data, txFromBuffer) {
          const buffer = Buffer.from(data, "hex");
          return this.fromBuffer(buffer, txFromBuffer);
        }
        static fromBuffer(buffer, txFromBuffer) {
          const results = parser_1.psbtFromBuffer(buffer, txFromBuffer);
          const psbt = new this(results.globalMap.unsignedTx);
          Object.assign(psbt, results);
          return psbt;
        }
        toBase64() {
          const buffer = this.toBuffer();
          return buffer.toString("base64");
        }
        toHex() {
          const buffer = this.toBuffer();
          return buffer.toString("hex");
        }
        toBuffer() {
          return parser_1.psbtToBuffer(this);
        }
        updateGlobal(updateData) {
          utils_1.updateGlobal(updateData, this.globalMap);
          return this;
        }
        updateInput(inputIndex, updateData) {
          const input = utils_1.checkForInput(this.inputs, inputIndex);
          utils_1.updateInput(updateData, input);
          return this;
        }
        updateOutput(outputIndex, updateData) {
          const output = utils_1.checkForOutput(this.outputs, outputIndex);
          utils_1.updateOutput(updateData, output);
          return this;
        }
        addUnknownKeyValToGlobal(keyVal) {
          utils_1.checkHasKey(
            keyVal,
            this.globalMap.unknownKeyVals,
            utils_1.getEnumLength(typeFields_1.GlobalTypes)
          );
          if (!this.globalMap.unknownKeyVals) this.globalMap.unknownKeyVals = [];
          this.globalMap.unknownKeyVals.push(keyVal);
          return this;
        }
        addUnknownKeyValToInput(inputIndex, keyVal) {
          const input = utils_1.checkForInput(this.inputs, inputIndex);
          utils_1.checkHasKey(
            keyVal,
            input.unknownKeyVals,
            utils_1.getEnumLength(typeFields_1.InputTypes)
          );
          if (!input.unknownKeyVals) input.unknownKeyVals = [];
          input.unknownKeyVals.push(keyVal);
          return this;
        }
        addUnknownKeyValToOutput(outputIndex, keyVal) {
          const output = utils_1.checkForOutput(this.outputs, outputIndex);
          utils_1.checkHasKey(
            keyVal,
            output.unknownKeyVals,
            utils_1.getEnumLength(typeFields_1.OutputTypes)
          );
          if (!output.unknownKeyVals) output.unknownKeyVals = [];
          output.unknownKeyVals.push(keyVal);
          return this;
        }
        addInput(inputData) {
          this.globalMap.unsignedTx.addInput(inputData);
          this.inputs.push({
            unknownKeyVals: []
          });
          const addKeyVals = inputData.unknownKeyVals || [];
          const inputIndex = this.inputs.length - 1;
          if (!Array.isArray(addKeyVals)) {
            throw new Error("unknownKeyVals must be an Array");
          }
          addKeyVals.forEach(
            (keyVal) => this.addUnknownKeyValToInput(inputIndex, keyVal)
          );
          utils_1.addInputAttributes(this.inputs, inputData);
          return this;
        }
        addOutput(outputData) {
          this.globalMap.unsignedTx.addOutput(outputData);
          this.outputs.push({
            unknownKeyVals: []
          });
          const addKeyVals = outputData.unknownKeyVals || [];
          const outputIndex = this.outputs.length - 1;
          if (!Array.isArray(addKeyVals)) {
            throw new Error("unknownKeyVals must be an Array");
          }
          addKeyVals.forEach(
            (keyVal) => this.addUnknownKeyValToOutput(outputIndex, keyVal)
          );
          utils_1.addOutputAttributes(this.outputs, outputData);
          return this;
        }
        clearFinalizedInput(inputIndex) {
          const input = utils_1.checkForInput(this.inputs, inputIndex);
          utils_1.inputCheckUncleanFinalized(inputIndex, input);
          for (const key of Object.keys(input)) {
            if (![
              "witnessUtxo",
              "nonWitnessUtxo",
              "finalScriptSig",
              "finalScriptWitness",
              "unknownKeyVals"
            ].includes(key)) {
              delete input[key];
            }
          }
          return this;
        }
        combine(...those) {
          const result = combiner_1.combine([this].concat(those));
          Object.assign(this, result);
          return this;
        }
        getTransaction() {
          return this.globalMap.unsignedTx.toBuffer();
        }
      };
      exports2.Psbt = Psbt2;
    }
  });

  // node_modules/bitcoinjs-lib/src/psbt/psbtutils.js
  var require_psbtutils = __commonJS({
    "node_modules/bitcoinjs-lib/src/psbt/psbtutils.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.signatureBlocksAction = exports2.checkInputForSig = exports2.pubkeyInScript = exports2.pubkeyPositionInScript = exports2.witnessStackToScriptWitness = exports2.isP2TR = exports2.isP2SHScript = exports2.isP2WSHScript = exports2.isP2WPKH = exports2.isP2PKH = exports2.isP2PK = exports2.isP2MS = void 0;
      var varuint = require_varint();
      var bscript = require_script();
      var transaction_1 = require_transaction();
      var crypto_1 = require_crypto3();
      var payments2 = require_payments();
      function isPaymentFactory(payment) {
        return (script) => {
          try {
            payment({ output: script });
            return true;
          } catch (err) {
            return false;
          }
        };
      }
      exports2.isP2MS = isPaymentFactory(payments2.p2ms);
      exports2.isP2PK = isPaymentFactory(payments2.p2pk);
      exports2.isP2PKH = isPaymentFactory(payments2.p2pkh);
      exports2.isP2WPKH = isPaymentFactory(payments2.p2wpkh);
      exports2.isP2WSHScript = isPaymentFactory(payments2.p2wsh);
      exports2.isP2SHScript = isPaymentFactory(payments2.p2sh);
      exports2.isP2TR = isPaymentFactory(payments2.p2tr);
      function witnessStackToScriptWitness(witness) {
        let buffer = Buffer.allocUnsafe(0);
        function writeSlice(slice) {
          buffer = Buffer.concat([buffer, Buffer.from(slice)]);
        }
        function writeVarInt(i) {
          const currentLen = buffer.length;
          const varintLen = varuint.encodingLength(i);
          buffer = Buffer.concat([buffer, Buffer.allocUnsafe(varintLen)]);
          varuint.encode(i, buffer, currentLen);
        }
        function writeVarSlice(slice) {
          writeVarInt(slice.length);
          writeSlice(slice);
        }
        function writeVector(vector) {
          writeVarInt(vector.length);
          vector.forEach(writeVarSlice);
        }
        writeVector(witness);
        return buffer;
      }
      exports2.witnessStackToScriptWitness = witnessStackToScriptWitness;
      function pubkeyPositionInScript(pubkey, script) {
        const pubkeyHash = (0, crypto_1.hash160)(pubkey);
        const pubkeyXOnly = pubkey.slice(1, 33);
        const decompiled = bscript.decompile(script);
        if (decompiled === null) throw new Error("Unknown script error");
        return decompiled.findIndex((element) => {
          if (typeof element === "number") return false;
          return element.equals(pubkey) || element.equals(pubkeyHash) || element.equals(pubkeyXOnly);
        });
      }
      exports2.pubkeyPositionInScript = pubkeyPositionInScript;
      function pubkeyInScript(pubkey, script) {
        return pubkeyPositionInScript(pubkey, script) !== -1;
      }
      exports2.pubkeyInScript = pubkeyInScript;
      function checkInputForSig(input, action) {
        const pSigs = extractPartialSigs(input);
        return pSigs.some(
          (pSig) => signatureBlocksAction(pSig, bscript.signature.decode, action)
        );
      }
      exports2.checkInputForSig = checkInputForSig;
      function signatureBlocksAction(signature, signatureDecodeFn, action) {
        const { hashType } = signatureDecodeFn(signature);
        const whitelist = [];
        const isAnyoneCanPay = hashType & transaction_1.Transaction.SIGHASH_ANYONECANPAY;
        if (isAnyoneCanPay) whitelist.push("addInput");
        const hashMod = hashType & 31;
        switch (hashMod) {
          case transaction_1.Transaction.SIGHASH_ALL:
            break;
          case transaction_1.Transaction.SIGHASH_SINGLE:
          case transaction_1.Transaction.SIGHASH_NONE:
            whitelist.push("addOutput");
            whitelist.push("setInputSequence");
            break;
        }
        if (whitelist.indexOf(action) === -1) {
          return true;
        }
        return false;
      }
      exports2.signatureBlocksAction = signatureBlocksAction;
      function extractPartialSigs(input) {
        let pSigs = [];
        if ((input.partialSig || []).length === 0) {
          if (!input.finalScriptSig && !input.finalScriptWitness) return [];
          pSigs = getPsigsFromInputFinalScripts(input);
        } else {
          pSigs = input.partialSig;
        }
        return pSigs.map((p) => p.signature);
      }
      function getPsigsFromInputFinalScripts(input) {
        const scriptItems = !input.finalScriptSig ? [] : bscript.decompile(input.finalScriptSig) || [];
        const witnessItems = !input.finalScriptWitness ? [] : bscript.decompile(input.finalScriptWitness) || [];
        return scriptItems.concat(witnessItems).filter((item) => {
          return Buffer.isBuffer(item) && bscript.isCanonicalScriptSignature(item);
        }).map((sig) => ({ signature: sig }));
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/psbt/bip371.js
  var require_bip371 = __commonJS({
    "node_modules/bitcoinjs-lib/src/psbt/bip371.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.checkTaprootInputForSigs = exports2.tapTreeFromList = exports2.tapTreeToList = exports2.tweakInternalPubKey = exports2.checkTaprootOutputFields = exports2.checkTaprootInputFields = exports2.isTaprootOutput = exports2.isTaprootInput = exports2.serializeTaprootSignature = exports2.tapScriptFinalizer = exports2.toXOnly = void 0;
      var types_1 = require_types2();
      var transaction_1 = require_transaction();
      var psbtutils_1 = require_psbtutils();
      var bip341_1 = require_bip341();
      var payments_1 = require_payments();
      var psbtutils_2 = require_psbtutils();
      var toXOnly = (pubKey) => pubKey.length === 32 ? pubKey : pubKey.slice(1, 33);
      exports2.toXOnly = toXOnly;
      function tapScriptFinalizer(inputIndex, input, tapLeafHashToFinalize) {
        const tapLeaf = findTapLeafToFinalize(
          input,
          inputIndex,
          tapLeafHashToFinalize
        );
        try {
          const sigs = sortSignatures(input, tapLeaf);
          const witness = sigs.concat(tapLeaf.script).concat(tapLeaf.controlBlock);
          return {
            finalScriptWitness: (0, psbtutils_1.witnessStackToScriptWitness)(witness)
          };
        } catch (err) {
          throw new Error(`Can not finalize taproot input #${inputIndex}: ${err}`);
        }
      }
      exports2.tapScriptFinalizer = tapScriptFinalizer;
      function serializeTaprootSignature(sig, sighashType) {
        const sighashTypeByte = sighashType ? Buffer.from([sighashType]) : Buffer.from([]);
        return Buffer.concat([sig, sighashTypeByte]);
      }
      exports2.serializeTaprootSignature = serializeTaprootSignature;
      function isTaprootInput(input) {
        return input && !!(input.tapInternalKey || input.tapMerkleRoot || input.tapLeafScript && input.tapLeafScript.length || input.tapBip32Derivation && input.tapBip32Derivation.length || input.witnessUtxo && (0, psbtutils_1.isP2TR)(input.witnessUtxo.script));
      }
      exports2.isTaprootInput = isTaprootInput;
      function isTaprootOutput(output, script) {
        return output && !!(output.tapInternalKey || output.tapTree || output.tapBip32Derivation && output.tapBip32Derivation.length || script && (0, psbtutils_1.isP2TR)(script));
      }
      exports2.isTaprootOutput = isTaprootOutput;
      function checkTaprootInputFields(inputData, newInputData, action) {
        checkMixedTaprootAndNonTaprootInputFields(inputData, newInputData, action);
        checkIfTapLeafInTree(inputData, newInputData, action);
      }
      exports2.checkTaprootInputFields = checkTaprootInputFields;
      function checkTaprootOutputFields(outputData, newOutputData, action) {
        checkMixedTaprootAndNonTaprootOutputFields(outputData, newOutputData, action);
        checkTaprootScriptPubkey(outputData, newOutputData);
      }
      exports2.checkTaprootOutputFields = checkTaprootOutputFields;
      function checkTaprootScriptPubkey(outputData, newOutputData) {
        if (!newOutputData.tapTree && !newOutputData.tapInternalKey) return;
        const tapInternalKey = newOutputData.tapInternalKey || outputData.tapInternalKey;
        const tapTree = newOutputData.tapTree || outputData.tapTree;
        if (tapInternalKey) {
          const { script: scriptPubkey } = outputData;
          const script = getTaprootScripPubkey(tapInternalKey, tapTree);
          if (scriptPubkey && !scriptPubkey.equals(script))
            throw new Error("Error adding output. Script or address missmatch.");
        }
      }
      function getTaprootScripPubkey(tapInternalKey, tapTree) {
        const scriptTree = tapTree && tapTreeFromList(tapTree.leaves);
        const { output } = (0, payments_1.p2tr)({
          internalPubkey: tapInternalKey,
          scriptTree
        });
        return output;
      }
      function tweakInternalPubKey(inputIndex, input) {
        const tapInternalKey = input.tapInternalKey;
        const outputKey = tapInternalKey && (0, bip341_1.tweakKey)(tapInternalKey, input.tapMerkleRoot);
        if (!outputKey)
          throw new Error(
            `Cannot tweak tap internal key for input #${inputIndex}. Public key: ${tapInternalKey && tapInternalKey.toString("hex")}`
          );
        return outputKey.x;
      }
      exports2.tweakInternalPubKey = tweakInternalPubKey;
      function tapTreeToList(tree) {
        if (!(0, types_1.isTaptree)(tree))
          throw new Error(
            "Cannot convert taptree to tapleaf list. Expecting a tapree structure."
          );
        return _tapTreeToList(tree);
      }
      exports2.tapTreeToList = tapTreeToList;
      function tapTreeFromList(leaves = []) {
        if (leaves.length === 1 && leaves[0].depth === 0)
          return {
            output: leaves[0].script,
            version: leaves[0].leafVersion
          };
        return instertLeavesInTree(leaves);
      }
      exports2.tapTreeFromList = tapTreeFromList;
      function checkTaprootInputForSigs(input, action) {
        const sigs = extractTaprootSigs(input);
        return sigs.some(
          (sig) => (0, psbtutils_2.signatureBlocksAction)(sig, decodeSchnorrSignature, action)
        );
      }
      exports2.checkTaprootInputForSigs = checkTaprootInputForSigs;
      function decodeSchnorrSignature(signature) {
        return {
          signature: signature.slice(0, 64),
          hashType: signature.slice(64)[0] || transaction_1.Transaction.SIGHASH_DEFAULT
        };
      }
      function extractTaprootSigs(input) {
        const sigs = [];
        if (input.tapKeySig) sigs.push(input.tapKeySig);
        if (input.tapScriptSig)
          sigs.push(...input.tapScriptSig.map((s) => s.signature));
        if (!sigs.length) {
          const finalTapKeySig = getTapKeySigFromWithness(input.finalScriptWitness);
          if (finalTapKeySig) sigs.push(finalTapKeySig);
        }
        return sigs;
      }
      function getTapKeySigFromWithness(finalScriptWitness) {
        if (!finalScriptWitness) return;
        const witness = finalScriptWitness.slice(2);
        if (witness.length === 64 || witness.length === 65) return witness;
      }
      function _tapTreeToList(tree, leaves = [], depth = 0) {
        if (depth > bip341_1.MAX_TAPTREE_DEPTH)
          throw new Error("Max taptree depth exceeded.");
        if (!tree) return [];
        if ((0, types_1.isTapleaf)(tree)) {
          leaves.push({
            depth,
            leafVersion: tree.version || bip341_1.LEAF_VERSION_TAPSCRIPT,
            script: tree.output
          });
          return leaves;
        }
        if (tree[0]) _tapTreeToList(tree[0], leaves, depth + 1);
        if (tree[1]) _tapTreeToList(tree[1], leaves, depth + 1);
        return leaves;
      }
      function instertLeavesInTree(leaves) {
        let tree;
        for (const leaf of leaves) {
          tree = instertLeafInTree(leaf, tree);
          if (!tree) throw new Error(`No room left to insert tapleaf in tree`);
        }
        return tree;
      }
      function instertLeafInTree(leaf, tree, depth = 0) {
        if (depth > bip341_1.MAX_TAPTREE_DEPTH)
          throw new Error("Max taptree depth exceeded.");
        if (leaf.depth === depth) {
          if (!tree)
            return {
              output: leaf.script,
              version: leaf.leafVersion
            };
          return;
        }
        if ((0, types_1.isTapleaf)(tree)) return;
        const leftSide = instertLeafInTree(leaf, tree && tree[0], depth + 1);
        if (leftSide) return [leftSide, tree && tree[1]];
        const rightSide = instertLeafInTree(leaf, tree && tree[1], depth + 1);
        if (rightSide) return [tree && tree[0], rightSide];
      }
      function checkMixedTaprootAndNonTaprootInputFields(inputData, newInputData, action) {
        const isBadTaprootUpdate = isTaprootInput(inputData) && hasNonTaprootFields(newInputData);
        const isBadNonTaprootUpdate = hasNonTaprootFields(inputData) && isTaprootInput(newInputData);
        const hasMixedFields = inputData === newInputData && isTaprootInput(newInputData) && hasNonTaprootFields(newInputData);
        if (isBadTaprootUpdate || isBadNonTaprootUpdate || hasMixedFields)
          throw new Error(
            `Invalid arguments for Psbt.${action}. Cannot use both taproot and non-taproot fields.`
          );
      }
      function checkMixedTaprootAndNonTaprootOutputFields(inputData, newInputData, action) {
        const isBadTaprootUpdate = isTaprootOutput(inputData) && hasNonTaprootFields(newInputData);
        const isBadNonTaprootUpdate = hasNonTaprootFields(inputData) && isTaprootOutput(newInputData);
        const hasMixedFields = inputData === newInputData && isTaprootOutput(newInputData) && hasNonTaprootFields(newInputData);
        if (isBadTaprootUpdate || isBadNonTaprootUpdate || hasMixedFields)
          throw new Error(
            `Invalid arguments for Psbt.${action}. Cannot use both taproot and non-taproot fields.`
          );
      }
      function checkIfTapLeafInTree(inputData, newInputData, action) {
        if (newInputData.tapMerkleRoot) {
          const newLeafsInTree = (newInputData.tapLeafScript || []).every(
            (l) => isTapLeafInTree(l, newInputData.tapMerkleRoot)
          );
          const oldLeafsInTree = (inputData.tapLeafScript || []).every(
            (l) => isTapLeafInTree(l, newInputData.tapMerkleRoot)
          );
          if (!newLeafsInTree || !oldLeafsInTree)
            throw new Error(
              `Invalid arguments for Psbt.${action}. Tapleaf not part of taptree.`
            );
        } else if (inputData.tapMerkleRoot) {
          const newLeafsInTree = (newInputData.tapLeafScript || []).every(
            (l) => isTapLeafInTree(l, inputData.tapMerkleRoot)
          );
          if (!newLeafsInTree)
            throw new Error(
              `Invalid arguments for Psbt.${action}. Tapleaf not part of taptree.`
            );
        }
      }
      function isTapLeafInTree(tapLeaf, merkleRoot) {
        if (!merkleRoot) return true;
        const leafHash = (0, bip341_1.tapleafHash)({
          output: tapLeaf.script,
          version: tapLeaf.leafVersion
        });
        const rootHash = (0, bip341_1.rootHashFromPath)(
          tapLeaf.controlBlock,
          leafHash
        );
        return rootHash.equals(merkleRoot);
      }
      function sortSignatures(input, tapLeaf) {
        const leafHash = (0, bip341_1.tapleafHash)({
          output: tapLeaf.script,
          version: tapLeaf.leafVersion
        });
        return (input.tapScriptSig || []).filter((tss) => tss.leafHash.equals(leafHash)).map((tss) => addPubkeyPositionInScript(tapLeaf.script, tss)).sort((t1, t2) => t2.positionInScript - t1.positionInScript).map((t) => t.signature);
      }
      function addPubkeyPositionInScript(script, tss) {
        return Object.assign(
          {
            positionInScript: (0, psbtutils_1.pubkeyPositionInScript)(
              tss.pubkey,
              script
            )
          },
          tss
        );
      }
      function findTapLeafToFinalize(input, inputIndex, leafHashToFinalize) {
        if (!input.tapScriptSig || !input.tapScriptSig.length)
          throw new Error(
            `Can not finalize taproot input #${inputIndex}. No tapleaf script signature provided.`
          );
        const tapLeaf = (input.tapLeafScript || []).sort((a, b) => a.controlBlock.length - b.controlBlock.length).find(
          (leaf) => canFinalizeLeaf(leaf, input.tapScriptSig, leafHashToFinalize)
        );
        if (!tapLeaf)
          throw new Error(
            `Can not finalize taproot input #${inputIndex}. Signature for tapleaf script not found.`
          );
        return tapLeaf;
      }
      function canFinalizeLeaf(leaf, tapScriptSig, hash2) {
        const leafHash = (0, bip341_1.tapleafHash)({
          output: leaf.script,
          version: leaf.leafVersion
        });
        const whiteListedHash = !hash2 || hash2.equals(leafHash);
        return whiteListedHash && tapScriptSig.find((tss) => tss.leafHash.equals(leafHash)) !== void 0;
      }
      function hasNonTaprootFields(io) {
        return io && !!(io.redeemScript || io.witnessScript || io.bip32Derivation && io.bip32Derivation.length);
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/psbt.js
  var require_psbt2 = __commonJS({
    "node_modules/bitcoinjs-lib/src/psbt.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.Psbt = void 0;
      var bip174_1 = require_psbt();
      var varuint = require_varint();
      var utils_1 = require_utils2();
      var address_1 = require_address();
      var bufferutils_1 = require_bufferutils();
      var networks_1 = require_networks();
      var payments2 = require_payments();
      var bip341_1 = require_bip341();
      var bscript = require_script();
      var transaction_1 = require_transaction();
      var bip371_1 = require_bip371();
      var psbtutils_1 = require_psbtutils();
      var DEFAULT_OPTS = {
        /**
         * A bitcoinjs Network object. This is only used if you pass an `address`
         * parameter to addOutput. Otherwise it is not needed and can be left default.
         */
        network: networks_1.bitcoin,
        /**
         * When extractTransaction is called, the fee rate is checked.
         * THIS IS NOT TO BE RELIED ON.
         * It is only here as a last ditch effort to prevent sending a 500 BTC fee etc.
         */
        maximumFeeRate: 5e3
        // satoshi per byte
      };
      var Psbt2 = class _Psbt {
        static fromBase64(data, opts = {}) {
          const buffer = Buffer.from(data, "base64");
          return this.fromBuffer(buffer, opts);
        }
        static fromHex(data, opts = {}) {
          const buffer = Buffer.from(data, "hex");
          return this.fromBuffer(buffer, opts);
        }
        static fromBuffer(buffer, opts = {}) {
          const psbtBase = bip174_1.Psbt.fromBuffer(buffer, transactionFromBuffer);
          const psbt = new _Psbt(opts, psbtBase);
          checkTxForDupeIns(psbt.__CACHE.__TX, psbt.__CACHE);
          return psbt;
        }
        constructor(opts = {}, data = new bip174_1.Psbt(new PsbtTransaction())) {
          this.data = data;
          this.opts = Object.assign({}, DEFAULT_OPTS, opts);
          this.__CACHE = {
            __NON_WITNESS_UTXO_TX_CACHE: [],
            __NON_WITNESS_UTXO_BUF_CACHE: [],
            __TX_IN_CACHE: {},
            __TX: this.data.globalMap.unsignedTx.tx,
            // Psbt's predecessor (TransactionBuilder - now removed) behavior
            // was to not confirm input values  before signing.
            // Even though we highly encourage people to get
            // the full parent transaction to verify values, the ability to
            // sign non-segwit inputs without the full transaction was often
            // requested. So the only way to activate is to use @ts-ignore.
            // We will disable exporting the Psbt when unsafe sign is active.
            // because it is not BIP174 compliant.
            __UNSAFE_SIGN_NONSEGWIT: false
          };
          if (this.data.inputs.length === 0) this.setVersion(2);
          const dpew = (obj, attr, enumerable, writable) => Object.defineProperty(obj, attr, {
            enumerable,
            writable
          });
          dpew(this, "__CACHE", false, true);
          dpew(this, "opts", false, true);
        }
        get inputCount() {
          return this.data.inputs.length;
        }
        get version() {
          return this.__CACHE.__TX.version;
        }
        set version(version) {
          this.setVersion(version);
        }
        get locktime() {
          return this.__CACHE.__TX.locktime;
        }
        set locktime(locktime) {
          this.setLocktime(locktime);
        }
        get txInputs() {
          return this.__CACHE.__TX.ins.map((input) => ({
            hash: (0, bufferutils_1.cloneBuffer)(input.hash),
            index: input.index,
            sequence: input.sequence
          }));
        }
        get txOutputs() {
          return this.__CACHE.__TX.outs.map((output) => {
            let address;
            try {
              address = (0, address_1.fromOutputScript)(
                output.script,
                this.opts.network
              );
            } catch (_) {
            }
            return {
              script: (0, bufferutils_1.cloneBuffer)(output.script),
              value: output.value,
              address
            };
          });
        }
        combine(...those) {
          this.data.combine(...those.map((o) => o.data));
          return this;
        }
        clone() {
          const res = _Psbt.fromBuffer(this.data.toBuffer());
          res.opts = JSON.parse(JSON.stringify(this.opts));
          return res;
        }
        setMaximumFeeRate(satoshiPerByte) {
          check32Bit(satoshiPerByte);
          this.opts.maximumFeeRate = satoshiPerByte;
        }
        setVersion(version) {
          check32Bit(version);
          checkInputsForPartialSig(this.data.inputs, "setVersion");
          const c = this.__CACHE;
          c.__TX.version = version;
          c.__EXTRACTED_TX = void 0;
          return this;
        }
        setLocktime(locktime) {
          check32Bit(locktime);
          checkInputsForPartialSig(this.data.inputs, "setLocktime");
          const c = this.__CACHE;
          c.__TX.locktime = locktime;
          c.__EXTRACTED_TX = void 0;
          return this;
        }
        setInputSequence(inputIndex, sequence) {
          check32Bit(sequence);
          checkInputsForPartialSig(this.data.inputs, "setInputSequence");
          const c = this.__CACHE;
          if (c.__TX.ins.length <= inputIndex) {
            throw new Error("Input index too high");
          }
          c.__TX.ins[inputIndex].sequence = sequence;
          c.__EXTRACTED_TX = void 0;
          return this;
        }
        addInputs(inputDatas) {
          inputDatas.forEach((inputData) => this.addInput(inputData));
          return this;
        }
        addInput(inputData) {
          if (arguments.length > 1 || !inputData || inputData.hash === void 0 || inputData.index === void 0) {
            throw new Error(
              `Invalid arguments for Psbt.addInput. Requires single object with at least [hash] and [index]`
            );
          }
          (0, bip371_1.checkTaprootInputFields)(inputData, inputData, "addInput");
          checkInputsForPartialSig(this.data.inputs, "addInput");
          if (inputData.witnessScript) checkInvalidP2WSH(inputData.witnessScript);
          const c = this.__CACHE;
          this.data.addInput(inputData);
          const txIn = c.__TX.ins[c.__TX.ins.length - 1];
          checkTxInputCache(c, txIn);
          const inputIndex = this.data.inputs.length - 1;
          const input = this.data.inputs[inputIndex];
          if (input.nonWitnessUtxo) {
            addNonWitnessTxCache(this.__CACHE, input, inputIndex);
          }
          c.__FEE = void 0;
          c.__FEE_RATE = void 0;
          c.__EXTRACTED_TX = void 0;
          return this;
        }
        addOutputs(outputDatas) {
          outputDatas.forEach((outputData) => this.addOutput(outputData));
          return this;
        }
        addOutput(outputData) {
          if (arguments.length > 1 || !outputData || outputData.value === void 0 || outputData.address === void 0 && outputData.script === void 0) {
            throw new Error(
              `Invalid arguments for Psbt.addOutput. Requires single object with at least [script or address] and [value]`
            );
          }
          checkInputsForPartialSig(this.data.inputs, "addOutput");
          const { address } = outputData;
          if (typeof address === "string") {
            const { network } = this.opts;
            const script = (0, address_1.toOutputScript)(address, network);
            outputData = Object.assign({}, outputData, { script });
          }
          (0, bip371_1.checkTaprootOutputFields)(outputData, outputData, "addOutput");
          const c = this.__CACHE;
          this.data.addOutput(outputData);
          c.__FEE = void 0;
          c.__FEE_RATE = void 0;
          c.__EXTRACTED_TX = void 0;
          return this;
        }
        extractTransaction(disableFeeCheck) {
          if (!this.data.inputs.every(isFinalized)) throw new Error("Not finalized");
          const c = this.__CACHE;
          if (!disableFeeCheck) {
            checkFees(this, c, this.opts);
          }
          if (c.__EXTRACTED_TX) return c.__EXTRACTED_TX;
          const tx2 = c.__TX.clone();
          inputFinalizeGetAmts(this.data.inputs, tx2, c, true);
          return tx2;
        }
        getFeeRate() {
          return getTxCacheValue(
            "__FEE_RATE",
            "fee rate",
            this.data.inputs,
            this.__CACHE
          );
        }
        getFee() {
          return getTxCacheValue("__FEE", "fee", this.data.inputs, this.__CACHE);
        }
        finalizeAllInputs() {
          (0, utils_1.checkForInput)(this.data.inputs, 0);
          range(this.data.inputs.length).forEach((idx) => this.finalizeInput(idx));
          return this;
        }
        finalizeInput(inputIndex, finalScriptsFunc) {
          const input = (0, utils_1.checkForInput)(this.data.inputs, inputIndex);
          if ((0, bip371_1.isTaprootInput)(input))
            return this._finalizeTaprootInput(
              inputIndex,
              input,
              void 0,
              finalScriptsFunc
            );
          return this._finalizeInput(inputIndex, input, finalScriptsFunc);
        }
        finalizeTaprootInput(inputIndex, tapLeafHashToFinalize, finalScriptsFunc = bip371_1.tapScriptFinalizer) {
          const input = (0, utils_1.checkForInput)(this.data.inputs, inputIndex);
          if ((0, bip371_1.isTaprootInput)(input))
            return this._finalizeTaprootInput(
              inputIndex,
              input,
              tapLeafHashToFinalize,
              finalScriptsFunc
            );
          throw new Error(`Cannot finalize input #${inputIndex}. Not Taproot.`);
        }
        _finalizeInput(inputIndex, input, finalScriptsFunc = getFinalScripts) {
          const { script, isP2SH, isP2WSH, isSegwit } = getScriptFromInput(
            inputIndex,
            input,
            this.__CACHE
          );
          if (!script) throw new Error(`No script found for input #${inputIndex}`);
          checkPartialSigSighashes(input);
          const { finalScriptSig, finalScriptWitness } = finalScriptsFunc(
            inputIndex,
            input,
            script,
            isSegwit,
            isP2SH,
            isP2WSH
          );
          if (finalScriptSig) this.data.updateInput(inputIndex, { finalScriptSig });
          if (finalScriptWitness)
            this.data.updateInput(inputIndex, { finalScriptWitness });
          if (!finalScriptSig && !finalScriptWitness)
            throw new Error(`Unknown error finalizing input #${inputIndex}`);
          this.data.clearFinalizedInput(inputIndex);
          return this;
        }
        _finalizeTaprootInput(inputIndex, input, tapLeafHashToFinalize, finalScriptsFunc = bip371_1.tapScriptFinalizer) {
          if (!input.witnessUtxo)
            throw new Error(
              `Cannot finalize input #${inputIndex}. Missing withness utxo.`
            );
          if (input.tapKeySig) {
            const payment = payments2.p2tr({
              output: input.witnessUtxo.script,
              signature: input.tapKeySig
            });
            const finalScriptWitness = (0, psbtutils_1.witnessStackToScriptWitness)(
              payment.witness
            );
            this.data.updateInput(inputIndex, { finalScriptWitness });
          } else {
            const { finalScriptWitness } = finalScriptsFunc(
              inputIndex,
              input,
              tapLeafHashToFinalize
            );
            this.data.updateInput(inputIndex, { finalScriptWitness });
          }
          this.data.clearFinalizedInput(inputIndex);
          return this;
        }
        getInputType(inputIndex) {
          const input = (0, utils_1.checkForInput)(this.data.inputs, inputIndex);
          const script = getScriptFromUtxo(inputIndex, input, this.__CACHE);
          const result = getMeaningfulScript(
            script,
            inputIndex,
            "input",
            input.redeemScript || redeemFromFinalScriptSig(input.finalScriptSig),
            input.witnessScript || redeemFromFinalWitnessScript(input.finalScriptWitness)
          );
          const type = result.type === "raw" ? "" : result.type + "-";
          const mainType = classifyScript(result.meaningfulScript);
          return type + mainType;
        }
        inputHasPubkey(inputIndex, pubkey) {
          const input = (0, utils_1.checkForInput)(this.data.inputs, inputIndex);
          return pubkeyInInput(pubkey, input, inputIndex, this.__CACHE);
        }
        inputHasHDKey(inputIndex, root2) {
          const input = (0, utils_1.checkForInput)(this.data.inputs, inputIndex);
          const derivationIsMine = bip32DerivationIsMine(root2);
          return !!input.bip32Derivation && input.bip32Derivation.some(derivationIsMine);
        }
        outputHasPubkey(outputIndex, pubkey) {
          const output = (0, utils_1.checkForOutput)(this.data.outputs, outputIndex);
          return pubkeyInOutput(pubkey, output, outputIndex, this.__CACHE);
        }
        outputHasHDKey(outputIndex, root2) {
          const output = (0, utils_1.checkForOutput)(this.data.outputs, outputIndex);
          const derivationIsMine = bip32DerivationIsMine(root2);
          return !!output.bip32Derivation && output.bip32Derivation.some(derivationIsMine);
        }
        validateSignaturesOfAllInputs(validator) {
          (0, utils_1.checkForInput)(this.data.inputs, 0);
          const results = range(this.data.inputs.length).map(
            (idx) => this.validateSignaturesOfInput(idx, validator)
          );
          return results.reduce((final, res) => res === true && final, true);
        }
        validateSignaturesOfInput(inputIndex, validator, pubkey) {
          const input = this.data.inputs[inputIndex];
          if ((0, bip371_1.isTaprootInput)(input))
            return this.validateSignaturesOfTaprootInput(
              inputIndex,
              validator,
              pubkey
            );
          return this._validateSignaturesOfInput(inputIndex, validator, pubkey);
        }
        _validateSignaturesOfInput(inputIndex, validator, pubkey) {
          const input = this.data.inputs[inputIndex];
          const partialSig = (input || {}).partialSig;
          if (!input || !partialSig || partialSig.length < 1)
            throw new Error("No signatures to validate");
          if (typeof validator !== "function")
            throw new Error("Need validator function to validate signatures");
          const mySigs = pubkey ? partialSig.filter((sig) => sig.pubkey.equals(pubkey)) : partialSig;
          if (mySigs.length < 1) throw new Error("No signatures for this pubkey");
          const results = [];
          let hashCache;
          let scriptCache;
          let sighashCache;
          for (const pSig of mySigs) {
            const sig = bscript.signature.decode(pSig.signature);
            const { hash: hash2, script } = sighashCache !== sig.hashType ? getHashForSig(
              inputIndex,
              Object.assign({}, input, { sighashType: sig.hashType }),
              this.__CACHE,
              true
            ) : { hash: hashCache, script: scriptCache };
            sighashCache = sig.hashType;
            hashCache = hash2;
            scriptCache = script;
            checkScriptForPubkey(pSig.pubkey, script, "verify");
            results.push(validator(pSig.pubkey, hash2, sig.signature));
          }
          return results.every((res) => res === true);
        }
        validateSignaturesOfTaprootInput(inputIndex, validator, pubkey) {
          const input = this.data.inputs[inputIndex];
          const tapKeySig = (input || {}).tapKeySig;
          const tapScriptSig = (input || {}).tapScriptSig;
          if (!input && !tapKeySig && !(tapScriptSig && !tapScriptSig.length))
            throw new Error("No signatures to validate");
          if (typeof validator !== "function")
            throw new Error("Need validator function to validate signatures");
          pubkey = pubkey && (0, bip371_1.toXOnly)(pubkey);
          const allHashses = pubkey ? getTaprootHashesForSig(
            inputIndex,
            input,
            this.data.inputs,
            pubkey,
            this.__CACHE
          ) : getAllTaprootHashesForSig(
            inputIndex,
            input,
            this.data.inputs,
            this.__CACHE
          );
          if (!allHashses.length) throw new Error("No signatures for this pubkey");
          const tapKeyHash = allHashses.find((h) => !h.leafHash);
          let validationResultCount = 0;
          if (tapKeySig && tapKeyHash) {
            const isValidTapkeySig = validator(
              tapKeyHash.pubkey,
              tapKeyHash.hash,
              trimTaprootSig(tapKeySig)
            );
            if (!isValidTapkeySig) return false;
            validationResultCount++;
          }
          if (tapScriptSig) {
            for (const tapSig of tapScriptSig) {
              const tapSigHash = allHashses.find((h) => tapSig.pubkey.equals(h.pubkey));
              if (tapSigHash) {
                const isValidTapScriptSig = validator(
                  tapSig.pubkey,
                  tapSigHash.hash,
                  trimTaprootSig(tapSig.signature)
                );
                if (!isValidTapScriptSig) return false;
                validationResultCount++;
              }
            }
          }
          return validationResultCount > 0;
        }
        signAllInputsHD(hdKeyPair, sighashTypes = [transaction_1.Transaction.SIGHASH_ALL]) {
          if (!hdKeyPair || !hdKeyPair.publicKey || !hdKeyPair.fingerprint) {
            throw new Error("Need HDSigner to sign input");
          }
          const results = [];
          for (const i of range(this.data.inputs.length)) {
            try {
              this.signInputHD(i, hdKeyPair, sighashTypes);
              results.push(true);
            } catch (err) {
              results.push(false);
            }
          }
          if (results.every((v) => v === false)) {
            throw new Error("No inputs were signed");
          }
          return this;
        }
        signAllInputsHDAsync(hdKeyPair, sighashTypes = [transaction_1.Transaction.SIGHASH_ALL]) {
          return new Promise((resolve, reject) => {
            if (!hdKeyPair || !hdKeyPair.publicKey || !hdKeyPair.fingerprint) {
              return reject(new Error("Need HDSigner to sign input"));
            }
            const results = [];
            const promises = [];
            for (const i of range(this.data.inputs.length)) {
              promises.push(
                this.signInputHDAsync(i, hdKeyPair, sighashTypes).then(
                  () => {
                    results.push(true);
                  },
                  () => {
                    results.push(false);
                  }
                )
              );
            }
            return Promise.all(promises).then(() => {
              if (results.every((v) => v === false)) {
                return reject(new Error("No inputs were signed"));
              }
              resolve();
            });
          });
        }
        signInputHD(inputIndex, hdKeyPair, sighashTypes = [transaction_1.Transaction.SIGHASH_ALL]) {
          if (!hdKeyPair || !hdKeyPair.publicKey || !hdKeyPair.fingerprint) {
            throw new Error("Need HDSigner to sign input");
          }
          const signers = getSignersFromHD(inputIndex, this.data.inputs, hdKeyPair);
          signers.forEach((signer) => this.signInput(inputIndex, signer, sighashTypes));
          return this;
        }
        signInputHDAsync(inputIndex, hdKeyPair, sighashTypes = [transaction_1.Transaction.SIGHASH_ALL]) {
          return new Promise((resolve, reject) => {
            if (!hdKeyPair || !hdKeyPair.publicKey || !hdKeyPair.fingerprint) {
              return reject(new Error("Need HDSigner to sign input"));
            }
            const signers = getSignersFromHD(inputIndex, this.data.inputs, hdKeyPair);
            const promises = signers.map(
              (signer) => this.signInputAsync(inputIndex, signer, sighashTypes)
            );
            return Promise.all(promises).then(() => {
              resolve();
            }).catch(reject);
          });
        }
        signAllInputs(keyPair, sighashTypes) {
          if (!keyPair || !keyPair.publicKey)
            throw new Error("Need Signer to sign input");
          const results = [];
          for (const i of range(this.data.inputs.length)) {
            try {
              this.signInput(i, keyPair, sighashTypes);
              results.push(true);
            } catch (err) {
              results.push(false);
            }
          }
          if (results.every((v) => v === false)) {
            throw new Error("No inputs were signed");
          }
          return this;
        }
        signAllInputsAsync(keyPair, sighashTypes) {
          return new Promise((resolve, reject) => {
            if (!keyPair || !keyPair.publicKey)
              return reject(new Error("Need Signer to sign input"));
            const results = [];
            const promises = [];
            for (const [i] of this.data.inputs.entries()) {
              promises.push(
                this.signInputAsync(i, keyPair, sighashTypes).then(
                  () => {
                    results.push(true);
                  },
                  () => {
                    results.push(false);
                  }
                )
              );
            }
            return Promise.all(promises).then(() => {
              if (results.every((v) => v === false)) {
                return reject(new Error("No inputs were signed"));
              }
              resolve();
            });
          });
        }
        signInput(inputIndex, keyPair, sighashTypes) {
          if (!keyPair || !keyPair.publicKey)
            throw new Error("Need Signer to sign input");
          const input = (0, utils_1.checkForInput)(this.data.inputs, inputIndex);
          if ((0, bip371_1.isTaprootInput)(input)) {
            return this._signTaprootInput(
              inputIndex,
              input,
              keyPair,
              void 0,
              sighashTypes
            );
          }
          return this._signInput(inputIndex, keyPair, sighashTypes);
        }
        signTaprootInput(inputIndex, keyPair, tapLeafHashToSign, sighashTypes) {
          if (!keyPair || !keyPair.publicKey)
            throw new Error("Need Signer to sign input");
          const input = (0, utils_1.checkForInput)(this.data.inputs, inputIndex);
          if ((0, bip371_1.isTaprootInput)(input))
            return this._signTaprootInput(
              inputIndex,
              input,
              keyPair,
              tapLeafHashToSign,
              sighashTypes
            );
          throw new Error(`Input #${inputIndex} is not of type Taproot.`);
        }
        _signInput(inputIndex, keyPair, sighashTypes = [transaction_1.Transaction.SIGHASH_ALL]) {
          const { hash: hash2, sighashType } = getHashAndSighashType(
            this.data.inputs,
            inputIndex,
            keyPair.publicKey,
            this.__CACHE,
            sighashTypes
          );
          const partialSig = [
            {
              pubkey: keyPair.publicKey,
              signature: bscript.signature.encode(keyPair.sign(hash2), sighashType)
            }
          ];
          this.data.updateInput(inputIndex, { partialSig });
          return this;
        }
        _signTaprootInput(inputIndex, input, keyPair, tapLeafHashToSign, allowedSighashTypes = [transaction_1.Transaction.SIGHASH_DEFAULT]) {
          const hashesForSig = this.checkTaprootHashesForSig(
            inputIndex,
            input,
            keyPair,
            tapLeafHashToSign,
            allowedSighashTypes
          );
          const tapKeySig = hashesForSig.filter((h) => !h.leafHash).map(
            (h) => (0, bip371_1.serializeTaprootSignature)(
              keyPair.signSchnorr(h.hash),
              input.sighashType
            )
          )[0];
          const tapScriptSig = hashesForSig.filter((h) => !!h.leafHash).map((h) => ({
            pubkey: (0, bip371_1.toXOnly)(keyPair.publicKey),
            signature: (0, bip371_1.serializeTaprootSignature)(
              keyPair.signSchnorr(h.hash),
              input.sighashType
            ),
            leafHash: h.leafHash
          }));
          if (tapKeySig) {
            this.data.updateInput(inputIndex, { tapKeySig });
          }
          if (tapScriptSig.length) {
            this.data.updateInput(inputIndex, { tapScriptSig });
          }
          return this;
        }
        signInputAsync(inputIndex, keyPair, sighashTypes) {
          return Promise.resolve().then(() => {
            if (!keyPair || !keyPair.publicKey)
              throw new Error("Need Signer to sign input");
            const input = (0, utils_1.checkForInput)(this.data.inputs, inputIndex);
            if ((0, bip371_1.isTaprootInput)(input))
              return this._signTaprootInputAsync(
                inputIndex,
                input,
                keyPair,
                void 0,
                sighashTypes
              );
            return this._signInputAsync(inputIndex, keyPair, sighashTypes);
          });
        }
        signTaprootInputAsync(inputIndex, keyPair, tapLeafHash, sighashTypes) {
          return Promise.resolve().then(() => {
            if (!keyPair || !keyPair.publicKey)
              throw new Error("Need Signer to sign input");
            const input = (0, utils_1.checkForInput)(this.data.inputs, inputIndex);
            if ((0, bip371_1.isTaprootInput)(input))
              return this._signTaprootInputAsync(
                inputIndex,
                input,
                keyPair,
                tapLeafHash,
                sighashTypes
              );
            throw new Error(`Input #${inputIndex} is not of type Taproot.`);
          });
        }
        _signInputAsync(inputIndex, keyPair, sighashTypes = [transaction_1.Transaction.SIGHASH_ALL]) {
          const { hash: hash2, sighashType } = getHashAndSighashType(
            this.data.inputs,
            inputIndex,
            keyPair.publicKey,
            this.__CACHE,
            sighashTypes
          );
          return Promise.resolve(keyPair.sign(hash2)).then((signature) => {
            const partialSig = [
              {
                pubkey: keyPair.publicKey,
                signature: bscript.signature.encode(signature, sighashType)
              }
            ];
            this.data.updateInput(inputIndex, { partialSig });
          });
        }
        async _signTaprootInputAsync(inputIndex, input, keyPair, tapLeafHash, sighashTypes = [transaction_1.Transaction.SIGHASH_DEFAULT]) {
          const hashesForSig = this.checkTaprootHashesForSig(
            inputIndex,
            input,
            keyPair,
            tapLeafHash,
            sighashTypes
          );
          const signaturePromises = [];
          const tapKeyHash = hashesForSig.filter((h) => !h.leafHash)[0];
          if (tapKeyHash) {
            const tapKeySigPromise = Promise.resolve(
              keyPair.signSchnorr(tapKeyHash.hash)
            ).then((sig) => {
              return {
                tapKeySig: (0, bip371_1.serializeTaprootSignature)(
                  sig,
                  input.sighashType
                )
              };
            });
            signaturePromises.push(tapKeySigPromise);
          }
          const tapScriptHashes = hashesForSig.filter((h) => !!h.leafHash);
          if (tapScriptHashes.length) {
            const tapScriptSigPromises = tapScriptHashes.map((tsh) => {
              return Promise.resolve(keyPair.signSchnorr(tsh.hash)).then(
                (signature) => {
                  const tapScriptSig = [
                    {
                      pubkey: (0, bip371_1.toXOnly)(keyPair.publicKey),
                      signature: (0, bip371_1.serializeTaprootSignature)(
                        signature,
                        input.sighashType
                      ),
                      leafHash: tsh.leafHash
                    }
                  ];
                  return { tapScriptSig };
                }
              );
            });
            signaturePromises.push(...tapScriptSigPromises);
          }
          return Promise.all(signaturePromises).then((results) => {
            results.forEach((v) => this.data.updateInput(inputIndex, v));
          });
        }
        checkTaprootHashesForSig(inputIndex, input, keyPair, tapLeafHashToSign, allowedSighashTypes) {
          if (typeof keyPair.signSchnorr !== "function")
            throw new Error(
              `Need Schnorr Signer to sign taproot input #${inputIndex}.`
            );
          const hashesForSig = getTaprootHashesForSig(
            inputIndex,
            input,
            this.data.inputs,
            keyPair.publicKey,
            this.__CACHE,
            tapLeafHashToSign,
            allowedSighashTypes
          );
          if (!hashesForSig || !hashesForSig.length)
            throw new Error(
              `Can not sign for input #${inputIndex} with the key ${keyPair.publicKey.toString(
                "hex"
              )}`
            );
          return hashesForSig;
        }
        toBuffer() {
          checkCache(this.__CACHE);
          return this.data.toBuffer();
        }
        toHex() {
          checkCache(this.__CACHE);
          return this.data.toHex();
        }
        toBase64() {
          checkCache(this.__CACHE);
          return this.data.toBase64();
        }
        updateGlobal(updateData) {
          this.data.updateGlobal(updateData);
          return this;
        }
        updateInput(inputIndex, updateData) {
          if (updateData.witnessScript) checkInvalidP2WSH(updateData.witnessScript);
          (0, bip371_1.checkTaprootInputFields)(
            this.data.inputs[inputIndex],
            updateData,
            "updateInput"
          );
          this.data.updateInput(inputIndex, updateData);
          if (updateData.nonWitnessUtxo) {
            addNonWitnessTxCache(
              this.__CACHE,
              this.data.inputs[inputIndex],
              inputIndex
            );
          }
          return this;
        }
        updateOutput(outputIndex, updateData) {
          const outputData = this.data.outputs[outputIndex];
          (0, bip371_1.checkTaprootOutputFields)(
            outputData,
            updateData,
            "updateOutput"
          );
          this.data.updateOutput(outputIndex, updateData);
          return this;
        }
        addUnknownKeyValToGlobal(keyVal) {
          this.data.addUnknownKeyValToGlobal(keyVal);
          return this;
        }
        addUnknownKeyValToInput(inputIndex, keyVal) {
          this.data.addUnknownKeyValToInput(inputIndex, keyVal);
          return this;
        }
        addUnknownKeyValToOutput(outputIndex, keyVal) {
          this.data.addUnknownKeyValToOutput(outputIndex, keyVal);
          return this;
        }
        clearFinalizedInput(inputIndex) {
          this.data.clearFinalizedInput(inputIndex);
          return this;
        }
      };
      exports2.Psbt = Psbt2;
      var transactionFromBuffer = (buffer) => new PsbtTransaction(buffer);
      var PsbtTransaction = class {
        constructor(buffer = Buffer.from([2, 0, 0, 0, 0, 0, 0, 0, 0, 0])) {
          this.tx = transaction_1.Transaction.fromBuffer(buffer);
          checkTxEmpty(this.tx);
          Object.defineProperty(this, "tx", {
            enumerable: false,
            writable: true
          });
        }
        getInputOutputCounts() {
          return {
            inputCount: this.tx.ins.length,
            outputCount: this.tx.outs.length
          };
        }
        addInput(input) {
          if (input.hash === void 0 || input.index === void 0 || !Buffer.isBuffer(input.hash) && typeof input.hash !== "string" || typeof input.index !== "number") {
            throw new Error("Error adding input.");
          }
          const hash2 = typeof input.hash === "string" ? (0, bufferutils_1.reverseBuffer)(Buffer.from(input.hash, "hex")) : input.hash;
          this.tx.addInput(hash2, input.index, input.sequence);
        }
        addOutput(output) {
          if (output.script === void 0 || output.value === void 0 || !Buffer.isBuffer(output.script) || typeof output.value !== "number") {
            throw new Error("Error adding output.");
          }
          this.tx.addOutput(output.script, output.value);
        }
        toBuffer() {
          return this.tx.toBuffer();
        }
      };
      function canFinalize(input, script, scriptType) {
        switch (scriptType) {
          case "pubkey":
          case "pubkeyhash":
          case "witnesspubkeyhash":
            return hasSigs(1, input.partialSig);
          case "multisig":
            const p2ms = payments2.p2ms({ output: script });
            return hasSigs(p2ms.m, input.partialSig, p2ms.pubkeys);
          default:
            return false;
        }
      }
      function checkCache(cache) {
        if (cache.__UNSAFE_SIGN_NONSEGWIT !== false) {
          throw new Error("Not BIP174 compliant, can not export");
        }
      }
      function hasSigs(neededSigs, partialSig, pubkeys) {
        if (!partialSig) return false;
        let sigs;
        if (pubkeys) {
          sigs = pubkeys.map((pkey) => {
            const pubkey = compressPubkey(pkey);
            return partialSig.find((pSig) => pSig.pubkey.equals(pubkey));
          }).filter((v) => !!v);
        } else {
          sigs = partialSig;
        }
        if (sigs.length > neededSigs) throw new Error("Too many signatures");
        return sigs.length === neededSigs;
      }
      function isFinalized(input) {
        return !!input.finalScriptSig || !!input.finalScriptWitness;
      }
      function bip32DerivationIsMine(root2) {
        return (d) => {
          if (!d.masterFingerprint.equals(root2.fingerprint)) return false;
          if (!root2.derivePath(d.path).publicKey.equals(d.pubkey)) return false;
          return true;
        };
      }
      function check32Bit(num) {
        if (typeof num !== "number" || num !== Math.floor(num) || num > 4294967295 || num < 0) {
          throw new Error("Invalid 32 bit integer");
        }
      }
      function checkFees(psbt, cache, opts) {
        const feeRate = cache.__FEE_RATE || psbt.getFeeRate();
        const vsize = cache.__EXTRACTED_TX.virtualSize();
        const satoshis = feeRate * vsize;
        if (feeRate >= opts.maximumFeeRate) {
          throw new Error(
            `Warning: You are paying around ${(satoshis / 1e8).toFixed(8)} in fees, which is ${feeRate} satoshi per byte for a transaction with a VSize of ${vsize} bytes (segwit counted as 0.25 byte per byte). Use setMaximumFeeRate method to raise your threshold, or pass true to the first arg of extractTransaction.`
          );
        }
      }
      function checkInputsForPartialSig(inputs, action) {
        inputs.forEach((input) => {
          const throws = (0, bip371_1.isTaprootInput)(input) ? (0, bip371_1.checkTaprootInputForSigs)(input, action) : (0, psbtutils_1.checkInputForSig)(input, action);
          if (throws)
            throw new Error("Can not modify transaction, signatures exist.");
        });
      }
      function checkPartialSigSighashes(input) {
        if (!input.sighashType || !input.partialSig) return;
        const { partialSig, sighashType } = input;
        partialSig.forEach((pSig) => {
          const { hashType } = bscript.signature.decode(pSig.signature);
          if (sighashType !== hashType) {
            throw new Error("Signature sighash does not match input sighash type");
          }
        });
      }
      function checkScriptForPubkey(pubkey, script, action) {
        if (!(0, psbtutils_1.pubkeyInScript)(pubkey, script)) {
          throw new Error(
            `Can not ${action} for this input with the key ${pubkey.toString("hex")}`
          );
        }
      }
      function checkTxEmpty(tx2) {
        const isEmpty = tx2.ins.every(
          (input) => input.script && input.script.length === 0 && input.witness && input.witness.length === 0
        );
        if (!isEmpty) {
          throw new Error("Format Error: Transaction ScriptSigs are not empty");
        }
      }
      function checkTxForDupeIns(tx2, cache) {
        tx2.ins.forEach((input) => {
          checkTxInputCache(cache, input);
        });
      }
      function checkTxInputCache(cache, input) {
        const key = (0, bufferutils_1.reverseBuffer)(Buffer.from(input.hash)).toString("hex") + ":" + input.index;
        if (cache.__TX_IN_CACHE[key]) throw new Error("Duplicate input detected.");
        cache.__TX_IN_CACHE[key] = 1;
      }
      function scriptCheckerFactory(payment, paymentScriptName) {
        return (inputIndex, scriptPubKey, redeemScript, ioType) => {
          const redeemScriptOutput = payment({
            redeem: { output: redeemScript }
          }).output;
          if (!scriptPubKey.equals(redeemScriptOutput)) {
            throw new Error(
              `${paymentScriptName} for ${ioType} #${inputIndex} doesn't match the scriptPubKey in the prevout`
            );
          }
        };
      }
      var checkRedeemScript = scriptCheckerFactory(payments2.p2sh, "Redeem script");
      var checkWitnessScript = scriptCheckerFactory(
        payments2.p2wsh,
        "Witness script"
      );
      function getTxCacheValue(key, name, inputs, c) {
        if (!inputs.every(isFinalized))
          throw new Error(`PSBT must be finalized to calculate ${name}`);
        if (key === "__FEE_RATE" && c.__FEE_RATE) return c.__FEE_RATE;
        if (key === "__FEE" && c.__FEE) return c.__FEE;
        let tx2;
        let mustFinalize = true;
        if (c.__EXTRACTED_TX) {
          tx2 = c.__EXTRACTED_TX;
          mustFinalize = false;
        } else {
          tx2 = c.__TX.clone();
        }
        inputFinalizeGetAmts(inputs, tx2, c, mustFinalize);
        if (key === "__FEE_RATE") return c.__FEE_RATE;
        else if (key === "__FEE") return c.__FEE;
      }
      function getFinalScripts(inputIndex, input, script, isSegwit, isP2SH, isP2WSH) {
        const scriptType = classifyScript(script);
        if (!canFinalize(input, script, scriptType))
          throw new Error(`Can not finalize input #${inputIndex}`);
        return prepareFinalScripts(
          script,
          scriptType,
          input.partialSig,
          isSegwit,
          isP2SH,
          isP2WSH
        );
      }
      function prepareFinalScripts(script, scriptType, partialSig, isSegwit, isP2SH, isP2WSH) {
        let finalScriptSig;
        let finalScriptWitness;
        const payment = getPayment(script, scriptType, partialSig);
        const p2wsh = !isP2WSH ? null : payments2.p2wsh({ redeem: payment });
        const p2sh = !isP2SH ? null : payments2.p2sh({ redeem: p2wsh || payment });
        if (isSegwit) {
          if (p2wsh) {
            finalScriptWitness = (0, psbtutils_1.witnessStackToScriptWitness)(
              p2wsh.witness
            );
          } else {
            finalScriptWitness = (0, psbtutils_1.witnessStackToScriptWitness)(
              payment.witness
            );
          }
          if (p2sh) {
            finalScriptSig = p2sh.input;
          }
        } else {
          if (p2sh) {
            finalScriptSig = p2sh.input;
          } else {
            finalScriptSig = payment.input;
          }
        }
        return {
          finalScriptSig,
          finalScriptWitness
        };
      }
      function getHashAndSighashType(inputs, inputIndex, pubkey, cache, sighashTypes) {
        const input = (0, utils_1.checkForInput)(inputs, inputIndex);
        const { hash: hash2, sighashType, script } = getHashForSig(
          inputIndex,
          input,
          cache,
          false,
          sighashTypes
        );
        checkScriptForPubkey(pubkey, script, "sign");
        return {
          hash: hash2,
          sighashType
        };
      }
      function getHashForSig(inputIndex, input, cache, forValidate, sighashTypes) {
        const unsignedTx = cache.__TX;
        const sighashType = input.sighashType || transaction_1.Transaction.SIGHASH_ALL;
        checkSighashTypeAllowed(sighashType, sighashTypes);
        let hash2;
        let prevout;
        if (input.nonWitnessUtxo) {
          const nonWitnessUtxoTx = nonWitnessUtxoTxFromCache(
            cache,
            input,
            inputIndex
          );
          const prevoutHash = unsignedTx.ins[inputIndex].hash;
          const utxoHash = nonWitnessUtxoTx.getHash();
          if (!prevoutHash.equals(utxoHash)) {
            throw new Error(
              `Non-witness UTXO hash for input #${inputIndex} doesn't match the hash specified in the prevout`
            );
          }
          const prevoutIndex = unsignedTx.ins[inputIndex].index;
          prevout = nonWitnessUtxoTx.outs[prevoutIndex];
        } else if (input.witnessUtxo) {
          prevout = input.witnessUtxo;
        } else {
          throw new Error("Need a Utxo input item for signing");
        }
        const { meaningfulScript, type } = getMeaningfulScript(
          prevout.script,
          inputIndex,
          "input",
          input.redeemScript,
          input.witnessScript
        );
        if (["p2sh-p2wsh", "p2wsh"].indexOf(type) >= 0) {
          hash2 = unsignedTx.hashForWitnessV0(
            inputIndex,
            meaningfulScript,
            prevout.value,
            sighashType
          );
        } else if ((0, psbtutils_1.isP2WPKH)(meaningfulScript)) {
          const signingScript = payments2.p2pkh({
            hash: meaningfulScript.slice(2)
          }).output;
          hash2 = unsignedTx.hashForWitnessV0(
            inputIndex,
            signingScript,
            prevout.value,
            sighashType
          );
        } else {
          if (input.nonWitnessUtxo === void 0 && cache.__UNSAFE_SIGN_NONSEGWIT === false)
            throw new Error(
              `Input #${inputIndex} has witnessUtxo but non-segwit script: ${meaningfulScript.toString("hex")}`
            );
          if (!forValidate && cache.__UNSAFE_SIGN_NONSEGWIT !== false)
            console.warn(
              "Warning: Signing non-segwit inputs without the full parent transaction means there is a chance that a miner could feed you incorrect information to trick you into paying large fees. This behavior is the same as Psbt's predecessor (TransactionBuilder - now removed) when signing non-segwit scripts. You are not able to export this Psbt with toBuffer|toBase64|toHex since it is not BIP174 compliant.\n*********************\nPROCEED WITH CAUTION!\n*********************"
            );
          hash2 = unsignedTx.hashForSignature(
            inputIndex,
            meaningfulScript,
            sighashType
          );
        }
        return {
          script: meaningfulScript,
          sighashType,
          hash: hash2
        };
      }
      function getAllTaprootHashesForSig(inputIndex, input, inputs, cache) {
        const allPublicKeys = [];
        if (input.tapInternalKey) {
          const key = getPrevoutTaprootKey(inputIndex, input, cache);
          if (key) {
            allPublicKeys.push(key);
          }
        }
        if (input.tapScriptSig) {
          const tapScriptPubkeys = input.tapScriptSig.map((tss) => tss.pubkey);
          allPublicKeys.push(...tapScriptPubkeys);
        }
        const allHashes = allPublicKeys.map(
          (pubicKey) => getTaprootHashesForSig(inputIndex, input, inputs, pubicKey, cache)
        );
        return allHashes.flat();
      }
      function getPrevoutTaprootKey(inputIndex, input, cache) {
        const { script } = getScriptAndAmountFromUtxo(inputIndex, input, cache);
        return (0, psbtutils_1.isP2TR)(script) ? script.subarray(2, 34) : null;
      }
      function trimTaprootSig(signature) {
        return signature.length === 64 ? signature : signature.subarray(0, 64);
      }
      function getTaprootHashesForSig(inputIndex, input, inputs, pubkey, cache, tapLeafHashToSign, allowedSighashTypes) {
        const unsignedTx = cache.__TX;
        const sighashType = input.sighashType || transaction_1.Transaction.SIGHASH_DEFAULT;
        checkSighashTypeAllowed(sighashType, allowedSighashTypes);
        const prevOuts = inputs.map(
          (i, index) => getScriptAndAmountFromUtxo(index, i, cache)
        );
        const signingScripts = prevOuts.map((o) => o.script);
        const values = prevOuts.map((o) => o.value);
        const hashes = [];
        if (input.tapInternalKey && !tapLeafHashToSign) {
          const outputKey = getPrevoutTaprootKey(inputIndex, input, cache) || Buffer.from([]);
          if ((0, bip371_1.toXOnly)(pubkey).equals(outputKey)) {
            const tapKeyHash = unsignedTx.hashForWitnessV1(
              inputIndex,
              signingScripts,
              values,
              sighashType
            );
            hashes.push({ pubkey, hash: tapKeyHash });
          }
        }
        const tapLeafHashes = (input.tapLeafScript || []).filter((tapLeaf) => (0, psbtutils_1.pubkeyInScript)(pubkey, tapLeaf.script)).map((tapLeaf) => {
          const hash2 = (0, bip341_1.tapleafHash)({
            output: tapLeaf.script,
            version: tapLeaf.leafVersion
          });
          return Object.assign({ hash: hash2 }, tapLeaf);
        }).filter(
          (tapLeaf) => !tapLeafHashToSign || tapLeafHashToSign.equals(tapLeaf.hash)
        ).map((tapLeaf) => {
          const tapScriptHash = unsignedTx.hashForWitnessV1(
            inputIndex,
            signingScripts,
            values,
            sighashType,
            tapLeaf.hash
          );
          return {
            pubkey,
            hash: tapScriptHash,
            leafHash: tapLeaf.hash
          };
        });
        return hashes.concat(tapLeafHashes);
      }
      function checkSighashTypeAllowed(sighashType, sighashTypes) {
        if (sighashTypes && sighashTypes.indexOf(sighashType) < 0) {
          const str = sighashTypeToString(sighashType);
          throw new Error(
            `Sighash type is not allowed. Retry the sign method passing the sighashTypes array of whitelisted types. Sighash type: ${str}`
          );
        }
      }
      function getPayment(script, scriptType, partialSig) {
        let payment;
        switch (scriptType) {
          case "multisig":
            const sigs = getSortedSigs(script, partialSig);
            payment = payments2.p2ms({
              output: script,
              signatures: sigs
            });
            break;
          case "pubkey":
            payment = payments2.p2pk({
              output: script,
              signature: partialSig[0].signature
            });
            break;
          case "pubkeyhash":
            payment = payments2.p2pkh({
              output: script,
              pubkey: partialSig[0].pubkey,
              signature: partialSig[0].signature
            });
            break;
          case "witnesspubkeyhash":
            payment = payments2.p2wpkh({
              output: script,
              pubkey: partialSig[0].pubkey,
              signature: partialSig[0].signature
            });
            break;
        }
        return payment;
      }
      function getScriptFromInput(inputIndex, input, cache) {
        const unsignedTx = cache.__TX;
        const res = {
          script: null,
          isSegwit: false,
          isP2SH: false,
          isP2WSH: false
        };
        res.isP2SH = !!input.redeemScript;
        res.isP2WSH = !!input.witnessScript;
        if (input.witnessScript) {
          res.script = input.witnessScript;
        } else if (input.redeemScript) {
          res.script = input.redeemScript;
        } else {
          if (input.nonWitnessUtxo) {
            const nonWitnessUtxoTx = nonWitnessUtxoTxFromCache(
              cache,
              input,
              inputIndex
            );
            const prevoutIndex = unsignedTx.ins[inputIndex].index;
            res.script = nonWitnessUtxoTx.outs[prevoutIndex].script;
          } else if (input.witnessUtxo) {
            res.script = input.witnessUtxo.script;
          }
        }
        if (input.witnessScript || (0, psbtutils_1.isP2WPKH)(res.script)) {
          res.isSegwit = true;
        }
        return res;
      }
      function getSignersFromHD(inputIndex, inputs, hdKeyPair) {
        const input = (0, utils_1.checkForInput)(inputs, inputIndex);
        if (!input.bip32Derivation || input.bip32Derivation.length === 0) {
          throw new Error("Need bip32Derivation to sign with HD");
        }
        const myDerivations = input.bip32Derivation.map((bipDv) => {
          if (bipDv.masterFingerprint.equals(hdKeyPair.fingerprint)) {
            return bipDv;
          } else {
            return;
          }
        }).filter((v) => !!v);
        if (myDerivations.length === 0) {
          throw new Error(
            "Need one bip32Derivation masterFingerprint to match the HDSigner fingerprint"
          );
        }
        const signers = myDerivations.map((bipDv) => {
          const node = hdKeyPair.derivePath(bipDv.path);
          if (!bipDv.pubkey.equals(node.publicKey)) {
            throw new Error("pubkey did not match bip32Derivation");
          }
          return node;
        });
        return signers;
      }
      function getSortedSigs(script, partialSig) {
        const p2ms = payments2.p2ms({ output: script });
        return p2ms.pubkeys.map((pk) => {
          return (partialSig.filter((ps) => {
            return ps.pubkey.equals(pk);
          })[0] || {}).signature;
        }).filter((v) => !!v);
      }
      function scriptWitnessToWitnessStack(buffer) {
        let offset = 0;
        function readSlice(n2) {
          offset += n2;
          return buffer.slice(offset - n2, offset);
        }
        function readVarInt() {
          const vi = varuint.decode(buffer, offset);
          offset += varuint.decode.bytes;
          return vi;
        }
        function readVarSlice() {
          return readSlice(readVarInt());
        }
        function readVector() {
          const count = readVarInt();
          const vector = [];
          for (let i = 0; i < count; i++) vector.push(readVarSlice());
          return vector;
        }
        return readVector();
      }
      function sighashTypeToString(sighashType) {
        let text = sighashType & transaction_1.Transaction.SIGHASH_ANYONECANPAY ? "SIGHASH_ANYONECANPAY | " : "";
        const sigMod = sighashType & 31;
        switch (sigMod) {
          case transaction_1.Transaction.SIGHASH_ALL:
            text += "SIGHASH_ALL";
            break;
          case transaction_1.Transaction.SIGHASH_SINGLE:
            text += "SIGHASH_SINGLE";
            break;
          case transaction_1.Transaction.SIGHASH_NONE:
            text += "SIGHASH_NONE";
            break;
        }
        return text;
      }
      function addNonWitnessTxCache(cache, input, inputIndex) {
        cache.__NON_WITNESS_UTXO_BUF_CACHE[inputIndex] = input.nonWitnessUtxo;
        const tx2 = transaction_1.Transaction.fromBuffer(input.nonWitnessUtxo);
        cache.__NON_WITNESS_UTXO_TX_CACHE[inputIndex] = tx2;
        const self2 = cache;
        const selfIndex = inputIndex;
        delete input.nonWitnessUtxo;
        Object.defineProperty(input, "nonWitnessUtxo", {
          enumerable: true,
          get() {
            const buf = self2.__NON_WITNESS_UTXO_BUF_CACHE[selfIndex];
            const txCache = self2.__NON_WITNESS_UTXO_TX_CACHE[selfIndex];
            if (buf !== void 0) {
              return buf;
            } else {
              const newBuf = txCache.toBuffer();
              self2.__NON_WITNESS_UTXO_BUF_CACHE[selfIndex] = newBuf;
              return newBuf;
            }
          },
          set(data) {
            self2.__NON_WITNESS_UTXO_BUF_CACHE[selfIndex] = data;
          }
        });
      }
      function inputFinalizeGetAmts(inputs, tx2, cache, mustFinalize) {
        let inputAmount = 0;
        inputs.forEach((input, idx) => {
          if (mustFinalize && input.finalScriptSig)
            tx2.ins[idx].script = input.finalScriptSig;
          if (mustFinalize && input.finalScriptWitness) {
            tx2.ins[idx].witness = scriptWitnessToWitnessStack(
              input.finalScriptWitness
            );
          }
          if (input.witnessUtxo) {
            inputAmount += input.witnessUtxo.value;
          } else if (input.nonWitnessUtxo) {
            const nwTx = nonWitnessUtxoTxFromCache(cache, input, idx);
            const vout = tx2.ins[idx].index;
            const out = nwTx.outs[vout];
            inputAmount += out.value;
          }
        });
        const outputAmount = tx2.outs.reduce((total, o) => total + o.value, 0);
        const fee = inputAmount - outputAmount;
        if (fee < 0) {
          throw new Error("Outputs are spending more than Inputs");
        }
        const bytes = tx2.virtualSize();
        cache.__FEE = fee;
        cache.__EXTRACTED_TX = tx2;
        cache.__FEE_RATE = Math.floor(fee / bytes);
      }
      function nonWitnessUtxoTxFromCache(cache, input, inputIndex) {
        const c = cache.__NON_WITNESS_UTXO_TX_CACHE;
        if (!c[inputIndex]) {
          addNonWitnessTxCache(cache, input, inputIndex);
        }
        return c[inputIndex];
      }
      function getScriptFromUtxo(inputIndex, input, cache) {
        const { script } = getScriptAndAmountFromUtxo(inputIndex, input, cache);
        return script;
      }
      function getScriptAndAmountFromUtxo(inputIndex, input, cache) {
        if (input.witnessUtxo !== void 0) {
          return {
            script: input.witnessUtxo.script,
            value: input.witnessUtxo.value
          };
        } else if (input.nonWitnessUtxo !== void 0) {
          const nonWitnessUtxoTx = nonWitnessUtxoTxFromCache(
            cache,
            input,
            inputIndex
          );
          const o = nonWitnessUtxoTx.outs[cache.__TX.ins[inputIndex].index];
          return { script: o.script, value: o.value };
        } else {
          throw new Error("Can't find pubkey in input without Utxo data");
        }
      }
      function pubkeyInInput(pubkey, input, inputIndex, cache) {
        const script = getScriptFromUtxo(inputIndex, input, cache);
        const { meaningfulScript } = getMeaningfulScript(
          script,
          inputIndex,
          "input",
          input.redeemScript,
          input.witnessScript
        );
        return (0, psbtutils_1.pubkeyInScript)(pubkey, meaningfulScript);
      }
      function pubkeyInOutput(pubkey, output, outputIndex, cache) {
        const script = cache.__TX.outs[outputIndex].script;
        const { meaningfulScript } = getMeaningfulScript(
          script,
          outputIndex,
          "output",
          output.redeemScript,
          output.witnessScript
        );
        return (0, psbtutils_1.pubkeyInScript)(pubkey, meaningfulScript);
      }
      function redeemFromFinalScriptSig(finalScript) {
        if (!finalScript) return;
        const decomp = bscript.decompile(finalScript);
        if (!decomp) return;
        const lastItem = decomp[decomp.length - 1];
        if (!Buffer.isBuffer(lastItem) || isPubkeyLike(lastItem) || isSigLike(lastItem))
          return;
        const sDecomp = bscript.decompile(lastItem);
        if (!sDecomp) return;
        return lastItem;
      }
      function redeemFromFinalWitnessScript(finalScript) {
        if (!finalScript) return;
        const decomp = scriptWitnessToWitnessStack(finalScript);
        const lastItem = decomp[decomp.length - 1];
        if (isPubkeyLike(lastItem)) return;
        const sDecomp = bscript.decompile(lastItem);
        if (!sDecomp) return;
        return lastItem;
      }
      function compressPubkey(pubkey) {
        if (pubkey.length === 65) {
          const parity = pubkey[64] & 1;
          const newKey = pubkey.slice(0, 33);
          newKey[0] = 2 | parity;
          return newKey;
        }
        return pubkey.slice();
      }
      function isPubkeyLike(buf) {
        return buf.length === 33 && bscript.isCanonicalPubKey(buf);
      }
      function isSigLike(buf) {
        return bscript.isCanonicalScriptSignature(buf);
      }
      function getMeaningfulScript(script, index, ioType, redeemScript, witnessScript) {
        const isP2SH = (0, psbtutils_1.isP2SHScript)(script);
        const isP2SHP2WSH = isP2SH && redeemScript && (0, psbtutils_1.isP2WSHScript)(redeemScript);
        const isP2WSH = (0, psbtutils_1.isP2WSHScript)(script);
        if (isP2SH && redeemScript === void 0)
          throw new Error("scriptPubkey is P2SH but redeemScript missing");
        if ((isP2WSH || isP2SHP2WSH) && witnessScript === void 0)
          throw new Error(
            "scriptPubkey or redeemScript is P2WSH but witnessScript missing"
          );
        let meaningfulScript;
        if (isP2SHP2WSH) {
          meaningfulScript = witnessScript;
          checkRedeemScript(index, script, redeemScript, ioType);
          checkWitnessScript(index, redeemScript, witnessScript, ioType);
          checkInvalidP2WSH(meaningfulScript);
        } else if (isP2WSH) {
          meaningfulScript = witnessScript;
          checkWitnessScript(index, script, witnessScript, ioType);
          checkInvalidP2WSH(meaningfulScript);
        } else if (isP2SH) {
          meaningfulScript = redeemScript;
          checkRedeemScript(index, script, redeemScript, ioType);
        } else {
          meaningfulScript = script;
        }
        return {
          meaningfulScript,
          type: isP2SHP2WSH ? "p2sh-p2wsh" : isP2SH ? "p2sh" : isP2WSH ? "p2wsh" : "raw"
        };
      }
      function checkInvalidP2WSH(script) {
        if ((0, psbtutils_1.isP2WPKH)(script) || (0, psbtutils_1.isP2SHScript)(script)) {
          throw new Error("P2WPKH or P2SH can not be contained within P2WSH");
        }
      }
      function classifyScript(script) {
        if ((0, psbtutils_1.isP2WPKH)(script)) return "witnesspubkeyhash";
        if ((0, psbtutils_1.isP2PKH)(script)) return "pubkeyhash";
        if ((0, psbtutils_1.isP2MS)(script)) return "multisig";
        if ((0, psbtutils_1.isP2PK)(script)) return "pubkey";
        return "nonstandard";
      }
      function range(n2) {
        return [...Array(n2).keys()];
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/index.js
  var require_src4 = __commonJS({
    "node_modules/bitcoinjs-lib/src/index.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.initEccLib = exports2.Transaction = exports2.opcodes = exports2.Psbt = exports2.Block = exports2.script = exports2.payments = exports2.networks = exports2.crypto = exports2.address = void 0;
      var address = require_address();
      exports2.address = address;
      var crypto3 = require_crypto3();
      exports2.crypto = crypto3;
      var networks2 = require_networks();
      exports2.networks = networks2;
      var payments2 = require_payments();
      exports2.payments = payments2;
      var script = require_script();
      exports2.script = script;
      var block_1 = require_block();
      Object.defineProperty(exports2, "Block", {
        enumerable: true,
        get: function() {
          return block_1.Block;
        }
      });
      var psbt_1 = require_psbt2();
      Object.defineProperty(exports2, "Psbt", {
        enumerable: true,
        get: function() {
          return psbt_1.Psbt;
        }
      });
      var ops_1 = require_ops();
      Object.defineProperty(exports2, "opcodes", {
        enumerable: true,
        get: function() {
          return ops_1.OPS;
        }
      });
      var transaction_1 = require_transaction();
      Object.defineProperty(exports2, "Transaction", {
        enumerable: true,
        get: function() {
          return transaction_1.Transaction;
        }
      });
      var ecc_lib_1 = require_ecc_lib();
      Object.defineProperty(exports2, "initEccLib", {
        enumerable: true,
        get: function() {
          return ecc_lib_1.initEccLib;
        }
      });
    }
  });

  // (disabled):node_modules/tiny-secp256k1/lib/index.js
  var require_lib3 = __commonJS({
    "(disabled):node_modules/tiny-secp256k1/lib/index.js"() {
    }
  });

  // src/node.ts
  var import_crypto2 = __toESM(require_crypto());
  var import_node_fetch = __toESM(require_src());
  var import_https = __toESM(require_https());
  var fs = __toESM(require_fs());

  // src/util.ts
  var import_crypto = __toESM(require_crypto());
  var hash = (msg, algo = "SHA256") => {
    return (void 0)(algo).update(msg).digest("hex");
  };
  var mine = (difficulty, preimage, algorithm2) => {
    var magicNo = 0;
    var magicString = "";
    while (!hash(preimage + magicNo + magicString, algorithm2).endsWith("0".repeat(difficulty))) {
      magicNo++;
    }
    return {
      magicNo,
      magicString,
      hash: hash(preimage + magicNo + magicString, algorithm2)
    };
  };
  var regexPem = /.{64}/g;
  var createPemPub = (base64) => {
    return "-----BEGIN PUBLIC KEY-----\n" + base64.replace(regexPem, "$&\n") + "\n-----END PUBLIC KEY-----\n";
  };

  // src/node.ts
  var import_openapi_enforcer = __toESM(require_openapi_enforcer());
  var openapi = (0, import_openapi_enforcer.default)(__dirname + "/../wolfram-mega-spec.yaml");
  var checkPow = (pow, preimage) => {
    if (!pow.hash.endsWith("0".repeat(pow.difficulty))) {
      return false;
    }
    return hash(preimage + pow.magicNo + (pow.magicString ?? ""), pow.algorithm) === pow.hash;
  };
  var checkCapabilitySignature = (cp) => {
    const signature = cp.oracleSignature;
    const pow = cp.pow;
    cp.oracleSignature = "";
    cp.pow = void 0;
    const res = (void 0)(cp.oracleSignatureType).update(JSON.stringify(cp)).verify(createPemPub(cp.oraclePubKey), signature, "base64");
    cp.oracleSignature = signature;
    cp.pow = pow;
    return res;
  };
  var checkOracleIdSignature = (o) => {
    const signature = o.oracleSignature;
    o.oracleSignature = "";
    const res = (void 0)(o.oracleSignatureType).update(JSON.stringify(o)).verify(createPemPub(o.pubkey), signature, "base64");
    o.oracleSignature = signature;
    return res;
  };
  var checkOracleRank = (cfg, oracle, mempool2) => {
    if (Object.keys(mempool2.oracles).length >= cfg.maxOracles) {
      const evict = Object.values(mempool2.oracles).find((o) => o.id.bid.amount <= oracle.bid.amount && o.id.pow.difficulty <= oracle.pow.difficulty);
      if (evict !== void 0) {
        delete mempool2.oracles[evict.id.pubkey];
        return true;
      }
      return false;
    }
    return true;
  };
  var checkCapabilityRank = (cfg, cp, o) => {
    if (o.capabilies.length >= cfg.maxCapabilities) {
      const index = o.capabilies.findIndex((c) => c.pow.difficulty <= cp.pow.difficulty);
      if (index > -1) {
        o.capabilies.splice(index, 1);
        return true;
      }
      return false;
    }
    return true;
  };
  var checkReportRank = (cfg, report, o) => {
    if (o.reports.length >= cfg.maxReports) {
      const index = o.reports.findIndex((r) => r.pow.difficulty <= report.pow.difficulty);
      if (index > -1) {
        o.reports.splice(index, 1);
        return true;
      }
      return false;
    }
    return true;
  };
  var checkOfferRank = (cfg, offer, m) => {
    if (m.offers.length >= (cfg.maxOffers ?? 0)) {
      const index = m.offers.findIndex((r) => r.pow.difficulty <= offer.pow.difficulty);
      if (index > -1) {
        m.offers.splice(index, 1);
        return true;
      }
      return false;
    }
    return true;
  };
  var validateBid = async (cfg, bid) => {
    if (cfg.lnRestHost === void 0 || cfg.lnMacaroonPath === void 0 || cfg.facilitatorId === void 0 || cfg.facilitatorId.rewardAddress === void 0) {
      return false;
    }
    if (bid.paymentType === void 0 || bid.paymentType === "lightning") {
      try {
        const headers = new Headers();
        headers["Grpc-Metadata-macaroon"] = (void 0)(cfg.lnMacaroonPath).toString("hex");
        const httpsAgent = new import_https.default.Agent({
          rejectUnauthorized: false
        });
        const body = await (await (0, import_node_fetch.default)(
          "https://" + cfg.lnRestHost + "/v1/invoice/" + bid.proof,
          {
            headers,
            agent: httpsAgent
          }
        )).json();
        return body.payment_addr === cfg.facilitatorId?.rewardAddress && body.amt_paid_msat === bid.amount && body.state === "SETTLED";
      } catch (err) {
        (void 0).log(err);
        return false;
      }
    }
    return false;
  };
  var validateFact = (fact, req) => {
    return (void 0)(fact.signatureType).update(fact.factWithQuestion).verify(createPemPub(req.capabilityPubKey), fact.signature, "base64");
  };
  var mempool = {
    oracles: {},
    offers: []
  };
  var api = {
    announceOracle: async (cfg, id) => {
      const [_, error] = (await openapi).request({ method: "POST", path: "/oracle", body: id });
      if (error !== void 0) {
        return ["invalid request", error.toString()];
      }
      if (!(id.pow.difficulty == 0 || checkOracleIdSignature(id))) {
        return "wrong signature";
      }
      if (checkPow(id.pow, id.pubkey) || id.pow.difficulty == 0) {
        if (!(id.bid.amount == 0 || await validateBid(cfg, id.bid))) {
          id.bid.amount = 0;
        }
        if (checkOracleRank(cfg, id, mempool)) {
          if (mempool.oracles[id.pubkey] === void 0) {
            mempool.oracles[id.pubkey] = {
              id,
              capabilies: [],
              reports: []
            };
            return "success";
          } else {
            if (mempool.oracles[id.pubkey].id.seqNo < id.seqNo && mempool.oracles[id.pubkey].id.pow.difficulty <= id.pow.difficulty) {
              mempool.oracles[id.pubkey].id.seqNo = id.seqNo;
              mempool.oracles[id.pubkey].id.pow = id.pow;
              return "success";
            } else {
              return "duplicate";
            }
          }
        } else {
          return "low pow difficulty";
        }
      } else {
        return "wrong pow";
      }
    },
    announceCapability: async (cfg, cp) => {
      const [_, error] = (await openapi).request({ method: "POST", path: "/capability", body: cp });
      if (error !== void 0) {
        return ["invalid request", error.toString()];
      }
      if (mempool.oracles[cp.oraclePubKey] === void 0) {
        return "no oracle found";
      }
      if (cp.pow.difficulty == 0 || checkCapabilitySignature(cp)) {
        if (cp.pow.difficulty == 0 || checkPow(cp.pow, cp.oracleSignature)) {
          if (checkCapabilityRank(cfg, cp, mempool.oracles[cp.oraclePubKey])) {
            const found = mempool.oracles[cp.oraclePubKey].capabilies.find((x) => x.capabilityPubKey == cp.capabilityPubKey);
            if (found !== void 0) {
              if (found.seqNo < cp.seqNo && found.pow.difficulty <= cp.pow.difficulty) {
                found.seqNo = cp.seqNo;
                found.pow = cp.pow;
                found.off = cp.off;
                return "success";
              } else {
                return "duplicate";
              }
            }
            mempool.oracles[cp.oraclePubKey].capabilies.push(cp);
            return "success";
          } else {
            return "low pow difficulty";
          }
        } else {
          return "wrong pow";
        }
      } else {
        return "wrong signature";
      }
    },
    reportMalleability: async (cfg, report) => {
      const [_, error] = (await openapi).request({ method: "POST", path: "/report", body: report });
      if (error !== void 0) {
        return ["invalid request", error.toString()];
      }
      if (mempool.oracles[report.oraclePubKey] === void 0) {
        return "no oracle found";
      }
      if (!checkPow(report.pow, JSON.stringify(report.content)) && !(report.pow.difficulty == 0)) {
        return "wrong pow";
      }
      if (!checkReportRank(cfg, report, mempool.oracles[report.oraclePubKey])) {
        return "low pow difficulty";
      }
      const found = mempool.oracles[report.oraclePubKey].reports.find((x) => x.pow.hash == report.pow.hash);
      if (found !== void 0) {
        if (found.seqNo < report.seqNo) {
          found.seqNo = report.seqNo;
          return "success";
        } else {
          return "duplicate";
        }
      }
      mempool.oracles[report.oraclePubKey].reports.push(report);
      return "success";
    },
    disputeMissingfactClaim: async (dispute) => {
      const [_, error] = (await openapi).request({ method: "POST", path: "/dispute", body: dispute });
      if (error !== void 0) {
        return ["invalid request", error.toString()];
      }
      if (mempool.oracles[dispute.oraclePubKey] === void 0) {
        return "no oracle found";
      }
      const oracle = mempool.oracles[dispute.oraclePubKey];
      if (!validateFact(dispute.fact, dispute.claim.request)) {
        return "invalid fact";
      }
      if (oracle !== void 0) {
        const found = mempool.oracles[oracle.id.pubkey].reports.find((x) => x.content.type == "fact-missing" && x.pow.hash == dispute.reportPow.hash);
        if (found !== void 0 && found.content.type == "fact-missing") {
          found.content.dispute = dispute.fact;
          return "success";
        } else {
          return "report not found";
        }
      } else {
        return "no oracle found";
      }
    },
    lookupOracles: async (paging) => {
      return Object.values(mempool.oracles).sort((a, b) => a.id.bid.amount - b.id.bid.amount).map((x) => x.id).slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
    },
    lookupCapabilities: async (paging, oraclePub) => {
      if (mempool.oracles[oraclePub] === void 0) {
        (void 0).log("oracle not found " + oraclePub);
        return [];
      }
      return mempool.oracles[oraclePub].capabilies.slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
    },
    lookupReports: async (paging, oraclePub) => {
      if (mempool.oracles[oraclePub] === void 0) {
        (void 0).log("oracle not found " + oraclePub);
        return [];
      }
      return mempool.oracles[oraclePub].reports.slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
    },
    publishOffer: async function(cfg, offer) {
      const [_, error] = (await openapi).request({ method: "POST", path: "/offer", body: offer });
      if (error !== void 0) {
        return ["invalid request", error.toString()];
      }
      if (!checkPow(offer.pow, JSON.stringify(offer.content)) && !(offer.pow.difficulty == 0)) {
        return "wrong pow";
      }
      if (!checkOfferRank(cfg, offer, mempool)) {
        return "low pow difficulty";
      }
      const found = mempool.offers.find((x) => x.pow.hash === offer.pow.hash);
      if (found !== void 0) {
        if (found.seqNo < offer.seqNo && found.pow.difficulty <= offer.pow.difficulty) {
          found.seqNo = offer.seqNo;
          found.pow = offer.pow;
          return "success";
        }
        return "duplicate";
      }
      const cp = Object.values(mempool.oracles).find(
        (o) => o.capabilies.find(
          (c) => c.capabilityPubKey === offer.content.terms.question.capabilityPubKey
        ) !== void 0
      );
      if (cp === void 0) {
        return "no oracle found";
      }
      mempool.offers.push(offer);
      return "success";
    },
    lookupOffers: async function(paging, capabilityPubKey) {
      return mempool.offers.filter((o) => o.content.terms.question.capabilityPubKey === capabilityPubKey).slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
    }
  };

  // src/pow.ts
  var powOverReport = async (r, difficulty, algorithm2 = "SHA256") => {
    const res = mine(difficulty, JSON.stringify(r.content), algorithm2);
    return {
      difficulty,
      algorithm: algorithm2,
      hash: res.hash,
      magicNo: res.magicNo,
      magicString: res.magicString
    };
  };
  var powOverOffer = async (offer, difficulty, algorithm2 = "SHA256") => {
    const res = mine(difficulty, JSON.stringify(offer.content), algorithm2);
    return {
      difficulty,
      algorithm: algorithm2,
      hash: res.hash,
      magicNo: res.magicNo,
      magicString: res.magicString
    };
  };

  // src/client-api/trader-api.ts
  function traderApi(tradercfg, poolcfg, nodeApi, storage, p2pNode2) {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    var obroadcaster = null;
    var rbroadcaster = null;
    const tapi = {
      collectOracles: async function(tag, predicate, limit) {
        var counter = 0;
        const timeout = setInterval(async () => {
          const oracles = await nodeApi.lookupOracles({
            page: getRandomInt(tradercfg.maxOraclesPages),
            chunkSize: tradercfg.pageSize
          });
          const picked = (await Promise.all(oracles.map(async (o) => {
            return { o, p: await predicate(o) };
          }))).filter((x) => x.p).map((x) => x.o);
          picked.forEach(async (id) => {
            if (counter < limit) {
              await storage.addOracle(id) && counter++;
            }
          });
        }, tradercfg.collectOracleAdsCycle);
        const cl = {
          type: "OracleId",
          tag,
          active: true,
          predicate,
          cancel: async function() {
            clearInterval(timeout);
            cl.active = false;
          },
          count: () => counter,
          limit
        };
        return cl;
      },
      collectCapabilities: async function(tag, q, opredicate, predicate, limit) {
        var counter = 0;
        const timeout = setInterval(async () => {
          storage.allOracles(q, opredicate, async (oracleid) => {
            const cps = await nodeApi.lookupCapabilities({
              page: getRandomInt(tradercfg.maxCpPages),
              chunkSize: tradercfg.pageSize
            }, oracleid.pubkey);
            const picked = (await Promise.all(cps.map(async (cp) => {
              return { cp, p: await predicate(cp) };
            }))).filter((x) => x.p).map((x) => x.cp);
            picked.forEach(async (cp) => {
              if (counter < limit) {
                await storage.addCp(cp) && counter++;
              }
            });
          });
        }, tradercfg.collectOracleAdsCycle);
        const cl = {
          type: "OracleCapability",
          tag,
          active: true,
          predicate,
          cancel: async function() {
            clearInterval(timeout);
            cl.active = false;
          },
          count: () => counter,
          limit
        };
        return cl;
      },
      collectReports: async function(tag, q, opredicate, predicate, limit) {
        var counter = 0;
        const timeout = setInterval(async () => {
          storage.allOracles(q, opredicate, async (oracleid) => {
            const rps = await nodeApi.lookupReports({
              page: getRandomInt(tradercfg.maxReportsPages),
              chunkSize: tradercfg.pageSize
            }, oracleid.pubkey);
            const picked = (await Promise.all(rps.map(async (cp) => {
              return { cp, p: await predicate(cp) };
            }))).filter((x) => x.p).map((x) => x.cp);
            picked.forEach(async (rp) => {
              if (counter < limit) {
                await storage.addReport(rp) && counter++;
              }
            });
          });
        }, tradercfg.collectOracleAdsCycle);
        const cl = {
          type: "Report",
          tag,
          active: true,
          predicate,
          cancel: async function() {
            clearInterval(timeout);
            cl.active = false;
          },
          count: () => counter,
          limit
        };
        return cl;
      },
      collectOffers: async function(tag, q, cppredicate, matchingPredicate, limit) {
        var counter = 0;
        const timeout = setInterval(async () => {
          storage.allCps(q, cppredicate, async (cp) => {
            const ofs = await nodeApi.lookupOffers({
              page: getRandomInt(tradercfg.maxReportsPages),
              chunkSize: tradercfg.pageSize
            }, cp.capabilityPubKey);
            const picked = (await Promise.all(ofs.map(async (of) => {
              return { of, p: await matchingPredicate(of) };
            }))).filter((x) => x.p).map((x) => x.of);
            picked.forEach(async (of) => {
              if (counter < limit) {
                await storage.addOffer(of) && counter++;
              }
            });
          });
        }, tradercfg.collectOracleAdsCycle);
        const cl = {
          type: "OfferMsg",
          tag,
          active: true,
          predicate: matchingPredicate,
          cancel: async function() {
            clearInterval(timeout);
            cl.active = false;
          },
          count: () => counter,
          limit
        };
        return cl;
      },
      issueReport: async function(r) {
        storage.addIssuedReport(r);
      },
      issueOffer: async function(o) {
        storage.addIssuedOffer(o);
      },
      startBroadcastingIssuedOffers: function() {
        if (obroadcaster !== null) {
          return;
        }
        obroadcaster = setInterval(() => {
          storage.allIssuedOffers(async (o) => {
            o.seqNo++;
            var res = await api.publishOffer(poolcfg, o);
            if (res === "low pow difficulty") {
              storage.removeIssuedOffers([o.pow.hash]);
            }
            while (res === "low pow difficulty" && o.pow.difficulty < (tradercfg.autoUpgradePowLimit ?? 4)) {
              console.log("auto-upgrade pow");
              const upgraded = await powOverOffer(o, o.pow.difficulty + 1);
              o.pow = upgraded;
              res = await api.publishOffer(poolcfg, o);
            }
            if (p2pNode2 !== void 0) {
              p2pNode2.broadcastMessage("offer", JSON.stringify(structuredClone(o)));
            }
            storage.addIssuedOffer(o);
          });
        }, tradercfg.broadcastOfferCycle);
      },
      stopBroadcastingIssuedOffers: function() {
        if (obroadcaster !== null) {
          clearInterval(obroadcaster);
          obroadcaster = null;
          return;
        }
      },
      startBroadcastingIssuedReports: function() {
        if (rbroadcaster !== null) {
          return;
        }
        rbroadcaster = setInterval(() => {
          storage.allIssuedReports(async (r) => {
            r.seqNo++;
            var res = await api.reportMalleability(poolcfg, r);
            if (res === "low pow difficulty") {
              storage.removeIssuedReports([r.pow.hash]);
            }
            while (res === "low pow difficulty" && r.pow.difficulty < (tradercfg.autoUpgradePowLimit ?? 4)) {
              const upgraded = await powOverReport(r, r.pow.difficulty + 1);
              r.pow = upgraded;
              res = await api.reportMalleability(poolcfg, r);
            }
            if (p2pNode2 !== void 0) {
              p2pNode2.broadcastMessage("report", JSON.stringify(structuredClone(r)));
            }
            storage.addIssuedReport(r);
          });
        }, tradercfg.broadcastReportCycle);
      },
      stopBroadcastingIssuedReports: function() {
        if (rbroadcaster !== null) {
          clearInterval(rbroadcaster);
          rbroadcaster = null;
          return;
        }
      }
    };
    tapi.startBroadcastingIssuedOffers();
    tapi.stopBroadcastingIssuedReports();
    return tapi;
  }

  // src/p2p.ts
  var net = __toESM(require_net());
  var p2pn = __toESM(require_Peer());
  var import_node_fetch2 = __toESM(require_src());
  var serverPeerAPI = {
    createPeer: (server, port) => {
      return new p2pn.Peer(server, port);
    },
    createServer: (cfg, discovered) => {
      const server = (void 0)(function(socket) {
        console.log("Remote connection");
        discovered({ server: socket.remoteAddress, port: socket.remotePort, seqNo: 0 }, socket);
      });
      server.listen(cfg.p2pPort, cfg.hostname);
    }
  };
  var p2pNode = void 0;
  var connectionPool = void 0;
  var startP2P = (cfg, peerApi = serverPeerAPI) => {
    var peersAnnounced = 0;
    var connections = 0;
    const onmessage = (ev) => {
      try {
        node.processApiRequest(ev.command, ev.data.toString("utf8"));
      } catch (err) {
        console.error(err);
      }
    };
    const onconnect = (ev) => {
      connections++;
      const p = peers.find((x) => ev.peer === x.peer);
      console.log("I'm connected! " + p.addr.server + ":" + p.addr.port);
      if (cfg.hostname !== void 0) {
        broadcastPeer({ server: cfg.hostname, port: cfg.p2pPort, seqNo: cfg.hostSeqNo ?? 0 }, true);
      }
      peers.forEach((peer) => {
        console.log("[send][peer]" + JSON.stringify(peer.addr) + "  ==> " + JSON.stringify(p.addr));
        p.peer.send("peer", Buffer.from(JSON.stringify(peer.addr), "utf8"));
      });
      if (checkDuplicatePeer(p.addr)) {
        return;
      }
      broadcastPeer(p.addr);
    };
    const peers = [];
    const ondisconnect = (ev) => {
      connections--;
      const index = peers.findIndex((x) => ev.peer.server === x.peer.server && ev.peer.port === x.peer.port);
      if (index > -1) {
        peers.splice(index, 1);
      }
    };
    cfg.p2pseed.forEach((x) => discovered(x));
    function checkDuplicatePeer(addr) {
      const found = peers.findIndex((x) => addr.server === x.addr.server && addr.port === x.addr.port);
      if (found > -1) {
        if ((peers[found].addr.seqNo ?? 0) < (addr.seqNo ?? 0)) {
          peers[found].addr.seqNo = addr.seqNo;
          console.log("[rebroadcast peer]" + JSON.stringify(addr));
          broadcastPeer(addr, true);
        }
        console.log("[ignore duplicate peer]" + JSON.stringify(addr));
        return true;
      } else {
        return false;
      }
    }
    function broadcastPeer(peer, skipDuplicateCheck = false) {
      peersAnnounced++;
      if (peersAnnounced > (cfg.peerAnnouncementQuota ?? 10)) return;
      if (!skipDuplicateCheck && checkDuplicatePeer(peer)) {
        return;
      }
      console.log("Discovered: " + peer.server + ":" + peer.port);
      console.log(peers.map((p) => p.addr));
      peers.forEach((p) => {
        console.log("[send][peer]" + JSON.stringify(peer) + "  ==> " + JSON.stringify(p.addr));
        p.peer.send("peer", Buffer.from(JSON.stringify(peer), "utf8"));
      });
    }
    function discovered(addr, socket) {
      if (checkDuplicatePeer(addr)) {
        return;
      }
      if (connections > cfg.maxConnections) {
        return;
      }
      try {
        const p = peerApi.createPeer(addr.server, addr.port);
        p.connect(socket);
        p.on("message", onmessage);
        p.on("connect", onconnect);
        p.on("end", ondisconnect);
        if (socket === void 0) {
          peers.push({ peer: p, addr });
        }
      } catch (err) {
        console.error(err);
      }
    }
    function reduceCTTL(content) {
      const msg = JSON.parse(content);
      if (msg.cTTL > (cfg.ttlThreshold ?? 7)) {
        return [JSON.stringify(msg), false];
      }
      if (msg.cTTL <= 0) {
        return [JSON.stringify(msg), false];
      } else {
        msg.cTTL--;
        return [JSON.stringify(msg), true];
      }
    }
    async function processApiRequest(command, content) {
      console.log("[receive][cmd: " + command + "] " + content);
      if (content.length > cfg.maxMsgLength) {
        throw "Content too large";
      }
      switch (command) {
        case "peer": {
          discovered(JSON.parse(content));
          break;
        }
        case "oracle": {
          const result = await api.announceOracle(cfg, JSON.parse(content));
          if (result == "success") {
            broadcastMessage(command, content);
          } else if (result == "duplicate") {
            const [adjusted, toBroadcast] = reduceCTTL(content);
            if (toBroadcast) {
              broadcastMessage(command, adjusted);
            }
          }
          break;
        }
        case "capability": {
          const result = await api.announceCapability(cfg, JSON.parse(content));
          if (result == "success") {
            broadcastMessage(command, content);
          } else if (result == "duplicate") {
            const [adjusted, toBroadcast] = reduceCTTL(content);
            if (toBroadcast) {
              broadcastMessage(command, adjusted);
            }
          }
          break;
        }
        case "report": {
          const result = await api.reportMalleability(cfg, JSON.parse(content));
          if (result == "success") {
            broadcastMessage(command, content);
          } else if (result == "duplicate") {
            const [adjusted, toBroadcast] = reduceCTTL(content);
            if (toBroadcast) {
              broadcastMessage(command, adjusted);
            }
          }
          break;
        }
        case "dispute": {
          const result = await api.disputeMissingfactClaim(JSON.parse(content));
          if (result == "success") {
            broadcastMessage(command, content);
          } else if (result == "duplicate" || result == "report not found") {
            const [adjusted, toBroadcast] = reduceCTTL(content);
            if (toBroadcast) {
              broadcastMessage(command, adjusted);
            }
          }
          break;
        }
        case "offer": {
          const result = await api.publishOffer(cfg, JSON.parse(content));
          if (result == "success") {
            broadcastMessage(command, content);
          } else if (result == "duplicate") {
            const [adjusted, toBroadcast] = reduceCTTL(content);
            if (toBroadcast) {
              broadcastMessage(command, adjusted);
            }
          }
          break;
        }
      }
    }
    function broadcastMessage(command, content) {
      peers.forEach((p) => {
        console.log("[send][cmd: " + command + "] " + content + " ===> " + JSON.stringify(p.addr));
        p.peer.send(command, Buffer.from(content, "utf8"));
      });
    }
    const node = {
      peers,
      discovered,
      broadcastPeer,
      processApiRequest,
      broadcastMessage
    };
    peerApi.createServer(cfg, discovered);
    p2pNode = node;
    connectionPool = {
      list: function(cfg2) {
        return peers.map((x) => x.addr);
      },
      getapi: function(peer) {
        const prefix = `http://${peer.server}:${peer.httpPort ?? 8080}/`;
        const suffix = (paging) => {
          return `pageNo=${paging.page}&pageSize=${paging.chunkSize}`;
        };
        return {
          announceOracle: function(cfg2, id) {
            throw new Error("Function not implemented.");
          },
          announceCapability: function(cfg2, cp) {
            throw new Error("Function not implemented.");
          },
          reportMalleability: function(cfg2, report) {
            throw new Error("Function not implemented.");
          },
          disputeMissingfactClaim: function(dispute) {
            throw new Error("Function not implemented.");
          },
          publishOffer: function(cfg2, offer) {
            throw new Error("Function not implemented.");
          },
          lookupOracles: async function(paging) {
            return await (await (0, import_node_fetch2.default)(prefix + "oracles?" + suffix(paging))).json();
          },
          lookupCapabilities: async function(paging, oraclePub) {
            return await (await (0, import_node_fetch2.default)(prefix + `capabilities?pubkey=${encodeURIComponent(oraclePub)}&` + suffix(paging))).json();
          },
          lookupReports: async function(paging, oraclePub) {
            return await (await (0, import_node_fetch2.default)(prefix + `reports?pubkey=${encodeURIComponent(oraclePub)}&` + suffix(paging))).json();
          },
          lookupOffers: async function(paging, capabilityPubKey) {
            return await (await (0, import_node_fetch2.default)(prefix + `offers?pubkey=${encodeURIComponent(capabilityPubKey)}&` + suffix(paging))).json();
          }
        };
      },
      drop: function(cfg2, peer) {
        const neighbor = peers.find((x) => x.addr === peer);
        if (neighbor) {
          neighbor.peer.disconnect();
        }
      }
    };
    setInterval(() => {
      peersAnnounced = 0;
    }, 1e3);
    if (cfg.hostname !== void 0) {
      var seqNo = 0;
      setInterval(() => {
        seqNo++;
        broadcastPeer({ server: cfg.hostname, port: cfg.p2pPort, seqNo: (cfg.hostSeqNo ?? 0) + seqNo, httpPort: cfg.httpPort }, true);
      }, cfg.p2pKeepAlive ?? 1e5);
    }
  };

  // src/client-api/contracts/btc/schnorr.ts
  var crypto2 = __toESM(require_crypto());
  var adaptor = require_adaptor();
  var BigInteger = require_lib();
  var { math, convert } = require_src2();
  var ecurve = require_lib2();
  var curve = ecurve.getCurveByName("secp256k1");
  var concat = Buffer.concat;
  var G = curve.G;
  var n = curve.n;
  var schnorrApi = () => {
    return {
      getPub: (privHex) => {
        return G.multiply(BigInteger.fromHex(privHex)).affineX.toString(16);
      },
      adaptorPublic: (oraclePbHex, msg, rHex) => {
        const msgHex = (void 0)("SHA256").update(msg).digest("hex");
        const pubInt = convert.bufferToInt(adaptor.createAdaptorPoint([Buffer.from(oraclePbHex, "hex")], [Buffer.from(msgHex, "hex")], [Buffer.from(rHex, "hex")]));
        return pubInt.toString(16);
      },
      hashString: (str) => {
        return convert.bufferToInt(math.taggedHash("BIP0340/nonce", str)).mod(n).toString(16);
      },
      genNonce: (oraclePrivHex, questionHex, auxHex) => {
        const aux = Buffer.from(auxHex, "hex");
        const privKey = BigInteger.fromHex(oraclePrivHex);
        const P = G.multiply(privKey);
        const Px = convert.intToBuffer(P.affineX);
        const m = Buffer.from(questionHex, "hex");
        const d = math.getEvenKey(P, privKey);
        const t = convert.intToBuffer(d.xor(convert.bufferToInt(math.taggedHash("BIP0340/aux", aux))));
        const rand = math.taggedHash("BIP0340/nonce", concat([t, Px, m]));
        const kPrime = convert.bufferToInt(rand).mod(n);
        return kPrime.toString(16);
      },
      signatureSValue: (privHex, nonce, msg) => {
        const msgHex = (void 0)("SHA256").update(msg).digest("hex");
        const privKey = BigInteger.fromHex(privHex);
        const kPrime = BigInteger.fromHex(nonce);
        const m = Buffer.from(msgHex, "hex");
        const signature = adaptor.createAdaptorSecret([privKey], [m], [kPrime]);
        return signature.toString("hex");
      }
    };
  };

  // src/client-api/contracts/btc/tx.ts
  var bitcoin = __toESM(require_src4());
  var ecc = __toESM(require_lib3());
  bitcoin.initEccLib(ecc);
  var net2 = bitcoin.networks.testnet;
  var p2pktr = (pub) => bitcoin.payments.p2tr({
    pubkey: Buffer.from(pub, "hex"),
    network: net2
  });
  var schnorr = require_src2();
  var muSig = schnorr.muSig;
  var convert2 = schnorr.convert;
  function schnorrSignerSingle(pub) {
    return {
      publicKey: Buffer.from(pub, "hex"),
      network: net2,
      async sign(hash2, lowR) {
        return null;
      },
      async signSchnorr(hash2) {
        const response = await fetch(global.cfg.trader.btcSignerEndpoint, {
          method: "post",
          body: JSON.stringify({
            pubkeys: [pub],
            msg: hash2.toString("hex")
          }),
          headers: { "Content-Type": "application/json" }
        });
        return Buffer.from(await response.text(), "hex");
      },
      getPublicKey() {
        return Buffer.from(pub, "hex");
      }
    };
  }
  function schnorrSignerMulti(pub1, pub2, secrets = []) {
    const pkCombined = muSig.pubKeyCombine([Buffer.from(pub1, "hex"), Buffer.from(pub2, "hex")]);
    let pubKeyCombined = convert2.intToBuffer(pkCombined.affineX);
    return {
      publicKey: pubKeyCombined,
      network: net2,
      async sign(hash2, lowR) {
        return null;
      },
      async signSchnorr(hash2) {
        const response = await fetch(global.cfg.trader.btcSignerEndpoint, {
          method: "post",
          body: JSON.stringify({
            pubkeys: [pub1, pub2],
            s: secrets,
            msg: hash2.toString("hex")
          }),
          headers: { "Content-Type": "application/json" }
        });
        const res = await response.text();
        return Buffer.from(res, "hex");
      },
      getPublicKey() {
        return pubKeyCombined;
      }
    };
  }
  function schnorrSignerInteractive(pub1, pub2, session) {
    const pkCombined = muSig.pubKeyCombine([Buffer.from(pub1, "hex"), Buffer.from(pub2, "hex")]);
    let pubKeyCombined = convert2.intToBuffer(pkCombined.affineX);
    return {
      publicKey: pubKeyCombined,
      network: net2,
      async sign(hash2, lowR) {
        return null;
      },
      async signSchnorr(hash2) {
        if (!session.sessionId1) {
          throw await (await fetch(global.cfg.trader.btcInteractiveSignerEndpoint + "/muSigNonce1", {
            method: "post",
            body: JSON.stringify({
              pk1: pub1,
              pk2: pub2,
              msg: hash2.toString("hex")
            }),
            headers: { "Content-Type": "application/json" }
          })).json();
        }
        if (!session.commitment2) {
          throw await (await fetch(global.cfg.trader.btcInteractiveSignerEndpoint + "/muSigCommitment2", {
            method: "post",
            body: JSON.stringify({
              pk1: pub1,
              pk2: pub2,
              msg: hash2.toString("hex")
            }),
            headers: { "Content-Type": "application/json" }
          })).json();
        }
        if (!session.nonce2) {
          throw await (await fetch(global.cfg.trader.btcInteractiveSignerEndpoint + "/sign1", {
            method: "post",
            body: JSON.stringify({
              pk1: pub1,
              pk2: pub2,
              commitment1: session.commitment1,
              nonce1: session.nonce1,
              sessionId2: session.sessionId2,
              msg: hash2.toString("hex")
            }),
            headers: { "Content-Type": "application/json" }
          })).json();
        }
        const response = await fetch(global.cfg.trader.btcInteractiveSignerEndpoint + "/sign2", {
          method: "post",
          body: JSON.stringify({
            pk1: pub1,
            pk2: pub2,
            partSig2: session.partSig2,
            combinedNonceParity: session.combinedNonceParity,
            nonce2: session.nonce2,
            commitment2: session.commitment2,
            sessionId1: session.sessionId1,
            msg: hash2.toString("hex")
          }),
          headers: { "Content-Type": "application/json" }
        });
        const res = await response.text();
        return Buffer.from(res, "hex");
      },
      getPublicKey() {
        return pubKeyCombined;
      }
    };
  }
  var txApi = () => {
    return {
      genOpeningTx: async (aliceIn, bobIn, alicePub, bobPub, aliceAmounts, bobAmounts, changeAlice, changeBob, txfee) => {
        const psbt = new bitcoin.Psbt({ network: net2 });
        let aliceP2TR = p2pktr(alicePub);
        let bobP2TR = p2pktr(bobPub);
        console.log("alice_addr = " + aliceP2TR.address);
        console.log("bob_addr = " + bobP2TR.address);
        const pkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(bobPub, "hex")]);
        let pubKeyCombined = convert2.intToBuffer(pkCombined.affineX);
        const aliceAmount = aliceAmounts.reduce((a, b) => a + b) - changeAlice;
        const bobAmount = bobAmounts.reduce((a, b) => a + b) - changeBob;
        aliceIn.forEach((utxo, i) => {
          psbt.addInput({
            hash: utxo.txid,
            index: utxo.vout,
            witnessUtxo: { value: aliceAmounts[i], script: aliceP2TR.output },
            tapInternalKey: Buffer.from(alicePub, "hex")
          });
        });
        bobIn.forEach((utxo, i) => {
          psbt.addInput({
            hash: utxo.txid,
            index: utxo.vout,
            witnessUtxo: { value: bobAmounts[i], script: bobP2TR.output },
            tapInternalKey: Buffer.from(bobPub, "hex")
          });
        });
        psbt.addOutput({
          address: p2pktr(pubKeyCombined).address,
          value: aliceAmount + bobAmount - txfee
        });
        if (changeAlice !== 0) {
          psbt.addOutput({
            address: aliceP2TR.address,
            value: changeAlice
          });
        }
        if (changeBob !== 0) {
          psbt.addOutput({
            address: bobP2TR.address,
            value: changeBob
          });
        }
        for (let i = 0; i < aliceIn.length; i++) {
          await psbt.signInputAsync(i, schnorrSignerSingle(alicePub));
        }
        for (let i = 0; i < bobIn.length; i++) {
          await psbt.signInputAsync(aliceIn.length + i, schnorrSignerSingle(bobPub));
        }
        psbt.finalizeAllInputs();
        return {
          txid: psbt.extractTransaction().getId(),
          hex: psbt.extractTransaction().toHex()
        };
      },
      genClosingTx: async (multiIn, alicePub, bobPub, aliceAmount, bobAmount, txfee) => {
        const psbt = new bitcoin.Psbt({ network: net2 });
        const pkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(bobPub, "hex")]);
        let pubKeyCombined = convert2.intToBuffer(pkCombined.affineX);
        let multiP2TR = p2pktr(pubKeyCombined);
        psbt.addInput({
          hash: multiIn.txid,
          index: multiIn.vout,
          witnessUtxo: { value: aliceAmount + bobAmount, script: multiP2TR.output },
          tapInternalKey: Buffer.from(alicePub, "hex")
        });
        psbt.addOutput({
          address: p2pktr(alicePub).address,
          value: aliceAmount - txfee / 2
        });
        psbt.addOutput({
          address: p2pktr(bobPub).address,
          value: bobAmount - txfee / 2
        });
        await psbt.signInputAsync(0, schnorrSignerMulti(alicePub, bobPub));
        psbt.finalizeAllInputs();
        return {
          txid: psbt.extractTransaction().getId(),
          hex: psbt.extractTransaction().toHex()
        };
      },
      genAliceCet: async (multiIn, alicePub, bobPub, adaptorPub, aliceAmount, bobAmount, txfee, session = null) => {
        const psbt = new bitcoin.Psbt({ network: net2 });
        const pkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(bobPub, "hex")]);
        let pubKeyCombined = convert2.intToBuffer(pkCombined.affineX);
        let multiP2TR = p2pktr(pubKeyCombined);
        const adaptorPkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(adaptorPub, "hex")]);
        let adaptorPubKeyCombined = convert2.intToBuffer(adaptorPkCombined.affineX);
        psbt.addInput({
          hash: multiIn.txid,
          index: multiIn.vout,
          witnessUtxo: { value: aliceAmount + bobAmount, script: multiP2TR.output },
          tapInternalKey: Buffer.from(alicePub, "hex")
        });
        psbt.addOutput({
          address: p2pktr(adaptorPubKeyCombined).address,
          value: aliceAmount + bobAmount - txfee
        });
        if (session === null || session === void 0) {
          await psbt.signInputAsync(0, schnorrSignerMulti(alicePub, bobPub));
        } else {
          await psbt.signInputAsync(0, schnorrSignerInteractive(alicePub, bobPub, session));
        }
        psbt.finalizeAllInputs();
        return {
          txid: psbt.extractTransaction().getId(),
          hex: psbt.extractTransaction().toHex()
        };
      },
      genAliceCetRedemption: async (aliceOracleIn, adaptorPub, alicePub, oracleS, amount, txfee) => {
        const psbt = new bitcoin.Psbt({ network: net2 });
        const adaptorPkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(adaptorPub, "hex")]);
        let adaptorPubKeyCombined = convert2.intToBuffer(adaptorPkCombined.affineX);
        let aliceOracleP2TR = p2pktr(adaptorPubKeyCombined);
        psbt.addInput({
          hash: aliceOracleIn.txid,
          index: aliceOracleIn.vout,
          witnessUtxo: { value: amount, script: aliceOracleP2TR.output },
          tapInternalKey: Buffer.from(alicePub, "hex")
        });
        psbt.addOutput({
          address: p2pktr(alicePub).address,
          // TODO: generate alice address from oracleMsgHex and oracleR
          value: amount - txfee
        });
        await psbt.signInputAsync(0, schnorrSignerMulti(alicePub, adaptorPub, ["", oracleS]));
        psbt.finalizeAllInputs();
        return {
          txid: psbt.extractTransaction().getId(),
          hex: psbt.extractTransaction().toHex()
        };
      }
    };
  };

  // src/client-api/contracts/generate-btc-tx.ts
  var schnorr2 = schnorrApi();
  var tx = txApi(schnorr2);
  var generateOpeningTransaction = async (params) => {
    return (await tx.genOpeningTx(
      params.aliceIn,
      params.bobIn,
      params.alicePub,
      params.bobPub,
      params.aliceAmountIn,
      params.bobAmountIn,
      params.changeAlice,
      params.changeBob,
      params.txfee
    )).hex;
  };
  var generateClosingTransaction = async (params) => {
    const multiIn = {
      txid: params.lockedTxId,
      vout: 0
    };
    return (await tx.genClosingTx(
      multiIn,
      params.alicePub,
      params.bobPub,
      params.aliceAmount,
      params.bobAmount,
      params.txfee
    )).hex;
  };
  var generateCetTransaction = async (params) => {
    const multiIn = {
      txid: params.lockedTxId,
      vout: 0
    };
    const twistedPk = schnorr2.adaptorPublic(params.oraclePub, params.answer, params.rValue).padStart(64, "0");
    return (await tx.genAliceCet(
      multiIn,
      params.alicePub,
      params.bobPub,
      twistedPk,
      params.aliceAmount,
      params.bobAmount,
      params.txfee,
      params.session
    )).hex;
  };
  var generateCetRedemptionTransaction = async (params) => {
    const twistedPk = schnorr2.adaptorPublic(params.oraclePub, params.answer, params.rValue).padStart(64, "0");
    const cetOut = {
      txid: params.cetTxId,
      vout: 0
    };
    return (await tx.genAliceCetRedemption(
      cetOut,
      twistedPk,
      params.alicePub,
      params.oracleSignature,
      params.amount,
      params.txfee
    )).hex;
  };

  // node_modules/@nyariv/sandboxjs/dist/Sandbox.min.js
  var SandboxGlobal = function(e) {
    if (e === globalThis) return globalThis;
    for (const t in e) this[t] = e[t];
  };
  var ExecContext = class {
    constructor(e, t, n2, r, s, i, o, a, c, p, l, d) {
      this.ctx = e, this.constants = t, this.tree = n2, this.getSubscriptions = r, this.setSubscriptions = s, this.changeSubscriptions = i, this.setSubscriptionsGlobal = o, this.changeSubscriptionsGlobal = a, this.evals = c, this.registerSandboxFunction = p, this.allowJit = l, this.evalContext = d;
    }
  };
  function createContext(e, t) {
    const n2 = new SandboxGlobal(t.globals), r = { sandbox: e, globalsWhitelist: new Set(Object.values(t.globals)), prototypeWhitelist: new Map([...t.prototypeWhitelist].map((e2) => [e2[0].prototype, e2[1]])), options: t, globalScope: new Scope(null, t.globals, n2), sandboxGlobal: n2 };
    return r.prototypeWhitelist.set(Object.getPrototypeOf([][Symbol.iterator]()), /* @__PURE__ */ new Set()), r;
  }
  function createExecContext(sandbox, executionTree, evalContext) {
    const evals = /* @__PURE__ */ new Map(), execContext = new ExecContext(sandbox.context, executionTree.constants, executionTree.tree, /* @__PURE__ */ new Set(), /* @__PURE__ */ new WeakMap(), /* @__PURE__ */ new WeakMap(), sandbox.setSubscriptions, sandbox.changeSubscriptions, evals, (e) => sandbox.sandboxFunctions.set(e, execContext), !!evalContext, evalContext);
    if (evalContext) {
      const func = evalContext.sandboxFunction(execContext);
      evals.set(Function, func), evals.set(eval, evalContext.sandboxedEval(func)), evals.set(setTimeout, evalContext.sandboxedSetTimeout(func)), evals.set(setInterval, evalContext.sandboxedSetInterval(func));
    }
    return execContext;
  }
  var CodeString = class _CodeString {
    constructor(e) {
      this.ref = { str: "" }, e instanceof _CodeString ? (this.ref = e.ref, this.start = e.start, this.end = e.end) : (this.ref.str = e, this.start = 0, this.end = e.length);
    }
    substring(e, t) {
      if (!this.length) return this;
      (e = this.start + e) < 0 && (e = 0), e > this.end && (e = this.end), (t = void 0 === t ? this.end : this.start + t) < 0 && (t = 0), t > this.end && (t = this.end);
      const n2 = new _CodeString(this);
      return n2.start = e, n2.end = t, n2;
    }
    get length() {
      const e = this.end - this.start;
      return e < 0 ? 0 : e;
    }
    char(e) {
      if (this.start !== this.end) return this.ref.str[this.start + e];
    }
    toString() {
      return this.ref.str.substring(this.start, this.end);
    }
    trimStart() {
      const e = /^\s+/.exec(this.toString()), t = new _CodeString(this);
      return e && (t.start += e[0].length), t;
    }
    slice(e, t) {
      return e < 0 && (e = this.end - this.start + e), e < 0 && (e = 0), void 0 === t && (t = this.end - this.start), t < 0 && (t = this.end - this.start + t), t < 0 && (t = 0), this.substring(e, t);
    }
    trim() {
      const e = this.trimStart(), t = /\s+$/.exec(e.toString());
      return t && (e.end -= t[0].length), e;
    }
    valueOf() {
      return this.toString();
    }
  };
  function keysOnly(e) {
    const t = Object.assign({}, e);
    for (const e2 in t) t[e2] = true;
    return t;
  }
  var reservedWords = /* @__PURE__ */ new Set(["instanceof", "typeof", "return", "throw", "try", "catch", "if", "finally", "else", "in", "of", "var", "let", "const", "for", "delete", "false", "true", "while", "do", "break", "continue", "new", "function", "async", "await", "switch", "case"]);
  var Scope = class {
    constructor(e, t = {}, n2) {
      this.const = {}, this.let = {}, this.var = {};
      const r = void 0 !== n2 || null === e;
      this.parent = e, this.allVars = t, this.let = r ? this.let : keysOnly(t), this.var = r ? keysOnly(t) : this.var, this.globals = null === e ? keysOnly(t) : {}, this.functionThis = n2;
    }
    get(e, t = false) {
      const n2 = this.functionThis;
      if ("this" === e && void 0 !== n2) return new Prop({ this: n2 }, e, true, false, true);
      if (reservedWords.has(e)) throw new SyntaxError("Unexepected token '" + e + "'");
      if (null === this.parent || !t || void 0 !== n2) {
        if (this.globals.hasOwnProperty(e)) return new Prop(n2, e, false, true, true);
        if (e in this.allVars && (!(e in {}) || this.allVars.hasOwnProperty(e))) return new Prop(this.allVars, e, this.const.hasOwnProperty(e), this.globals.hasOwnProperty(e), true);
        if (null === this.parent) return new Prop(void 0, e);
      }
      return this.parent.get(e, t);
    }
    set(e, t) {
      if ("this" === e) throw new SyntaxError('"this" cannot be assigned');
      if (reservedWords.has(e)) throw new SyntaxError("Unexepected token '" + e + "'");
      const n2 = this.get(e);
      if (void 0 === n2.context) throw new ReferenceError(`Variable '${e}' was not declared.`);
      if (n2.isConst) throw new TypeError(`Cannot assign to const variable '${e}'`);
      if (n2.isGlobal) throw new SandboxError(`Cannot override global variable '${e}'`);
      if (!(n2.context instanceof Object)) throw new SandboxError("Scope is not an object");
      return n2.context[n2.prop] = t, n2;
    }
    declare(e, t, n2 = void 0, r = false) {
      if ("this" === e) throw new SyntaxError('"this" cannot be declared');
      if (reservedWords.has(e)) throw new SyntaxError("Unexepected token '" + e + "'");
      if ("var" === t && void 0 === this.functionThis && null !== this.parent) return this.parent.declare(e, t, n2, r);
      if ((!this[t].hasOwnProperty(e) || "const" === t || this.globals.hasOwnProperty(e)) && e in this.allVars) throw new SandboxError(`Identifier '${e}' has already been declared`);
      return r && (this.globals[e] = true), this[t][e] = true, this.allVars[e] = n2, new Prop(this.allVars, e, this.const.hasOwnProperty(e), r);
    }
  };
  var LocalScope = class {
  };
  var SandboxError = class extends Error {
  };
  function isLisp(e) {
    return Array.isArray(e) && "number" == typeof e[0] && 0 !== e[0] && 88 !== e[0];
  }
  var Prop = class {
    constructor(e, t, n2 = false, r = false, s = false) {
      this.context = e, this.prop = t, this.isConst = n2, this.isGlobal = r, this.isVariable = s;
    }
    get(e) {
      const t = this.context;
      if (void 0 === t) throw new ReferenceError(`${this.prop} is not defined`);
      if (null === t) throw new TypeError(`Cannot read properties of null, (reading '${this.prop}')`);
      return e.getSubscriptions.forEach((e2) => e2(t, this.prop)), t[this.prop];
    }
  };
  var ExecReturn = class {
    constructor(e, t, n2, r = false, s = false) {
      this.auditReport = e, this.result = t, this.returned = n2, this.breakLoop = r, this.continueLoop = s;
    }
  };
  var optional = {};
  function generateArgs(e, t) {
    const n2 = {};
    return e.forEach((e2, r) => {
      e2.startsWith("...") ? n2[e2.substring(3)] = t.slice(r) : n2[e2] = t[r];
    }), n2;
  }
  var sandboxedFunctions = /* @__PURE__ */ new WeakSet();
  function createFunction(e, t, n2, r, s, i) {
    if (r.ctx.options.forbidFunctionCreation) throw new SandboxError("Function creation is forbidden");
    let o;
    return o = void 0 === i ? (...i2) => {
      const o2 = generateArgs(e, i2);
      return executeTree(n2, r, t, void 0 === s ? [] : [new Scope(s, o2)]).result;
    } : function(...i2) {
      const o2 = generateArgs(e, i2);
      return executeTree(n2, r, t, void 0 === s ? [] : [new Scope(s, o2, this)]).result;
    }, r.registerSandboxFunction(o), sandboxedFunctions.add(o), o;
  }
  function createFunctionAsync(e, t, n2, r, s, i) {
    if (r.ctx.options.forbidFunctionCreation) throw new SandboxError("Function creation is forbidden");
    if (!r.ctx.prototypeWhitelist?.has(Promise.prototype)) throw new SandboxError("Async/await not permitted");
    let o;
    return o = void 0 === i ? async (...i2) => {
      const o2 = generateArgs(e, i2);
      return (await executeTreeAsync(n2, r, t, void 0 === s ? [] : [new Scope(s, o2)])).result;
    } : async function(...i2) {
      const o2 = generateArgs(e, i2);
      return (await executeTreeAsync(n2, r, t, void 0 === s ? [] : [new Scope(s, o2, this)])).result;
    }, r.registerSandboxFunction(o), sandboxedFunctions.add(o), o;
  }
  function assignCheck(e, t, n2 = "assign") {
    if (void 0 === e.context) throw new ReferenceError(`Cannot ${n2} value to undefined.`);
    if ("object" != typeof e.context && "function" != typeof e.context) throw new SyntaxError(`Cannot ${n2} value to a primitive.`);
    if (e.isConst) throw new TypeError(`Cannot set value to const variable '${e.prop}'`);
    if (e.isGlobal) throw new SandboxError(`Cannot ${n2} property '${e.prop}' of a global object`);
    if (null === e.context) throw new TypeError("Cannot set properties of null");
    if ("function" == typeof e.context[e.prop] && !e.context.hasOwnProperty(e.prop)) throw new SandboxError(`Override prototype property '${e.prop}' not allowed`);
    "delete" === n2 ? e.context.hasOwnProperty(e.prop) && (t.changeSubscriptions.get(e.context)?.forEach((t2) => t2({ type: "delete", prop: e.prop })), t.changeSubscriptionsGlobal.get(e.context)?.forEach((t2) => t2({ type: "delete", prop: e.prop }))) : e.context.hasOwnProperty(e.prop) ? (t.setSubscriptions.get(e.context)?.get(e.prop)?.forEach((e2) => e2({ type: "replace" })), t.setSubscriptionsGlobal.get(e.context)?.get(e.prop)?.forEach((e2) => e2({ type: "replace" }))) : (t.changeSubscriptions.get(e.context)?.forEach((t2) => t2({ type: "create", prop: e.prop })), t.changeSubscriptionsGlobal.get(e.context)?.forEach((t2) => t2({ type: "create", prop: e.prop })));
  }
  var arrayChange = /* @__PURE__ */ new Set([[].push, [].pop, [].shift, [].unshift, [].splice, [].reverse, [].sort, [].copyWithin]);
  var KeyVal = class {
    constructor(e, t) {
      this.key = e, this.val = t;
    }
  };
  var SpreadObject = class {
    constructor(e) {
      this.item = e;
    }
  };
  var SpreadArray = class {
    constructor(e) {
      this.item = e;
    }
  };
  var If = class {
    constructor(e, t) {
      this.t = e, this.f = t;
    }
  };
  var literalRegex = /(\$\$)*(\$)?\${(\d+)}/g;
  var ops = /* @__PURE__ */ new Map();
  function addOps(e, t) {
    ops.set(e, t);
  }
  function valueOrProp(e, t) {
    return e instanceof Prop ? e.get(t) : e !== optional ? e : void 0;
  }
  function execMany(e, t, n2, r, s, i, o) {
    t === execSync ? _execManySync(e, n2, r, s, i, o) : _execManyAsync(e, n2, r, s, i, o).catch(r);
  }
  function _execManySync(e, t, n2, r, s, i) {
    const o = [];
    for (let a = 0; a < t.length; a++) {
      let c;
      try {
        c = syncDone((n3) => execSync(e, t[a], r, s, n3, i)).result;
      } catch (e2) {
        return void n2(e2);
      }
      if (c instanceof ExecReturn && (c.returned || c.breakLoop || c.continueLoop)) return void n2(void 0, c);
      if (isLisp(t[a]) && 8 === t[a][0]) return void n2(void 0, new ExecReturn(s.ctx.auditReport, c, true));
      o.push(c);
    }
    n2(void 0, o);
  }
  async function _execManyAsync(e, t, n2, r, s, i) {
    const o = [];
    for (let a = 0; a < t.length; a++) {
      let c;
      try {
        let n3;
        c = true === (n3 = asyncDone((n4) => execAsync(e, t[a], r, s, n4, i))).isInstant ? n3.instant : (await n3.p).result;
      } catch (e2) {
        return void n2(e2);
      }
      if (c instanceof ExecReturn && (c.returned || c.breakLoop || c.continueLoop)) return void n2(void 0, c);
      if (isLisp(t[a]) && 8 === t[a][0]) return void n2(void 0, new ExecReturn(s.ctx.auditReport, c, true));
      o.push(c);
    }
    n2(void 0, o);
  }
  function asyncDone(e) {
    let t, n2 = false;
    const r = new Promise((r2, s) => {
      e((e2, i) => {
        e2 ? s(e2) : (n2 = true, t = i, r2({ result: i }));
      });
    });
    return { isInstant: n2, instant: t, p: r };
  }
  function syncDone(e) {
    let t, n2;
    if (e((e2, r) => {
      n2 = e2, t = r;
    }), n2) throw n2;
    return { result: t };
  }
  async function execAsync(e, t, n2, r, s, i) {
    let o = s;
    const a = new Promise((e2) => {
      o = (t2, n3) => {
        s(t2, n3), e2();
      };
    });
    if (!_execNoneRecurse(e, t, n2, r, o, true, i) && isLisp(t)) {
      let s2, a2 = t[0];
      try {
        let o2;
        s2 = true === (o2 = asyncDone((s3) => execAsync(e, t[1], n2, r, s3, i))).isInstant ? o2.instant : (await o2.p).result;
      } catch (e2) {
        return void o(e2);
      }
      let c, p = s2;
      try {
        p = s2 instanceof Prop ? s2.get(r) : s2;
      } catch (e2) {
        return void o(e2);
      }
      if (20 === a2 || 21 === a2) {
        if (null == p) return void o(void 0, optional);
        a2 = 20 === a2 ? 1 : 5;
      }
      if (p === optional) {
        if (1 === a2 || 5 === a2) return void o(void 0, p);
        p = void 0;
      }
      try {
        let s3;
        c = true === (s3 = asyncDone((s4) => execAsync(e, t[2], n2, r, s4, i))).isInstant ? s3.instant : (await s3.p).result;
      } catch (e2) {
        return void o(e2);
      }
      let l = c;
      try {
        l = c instanceof Prop ? c.get(r) : c;
      } catch (e2) {
        return void o(e2);
      }
      if (l === optional && (l = void 0), ops.has(a2)) try {
        ops.get(a2)?.(execAsync, o, e, p, l, s2, r, n2, c, i);
      } catch (e2) {
        o(e2);
      }
      else o(new SyntaxError("Unknown operator: " + a2));
    }
    await a;
  }
  function execSync(e, t, n2, r, s, i) {
    if (!_execNoneRecurse(e, t, n2, r, s, false, i) && isLisp(t)) {
      let o, a = t[0];
      try {
        o = syncDone((s2) => execSync(e, t[1], n2, r, s2, i)).result;
      } catch (e2) {
        return void s(e2);
      }
      let c, p = o;
      try {
        p = o instanceof Prop ? o.get(r) : o;
      } catch (e2) {
        return void s(e2);
      }
      if (20 === a || 21 === a) {
        if (null == p) return void s(void 0, optional);
        a = 20 === a ? 1 : 5;
      }
      if (p === optional) {
        if (1 === a || 5 === a) return void s(void 0, p);
        p = void 0;
      }
      try {
        c = syncDone((s2) => execSync(e, t[2], n2, r, s2, i)).result;
      } catch (e2) {
        return void s(e2);
      }
      let l = c;
      try {
        l = c instanceof Prop ? c.get(r) : c;
      } catch (e2) {
        return void s(e2);
      }
      if (l === optional && (l = void 0), ops.has(a)) try {
        ops.get(a)?.(execSync, s, e, p, l, o, r, n2, c, i);
      } catch (e2) {
        s(e2);
      }
      else s(new SyntaxError("Unknown operator: " + a));
    }
  }
  addOps(1, (e, t, n2, r, s, i, o, a) => {
    if (null === r) throw new TypeError(`Cannot get property ${s} of null`);
    const c = typeof r;
    if ("undefined" === c && void 0 === i) {
      const e2 = a.get(s);
      if (e2.context === o.ctx.sandboxGlobal) {
        o.ctx.options.audit && o.ctx.auditReport?.globalsAccess.add(s);
        const e3 = o.ctx.globalsWhitelist.has(o.ctx.sandboxGlobal[s]) ? o.evals.get(o.ctx.sandboxGlobal[s]) : void 0;
        if (e3) return void t(void 0, e3);
      }
      return e2.context && e2.context[s] === globalThis ? void t(void 0, o.ctx.globalScope.get("this")) : void t(void 0, e2);
    }
    if (void 0 === r) throw new SandboxError("Cannot get property '" + s + "' of undefined");
    if ("object" !== c) "number" === c ? r = new Number(r) : "string" === c ? r = new String(r) : "boolean" === c && (r = new Boolean(r));
    else if (void 0 === r.hasOwnProperty) return void t(void 0, new Prop(void 0, s));
    const p = "function" === c, l = p || !(r.hasOwnProperty(s) || "number" == typeof s);
    if (o.ctx.options.audit && l && "string" == typeof s) {
      let e2 = Object.getPrototypeOf(r);
      do {
        e2.hasOwnProperty(s) && (o.ctx.auditReport && !o.ctx.auditReport.prototypeAccess[e2.constructor.name] && (o.ctx.auditReport.prototypeAccess[e2.constructor.name] = /* @__PURE__ */ new Set()), o.ctx.auditReport?.prototypeAccess[e2.constructor.name].add(s));
      } while (e2 = Object.getPrototypeOf(e2));
    }
    if (l) {
      if (p) {
        if (!["name", "length", "constructor"].includes(s) && (r.hasOwnProperty(s) || "__proto__" === s)) {
          const e2 = o.ctx.prototypeWhitelist.get(r.prototype), n3 = o.ctx.options.prototypeReplacements.get(r);
          if (n3) return void t(void 0, new Prop(n3(r, true), s));
          if (!e2 || e2.size && !e2.has(s)) throw new SandboxError(`Static method or property access not permitted: ${r.name}.${s}`);
        }
      } else if ("constructor" !== s) {
        let e2 = r;
        for (; e2 = Object.getPrototypeOf(e2); ) if (e2.hasOwnProperty(s)) {
          const n3 = o.ctx.prototypeWhitelist.get(e2), i2 = o.ctx.options.prototypeReplacements.get(e2.constuctor);
          if (i2) return void t(void 0, new Prop(i2(r, false), s));
          if (n3 && (!n3.size || n3.has(s))) break;
          throw new SandboxError(`Method or property access not permitted: ${e2.constructor.name}.${s}`);
        }
      }
    }
    if (o.evals.has(r[s])) return void t(void 0, o.evals.get(r[s]));
    if (r[s] === globalThis) return void t(void 0, o.ctx.globalScope.get("this"));
    const d = i.isGlobal || p && !sandboxedFunctions.has(r) || o.ctx.globalsWhitelist.has(r);
    t(void 0, new Prop(r, s, false, d));
  }), addOps(5, (e, t, n2, r, s, i, o) => {
    if (o.ctx.options.forbidFunctionCalls) throw new SandboxError("Function invocations are not allowed");
    if ("function" != typeof r) throw new TypeError(`${"symbol" == typeof i.prop ? "Symbol" : i.prop} is not a function`);
    const a = s.map((e2) => e2 instanceof SpreadArray ? [...e2.item] : [e2]).flat().map((e2) => valueOrProp(e2, o));
    if ("function" != typeof i) {
      if (i.context[i.prop] === JSON.stringify && o.getSubscriptions.size) {
        const e2 = /* @__PURE__ */ new Set(), t2 = (n3) => {
          if (n3 && "object" == typeof n3 && !e2.has(n3)) {
            e2.add(n3);
            for (const e3 of Object.keys(n3)) o.getSubscriptions.forEach((t3) => t3(n3, e3)), t2(n3[e3]);
          }
        };
        t2(a[0]);
      }
      if (i.context instanceof Array && arrayChange.has(i.context[i.prop]) && (o.changeSubscriptions.get(i.context) || o.changeSubscriptionsGlobal.get(i.context))) {
        let e2, t2 = false;
        if ("push" === i.prop) e2 = { type: "push", added: a }, t2 = !!a.length;
        else if ("pop" === i.prop) e2 = { type: "pop", removed: i.context.slice(-1) }, t2 = !!e2.removed.length;
        else if ("shift" === i.prop) e2 = { type: "shift", removed: i.context.slice(0, 1) }, t2 = !!e2.removed.length;
        else if ("unshift" === i.prop) e2 = { type: "unshift", added: a }, t2 = !!a.length;
        else if ("splice" === i.prop) e2 = { type: "splice", startIndex: a[0], deleteCount: void 0 === a[1] ? i.context.length : a[1], added: a.slice(2), removed: i.context.slice(a[0], void 0 === a[1] ? void 0 : a[0] + a[1]) }, t2 = !!e2.added.length || !!e2.removed.length;
        else if ("reverse" === i.prop || "sort" === i.prop) e2 = { type: i.prop }, t2 = !!i.context.length;
        else if ("copyWithin" === i.prop) {
          const n3 = void 0 === a[2] ? i.context.length - a[1] : Math.min(i.context.length, a[2] - a[1]);
          e2 = { type: "copyWithin", startIndex: a[0], endIndex: a[0] + n3, added: i.context.slice(a[1], a[1] + n3), removed: i.context.slice(a[0], a[0] + n3) }, t2 = !!e2.added.length || !!e2.removed.length;
        }
        t2 && (o.changeSubscriptions.get(i.context)?.forEach((t3) => t3(e2)), o.changeSubscriptionsGlobal.get(i.context)?.forEach((t3) => t3(e2)));
      }
      i.get(o), t(void 0, i.context[i.prop](...a));
    } else t(void 0, i(...a));
  }), addOps(22, (e, t, n2, r, s) => {
    let i = {};
    for (const e2 of s) e2.key instanceof SpreadObject ? i = { ...i, ...e2.key.item } : i[e2.key] = e2.val;
    t(void 0, i);
  }), addOps(6, (e, t, n2, r, s) => t(void 0, new KeyVal(r, s))), addOps(12, (e, t, n2, r, s, i, o) => {
    t(void 0, s.map((e2) => e2 instanceof SpreadArray ? [...e2.item] : [e2]).flat().map((e2) => valueOrProp(e2, o)));
  }), addOps(23, (e, t, n2, r, s) => t(void 0, s)), addOps(35, (e, t, n2, r, s) => {
    switch (s) {
      case "true":
        return t(void 0, true);
      case "false":
        return t(void 0, false);
      case "null":
        return t(void 0, null);
      case "undefined":
        return t(void 0, void 0);
      case "NaN":
        return t(void 0, NaN);
      case "Infinity":
        return t(void 0, 1 / 0);
    }
    t(new Error("Unknown symbol: " + s));
  }), addOps(7, (e, t, n2, r, s) => t(void 0, Number(s))), addOps(83, (e, t, n2, r, s) => t(void 0, BigInt(s))), addOps(2, (e, t, n2, r, s, i, o) => t(void 0, o.constants.strings[parseInt(s)])), addOps(85, (e, t, n2, r, s, i, o) => {
    const a = o.constants.regexes[parseInt(s)];
    if (!o.ctx.globalsWhitelist.has(RegExp)) throw new SandboxError("Regex not permitted");
    t(void 0, new RegExp(a.regex, a.flags));
  }), addOps(84, (e, t, n2, r, s, i, o, a) => {
    const c = o.constants.literals[parseInt(s)], [, p, l] = c, d = [];
    let u;
    const f = [];
    for (; u = literalRegex.exec(p); ) u[2] || (d.push(l[parseInt(u[3], 10)]), f.push(u[3]));
    e(n2, d, a, o, (e2, n3) => {
      const r2 = {};
      if (e2) t(e2);
      else {
        for (const e3 of Object.keys(n3)) {
          const t2 = f[e3];
          r2[t2] = n3[e3];
        }
        t(void 0, p.replace(/(\\\\)*(\\)?\${(\d+)}/g, (e3, t2, n4, s2) => {
          if (n4) return e3;
          return (t2 || "") + `${valueOrProp(r2[s2], o)}`;
        }));
      }
    });
  }), addOps(18, (e, t, n2, r, s) => {
    t(void 0, new SpreadArray(s));
  }), addOps(17, (e, t, n2, r, s) => {
    t(void 0, new SpreadObject(s));
  }), addOps(24, (e, t, n2, r, s) => t(void 0, !s)), addOps(64, (e, t, n2, r, s) => t(void 0, ~s)), addOps(25, (e, t, n2, r, s, i, o) => {
    assignCheck(i, o), t(void 0, ++i.context[i.prop]);
  }), addOps(26, (e, t, n2, r, s, i, o) => {
    assignCheck(i, o), t(void 0, i.context[i.prop]++);
  }), addOps(27, (e, t, n2, r, s, i, o) => {
    assignCheck(i, o), t(void 0, --i.context[i.prop]);
  }), addOps(28, (e, t, n2, r, s, i, o) => {
    assignCheck(i, o), t(void 0, i.context[i.prop]--);
  }), addOps(9, (e, t, n2, r, s, i, o) => {
    assignCheck(i, o), t(void 0, i.context[i.prop] = s);
  }), addOps(66, (e, t, n2, r, s, i, o) => {
    assignCheck(i, o), t(void 0, i.context[i.prop] += s);
  }), addOps(65, (e, t, n2, r, s, i, o) => {
    assignCheck(i, o), t(void 0, i.context[i.prop] -= s);
  }), addOps(67, (e, t, n2, r, s, i, o) => {
    assignCheck(i, o), t(void 0, i.context[i.prop] /= s);
  }), addOps(69, (e, t, n2, r, s, i, o) => {
    assignCheck(i, o), t(void 0, i.context[i.prop] *= s);
  }), addOps(68, (e, t, n2, r, s, i, o) => {
    assignCheck(i, o), t(void 0, i.context[i.prop] **= s);
  }), addOps(70, (e, t, n2, r, s, i, o) => {
    assignCheck(i, o), t(void 0, i.context[i.prop] %= s);
  }), addOps(71, (e, t, n2, r, s, i, o) => {
    assignCheck(i, o), t(void 0, i.context[i.prop] ^= s);
  }), addOps(72, (e, t, n2, r, s, i, o) => {
    assignCheck(i, o), t(void 0, i.context[i.prop] &= s);
  }), addOps(73, (e, t, n2, r, s, i, o) => {
    assignCheck(i, o), t(void 0, i.context[i.prop] |= s);
  }), addOps(76, (e, t, n2, r, s, i, o) => {
    assignCheck(i, o), t(void 0, i.context[i.prop] <<= s);
  }), addOps(75, (e, t, n2, r, s, i, o) => {
    assignCheck(i, o), t(void 0, i.context[i.prop] >>= s);
  }), addOps(74, (e, t, n2, r, s, i, o) => {
    assignCheck(i, o), t(void 0, i.context[i.prop] >>= s);
  }), addOps(57, (e, t, n2, r, s) => t(void 0, r > s)), addOps(56, (e, t, n2, r, s) => t(void 0, r < s)), addOps(55, (e, t, n2, r, s) => t(void 0, r >= s)), addOps(54, (e, t, n2, r, s) => t(void 0, r <= s)), addOps(52, (e, t, n2, r, s) => t(void 0, r == s)), addOps(32, (e, t, n2, r, s) => t(void 0, r === s)), addOps(53, (e, t, n2, r, s) => t(void 0, r != s)), addOps(31, (e, t, n2, r, s) => t(void 0, r !== s)), addOps(29, (e, t, n2, r, s) => t(void 0, r && s)), addOps(30, (e, t, n2, r, s) => t(void 0, r || s)), addOps(77, (e, t, n2, r, s) => t(void 0, r & s)), addOps(78, (e, t, n2, r, s) => t(void 0, r | s)), addOps(33, (e, t, n2, r, s) => t(void 0, r + s)), addOps(47, (e, t, n2, r, s) => t(void 0, r - s)), addOps(59, (e, t, n2, r, s) => t(void 0, +s)), addOps(58, (e, t, n2, r, s) => t(void 0, -s)), addOps(48, (e, t, n2, r, s) => t(void 0, r / s)), addOps(79, (e, t, n2, r, s) => t(void 0, r ^ s)), addOps(50, (e, t, n2, r, s) => t(void 0, r * s)), addOps(51, (e, t, n2, r, s) => t(void 0, r % s)), addOps(80, (e, t, n2, r, s) => t(void 0, r << s)), addOps(81, (e, t, n2, r, s) => t(void 0, r >> s)), addOps(82, (e, t, n2, r, s) => t(void 0, r >>> s)), addOps(60, (e, t, n2, r, s, i, o, a) => {
    e(n2, s, a, o, (e2, n3) => {
      t(void 0, typeof valueOrProp(n3, o));
    });
  }), addOps(62, (e, t, n2, r, s) => t(void 0, r instanceof s)), addOps(63, (e, t, n2, r, s) => t(void 0, r in s)), addOps(61, (e, t, n2, r, s, i, o, a, c) => {
    void 0 !== c.context ? (assignCheck(c, o, "delete"), c.isVariable ? t(void 0, false) : t(void 0, delete c.context?.[c.prop])) : t(void 0, true);
  }), addOps(8, (e, t, n2, r, s) => t(void 0, s)), addOps(34, (e, t, n2, r, s, i, o, a) => {
    t(void 0, a.declare(r, "var", s));
  }), addOps(3, (e, t, n2, r, s, i, o, a, c) => {
    t(void 0, a.declare(r, "let", s, c && c.isGlobal));
  }), addOps(4, (e, t, n2, r, s, i, o, a) => {
    t(void 0, a.declare(r, "const", s));
  }), addOps(11, (e, t, n2, r, s, i, o, a) => {
    if (r = [...r], "string" == typeof i[2] || i[2] instanceof CodeString) {
      if (!o.allowJit || !o.evalContext) throw new SandboxError("Unevaluated code detected, JIT not allowed");
      i[2] = s = o.evalContext.lispifyFunction(new CodeString(i[2]), o.constants);
    }
    r.shift() ? t(void 0, createFunctionAsync(r, s, n2, o, a)) : t(void 0, createFunction(r, s, n2, o, a));
  }), addOps(37, (e, t, n2, r, s, i, o, a) => {
    if ("string" == typeof i[2] || i[2] instanceof CodeString) {
      if (!o.allowJit || !o.evalContext) throw new SandboxError("Unevaluated code detected, JIT not allowed");
      i[2] = s = o.evalContext.lispifyFunction(new CodeString(i[2]), o.constants);
    }
    const c = r.shift(), p = r.shift();
    let l;
    l = 88 === c ? createFunctionAsync(r, s, n2, o, a, p) : createFunction(r, s, n2, o, a, p), p && a.declare(p, "var", l), t(void 0, l);
  }), addOps(10, (e, t, n2, r, s, i, o, a) => {
    if ("string" == typeof i[2] || i[2] instanceof CodeString) {
      if (!o.allowJit || !o.evalContext) throw new SandboxError("Unevaluated code detected, JIT not allowed");
      i[2] = s = o.evalContext.lispifyFunction(new CodeString(i[2]), o.constants);
    }
    const c = r.shift(), p = r.shift();
    let l;
    p && (a = new Scope(a, {})), l = 88 === c ? createFunctionAsync(r, s, n2, o, a, p) : createFunction(r, s, n2, o, a, p), p && a.declare(p, "let", l), t(void 0, l);
  }), addOps(38, (e, t, n2, r, s, i, o, a) => {
    const [c, p, l, d, u, f, h] = r;
    let g = true;
    const x = new Scope(a, {}), y = { $$obj: void 0 }, b = new Scope(x, y);
    if (e === execAsync) (async () => {
      let r2;
      for (r2 = asyncDone((t2) => e(n2, d, x, o, t2)), y.$$obj = true === (r2 = asyncDone((t2) => e(n2, l, x, o, t2))).isInstant ? r2.instant : (await r2.p).result, r2 = asyncDone((t2) => e(n2, p, b, o, t2)), c && (g = true === (r2 = asyncDone((t2) => e(n2, f, b, o, t2))).isInstant ? r2.instant : (await r2.p).result); g; ) {
        const i2 = {};
        r2 = asyncDone((t2) => e(n2, h, new Scope(b, i2), o, t2)), true === r2.isInstant ? r2.instant : (await r2.p).result;
        const a2 = await executeTreeAsync(n2, o, s, [new Scope(x, i2)], "loop");
        if (a2 instanceof ExecReturn && a2.returned) return void t(void 0, a2);
        if (a2 instanceof ExecReturn && a2.breakLoop) break;
        r2 = asyncDone((t2) => e(n2, u, b, o, t2)), g = true === (r2 = asyncDone((t2) => e(n2, f, b, o, t2))).isInstant ? r2.instant : (await r2.p).result;
      }
      t();
    })().catch(t);
    else {
      for (syncDone((t2) => e(n2, d, x, o, t2)), y.$$obj = syncDone((t2) => e(n2, l, x, o, t2)).result, syncDone((t2) => e(n2, p, b, o, t2)), c && (g = syncDone((t2) => e(n2, f, b, o, t2)).result); g; ) {
        const r2 = {};
        syncDone((t2) => e(n2, h, new Scope(b, r2), o, t2));
        const i2 = executeTree(n2, o, s, [new Scope(x, r2)], "loop");
        if (i2 instanceof ExecReturn && i2.returned) return void t(void 0, i2);
        if (i2 instanceof ExecReturn && i2.breakLoop) break;
        syncDone((t2) => e(n2, u, b, o, t2)), g = syncDone((t2) => e(n2, f, b, o, t2)).result;
      }
      t();
    }
  }), addOps(86, (e, t, n2, r, s, i, o, a, c, p) => {
    if ("switch" === p && "continue" === r || !p) throw new SandboxError("Illegal " + r + " statement");
    t(void 0, new ExecReturn(o.ctx.auditReport, void 0, false, "break" === r, "continue" === r));
  }), addOps(13, (e, t, n2, r, s, i, o, a) => {
    e(n2, valueOrProp(r, o) ? s.t : s.f, a, o, t);
  }), addOps(15, (e, t, n2, r, s, i, o, a) => {
    e(n2, valueOrProp(r, o) ? s.t : s.f, a, o, t);
  }), addOps(16, (e, t, n2, r, s) => t(void 0, new If(r, s))), addOps(14, (e, t, n2, r, s) => t(void 0, new If(r, s))), addOps(40, (e, t, n2, r, s, i, o, a) => {
    e(n2, r, a, o, (r2, i2) => {
      if (r2) t(r2);
      else if (i2 = valueOrProp(i2, o), e === execSync) {
        let r3, c = false;
        for (const p of s) if (c || (c = !p[1] || i2 === valueOrProp(syncDone((t2) => e(n2, p[1], a, o, t2)).result, o))) {
          if (!p[2]) continue;
          if (r3 = executeTree(n2, o, p[2], [a], "switch"), r3.breakLoop) break;
          if (r3.returned) return void t(void 0, r3);
          if (!p[1]) break;
        }
        t();
      } else (async () => {
        let r3, c = false;
        for (const p of s) {
          let s2;
          if (c || (c = !p[1] || i2 === valueOrProp(true === (s2 = asyncDone((t2) => e(n2, p[1], a, o, t2))).isInstant ? s2.instant : (await s2.p).result, o))) {
            if (!p[2]) continue;
            if (r3 = await executeTreeAsync(n2, o, p[2], [a], "switch"), r3.breakLoop) break;
            if (r3.returned) return void t(void 0, r3);
            if (!p[1]) break;
          }
        }
        t();
      })().catch(t);
    });
  }), addOps(39, (e, t, n2, r, s, i, o, a, c, p) => {
    const [l, d, u] = s;
    executeTreeWithDone(e, (r2, s2) => {
      executeTreeWithDone(e, (i2) => {
        i2 ? t(i2) : r2 ? executeTreeWithDone(e, t, n2, o, d, [new Scope(a)], p) : t(void 0, s2);
      }, n2, o, u, [new Scope(a, {})]);
    }, n2, o, r, [new Scope(a)], p);
  }), addOps(87, (e, t) => {
    t();
  }), addOps(45, (e, t, n2, r, s, i, o) => {
    if (!o.ctx.globalsWhitelist.has(r) && !sandboxedFunctions.has(r)) throw new SandboxError(`Object construction not allowed: ${r.constructor.name}`);
    t(void 0, new r(...s));
  }), addOps(46, (e, t, n2, r, s) => {
    t(s);
  }), addOps(43, (e, t, n2, r) => t(void 0, r.pop())), addOps(0, (e, t) => t());
  var unexecTypes = /* @__PURE__ */ new Set([11, 37, 10, 38, 39, 40, 14, 16, 60]);
  var currentTicks = { current: { ticks: BigInt(0) } };
  function _execNoneRecurse(e, t, n2, r, s, i, o) {
    const a = i ? execAsync : execSync;
    if (r.ctx.options.executionQuota && r.ctx.options.executionQuota <= e.ticks && ("function" != typeof r.ctx.options.onExecutionQuotaReached || !r.ctx.options.onExecutionQuotaReached(e, n2, r, t))) return s(new SandboxError("Execution quota exceeded")), true;
    if (e.ticks++, currentTicks.current = e, t instanceof Prop) try {
      s(void 0, t.get(r));
    } catch (e2) {
      s(e2);
    }
    else if (t === optional) s();
    else if (Array.isArray(t) && !isLisp(t)) 0 === t[0] ? s() : execMany(e, a, t, s, n2, r, o);
    else if (isLisp(t)) if (42 === t[0]) execMany(e, a, t[1], s, n2, r, o);
    else if (44 === t[0]) i ? r.ctx.prototypeWhitelist?.has(Promise.prototype) ? execAsync(e, t[1], n2, r, async (e2, t2) => {
      if (e2) s(e2);
      else try {
        s(void 0, await valueOrProp(t2, r));
      } catch (e3) {
        s(e3);
      }
    }, o).catch(s) : s(new SandboxError("Async/await is not permitted")) : s(new SandboxError("Illegal use of 'await', must be inside async function"));
    else {
      if (!unexecTypes.has(t[0])) return false;
      try {
        ops.get(t[0])?.(a, s, e, t[1], t[2], t, r, n2, void 0, o);
      } catch (e2) {
        s(e2);
      }
    }
    else s(void 0, t);
    return true;
  }
  function executeTree(e, t, n2, r = [], s) {
    return syncDone((i) => executeTreeWithDone(execSync, i, e, t, n2, r, s)).result;
  }
  async function executeTreeAsync(e, t, n2, r = [], s) {
    let i;
    return true === (i = asyncDone((i2) => executeTreeWithDone(execAsync, i2, e, t, n2, r, s))).isInstant ? i.instant : (await i.p).result;
  }
  function executeTreeWithDone(e, t, n2, r, s, i = [], o) {
    if (!s) return void t();
    if (!(s instanceof Array)) throw new SyntaxError("Bad execution tree");
    let a, c = r.ctx.globalScope;
    for (; a = i.shift(); ) "object" == typeof a && (c = a instanceof Scope ? a : new Scope(c, a, a instanceof LocalScope ? void 0 : null));
    r.ctx.options.audit && !r.ctx.auditReport && (r.ctx.auditReport = { globalsAccess: /* @__PURE__ */ new Set(), prototypeAccess: {} }), e === execSync ? _executeWithDoneSync(t, n2, r, s, c, o) : _executeWithDoneAsync(t, n2, r, s, c, o).catch(t);
  }
  function _executeWithDoneSync(e, t, n2, r, s, i) {
    if (!(r instanceof Array)) throw new SyntaxError("Bad execution tree");
    let o = 0;
    for (o = 0; o < r.length; o++) {
      let a, c;
      const p = r[o];
      try {
        execSync(t, p, s, n2, (e2, t2) => {
          c = e2, a = t2;
        }, i);
      } catch (e2) {
        c = e2;
      }
      if (c) return void e(c);
      if (a instanceof ExecReturn) return void e(void 0, a);
      if (isLisp(p) && 8 === p[0]) return void e(void 0, new ExecReturn(n2.ctx.auditReport, a, true));
    }
    e(void 0, new ExecReturn(n2.ctx.auditReport, void 0, false));
  }
  async function _executeWithDoneAsync(e, t, n2, r, s, i) {
    if (!(r instanceof Array)) throw new SyntaxError("Bad execution tree");
    let o = 0;
    for (o = 0; o < r.length; o++) {
      let a, c;
      const p = r[o];
      try {
        await execAsync(t, p, s, n2, (e2, t2) => {
          c = e2, a = t2;
        }, i);
      } catch (e2) {
        c = e2;
      }
      if (c) return void e(c);
      if (a instanceof ExecReturn) return void e(void 0, a);
      if (isLisp(p) && 8 === p[0]) return void e(void 0, new ExecReturn(n2.ctx.auditReport, a, true));
    }
    e(void 0, new ExecReturn(n2.ctx.auditReport, void 0, false));
  }
  function parseHexToInt(e) {
    return !e.match(/[^a-f0-9]/i) ? parseInt(e, 16) : NaN;
  }
  function validateAndParseHex(e, t, n2) {
    const r = parseHexToInt(e);
    if (Number.isNaN(r) || void 0 !== n2 && n2 !== e.length) throw new SyntaxError(t + ": " + e);
    return r;
  }
  function parseHexadecimalCode(e) {
    const t = validateAndParseHex(e, "Malformed Hexadecimal", 2);
    return String.fromCharCode(t);
  }
  function parseUnicodeCode(e, t) {
    const n2 = validateAndParseHex(e, "Malformed Unicode", 4);
    if (void 0 !== t) {
      const e2 = validateAndParseHex(t, "Malformed Unicode", 4);
      return String.fromCharCode(n2, e2);
    }
    return String.fromCharCode(n2);
  }
  function isCurlyBraced(e) {
    return "{" === e.charAt(0) && "}" === e.charAt(e.length - 1);
  }
  function parseUnicodeCodePointCode(e) {
    if (!isCurlyBraced(e)) throw new SyntaxError("Malformed Unicode: +" + e);
    const t = validateAndParseHex(e.slice(1, -1), "Malformed Unicode");
    try {
      return String.fromCodePoint(t);
    } catch (e2) {
      throw e2 instanceof RangeError ? new SyntaxError("Code Point Limit:" + t) : e2;
    }
  }
  var singleCharacterEscapes = /* @__PURE__ */ new Map([["b", "\b"], ["f", "\f"], ["n", "\n"], ["r", "\r"], ["t", "	"], ["v", "\v"], ["0", "\0"]]);
  function parseSingleCharacterCode(e) {
    return singleCharacterEscapes.get(e) || e;
  }
  var escapeMatch = /\\(?:(\\)|x([\s\S]{0,2})|u(\{[^}]*\}?)|u([\s\S]{4})\\u([^{][\s\S]{0,3})|u([\s\S]{0,4})|([0-3]?[0-7]{1,2})|([\s\S])|$)/g;
  function unraw(e) {
    return e.replace(escapeMatch, function(e2, t, n2, r, s, i, o, a, c) {
      if (void 0 !== t) return "\\";
      if (void 0 !== n2) return parseHexadecimalCode(n2);
      if (void 0 !== r) return parseUnicodeCodePointCode(r);
      if (void 0 !== s) return parseUnicodeCode(s, i);
      if (void 0 !== o) return parseUnicodeCode(o);
      if ("0" === a) return "\0";
      if (void 0 !== a) throw new SyntaxError("Octal Deprecation: " + a);
      if (void 0 !== c) return parseSingleCharacterCode(c);
      throw new SyntaxError("End of string");
    });
  }
  function createLisp(e) {
    return [e.op, e.a, e.b];
  }
  var NullLisp = createLisp({ op: 0, a: 0, b: 0 });
  var lispTypes = /* @__PURE__ */ new Map();
  var ParseError = class extends Error {
    constructor(e, t) {
      super(e + ": " + t.substring(0, 40)), this.code = t;
    }
  };
  var lastType;
  var inlineIfElse = /^:/;
  var elseIf = /^else(?![\w$])/;
  var ifElse = /^if(?![\w$])/;
  var space = /^\s/;
  var expectTypes = { splitter: { types: { opHigh: /^(\/|\*\*|\*(?!\*)|%)(?!=)/, op: /^(\+(?!(\+))|-(?!(-)))(?!=)/, comparitor: /^(<=|>=|<(?!<)|>(?!>)|!==|!=(?!=)|===|==)/, boolOp: /^(&&|\|\||instanceof(?![\w$])|in(?![\w$]))/, bitwise: /^(&(?!&)|\|(?!\|)|\^|<<|>>(?!>)|>>>)(?!=)/ }, next: ["modifier", "value", "prop", "incrementerBefore"] }, inlineIf: { types: { inlineIf: /^\?(?!\.(?!\d))/ }, next: ["expEnd"] }, assignment: { types: { assignModify: /^(-=|\+=|\/=|\*\*=|\*=|%=|\^=|&=|\|=|>>>=|>>=|<<=)/, assign: /^(=)(?!=)/ }, next: ["modifier", "value", "prop", "incrementerBefore"] }, incrementerBefore: { types: { incrementerBefore: /^(\+\+|--)/ }, next: ["prop"] }, expEdge: { types: { call: /^(\?\.)?[(]/, incrementerAfter: /^(\+\+|--)/ }, next: ["splitter", "expEdge", "dot", "inlineIf", "expEnd"] }, modifier: { types: { not: /^!/, inverse: /^~/, negative: /^-(?!-)/, positive: /^\+(?!\+)/, typeof: /^typeof(?![\w$])/, delete: /^delete(?![\w$])/ }, next: ["modifier", "value", "prop", "incrementerBefore"] }, dot: { types: { arrayProp: /^(\?\.)?\[/, dot: /^(\?)?\.(?=\s*[a-zA-Z$_])/ }, next: ["splitter", "assignment", "expEdge", "dot", "inlineIf", "expEnd"] }, prop: { types: { prop: /^[a-zA-Z$_][a-zA-Z\d$_]*/ }, next: ["splitter", "assignment", "expEdge", "dot", "inlineIf", "expEnd"] }, value: { types: { createObject: /^\{/, createArray: /^\[/, number: /^(0x[\da-f]+(_[\da-f]+)*|(\d+(_\d+)*(\.\d+(_\d+)*)?|\.\d+(_\d+)*))(e[+-]?\d+(_\d+)*)?(n)?(?!\d)/i, string: /^"(\d+)"/, literal: /^`(\d+)`/, regex: /^\/(\d+)\/r(?![\w$])/, boolean: /^(true|false)(?![\w$])/, null: /^null(?![\w$])/, und: /^undefined(?![\w$])/, arrowFunctionSingle: /^(async\s+)?([a-zA-Z$_][a-zA-Z\d$_]*)\s*=>\s*({)?/, arrowFunction: /^(async\s*)?\(\s*((\.\.\.)?\s*[a-zA-Z$_][a-zA-Z\d$_]*(\s*,\s*(\.\.\.)?\s*[a-zA-Z$_][a-zA-Z\d$_]*)*)?\s*\)\s*=>\s*({)?/, inlineFunction: /^(async\s+)?function(\s*[a-zA-Z$_][a-zA-Z\d$_]*)?\s*\(\s*((\.\.\.)?\s*[a-zA-Z$_][a-zA-Z\d$_]*(\s*,\s*(\.\.\.)?\s*[a-zA-Z$_][a-zA-Z\d$_]*)*)?\s*\)\s*{/, group: /^\(/, NaN: /^NaN(?![\w$])/, Infinity: /^Infinity(?![\w$])/, void: /^void(?![\w$])\s*/, await: /^await(?![\w$])\s*/, new: /^new(?![\w$])\s*/ }, next: ["splitter", "expEdge", "dot", "inlineIf", "expEnd"] }, initialize: { types: { initialize: /^(var|let|const)\s+([a-zA-Z$_][a-zA-Z\d$_]*)\s*(=)?/, return: /^return(?![\w$])/, throw: /^throw(?![\w$])\s*/ }, next: ["modifier", "value", "prop", "incrementerBefore", "expEnd"] }, spreadObject: { types: { spreadObject: /^\.\.\./ }, next: ["value", "prop"] }, spreadArray: { types: { spreadArray: /^\.\.\./ }, next: ["value", "prop"] }, expEnd: { types: {}, next: [] }, expFunction: { types: { function: /^(async\s+)?function(\s*[a-zA-Z$_][a-zA-Z\d$_]*)\s*\(\s*((\.\.\.)?\s*[a-zA-Z$_][a-zA-Z\d$_]*(\s*,\s*(\.\.\.)?\s*[a-zA-Z$_][a-zA-Z\d$_]*)*)?\s*\)\s*{/ }, next: ["expEdge", "expEnd"] }, expSingle: { types: { for: /^(([a-zA-Z$_][\w$]*)\s*:)?\s*for\s*\(/, do: /^(([a-zA-Z$_][\w$]*)\s*:)?\s*do(?![\w$])\s*(\{)?/, while: /^(([a-zA-Z$_][\w$]*)\s*:)?\s*while\s*\(/, loopAction: /^(break|continue)(?![\w$])\s*([a-zA-Z$_][\w$]*)?/, if: /^((([a-zA-Z$_][\w$]*)\s*:)?\s*)if\s*\(/, try: /^try\s*{/, block: /^{/, switch: /^(([a-zA-Z$_][\w$]*)\s*:)?\s*switch\s*\(/ }, next: ["expEnd"] } };
  var closings = { "(": ")", "[": "]", "{": "}", "'": "'", '"': '"', "`": "`" };
  function testMultiple(e, t) {
    let n2 = null;
    for (let r = 0; r < t.length; r++) {
      if (n2 = t[r].exec(e), n2) break;
    }
    return n2;
  }
  var emptyString = new CodeString("");
  var okFirstChars = /^[+\-~ !]/;
  var aNumber = expectTypes.value.types.number;
  var wordReg = /^((if|for|else|while|do|function)(?![\w$])|[\w$]+)/;
  var semiColon = /^;/;
  var insertedSemicolons = /* @__PURE__ */ new WeakMap();
  var quoteCache = /* @__PURE__ */ new WeakMap();
  function restOfExp(e, t, n2, r, s, i, o = {}) {
    if (!t.length) return t;
    o.words = o.words || [];
    let a = true;
    const c = (n2 = n2 || []).includes(semiColon);
    c && (n2 = n2.filter((e2) => e2 !== semiColon));
    const p = insertedSemicolons.get(t.ref) || [], l = quoteCache.get(t.ref) || /* @__PURE__ */ new Map();
    if (quoteCache.set(t.ref, l), r && l.has(t.start - 1)) return t.substring(0, l.get(t.start - 1) - t.start);
    let d, u = false, f = false, h = "", g = false, x = false;
    for (d = 0; d < t.length && !f; d++) {
      let y = t.char(d);
      if ('"' === r || "'" === r || "`" === r) {
        if ("`" !== r || "$" !== y || "{" !== t.char(d + 1) || u) {
          if (y === r && !u) return t.substring(0, d);
        } else {
          d += restOfExp(e, t.substring(d + 2), [], "{").length + 2;
        }
        u = !u && "\\" === y;
      } else if (closings[y]) {
        if (!x && p[d + t.start]) {
          if (x = true, c) break;
          d--, h = ";";
          continue;
        }
        if (g && "{" === y && (g = false), y === s) {
          f = true;
          break;
        }
        {
          const n3 = restOfExp(e, t.substring(d + 1), [], y);
          if (l.set(n3.start - 1, n3.end), d += n3.length + 1, a = false, i) {
            let e2;
            (e2 = testMultiple(t.substring(d).toString(), i)) && (o.regRes = e2, f = true);
          }
        }
      } else if (r) {
        if (y === closings[r]) return t.substring(0, d);
      } else {
        let e2, r2, s2 = t.substring(d).toString();
        if (i) {
          let e3;
          if (e3 = testMultiple(s2, i)) {
            o.regRes = e3, d++, f = true;
            break;
          }
        }
        if (r2 = aNumber.exec(s2)) d += r2[0].length - 1, s2 = t.substring(d).toString();
        else if (h != y) {
          let r3 = null;
          if (";" === y || p[d + t.start] && !a && !x) {
            if (c) r3 = [";"];
            else if (p[d + t.start]) {
              x = true, d--, h = ";";
              continue;
            }
            y = s2 = ";";
          } else x = false;
          r3 || (r3 = testMultiple(s2, n2)), r3 && (f = true), !f && (e2 = wordReg.exec(s2)) && (g = true, e2[0].length > 1 && (o.words.push(e2[1]), o.lastAnyWord = e2[1], e2[2] && (o.lastWord = e2[2])), e2[0].length > 2 && (d += e2[0].length - 2));
        }
        if (a && (okFirstChars.test(s2) ? f = false : a = false), f) break;
      }
      h = y;
    }
    if (r) throw new SyntaxError("Unclosed '" + r + "'");
    return o && (o.oneliner = g), t.substring(0, d);
  }
  restOfExp.next = ["splitter", "expEnd", "inlineIf"];
  var startingExecpted = ["initialize", "expSingle", "expFunction", "value", "modifier", "prop", "incrementerBefore", "expEnd"];
  var setLispType = (e, t) => {
    e.forEach((e2) => {
      lispTypes.set(e2, t);
    });
  };
  var closingsCreate = { createArray: /^\]/, createObject: /^\}/, group: /^\)/, arrayProp: /^\]/, call: /^\)/ };
  var typesCreate = { createArray: 12, createObject: 22, group: 23, arrayProp: 19, call: 5, prop: 1, "?prop": 20, "?call": 21 };
  setLispType(["createArray", "createObject", "group", "arrayProp", "call"], (e, t, n2, r, s, i) => {
    let o = emptyString;
    const a = [];
    let c = false, p = r[0].length;
    const l = p;
    for (; p < n2.length && !c; ) o = restOfExp(e, n2.substring(p), [closingsCreate[t], /^,/]), p += o.length, o.trim().length && a.push(o), "," !== n2.char(p) ? c = true : p++;
    const d = ["value", "modifier", "prop", "incrementerBefore", "expEnd"];
    let u, f;
    switch (t) {
      case "group":
      case "arrayProp":
        u = lispifyExpr(e, n2.substring(l, p));
        break;
      case "call":
      case "createArray":
        u = a.map((t2) => lispify(e, t2, [...d, "spreadArray"]));
        break;
      case "createObject":
        u = a.map((t2) => {
          let n3;
          t2 = t2.trimStart();
          let r2 = "";
          if (f = expectTypes.expFunction.types.function.exec("function " + t2), f) r2 = f[2].trimStart(), n3 = lispify(e, new CodeString("function " + t2.toString().replace(r2, "")));
          else {
            const s2 = restOfExp(e, t2, [/^:/]);
            r2 = lispify(e, s2, [...d, "spreadObject"]), 1 === r2[0] && (r2 = r2[2]), n3 = lispify(e, t2.substring(s2.length + 1));
          }
          return createLisp({ op: 6, a: r2, b: n3 });
        });
    }
    const h = "arrayProp" === t ? r[1] ? 20 : 1 : "call" === t ? r[1] ? 21 : 5 : typesCreate[t];
    i.lispTree = lispify(e, n2.substring(p + 1), expectTypes[s].next, createLisp({ op: h, a: i.lispTree, b: u }));
  });
  var modifierTypes = { inverse: 64, not: 24, positive: 59, negative: 58, typeof: 60, delete: 61 };
  setLispType(["inverse", "not", "negative", "positive", "typeof", "delete"], (e, t, n2, r, s, i) => {
    const o = restOfExp(e, n2.substring(r[0].length), [/^([^\s.?\w$]|\?[^.])/]);
    i.lispTree = lispify(e, n2.substring(o.length + r[0].length), restOfExp.next, createLisp({ op: modifierTypes[t], a: i.lispTree, b: lispify(e, o, expectTypes[s].next) }));
  });
  var incrementTypes = { "++$": 25, "--$": 27, "$++": 26, "$--": 28 };
  setLispType(["incrementerBefore"], (e, t, n2, r, s, i) => {
    const o = restOfExp(e, n2.substring(2), [/^[^\s.\w$]/]);
    i.lispTree = lispify(e, n2.substring(o.length + 2), restOfExp.next, createLisp({ op: incrementTypes[r[0] + "$"], a: lispify(e, o, expectTypes[s].next), b: 0 }));
  }), setLispType(["incrementerAfter"], (e, t, n2, r, s, i) => {
    i.lispTree = lispify(e, n2.substring(r[0].length), expectTypes[s].next, createLisp({ op: incrementTypes["$" + r[0]], a: i.lispTree, b: 0 }));
  });
  var adderTypes = { "&&": 29, "||": 30, instanceof: 62, in: 63, "=": 9, "-=": 65, "+=": 66, "/=": 67, "**=": 68, "*=": 69, "%=": 70, "^=": 71, "&=": 72, "|=": 73, ">>>=": 74, "<<=": 76, ">>=": 75 };
  setLispType(["assign", "assignModify", "boolOp"], (e, t, n2, r, s, i) => {
    i.lispTree = createLisp({ op: adderTypes[r[0]], a: i.lispTree, b: lispify(e, n2.substring(r[0].length), expectTypes[s].next) });
  });
  var opTypes = { "&": 77, "|": 78, "^": 79, "<<": 80, ">>": 81, ">>>": 82, "<=": 54, ">=": 55, "<": 56, ">": 57, "!==": 31, "!=": 53, "===": 32, "==": 52, "+": 33, "-": 47, "/": 48, "**": 49, "*": 50, "%": 51 };
  function extractIfElse(e, t) {
    let n2, r, s = 0, i = t.substring(0, 0), o = emptyString, a = true, c = {};
    for (; (i = restOfExp(e, t.substring(i.end - t.start), [elseIf, ifElse, semiColon], void 0, void 0, void 0, c)).length || a; ) {
      a = false;
      const p = t.substring(i.end - t.start).toString();
      if (p.startsWith("if")) i.end++, s++;
      else if (p.startsWith("else")) n2 = t.substring(0, i.end - t.start), i.end++, s--, s || i.end--;
      else {
        if (!(r = /^;?\s*else(?![\w$])/.exec(p))) {
          n2 = o.length ? n2 : t.substring(0, i.end - t.start);
          break;
        }
        n2 = t.substring(0, i.end - t.start), i.end += r[0].length - 1, s--, s || (i.end -= r[0].length - 1);
      }
      if (!s) {
        o = extractIfElse(e, t.substring(i.end - t.start + (/^;?\s*else(?![\w$])/.exec(p)?.[0].length || 0))).all;
        break;
      }
      c = {};
    }
    return n2 = n2 || t.substring(0, i.end - t.start), { all: t.substring(0, Math.max(n2.end, o.end) - t.start), true: n2, false: o };
  }
  setLispType(["opHigh", "op", "comparitor", "bitwise"], (e, t, n2, r, s, i) => {
    const o = [expectTypes.inlineIf.types.inlineIf, inlineIfElse];
    switch (t) {
      case "opHigh":
        o.push(expectTypes.splitter.types.opHigh);
      case "op":
        o.push(expectTypes.splitter.types.op);
      case "comparitor":
        o.push(expectTypes.splitter.types.comparitor);
      case "bitwise":
        o.push(expectTypes.splitter.types.bitwise), o.push(expectTypes.splitter.types.boolOp);
    }
    const a = restOfExp(e, n2.substring(r[0].length), o);
    i.lispTree = lispify(e, n2.substring(a.length + r[0].length), restOfExp.next, createLisp({ op: opTypes[r[0]], a: i.lispTree, b: lispify(e, a, expectTypes[s].next) }));
  }), setLispType(["inlineIf"], (e, t, n2, r, s, i) => {
    let o = false;
    const a = n2.substring(0, 0);
    let c = 1;
    for (; !o && a.length < n2.length; ) a.end = restOfExp(e, n2.substring(a.length + 1), [expectTypes.inlineIf.types.inlineIf, inlineIfElse]).end, "?" === n2.char(a.length) ? c++ : c--, c || (o = true);
    a.start = n2.start + 1, i.lispTree = createLisp({ op: 15, a: i.lispTree, b: createLisp({ op: 16, a: lispifyExpr(e, a), b: lispifyExpr(e, n2.substring(r[0].length + a.length + 1)) }) });
  }), setLispType(["if"], (e, t, n2, r, s, i) => {
    let o = restOfExp(e, n2.substring(r[0].length), [], "(");
    const a = extractIfElse(e, n2.substring(r[1].length)), c = r[0].length - r[1].length + o.length + 1;
    let p = a.true.substring(c), l = a.false;
    o = o.trim(), p = p.trim(), l = l.trim(), "{" === p.char(0) && (p = p.slice(1, -1)), "{" === l.char(0) && (l = l.slice(1, -1)), i.lispTree = createLisp({ op: 13, a: lispifyExpr(e, o), b: createLisp({ op: 14, a: lispifyBlock(p, e), b: lispifyBlock(l, e) }) });
  }), setLispType(["switch"], (e, t, n2, r, s, i) => {
    const o = restOfExp(e, n2.substring(r[0].length), [], "(");
    let a = n2.toString().indexOf("{", r[0].length + o.length + 1);
    if (-1 === a) throw new SyntaxError("Invalid switch");
    let c, p = insertSemicolons(e, restOfExp(e, n2.substring(a + 1), [], "{"));
    const l = /^\s*(case\s|default)\s*/, d = [];
    let u = false;
    for (; c = l.exec(p.toString()); ) {
      if ("default" === c[1]) {
        if (u) throw new SyntaxError("Only one default switch case allowed");
        u = true;
      }
      const t2 = restOfExp(e, p.substring(c[0].length), [/^:/]);
      let n3 = emptyString, r2 = a = c[0].length + t2.length + 1;
      const s2 = /^\s*\{/.exec(p.substring(r2).toString());
      let i2 = [];
      if (s2) r2 += s2[0].length, n3 = restOfExp(e, p.substring(r2), [], "{"), r2 += n3.length + 1, i2 = lispifyBlock(n3, e);
      else {
        const t3 = restOfExp(e, p.substring(r2), [l]);
        if (t3.trim().length) {
          for (; (n3 = restOfExp(e, p.substring(r2), [semiColon])).length && (r2 += n3.length + (";" === p.char(r2 + n3.length) ? 1 : 0), !l.test(p.substring(r2).toString())); ) ;
          i2 = lispifyBlock(p.substring(a, n3.end - p.start), e);
        } else i2 = [], r2 += t3.length;
      }
      p = p.substring(r2), d.push(createLisp({ op: 41, a: "default" === c[1] ? 0 : lispifyExpr(e, t2), b: i2 }));
    }
    i.lispTree = createLisp({ op: 40, a: lispifyExpr(e, o), b: d });
  }), setLispType(["dot", "prop"], (e, t, n2, r, s, i) => {
    let o = r[0], a = r[0].length, c = "prop";
    if ("dot" === t) {
      r[1] && (c = "?prop");
      const e2 = n2.substring(r[0].length).toString().match(expectTypes.prop.types.prop);
      if (!e2 || !e2.length) throw new SyntaxError("Hanging  dot");
      o = e2[0], a = o.length + r[0].length;
    }
    i.lispTree = lispify(e, n2.substring(a), expectTypes[s].next, createLisp({ op: typesCreate[c], a: i.lispTree, b: o }));
  }), setLispType(["spreadArray", "spreadObject"], (e, t, n2, r, s, i) => {
    i.lispTree = createLisp({ op: "spreadArray" === t ? 18 : 17, a: 0, b: lispify(e, n2.substring(r[0].length), expectTypes[s].next) });
  }), setLispType(["return", "throw"], (e, t, n2, r, s, i) => {
    i.lispTree = createLisp({ op: "return" === t ? 8 : 46, a: 0, b: lispifyExpr(e, n2.substring(r[0].length)) });
  }), setLispType(["number", "boolean", "null", "und", "NaN", "Infinity"], (e, t, n2, r, s, i) => {
    i.lispTree = lispify(e, n2.substring(r[0].length), expectTypes[s].next, createLisp({ op: "number" === t ? r[10] ? 83 : 7 : 35, a: 0, b: r[10] ? r[1] : r[0] }));
  }), setLispType(["string", "literal", "regex"], (e, t, n2, r, s, i) => {
    i.lispTree = lispify(e, n2.substring(r[0].length), expectTypes[s].next, createLisp({ op: "string" === t ? 2 : "literal" === t ? 84 : 85, a: 0, b: r[1] }));
  }), setLispType(["initialize"], (e, t, n2, r, s, i) => {
    const o = "var" === r[1] ? 34 : "let" === r[1] ? 3 : 4;
    r[3] ? i.lispTree = createLisp({ op: o, a: r[2], b: lispify(e, n2.substring(r[0].length), expectTypes[s].next) }) : i.lispTree = lispify(e, n2.substring(r[0].length), expectTypes[s].next, createLisp({ op: o, a: r[2], b: 0 }));
  }), setLispType(["function", "inlineFunction", "arrowFunction", "arrowFunctionSingle"], (e, t, n2, r, s, i) => {
    const o = "function" !== t && "inlineFunction" !== t, a = o && !r[r.length - 1], c = o ? 2 : 3, p = r[1] ? 88 : 0, l = r[c] ? r[c].replace(/\s+/g, "").split(/,/g) : [];
    o || l.unshift((r[2] || "").trimStart());
    let d = false;
    l.forEach((e2) => {
      if (d) throw new SyntaxError("Rest parameter must be last formal parameter");
      e2.startsWith("...") && (d = true);
    });
    const u = restOfExp(e, n2.substring(r[0].length), a ? [/^[,)}\]]/, semiColon] : [/^}/]), f = a ? "return " + u : u.toString();
    i.lispTree = lispify(e, n2.substring(r[0].length + f.length + 1), expectTypes[s].next, createLisp({ op: o ? 11 : "function" === t ? 37 : 10, a: [p, ...l], b: e.eager ? lispifyFunction(new CodeString(f), e) : f }));
  });
  var iteratorRegex = /^((let|var|const)\s+)?\s*([a-zA-Z$_][a-zA-Z\d$_]*)\s+(in|of)(?![\w$])/;
  setLispType(["for", "do", "while"], (e, t, n2, r, s, i) => {
    let o, a, c = 0, p = 88, l = [], d = 0, u = 0, f = 88, h = 88;
    switch (t) {
      case "while": {
        c = n2.toString().indexOf("(") + 1;
        const t2 = restOfExp(e, n2.substring(c), [], "(");
        o = lispifyReturnExpr(e, t2), a = restOfExp(e, n2.substring(c + t2.length + 1)).trim(), "{" === a.char(0) && (a = a.slice(1, -1));
        break;
      }
      case "for": {
        c = n2.toString().indexOf("(") + 1;
        const t2 = [];
        let r2, s2 = emptyString;
        for (let r3 = 0; r3 < 3 && (s2 = restOfExp(e, n2.substring(c), [/^[;)]/]), t2.push(s2.trim()), c += s2.length + 1, ")" !== n2.char(c - 1)); r3++) ;
        if (1 === t2.length && (r2 = iteratorRegex.exec(t2[0].toString()))) "of" === r2[4] ? (d = lispifyReturnExpr(e, t2[0].substring(r2[0].length)), l = [ofStart2, ofStart3], o = ofCondition, h = ofStep, u = lispify(e, new CodeString((r2[1] || "let ") + r2[3] + " = $$next.value"), ["initialize"])) : (d = lispifyReturnExpr(e, t2[0].substring(r2[0].length)), l = [inStart2, inStart3], h = inStep, o = inCondition, u = lispify(e, new CodeString((r2[1] || "let ") + r2[3] + " = $$keys[$$keyIndex]"), ["initialize"]));
        else {
          if (3 !== t2.length) throw new SyntaxError("Invalid for loop definition");
          p = lispifyExpr(e, t2.shift(), startingExecpted), o = lispifyReturnExpr(e, t2.shift()), h = lispifyExpr(e, t2.shift());
        }
        a = restOfExp(e, n2.substring(c)).trim(), "{" === a.char(0) && (a = a.slice(1, -1));
        break;
      }
      case "do": {
        f = 0;
        const t2 = !!r[3];
        a = restOfExp(e, n2.substring(r[0].length), t2 ? [/^\}/] : [semiColon]), o = lispifyReturnExpr(e, restOfExp(e, n2.substring(n2.toString().indexOf("(", r[0].length + a.length) + 1), [], "("));
        break;
      }
    }
    const g = [f, l, d, p, h, o, u];
    i.lispTree = createLisp({ op: 38, a: g, b: lispifyBlock(a, e) });
  }), setLispType(["block"], (e, t, n2, r, s, i) => {
    i.lispTree = createLisp({ op: 42, a: lispifyBlock(restOfExp(e, n2.substring(1), [], "{"), e), b: 0 });
  }), setLispType(["loopAction"], (e, t, n2, r, s, i) => {
    i.lispTree = createLisp({ op: 86, a: r[1], b: 0 });
  });
  var catchReg = /^\s*(catch\s*(\(\s*([a-zA-Z$_][a-zA-Z\d$_]*)\s*\))?|finally)\s*\{/;
  setLispType(["try"], (e, t, n2, r, s, i) => {
    const o = restOfExp(e, n2.substring(r[0].length), [], "{");
    let a, c, p = catchReg.exec(n2.substring(r[0].length + o.length + 1).toString()), l = "", d = 0;
    p[1].startsWith("catch") ? (p = catchReg.exec(n2.substring(r[0].length + o.length + 1).toString()), l = p[2], c = restOfExp(e, n2.substring(r[0].length + o.length + 1 + p[0].length), [], "{"), d = r[0].length + o.length + 1 + p[0].length + c.length + 1, (p = catchReg.exec(n2.substring(d).toString())) && p[1].startsWith("finally") && (a = restOfExp(e, n2.substring(d + p[0].length), [], "{"))) : a = restOfExp(e, n2.substring(r[0].length + o.length + 1 + p[0].length), [], "{");
    const u = [l, lispifyBlock(insertSemicolons(e, c || emptyString), e), lispifyBlock(insertSemicolons(e, a || emptyString), e)];
    i.lispTree = createLisp({ op: 39, a: lispifyBlock(insertSemicolons(e, o), e), b: u });
  }), setLispType(["void", "await"], (e, t, n2, r, s, i) => {
    const o = restOfExp(e, n2.substring(r[0].length), [/^([^\s.?\w$]|\?[^.])/]);
    i.lispTree = lispify(e, n2.substring(r[0].length + o.length), expectTypes[s].next, createLisp({ op: "void" === t ? 87 : 44, a: lispify(e, o), b: 0 }));
  }), setLispType(["new"], (e, t, n2, r, s, i) => {
    let o = r[0].length;
    const a = restOfExp(e, n2.substring(o), [], void 0, "(");
    o += a.length + 1;
    const c = [];
    if ("(" === n2.char(o - 1)) {
      const t2 = restOfExp(e, n2.substring(o), [], "(");
      let r2;
      o += t2.length + 1;
      let s2 = 0;
      for (; (r2 = restOfExp(e, t2.substring(s2), [/^,/])).length; ) s2 += r2.length + 1, c.push(r2.trim());
    }
    i.lispTree = lispify(e, n2.substring(o), expectTypes.expEdge.next, createLisp({ op: 45, a: lispify(e, a, expectTypes.initialize.next), b: c.map((t2) => lispify(e, t2, expectTypes.initialize.next)) }));
  });
  var ofStart2 = lispify(void 0, new CodeString("let $$iterator = $$obj[Symbol.iterator]()"), ["initialize"]);
  var ofStart3 = lispify(void 0, new CodeString("let $$next = $$iterator.next()"), ["initialize"]);
  var ofCondition = lispify(void 0, new CodeString("return !$$next.done"), ["initialize"]);
  var ofStep = lispify(void 0, new CodeString("$$next = $$iterator.next()"));
  var inStart2 = lispify(void 0, new CodeString("let $$keys = Object.keys($$obj)"), ["initialize"]);
  var inStart3 = lispify(void 0, new CodeString("let $$keyIndex = 0"), ["initialize"]);
  var inStep = lispify(void 0, new CodeString("$$keyIndex++"));
  var inCondition = lispify(void 0, new CodeString("return $$keyIndex < $$keys.length"), ["initialize"]);
  function lispify(e, t, n2, r, s = false) {
    if (r = r || NullLisp, n2 = n2 || expectTypes.initialize.next, void 0 === t) return r;
    const i = (t = t.trimStart()).toString();
    if (!t.length && !n2.includes("expEnd")) throw new SyntaxError("Unexpected end of expression");
    if (!t.length) return r;
    const o = { lispTree: r };
    let a;
    for (const r2 of n2) if ("expEnd" !== r2) {
      for (const n3 in expectTypes[r2].types) if ("expEnd" !== n3 && (a = expectTypes[r2].types[n3].exec(i))) {
        lastType = n3;
        try {
          lispTypes.get(n3)?.(e, n3, t, a, r2, o);
        } catch (e2) {
          if (s && e2 instanceof SyntaxError) throw new ParseError(e2.message, i);
          throw e2;
        }
        break;
      }
      if (a) break;
    }
    if (!a && t.length) {
      if (s) throw new ParseError(`Unexpected token after ${lastType}: ${t.char(0)}`, i);
      throw new SyntaxError(`Unexpected token after ${lastType}: ${t.char(0)}`);
    }
    return o.lispTree;
  }
  var startingExpectedWithoutSingle = startingExecpted.filter((e) => "expSingle" !== e);
  function lispifyExpr(e, t, n2) {
    if (!t.trimStart().length) return NullLisp;
    const r = [];
    let s, i = 0;
    if ((n2 = n2 || expectTypes.initialize.next).includes("expSingle") && testMultiple(t.toString(), Object.values(expectTypes.expSingle.types))) return lispify(e, t, ["expSingle"], void 0, true);
    for (n2 === startingExecpted && (n2 = startingExpectedWithoutSingle); (s = restOfExp(e, t.substring(i), [/^,/])).length; ) r.push(s.trimStart()), i += s.length + 1;
    if (1 === r.length) return lispify(e, t, n2, void 0, true);
    if (n2.includes("initialize")) {
      const s2 = expectTypes.initialize.types.initialize.exec(r[0].toString());
      if (s2) return createLisp({ op: 42, a: r.map((t2, n3) => lispify(e, n3 ? new CodeString(s2[1] + " " + t2) : t2, ["initialize"], void 0, true)), b: 0 });
      if (expectTypes.initialize.types.return.exec(r[0].toString())) return lispify(e, t, n2, void 0, true);
    }
    const o = r.map((t2) => lispify(e, t2, n2, void 0, true));
    return createLisp({ op: 43, a: o, b: 0 });
  }
  function lispifyReturnExpr(e, t) {
    return createLisp({ op: 8, a: 0, b: lispifyExpr(e, t) });
  }
  function lispifyBlock(e, t, n2 = false) {
    if (!(e = insertSemicolons(t, e)).trim().length) return [];
    const r = [];
    let s, i = 0, o = 0, a = {}, c = false, p = false;
    for (; (s = restOfExp(t, e.substring(i), [semiColon], void 0, void 0, void 0, a)).length && (p = !(!e.char(i + s.length) || ";" === e.char(i + s.length)), i += s.length + (p ? 0 : 1), /^\s*else(?![\w$])/.test(e.substring(i).toString()) || a.words?.includes("do") && /^\s*while(?![\w$])/.test(e.substring(i).toString()) ? c = true : (c = false, r.push(e.substring(o, i - (p ? 0 : 1))), o = i), a = {}, !n2); ) ;
    return c && r.push(e.substring(o, i - (p ? 0 : 1))), r.map((e2) => e2.trimStart()).filter((e2) => e2.length).map((e2) => lispifyExpr(t, e2.trimStart(), startingExecpted));
  }
  function lispifyFunction(e, t, n2 = false) {
    if (!e.trim().length) return [];
    const r = lispifyBlock(e, t, n2), s = [];
    return hoist(r, s), s.concat(r);
  }
  function hoist(e, t) {
    if (isLisp(e)) {
      if (!isLisp(e)) return false;
      const [n2, r, s] = e;
      if (39 === n2 || 13 === n2 || 38 === n2 || 40 === n2) hoist(r, t), hoist(s, t);
      else if (34 === n2) t.push(createLisp({ op: 34, a: r, b: 0 }));
      else if (37 === n2 && r[1]) return t.push(e), true;
    } else if (Array.isArray(e)) {
      const n2 = [];
      for (const r of e) hoist(r, t) || n2.push(r);
      n2.length !== e.length && (e.length = 0, e.push(...n2));
    }
    return false;
  }
  var closingsNoInsertion = /^(\})\s*(catch|finally|else|while|instanceof)(?![\w$])/;
  var colonsRegex = /^((([\w$\])"'`]|\+\+|--)\s*\r?\n\s*([\w$+\-!~]))|(\}\s*[\w$!~+\-{("'`]))/;
  function insertSemicolons(e, t) {
    let n2 = t, r = emptyString, s = {};
    const i = insertedSemicolons.get(t.ref) || new Array(t.ref.str.length);
    for (; (r = restOfExp(e, n2, [], void 0, void 0, [colonsRegex], s)).length; ) {
      let e2 = false, t2 = r, o = r.length;
      if (s.regRes) {
        e2 = true;
        const [, , i2, , , a] = s.regRes;
        if (o = "++" === s.regRes[3] || "--" === s.regRes[3] ? r.length + 1 : r.length, t2 = n2.substring(0, o), a) {
          const t3 = closingsNoInsertion.exec(n2.substring(r.length - 1).toString());
          t3 ? e2 = "while" === t3[2] && "do" !== s.lastWord : "function" === s.lastWord && "}" === s.regRes[5][0] && "(" === s.regRes[5].slice(-1) && (e2 = false);
        } else i2 && ("if" !== s.lastWord && "while" !== s.lastWord && "for" !== s.lastWord && "else" !== s.lastWord || (e2 = false));
      }
      e2 && (i[t2.end] = true), n2 = n2.substring(o), s = {};
    }
    return insertedSemicolons.set(t.ref, i), t;
  }
  function checkRegex(e) {
    let t = 1, n2 = false, r = false, s = false;
    for (; t < e.length && !r && !s; ) r = "/" === e[t] && !n2, n2 = "\\" === e[t] && !n2, s = "\n" === e[t], t++;
    const i = e.substring(t);
    if (s = s || !r || /^\s*\d/.test(i), s) return null;
    const o = /^[a-z]*/.exec(i);
    return /^\s+[\w$]/.test(e.substring(t + o[0].length)) ? null : { regex: e.substring(1, t - 1), flags: o && o[0] || "", length: t + (o && o[0].length || 0) };
  }
  var notDivide = /(typeof|delete|instanceof|return|in|of|throw|new|void|do|if)$/;
  var possibleDivide = /^([\w$\])]|\+\+|--)[\s/]/;
  function extractConstants(e, t, n2 = "") {
    let r, s, i = [], o = false, a = "", c = -1, p = [], l = "";
    const d = [], u = [];
    let f = null, h = 0;
    for (h = 0; h < t.length; h++) if (l = t[h], a) l === a && ("*" === a && "/" === t[h + 1] ? (a = "", h++) : "\n" === a && (a = ""));
    else {
      if (o) {
        o = false, i.push(l);
        continue;
      }
      if (r) if ("`" === r && "$" === l && "{" === t[h + 1]) {
        const n3 = extractConstants(e, t.substring(h + 2), "{");
        p.push(n3.str), i.push("${", p.length - 1, "}"), h += n3.length + 2;
      } else if (r === l) {
        if ("`" === r) {
          const t2 = createLisp({ op: 36, a: unraw(i.join("")), b: [] });
          t2.tempJsStrings = p, e.literals.push(t2), d.push("`", e.literals.length - 1, "`");
        } else e.strings.push(unraw(i.join(""))), d.push('"', e.strings.length - 1, '"');
        r = null, i = [];
      } else i.push(l);
      else {
        if ("'" === l || '"' === l || "`" === l) p = [], r = l;
        else {
          if (closings[n2] === l && !u.length) return { str: d.join(""), length: h };
          closings[l] ? (u.push(l), d.push(l)) : closings[u[u.length - 1]] === l ? (u.pop(), d.push(l)) : "/" !== l || "*" !== t[h + 1] && "/" !== t[h + 1] ? "/" === l && !f && (s = checkRegex(t.substring(h))) ? (e.regexes.push(s), d.push("/", e.regexes.length - 1, "/r"), h += s.length - 1) : d.push(l) : (a = "*" === t[h + 1] ? "*" : "\n", c = h);
        }
        f && space.test(l) || (f = possibleDivide.exec(t.substring(h))) && notDivide.test(t.substring(0, h + f[1].length)) && (f = null);
      }
      o = !(!r || "\\" !== l);
    }
    if (a && "*" === a) throw new SyntaxError(`Unclosed comment '/*': ${t.substring(c)}`);
    return { str: d.join(""), length: h };
  }
  function parse(e, t = false, n2 = false) {
    if ("string" != typeof e) throw new ParseError(`Cannot parse ${e}`, e);
    let r = " " + e;
    const s = { strings: [], literals: [], regexes: [], eager: t };
    r = extractConstants(s, r).str;
    for (const e2 of s.literals) e2[2] = e2.tempJsStrings.map((e3) => lispifyExpr(s, new CodeString(e3))), delete e2.tempJsStrings;
    return { tree: lispifyFunction(new CodeString(r), s, n2), constants: s };
  }
  function createEvalContext() {
    return { sandboxFunction, sandboxedEval, sandboxedSetTimeout, sandboxedSetInterval, lispifyFunction };
  }
  function sandboxFunction(e, t) {
    return function SandboxFunction(...n2) {
      const r = parse(n2.pop() || "");
      return createFunction(n2, r.tree, t || currentTicks.current, { ...e, constants: r.constants, tree: r.tree }, void 0, "anonymous");
    };
  }
  function sandboxedEval(e) {
    return function(t) {
      return e(t)();
    };
  }
  function sandboxedSetTimeout(e) {
    return function(t, ...n2) {
      return "string" != typeof t ? setTimeout(t, ...n2) : setTimeout(e(t), ...n2);
    };
  }
  function sandboxedSetInterval(e) {
    return function(t, ...n2) {
      return "string" != typeof t ? setInterval(t, ...n2) : setInterval(e(t), ...n2);
    };
  }
  function subscribeSet(e, t, n2, r) {
    if (!(e instanceof Object)) throw new Error("Invalid subscription object, got " + ("object" == typeof e ? "null" : typeof e));
    const s = r.setSubscriptions.get(e) || /* @__PURE__ */ new Map();
    r.setSubscriptions.set(e, s);
    const i = s.get(t) || /* @__PURE__ */ new Set();
    let o;
    s.set(t, i), i.add(n2);
    const a = e[t];
    return a instanceof Object && (o = r.changeSubscriptions.get(a) || /* @__PURE__ */ new Set(), o.add(n2), r.changeSubscriptions.set(a, o)), { unsubscribe: () => {
      i.delete(n2), o?.delete(n2);
    } };
  }
  var SandboxExec = class _SandboxExec {
    constructor(e, t) {
      this.evalContext = t, this.setSubscriptions = /* @__PURE__ */ new WeakMap(), this.changeSubscriptions = /* @__PURE__ */ new WeakMap(), this.sandboxFunctions = /* @__PURE__ */ new WeakMap();
      const n2 = Object.assign({ audit: false, forbidFunctionCalls: false, forbidFunctionCreation: false, globals: _SandboxExec.SAFE_GLOBALS, prototypeWhitelist: _SandboxExec.SAFE_PROTOTYPES, prototypeReplacements: /* @__PURE__ */ new Map() }, e || {});
      this.context = createContext(this, n2);
    }
    static get SAFE_GLOBALS() {
      return { Function, console: { debug: console.debug, error: console.error, info: console.info, log: console.log, table: console.table, warn: console.warn }, isFinite, isNaN, parseFloat, parseInt, decodeURI, decodeURIComponent, encodeURI, encodeURIComponent, escape, unescape, Boolean, Number, BigInt, String, Object, Array, Symbol, Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError, Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, Map, Set, WeakMap, WeakSet, Promise, Intl, JSON, Math, Date, RegExp };
    }
    static get SAFE_PROTOTYPES() {
      const e = [SandboxGlobal, Function, Boolean, Number, BigInt, String, Date, Error, Array, Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, Map, Set, WeakMap, WeakSet, Promise, Symbol, Date, RegExp], t = /* @__PURE__ */ new Map();
      return e.forEach((e2) => {
        t.set(e2, /* @__PURE__ */ new Set());
      }), t.set(Object, /* @__PURE__ */ new Set(["entries", "fromEntries", "getOwnPropertyNames", "is", "keys", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf", "values"])), t;
    }
    subscribeGet(e, t) {
      return t.getSubscriptions.add(e), { unsubscribe: () => t.getSubscriptions.delete(e) };
    }
    subscribeSet(e, t, n2, r) {
      return subscribeSet(e, t, n2, r);
    }
    subscribeSetGlobal(e, t, n2) {
      return subscribeSet(e, t, n2, this);
    }
    getContext(e) {
      return this.sandboxFunctions.get(e);
    }
    executeTree(e, t = []) {
      return executeTree({ ticks: BigInt(0) }, e, e.tree, t);
    }
    executeTreeAsync(e, t = []) {
      return executeTreeAsync({ ticks: BigInt(0) }, e, e.tree, t);
    }
  };
  var Sandbox = class extends SandboxExec {
    constructor(e) {
      super(e, createEvalContext());
    }
    static audit(e, t = []) {
      const n2 = {};
      for (const e2 of Object.getOwnPropertyNames(globalThis)) n2[e2] = globalThis[e2];
      const r = new SandboxExec({ globals: n2, audit: true });
      return r.executeTree(createExecContext(r, parse(e, true), createEvalContext()), t);
    }
    static parse(e) {
      return parse(e);
    }
    compile(e, t = false) {
      const n2 = parse(e, t);
      return (...e2) => {
        const t2 = createExecContext(this, n2, this.evalContext);
        return { context: t2, run: () => this.executeTree(t2, [...e2]).result };
      };
    }
    compileAsync(e, t = false) {
      const n2 = parse(e, t);
      return (...e2) => {
        const t2 = createExecContext(this, n2, this.evalContext);
        return { context: t2, run: () => this.executeTreeAsync(t2, [...e2]).then((e3) => e3.result) };
      };
    }
    compileExpression(e, t = false) {
      const n2 = parse(e, t, true);
      return (...e2) => {
        const t2 = createExecContext(this, n2, this.evalContext);
        return { context: t2, run: () => this.executeTree(t2, [...e2]).result };
      };
    }
    compileExpressionAsync(e, t = false) {
      const n2 = parse(e, t, true);
      return (...e2) => {
        const t2 = createExecContext(this, n2, this.evalContext);
        return { context: t2, run: () => this.executeTreeAsync(t2, [...e2]).then((e3) => e3.result) };
      };
    }
  };

  // node_modules/idb/build/index.js
  var instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);
  var idbProxyableTypes;
  var cursorAdvanceMethods;
  function getIdbProxyableTypes() {
    return idbProxyableTypes || (idbProxyableTypes = [
      IDBDatabase,
      IDBObjectStore,
      IDBIndex,
      IDBCursor,
      IDBTransaction
    ]);
  }
  function getCursorAdvanceMethods() {
    return cursorAdvanceMethods || (cursorAdvanceMethods = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey
    ]);
  }
  var transactionDoneMap = /* @__PURE__ */ new WeakMap();
  var transformCache = /* @__PURE__ */ new WeakMap();
  var reverseTransformCache = /* @__PURE__ */ new WeakMap();
  function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
      const unlisten = () => {
        request.removeEventListener("success", success);
        request.removeEventListener("error", error);
      };
      const success = () => {
        resolve(wrap(request.result));
        unlisten();
      };
      const error = () => {
        reject(request.error);
        unlisten();
      };
      request.addEventListener("success", success);
      request.addEventListener("error", error);
    });
    reverseTransformCache.set(promise, request);
    return promise;
  }
  function cacheDonePromiseForTransaction(tx2) {
    if (transactionDoneMap.has(tx2))
      return;
    const done = new Promise((resolve, reject) => {
      const unlisten = () => {
        tx2.removeEventListener("complete", complete);
        tx2.removeEventListener("error", error);
        tx2.removeEventListener("abort", error);
      };
      const complete = () => {
        resolve();
        unlisten();
      };
      const error = () => {
        reject(tx2.error || new DOMException("AbortError", "AbortError"));
        unlisten();
      };
      tx2.addEventListener("complete", complete);
      tx2.addEventListener("error", error);
      tx2.addEventListener("abort", error);
    });
    transactionDoneMap.set(tx2, done);
  }
  var idbProxyTraps = {
    get(target, prop, receiver) {
      if (target instanceof IDBTransaction) {
        if (prop === "done")
          return transactionDoneMap.get(target);
        if (prop === "store") {
          return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
        }
      }
      return wrap(target[prop]);
    },
    set(target, prop, value) {
      target[prop] = value;
      return true;
    },
    has(target, prop) {
      if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
        return true;
      }
      return prop in target;
    }
  };
  function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
  }
  function wrapFunction(func) {
    if (getCursorAdvanceMethods().includes(func)) {
      return function(...args) {
        func.apply(unwrap(this), args);
        return wrap(this.request);
      };
    }
    return function(...args) {
      return wrap(func.apply(unwrap(this), args));
    };
  }
  function transformCachableValue(value) {
    if (typeof value === "function")
      return wrapFunction(value);
    if (value instanceof IDBTransaction)
      cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
      return new Proxy(value, idbProxyTraps);
    return value;
  }
  function wrap(value) {
    if (value instanceof IDBRequest)
      return promisifyRequest(value);
    if (transformCache.has(value))
      return transformCache.get(value);
    const newValue = transformCachableValue(value);
    if (newValue !== value) {
      transformCache.set(value, newValue);
      reverseTransformCache.set(newValue, value);
    }
    return newValue;
  }
  var unwrap = (value) => reverseTransformCache.get(value);
  function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = wrap(request);
    if (upgrade) {
      request.addEventListener("upgradeneeded", (event) => {
        upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
      });
    }
    if (blocked) {
      request.addEventListener("blocked", (event) => blocked(
        // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
        event.oldVersion,
        event.newVersion,
        event
      ));
    }
    openPromise.then((db) => {
      if (terminated)
        db.addEventListener("close", () => terminated());
      if (blocking) {
        db.addEventListener("versionchange", (event) => blocking(event.oldVersion, event.newVersion, event));
      }
    }).catch(() => {
    });
    return openPromise;
  }
  var readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
  var writeMethods = ["put", "add", "delete", "clear"];
  var cachedMethods = /* @__PURE__ */ new Map();
  function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) {
      return;
    }
    if (cachedMethods.get(prop))
      return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, "");
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (
      // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
      !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))
    ) {
      return;
    }
    const method2 = async function(storeName, ...args) {
      const tx2 = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
      let target2 = tx2.store;
      if (useIndex)
        target2 = target2.index(args.shift());
      return (await Promise.all([
        target2[targetFuncName](...args),
        isWrite && tx2.done
      ]))[0];
    };
    cachedMethods.set(prop, method2);
    return method2;
  }
  replaceTraps((oldTraps) => ({
    ...oldTraps,
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
  }));
  var advanceMethodProps = ["continue", "continuePrimaryKey", "advance"];
  var methodMap = {};
  var advanceResults = /* @__PURE__ */ new WeakMap();
  var ittrProxiedCursorToOriginalProxy = /* @__PURE__ */ new WeakMap();
  var cursorIteratorTraps = {
    get(target, prop) {
      if (!advanceMethodProps.includes(prop))
        return target[prop];
      let cachedFunc = methodMap[prop];
      if (!cachedFunc) {
        cachedFunc = methodMap[prop] = function(...args) {
          advanceResults.set(this, ittrProxiedCursorToOriginalProxy.get(this)[prop](...args));
        };
      }
      return cachedFunc;
    }
  };
  async function* iterate(...args) {
    let cursor = this;
    if (!(cursor instanceof IDBCursor)) {
      cursor = await cursor.openCursor(...args);
    }
    if (!cursor)
      return;
    cursor = cursor;
    const proxiedCursor = new Proxy(cursor, cursorIteratorTraps);
    ittrProxiedCursorToOriginalProxy.set(proxiedCursor, cursor);
    reverseTransformCache.set(proxiedCursor, unwrap(cursor));
    while (cursor) {
      yield proxiedCursor;
      cursor = await (advanceResults.get(proxiedCursor) || cursor.continue());
      advanceResults.delete(proxiedCursor);
    }
  }
  function isIteratorProp(target, prop) {
    return prop === Symbol.asyncIterator && instanceOfAny(target, [IDBIndex, IDBObjectStore, IDBCursor]) || prop === "iterate" && instanceOfAny(target, [IDBIndex, IDBObjectStore]);
  }
  replaceTraps((oldTraps) => ({
    ...oldTraps,
    get(target, prop, receiver) {
      if (isIteratorProp(target, prop))
        return iterate;
      return oldTraps.get(target, prop, receiver);
    },
    has(target, prop) {
      return isIteratorProp(target, prop) || oldTraps.has(target, prop);
    }
  }));

  // webapp.ts
  (async () => {
    const safeEval = (expression, data) => {
      const sandbox = new Sandbox();
      const exec = sandbox.compile("return " + expression);
      const res = exec(data).run();
      return res;
    };
    const cfg = {
      "maxOracles": 100,
      "maxCapabilities": 100,
      "maxReports": 100,
      "maxOffers": 100,
      "maxConnections": 100,
      "maxMsgLength": 1e6,
      "httpPort": 8081,
      "p2pPort": 8334,
      "hostname": "localhost",
      "isTest": true,
      "p2pseed": [
        { "server": "dk14-peerjs-1586786454", "port": 0 }
      ],
      "oracle": {
        "id": {
          "pubkey": "AAA",
          "oracleSignatureType": "SHA256"
        },
        "adInterval": 1e4,
        "adTopN": 10,
        "dbPath": "./db/myoracle",
        "httpPort": 9080,
        "wsPort": 9081
      },
      "trader": {
        "broadcastOfferCycle": 1e3,
        "broadcastReportCycle": 1e3,
        "collectOffersCycle": 1e3,
        "collectReportsCycle": 1e3,
        "collectOracleAdsCycle": 1e3,
        "collectOracleCpCycle": 1e3,
        "pageSize": 100,
        "maxOraclesPages": 2,
        "maxCpPages": 2,
        "maxReportsPages": 2,
        "maxOffersPages": 2,
        "maxCollectors": 2,
        "dbPath": "./db",
        "httpPort": 7080,
        "heliosNetwork": "https://d1t0d7c2nekuk0.cloudfront.net/preview.json",
        "btcSignerEndpoint": "http://localhost:9593/sign",
        "btcInteractiveSignerEndpoint": "http://localhost:9593/"
      }
    };
    console.log("Start P2P service...   " + cfg.p2pPort);
    startP2P(cfg);
    const adaptjs = (js) => async (x) => {
      return safeEval(js, x);
    };
    const adaptPred = (p) => p.toString();
    const adaptQuery = (q) => q.where.toString();
    const traderApiRemote = {
      collectOracles: async function(tag, predicate, limit) {
        await fetch("./collectOracles?tag=" + encodeURIComponent(tag), {
          method: "post",
          body: JSON.stringify({
            predicate: "true",
            limit
          }),
          headers: { "Content-Type": "application/json" }
        });
        throw new Error("Function not implemented.");
      },
      collectCapabilities: async function(tag, q, opredicate, predicate, limit) {
        await fetch("./collectCapabilities?tag=" + encodeURIComponent(tag), {
          method: "post",
          body: JSON.stringify({
            oquery: q,
            opredicate,
            predicate
          }),
          headers: { "Content-Type": "application/json" }
        });
        throw new Error("Function not implemented.");
      },
      collectReports: async function(tag, q, opredicate, predicate, limit) {
        await fetch("./collectReports?tag=" + encodeURIComponent(tag), {
          method: "post",
          body: JSON.stringify({
            oquery: q,
            opredicate,
            predicate
          }),
          headers: { "Content-Type": "application/json" }
        });
        throw new Error("Function not implemented.");
      },
      collectOffers: async function(tag, q, cppredicate, matchingPredicate, limit) {
        await fetch("./collectOffers?tag=" + encodeURIComponent(tag), {
          method: "post",
          body: JSON.stringify({
            cpquery: q,
            cppredicate,
            predicate: matchingPredicate
          }),
          headers: { "Content-Type": "application/json" }
        });
        throw new Error("Function not implemented.");
      },
      issueReport: async function(r) {
        await fetch("./issueReport", {
          method: "post",
          body: JSON.stringify(r),
          headers: { "Content-Type": "application/json" }
        });
      },
      issueOffer: async function(o) {
        await fetch("./issueOffer", {
          method: "post",
          body: JSON.stringify(o),
          headers: { "Content-Type": "application/json" }
        });
      },
      startBroadcastingIssuedOffers: function() {
        fetch("./broadcastIssuedOffers");
      },
      stopBroadcastingIssuedOffers: function() {
        throw new Error("Function not implemented.");
      },
      startBroadcastingIssuedReports: function() {
        fetch("./broadcastIssuedReports");
      },
      stopBroadcastingIssuedReports: function() {
        throw new Error("Function not implemented.");
      }
    };
    const traderApiRemoteAdapted = {
      collectOracles: async function(tag, predicate, limit) {
        return traderApiRemote.collectOracles(tag, adaptPred(predicate), limit);
      },
      collectCapabilities: async function(tag, q, opredicate, predicate, limit) {
        return traderApiRemote.collectCapabilities(tag, adaptQuery(q), adaptPred(opredicate), adaptPred(predicate), limit);
      },
      collectReports: async function(tag, q, opredicate, predicate, limit) {
        return traderApiRemote.collectReports(tag, adaptQuery(q), adaptPred(opredicate), adaptPred(predicate), limit);
      },
      collectOffers: async function(tag, q, cppredicate, matchingPredicate, limit) {
        return traderApiRemote.collectOffers(tag, adaptQuery(q), adaptPred(cppredicate), adaptPred(matchingPredicate), limit);
      },
      issueReport: function(r) {
        return traderApiRemote.issueReport(r);
      },
      issueOffer: function(o) {
        return traderApiRemote.issueOffer(o);
      },
      startBroadcastingIssuedOffers: function() {
        traderApiRemote.startBroadcastingIssuedOffers();
      },
      stopBroadcastingIssuedOffers: function() {
        traderApiRemote.stopBroadcastingIssuedOffers();
      },
      startBroadcastingIssuedReports: function() {
        traderApiRemote.startBroadcastingIssuedReports();
      },
      stopBroadcastingIssuedReports: function() {
        traderApiRemote.stopBroadcastingIssuedReports();
      }
    };
    const db = await openDB("store", 1, {
      upgrade(db2) {
        db2.createObjectStore("oracles");
        db2.createObjectStore("cps");
        db2.createObjectStore("reports");
        db2.createObjectStore("offers");
        db2.createObjectStore("issued-reports");
        db2.createObjectStore("issued-offers");
      }
    });
    const indexDBstorage = {
      addOracle: async function(o) {
        const found = await db.get("oracles", o.pubkey);
        db.put("oracles", o, o.pubkey);
        return found === void 0;
      },
      addCp: async function(cp) {
        const found = await db.get("oracles", cp.capabilityPubKey);
        db.put("cps", cp, cp.capabilityPubKey);
        return found === void 0;
      },
      addReport: async function(r) {
        const found = await db.get("reports", r.pow.hash);
        db.put("cps", r, r.pow.hash);
        return found === void 0;
      },
      addIssuedReport: async function(r) {
        const found = await db.get("issued-reports", r.pow.hash);
        db.put("cps", r, r.pow.hash);
        return found === void 0;
      },
      addOffer: async function(o) {
        const found = await db.get("offers", o.pow.hash);
        db.put("cps", o, o.pow.hash);
        return found === void 0;
      },
      addIssuedOffer: async function(o) {
        const found = await db.get("issued-offers", o.pow.hash);
        db.put("cps", o, o.pow.hash);
        return found === void 0;
      },
      removeOracles: async function(pubkeys) {
        Promise.all(pubkeys.map((pub) => db.delete("oracles", pub)));
      },
      removeCps: async function(pubkeys) {
        await Promise.all(pubkeys.map((pub) => db.delete("cps", pub)));
      },
      removeReports: async function(pubkeys) {
        await Promise.all(pubkeys.map((pub) => db.delete("reports", pub)));
      },
      removeOffers: async function(pubkeys) {
        await Promise.all(pubkeys.map((pub) => db.delete("offers", pub)));
      },
      removeIssuedOffers: async function(pubkeys) {
        await Promise.all(pubkeys.map((pub) => db.delete("issued-offers", pub)));
      },
      removeIssuedReports: async function(pubkeys) {
        await Promise.all(pubkeys.map((pub) => db.delete("issued-reports", pub)));
      },
      allOracles: function(q, opredicate, handler) {
        throw new Error("Function not implemented.");
      },
      allCps: function(q, cppredicate, handler) {
        throw new Error("Function not implemented.");
      },
      queryOracles: async function(q, paging) {
        const oracles = db.transaction("oracles").store;
        const result = [];
        var i = 0;
        for await (const cursor of oracles) {
          if (q.where(cursor.value)) {
            i++;
            if (i > paging.chunkSize * (paging.page + 1)) {
              break;
            }
            if (i > paging.chunkSize * paging.page) {
              result.push(cursor.value);
            }
          }
        }
        return result;
      },
      queryCapabilities: async function(q, paging) {
        const cps = db.transaction("cps").store;
        const result = [];
        var i = 0;
        for await (const cursor of cps) {
          if (q.where(cursor.value)) {
            i++;
            if (i > paging.chunkSize * (paging.page + 1)) {
              break;
            }
            if (i > paging.chunkSize * paging.page) {
              result.push(cursor.value);
            }
          }
        }
        return result;
      },
      queryOffers: async function(q, paging) {
        const offers = db.transaction("offers").store;
        const result = [];
        var i = 0;
        for await (const cursor of offers) {
          if (q.where(cursor.value)) {
            i++;
            if (i > paging.chunkSize * (paging.page + 1)) {
              break;
            }
            if (i > paging.chunkSize * paging.page) {
              result.push(cursor.value);
            }
          }
        }
        return result;
      },
      queryReports: async function(q, paging) {
        const reports = db.transaction("reports").store;
        const result = [];
        var i = 0;
        for await (const cursor of reports) {
          if (q.where(cursor.value)) {
            i++;
            if (i > paging.chunkSize * (paging.page + 1)) {
              break;
            }
            if (i > paging.chunkSize * paging.page) {
              result.push(cursor.value);
            }
          }
        }
        return result;
      },
      queryIssuedOffers: async function(q, paging) {
        const offers = db.transaction("issued-offers").store;
        const result = [];
        var i = 0;
        for await (const cursor of offers) {
          if (q.where(cursor.value)) {
            i++;
            if (i > paging.chunkSize * (paging.page + 1)) {
              break;
            }
            if (i > paging.chunkSize * paging.page) {
              result.push(cursor.value);
            }
          }
        }
        return result;
      },
      queryIssuedReports: async function(q, paging) {
        const reports = db.transaction("issued-reports").store;
        const result = [];
        var i = 0;
        for await (const cursor of reports) {
          if (q.where(cursor.value)) {
            i++;
            if (i > paging.chunkSize * (paging.page + 1)) {
              break;
            }
            if (i > paging.chunkSize * paging.page) {
              result.push(cursor.value);
            }
          }
        }
        return result;
      },
      allIssuedOffers: function(handler) {
        throw new Error("Function not implemented.");
      },
      allIssuedReports: function(handler) {
        throw new Error("Function not implemented.");
      }
    };
    const remoteStorage = {
      addOracle: function(o) {
        throw new Error("Function not implemented.");
      },
      addCp: function(cp) {
        throw new Error("Function not implemented.");
      },
      addReport: function(r) {
        throw new Error("Function not implemented.");
      },
      addIssuedReport: function(r) {
        throw new Error("Function not implemented.");
      },
      addOffer: function(o) {
        throw new Error("Function not implemented.");
      },
      addIssuedOffer: function(o) {
        throw new Error("Function not implemented.");
      },
      removeOracles: function(pubkeys) {
        throw new Error("Function not implemented.");
      },
      removeCps: function(pubkeys) {
        throw new Error("Function not implemented.");
      },
      removeReports: function(pubkeys) {
        throw new Error("Function not implemented.");
      },
      removeOffers: function(pubkeys) {
        throw new Error("Function not implemented.");
      },
      removeIssuedOffers: function(pubkeys) {
        throw new Error("Function not implemented.");
      },
      removeIssuedReports: function(pubkeys) {
        throw new Error("Function not implemented.");
      },
      allOracles: function(q, opredicate, handler) {
        throw new Error("Function not implemented.");
      },
      allCps: function(q, cppredicate, handler) {
        throw new Error("Function not implemented.");
      },
      queryOracles: function(q, paging) {
        throw new Error("Function not implemented.");
      },
      queryCapabilities: function(q, paging) {
        throw new Error("Function not implemented.");
      },
      queryOffers: function(q, paging) {
        throw new Error("Function not implemented.");
      },
      queryReports: function(q, paging) {
        throw new Error("Function not implemented.");
      },
      queryIssuedOffers: function(q, paging) {
        throw new Error("Function not implemented.");
      },
      queryIssuedReports: function(q, paging) {
        throw new Error("Function not implemented.");
      },
      allIssuedOffers: function(handler) {
        throw new Error("Function not implemented.");
      },
      allIssuedReports: function(handler) {
        throw new Error("Function not implemented.");
      }
    };
    const adaptedStorage = {
      addOracle: function(o) {
        throw new Error("Function not implemented.");
      },
      addCp: function(cp) {
        throw new Error("Function not implemented.");
      },
      addReport: function(r) {
        throw new Error("Function not implemented.");
      },
      addIssuedReport: function(r) {
        throw new Error("Function not implemented.");
      },
      addOffer: function(o) {
        throw new Error("Function not implemented.");
      },
      addIssuedOffer: function(o) {
        throw new Error("Function not implemented.");
      },
      removeOracles: function(pubkeys) {
        throw new Error("Function not implemented.");
      },
      removeCps: function(pubkeys) {
        throw new Error("Function not implemented.");
      },
      removeReports: function(pubkeys) {
        throw new Error("Function not implemented.");
      },
      removeOffers: function(pubkeys) {
        throw new Error("Function not implemented.");
      },
      removeIssuedOffers: function(pubkeys) {
        throw new Error("Function not implemented.");
      },
      removeIssuedReports: function(pubkeys) {
        throw new Error("Function not implemented.");
      },
      allOracles: function(q, opredicate, handler) {
        throw new Error("Function not implemented.");
      },
      allCps: function(q, cppredicate, handler) {
        throw new Error("Function not implemented.");
      },
      queryOracles: function(q, paging) {
        throw new Error("Function not implemented.");
      },
      queryCapabilities: function(q, paging) {
        throw new Error("Function not implemented.");
      },
      queryOffers: function(q, paging) {
        throw new Error("Function not implemented.");
      },
      queryReports: function(q, paging) {
        throw new Error("Function not implemented.");
      },
      queryIssuedOffers: function(q, paging) {
        throw new Error("Function not implemented.");
      },
      queryIssuedReports: function(q, paging) {
        throw new Error("Function not implemented.");
      },
      allIssuedOffers: function(handler) {
        throw new Error("Function not implemented.");
      },
      allIssuedReports: function(handler) {
        throw new Error("Function not implemented.");
      }
    };
    const node = {
      peers: [],
      discovered: function(peer) {
      },
      broadcastPeer: function(peer) {
      },
      processApiRequest: async function(command, content) {
      },
      broadcastMessage: function(command, content) {
      }
    };
    window.traderApi = traderApi(cfg.trader, cfg, api, indexDBstorage, node);
    window.storage = indexDBstorage;
    window.btc = {
      generateOpeningTransaction,
      generateClosingTransaction,
      generateCetTransaction,
      generateCetRedemptionTransaction
    };
  })();
})();
/*! Bundled license information:

assert/build/internal/util/comparisons.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   *)

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

js-sha256/src/sha256.js:
  (**
   * [js-sha256]{@link https://github.com/emn178/js-sha256}
   *
   * @version 0.9.0
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2014-2017
   * @license MIT
   *)

@noble/hashes/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
