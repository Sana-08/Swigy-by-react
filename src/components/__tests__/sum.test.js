import {sum} from "../Sum";

TextDecoderStream("sum of two number",()=>{
    const result=sum(3,4);

    // Assertion
    expect(result).toBe(7);
});