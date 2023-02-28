use encoding_rs::WINDOWS_1251;
use scraper::{Html, Selector, };

pub async fn get_schedule() {
    let body =
        "faculty=0&teacher=&course=0&group=%B2%CF%C7%F1-19&sdate=01.01.2022&edate=01.01.2023&n=700";

    let req = reqwest::Client::new();
    let res = req
        .post("http://195.162.83.28/cgi-bin/timetable.cgi?n=700")
        .body(body)
        .send()
        .await
        .unwrap()
        .bytes()
        .await
        .unwrap();
    
    let utf8_bytes = WINDOWS_1251.decode(&res).0;


    let document   = Html::parse_document(&utf8_bytes);

    // println!("{:?}", document)

    let selector = Selector::parse("tr").unwrap();

    for node in document.select(&selector) {
        println!("{:?}", node.value().name());
    }

    // Encoding::from(res).encode(string)

    // let (win, _, _) =  WINDOWS_1250.encode(&res);
    // let (utf, _, _) = UTF_8.decode(&win);

    // println!("{:?}", std::str::from_utf8(&utf));

    // let encoded_str = "Merhaba Dünya".as_bytes();
    // let encoded_str = "Merhaba Dünya".as_bytes();
    // let
    // let (decoded_str, _, _) = WINDOWS_1251.encode(&res);
    // let (utf8_bytes, _, _) = UTF_8.decode(&decoded_str);





}
