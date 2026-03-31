// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:rogue_life.db", vec![
                    tauri_plugin_sql::Migration {
                        version: 1,
                        description: "init",
                        sql: include_str!("../migrations/0001_init.sql"),
                        kind: tauri_plugin_sql::MigrationKind::Up,
                    },
                    tauri_plugin_sql::Migration {
                        version: 2,
                        description: "task_types",
                        sql: include_str!("../migrations/0002_task_types.sql"),
                        kind: tauri_plugin_sql::MigrationKind::Up,
                    },
                    tauri_plugin_sql::Migration {
                        version: 3,
                        description: "dernier_check",
                        sql: include_str!("../migrations/0003_dernier_check.sql"),
                        kind: tauri_plugin_sql::MigrationKind::Up,
                    },
                    tauri_plugin_sql::Migration {
                        version: 4,
                        description: "historique_nom",
                        sql: include_str!("../migrations/0004_historique_nom.sql"),
                        kind: tauri_plugin_sql::MigrationKind::Up,
                    },
                    tauri_plugin_sql::Migration {
                        version: 5,
                        description: "stuff_slots",
                        sql: include_str!("../migrations/0005_stuff_slots.sql"),
                        kind: tauri_plugin_sql::MigrationKind::Up,
                    },
                    tauri_plugin_sql::Migration {
                        version: 6,
                        description: "rarete_slots",
                        sql: include_str!("../migrations/0006_rarete_slots.sql"),
                        kind: tauri_plugin_sql::MigrationKind::Up,
                    },
                    tauri_plugin_sql::Migration {
                        version: 7,
                        description: "competences",
                        sql: include_str!("../migrations/0007_competences.sql"),
                        kind: tauri_plugin_sql::MigrationKind::Up,
                    },
                    tauri_plugin_sql::Migration {
                        version: 8,
                        description: "types_elementaires",
                        sql: include_str!("../migrations/0008_types.sql"),
                        kind: tauri_plugin_sql::MigrationKind::Up,
                    },
                    tauri_plugin_sql::Migration {
                        version: 9,
                        description: "donjon_comps",
                        sql: include_str!("../migrations/0009_donjon_comps.sql"),
                        kind: tauri_plugin_sql::MigrationKind::Up,
                    },
                    tauri_plugin_sql::Migration {
                        version: 10,
                        description: "levelup",
                        sql: include_str!("../migrations/0010_levelup.sql"),
                        kind: tauri_plugin_sql::MigrationKind::Up,
                    },
                    tauri_plugin_sql::Migration {
                        version: 11,
                        description: "lootbox",
                        sql: include_str!("../migrations/0011_lootbox.sql"),
                        kind: tauri_plugin_sql::MigrationKind::Up,
                    },
                    tauri_plugin_sql::Migration {
                        version: 12,
                        description: "balance",
                        sql: include_str!("../migrations/0012_balance.sql"),
                        kind: tauri_plugin_sql::MigrationKind::Up,
                    },
                    tauri_plugin_sql::Migration {
                        version: 13,
                        description: "modes",
                        sql: include_str!("../migrations/0013_modes.sql"),
                        kind: tauri_plugin_sql::MigrationKind::Up,
                    }
                ])
                .build()
        )
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
