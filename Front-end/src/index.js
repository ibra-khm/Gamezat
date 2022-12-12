import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { Flowbite } from 'flowbite-react';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<>
	  <Flowbite
  theme={{
    theme: {
      alert: {
        color: {
          primary: 'bg-primary'
        }
      }
    }
  }}
>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
		</Flowbite>
	</>

);
