import {setGlobalOptions} from "firebase-functions/v2";
import {createInteraction} from "./functions/createInteraction";
import {completeInteraction} from "./functions/completeInteraction";
import {claimMerchandise} from "./functions/claimMerchandise";

setGlobalOptions({maxInstances: 10});

export {createInteraction};
export {completeInteraction};
export {claimMerchandise};

