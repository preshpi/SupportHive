// import {defineCliConfig} from 'sanity/cli'

import { ClientConfig, createClient } from "@sanity/client";

// export default defineCliConfig({
//   api: {
//     projectId: 'js440jqn',
//     dataset: 'production'
//     apiVersion: "2024-03-16",

//   },
//   /**
//    * Enable auto-updates for studios.
//    * Learn more at https://www.sanity.io/docs/cli#auto-updates
//    */
//   autoUpdates: true,
// })

const config: ClientConfig =  {
     projectId: 'js440jqn',
     dataset: 'production'
     apiVersion: "2024-03-16",
     useCdn: false,
     ignoreBrowserTokenWarning: true,
     autoUpdates: true,
     token: 


}

export const client = createClient(config);
