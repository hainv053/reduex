# reduex

## Installation

```bash
npm install reduex --save
```
or
```bash
yarn add reduex
```

## Usage

#### Create store
`index.tsx`
```ts
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { createModel, Provider } from 'reduex';

const app = createModel({
    state: {
        title: 'Hello reduex'
    },
    actions: {
        changeTitle: (rootState, payload) => {
            return {
                title: payload.title
            };
        },
        changeTitleAsync: async (rootState, payload) => {
            
            await new Promise(resolve => {
                 setTimeout(resolve, 5000)
            })
            
            return {
                title: payload.title
            };
        }
    }
});

const stores = {
    app: app
}

ReactDOM.render(
    <Provider
        logger={true}
        stores={stores}>
        <App />
    </Provider>
    ,
    document.getElementById('root') as HTMLElement
);


```

`App.tsx`
```ts
import * as React from 'react';
import { connect, getRootState } from 'reduex';

class App extends React.Component<any, any> {

    changeTitle = () => {
        this.props.dispatch('app/changeTitle', {
            title: 'Change Title'
        });
    };
    
    changeTitleAsync = () => {
        this.props.dispatch('app/changeTitleAsync', {
            title: 'Change Title Async'
        });
    };

    getRootState = () => {
        console.log(getRootState());
    };

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>  
                <button onClick={this.changeTitle}>Change title</button>
                <button onClick={this.getRootState}>Get Root State</button>
                <button onClick={this.changeTitleAsync}></button>
              </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        title: state.app.title
    };
};

export default connect(mapStateToProps)(App);

```


