
use std::env;
use serde::{Deserialize, Serialize};
use serde_json::{Result};

use i32lib;

pub fn func0(array1_3000_0: Vec<i32>, array2_3001_0: Vec<i32>, start_3002_0: i32) -> (Vec<i32>, Vec<i32>, String) {
  let concatenated_1_0 = i32lib::concat(&array1_3000_0, &array2_3001_0);
  let compiler_ver_11_0 = i32lib::execution_env_version();
  let sorted_2_0 = i32lib::sort(&concatenated_1_0);
  let length_3_0 = i32lib::length(&sorted_2_0);
  let half_4_0 = i32lib::half(length_3_0);
  let sliced_5_0 = i32lib::slice(&sorted_2_0, start_3002_0, half_4_0);
  let sliced_6_0 = i32lib::slice(&sorted_2_0, half_4_0, length_3_0);

  (sliced_5_0, sliced_6_0, compiler_ver_11_0)
}


#[derive(Serialize, Deserialize, Debug)]
struct Input {
    array1_3000_0: Vec<i32>,
    array2_3001_0: Vec<i32>,
    start_3002_0: i32,
}

fn deserialize(data: String) -> Result<()> {
    let parsed: Input = serde_json::from_str(&data)?;

    println!("parsed = {:?}", parsed);

    let (sliced_5_0, sliced_6_0, compiler_ver_11_0) = func0(parsed.array1_3000_0, parsed.array2_3001_0, parsed.start_3002_0);

    println!("func0 is {:?}", (sliced_5_0, sliced_6_0, compiler_ver_11_0));

    Ok(())
}

fn main() {
    let args: Vec<_> = env::args().collect();
    deserialize(args[1].to_string()).unwrap();
}
