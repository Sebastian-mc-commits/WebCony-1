import {fileURLToPath} from "url";

import {join, dirname} from "path";

export const file = fileURLToPath(import.meta.url);

const _dirneme = (...args) => join(dirname(file), args.join("/"));

export default _dirname