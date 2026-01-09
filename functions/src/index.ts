import {setGlobalOptions} from "firebase-functions/v2";
import {createInteraction} from "./functions/createInteraction";

setGlobalOptions({maxInstances: 10});

export {createInteraction};
