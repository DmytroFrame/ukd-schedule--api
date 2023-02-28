#[macro_use]
extern crate rocket;
mod schedule;


// use ;

use rocket::tokio::time::{sleep, Duration};
// use req;

#[get("/<seconds>")]
async fn hello(seconds: u64) -> String {
    
    // let utf8_str = std::str::from_utf8(&utf8_bytes).unwrap();
    
    
    // format!("{}", String::from(&utf8_bytes[100..]))
    crate::schedule::get_schedule::get_schedule().await;
    String::from("sf")
    
    // format!("Hello, {} year old named {}!", "")
}

use encoding_rs::{ UTF_8, WINDOWS_1251};

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![hello])
}


// fn main() {
//     let encoded_str = "Р›С–РєРІС–РґР°С†С–СЏ Р°РєР°РґРµРјС–";
//     let (decoded_str, _, _) = WINDOWS_1251.encode(&encoded_str);
//     let (utf8_bytes, _, _) = UTF_8.decode(&decoded_str);
//     // let utf8_str = std::str::from_utf8(&utf8_bytes).unwrap();
//     println!("{}, {}", utf8_bytes, "decoded_str")
// }