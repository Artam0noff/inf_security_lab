import { createContext } from "react";

function noop() {};

export const KeyContext = createContext({

    _key: null,
    access: null,
    setKey : noop,
    deleteKey: noop,

})