import "core-js";
import "es6-promise/auto";

import { Api } from "./api";

const orderApiRest = new Api();

orderApiRest.listen(3000, () => console.log("runnings"));
