// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

use clap::Parser;
use move_cli::base::new;
use std::path::PathBuf;

const SUI_PKG_NAME: &str = "Sui";
const SUI_PKG_PATH: &str = "{ git = \"https://github.com/MystenLabs/sui.git\", subdir = \"crates/sui-framework\", rev = \"main\" }";

#[derive(Parser)]
pub struct New {
    #[clap(flatten)]
    pub new: new::New,
}

impl New {
    pub fn execute(self, path: Option<PathBuf>) -> anyhow::Result<()> {
        let name = &self.new.name.to_lowercase();
        self.new.execute(
            path,
            "0.0.1",
            [(SUI_PKG_NAME, SUI_PKG_PATH)],
            [(name, "0x0")],
            "",
        )?;
        Ok(())
    }
}
