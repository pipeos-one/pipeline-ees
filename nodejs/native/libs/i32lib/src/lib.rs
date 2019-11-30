use rustc_version_runtime::version;

// pub mod amodule {
//
//     pub fn it_works() -> i32 {
//         2 + 2 + 4
//     }
// }

/// calculate fibonacci recursively
pub fn fibonacci(n: i32) -> i32 {
    match n {
        1 | 2 => 1,
        n => fibonacci(n - 1) + fibonacci(n - 2)
    }
}

// sum
pub fn sum(n1: i32, n2: i32) -> i32 {
    n1 + n2
}

pub fn concat(n1: &Vec<i32>, n2: &Vec<i32>) -> Vec<i32> {
    let mut a = n1.to_vec();
    a.extend(n2);
    a
}

pub fn sort(n1: &Vec<i32>) -> Vec<i32> {
    let mut a = n1.to_vec();
    a.sort();
    a
}

pub fn slice(n1: &Vec<i32>, start: i32, end: i32) -> Vec<i32> {
    let ustart = start as usize;
    let uend = end as usize;
    n1[ustart..uend].to_vec()
}

pub fn length(n1: &Vec<i32>) -> i32 {
    n1.len() as i32
}

pub fn half(n: i32) -> i32 {
    n / 2
}

pub fn execution_env_version() -> String {
    format!("rustc version: {}", version())
}

// pub fn map(f: Fn(i32) -> i32, u: &Vec<i32>) -> Vec<i32> {
//     let mut res: Vec<i32> = u.iter().map(f).collect();
//     res
// }
