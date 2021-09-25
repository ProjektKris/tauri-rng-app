use rand::Rng;
use tauri::command;

#[command]
pub fn get_result_command(input: String) -> Result<Vec<String>, String> {
  let strings: Vec<&str> = input.split(",").collect();
  let length = strings.len();
  if length > 1 {
    let mut result: Vec<String> = Vec::new();
    println!("{:?}", strings);
    for _ in 0..2 {
      for _ in &strings {
        let i = rand::thread_rng().gen_range(0..length);
        result.push(String::from(strings[i]));
      }
    }
    return Ok(result);
  } else {
    return Err("Invalid input.".into());
  }
}
