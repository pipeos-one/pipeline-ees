use neon::register_module;
use neon_serde::export;
use serde_derive::{Deserialize, Serialize};
use serde_json::json;

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
}
