/// <reference path='fourslash.ts'/>

////interface A1 { [|readonly [|{| "isDefinition": true, "contextRangeIndex": 0 |}a|]: string|] };
////interface A2 { [|[|{| "isDefinition": true, "contextRangeIndex": 2 |}a|]?: number|] };
////let a1: A1;
////let a2: A2;
////let a12 = { ...a1, ...a2 };
////a12.[|a|];
////a1.[|a|];

const [r0Def, r0, r1Def, r1, r2, r3] = test.ranges();

// members of spread types only refer to themselves and the resulting property
verify.referenceGroups(r0, [{ definition: "(property) A1.a: string", ranges: [r0, r2, r3] }]);
verify.referenceGroups(r1, [{ definition: "(property) A2.a?: number", ranges: [r1, r2] }]);

// but the resulting property refers to everything
verify.referenceGroups(r2, [
    { definition: "(property) A1.a: string", ranges: [r0, r2, r3] },
    { definition: "(property) A2.a?: number", ranges: [r1] },
]);

verify.referenceGroups(r3, [{ definition: "(property) A1.a: string", ranges: [r0, r2, r3] }]);
