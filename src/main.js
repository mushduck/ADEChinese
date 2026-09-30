import "drag-drop-touch";
import "./shims";
import "./merge-globals";
import { browserCheck, init } from "./game";
import { DEV } from "./env";
import { watchLatestCommit } from "./commit-watcher";
import { BgStore } from "./utility/background-store";

if (browserCheck()) init();
if (DEV) watchLatestCommit();
BgStore.init();