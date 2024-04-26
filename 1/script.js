// function makeProfileTimer() {
//     const start = performance.now();
//     return function() {
//         return performance.now() - start;
//     }
// }


// function makeSaver(func) {
//     let result;
//     let called = false;
//     return function() {
//         if (!called) {
//             result = func();
//             called = true;
//         }
//         return result;
//     }
// }


// function myBind(func, context, defaultArgs) {
//     return function(...args) {
//         const mergedArgs = defaultArgs.map(arg => arg === undefined ? args.shift() : arg);
//         return func.apply(context, mergedArgs.concat(args));
//     }
// }


// function checkResult(original, validator) {
//     function wrapper(...params) {
//         let result;
//         do {
//             result = original.apply(this, params);
//         } while (!validator(result));
//         return result;
//     }
//     return wrapper;
// }
// const RandomHigh = checkResult(
//     () => Math.random() * 0.5 + 0.5,
//     x => x >= 0.5 && x <= 1
// );
//
// const AlwaysSayYes = checkResult(
//     () => confirm('Press OK to continue'),
//     x => x
// );
//
// const respectMe = checkResult(
//     () => prompt('Enter something'),
//     x => x !== null && x !== ''
// );


