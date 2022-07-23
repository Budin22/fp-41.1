'use strict';
import { Controller } from "./Class/Controller.js";
import { Model } from "./Class/Model.js";
import { View } from "./Class/View.js";

const app = new Controller(new Model(), new View());
app.start()
