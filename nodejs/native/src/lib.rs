use neon::register_module;
use neon_serde::export;
use serde_derive::{Deserialize, Serialize};
use serde_json::json;
use rustc_version_runtime::version;

#[derive(Serialize, Deserialize, Debug)]
struct User {
    name: String,
    age: u16,
}

export! {
    fn sayHello(name: String) -> String {
        let someone = json!({
            "name": name,
            "age": 19
        });
        format!("{}", someone.to_string())
    }

    fn greet(user: User, number: u16) -> String {
        format!("{} will be {} years old in {} years", user.name, user.age, number)
    }

    /// calculate fibonacci recursively
    fn fibonacci(n: i32) -> i32 {
        match n {
            1 | 2 => 1,
            n => fibonacci(n - 1) + fibonacci(n - 2)
        }
    }

    // sum
    fn sum(n1: i32, n2: i32) -> i32 {
        n1 + n2
    }

    fn concat(n1: Vec<i32>, n2: Vec<i32>) -> Vec<i32> {
        let mut a = n1.to_vec();
        a.extend(n2);
        a
    }

    fn sort(n1: Vec<i32>) -> Vec<i32> {
        let mut a = n1.to_vec();
        a.sort();
        a
    }

    fn slice(n1: Vec<i32>, start: i32, end: i32) -> Vec<i32> {
        let ustart = start as usize;
        let uend = end as usize;
        n1[ustart..uend].to_vec()
    }

    fn length(n1: Vec<i32>) -> i32 {
        n1.len() as i32
    }

    fn executionEnvVersion() -> String {
        format!("rustc version: {}", version())
    }
}
