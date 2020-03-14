// TODO try #![no_mangle]
use std::os::raw::{c_void};
use rustc_version_runtime::version;

// pub mod amodule {
//
//     pub fn it_works() -> i32 {
//         2 + 2 + 4
//     }
// }

///// wasmffi
// A hacky way to allocate / deallocate memory in rust stable.
//
// Another way to do this would be to use heap::alloc, but that's still unstable
// You can check the progress on RFC #1974
// @ https://github.com/rust-lang/rust/issues/27389
//
#[no_mangle]
pub fn allocate(length: usize) -> *mut c_void {
    let mut v = Vec::with_capacity(length);
    let ptr = v.as_mut_ptr();
    std::mem::forget(v);
    ptr
}

#[no_mangle]
pub fn deallocate(ptr: *mut c_void, length: usize) {
    unsafe {
        std::mem::drop(Vec::from_raw_parts(ptr, 0, length));
    }
}

#[no_mangle]  // for wasmffi
pub fn fibonacci(n: i32) -> i32 {
    match n {
        1 | 2 => 1,
        n => fibonacci(n - 1) + fibonacci(n - 2)
    }
}

#[no_mangle]
pub fn sum(n1: i32, n2: i32) -> i32 {
    n1 + n2
}

#[no_mangle]
pub fn vsum(n1: &Vec<i32>) -> i32 {
    n1.iter().sum()
}

#[no_mangle]
pub fn concat(n1: &Vec<i32>, n2: &Vec<i32>) -> *mut Vec<i32> {
    let mut a = n1.to_vec();
    a.extend(n2);
    Box::into_raw(Box::new(a.to_vec()))
}

#[no_mangle]
pub fn sort(n1: &Vec<i32>) -> *mut Vec<i32> {
    let mut a = n1.to_vec();
    a.sort();
    Box::into_raw(Box::new(a.to_vec()))
}

#[no_mangle]
pub fn slice(n1: &Vec<i32>, start: i32, end: i32) -> *mut Vec<i32> {
    let ustart = start as usize;
    let uend = end as usize;
    Box::into_raw(Box::new(n1[ustart..uend].to_vec()))
}

#[no_mangle]
pub fn length(n1: &Vec<i32>) -> i32 {
    n1.len() as i32
}

#[no_mangle]
pub fn half(n: i32) -> i32 {
    n / 2
}

#[no_mangle]
pub fn execution_env_version() -> String {
    format!("rustc version: {}", version())
}

// pub fn map(f: Fn(i32) -> i32, u: &Vec<i32>) -> Vec<i32> {
//     let mut res: Vec<i32> = u.iter().map(f).collect();
//     res
// }
