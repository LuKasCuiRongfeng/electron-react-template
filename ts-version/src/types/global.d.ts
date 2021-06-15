

declare module NodeJS {
    export interface Global {
        wins: { [props: string]: Electron.BrowserWindow | null },
        baseUrl: string
    }
}

declare module "react-router-dom" {
    export class HashRouter extends React.Component { }
}

declare module "react-router-dom" {
    export class Route extends React.Component {
        constructor(props: { path: string })
    }
}