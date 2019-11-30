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
}
